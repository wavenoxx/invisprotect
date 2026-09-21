export type NavAppearance = "overlay" | "solid";

export type NavTone = "light-on-image" | "dark-on-cream";

export function resolveNavTone(appearance: NavAppearance, isScrolled: boolean): NavTone {
  if (appearance === "overlay" && !isScrolled) {
    return "light-on-image";
  }
  return "dark-on-cream";
}
