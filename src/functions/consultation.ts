import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { notifyOwnerWhatsApp } from "@/server/notify-whatsapp";

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

export const ConsultationInputSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  phone: z
    .string()
    .min(10, "Valid 10-digit mobile number required")
    .max(15)
    .regex(/^(?:\+91|91)?[6-9]\d{9}$/, "Please provide a valid Indian mobile number"),
  city_hub: z.string().min(1, "Location is required").max(100),
  pincode: z.string().min(4, "Valid pincode required").max(10),
  services: z.array(z.string()).min(1, "Select at least one safety solution"),
  notes: z.string().max(1000).optional(),
  consent_version: z.string().default("1.0"),
  verification_method: z.enum(["sms_otp", "direct_phone", "unverified"]).default("direct_phone"),
  verified: z.boolean().default(false),
  // Attribution parameters
  source: z.string().max(100).optional(),
  medium: z.string().max(100).optional(),
  campaign: z.string().max(100).optional(),
  term: z.string().max(100).optional(),
  content: z.string().max(100).optional(),
  landing_page: z.string().max(255).optional(),
  referrer: z.string().max(255).optional(),
  gclid: z.string().max(255).optional(),
  wbraid: z.string().max(255).optional(),
  gbraid: z.string().max(255).optional(),
});

export type ConsultationInput = z.infer<typeof ConsultationInputSchema>;

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

    // 2. Phone Normalization: ensure clean format
    const cleanPhone = data.phone.replace(/[^\d+]/g, "");
    const formattedPhone = cleanPhone.startsWith("+91")
      ? cleanPhone
      : cleanPhone.startsWith("91") && cleanPhone.length === 12
        ? `+${cleanPhone}`
        : `+91${cleanPhone.slice(-10)}`;

    const rawDigits = formattedPhone.replace(/\D/g, "").slice(-10);
    if (!checkRateLimit(rawDigits)) {
      console.warn(`[Consultation] Rate limit exceeded for phone: ${rawDigits}`);
      return {
        success: false,
        error:
          "A consultation request was recently created for this phone number. Our team will contact you shortly.",
      };
    }

    const now = new Date().toISOString();

    try {
      // 3. Database Insertion via Supabase Admin
      const { data: inserted, error: dbError } = await supabaseAdmin
        .from("consultations")
        .insert({
          name: data.name.trim(),
          phone: formattedPhone,
          city_hub: data.city_hub.trim(),
          pincode: data.pincode.trim(),
          services: data.services,
          notes: data.notes?.trim() || null,
          status: "new",
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
          consent_at: now,
          verified_at: data.verified ? now : null,
          verification_method: data.verification_method,
        })
        .select("id")
        .single();

      if (dbError || !inserted?.id) {
        console.error("[Consultation] Database insertion failure:", dbError?.message);
        return {
          success: false,
          error: "Unable to register site survey request. Please try again later.",
        };
      }

      const leadId = inserted.id;

      // 4. Trigger Server-Side WhatsApp Owner Notification (async non-blocking if configured)
      notifyOwnerWhatsApp({
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
        gclid: data.gclid,
        createdAt: now,
      }).catch((err) => {
        console.info("[Consultation] Background notification note:", err);
      });

      return {
        success: true,
        leadId,
      };
    } catch (err) {
      console.error("[Consultation] Processing exception:", err);
      return {
        success: false,
        error: "Unable to process request at this time. Please try again later.",
      };
    }
  });
