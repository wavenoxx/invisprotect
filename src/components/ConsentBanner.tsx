import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";
import { readStoredConsent, updateGoogleConsent } from "@/lib/consent";
import { clearPersistedAttribution, persistCurrentAttribution } from "@/lib/attribution";

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isPaidLanding = pathname.startsWith("/lp/");

  useEffect(() => {
    try {
      const stored = readStoredConsent();
      if (!stored) {
        // Delay slightly for a smooth, non-intrusive appearance
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    updateGoogleConsent(true);
    persistCurrentAttribution();
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    updateGoogleConsent(false);
    clearPersistedAttribution();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  if (isPaidLanding) {
    return (
      <aside
        aria-label="Privacy and Cookie Choices"
        className="fixed bottom-[calc(4.25rem+env(safe-area-inset-bottom))] left-3 right-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300 md:bottom-6 md:left-auto md:right-6 md:max-w-xl"
      >
        <div className="border border-[#1C1917]/15 bg-white/95 px-4 py-2.5 text-[#1C1917] shadow-xl backdrop-blur-md">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] leading-snug font-light text-[#44403C]">
              {BRAND_CONFIG.name || "InvisProtect"} uses essential cookies, and optional ones to
              measure enquiries.{" "}
              <Link
                to="/privacy"
                className="underline decoration-[#1C1917]/30 underline-offset-2 hover:text-brand focus-ring"
              >
                Privacy
              </Link>
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="inline-flex min-h-8 cursor-pointer items-center justify-center bg-brand px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-deep focus-ring"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="inline-flex min-h-8 cursor-pointer items-center justify-center border border-[#1C1917]/20 bg-[#FAF8F5] px-3 py-1 text-[10px] font-light uppercase tracking-[0.16em] text-[#1C1917] transition-colors hover:border-[#1C1917]/40 focus-ring"
              >
                Essential only
              </button>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Privacy and Cookie Choices"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="bg-white/95 backdrop-blur-md border border-[#1C1917]/10 shadow-2xl p-5 md:p-6 text-[#1C1917] rounded-none">
        <div className="flex items-start justify-between gap-4 mb-3">
          <p
            className="uppercase text-[9.5px] tracking-[0.28em] text-[#78716C] font-medium"
            style={{ fontWeight: 500 }}
          >
            Privacy &amp; Data Stewardship
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
        </div>

        <h3 className="font-display text-xs font-medium text-[#1C1917] uppercase tracking-[0.16em] mb-2">
          Your Privacy Choices
        </h3>

        <p className="text-[11.5px] text-[#44403C] font-light leading-relaxed mb-4">
          {BRAND_CONFIG.name || "This website"} uses essential cookies for site security and
          optional analytical measurements to evaluate architectural inquiry quality. We respect
          your choice.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-[#1C1917]/10">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="flex-1 inline-flex items-center justify-center bg-brand text-white px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-brand-deep shadow-sm transition-colors min-h-11 focus-ring cursor-pointer"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="flex-1 inline-flex items-center justify-center border border-[#1C1917]/20 bg-[#FAF8F5] text-[#1C1917] px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-light hover:border-[#1C1917]/40 transition-colors min-h-11 focus-ring cursor-pointer"
          >
            Essential Only
          </button>
        </div>

        <div className="mt-3 text-center">
          <Link
            to="/privacy"
            className="text-[10px] uppercase tracking-widest text-[#78716C] hover:text-brand hover:underline underline-offset-4 focus-ring transition-colors"
          >
            Read Privacy Declaration →
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default ConsentBanner;
