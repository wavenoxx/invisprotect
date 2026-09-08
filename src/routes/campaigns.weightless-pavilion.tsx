import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/campaigns/weightless-pavilion")({
  head: () =>
    buildMetaTags({
      title: `The Weightless Pavilion — Editorial Campaign | ${BRAND_CONFIG.name}`,
      description: "An ongoing campaign exploring weightless structure and invisible protection.",
      canonicalPath: "/campaigns/weightless-pavilion",
      noIndex: true,
    }),
  component: WeightlessPavilion,
});

function WeightlessPavilion() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen">
      <SiteNav />
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-[#F4EFEA] border-b border-[#1C1917]/10 flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#FAF8F5] to-[#F4EFEA]" />
        <div className="absolute inset-x-0 bottom-12 text-center text-[#1C1917] px-6">
          <p className="sn-eyebrow text-[#F37021] mb-2 font-medium">Collection Series</p>
          <h1 className="sn-h1 text-[#1C1917] max-w-xl mx-auto">The Weightless Pavilion</h1>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="font-serif italic text-lg md:text-xl font-light text-[#44403C] leading-relaxed">
          A meditation on tension, transparency, and the architecture of safety — coming soon to the{" "}
          {BRAND_CONFIG.name} journal.
        </p>
        <Link
          to="/solutions"
          className="inline-block mt-10 text-xs font-medium tracking-[0.2em] uppercase underline underline-offset-4 decoration-1 text-[#F37021] hover:text-[#D9531E] transition-colors"
        >
          Explore Our Solutions →
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default WeightlessPavilion;
