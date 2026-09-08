import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

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
    copy: "A silent guardian wakes. Before the first light touches Telangana and Andhra Pradesh, your sanctuary is secured.",
    image: "/images/our-story/chapter-1.jpg",
  },
  {
    time: "06:15",
    name: "Sunrise",
    copy: "Horizon liberated. We greet the morning light without iron bars. Boundless skies.",
    image: "/images/our-story/chapter-2.jpg",
  },
  {
    time: "08:30",
    name: "Morning",
    copy: "Pure natural daylight without visual confinement. The view is entirely yours.",
    image: "/images/our-story/chapter-3.jpg",
  },
  {
    time: "12:00",
    name: "Midday",
    copy: "Zenith strength. Under the blazing sun, our marine elements stand unyielding.",
    image: "/images/our-story/chapter-4.jpg",
  },
  {
    time: "15:00",
    name: "Afternoon",
    copy: "Play without borders. Children explore freely with engineered perimeter micro-spacing.",
    image: "/images/our-story/chapter-5.jpg",
  },
  {
    time: "17:30",
    name: "Evening",
    copy: "The evening breeze. Engineered barriers invite cooling airflow while keeping vectors out.",
    image: "/images/our-story/chapter-6.jpg",
  },
  {
    time: "18:15",
    name: "Sunset",
    copy: "Pristine dusk. Pigeons seek other ledges; your balcony remains untouched.",
    image: "/images/our-story/chapter-7.jpg",
  },
  {
    time: "18:45",
    name: "Twilight",
    copy: "Velvet horizons. The city lights fade in through a screen of pure transparency.",
    image: "/images/our-story/chapter-8.jpg",
  },
  {
    time: "19:15",
    name: "Dusk",
    copy: "Shadows merge. The boundary between home and nature dissolves.",
    image: "/images/our-story/chapter-9.jpg",
  },
  {
    time: "21:00",
    name: "Night",
    copy: "Under the stars. Woven lines of steel stand watch while your home rests.",
    image: "/images/our-story/chapter-10.jpg",
  },
  {
    time: "24:00",
    name: "Midnight",
    copy: `Breathe deeply. ${BRAND_CONFIG.name} guards the edge. Rest well.`,
    image: "/images/our-story/chapter-11.jpg",
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
            : "w-28 h-28 bg-[#F37021]/30 blur-3xl opacity-60"
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
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium text-[#F37021]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {c.time}
                </p>

                {/* Chapter / Phase Title */}
                <h2
                  className={`font-serif uppercase text-xl sm:text-2xl font-light text-center mt-1.5 tracking-[0.18em] ${
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

        {/* Midnight Below: Curate Your Sanctuary Liquid Glass Box */}
        <section className="w-screen min-h-screen snap-start relative flex flex-col items-center justify-between overflow-hidden bg-transparent">
          <div className="flex-1 flex items-center justify-center w-full pt-28 pb-12 px-6">
            <div className="border border-white/30 bg-[#1C1917]/40 backdrop-blur-2xl backdrop-saturate-150 p-8 sm:p-10 md:p-14 w-full max-w-sm sm:max-w-md flex flex-col items-center text-center shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
              <span className="sn-eyebrow text-[#F37021] mb-3 block font-medium">
                Genesis of Serenity
              </span>
              <h3 className="font-serif uppercase text-2xl font-light text-center text-white tracking-[0.18em]">
                Curate Your Sanctuary
              </h3>
              <p className="text-xs text-[#E7E5E4] text-center font-light mt-3 mb-8 leading-relaxed max-w-xs">
                From dawn to midnight, preserve your sanctuary with invisible architectural grace.
              </p>
              <Link to="/consultation" className="sn-btn-luxury-solid focus-ring">
                Request Survey
              </Link>
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
