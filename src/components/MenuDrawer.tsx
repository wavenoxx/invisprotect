import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";

import { BrandLogo } from "./BrandLogo";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export function MenuDrawer({ isOpen, onClose, onOpenContact }: MenuDrawerProps) {
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
        className={`absolute inset-0 bg-[#1C1917]/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-full max-w-sm bg-[#FAF8F5] text-[#1C1917] border-r border-[#1C1917]/10 shadow-2xl p-8 md:p-12 flex flex-col justify-between transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Main Navigation Menu"
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1C1917]/10">
          <BrandLogo variant="horizontal" color="#1C1917" goldColor="#C5A880" />
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex items-center gap-1.5 text-[10px] md:text-xs font-light tracking-[0.2em] text-[#78716C] hover:text-[#F37021] cursor-pointer uppercase bg-transparent border-0 min-h-11 px-2 focus-ring transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Close
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-start overflow-y-auto pr-2">
          <nav
            aria-label="Primary site navigation"
            className="flex flex-col text-xs md:text-sm font-light text-[#1C1917] tracking-[0.08em] text-left"
          >
            <Link
              to="/category/$categoryId"
              params={{ categoryId: "invisible-grills" }}
              onClick={onClose}
              className="font-sans font-light tracking-[0.08em] text-[#1C1917] hover:text-[#F37021] transition-colors py-2 focus-ring"
            >
              Invisible Grills
            </Link>
            <Link
              to="/category/$categoryId"
              params={{ categoryId: "core-safety-nets" }}
              onClick={onClose}
              className="font-sans font-light tracking-[0.08em] text-[#1C1917] hover:text-[#F37021] transition-colors py-2 focus-ring"
            >
              Core Safety Nets
            </Link>
            <Link
              to="/category/$categoryId"
              params={{ categoryId: "construction-industrial" }}
              onClick={onClose}
              className="font-sans font-light tracking-[0.08em] text-[#1C1917] hover:text-[#F37021] transition-colors py-2 focus-ring"
            >
              Construction &amp; Industrial
            </Link>
            <Link
              to="/category/$categoryId"
              params={{ categoryId: "animal-bird-protection" }}
              onClick={onClose}
              className="font-sans font-light tracking-[0.08em] text-[#1C1917] hover:text-[#F37021] transition-colors py-2 focus-ring"
            >
              Animal &amp; Bird Protection
            </Link>
            <Link
              to="/category/$categoryId"
              params={{ categoryId: "specialty-solutions" }}
              onClick={onClose}
              className="font-sans font-light tracking-[0.08em] text-[#1C1917] hover:text-[#F37021] transition-colors py-2 focus-ring"
            >
              Specialty Solutions
            </Link>

            <div className="w-12 h-[0.5px] bg-[#1C1917]/15 my-3" />

            <Link
              to="/solutions"
              onClick={onClose}
              className="font-sans font-light tracking-[0.08em] text-[#1C1917] hover:text-[#F37021] transition-colors py-2 focus-ring"
            >
              Solutions Explorer
            </Link>
            <Link
              to="/lifestyle"
              onClick={onClose}
              className="font-sans font-light tracking-[0.08em] text-[#1C1917] hover:text-[#F37021] transition-colors py-2 focus-ring"
            >
              The Lifestyle
            </Link>
            <Link
              to="/craftsmanship"
              onClick={onClose}
              className="font-sans font-light tracking-[0.08em] text-[#1C1917] hover:text-[#F37021] transition-colors py-2 focus-ring"
            >
              The Craftsmanship
            </Link>
            <Link
              to="/our-story"
              onClick={onClose}
              className="font-sans font-light tracking-[0.08em] text-[#1C1917] hover:text-[#F37021] transition-colors py-2 focus-ring"
            >
              Our Story
            </Link>
            <Link
              to="/warranty"
              onClick={onClose}
              className="font-sans font-light tracking-[0.08em] text-[#1C1917] hover:text-[#F37021] transition-colors py-2 focus-ring"
            >
              Warranty Terms
            </Link>
            <Link
              to="/safety-faq"
              onClick={onClose}
              className="font-sans font-light tracking-[0.08em] text-[#1C1917] hover:text-[#F37021] transition-colors py-2 focus-ring"
            >
              Safety FAQ
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#1C1917]/10 pt-6 text-xs font-light text-[#44403C] tracking-wider">
          <button
            type="button"
            onClick={onOpenContact}
            className="flex items-center gap-3 font-sans font-light tracking-[0.08em] text-[#1C1917] hover:text-[#F37021] transition-colors cursor-pointer bg-transparent border-0 min-h-11 px-1 focus-ring text-left"
          >
            <svg
              className="w-4 h-4 text-[#F37021]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Client Service Advisory
          </button>

          <div className="flex items-center gap-3 font-sans font-light tracking-[0.08em] text-[#78716C] text-[11px] py-1">
            <svg
              className="w-4 h-4 text-[#78716C]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Regional Operations · Telangana &amp; Andhra Pradesh
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuDrawer;
