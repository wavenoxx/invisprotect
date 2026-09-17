import { createServerFn } from "@tanstack/react-start";
import { notifyOwnerWhatsApp } from "@/server/notify-whatsapp";
import {
  ConsultationInputSchema,
  normalizeIndianPhone,
  type ConsultationInput,
} from "@/lib/consultation-schema";
import { registerOrAwaitTask, type WaitUntil } from "@/server/request-lifetime";

// Rate limiting state: in-memory map per phone digits
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const phoneRequestHistory = new Map<string, number[]>();

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const history = phoneRequestHistory.get(key) || [];
  const validHistory = history.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (validHistory.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  validHistory.push(now);
  phoneRequestHistory.set(key, validHistory);
  return true;
}

export interface ConsultationResponse {
  success: boolean;
  leadId?: string;
  error?: string;
}

export const submitConsultationServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => ConsultationInputSchema.parse(data))
  .handler(async ({ data }): Promise<ConsultationResponse> => {
    // 1. Check if backend infrastructure is configured
    const hasSupabase = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

    if (!hasSupabase) {
      return {
        success: false,
        error: "Site survey requests will be enabled at launch.",
      };
    }

    // 2. Normalize only after the shared schema validates the number.
    const formattedPhone = normalizeIndianPhone(data.phone);
    if (!formattedPhone) {
      return { success: false, error: "Please enter a valid 10-digit Indian mobile number." };
    }

    const rawDigits = formattedPhone.replace(/\D/g, "").slice(-10);
    if (!checkRateLimit(rawDigits)) {
      console.warn("[Consultation] Local burst limit exceeded.");
      return {
        success: false,
        error: "Unable to register another request right now. Please try again later.",
      };
    }

    const now = new Date().toISOString();

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      // 3. The database function holds a transaction-scoped advisory lock for
      // this normalized phone, making duplicate detection safe across instances.
      const { data: insertionResult, error: dbError } = await supabaseAdmin
        .rpc("create_consultation_if_not_recent", {
          p_lead: {
            name: data.name.trim(),
            phone: formattedPhone,
            city_hub: data.city_hub.trim(),
            pincode: data.pincode.trim(),
            services: data.services,
            notes: data.notes?.trim() || null,
            source: data.source || null,
            medium: data.medium || null,
            campaign: data.campaign || null,
            term: data.term || null,
            content: data.content || null,
            landing_page: data.landing_page || null,
            referrer: data.referrer || null,
            gclid: data.gclid || null,
            wbraid: data.wbraid || null,
            gbraid: data.gbraid || null,
            consent_version: data.consent_version,
            contact_consent: data.contact_consent,
            verified: data.verified,
            verification_method: data.verification_method,
            landing_id: data.landing_id || null,
            form_variant: data.form_variant || null,
          },
        })
        .single();

      if (dbError) {
        console.error("[Consultation] Database insertion failure:", dbError?.message);
        return {
          success: false,
          error: "Unable to register site survey request. Please try again later.",
        };
      }

      if (!insertionResult?.was_created || !insertionResult.lead_id) {
        return {
          success: false,
          error: "Unable to register another request right now. Please try again later.",
        };
      }

      const leadId = insertionResult.lead_id;

      // 4. Register the bounded notification task with the request runtime. Nitro's
      // Cloudflare adapter maps Request.waitUntil to ExecutionContext.waitUntil.
      // Other targets without that extension await the same task before responding.
      const notificationTask = notifyOwnerWhatsApp({
        leadId,
        customerName: data.name.trim(),
        mobileNumber: formattedPhone,
        pincode: data.pincode.trim(),
        cityHub: data.city_hub.trim(),
        services: data.services,
        notes: data.notes?.trim(),
        source: data.source,
        medium: data.medium,
        campaign: data.campaign,
        landingPage: data.landing_page,
        landingId: data.landing_id,
        formVariant: data.form_variant,
        gclid: data.gclid,
        wbraid: data.wbraid,
        gbraid: data.gbraid,
        createdAt: now,
      }).catch(() => {
        console.error("[Consultation] Owner notification failed after lead persistence.");
      });

      let waitUntil: WaitUntil | undefined;
      try {
        const { getRequest } = await import("@tanstack/react-start/server");
        const request = getRequest() as Request & { waitUntil?: WaitUntil };
        waitUntil =
          typeof request.waitUntil === "function" ? request.waitUntil.bind(request) : undefined;
      } catch {
        console.info("[Consultation] Request deferral unavailable; awaiting notification attempt.");
      }
      await registerOrAwaitTask(notificationTask, waitUntil);

      return {
        success: true,
        leadId,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown processing failure";
      console.error("[Consultation] Processing exception:", message);
      return {
        success: false,
        error: "Unable to process request at this time. Please try again later.",
      };
    }
  });

export { ConsultationInputSchema, type ConsultationInput };
