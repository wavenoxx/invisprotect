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
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20.5 11.9a8.45 8.45 0 0 1-12.45 7.43L3.5 20.5l1.2-4.4a8.5 8.5 0 1 1 15.8-4.2Z" />
      <path d="M8.25 7.65c.18-.4.38-.42.72-.43h.6c.2 0 .4.08.5.35l.72 1.76c.08.22.04.4-.12.6l-.55.68c-.16.18-.12.36-.02.53.56.97 1.35 1.76 2.32 2.32.18.1.36.14.54-.02l.76-.64c.2-.16.4-.2.62-.1l1.67.78c.24.12.34.3.3.54-.12.7-.48 1.32-1.06 1.7-.55.35-1.28.54-2.08.3-1.16-.34-2.62-1.02-4.12-2.45-1.2-1.14-2.02-2.43-2.4-3.57-.26-.78-.08-1.65.26-2.35Z" />
    </svg>
  );
}

const desktopActionClass =
  "group flex h-[50px] w-[50px] items-center justify-end overflow-hidden rounded-full border bg-[#FAF8F5]/88 text-[#292524] shadow-[0_10px_30px_rgba(28,25,23,0.14),inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-xl transition-[width,border-color,background-color,box-shadow] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:w-[132px] focus-visible:outline-none hover:w-[132px]";

const desktopLabelClass =
  "pointer-events-none max-w-0 translate-x-1 overflow-hidden whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.17em] opacity-0 transition-[max-width,opacity,transform] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-visible:max-w-[82px] group-focus-visible:translate-x-0 group-focus-visible:opacity-100 group-hover:max-w-[82px] group-hover:translate-x-0 group-hover:opacity-100";

export function LuxuryContactDock() {
  if (!BRAND_CONFIG.contact.enabled) return null;

  const phoneDial = BRAND_CONFIG.contact.phoneDial.trim();
  const whatsappLink = BRAND_CONFIG.contact.whatsappLink.trim();

  if (!phoneDial && !whatsappLink) return null;

  return (
    <aside aria-label="Quick contact" className="pointer-events-none fixed inset-0 z-[60]">
      <div className="pointer-events-auto absolute right-7 bottom-7 hidden flex-col items-end gap-2.5 md:flex">
        {phoneDial && (
          <a
            href={`tel:${phoneDial}`}
            aria-label="Call InvisProtect"
            onClick={() => trackDockEngagement("phone")}
            className={`${desktopActionClass} border-[#F37021]/20 hover:border-[#F37021]/45 hover:bg-[#FFFDFC]/94 hover:shadow-[0_12px_34px_rgba(28,25,23,0.16),inset_0_1px_0_rgba(255,255,255,0.86)] focus-visible:border-[#F37021]/55 focus-visible:ring-2 focus-visible:ring-[#F37021]/20`}
          >
            <span className={`${desktopLabelClass} pl-4 pr-0.5`}>Call Us</span>
            <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center text-[#D95F1E] transition-transform duration-[260ms] group-focus-visible:-translate-y-px group-hover:-translate-y-px">
              <Phone aria-hidden="true" size={18} strokeWidth={1.55} />
            </span>
          </a>
        )}

        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact InvisProtect on WhatsApp"
            onClick={() => trackDockEngagement("whatsapp")}
            className={`${desktopActionClass} border-[#2F7D59]/20 hover:border-[#2F7D59]/40 hover:bg-[#FFFDFC]/94 hover:shadow-[0_12px_34px_rgba(28,25,23,0.16),inset_0_1px_0_rgba(255,255,255,0.86)] focus-visible:border-[#2F7D59]/50 focus-visible:ring-2 focus-visible:ring-[#2F7D59]/20`}
          >
            <span className={`${desktopLabelClass} pl-4 pr-0.5`}>WhatsApp</span>
            <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center text-[#2F7D59] transition-transform duration-[260ms] group-focus-visible:-translate-y-px group-hover:-translate-y-px">
              <WhatsAppIcon className="h-[19px] w-[19px]" />
            </span>
          </a>
        )}
      </div>

      <div className="pointer-events-auto absolute bottom-[calc(0.25rem+env(safe-area-inset-bottom))] left-1/2 flex h-[52px] -translate-x-1/2 items-center overflow-hidden rounded-full border border-white/60 bg-[#FAF8F5]/90 shadow-[0_10px_30px_rgba(28,25,23,0.16),inset_0_1px_0_rgba(255,255,255,0.82)] backdrop-blur-xl md:hidden">
        {phoneDial && (
          <a
            href={`tel:${phoneDial}`}
            aria-label="Call InvisProtect"
            onClick={() => trackDockEngagement("phone")}
            className="flex h-[52px] min-w-[58px] items-center justify-center text-[#D95F1E] transition-colors duration-200 hover:bg-white/50 focus-visible:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F37021]/35"
          >
            <Phone aria-hidden="true" size={18} strokeWidth={1.6} />
          </a>
        )}

        {phoneDial && whatsappLink && (
          <span aria-hidden="true" className="h-5 w-px bg-[#1C1917]/12" />
        )}

        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact InvisProtect on WhatsApp"
            onClick={() => trackDockEngagement("whatsapp")}
            className="flex h-[52px] min-w-[58px] items-center justify-center text-[#2F7D59] transition-colors duration-200 hover:bg-white/50 focus-visible:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2F7D59]/35"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        )}
      </div>
    </aside>
  );
}

export default LuxuryContactDock;
