declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown> | unknown[]>;
    gtag?: (...args: unknown[]) => void;
    trackGoogleConversion?: (actionType: string) => void;
  }
}

function publicEnv(name: string): string {
  const viteValue =
    typeof import.meta !== "undefined" && import.meta.env ? import.meta.env[name] : undefined;
  const processValue = typeof process !== "undefined" ? process.env?.[name] : undefined;
  return String(viteValue || processValue || "").trim();
}

function validAdsAccountId(value: string): string {
  return /^AW-\d+$/.test(value) ? value : "";
}

function validConversionDestination(value: string): string {
  return /^AW-\d+\/[A-Za-z0-9_-]+$/.test(value) ? value : "";
}

function configuredLeadValue(): number | undefined {
  const raw = publicEnv("VITE_GADS_LEAD_VALUE");
  if (!raw) return undefined;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : undefined;
}

export const GADS_ACCOUNT_ID = validAdsAccountId(
  publicEnv("VITE_GADS_ACCOUNT_ID") || publicEnv("VITE_GOOGLE_ADS_ID"),
);

const configuredConversionDestination = validConversionDestination(
  publicEnv("VITE_GADS_PRIMARY_LEAD_CONVERSION") || publicEnv("VITE_GOOGLE_ADS_CONVERSION_LABEL"),
);

export const GADS_PRIMARY_LEAD_CONVERSION =
  GADS_ACCOUNT_ID && configuredConversionDestination.startsWith(`${GADS_ACCOUNT_ID}/`)
    ? configuredConversionDestination
    : "";

export const GADS_LEAD_VALUE = configuredLeadValue();

const firedConversions = new Set<string>();
const DEDUPE_PREFIX = "gads_primary_lead:";
let lastTrackedPageLocation = "";

export interface AnalyticsMetadata {
  landingId?: string;
  service?: string;
  city?: string;
  campaign?: string;
  interactionLocation?: string;
}

function analyticsMetadata(metadata: AnalyticsMetadata): Record<string, string> {
  return {
    ...(metadata.landingId ? { landing_id: metadata.landingId } : {}),
    ...(metadata.service ? { service: metadata.service } : {}),
    ...(metadata.city ? { city: metadata.city } : {}),
    ...(metadata.campaign ? { campaign: metadata.campaign } : {}),
    ...(metadata.interactionLocation ? { interaction_location: metadata.interactionLocation } : {}),
  };
}

export function trackEngagement(
  action: "phone" | "whatsapp" | "email" | "navigation" | "survey_open" | "social",
  location: string,
  metadata: Omit<AnalyticsMetadata, "interactionLocation"> = {},
) {
  if (typeof window === "undefined") return;
  const eventName = action === "survey_open" ? "survey_open" : `click_${action}`;
  const eventData = {
    event_category: "Engagement",
    engagement_type: action,
    ...analyticsMetadata({ ...metadata, interactionLocation: location }),
  };

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...eventData, timestamp: new Date().toISOString() });
    window.gtag?.("event", eventName, eventData);
  } catch (err) {
    console.warn("[Analytics] Engagement tracking notice:", err);
  }
}

export function trackLeadFormEvent(
  eventName: "lead_form_start" | "lead_form_validation_error",
  metadata: AnalyticsMetadata & { field?: string },
) {
  if (typeof window === "undefined") return;
  const eventData = {
    ...analyticsMetadata(metadata),
    ...(metadata.field ? { field: metadata.field } : {}),
  };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...eventData, timestamp: new Date().toISOString() });
    window.gtag?.("event", eventName, eventData);
  } catch (err) {
    console.warn("[Analytics] Lead form tracking notice:", err);
  }
}

export interface LeadConversionData {
  leadId: string;
  city?: string;
  service?: string;
  landingId?: string;
  campaign?: string;
  value?: number;
}

function alreadyTracked(leadId: string): boolean {
  if (firedConversions.has(leadId)) return true;
  try {
    return window.sessionStorage?.getItem(`${DEDUPE_PREFIX}${leadId}`) === "1";
  } catch {
    return false;
  }
}

function rememberTracked(leadId: string): void {
  firedConversions.add(leadId);
  try {
    window.sessionStorage?.setItem(`${DEDUPE_PREFIX}${leadId}`, "1");
  } catch {
    // In-memory deduplication remains available when session storage is blocked.
  }
}

export function trackConsultationLead(leadData: LeadConversionData) {
  if (typeof window === "undefined" || !leadData.leadId || alreadyTracked(leadData.leadId)) return;

  const value = leadData.value ?? GADS_LEAD_VALUE;
  const metadata = analyticsMetadata({
    city: leadData.city,
    service: leadData.service,
    landingId: leadData.landingId,
    campaign: leadData.campaign,
  });
  const valueData = value === undefined ? {} : { value, currency: "INR" };

  rememberTracked(leadData.leadId);
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "consultation_submission",
      lead_id: leadData.leadId,
      transaction_id: leadData.leadId,
      ...metadata,
      ...valueData,
      timestamp: new Date().toISOString(),
    });

    if (GADS_PRIMARY_LEAD_CONVERSION && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: GADS_PRIMARY_LEAD_CONVERSION,
        transaction_id: leadData.leadId,
        ...valueData,
      });
    }
  } catch (err) {
    console.warn("[Analytics] Lead tracking notice:", err);
  }
}

export function trackPageView(url: string, title?: string) {
  if (
    typeof window === "undefined" ||
    !GADS_ACCOUNT_ID ||
    typeof window.gtag !== "function" ||
    lastTrackedPageLocation === url
  ) {
    return;
  }
  const eventData = { page_location: url, page_title: title || document.title };
  lastTrackedPageLocation = url;
  try {
    window.gtag("event", "page_view", eventData);
  } catch (err) {
    console.warn("[Analytics] Page view tracking notice:", err);
  }
}
