import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/campaigns/light-and-sanctuary")({
  head: () =>
    buildMetaTags({
      title: `Light & Sanctuary — Editorial Campaign | ${BRAND_CONFIG.name}`,
      description: "An interactive sensory portal exploring the philosophy of invisible safety.",
      canonicalPath: "/campaigns/light-and-sanctuary",
      noIndex: true,
    }),
  component: CampaignOne,
});

const HARP_LINES = 8;

const REVEAL_SECTIONS = [
  {
    image: "/images/campaigns/campaign-1-story-1.jpg",
    quote: "We do not build walls. We liberate the threshold.",
  },
  {
    image: "/images/campaigns/campaign-1-story-2.jpg",
    quote: "Security is not a cage. It is a dialogue with the sky.",
  },
  {
    image: "/images/campaigns/campaign-1-story-3.jpg",
    quote: "Where the edge fades, absolute trust begins.",
  },
];

function SafetyHarp() {
  const [strummed, setStrummed] = useState<Record<number, boolean>>({});

  const strum = (i: number) => {
    setStrummed((s) => ({ ...s, [i]: true }));
    window.setTimeout(() => {
      setStrummed((s) => {
        const next = { ...s };
        delete next[i];
        return next;
      });
    }, 900);
  };

  return (
    <div className="fixed inset-y-0 left-0 right-0 h-full pointer-events-none z-10">
      <div className="relative w-full h-full">
        {Array.from({ length: HARP_LINES }).map((_, i) => {
          const leftPct = ((i + 1) / (HARP_LINES + 1)) * 100;
          const active = strummed[i];
          return (
            <div key={i}>
              <div
                className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F37021]/50 to-transparent ${active ? "animate-strum" : ""}`}
                style={{ left: `${leftPct}%` }}
              />
              <div
                onMouseEnter={() => strum(i)}
                className="absolute top-0 bottom-0 w-8 -translate-x-4 cursor-pointer pointer-events-auto"
                style={{ left: `${leftPct}%` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RevealSection({ quote }: { image: string; quote: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setRevealed(true);
        });
      },
      { threshold: 0.35 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden my-16 bg-[#1C1917]"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#1C1917]/70 via-[#1C1917]/40 to-[#1C1917]/80" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
        <p className="font-serif italic text-xl md:text-2xl text-white tracking-wide font-light max-w-xl drop-shadow-md">
          {quote}
        </p>
      </div>
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-[#FAF8F5] transition-transform duration-[1200ms] ease-out origin-left z-20 ${revealed ? "translate-x-[-100%]" : ""}`}
      />
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-[#FAF8F5] transition-transform duration-[1200ms] ease-out origin-right z-20 ${revealed ? "translate-x-[100%]" : ""}`}
      />
    </div>
  );
}

function CampaignOne() {
  return (
    <div className="relative bg-[#FAF8F5] text-[#1C1917] min-h-screen">
      <style>{`
        @keyframes strum {
          0%, 100% { transform: translateX(0) scaleX(1); filter: drop-shadow(0 0 0px rgba(243,112,33,0)); }
          20% { transform: translateX(-10px) scaleX(1.15); filter: drop-shadow(0 0 10px rgba(243,112,33,0.8)); }
          40% { transform: translateX(8px) scaleX(0.9); filter: drop-shadow(0 0 8px rgba(243,112,33,0.6)); }
          60% { transform: translateX(-5px) scaleX(1.08); filter: drop-shadow(0 0 5px rgba(243,112,33,0.4)); }
          80% { transform: translateX(3px) scaleX(0.97); filter: drop-shadow(0 0 3px rgba(243,112,33,0.2)); }
        }
        .animate-strum {
          animation: strum 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
      `}</style>

      <SiteNav />
      <SafetyHarp />

      <section className="w-full aspect-[2.39/1] min-h-[300px] relative overflow-hidden bg-[#F4EFEA] border-b border-[#1C1917]/10">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#FAF8F5] to-[#F4EFEA]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif italic text-3xl md:text-5xl text-[#1C1917] font-light">
            Light &amp; Sanctuary
          </span>
        </div>
      </section>

      <section className="py-20 px-6 max-w-3xl mx-auto text-center">
        <span className="font-sans text-[10px] tracking-[0.25em] text-[#F37021] mb-4 uppercase font-medium block">
          The Edit
        </span>
        <h1 className="font-serif text-2xl md:text-3xl font-light tracking-[0.15em] text-[#1C1917] mb-6 uppercase block">
          Light &amp; Sanctuary
        </h1>
        <p className="text-[13px] md:text-[14px] leading-relaxed text-[#44403C] font-light max-w-2xl mx-auto">
          An exploration of architectural lightness. At {BRAND_CONFIG.name}, we believe security
          should enhance your view, not hide it. Our campaign captures the dialogue between open
          spaces and unyielding invisible protection. Natural light and airy proportions run through
          our installations, defining an aesthetic balanced between safety, precision, and freedom.
        </p>
      </section>

      {REVEAL_SECTIONS.map((s, i) => (
        <RevealSection key={i} image={s.image} quote={s.quote} />
      ))}

      <section className="py-24 bg-[#F4EFEA] border-t border-[#1C1917]/10 flex flex-col items-center justify-center text-center px-6">
        <h2 className="font-serif text-2xl md:text-3xl font-light tracking-[0.15em] text-[#1C1917] mb-8 uppercase">
          Curate Your Sanctuary
        </h2>
        <Link to="/consultation" className="sn-btn-luxury-solid">
          Request Survey
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default CampaignOne;
