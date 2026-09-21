import { BRAND_CONFIG } from "@/config/brand";
import { trackEngagement } from "@/lib/analytics";

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className = "" }: SocialLinksProps) {
  const { instagram, facebook, youtube } = BRAND_CONFIG.socials;

  const channels = [
    {
      key: "instagram" as const,
      label: "Instagram",
      url: instagram,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[18px] h-[18px]"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      key: "facebook" as const,
      label: "Facebook",
      url: facebook,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[18px] h-[18px]"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      key: "youtube" as const,
      label: "YouTube",
      url: youtube,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[18px] h-[18px]"
          aria-hidden="true"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ].filter((item) => Boolean(item.url));

  if (channels.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 md:-mr-[13px] ${className}`}>
      {channels.map((ch) => (
        <a
          key={ch.key}
          href={ch.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEngagement("social", `footer_${ch.key}`)}
          className="flex h-11 w-11 items-center justify-center text-[#A8A29E] hover:text-[#F37021] transition-colors focus-ring cursor-pointer"
          aria-label={`Follow ${BRAND_CONFIG.name || "InvisProtect"} on ${ch.label}`}
        >
          {ch.icon}
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
