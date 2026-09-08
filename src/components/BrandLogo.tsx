import { BRAND_CONFIG } from "@/config/brand";

interface BrandMarkProps {
  className?: string;
  isDark?: boolean;
  alt?: string;
}

/**
 * BrandMark — Minimalist architectural window and cable motif.
 * Serves as an elegant, neutral placeholder mark until official client logo assets are supplied.
 */
export function BrandMark({
  className = "h-10 sm:h-12 w-auto",
  isDark = false,
  alt = "Architectural Safety Brand Mark",
}: BrandMarkProps) {
  const strokeColor = isDark ? "#1C1917" : "#FAF8F5";
  const accentColor = "#C5A880";

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`object-contain transition-opacity duration-300 ${className}`}
      aria-label={alt}
      role="img"
    >
      {/* Outer refined architectural frame */}
      <rect x="4.5" y="4.5" width="39" height="39" rx="1" stroke={strokeColor} strokeWidth="1.5" />
      {/* Vertical architectural cable lines */}
      <line
        x1="16.5"
        y1="4.5"
        x2="16.5"
        y2="43.5"
        stroke={strokeColor}
        strokeWidth="1"
        strokeOpacity="0.75"
      />
      <line x1="24" y1="4.5" x2="24" y2="43.5" stroke={strokeColor} strokeWidth="1.25" />
      <line
        x1="31.5"
        y1="4.5"
        x2="31.5"
        y2="43.5"
        stroke={strokeColor}
        strokeWidth="1"
        strokeOpacity="0.75"
      />
      {/* Horizontal precision transom line */}
      <line
        x1="4.5"
        y1="24"
        x2="43.5"
        y2="24"
        stroke={strokeColor}
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      {/* Central gold geometric diamond accent */}
      <polygon points="24,19 28,24 24,29 20,24" fill={accentColor} />
    </svg>
  );
}

interface BrandLogoProps {
  className?: string;
  variant?: "monogram" | "full" | "horizontal";
  isDark?: boolean;
  color?: string;
  goldColor?: string;
  alt?: string;
}

/**
 * BrandLogo — Primary brand identity treatment.
 * Renders the architectural mark accompanied by refined typography.
 */
export function BrandLogo({
  className = "h-10 w-auto",
  variant = "full",
  isDark = true,
  color,
  alt = BRAND_CONFIG.name || "InvisProtect",
}: BrandLogoProps) {
  if (variant === "monogram") {
    return <BrandMark className={className} isDark={isDark} alt={alt} />;
  }

  const effectiveIsDark =
    color === "#FAF8F5" || color === "#FFFFFF" || color === "white" ? false : isDark;
  const textColor = effectiveIsDark ? "text-[#1C1917]" : "text-[#FAF8F5]";
  const subColor = effectiveIsDark ? "text-[#78716C]" : "text-[#A8A29E]";

  const displayName = BRAND_CONFIG.name || "InvisProtect";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} aria-label={alt}>
      <BrandMark className="h-9 w-9 shrink-0" isDark={effectiveIsDark} alt={alt} />
      <div className="flex flex-col text-left">
        <span
          className={`font-serif text-[15px] sm:text-[17px] tracking-[0.26em] uppercase font-light leading-tight transition-colors ${textColor}`}
          style={{ fontWeight: 300 }}
        >
          {displayName}
        </span>
        <span
          className={`text-[8.5px] sm:text-[9.5px] tracking-[0.28em] uppercase font-light mt-0.5 ${subColor}`}
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Invisible Grills &amp; Safety Nets
        </span>
      </div>
    </div>
  );
}

export default BrandLogo;
