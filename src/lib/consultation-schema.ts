import { z } from "zod";

export function normalizeIndianPhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  const national = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(national) ? `+91${national}` : null;
}

export const ConsultationInputSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z.string().refine((value) => normalizeIndianPhone(value) !== null, {
    message: "Please enter a valid 10-digit Indian mobile number",
  }),
  city_hub: z.string().trim().min(2, "Please enter your locality or city").max(100),
  pincode: z
    .string()
    .trim()
    .regex(/^[1-9]\d{5}$/, "Please enter a valid 6-digit pincode"),
  services: z.array(z.string().trim().min(1)).min(1, "Select at least one safety solution").max(10),
  notes: z.string().trim().max(1000).optional(),
  contact_consent: z.literal(true, { message: "Please agree to be contacted about this request" }),
  consent_version: z.string().trim().min(1).max(40).default("v2-2026"),
  verification_method: z.enum(["sms_otp", "direct_phone", "unverified"]).default("direct_phone"),
  verified: z.boolean().default(false),
  source: z.string().max(100).optional(),
  medium: z.string().max(100).optional(),
  campaign: z.string().max(100).optional(),
  term: z.string().max(100).optional(),
  content: z.string().max(100).optional(),
  landing_page: z.string().max(1000).optional(),
  referrer: z.string().max(1000).optional(),
  gclid: z.string().max(255).optional(),
  wbraid: z.string().max(255).optional(),
  gbraid: z.string().max(255).optional(),
  landing_id: z.string().trim().max(120).optional(),
  form_variant: z.string().trim().max(80).optional(),
});

export type ConsultationInput = z.infer<typeof ConsultationInputSchema>;
