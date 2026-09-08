import { BRAND_CONFIG } from "@/config/brand";

interface BrandMarkProps {
  className?: string;
  isDark?: boolean;
  alt?: string;
}

/**
 * BrandMark — Deprecated. Square mark has been removed across the entire site in favor of pure typography.
 */
export function BrandMark(_props?: BrandMarkProps) {
  return null;
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
 * Renders pure, refined architectural typography.
 */
export function BrandLogo({
  className = "",
  variant = "full",
  isDark = true,
  color,
  alt = BRAND_CONFIG.name || "InvisProtect",
}: BrandLogoProps) {
  const effectiveIsDark =
    color === "#FAF8F5" || color === "#FFFFFF" || color === "white" ? false : isDark;
  const textColor = effectiveIsDark ? "text-[#1C1917]" : "text-[#FAF8F5]";
  const subColor = effectiveIsDark ? "text-[#78716C]" : "text-[#A8A29E]";

  const displayName = BRAND_CONFIG.name || "InvisProtect";

  if (variant === "monogram") {
    return (
      <span
        className={`font-serif text-[16px] sm:text-[18px] tracking-[0.28em] uppercase font-light leading-tight transition-colors ${textColor} ${className}`}
        style={{ fontWeight: 300 }}
        aria-label={alt}
      >
        {displayName}
      </span>
    );
  }

  return (
    <div className={`flex flex-col text-left select-none ${className}`} aria-label={alt}>
      <span
        className={`font-serif text-[16px] sm:text-[18px] tracking-[0.26em] sm:tracking-[0.30em] uppercase font-light leading-tight transition-colors ${textColor}`}
        style={{ fontWeight: 300 }}
      >
        {displayName}
      </span>
      <span
        className={`text-[8.5px] sm:text-[9.5px] tracking-[0.24em] uppercase font-light mt-1 ${subColor}`}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        Invisible Grills &amp; Safety Nets
      </span>
    </div>
  );
}

export default BrandLogo;
