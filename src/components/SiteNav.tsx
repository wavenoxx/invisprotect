import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";
import ContactDrawer from "./ContactDrawer";
import MenuDrawer from "./MenuDrawer";

/**
 * SiteNav — Quiet Luxury Architectural Header.
 *
 * Mobile & Desktop:
 * - Left: Clean 2-line minimal icon (+ 'Menu' label on sm+).
 * - Center: Pure, ultra-luxurious brand serif typography (InvisProtect).
 * - Right: Clean luxury Profile / Contact icon (text on sm+).
 */
export function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-[#FAF8F5]/94 backdrop-blur-xl border-b border-[#1C1917]/10 text-[#1C1917] shadow-[0_4px_24px_rgba(28,25,23,0.06)]"
            : "bg-transparent border-b border-transparent text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
        }`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8 lg:px-12 py-2.5 sm:py-3.5 lg:py-4 w-full">
          {/* ─────────────────────────────────────────────────────────────
              LEFT: Minimal 2-Line Menu Icon (Icon only on mobile, text on desktop)
              ───────────────────────────────────────────────────────────── */}
          <div className="flex items-center min-w-0 justify-start">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className={`flex items-center gap-2.5 min-h-11 min-w-11 px-1 cursor-pointer group focus-ring transition-colors ${
                isScrolled
                  ? "text-[#1C1917] hover:text-[#F37021]"
                  : "text-white hover:text-white/80"
              }`}
              aria-label="Open navigation menu"
            >
              <span className="flex flex-col gap-[5.5px] justify-center py-1">
                <span
                  className={`block w-[20px] sm:w-[17px] h-[1.5px] sm:h-px transition-colors ${
                    isScrolled ? "bg-[#1C1917] group-hover:bg-[#F37021]" : "bg-white"
                  }`}
                />
                <span
                  className={`block w-[20px] sm:w-[17px] h-[1.5px] sm:h-px transition-colors ${
                    isScrolled ? "bg-[#1C1917] group-hover:bg-[#F37021]" : "bg-white"
                  }`}
                />
              </span>
              <span
                className="hidden sm:inline text-[12px] sm:text-[13px] font-light tracking-[0.06em]"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Menu
              </span>
            </button>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CENTER: Brand Identity (Pure Ultra-Luxurious Typography)
              ───────────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-center min-w-0 px-1">
            <Link
              to="/"
              className="flex items-center justify-center min-h-11 px-1 focus-ring transition-opacity hover:opacity-85"
              aria-label={BRAND_CONFIG.name ? `${BRAND_CONFIG.name} Home` : "InvisProtect Home"}
            >
              <span
                className={`font-serif text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] tracking-[0.22em] sm:tracking-[0.28em] md:tracking-[0.34em] uppercase font-light transition-colors whitespace-nowrap select-none ${
                  isScrolled
                    ? "text-[#1C1917]"
                    : "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
                }`}
                style={{ fontWeight: 300 }}
              >
                {BRAND_CONFIG.name || "InvisProtect"}
              </span>
            </Link>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT: Contact Action (Icon only on mobile, text on desktop)
              ───────────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-end min-w-0">
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className={`flex items-center justify-end gap-2 min-h-11 min-w-11 px-1 cursor-pointer focus-ring transition-colors ${
                isScrolled
                  ? "text-[#1C1917] hover:text-[#F37021]"
                  : "text-white hover:text-white/80"
              }`}
              aria-label="Open client service contact"
            >
              {/* Mobile View: Clean Profile / Contact Icon */}
              <span className="sm:hidden flex items-center justify-center p-1 text-current">
                <User size={22} strokeWidth={1.3} />
              </span>

              {/* Desktop View: Clean Text */}
              <span
                className="hidden sm:inline text-[12px] sm:text-[13px] font-light tracking-[0.06em]"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Contact us
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenContact={() => {
          setIsMenuOpen(false);
          setIsContactOpen(true);
        }}
      />
      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}

export default SiteNav;
