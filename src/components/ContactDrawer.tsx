import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";
import { trackEngagement } from "@/lib/analytics";
import { BrandLogo } from "./BrandLogo";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      previouslyFocusedElementRef.current?.focus();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[80] transition-all duration-300 ${
        isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[#1C1917]/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Slide-over Sidebar */}
      <div
        className={`fixed top-0 right-0 z-[80] h-full w-full max-w-md bg-[#FAF8F5] text-[#1C1917] border-l border-[#1C1917]/10 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Client Service Advisory"
      >
        {/* Top Header & Close */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-[#1C1917]/10">
          <BrandLogo variant="horizontal" color="#1C1917" goldColor="#C5A880" />
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close client service menu"
            className="min-w-11 min-h-11 flex items-center justify-center text-[#78716C] hover:text-[#F37021] transition-colors cursor-pointer focus-ring"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="flex flex-col gap-4">
            {/* Request Survey CTA */}
            <Link
              to="/consultation"
              onClick={() => {
                trackEngagement("survey_open", "contact_drawer");
                onClose();
              }}
              className="w-full bg-[#F37021] text-white p-5 flex items-center justify-between text-left hover:bg-[#D9531E] shadow-md transition-colors duration-300 min-h-11 focus-ring"
            >
              <div>
                <span className="block text-sm font-medium tracking-wide">Request Site Survey</span>
                <span className="block text-[10px] text-white/80 font-light mt-0.5 tracking-wider uppercase">
                  Complimentary laser measurement
                </span>
              </div>
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* WhatsApp */}
            {BRAND_CONFIG.contact.enabled ? (
              <a
                href={BRAND_CONFIG.socials.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEngagement("whatsapp", "contact_drawer")}
                className="w-full border border-[#1C1917]/10 bg-white p-5 flex items-center justify-between text-left hover:border-[#F37021] hover:shadow-sm transition-all duration-300 group min-h-11 focus-ring"
              >
                <div>
                  <span className="block text-sm font-medium text-[#1C1917] tracking-wide group-hover:text-[#F37021] transition-colors">
                    WhatsApp Direct
                  </span>
                  <span className="block text-[11px] text-[#78716C] font-light mt-0.5">
                    {BRAND_CONFIG.contact.whatsappDisplay}
                  </span>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-5 h-5 text-[#78716C] group-hover:text-[#F37021] transition-colors"
                >
                  <path
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ) : (
              <div className="w-full border border-[#1C1917]/10 bg-white/70 p-5 flex items-center justify-between text-left min-h-11 cursor-default">
                <div>
                  <span className="block text-sm font-medium text-[#1C1917] tracking-wide">
                    WhatsApp Direct
                  </span>
                  <span className="block text-[11px] text-[#78716C] font-light mt-0.5">
                    Coordinated via survey booking
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono text-[#78716C] tracking-wider bg-[#1C1917]/5 px-2.5 py-1">
                  On Request
                </span>
              </div>
            )}

            {/* Call Us */}
            {BRAND_CONFIG.contact.enabled ? (
              <a
                href={`tel:${BRAND_CONFIG.contact.phoneDial}`}
                onClick={() => trackEngagement("phone", "contact_drawer")}
                className="w-full border border-[#1C1917]/10 bg-white p-5 flex items-center justify-between text-left hover:border-[#F37021] hover:shadow-sm transition-all duration-300 group min-h-11 focus-ring"
              >
                <div>
                  <span className="block text-sm font-medium text-[#1C1917] tracking-wide group-hover:text-[#F37021] transition-colors">
                    Call Direct
                  </span>
                  <span className="block text-[11px] text-[#78716C] font-light mt-0.5">
                    {BRAND_CONFIG.contact.phoneDisplay}
                  </span>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-5 h-5 text-[#78716C] group-hover:text-[#F37021] transition-colors"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ) : (
              <div className="w-full border border-[#1C1917]/10 bg-white/70 p-5 flex items-center justify-between text-left min-h-11 cursor-default">
                <div>
                  <span className="block text-sm font-medium text-[#1C1917] tracking-wide">
                    Phone Advisory
                  </span>
                  <span className="block text-[11px] text-[#78716C] font-light mt-0.5">
                    Coordinated via survey booking
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono text-[#78716C] tracking-wider bg-[#1C1917]/5 px-2.5 py-1">
                  On Request
                </span>
              </div>
            )}

            {/* Email */}
            {BRAND_CONFIG.contact.enabled ? (
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                onClick={() => trackEngagement("email", "contact_drawer")}
                className="w-full border border-[#1C1917]/10 bg-white p-5 flex items-center justify-between text-left hover:border-[#F37021] hover:shadow-sm transition-all duration-300 group min-h-11 focus-ring"
              >
                <div>
                  <span className="block text-sm font-medium text-[#1C1917] tracking-wide group-hover:text-[#F37021] transition-colors">
                    Send an Email
                  </span>
                  <span className="block text-[11px] text-[#78716C] font-light mt-0.5">
                    {BRAND_CONFIG.contact.email}
                  </span>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-5 h-5 text-[#78716C] group-hover:text-[#F37021] transition-colors"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 5l10 7 10-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ) : (
              <div className="w-full border border-[#1C1917]/10 bg-white/70 p-5 flex items-center justify-between text-left min-h-11 cursor-default">
                <div>
                  <span className="block text-sm font-medium text-[#1C1917] tracking-wide">
                    Email Desk
                  </span>
                  <span className="block text-[11px] text-[#78716C] font-light mt-0.5">
                    Direct inquiries via survey request
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono text-[#78716C] tracking-wider bg-[#1C1917]/5 px-2.5 py-1">
                  On Request
                </span>
              </div>
            )}
          </div>

          {/* Regional Hubs Coverage Info */}
          <div className="mt-8 border-t border-[#1C1917]/10 pt-6">
            <h3 className="text-[11px] font-medium uppercase tracking-widest text-[#1C1917] mb-3">
              Verified Operational Hubs
            </h3>
            <p className="text-xs text-[#78716C] leading-relaxed font-light mb-4">
              Direct master technicians deployed across 7 primary hubs in Telangana &amp; Andhra
              Pradesh: Hyderabad, Visakhapatnam, Vijayawada, Amaravati, Tirupati, Warangal, and
              Hanamkonda.
            </p>
            <Link
              to="/service-areas"
              onClick={onClose}
              className="text-xs text-[#F37021] underline underline-offset-4 hover:text-[#D9531E] transition-colors font-medium"
            >
              View Locality Index →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDrawer;
