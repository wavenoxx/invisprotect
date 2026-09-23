import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/warranty")({
  head: () =>
    buildMetaTags({
      title: `Written Warranty Matrix & Handover Terms — ${BRAND_CONFIG.name}`,
      description: `Documented warranty terms for ${BRAND_CONFIG.name} invisible grills (5 years) and HDPE safety netting (3-5 years) issued upon laser alignment completion.`,
      canonicalPath: "/warranty",
    }),
  component: WarrantyPage,
});

function WarrantyPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 pt-32 pb-24 w-full">
        <header className="mb-12 pb-8 border-b border-[#1C1917]/10">
          <p className="sn-eyebrow text-brand mb-3 font-medium">Client Assurance &amp; Integrity</p>
          <h1 className="sn-h1 text-[#1C1917]">Warranty Policy &amp; Terms</h1>
          <p className="sn-subtext text-[#78716C] mt-3 max-w-2xl">
            Warranty coverage varies by installed system; see written warranty terms issued upon
            project completion.
          </p>
        </header>

        <section className="mb-14">
          <h2 className="sn-h2 text-[#1C1917] mb-6">System Coverage Matrix</h2>

          {/* Desktop Presentation: Spacious Architectural Matrix */}
          <div className="hidden md:block border border-[#1C1917]/10 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs font-light">
              <thead className="bg-[#FAF8F5] border-b border-[#1C1917]/10 text-[#1C1917] uppercase tracking-widest text-[10px] font-medium">
                <tr>
                  <th className="py-4 px-6">Installed System</th>
                  <th className="py-4 px-6">Primary Material</th>
                  <th className="py-4 px-6">Coverage Period</th>
                  <th className="py-4 px-6">Warranty Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1917]/8 text-[#44403C]">
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1C1917]">
                    Invisible Grills (Balcony / Window / Stair)
                  </td>
                  <td className="py-4 px-6">AISI 316 Marine Grade Stainless Steel</td>
                  <td className="py-4 px-6 font-medium text-brand">5-Year Structural Warranty</td>
                  <td className="py-4 px-6 text-[#78716C]">
                    Cable tensile integrity, track anchorage &amp; corrosion resistance under
                    standard atmospheric exposure.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1C1917]">
                    Core Safety Nets (Balcony / Children / Stair)
                  </td>
                  <td className="py-4 px-6">UV-Stabilized High-Density Polyethylene</td>
                  <td className="py-4 px-6 font-medium text-brand">
                    3 to 5-Year Material Warranty
                  </td>
                  <td className="py-4 px-6 text-[#78716C]">
                    UV polymer degradation, knot junction stability &amp; anchor fixings.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1C1917]">
                    Bird Deterrence &amp; Spikes
                  </td>
                  <td className="py-4 px-6">Polycarbonate base + Stainless steel tips</td>
                  <td className="py-4 px-6 font-medium text-brand">3-Year System Warranty</td>
                  <td className="py-4 px-6 text-[#78716C]">
                    Base track weatherability, spike bonding &amp; installation adhesion.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-[#1C1917]">
                    Specialty &amp; Industrial Systems
                  </td>
                  <td className="py-4 px-6">Nylon / Anodized Aluminum / Polymer Weave</td>
                  <td className="py-4 px-6 font-medium text-brand">As specified per project</td>
                  <td className="py-4 px-6 text-[#78716C]">
                    Customized written terms formulated according to commercial load specifications.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Presentation: Bespoke Luxury System Cards */}
          <div className="md:hidden space-y-4">
            {[
              {
                system: "Invisible Grills (Balcony / Window / Stair)",
                material: "AISI 316 Marine Grade Stainless Steel",
                period: "5-Year Structural Warranty",
                scope:
                  "Cable tensile integrity, track anchorage & corrosion resistance under standard atmospheric exposure.",
              },
              {
                system: "Core Safety Nets (Balcony / Children / Stair)",
                material: "UV-Stabilized High-Density Polyethylene",
                period: "3 to 5-Year Material Warranty",
                scope: "UV polymer degradation, knot junction stability & anchor fixings.",
              },
              {
                system: "Bird Deterrence & Spikes",
                material: "Polycarbonate base + Stainless steel tips",
                period: "3-Year System Warranty",
                scope: "Base track weatherability, spike bonding & installation adhesion.",
              },
              {
                system: "Specialty & Industrial Systems",
                material: "Nylon / Anodized Aluminum / Polymer Weave",
                period: "As specified per project",
                scope:
                  "Customized written terms formulated according to commercial load specifications.",
              },
            ].map((item) => (
              <article
                key={item.system}
                className="bg-white border border-[#1C1917]/10 p-5 shadow-xs flex flex-col gap-2"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-xs sm:text-sm font-medium text-[#1C1917] uppercase tracking-[0.10em]">
                    {item.system}
                  </h3>
                  <p className="text-[11px] text-[#78716C] font-light">{item.material}</p>
                </div>
                <div>
                  <span className="inline-block px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] bg-brand/8 text-brand border border-brand/20">
                    {item.period}
                  </span>
                </div>
                <p className="text-xs text-[#44403C] font-light leading-relaxed pt-2 border-t border-[#1C1917]/6">
                  {item.scope}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Exclusions */}
        <section className="space-y-6 text-xs md:text-sm font-light leading-relaxed text-[#44403C] border-t border-[#1C1917]/10 pt-10">
          <h2 className="sn-h2 text-[#1C1917]">Standard Conditions &amp; Exclusions</h2>
          <ul className="space-y-3 list-disc pl-5 text-[#78716C]">
            <li>
              Warranty is valid exclusively for original installations completed and inspected by{" "}
              {BRAND_CONFIG.name} technicians.
            </li>
            <li>
              Intentional cutting or mechanical tampering by external contractors during civil work
              or painting is excluded from coverage.
            </li>
            <li>
              Damage resulting from open flames, structural building settling beyond tolerances, or
              natural disasters is not covered.
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
