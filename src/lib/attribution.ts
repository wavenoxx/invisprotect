import { hasMeasurementConsent } from "./consent.ts";

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

export const ATTRIBUTION_STORAGE_KEY = "attribution_data";
let memoryAttribution: AttributionData = {};

function boundedString(value: unknown, maxLength: number): string | undefined {
  return typeof value === "string" && value ? value.slice(0, maxLength) : undefined;
}

function normalizeAttribution(value: unknown): AttributionData {
  if (!value || typeof value !== "object") return {};
  const candidate = value as Record<string, unknown>;
  const short = (key: string) => boundedString(candidate[key], 100);
  const click = (key: string) => boundedString(candidate[key], 255);
  const long = (key: string) => boundedString(candidate[key], 1000);
  return {
    ...(click("gclid") ? { gclid: click("gclid") } : {}),
    ...(click("wbraid") ? { wbraid: click("wbraid") } : {}),
    ...(click("gbraid") ? { gbraid: click("gbraid") } : {}),
    ...(short("utm_source") ? { utm_source: short("utm_source") } : {}),
    ...(short("utm_medium") ? { utm_medium: short("utm_medium") } : {}),
    ...(short("utm_campaign") ? { utm_campaign: short("utm_campaign") } : {}),
    ...(short("utm_content") ? { utm_content: short("utm_content") } : {}),
    ...(short("utm_term") ? { utm_term: short("utm_term") } : {}),
    ...(short("source") ? { source: short("source") } : {}),
    ...(short("medium") ? { medium: short("medium") } : {}),
    ...(short("campaign") ? { campaign: short("campaign") } : {}),
    ...(short("content") ? { content: short("content") } : {}),
    ...(short("term") ? { term: short("term") } : {}),
    ...(long("referrer") ? { referrer: long("referrer") } : {}),
    ...(long("landing_page") ? { landing_page: long("landing_page") } : {}),
    ...(boundedString(candidate.captured_at, 40)
      ? { captured_at: boundedString(candidate.captured_at, 40) }
      : {}),
  };
}

function queryValue(params: URLSearchParams, key: string, maxLength: number): string | undefined {
  return boundedString(params.get(key), maxLength);
}

function safeLocationHref(): string {
  try {
    return window.location.href;
  } catch {
    return "";
  }
}

export function captureAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  const existing = getStoredAttribution();
  let urlParams = new URLSearchParams();
  try {
    urlParams = new URLSearchParams(window.location.search);
  } catch {
    // Continue with any previously stored attribution.
  }

  const gclid = queryValue(urlParams, "gclid", 255) || existing.gclid;
  const wbraid = queryValue(urlParams, "wbraid", 255) || existing.wbraid;
  const gbraid = queryValue(urlParams, "gbraid", 255) || existing.gbraid;
  const utm_source =
    queryValue(urlParams, "utm_source", 100) || existing.utm_source || existing.source;
  const utm_medium =
    queryValue(urlParams, "utm_medium", 100) || existing.utm_medium || existing.medium;
  const utm_campaign =
    queryValue(urlParams, "utm_campaign", 100) || existing.utm_campaign || existing.campaign;
  const utm_content =
    queryValue(urlParams, "utm_content", 100) || existing.utm_content || existing.content;
  const utm_term = queryValue(urlParams, "utm_term", 100) || existing.utm_term || existing.term;
  const referrer =
    existing.referrer ||
    boundedString(typeof document !== "undefined" ? document.referrer : "", 1000);
  const landing_page = existing.landing_page || boundedString(safeLocationHref(), 1000);
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
  memoryAttribution = current;

  persistCurrentAttribution();

  return current;
}

export function getStoredAttribution(): AttributionData {
  if (typeof window === "undefined") return {};
  if (!hasMeasurementConsent()) {
    clearPersistedAttribution();
    return memoryAttribution;
  }
  try {
    const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return memoryAttribution;
    const parsed = JSON.parse(raw);
    const normalized = normalizeAttribution(parsed);
    memoryAttribution = normalized;
    return normalized;
  } catch {
    return memoryAttribution;
  }
}

export function persistCurrentAttribution(): boolean {
  if (typeof window === "undefined" || !hasMeasurementConsent()) return false;
  if (Object.keys(memoryAttribution).length === 0) return false;
  try {
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(memoryAttribution));
    return true;
  } catch {
    // Attribution must never block a lead when storage is unavailable.
    return false;
  }
}

export function clearPersistedAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
  } catch {
    // Keep the in-memory copy so the current lead can still retain its source.
  }
}
