import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MessageSquare, Phone } from "lucide-react";

import { BRAND_CONFIG } from "@/config/brand";
import type { PaidLandingPageConfig } from "@/data/paidLandingPages";
import { submitConsultationServerFn } from "@/functions/consultation";
import { trackConsultationLead, trackEngagement, trackLeadFormEvent } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";
import { ConsultationInputSchema } from "@/lib/consultation-schema";

interface PaidLeadFormProps {
  landing: PaidLandingPageConfig;
}

interface FormState {
  name: string;
  phone: string;
  locality: string;
  pincode: string;
  notes: string;
  consent: boolean;
}

const initialState: FormState = {
  name: "",
  phone: "",
  locality: "",
  pincode: "",
  notes: "",
  consent: false,
};

export function PaidLeadForm({ landing }: PaidLeadFormProps) {
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [leadId, setLeadId] = useState("");
  const startedRef = useRef(false);
  const submittingRef = useRef(false);
  const canSubmit = BRAND_CONFIG.status === "active" && BRAND_CONFIG.contact.enabled;

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const trackStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackLeadFormEvent("lead_form_start", {
      landingId: landing.id,
      service: landing.serviceId,
      city: landing.city,
      interactionLocation: "paid_landing_form",
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    setError("");

    const attribution = captureAttribution();
    const candidate = {
      name: form.name,
      phone: form.phone,
      city_hub: form.locality,
      pincode: form.pincode,
      services: [landing.serviceId],
      notes: form.notes || undefined,
      contact_consent: form.consent,
      consent_version: "v2-2026",
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
    };
    const parsed = ConsultationInputSchema.safeParse(candidate);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      setError(issue?.message || "Please check the highlighted details and try again.");
      trackLeadFormEvent("lead_form_validation_error", {
        landingId: landing.id,
        service: landing.serviceId,
        city: landing.city,
        interactionLocation: "paid_landing_form",
        field: issue?.path[0]?.toString(),
      });
      return;
    }

    if (!canSubmit) {
      setError("Site survey requests will be enabled at launch.");
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      const result = await submitConsultationServerFn({ data: parsed.data });
      if (!result.success || !result.leadId) {
        setError(result.error || "We could not register the request. Please try again.");
        return;
      }

      trackConsultationLead({
        leadId: result.leadId,
        city: landing.city,
        service: landing.serviceId,
        landingId: landing.id,
        campaign: attribution.utm_campaign || attribution.campaign,
      });
      setLeadId(result.leadId);
    } catch (submissionError) {
      console.warn("[Paid lead form] Submission failed:", submissionError);
      setError("We could not register the request. Please try again shortly.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (leadId) {
    const reference = `LEAD-${leadId.slice(0, 8).toUpperCase()}`;
    return (
      <section
        aria-live="polite"
        className="border border-[#1C1917]/10 bg-white p-7 md:p-9 shadow-xl"
      >
        <CheckCircle2 aria-hidden="true" className="mb-5 size-9 text-[#F37021]" />
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#F37021]">
          Request received
        </p>
        <h2 className="mt-2 sn-h2 text-[#1C1917]">
          Your site survey is registered.
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#57534E]">
          Keep this reference for follow-up:{" "}
          <strong className="font-medium text-[#1C1917]">{reference}</strong>
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {BRAND_CONFIG.contact.whatsappLink ? (
            <a
              href={BRAND_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEngagement("whatsapp", "paid_form_success", {
                  landingId: landing.id,
                  service: landing.serviceId,
                  city: landing.city,
                })
              }
              className="sn-btn-luxury-solid"
            >
              <MessageSquare aria-hidden="true" className="mr-2 size-4" /> WhatsApp
            </a>
          ) : null}
          {BRAND_CONFIG.contact.phoneHref ? (
            <a
              href={BRAND_CONFIG.contact.phoneHref}
              onClick={() =>
                trackEngagement("phone", "paid_form_success", {
                  landingId: landing.id,
                  service: landing.serviceId,
                  city: landing.city,
                })
              }
              className="sn-btn-luxury-dark"
            >
              <Phone aria-hidden="true" className="mr-2 size-4" /> Call
            </a>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section id="quote-form" className="border border-[#1C1917]/10 bg-white p-6 shadow-2xl sm:p-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#F37021]">
        Request a site survey
      </p>
      <h2 className="mt-2 sn-h2 text-[#1C1917]">
        Tell us where you need protection.
      </h2>
      <p className="mt-2 text-sm text-[#78716C]">{landing.serviceName} is already selected.</p>

      {!canSubmit ? (
        <div className="mt-5 border border-[#1C1917]/10 bg-[#F4EFEA] p-3 text-xs text-[#57534E]">
          Requests are staged for launch. Production contact and site-status settings are required
          to enable this form.
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        onFocusCapture={trackStart}
        className="mt-6 space-y-4"
        noValidate
      >
        <div>
          <label
            htmlFor={`${landing.id}-name`}
            className="mb-1.5 block text-xs font-medium text-[#44403C]"
          >
            Name
          </label>
          <input
            id={`${landing.id}-name`}
            autoComplete="name"
            value={form.name}
            onChange={(event) => setField("name", event.target.value)}
            className="min-h-12 w-full border border-[#1C1917]/15 bg-[#FAF8F5] px-4 outline-none transition focus:border-[#F37021] focus:ring-2 focus:ring-[#F37021]/20"
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${landing.id}-phone`}
              className="mb-1.5 block text-xs font-medium text-[#44403C]"
            >
              Mobile number
            </label>
            <input
              id={`${landing.id}-phone`}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              value={form.phone}
              onChange={(event) => setField("phone", event.target.value.replace(/\D/g, ""))}
              placeholder="10-digit number"
              className="min-h-12 w-full border border-[#1C1917]/15 bg-[#FAF8F5] px-4 outline-none transition focus:border-[#F37021] focus:ring-2 focus:ring-[#F37021]/20"
              required
            />
          </div>
          <div>
            <label
              htmlFor={`${landing.id}-pincode`}
              className="mb-1.5 block text-xs font-medium text-[#44403C]"
            >
              Pincode
            </label>
            <input
              id={`${landing.id}-pincode`}
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={6}
              value={form.pincode}
              onChange={(event) => setField("pincode", event.target.value.replace(/\D/g, ""))}
              placeholder="6-digit pincode"
              className="min-h-12 w-full border border-[#1C1917]/15 bg-[#FAF8F5] px-4 outline-none transition focus:border-[#F37021] focus:ring-2 focus:ring-[#F37021]/20"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor={`${landing.id}-locality`}
            className="mb-1.5 block text-xs font-medium text-[#44403C]"
          >
            Locality / city
          </label>
          <input
            id={`${landing.id}-locality`}
            autoComplete="address-level2"
            value={form.locality}
            onChange={(event) => setField("locality", event.target.value)}
            placeholder={`Locality in ${landing.city}`}
            className="min-h-12 w-full border border-[#1C1917]/15 bg-[#FAF8F5] px-4 outline-none transition focus:border-[#F37021] focus:ring-2 focus:ring-[#F37021]/20"
            required
          />
        </div>
        <div>
          <label
            htmlFor={`${landing.id}-notes`}
            className="mb-1.5 block text-xs font-medium text-[#44403C]"
          >
            Notes <span className="font-normal text-[#A8A29E]">(optional)</span>
          </label>
          <textarea
            id={`${landing.id}-notes`}
            rows={3}
            maxLength={1000}
            value={form.notes}
            onChange={(event) => setField("notes", event.target.value)}
            placeholder="Balcony, window, staircase, or any site details"
            className="w-full resize-y border border-[#1C1917]/15 bg-[#FAF8F5] px-4 py-3 outline-none transition focus:border-[#F37021] focus:ring-2 focus:ring-[#F37021]/20"
          />
        </div>
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-[#57534E]">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(event) => setField("consent", event.target.checked)}
            className="mt-1 size-4 shrink-0 accent-[#F37021]"
          />
          <span>
            I agree that {BRAND_CONFIG.name} may contact me by phone or WhatsApp about this request.
            See the{" "}
            <Link to="/privacy" className="underline underline-offset-2 hover:text-[#F37021]">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {error ? (
          <p role="alert" className="border border-red-300 bg-red-50 p-3 text-xs text-red-700">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting || !canSubmit}
          className="sn-btn-luxury-solid min-h-12 w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-45"
        >
          {isSubmitting
            ? "Registering request…"
            : canSubmit
              ? "Get Site Survey / Quote"
              : "Requests Enabled at Launch"}
          {!isSubmitting && canSubmit ? (
            <ArrowRight aria-hidden="true" className="ml-2 size-4" />
          ) : null}
        </button>
        <p className="text-center text-[11px] text-[#78716C]">
          Your details are used only to respond to this service request.
        </p>
      </form>
    </section>
  );
}
