import { BRAND_CONFIG } from "@/config/brand";
import { trackEngagement } from "@/lib/analytics";

type ContactAction = "phone" | "whatsapp";

function trackDockEngagement(action: ContactAction) {
  try {
    trackEngagement(action, "homepage_contact_dock");
  } catch {
    // Contact navigation must remain available if analytics is unavailable.
  }
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m7.1 3.75 2.2-.55c.45-.11.91.13 1.1.56l1.15 2.74c.17.4.07.87-.26 1.15L9.8 8.95a12.2 12.2 0 0 0 5.24 5.24l1.29-1.5c.28-.33.75-.43 1.15-.26l2.74 1.15c.43.18.67.65.56 1.1l-.55 2.2a2.35 2.35 0 0 1-2.29 1.8c-6.98 0-12.62-5.64-12.62-12.62a2.35 2.35 0 0 1 1.78-2.31Z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20.45 11.95a8.4 8.4 0 0 1-12.36 7.39L3.6 20.5l1.18-4.35a8.45 8.45 0 1 1 15.67-4.2Z" />
      <path d="M8.32 7.72c.17-.37.36-.4.68-.4h.53c.2 0 .38.08.47.32l.7 1.7c.08.2.04.38-.11.56l-.53.66c-.15.17-.11.34-.02.5a7.2 7.2 0 0 0 2.25 2.25c.17.1.34.13.51-.02l.73-.61c.18-.15.38-.19.58-.1l1.62.76c.22.1.31.28.28.5a2.45 2.45 0 0 1-1.02 1.65c-.53.34-1.22.52-2 .29-1.12-.33-2.54-.99-4-2.38-1.15-1.1-1.95-2.35-2.32-3.45-.25-.75-.08-1.59.25-2.23Z" />
    </svg>
  );
}

const glassActionClass =
  "group relative flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:absolute before:inset-0.5 before:rounded-full before:border before:border-white/38 before:bg-[linear-gradient(145deg,rgba(255,255,255,0.24),rgba(120,113,108,0.16)_46%,rgba(28,25,23,0.24))] before:shadow-[0_6px_18px_rgba(12,10,8,0.15),inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(0,0,0,0.12)] before:backdrop-blur-[12px] before:transition-[border-color,background-color,box-shadow] before:duration-[240ms] before:content-[''] after:pointer-events-none after:absolute after:top-[5px] after:left-[9px] after:h-[8px] after:w-[18px] after:rounded-full after:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.48),rgba(255,255,255,0))] after:opacity-70 after:transition-opacity after:duration-[240ms] after:content-[''] active:scale-[0.97] active:after:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent md:hover:-translate-y-0.5 md:hover:scale-[1.03] md:hover:before:border-white/58 md:hover:before:bg-[linear-gradient(145deg,rgba(255,255,255,0.31),rgba(120,113,108,0.2)_46%,rgba(28,25,23,0.27))] md:hover:before:shadow-[0_8px_20px_rgba(12,10,8,0.17),inset_0_1px_0_rgba(255,255,255,0.52),inset_0_-1px_0_rgba(0,0,0,0.1)] md:hover:after:opacity-100";

export function LuxuryContactDock() {
  if (!BRAND_CONFIG.contact.enabled) return null;

  const phoneDial = BRAND_CONFIG.contact.phoneDial.trim();
  const whatsappLink = BRAND_CONFIG.contact.whatsappLink.trim();

  if (!phoneDial && !whatsappLink) return null;

  return (
    <aside aria-label="Quick contact" className="pointer-events-none fixed inset-0 z-[60]">
      {phoneDial && (
        <div className="pointer-events-auto absolute bottom-[calc(0.5rem+env(safe-area-inset-bottom))] left-4 md:bottom-7 md:left-7">
          <a
            href={`tel:${phoneDial}`}
            aria-label="Call InvisProtect"
            onClick={() => trackDockEngagement("phone")}
            className={glassActionClass}
          >
            <span className="relative z-10 text-[#E99A68] transition-[color,filter] duration-[240ms] group-focus-visible:text-[#FFB07D] md:group-hover:text-[#FFB07D] md:group-hover:drop-shadow-[0_0_4px_rgba(233,154,104,0.24)]">
              <PhoneIcon className="h-[17px] w-[17px]" />
            </span>
          </a>
        </div>
      )}

      {whatsappLink && (
        <div className="pointer-events-auto absolute right-4 bottom-[calc(0.5rem+env(safe-area-inset-bottom))] md:right-7 md:bottom-7">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact InvisProtect on WhatsApp"
            onClick={() => trackDockEngagement("whatsapp")}
            className={glassActionClass}
          >
            <span className="relative z-10 text-[#74B691] transition-[color,filter] duration-[240ms] group-focus-visible:text-[#8CC9A7] md:group-hover:text-[#8CC9A7] md:group-hover:drop-shadow-[0_0_4px_rgba(116,182,145,0.24)]">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
            </span>
          </a>
        </div>
      )}
    </aside>
  );
}

export default LuxuryContactDock;
