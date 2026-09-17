import { CONSENT_STORAGE_KEY } from "./google-tag.ts";

export interface ConsentState {
  ad_storage: "granted" | "denied";
  analytics_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  timestamp: string;
}

const consentKeys = [
  "ad_storage",
  "analytics_storage",
  "ad_user_data",
  "ad_personalization",
] as const;

export function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(
      localStorage.getItem(CONSENT_STORAGE_KEY) || "null",
    ) as Partial<ConsentState> | null;
    if (!parsed || typeof parsed !== "object") return null;
    if (!consentKeys.every((key) => parsed[key] === "granted" || parsed[key] === "denied")) {
      return null;
    }
    if (typeof parsed.timestamp !== "string" || !parsed.timestamp) return null;
    return parsed as ConsentState;
  } catch {
    return null;
  }
}

export function hasMeasurementConsent(): boolean {
  const consent = readStoredConsent();
  return Boolean(consent && consentKeys.every((key) => consent[key] === "granted"));
}

export function updateGoogleConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  const state = granted ? "granted" : "denied";
  const consentData: ConsentState = {
    ad_storage: state,
    analytics_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    timestamp: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
  } catch {
    // The queued consent update still applies for the current page.
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
  window.gtag("consent", "update", {
    ad_storage: state,
    analytics_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}
