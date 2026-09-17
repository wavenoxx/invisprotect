import { Phone } from "lucide-react";
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

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
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
  "group relative flex h-11 w-11 overflow-hidden rounded-full border border-white/30 bg-[linear-gradient(145deg,rgba(87,83,78,0.42),rgba(28,25,23,0.25))] text-[#FAF8F5] shadow-[0_7px_22px_rgba(12,10,8,0.13),inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-1px_0_rgba(0,0,0,0.12)] backdrop-blur-[18px] transition-[width,transform,border-color,background-color,box-shadow] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] after:pointer-events-none after:absolute after:inset-px after:rounded-full after:border after:border-white/10 after:content-[''] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:hover:-translate-y-0.5 md:hover:scale-[1.03] md:hover:border-white/48 md:hover:bg-[linear-gradient(145deg,rgba(105,100,94,0.48),rgba(28,25,23,0.3))] md:hover:shadow-[0_9px_26px_rgba(12,10,8,0.16),inset_0_1px_0_rgba(255,255,255,0.48),inset_0_-1px_0_rgba(0,0,0,0.1)]";

const glassLabelClass =
  "pointer-events-none relative z-10 hidden max-w-0 translate-y-px overflow-hidden opacity-0 transition-[max-width,opacity,transform] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:block md:group-focus-visible:max-w-[92px] md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100 md:group-hover:max-w-[92px] md:group-hover:translate-y-0 md:group-hover:opacity-100";

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
            className={`${glassActionClass} justify-start md:focus-visible:w-[136px] md:hover:w-[136px]`}
          >
            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center text-[#E99662] transition-transform duration-[250ms] md:group-focus-visible:-translate-y-px md:group-hover:-translate-y-px">
              <Phone aria-hidden="true" size={16} strokeWidth={1.45} />
            </span>
            <span className={glassLabelClass}>
              <span className="block whitespace-nowrap pr-4 pl-1 font-sans text-[9px] font-medium tracking-[0.2em]">
                CALL US
              </span>
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
            className={`${glassActionClass} justify-end md:focus-visible:w-[136px] md:hover:w-[136px]`}
          >
            <span className={glassLabelClass}>
              <span className="block whitespace-nowrap pr-1 pl-4 font-sans text-[9px] font-medium tracking-[0.2em]">
                WHATSAPP
              </span>
            </span>
            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center text-[#6EAA89] transition-transform duration-[250ms] md:group-focus-visible:-translate-y-px md:group-hover:-translate-y-px">
              <WhatsAppIcon className="h-[17px] w-[17px]" />
            </span>
          </a>
        </div>
      )}
    </aside>
  );
}

export default LuxuryContactDock;
