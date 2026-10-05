export interface ConsultationWhatsappDetails {
  name: string;
  mobile: string;
  serviceNames: string[];
  localityCity: string;
  pincode?: string;
  notes: string;
  /** Optional lead reference, e.g. "IG-HYD-K7Q2M9XA". Also used as the Google Ads transaction_id. */
  reference?: string;
}

export function buildConsultationWhatsappUrl(
  whatsappBaseUrl: string,
  details: ConsultationWhatsappDetails,
  brandName = "InvisProtect",
) {
  const reference = details.reference?.trim();
  const pincode = details.pincode?.trim();
  const message = [
    `Hello ${brandName},`,
    "",
    "I would like to request a quote / site survey.",
    "",
    `Name: ${details.name.trim()}`,
    `Mobile: ${details.mobile}`,
    `Service: ${details.serviceNames.join(", ")}`,
    `Location: ${details.localityCity.trim()}`,
    ...(pincode ? [`Pincode: ${pincode}`] : []),
    `Requirement: ${details.notes.trim() || "Not specified"}`,
    ...(reference ? [`Ref: ${reference}`] : []),
    "",
    "Please contact me with the quotation / site survey details.",
  ].join("\n");

  return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/**
 * Creates a short, unique lead reference such as "IG-HYD-K7Q2M9XA".
 * The customer sees it in the WhatsApp message and Google Ads receives the
 * same value as transaction_id, so a junk lead can later be matched and
 * retracted in Google Ads by this reference.
 */
export function createLeadRef(
  prefix: string,
  randomBytes: (length: number) => Uint8Array = defaultRandomBytes,
): string {
  const bytes = randomBytes(8);
  let code = "";
  for (let i = 0; i < 8; i += 1) {
    code += REF_ALPHABET[bytes[i]! % REF_ALPHABET.length];
  }
  const cleanPrefix = prefix
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "");
  return cleanPrefix ? `${cleanPrefix}-${code}` : code;
}

function defaultRandomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  if (typeof globalThis.crypto?.getRandomValues === "function") {
    globalThis.crypto.getRandomValues(bytes);
    return bytes;
  }
  for (let i = 0; i < length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  return bytes;
}
