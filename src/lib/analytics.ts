declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    trackGoogleConversion?: (actionType: string) => void;
  }
}

export const GADS_ACCOUNT_ID: string =
  typeof import.meta !== "undefined" &&
  (import.meta.env?.VITE_GADS_ACCOUNT_ID || import.meta.env?.VITE_GOOGLE_ADS_ID)
    ? String(import.meta.env.VITE_GADS_ACCOUNT_ID || import.meta.env.VITE_GOOGLE_ADS_ID)
    : "";

export const GADS_PRIMARY_LEAD_CONVERSION: string =
  typeof import.meta !== "undefined" &&
  (import.meta.env?.VITE_GADS_PRIMARY_LEAD_CONVERSION ||
    import.meta.env?.VITE_GOOGLE_ADS_CONVERSION_LABEL)
    ? String(
        import.meta.env.VITE_GADS_PRIMARY_LEAD_CONVERSION ||
          import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL,
      )
    : "";

// Cache of fired conversion IDs in this browser session to prevent duplicate firing
const firedConversions = new Set<string>();

/**
 * Secondary / Observation Event Tracking
 * Tracks intent signals (phone clicks, WhatsApp link taps, navigation)
 * NEVER triggers primary Google Ads conversion actions.
 */
export function trackEngagement(
  action: "phone" | "whatsapp" | "email" | "navigation" | "survey_open",
  location: string,
) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: `click_${action}`,
      event_category: "Engagement",
      event_label: location,
      engagement_type: action,
      interaction_location: location,
      timestamp: new Date().toISOString(),
    });

    if (typeof window.gtag === "function") {
      window.gtag("event", `click_${action}`, {
        event_category: "Engagement",
        event_label: location,
      });
    }
  } catch (err) {
    console.warn("[Analytics] Engagement tracking notice:", err);
  }
}

export interface LeadConversionData {
  leadId: string;
  phone?: string;
  city?: string;
  value?: number;
}

/**
 * Primary Lead Conversion Tracking
 * MUST ONLY fire after a genuine customer consultation lead is successfully persisted by the database.
 * Deduplicates with transaction_id / lead_id.
 */
export function trackConsultationLead(leadData: LeadConversionData) {
  if (typeof window === "undefined") return;

  if (firedConversions.has(leadData.leadId)) {
    console.info(`[Analytics] Lead conversion already recorded for ID: ${leadData.leadId}`);
    return;
  }

  firedConversions.add(leadData.leadId);

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "consultation_submission",
      lead_id: leadData.leadId,
      city: leadData.city,
      value: leadData.value ?? 50.0,
      currency: "INR",
      transaction_id: leadData.leadId,
      timestamp: new Date().toISOString(),
    });

    if (GADS_PRIMARY_LEAD_CONVERSION && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: GADS_PRIMARY_LEAD_CONVERSION,
        value: leadData.value ?? 50.0,
        currency: "INR",
        transaction_id: leadData.leadId,
      });
      console.info(
        "[Analytics] Primary Google Ads consultation conversion recorded:",
        leadData.leadId,
      );
    } else {
      console.info(
        "[Analytics] Consultation lead recorded locally (Google Ads conversion inactive in pre-handover mode):",
        leadData.leadId,
      );
    }
  } catch (err) {
    console.warn("[Analytics] Lead tracking notice:", err);
  }
}

/** Compatibility alias */
export const trackQualifiedLead = trackConsultationLead;

/**
 * SPA Page View Tracking for Client-Side Route Transitions
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_location: url,
      page_title: title || document.title,
    });

    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_location: url,
        page_title: title || document.title,
      });
    }
  } catch (err) {
    console.warn("[Analytics] Page view tracking notice:", err);
  }
}
