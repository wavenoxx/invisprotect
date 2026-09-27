import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

import { BRAND_CONFIG } from "@/config/brand";
import type { PaidLandingPageConfig } from "@/data/paidLandingPages";
import { trackConsultationLeadThen, trackEngagement, trackLeadFormEvent } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";
import { ConsultationInputSchema } from "@/lib/consultation-schema";
import { buildConsultationWhatsappUrl, createLeadRef } from "@/lib/consultation-whatsapp";

/**
 * WhatsApp-first lead form for the Google Ads landing pages.
 *
 * Flow: validate → create a lead reference (e.g. IG-HYD-K7Q2M9XA) → fire the
 * Google Ads lead conversion with that reference as transaction_id → open
 * WhatsApp with every detail and the reference typed in. Nothing is stored in
 * a database. Visual language follows the /consultation page exactly.
 */

interface PaidLeadFormProps {
  landing: PaidLandingPageConfig;
}

interface FormState {
  name: string;
  phone: string;
  locality: string;
  otherArea: string;
  pincode: string;
  needs: string[];
  notes: string;
  consent: boolean;
}

const OTHER_AREA = "__other__";

const initialState: FormState = {
  name: "",
  phone: "",
  locality: "",
  otherArea: "",
  pincode: "",
  needs: [],
  notes: "",
  consent: false,
};

const labelClass = "block text-[10px] font-medium uppercase tracking-[0.2em] text-[#78716C]";
const fieldClass =
  "w-full border border-[#1C1917]/15 bg-white px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#A8A29E] transition-colors focus:border-brand focus:outline-none";

function Required() {
  return <span className="text-brand"> *</span>;
}

