import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";
import { BUSINESS, hubCityList } from "@/config/business";

export const Route = createFileRoute("/our-story")({
  head: () =>
    buildMetaTags({
      title: `Genesis of Serenity — Atelier Heritage & Brand Ethos | ${BRAND_CONFIG.name}`,
      description: `The story of ${BRAND_CONFIG.name} — 11 times of the day from dawn to midnight, invisible safety engineered to honor modern architectural living with quiet grace.`,
      canonicalPath: "/our-story",
      ogImage: "/images/our-story/chapter-1.jpg",
    }),
  component: StoryPage,
});

type Chapter = { time: string; name: string; copy: string; image: string };

const CHAPTERS: Chapter[] = [
  {
    time: "05:00",
    name: "Dawn",
    copy: `A silent guardian wakes. Before the first light touches ${BUSINESS.regionLabel}, your sanctuary is secured.`,
    image: "/images/our-story/chapter-1.webp",
  },
  {
    time: "06:15",
    name: "Sunrise",
    copy: "Horizon liberated. We greet the morning light without iron bars. Boundless skies.",
    image: "/images/our-story/chapter-2.webp",
  },
  {
    time: "08:30",
    name: "Morning",
    copy: "Pure natural daylight without visual confinement. The view is entirely yours.",
    image: "/images/our-story/chapter-3.webp",
  },
  {
    time: "12:00",
    name: "Midday",
    copy: "Zenith strength. Under the blazing sun, our marine elements stand unyielding.",
    image: "/images/our-story/chapter-4.webp",
  },
  {
    time: "15:00",
    name: "Afternoon",
    copy: "Play without borders. Children explore freely with engineered perimeter micro-spacing.",
    image: "/images/our-story/chapter-5.webp",
  },
  {
    time: "17:30",
    name: "Evening",
    copy: "The evening breeze. Engineered barriers invite cooling airflow while keeping vectors out.",
    image: "/images/our-story/chapter-6.webp",
  },
  {
    time: "18:15",
    name: "Sunset",
    copy: "Pristine dusk. Pigeons seek other ledges; your balcony remains untouched.",
    image: "/images/our-story/chapter-7.webp",
  },
  {
    time: "18:45",
    name: "Twilight",
    copy: "Velvet horizons. The city lights fade in through a screen of pure transparency.",
    image: "/images/our-story/chapter-8.webp",
  },
  {
    time: "19:15",
    name: "Dusk",
    copy: "Shadows merge. The boundary between home and nature dissolves.",
    image: "/images/our-story/chapter-9.webp",
  },
  {
    time: "21:00",
    name: "Night",
    copy: "Under the stars. Woven lines of steel stand watch while your home rests.",
    image: "/images/our-story/chapter-10.webp",
  },
  {
    time: "24:00",
    name: "Midnight",
    copy: `Breathe deeply. ${BRAND_CONFIG.name} guards the edge. Rest well.`,
    image: "/images/our-story/chapter-11.webp",
  },
];

const PHASES: { from: string; to: string; dark: boolean }[] = [
  { from: "#F4EFEA", to: "#EAE3D9", dark: false },
  { from: "#FFEDD5", to: "#FDBA74", dark: false },
  { from: "#BAE6FD", to: "#38BDF8", dark: false },
  { from: "#E0F2FE", to: "#FFFFFF", dark: false },
  { from: "#FFFFFF", to: "#FEF08A", dark: false },
  { from: "#FDE047", to: "#F97316", dark: false },
  { from: "#F97316", to: "#EF4444", dark: false },
  { from: "#818CF8", to: "#4338CA", dark: true },
  { from: "#312E81", to: "#1E1B4B", dark: true },
  { from: "#1C1917", to: "#141210", dark: true },
  { from: "#1C1917", to: "#141210", dark: true },
  { from: "#1C1917", to: "#141210", dark: true },
];

function StoryPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight - clientHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = scrollTop / scrollHeight;
      const index = Math.min(11, Math.round(scrollTop / clientHeight));

      setActiveIndex(index);
      setScrollProgress(scrollPercent);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const phase = PHASES[Math.min(11, activeIndex)];
  const isMoon = activeIndex >= 7;
  const showStars = activeIndex >= 9;

  const scrollPercent = scrollProgress;
  const angle = scrollPercent * Math.PI;
  const orbX = 10 + 80 * scrollPercent;
  const orbY = 80 - 60 * Math.sin(angle);

  const stars = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        dur: 1 + Math.random() * 2,
      })),
    [],
  );

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none bg-[#FAF8F5]">
      {/* 1. Fixed Sky Gradient Canvas */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-all duration-1000 ease-out"
        style={{ background: `linear-gradient(to bottom, ${phase.from}, ${phase.to})` }}
        aria-hidden="true"
      />

      {/* 2. God Rays */}
      <div
        className="w-[200vw] h-[200vh] fixed -top-1/2 -left-1/2 bg-gradient-to-b from-white/20 via-transparent to-transparent rotate-[45deg] origin-center mix-blend-overlay pointer-events-none z-0 opacity-40"
        aria-hidden="true"
      />

      {/* 3. Celestial Orb */}
      <div
        className={`fixed pointer-events-none z-0 rounded-full ${
          isMoon
            ? "w-20 h-20 bg-slate-200 blur-2xl opacity-50"
            : "w-28 h-28 bg-brand/30 blur-3xl opacity-60"
        }`}
        style={{ left: `${orbX}vw`, top: `${orbY}vh` }}
        aria-hidden="true"
      />

      {/* 4. Stars */}
      {showStars && (
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          {stars.map((s, i) => (
            <span
              key={i}
              className="absolute bg-white w-1 h-1 rounded-full opacity-80"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
              }}
            />
          ))}
        </div>
      )}

      {/* 5. Sticky Site Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <SiteNav />
      </div>

      {/* 6. Scroll-snap Container for 11 Times of Day */}
      <div
        ref={containerRef}
        className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory relative z-10 bg-transparent"
      >
        {CHAPTERS.map((c) => {
          return (
            <section
              key={c.name}
              className="w-screen h-screen snap-start relative flex items-center justify-center overflow-hidden bg-transparent p-4 sm:p-6"
            >
              {/* Apple Liquid Glass UI Card Container */}
              <div
                className={`p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center justify-center transition-all duration-700 backdrop-blur-2xl backdrop-saturate-150 border ${
                  phase.dark
                    ? "bg-[#1C1917]/35 border-white/20 shadow-[0_16px_48px_rgba(0,0,0,0.5)] text-white"
                    : "bg-white/35 border-white/60 shadow-[0_16px_48px_rgba(0,0,0,0.12)] text-[#1C1917]"
                }`}
              >
                {/* Visual Card Image with Frosted Border */}
                <div
                  className={`w-full h-56 sm:h-64 md:h-72 overflow-hidden border mb-5 relative shadow-sm ${
                    phase.dark ? "border-white/20" : "border-white/50"
                  }`}
                >
                  <img
                    src={c.image}
                    alt={`${c.name} — ${c.time} atmospheric safety setting`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Time Indicator */}
                <p
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium text-brand"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {c.time}
                </p>

                {/* Chapter / Phase Title */}
                <h2
                  className={`font-display uppercase text-base sm:text-lg font-normal text-center mt-1.5 tracking-[0.22em] ${
                    phase.dark ? "text-white" : "text-[#1C1917]"
                  }`}
                >
                  {c.name}
                </h2>

                {/* Narrative Copy */}
                <p
                  className={`text-[12px] sm:text-[13px] text-center mt-2.5 font-light max-w-xs leading-relaxed ${
                    phase.dark ? "text-[#E7E5E4]" : "text-[#44403C]"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {c.copy}
                </p>
              </div>
            </section>
          );
        })}

        {/* Atelier Heritage & Manifesto Section */}
        <section className="w-screen min-h-screen snap-start relative flex flex-col items-center justify-between overflow-y-auto bg-transparent">
          <div className="flex-1 flex items-center justify-center w-full pt-28 pb-16 px-6">
            <div className="border border-white/20 bg-[#1C1917]/75 backdrop-blur-2xl backdrop-saturate-150 p-8 sm:p-12 md:p-16 w-full max-w-2xl flex flex-col items-center text-center shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
              <span className="sn-eyebrow text-brand mb-3 block font-medium">
                Atelier Heritage &amp; Ethos
              </span>
              <h2 className="sn-h1 text-white text-center">The Foundry of Transparency</h2>
              <p className="text-xs sm:text-sm text-[#E7E5E4] text-center font-light mt-4 mb-6 leading-relaxed max-w-lg">
                {BRAND_CONFIG.name} was conceived with a singular architectural mission: to liberate
                homes across {BUSINESS.regionLabel} from the prison of heavy iron grilles without
                sacrificing a millimeter of family safety.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left w-full my-6 border-y border-white/10 py-6">
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-widest text-brand mb-1">
                    Trained In-House Installers
                  </h4>
                  <p className="text-xs text-[#A8A29E] font-light leading-relaxed">
                    Every cable is laser-aligned and mechanically tension-locked by our own
                    installation team.
                  </p>
                </div>
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-widest text-brand mb-1">
                    Regional Provenance
                  </h4>
                  <p className="text-xs text-[#A8A29E] font-light leading-relaxed">
                    Serving {hubCityList("shortName")}—specified for coastal salt air and high-rise
                    thermal winds.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
                <Link
                  to="/consultation"
                  className="sn-btn-luxury-solid w-full sm:w-auto focus-ring"
                >
                  Request Site Survey
                </Link>
                <Link to="/solutions" className="sn-btn-luxury w-full sm:w-auto focus-ring">
                  Explore Solutions
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full relative z-20">
            <Footer />
          </div>
        </section>
      </div>

      {/* Scroll Hint */}
      {activeIndex === 0 && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.35em] opacity-75 pointer-events-none z-30 font-medium text-[#1C1917]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Scroll to Begin
        </div>
      )}
    </div>
  );
}

export default StoryPage;
