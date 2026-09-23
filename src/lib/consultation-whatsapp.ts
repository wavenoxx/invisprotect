export interface ConsultationWhatsappDetails {
  name: string;
  mobile: string;
  serviceNames: string[];
  localityCity: string;
  pincode: string;
  notes: string;
}

export function buildConsultationWhatsappUrl(
  whatsappBaseUrl: string,
  details: ConsultationWhatsappDetails,
  brandName = "InvisProtect",
) {
  const message = [
    `Hello ${brandName},`,
    "",
    "I would like to request a quote / site survey.",
    "",
    `Name: ${details.name.trim()}`,
    `Mobile: ${details.mobile}`,
    `Service: ${details.serviceNames.join(", ")}`,
    `Location: ${details.localityCity.trim()}`,
    `Pincode: ${details.pincode.trim()}`,
    `Requirement: ${details.notes.trim() || "Not specified"}`,
    "",
    "Please contact me with the quotation / site survey details.",
  ].join("\n");

  return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}