export function PaidLeadForm({ landing }: PaidLeadFormProps) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [pending, setPending] = useState<{ url: string; reference: string } | null>(null);
  const startedRef = useRef(false);
  const submittingRef = useRef(false);
  const canSubmit = BRAND_CONFIG.status === "active" && BRAND_CONFIG.contact.enabled;
  const meta = { landingId: landing.id, service: landing.serviceId, city: landing.city };
  const id = (field: string) => `${landing.id}-${field}`;

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleNeed = (need: string) => {
    setForm((current) => ({
      ...current,
      needs: current.needs.includes(need)
        ? current.needs.filter((item) => item !== need)
        : [...current.needs, need],
    }));
  };

  const trackStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackLeadFormEvent("lead_form_start", { ...meta, interactionLocation: "paid_landing_form" });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    setError("");

    const attribution = captureAttribution();
    const area = form.locality === OTHER_AREA ? form.otherArea.trim() : form.locality;
    const notes = [form.needs.length ? `Need: ${form.needs.join(", ")}` : "", form.notes.trim()]
      .filter(Boolean)
      .join(" | ");

    const parsed = ConsultationInputSchema.safeParse({
      name: form.name,
      phone: form.phone,
      city_hub: area ? `${area}, ${landing.city}` : "",
      pincode: form.pincode,
      services: [landing.serviceId],
      notes: notes || undefined,
      contact_consent: form.consent,
      consent_version: landing.consentVersion,
      landing_id: landing.id,
      form_variant: landing.formVariant,
      gclid: attribution.gclid,
      wbraid: attribution.wbraid,
      gbraid: attribution.gbraid,
      source: attribution.utm_source || attribution.source,
      medium: attribution.utm_medium || attribution.medium,
      campaign: attribution.utm_campaign || attribution.campaign,
      term: attribution.utm_term || attribution.term,
      content: attribution.utm_content || attribution.content,
      landing_page: attribution.landing_page,
      referrer: attribution.referrer,
    });

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const field = issue?.path[0]?.toString();
      setError(
        field === "contact_consent"
          ? "Please tick the box so we can contact you about this request."
          : issue?.message || "Please check your details and try again.",
      );
      trackLeadFormEvent("lead_form_validation_error", {
        ...meta,
        interactionLocation: "paid_landing_form",
        field,
      });
      return;
    }

    if (!canSubmit || !BRAND_CONFIG.contact.whatsappLink) {
      setError("WhatsApp is not available right now — please call us.");
      return;
    }

    submittingRef.current = true;
    const reference = createLeadRef(landing.whatsappRef);
    const whatsappUrl = buildConsultationWhatsappUrl(
      BRAND_CONFIG.contact.whatsappLink,
      {
        name: parsed.data.name,
        mobile: form.phone,
        serviceNames: [landing.serviceName],
        localityCity: parsed.data.city_hub,
        pincode: parsed.data.pincode,
        notes: parsed.data.notes ?? "",
        reference,
      },
      BRAND_CONFIG.name,
    );

    // Show the manual fallback first, so the visitor is never stuck if the redirect fails.
    setPending({ url: whatsappUrl, reference });
    trackConsultationLeadThen(
      {
        leadId: reference,
        city: landing.city,
        service: landing.serviceId,
        landingId: landing.id,
        campaign: attribution.utm_campaign || attribution.campaign,
      },
      () => {
        submittingRef.current = false;
        window.location.assign(whatsappUrl);
      },
    );
  };

  if (pending) {
    return (
      <section
        id="quote-form"
        aria-live="polite"
        className="scroll-mt-6 border border-[#1C1917]/10 bg-white p-6 text-center shadow-sm sm:p-8 md:p-10"
      >
        <span className="mb-2 block font-mono text-[9px] font-medium uppercase tracking-widest text-brand">
          Request ready
        </span>
        <h3 className="sn-h2 text-[#1C1917]">Opening WhatsApp…</h3>
        <p className="sn-subtext mx-auto mt-3 max-w-sm text-[#44403C]">
          Your details are typed in for you.{" "}
          <strong className="font-medium text-[#1C1917]">Tap Send in WhatsApp</strong> so we receive
          your request. We reply 8 AM – 8 PM.
        </p>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-[#78716C]">
          Reference · {pending.reference}
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <a
            href={pending.url}
            onClick={() => trackEngagement("whatsapp", "paid_form_fallback", meta)}
            className="sn-btn-luxury-solid w-full focus-ring"
          >
            Open WhatsApp
          </a>
          {BRAND_CONFIG.contact.phoneHref ? (
            <a
              href={BRAND_CONFIG.contact.phoneHref}
              onClick={() => trackEngagement("phone", "paid_form_fallback", meta)}
              className="sn-btn-luxury-dark w-full focus-ring"
            >
              Call Instead
            </a>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setPending(null)}
          className="mt-6 cursor-pointer text-[10px] font-medium uppercase tracking-[0.2em] text-[#78716C] underline underline-offset-4 transition-colors hover:text-brand focus-ring"
        >
          Edit details
        </button>
      </section>
    );
  }

  return (
    <section
      id="quote-form"
      className="scroll-mt-6 border border-[#1C1917]/10 bg-white p-6 shadow-sm sm:p-8 md:p-10"
    >
      <div className="mb-8 border-b border-[#1C1917]/10 pb-4">
        <span className="mb-1 block font-mono text-[9px] font-medium uppercase tracking-widest text-brand">
          01 / Site Details
        </span>
        <h3 className="font-display text-sm font-normal uppercase tracking-[0.16em] text-[#1C1917] md:text-base">
          {landing.serviceName} · {landing.city}
        </h3>
      </div>

      {!canSubmit ? (
        <p className="mb-6 border border-[#1C1917]/10 bg-[#F4EFEA] p-4 text-xs text-[#57534E]">
          Requests open at launch. Please call us in the meantime.
        </p>
      ) : null}

      <form onSubmit={handleSubmit} onFocusCapture={trackStart} className="space-y-8" noValidate>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor={id("name")} className={labelClass}>
              Your Name
              <Required />
            </label>
            <input
              id={id("name")}
              autoComplete="name"
              value={form.name}
              onChange={(event) => setField("name", event.target.value)}
              placeholder="e.g. Anand Varma"
              className={fieldClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={id("phone")} className={labelClass}>
              Mobile Number
              <Required />
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-sm font-medium text-[#78716C]">+91</span>
              <input
                id={id("phone")}
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                value={form.phone}
                onChange={(event) => setField("phone", event.target.value.replace(/\D/g, ""))}
                placeholder="98765 43210"
                className={`${fieldClass} pl-14`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor={id("pincode")} className={labelClass}>
              Pincode
              <Required />
            </label>
            <input
              id={id("pincode")}
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={6}
              value={form.pincode}
              onChange={(event) => setField("pincode", event.target.value.replace(/\D/g, ""))}
              placeholder="6-digit pincode"
              className={fieldClass}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label htmlFor={id("locality")} className={labelClass}>
              Area / Locality
              <Required />
            </label>
            <div className="relative">
              <select
                id={id("locality")}
                value={form.locality}
                onChange={(event) => setField("locality", event.target.value)}
                className={`${fieldClass} cursor-pointer appearance-none pr-10 ${
                  form.locality ? "" : "text-[#A8A29E]"
                }`}
              >
                <option value="" disabled>
                  Select your area in {landing.city}
                </option>
                {landing.localities.map((locality) => (
                  <option key={locality} value={locality}>
                    {locality}
                  </option>
                ))}
                <option value={OTHER_AREA}>Other area</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#78716C]"
                strokeWidth={1.5}
              />
            </div>
            {form.locality === OTHER_AREA ? (
              <input
                id={id("other-area")}
                aria-label="Your area name"
                value={form.otherArea}
                onChange={(event) => setField("otherArea", event.target.value)}
                placeholder="Type your area"
                className={`${fieldClass} mt-3`}
              />
            ) : null}
            <p className="text-[11px] font-light text-[#A8A29E]">
              So we send the nearest checked installer.
            </p>
          </div>
        </div>

        <fieldset className="space-y-4">
          <legend className="mb-4 block w-full">
            <span className="mb-1 block font-mono text-[9px] font-medium uppercase tracking-widest text-brand">
              02 / Requirement
            </span>
            <span className="text-[10px] font-light uppercase tracking-[0.2em] text-[#A8A29E]">
              Optional · select all that apply
            </span>
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {landing.needOptions.map((need) => {
              const selected = form.needs.includes(need);
              return (
                <button
                  key={need}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleNeed(need)}
                  className={`flex min-h-12 cursor-pointer items-center justify-between gap-2 border p-3.5 text-left transition-all duration-300 focus-ring ${
                    selected
                      ? "border-brand bg-brand/8 text-[#1C1917]"
                      : "border-[#1C1917]/10 bg-white text-[#44403C] hover:border-brand/50"
                  }`}
                >
                  <span className="font-display text-[11px] font-medium uppercase tracking-[0.1em]">
                    {need}
                  </span>
                  <span
                    className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      selected ? "border-brand bg-brand text-white" : "border-[#1C1917]/25"
                    }`}
                  >
                    {selected ? (
                      <Check aria-hidden="true" className="size-2.5" strokeWidth={2.5} />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>

          {showNotes ? (
            <textarea
              id={id("notes")}
              aria-label="Note"
              rows={3}
              maxLength={1000}
              value={form.notes}
              onChange={(event) => setField("notes", event.target.value)}
              placeholder="e.g. 14th-floor balcony, two bedroom windows"
              className={`${fieldClass} resize-none`}
            />
          ) : (
            <button
              type="button"
              onClick={() => setShowNotes(true)}
              className="cursor-pointer text-[10px] font-medium uppercase tracking-[0.2em] text-[#78716C] transition-colors hover:text-brand focus-ring"
            >
              + Add a note (optional)
            </button>
          )}
        </fieldset>

        <div className="space-y-6 border-t border-[#1C1917]/10 pt-6">
          <label className="flex cursor-pointer items-start gap-3 text-[11px] leading-relaxed font-light text-[#78716C]">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => setField("consent", event.target.checked)}
              className="mt-0.5 size-4 shrink-0 cursor-pointer accent-brand"
            />
            <span>
              {landing.consentText} See the{" "}
              <Link to="/privacy" className="underline underline-offset-2 hover:text-brand">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {error ? (
            <p
              role="alert"
              className="border border-red-500/40 bg-red-50 p-4 text-xs font-medium text-red-700"
            >
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit}
            className="sn-btn-luxury-solid w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send Request on WhatsApp
            <ArrowRight aria-hidden="true" size={12} className="ml-2" />
          </button>

          <p className="text-center text-[11px] font-light text-[#78716C]">
            Complimentary site visit · One checked installer · No spam
          </p>
        </div>
      </form>
    </section>
  );
}
