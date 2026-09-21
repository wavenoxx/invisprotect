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
  align?: "left" | "center";
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
  align = "left",
  isDark = true,
  color,
  alt = BRAND_CONFIG.name || "InvisProtect",
}: BrandLogoProps) {
  const effectiveIsDark =
    color === "#FAF8F5" || color === "#FFFFFF" || color === "white" ? false : isDark;
  const textColor = effectiveIsDark ? "text-[#1C1917]" : "text-[#FAF8F5]";
  const subColor = effectiveIsDark ? "text-[#78716C]" : "text-[#A8A29E]";

  const displayName = BRAND_CONFIG.name || "InvisProtect";

  const isCenter =
    align === "center" || className.includes("text-center") || className.includes("items-center");
  const alignmentClass = isCenter ? "items-center text-center" : "items-start text-left";

  if (variant === "monogram") {
    return (
      <span
        className={`font-brand font-extrabold text-[14px] sm:text-[16px] tracking-[0.12em] mr-[-0.12em] sm:tracking-[0.14em] sm:mr-[-0.14em] uppercase leading-tight transition-colors ${textColor} ${className}`}
        aria-label={alt}
      >
        {displayName}
      </span>
    );
  }

  return (
    <div className={`flex flex-col select-none ${alignmentClass} ${className}`} aria-label={alt}>
      <span
        className={`font-brand font-extrabold text-[14px] sm:text-[16px] tracking-[0.12em] mr-[-0.12em] sm:tracking-[0.14em] sm:mr-[-0.14em] uppercase leading-tight transition-colors ${textColor}`}
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
