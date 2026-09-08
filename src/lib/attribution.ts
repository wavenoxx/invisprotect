export interface AttributionData {
  gclid?: string;
  wbraid?: string;
  gbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrer?: string;
  landing_page?: string;
  captured_at?: string;
}

const STORAGE_KEY = "attribution_data";

export function captureAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existing = getStoredAttribution();

    const gclid = urlParams.get("gclid") || existing.gclid;
    const wbraid = urlParams.get("wbraid") || existing.wbraid;
    const gbraid = urlParams.get("gbraid") || existing.gbraid;
    const utm_source = urlParams.get("utm_source") || existing.utm_source || existing.source;
    const utm_medium = urlParams.get("utm_medium") || existing.utm_medium || existing.medium;
    const utm_campaign =
      urlParams.get("utm_campaign") || existing.utm_campaign || existing.campaign;
    const utm_content = urlParams.get("utm_content") || existing.utm_content || existing.content;
    const utm_term = urlParams.get("utm_term") || existing.utm_term || existing.term;
    const referrer = document.referrer || existing.referrer;
    const landing_page = existing.landing_page || window.location.href;
    const captured_at = existing.captured_at || new Date().toISOString();

    const current: AttributionData = {
      ...(gclid ? { gclid } : {}),
      ...(wbraid ? { wbraid } : {}),
      ...(gbraid ? { gbraid } : {}),
      ...(utm_source ? { utm_source, source: utm_source } : {}),
      ...(utm_medium ? { utm_medium, medium: utm_medium } : {}),
      ...(utm_campaign ? { utm_campaign, campaign: utm_campaign } : {}),
      ...(utm_content ? { utm_content, content: utm_content } : {}),
      ...(utm_term ? { utm_term, term: utm_term } : {}),
      ...(referrer ? { referrer } : {}),
      ...(landing_page ? { landing_page } : {}),
      captured_at,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));

    if (gclid) {
      document.cookie = `gclid=${encodeURIComponent(gclid)}; path=/; max-age=${30 * 86400}; SameSite=Lax`;
    }

    return current;
  } catch (err) {
    console.warn("[Attribution] Storage access notice:", err);
    return {};
  }
}

export function getStoredAttribution(): AttributionData {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as AttributionData;
  } catch {
    return {};
  }
}
