/**
 * Server-only WhatsApp Owner Notification Adapter.
 * Dispatches a formatted lead summary to the operations team via Meta WhatsApp Cloud API.
 *
 * SECURITY:
 * - Server environment secrets only (WHATSAPP_API_TOKEN, WHATSAPP_PHONE_NUMBER_ID, OWNER_WHATSAPP_PHONE).
 * - NEVER log or transmit OTPs, passwords, session tokens, or API secrets.
 * - Fails safely without breaking client lead confirmation if unconfigured.
 */

export interface LeadNotificationPayload {
  leadId: string;
  customerName: string;
  mobileNumber: string;
  pincode: string;
  cityHub: string;
  services: string[];
  notes?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  landingPage?: string;
  gclid?: string;
  createdAt: string;
}

export interface NotificationResult {
  success: boolean;
  status: "dispatched" | "unconfigured" | "failed";
  messageId?: string;
  error?: string;
}

export async function notifyOwnerWhatsApp(
  payload: LeadNotificationPayload,
): Promise<NotificationResult> {
  const apiToken = process.env.WHATSAPP_API_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const ownerPhone =
    process.env.OWNER_WHATSAPP_PHONE || process.env.WHATSAPP_NOTIFICATION_RECIPIENT;

  // Graceful unconfigured state
  if (!apiToken || !phoneNumberId || !ownerPhone) {
    const missing: string[] = [];
    if (!apiToken) missing.push("WHATSAPP_API_TOKEN (or WHATSAPP_ACCESS_TOKEN)");
    if (!phoneNumberId) missing.push("WHATSAPP_PHONE_NUMBER_ID");
    if (!ownerPhone) missing.push("OWNER_WHATSAPP_PHONE (or WHATSAPP_NOTIFICATION_RECIPIENT)");

    console.info(
      `[WhatsApp Adapter] Notification skipped (unconfigured environment variables: ${missing.join(", ")}). ` +
        `To enable Meta WhatsApp Cloud API notifications, configure these server environment secrets.`,
    );

    return {
      success: false,
      status: "unconfigured",
      error: `Missing server configuration: ${missing.join(", ")}`,
    };
  }

  const brandName = process.env.SITE_BRAND_NAME || process.env.VITE_BRAND_NAME || "InvisProtect";

  // Clean owner destination phone: digits only
  const cleanPhone = ownerPhone.replace(/[^\d]/g, "");

  // Format concise, readable plain-text lead notification
  const servicesList =
    payload.services && payload.services.length > 0
      ? payload.services.join(", ")
      : "General Site Survey";

  const attributionSummary =
    [
      payload.source ? `Source: ${payload.source}` : null,
      payload.medium ? `Medium: ${payload.medium}` : null,
      payload.campaign ? `Campaign: ${payload.campaign}` : null,
      payload.gclid ? `Google Ads (GCLID): Yes` : null,
    ]
      .filter(Boolean)
      .join(" | ") || "Direct / Organic";

  const messageBody = [
    `*🏛️ ${brandName} — New Private Site Survey Request*`,
    ``,
    `*Lead ID:* \`${payload.leadId}\``,
    `*Customer:* ${payload.customerName}`,
    `*Mobile:* ${payload.mobileNumber}`,
    `*Location:* ${payload.cityHub} (Pincode: ${payload.pincode})`,
    `*Requested Systems:* ${servicesList}`,
    payload.notes ? `*Notes:* ${payload.notes}` : null,
    ``,
    `*Attribution:* ${attributionSummary}`,
    payload.landingPage ? `*Landing:* ${payload.landingPage}` : null,
    `*Time:* ${new Date(payload.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
    ``,
    `_Action: Safety coordinator should connect via call/WhatsApp to confirm laser survey timing._`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const response = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: cleanPhone,
        type: "text",
        text: {
          preview_url: false,
          body: messageBody,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg =
        (errorData as { error?: { message?: string } })?.error?.message ||
        `HTTP ${response.status} ${response.statusText}`;

      console.error(`[WhatsApp Adapter] Meta Cloud API call failed: ${errorMsg}`);
      return {
        success: false,
        status: "failed",
        error: errorMsg,
      };
    }

    const data = (await response.json()) as { messages?: Array<{ id: string }> };
    const messageId = data.messages?.[0]?.id;

    console.info(`[WhatsApp Adapter] Lead notification sent successfully (ID: ${messageId})`);
    return {
      success: true,
      status: "dispatched",
      messageId,
    };
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : String(err);
    console.error(`[WhatsApp Adapter] Network or dispatch error: ${errMessage}`);
    return {
      success: false,
      status: "failed",
      error: errMessage,
    };
  }
}
