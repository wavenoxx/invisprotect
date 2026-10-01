import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/warranty")({
  head: () =>
    buildMetaTags({
      title: `Warranty Guide — What to Ask Your Installer — ${BRAND_CONFIG.name}`,
      description: `How warranties work when ${BRAND_CONFIG.name} introduces you to an installer: what a written warranty for invisible grills, safety nets and bird protection should cover, and how to claim it.`,
      canonicalPath: "/warranty",
    }),
  component: WarrantyPage,
});

/**
 * InvisProtect is a referral service, so it does not issue warranties.
 * This page explains what a good written warranty from the installer covers.
 */
const CHECKS = [
  {
    system: "Invisible Grills (Balcony / Window / Stair)",
    ask: "Cable grade (SS304 or SS316), cable thickness in mm, track material, and how many years each part is covered.",
    why: "Grade and thickness decide rust resistance and strength — get them written, not just said.",
  },
  {
    system: "Safety & Pigeon Nets",
    ask: "Net material (HDPE or nylon), mesh size, UV-stabilised grade, hook material and the coverage period.",
    why: "Cheap nets turn brittle in the sun. A written specification protects you.",
  },
  {
    system: "Bird Spikes",
    ask: "Base and spike material, the fixing method and the coverage period.",
    why: "Poor adhesion or fixing is the most common failure.",
  },
  {
    system: "Specialty & Industrial Systems",
    ask: "The load specification and written terms for your specific project.",
    why: "Commercial systems need project-specific terms.",
  },
];

function WarrantyPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 pt-32 pb-24 w-full">
        <header className="mb-12 pb-8 border-b border-[#1C1917]/10">
          <p className="sn-eyebrow text-brand mb-3 font-medium">Client Assurance &amp; Integrity</p>
          <h1 className="sn-h1 text-[#1C1917]">Warranty Guide</h1>
          <p className="sn-subtext text-[#78716C] mt-3 max-w-2xl">
            {BRAND_CONFIG.name} coordinates with verified, certified installation partners across
            India. The dedicated installer who fits your system provides the direct warranty — in
            writing, at handover. Here is what that warranty should cover.
          </p>
        </header>

        <section className="mb-14">
          <h2 className="sn-h2 text-[#1C1917] mb-6">What to Check</h2>

          {/* Desktop Presentation: Spacious Architectural Matrix */}
          <div className="hidden md:block border border-[#1C1917]/10 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs font-light">
              <thead className="bg-[#FAF8F5] border-b border-[#1C1917]/10 text-[#1C1917] uppercase tracking-widest text-[10px] font-medium">
                <tr>
                  <th className="py-4 px-6">Installed System</th>
                  <th className="py-4 px-6">Ask for in Writing</th>
                  <th className="py-4 px-6">Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1917]/8 text-[#44403C]">
                {CHECKS.map((item) => (
                  <tr key={item.system}>
                    <td className="py-4 px-6 font-medium text-[#1C1917]">{item.system}</td>
                    <td className="py-4 px-6">{item.ask}</td>
                    <td className="py-4 px-6 text-[#78716C]">{item.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Presentation: Bespoke Luxury System Cards */}
          <div className="md:hidden space-y-4">
            {CHECKS.map((item) => (
              <article
                key={item.system}
                className="bg-white border border-[#1C1917]/10 p-5 shadow-xs flex flex-col gap-2"
              >
                <h3 className="font-display text-xs sm:text-sm font-medium text-[#1C1917] uppercase tracking-[0.10em]">
                  {item.system}
                </h3>
                <p className="text-xs text-[#44403C] font-light leading-relaxed">
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand">
                    Ask for in writing ·{" "}
                  </span>
                  {item.ask}
                </p>
                <p className="text-xs text-[#78716C] font-light leading-relaxed pt-2 border-t border-[#1C1917]/6">
                  {item.why}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="space-y-6 text-xs md:text-sm font-light leading-relaxed text-[#44403C] border-t border-[#1C1917]/10 pt-10">
          <h2 className="sn-h2 text-[#1C1917]">How Warranty Works</h2>
          <ul className="space-y-3 list-disc pl-5 text-[#78716C]">
            <li>
              The warranty is issued by your installer, not by {BRAND_CONFIG.name}. Its length and
              scope vary by installer and material.
            </li>
            <li>
              A good written warranty states the materials used, what is covered (breakage,
              corrosion, loosening, anchors, track), how long each part is covered, what is excluded
              and how to raise a claim.
            </li>
            <li>
              Most warranties exclude cutting or tampering during later civil or painting work,
              fire, and structural building damage.
            </li>
            <li>
              Always get the warranty on the installer&apos;s letterhead or invoice before you pay.
            </li>
            <li>
              If an installer we introduced does not honour their written warranty, tell us. We will
              follow up and may stop sending them requests.
            </li>
          </ul>

          <div className="pt-8 text-center">
            <Link to="/consultation" className="sn-btn-luxury-solid">
              Book Site Survey
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default WarrantyPage;
