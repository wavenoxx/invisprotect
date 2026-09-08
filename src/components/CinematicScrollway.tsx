import { Link } from "@tanstack/react-router";

export interface SlideItem {
  id: number;
  category: string;
  title: string;
  descriptor: string;
  action: string;
  link: string;
  imageDesktop: string;
  imageMobile: string;
}

/**
 * CinematicScrollway — 10 Visual Banners in Hermès Luxury Aesthetic:
 * - Desktop View: 2.39:1 Panoramic Widescreen Aspect Ratio.
 * - Mobile View: 4:5 Portrait Luxury Aspect Ratio.
 * - Supports separate desktop and mobile image assets per slide.
 */
export const slides: SlideItem[] = [
  {
    id: 1,
    category: "Invisible Grills",
    title: "The Invisible Threshold",
    descriptor: "Balcony & Window Invisible Grills",
    action: "Discover",
    link: "/category/invisible-grills",
    imageDesktop: "/images/homepage/banner-1-desktop.png",
    imageMobile: "/images/homepage/banner-1-mobile.png",
  },
  {
    id: 2,
    category: "Core Safety Nets",
    title: "The Weightless Embrace",
    descriptor: "Balcony & Children Safety Nets",
    action: "Discover",
    link: "/category/core-safety-nets",
    imageDesktop: "/images/homepage/banner-2-desktop.png",
    imageMobile: "/images/homepage/banner-2-mobile.png",
  },
  {
    id: 3,
    category: "Construction & Industrial",
    title: "Structural Architecture",
    descriptor: "Heavy-Duty Debris & Fall Containment",
    action: "Discover",
    link: "/category/construction-industrial",
    imageDesktop: "/images/homepage/banner-3-desktop.png",
    imageMobile: "/images/homepage/banner-3-mobile.png",
  },
  {
    id: 4,
    category: "Animal & Bird Protection",
    title: "The Winged Sanctuary",
    descriptor: "Pigeon Nets & Stainless Steel Bird Spikes",
    action: "Discover",
    link: "/category/animal-bird-protection",
    imageDesktop: "/images/homepage/banner-4-desktop.png",
    imageMobile: "/images/homepage/banner-4-mobile.png",
  },
  {
    id: 5,
    category: "Specialty Solutions",
    title: "The Aperture Collection",
    descriptor: "Sports Practice Nets & Ceiling Cloth Hangers",
    action: "Discover",
    link: "/category/specialty-solutions",
    imageDesktop: "/images/homepage/banner-5-desktop.png",
    imageMobile: "/images/homepage/banner-5-mobile.png",
  },
  {
    id: 6,
    category: "The Atelier",
    title: "Genesis of Serenity",
    descriptor: "Atelier Heritage & Brand Ethos",
    action: "Explore",
    link: "/our-story",
    imageDesktop: "/images/homepage/banner-6-desktop.png",
    imageMobile: "/images/homepage/banner-6-mobile.png",
  },
  {
    id: 7,
    category: "The Atelier",
    title: "The Forged Elegance",
    descriptor: "Materials, Metallurgy & Tensile Science",
    action: "Explore",
    link: "/craftsmanship",
    imageDesktop: "/images/homepage/banner-7-desktop.png",
    imageMobile: "/images/homepage/banner-7-mobile.png",
  },
  {
    id: 8,
    category: "The Atelier",
    title: "Boundless Horizons",
    descriptor: "Architectural Living Spaces & Views",
    action: "Explore",
    link: "/lifestyle",
    imageDesktop: "/images/homepage/banner-8-desktop.png",
    imageMobile: "/images/homepage/banner-8-mobile.png",
  },
  {
    id: 9,
    category: "Maintenance & Care",
    title: "The Enduring Shield",
    descriptor: "Cleaning, Inspection & Retensioning Protocol",
    action: "Learn More",
    link: "/maintenance-repair",
    imageDesktop: "/images/homepage/banner-9-desktop.png",
    imageMobile: "/images/homepage/banner-9-mobile.png",
  },
  {
    id: 10,
    category: "Regional Operations",
    title: "Verified Service Hubs",
    descriptor: "Hyderabad · Vizag · Vijayawada · Amaravati · Tirupati · Warangal · Hanamkonda",
    action: "View Areas",
    link: "/service-areas",
    imageDesktop: "/images/homepage/banner-10-desktop.png",
    imageMobile: "/images/homepage/banner-10-mobile.png",
  },
];

export function CinematicScrollway() {
  return (
    <div className="w-full flex flex-col bg-[#FAF8F5] z-10 relative select-none">
      {slides.map((slide) => (
        <Link
          key={slide.id}
          to={slide.link}
          className="sn-chanel-slide group relative w-full aspect-[4/5] md:aspect-[2.39/1] focus-ring border-b border-[#1C1917]/10 flex flex-col justify-end overflow-hidden"
          aria-label={`${slide.action}: ${slide.descriptor} (${slide.title})`}
        >
          {/* Visual Image Background Container */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            {/* Desktop Visual Image (2.39:1 Panoramic Widescreen) */}
            <img
              src={slide.imageDesktop}
              alt={`${slide.title} — ${slide.descriptor} (Desktop View)`}
              className="hidden md:block w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />

            {/* Mobile Visual Image (4:5 Portrait Aspect Ratio) */}
            <img
              src={slide.imageMobile}
              alt={`${slide.title} — ${slide.descriptor} (Mobile View 4:5)`}
              className="md:hidden w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Soft Warm Ambient Vignette Overlay for Crisp Text Legibility */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(28,25,23,0.75) 0%, rgba(28,25,23,0.25) 45%, rgba(28,25,23,0.02) 100%)",
            }}
          />

          {/* Center-to-Down Typography Overlay */}
          <div className="relative z-20 flex flex-col items-center text-center w-full px-4 sm:px-6 md:px-12 pb-10 sm:pb-12 md:pb-[6%] max-w-3xl mx-auto">
            {/* Category Eyebrow */}
            <span className="sn-eyebrow text-[#FAF8F5]/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] mb-1.5 sm:mb-2 uppercase block">
              {slide.category}
            </span>

            {/* Collection / Section Title */}
            <h2 className="sn-h1 text-white max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] mb-1.5 sm:mb-2 px-2 text-center">
              {slide.title}
            </h2>

            {/* Plain Descriptor */}
            <p className="sn-subtext text-[#FAF8F5]/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] mb-4 sm:mb-5 max-w-md px-2 text-center">
              {slide.descriptor}
            </p>

            {/* Reference Framed Action Button */}
            <span className="sn-btn-luxury">{slide.action}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CinematicScrollway;
