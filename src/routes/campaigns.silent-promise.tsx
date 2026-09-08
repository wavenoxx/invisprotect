import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/campaigns/silent-promise")({
  head: () =>
    buildMetaTags({
      title: `The Silent Promise — Editorial Campaign | ${BRAND_CONFIG.name}`,
      description: "A promise of architectural protection, suspended in thin air.",
      canonicalPath: "/campaigns/silent-promise",
      noIndex: true,
    }),
  component: CampaignThree,
});

interface TrustNode {
  id: number;
  x: number;
  y: number;
  label: string;
  spec: string;
}

const trustNodes: TrustNode[] = [
  { id: 1, x: 500, y: 200, label: "TENSION LOCK", spec: "HIGH-TENSILE ANCHORAGE PROFILE" },
  { id: 2, x: 300, y: 400, label: "MARINE GRADE CABLE", spec: "AISI 316 MARINE GRADE ALLOY" },
  { id: 3, x: 700, y: 400, label: "NYLON-12 COATING", spec: "UV-RESISTANT THERMOPLASTIC SHEATH" },
  { id: 4, x: 500, y: 600, label: "PRESSURE ANCHOR", spec: "EXTRUDED DUAL-KEY ALUMINUM PROFILE" },
];

function CampaignThree() {
  const shadowContainerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [viewportState, setViewportState] = useState(1);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const getShadowPath = (defaultX: number) => {
    if (!shadowContainerRef.current) return `M ${defaultX} 450 L ${defaultX} 750`;
    const rect = shadowContainerRef.current.getBoundingClientRect();
    const svgX = ((mousePos.x - rect.left) / rect.width) * 1000;
    const svgY = ((mousePos.y - rect.top) / rect.height) * 800;
    const yRail = 450;
    const yFloor = 750;
    const dy = yRail - svgY;
    const dx = defaultX - svgX;
    const projectedX = defaultX + ((yFloor - yRail) * dx) / (dy === 0 ? 1 : dy);
    const clampedX = Math.max(-200, Math.min(1200, projectedX));
    return `M ${defaultX} ${yRail} L ${clampedX} ${yFloor}`;
  };

  const wires = Array.from({ length: 15 }, (_, i) => 250 + (i * 500) / 14);

  return (
    <div className="relative w-full min-h-screen bg-[#FAF8F5] text-[#1C1917] select-none overflow-x-hidden font-sans">
      <style>{`
        @keyframes breath {
          0%, 100% { transform: scale(1.02); }
          50% { transform: scale(1.08); }
        }
        .breath-bg { animation: breath 14s ease-in-out infinite; }
        @keyframes shimmer {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.85; }
        }
        .shimmer-wire { animation: shimmer 4s ease-in-out infinite; }
        @keyframes pulseNode {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.4); opacity: 0.3; }
        }
        .pulse-node { animation: pulseNode 2.6s ease-in-out infinite; }
      `}</style>

      <SiteNav />

      {/* 1. HERO */}
      <div className="w-full relative overflow-hidden bg-[#F4EFEA] border-b border-[#1C1917]/10 min-h-[60vh] md:min-h-0 md:aspect-[2.39/1] flex items-center justify-center">
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">
          <span className="sn-eyebrow text-[#F37021] mb-3 block font-medium">
            CAMPAIGN SERIES Ⅲ
          </span>
          <h1 className="sn-h1 text-[#1C1917] max-w-xl mb-4">THE SILENT PROMISE</h1>
          <p className="font-serif italic text-sm md:text-base text-[#44403C] font-light tracking-wide max-w-sm">
            A promise of architectural protection, suspended in thin air.
          </p>
        </div>
      </div>

      {/* 2. EXPERIENCE 01 — THE CELESTIAL SKYDECK */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-14">
          <span className="font-sans text-[9px] tracking-[0.3em] text-[#F37021] uppercase font-medium">
            INTERACTIVE EXPERIENCE 01
          </span>
          <h2 className="font-serif text-lg md:text-2xl font-light tracking-[0.15em] uppercase whitespace-nowrap text-center mt-4 mb-5 text-[#1C1917]">
            THE CELESTIAL SKYDECK
          </h2>
          <p className="font-serif italic text-sm md:text-base text-[#44403C] font-light max-w-xl mx-auto">
            Move your cursor across the window deck. Your cursor acts as a sunlight source,
            projecting dynamic angles of safety lines on the floor.
          </p>
        </div>

        <div
          ref={shadowContainerRef}
          onMouseMove={handleMouseMove}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-white cursor-crosshair border border-[#1C1917]/10 shadow-sm"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#FAF8F5] to-white opacity-90" />
          <svg
            viewBox="0 0 1000 800"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            {/* Balcony floor */}
            <rect x="0" y="750" width="1000" height="50" fill="#EAE3D9" opacity="0.9" />
            <rect x="0" y="445" width="1000" height="6" fill="#F37021" opacity="0.6" />
            {/* Vertical cords */}
            {wires.map((wX, idx) => (
              <line
                key={`w-${idx}`}
                x1={wX}
                y1={150}
                x2={wX}
                y2={450}
                stroke="#F37021"
                strokeWidth={1}
                opacity={0.65}
                className="shimmer-wire"
              />
            ))}
            {/* Projected shadows */}
            {wires.map((wX, idx) => (
              <path
                key={`s-${idx}`}
                d={getShadowPath(wX)}
                stroke="#1C1917"
                strokeOpacity={0.25}
                strokeWidth={1}
                fill="none"
              />
            ))}
          </svg>
        </div>
      </section>

      {/* 3. EXPERIENCE 02 — GUARDIAN PROMISE */}
      <section className="w-full bg-[#F4EFEA] text-[#1C1917] py-28 border-t border-b border-[#1C1917]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="font-sans text-[9px] tracking-[0.3em] text-[#F37021] uppercase font-medium">
              INTERACTIVE EXPERIENCE 02
            </span>
            <h2 className="font-serif text-lg md:text-2xl font-light tracking-[0.15em] uppercase whitespace-nowrap text-center mt-4 mb-5 text-[#1C1917]">
              THE GUARDIAN PROMISE
            </h2>
            <p className="font-serif italic text-sm md:text-base text-[#78716C] font-light max-w-xl mx-auto">
              Hover over the structural connection nodes to activate the integrity telemetry of{" "}
              {BRAND_CONFIG.name}'s safety anchors.
            </p>
          </div>

          <div className="relative w-full aspect-[16/10] bg-white border border-[#1C1917]/10 overflow-hidden shadow-sm">
            <svg
              viewBox="0 0 1000 800"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              {/* Constellation links */}
              {trustNodes.map((a) =>
                trustNodes
                  .filter((b) => b.id > a.id)
                  .map((b) => (
                    <line
                      key={`${a.id}-${b.id}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="#F37021"
                      strokeOpacity={0.3}
                      strokeWidth={0.8}
                    />
                  )),
              )}
              <text
                x="500"
                y="410"
                textAnchor="middle"
                className="font-serif"
                fill="#1C1917"
                opacity="0.15"
                style={{ fontSize: 32, letterSpacing: "0.3em" }}
              >
                PROMISE
              </text>
            </svg>

            {trustNodes.map((node) => {
              const isHovered = activeNode === node.id;
              const leftPct = (node.x / 1000) * 100;
              const topPct = (node.y / 800) * 100;
              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                >
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-[#F37021] pulse-node" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F37021]" />
                  </div>
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 mt-4 w-56 p-4 bg-white border border-[#F37021]/40 shadow-lg transition-all duration-500 z-20 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                  >
                    <p className="font-sans text-[9px] tracking-[0.3em] text-[#F37021] uppercase font-medium mb-1">
                      {node.label}
                    </p>
                    <p className="font-serif italic text-xs text-[#44403C] font-light">
                      {node.spec}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. EXPERIENCE 03 — HORIZON PORTAL */}
      <section className="w-full bg-[#FAF8F5] py-28 border-b border-[#1C1917]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="font-sans text-[9px] tracking-[0.3em] text-[#F37021] uppercase font-medium">
              INTERACTIVE EXPERIENCE 03
            </span>
            <h2 className="font-serif text-lg md:text-2xl font-light tracking-[0.15em] uppercase whitespace-nowrap text-center mt-4 mb-5 text-[#1C1917]">
              THE HORIZON PORTAL
            </h2>
            <p className="font-serif italic text-sm md:text-base text-[#44403C] font-light max-w-xl mx-auto">
              Adjust the viewport layer selector to examine how {BRAND_CONFIG.name} integrates
              safety grids and insect screening without compromising your view.
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-3">
                {[
                  { state: 0, label: "01. THE VOID" },
                  { state: 1, label: "02. THE THREAD (INVISIBLE GRILLS)" },
                  { state: 2, label: "03. THE VEIL (MOSQUITO SCREEN)" },
                ].map((btn) => (
                  <button
                    key={btn.state}
                    onClick={() => setViewportState(btn.state)}
                    className={`w-full text-left p-4 border transition-all duration-500 rounded-none cursor-pointer font-sans text-[10px] tracking-[0.25em] uppercase font-medium ${
                      viewportState === btn.state
                        ? "border-[#F37021] text-[#F37021] bg-[#F37021]/8 shadow-xs"
                        : "border-[#1C1917]/15 text-[#44403C] hover:border-[#F37021]/40 bg-white"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full max-w-sm md:max-w-none aspect-[4/5] bg-white border border-[#1C1917]/10 relative overflow-hidden p-3 mx-auto md:mr-0 shadow-sm">
              <div className="relative w-full h-full overflow-hidden border border-[#F37021]/40 bg-[#FAF8F5]">
                {/* Layer 1: THREAD */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: viewportState >= 1 ? 0.8 : 0 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(243,112,33,0.7) 0 1px, transparent 1px 38px)",
                    }}
                  />
                </div>
                {/* Layer 2: VEIL */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: viewportState === 2 ? 0.6 : 0 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(28,25,23,0.2) 0 1px, transparent 1px 4px), repeating-linear-gradient(0deg, rgba(28,25,23,0.2) 0 1px, transparent 1px 4px)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <div className="py-28 bg-[#F4EFEA] w-full flex flex-col items-center justify-center text-center px-6">
        <span className="font-sans text-[9px] tracking-[0.3em] text-[#F37021] mb-4 uppercase font-medium">
          TAILORED PROTECTION
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-light tracking-[0.15em] text-[#1C1917] mb-8 uppercase">
          CURATE YOUR VOIDS
        </h2>
        <Link to="/consultation" className="sn-btn-luxury-solid">
          REQUEST SURVEY
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default CampaignThree;
