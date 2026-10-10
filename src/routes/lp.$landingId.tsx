import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { LuxuryContactDock } from "@/components/LuxuryContactDock";
import { PaidLeadForm } from "@/components/PaidLeadForm";
import { BRAND_CONFIG } from "@/config/brand";
import {
  buildWhatsAppHref,
  getPaidLandingPage,
  type PaidHeroImage,
  type PaidLandingPageConfig,
} from "@/data/paidLandingPages";
import { trackEngagement } from "@/lib/analytics";
import { buildMetaTags } from "@/lib/seo";

/**
 * Google Ads landing page — one per service x city (src/data/paidLandingPages.ts).
 *
 * Built only from the InvisProtect design system, exactly as the main site
 * uses it: the cinematic banner (4:5 mobile / 2.39:1 desktop, uncropped),
 * centred sn-eyebrow → sn-h1/sn-h2 → sn-subtext headers, hairline
 * sn-btn-luxury actions, ProofSection cards, category-page editorial rows,
 * the Cormorant Garamond quote, the consultation-page form language, the
 * glass contact dock and the dark footer. No prices are shown anywhere —
 * every installer sets their own rates after the free site visit.
 */
export const Route = createFileRoute("/lp/$landingId")({
  head: ({ params }) => {
    const landing = getPaidLandingPage(params.landingId);
    if (!landing) {
      return buildMetaTags({
        title: "Free site visit",
        description: `Request a free site visit through ${BRAND_CONFIG.name}.`,
        canonicalPath: `/lp/${params.landingId}`,
      });
    }

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: landing.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${landing.serviceName} in ${landing.city}`,
      description: landing.summary,
      serviceType: landing.serviceName,
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: "0",
        description: "Complimentary on-site measurement & transparent written quotation",
      },
      provider: {
        "@type": "LocalBusiness",
        name: BRAND_CONFIG.name,
        telephone: BRAND_CONFIG.contact.phoneDial,
        url: `https://invisprotect.in/lp/${params.landingId}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: landing.city,
          addressRegion: landing.state,
          addressCountry: "IN",
        },
      },
      areaServed: {
        "@type": "City",
        name: landing.city,
      },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://invisprotect.in/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Service Areas",
          item: "https://invisprotect.in/service-areas",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${landing.serviceName} in ${landing.city}`,
          item: `https://invisprotect.in/lp/${params.landingId}`,
        },
      ],
    };

    const seo = buildMetaTags({
      title: landing.metaTitle,
      description: landing.summary,
      canonicalPath: `/lp/${params.landingId}`,
      ogImage: `${landing.hero.desktop}.jpg`,
      jsonLd: [faqSchema, serviceSchema, breadcrumbSchema],
    });

    return {
      ...seo,
      links: [
        ...seo.links,
        {
          rel: "preload",
          as: "image",
          href: `${landing.hero.desktop}.webp`,
          media: "(min-width: 768px)",
          type: "image/webp",
        },
        {
          rel: "preload",
          as: "image",
          href: `${landing.hero.mobile}.webp`,
          media: "(max-width: 767px)",
          type: "image/webp",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const landing = getPaidLandingPage(params.landingId);
    if (!landing) throw notFound();
    return { landing };
  },
  component: PaidLandingPage,
  notFoundComponent: () => (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-6 text-[#1C1917]">
      <div className="max-w-md text-center">
        <span className="sn-eyebrow mb-3 block text-brand">Page unavailable</span>
        <h1 className="sn-h1 mb-6 text-[#1C1917]">This page could not be found.</h1>
        <Link to="/" className="sn-btn-luxury-solid">
          Visit {BRAND_CONFIG.name}
        </Link>
      </div>
    </main>
  ),
});

const TRUST_LABELS = ["Expert Partner", "Site Survey", "Direct Quotation", "Quality Vetting"];

/** Art-directed cinematic image: 4:5 portrait on mobile, 2.39:1 panorama from md. */
function CinematicPicture({
  image,
  priority = false,
}: {
  image: PaidHeroImage;
  priority?: boolean;
}) {
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={`${image.desktop}.webp`} type="image/webp" />
      <source media="(min-width: 768px)" srcSet={`${image.desktop}.jpg`} type="image/jpeg" />
      <source srcSet={`${image.mobile}.webp`} type="image/webp" />
      <img
        src={`${image.mobile}.jpg`}
        alt={image.alt}
        width={941}
        height={1176}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="h-full w-full object-cover object-center"
      />
    </picture>
  );
}

/** Same warm vignette as the homepage cinematic banners. */
const bannerVignette = {
  background:
    "linear-gradient(to top, rgba(28,25,23,0.78) 0%, rgba(28,25,23,0.28) 45%, rgba(28,25,23,0.04) 72%, rgba(28,25,23,0.32) 100%)",
};

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <span className="sn-eyebrow mb-3 block text-brand">{eyebrow}</span>
      <h2 className="sn-h1 mb-3 text-balance text-[#1C1917]">{title}</h2>
      {text ? <p className="sn-subtext text-balance text-[#44403C]">{text}</p> : null}
    </div>
  );
}

function ChapterIntro({ chapter, title, text }: { chapter: string; title: string; text?: string }) {
  return (
    <div>
      <span className="mb-2 block font-mono text-[9px] font-medium uppercase tracking-widest text-brand">
        {chapter}
      </span>
      <h2 className="sn-h2 text-balance text-[#1C1917]">{title}</h2>
      {text ? <p className="sn-subtext mt-3 max-w-md text-[#44403C]">{text}</p> : null}
    </div>
  );
}

function EditorialRows({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li
          key={item}
          className="flex items-start gap-4 border border-[#1C1917]/8 bg-white p-4 shadow-sm sm:p-5"
        >
          <span className="pt-0.5 font-mono text-[10px] font-medium tracking-widest text-brand">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[13px] leading-relaxed font-light text-[#1C1917]">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function PaidLandingPage() {
  const { landing } = Route.useLoaderData() as { landing: PaidLandingPageConfig };
  const whatsappHref = buildWhatsAppHref(
    BRAND_CONFIG.contact.whatsappLink,
    landing.whatsappMessage,
    landing.whatsappRef,
  );
  const phoneHref = BRAND_CONFIG.contact.phoneHref;
  const meta = { landingId: landing.id, service: landing.serviceId, city: landing.city };

  const scrollToForm = (location: string) => {
    trackEngagement("survey_open", location, meta);
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const steps = [
    {
      title: "Share your requirement",
      detail: "Fill the short form, call or WhatsApp. It takes thirty seconds.",
    },
    {
      title: "Complimentary site visit",
      detail: `A checked installer in ${landing.city} visits, measures and gives an exact written quote.`,
    },
    {
      title: "Installation",
      detail: "If the quote suits you, the installer fits it at a time that suits you.",
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917]">
      <main>
        {/* ── Cinematic hero: message-matched headline on the uncropped banner ── */}
        <section
          aria-label={landing.headline}
          className="relative aspect-[4/5] w-full overflow-hidden bg-[#1C1917] select-none md:aspect-[2.39/1] md:min-h-[560px]"
        >
          <div className="absolute inset-0">
            <CinematicPicture image={landing.hero} priority />
          </div>
          <div className="pointer-events-none absolute inset-0" style={bannerVignette} />

          <header className="absolute inset-x-0 top-0 z-20 flex h-16 items-center justify-center md:h-20">
            <span className="font-brand text-[14px] font-extrabold uppercase tracking-[0.14em] mr-[-0.14em] text-[#FAF8F5] drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)] sm:text-[16px]">
              {BRAND_CONFIG.name}
            </span>
          </header>

          <div className="absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-3xl flex-col items-center px-4 pb-10 text-center sm:px-6 sm:pb-12 md:px-12 md:pb-[4.5%]">
            <span className="sn-eyebrow mb-2 block text-[#FAF8F5]/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              {landing.eyebrow}
            </span>
            <h1 className="sn-h1 mb-3 px-2 text-balance text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              {landing.headline}
            </h1>
            <p className="sn-subtext mb-6 max-w-md px-4 text-balance text-[#FAF8F5] drop-shadow-[0_1.5px_6px_rgba(0,0,0,0.85)]">
              {landing.summary}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5">
              {phoneHref ? (
                <a
                  href={phoneHref}
                  onClick={() => trackEngagement("phone", "paid_hero", meta)}
                  className="sn-btn-luxury-hero focus-ring"
                >
                  Call Us
                </a>
              ) : null}
              <button
                type="button"
                onClick={() => scrollToForm("paid_hero")}
                className="sn-btn-luxury-hero cursor-pointer focus-ring"
              >
                Free Site Visit
              </button>
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEngagement("whatsapp", "paid_hero", meta)}
                  className="sn-btn-luxury-hero focus-ring"
                >
                  WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        </section>

        {/* ── The private site visit: introduction + form ── */}
        <section className="border-b border-[#1C1917]/10 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16 lg:px-12">
            <div className="text-center md:sticky md:top-16 md:text-left">
              <span className="sn-eyebrow mb-3 block text-brand">Private Site Visit</span>
              <h2 className="sn-h1 mb-3 text-balance text-[#1C1917]">
                {landing.serviceKey === "invisible-grills"
                  ? `Invisible Grills for your ${landing.city} Home`
                  : `${landing.serviceName} for your ${landing.city} home`}
              </h2>
              <p className="sn-subtext text-balance text-[#44403C]">
                {landing.serviceKey === "invisible-grills"
                  ? `Complimentary laser measurement for balconies, windows, staircases, or villas across ${landing.city}. Exact per sq.ft written quotation from one checked installer. No obligation.`
                  : `Complimentary laser measurement, custom opening inspection, and an exact written per sq.ft quotation from one checked local installer. No obligation.`}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2 text-[11px] font-medium tracking-wide text-[#57534E] md:justify-start">
                <span className="rounded-full border border-[#1C1917]/10 bg-white px-3 py-1 shadow-xs">
                  Balcony Fall Protection
                </span>
                <span className="rounded-full border border-[#1C1917]/10 bg-white px-3 py-1 shadow-xs">
                  Window &amp; Staircase Safety
                </span>
                <span className="rounded-full border border-[#1C1917]/10 bg-white px-3 py-1 shadow-xs">
                  Marine-Grade SS316 Cable
                </span>
                <span className="rounded-full border border-[#1C1917]/10 bg-white px-3 py-1 shadow-xs">
                  Villas &amp; High-Rise Flats
                </span>
              </div>
              <p className="mt-8 border-t border-[#1C1917]/10 pt-8 font-serif text-xl leading-relaxed font-light text-[#1C1917] italic md:text-2xl">
                “{landing.localNote}”
              </p>
            </div>
            <PaidLeadForm landing={landing} />
          </div>
        </section>

        {/* ── The standard: ProofSection cards ── */}
        <section className="w-full py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <SectionIntro
              eyebrow="The InvisProtect Standard"
              title="One Home, One Installer"
              text={`We introduce you to a single checked installer in ${landing.city} — never a list of vendors calling you.`}
            />
            <div className="grid grid-cols-1 gap-8 border-t border-[#1C1917]/10 pt-12 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
              {landing.trustSignals.map((signal, index) => (
                <div
                  key={signal.title}
                  className="flex flex-col border border-[#1C1917]/8 bg-white p-6 shadow-sm"
                >
                  <span className="mb-2 font-mono text-[10px] font-medium uppercase tracking-widest text-brand">
                    {String(index + 1).padStart(2, "0")} / {TRUST_LABELS[index]}
                  </span>
                  <h3 className="mb-2.5 font-display text-[13px] font-medium uppercase tracking-[0.14em] text-[#1C1917]">
                    {signal.title}
                  </h3>
                  <p className="text-xs leading-relaxed font-light text-[#44403C]">
                    {signal.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The process ── */}
        <section className="w-full border-t border-[#1C1917]/10 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <SectionIntro
              eyebrow="The Process"
              title="Three Quiet Steps"
              text="From your first message to a finished installation."
            />
            <ol className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
              {steps.map((step, index) => (
                <li key={step.title} className="text-center">
                  <span className="font-display text-4xl leading-none font-light text-[#1C1917] tabular-nums md:text-[2.5rem]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-auto mt-5 mb-5 block h-px w-10 bg-brand" />
                  <h3 className="mb-2.5 font-display text-[13px] font-medium uppercase tracking-[0.14em] text-[#1C1917]">
                    {step.title}
                  </h3>
                  <p className="sn-subtext mx-auto max-w-xs text-[#44403C]">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Chapter 01: benefits ── */}
        <section className="w-full border-t border-[#1C1917]/10 bg-[#F4EFEA] py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:px-12">
            <ChapterIntro
              chapter="Chapter 01 / The Benefits"
              title={`Why ${landing.serviceName}`}
              text={landing.benefitsIntro}
            />
            <EditorialRows items={landing.benefits} />
          </div>
        </section>

        {/* ── Chapter 02: buyer's guide ── */}
        <section className="w-full border-t border-[#1C1917]/10 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:px-12">
            <ChapterIntro
              chapter="Chapter 02 / Buyer's Guide"
              title="Know Before You Buy"
              text="Four questions worth asking any installer before you agree."
            />
            <EditorialRows items={landing.buyerChecklist} />
          </div>
        </section>

        {/* ── Chapter 03: what decides the quote (no prices) ── */}
        <section className="w-full border-t border-[#1C1917]/10 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
            <span className="mb-2 block font-mono text-[9px] font-medium uppercase tracking-widest text-brand">
              Chapter 03 / The Quotation
            </span>
            <h2 className="sn-h2 mb-3 text-[#1C1917]">What Decides Your Quote</h2>
            <p className="sn-subtext mx-auto mb-10 max-w-xl text-[#44403C]">
              Every home is different. Your installer measures first, then quotes in writing.
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {landing.quoteFactors.map((factor) => (
                <li
                  key={factor}
                  className="border border-[#1C1917]/10 bg-[#FAF8F5] px-3 py-1.5 text-[11px] text-[#1C1917]"
                >
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Service area ── */}
        <section className="w-full border-t border-[#1C1917]/10 py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
            <SectionIntro
              eyebrow="Service Area"
              title={landing.cityFullName}
              text={`Checked installers cover these ${landing.city} localities.`}
            />
            <ul className="-mt-4 flex flex-wrap justify-center gap-2">
              {landing.localities.map((locality) => (
                <li
                  key={locality}
                  className="border border-[#1C1917]/10 bg-white px-3 py-1.5 text-[11px] text-[#1C1917]"
                >
                  {locality}
                </li>
              ))}
            </ul>
            {whatsappHref ? (
              <p className="sn-subtext mt-8 text-[#44403C]">
                Don&apos;t see your area?{" "}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEngagement("whatsapp", "paid_areas", meta)}
                  className="font-normal text-[#1C1917] underline decoration-brand underline-offset-4 hover:text-brand focus-ring"
                >
                  Ask on WhatsApp
                </a>
              </p>
            ) : null}
          </div>
        </section>

        {/* ── Knowledge base: category-page FAQ cards ── */}
        <section className="w-full border-t border-[#1C1917]/10 bg-[#F4EFEA] py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 md:px-12">
            <div className="mb-10 text-center">
              <span className="mb-2 block font-mono text-[9px] font-medium uppercase tracking-widest text-brand">
                Chapter 04 / Knowledge Base
              </span>
              <h2 className="sn-h2 text-[#1C1917]">Questions, Answered</h2>
            </div>
            <div className="space-y-3">
              {landing.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border border-[#1C1917]/8 bg-white shadow-sm"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-left text-[13px] font-normal text-[#1C1917] focus-ring [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <Plus
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-45"
                      strokeWidth={1.5}
                    />
                  </summary>
                  <p className="px-5 pb-5 text-[13px] leading-relaxed font-light text-[#44403C]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing cinematic banner ── */}
        <section
          aria-label={`Free site visit in ${landing.city}`}
          className="relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden bg-[#1C1917] md:aspect-[2.39/1]"
        >
          <div className="absolute inset-0">
            <CinematicPicture image={landing.closingImage} />
          </div>
          <div className="pointer-events-none absolute inset-0" style={bannerVignette} />
          <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-10 text-center sm:px-6 sm:pb-12 md:px-12 md:pb-[6%]">
            <span className="sn-eyebrow mb-2 block text-[#FAF8F5]/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              {landing.cityFullName}
            </span>
            <h2 className="sn-h2 mb-2 max-w-xl px-2 text-balance text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Your Free Site Visit Awaits
            </h2>
            <p className="sn-subtext mb-5 max-w-md px-2 text-[#FAF8F5]/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              One checked installer · A written quote · No obligation
            </p>
            <button
              type="button"
              onClick={() => scrollToForm("paid_final_cta")}
              className="sn-btn-luxury cursor-pointer focus-ring"
            >
              Request Site Visit
            </button>
          </div>
        </section>

        {/* ── Partner network disclosure ── */}
        <section className="w-full px-6 py-10 md:py-12">
          <p className="mx-auto max-w-2xl text-center text-[12px] leading-relaxed font-light text-[#57534E]">
            {landing.disclosure}
          </p>
        </section>
      </main>

      {/* ── Dark footer, same lockup as the main site ── */}
      <footer className="bg-[#1C1917] pb-24 text-[#FAF8F5] md:pb-0">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pt-14 pb-10 text-center md:px-12">
          <span className="font-brand text-[15px] font-extrabold uppercase tracking-[0.13em] mr-[-0.13em] text-[#FAF8F5]">
            {BRAND_CONFIG.name}
          </span>
          <span
            className="mt-1.5 text-[9.5px] font-light uppercase tracking-[0.28em] text-[#A8A29E]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Invisible Grills &amp; Safety Nets
          </span>
          <p className="mt-8 max-w-md font-serif text-base leading-relaxed font-light text-[#E7E5E4] italic md:text-lg">
            “The art of architectural protection — securing your sanctuary with quiet elegance.”
          </p>
          <nav
            aria-label="Site Navigation"
            className="mt-8 flex flex-wrap justify-center gap-6 text-[10px] font-light uppercase tracking-[0.2em] text-[#A8A29E]"
          >
            <Link to="/service-areas" className="transition-colors hover:text-[#FAF8F5] focus-ring">
              Service Areas
            </Link>
            <Link to="/sitemap" className="transition-colors hover:text-[#FAF8F5] focus-ring">
              Directory
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-[#FAF8F5] focus-ring">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-[#FAF8F5] focus-ring">
              Terms
            </Link>
          </nav>
          <p
            className="mt-6 text-[10px] font-light uppercase tracking-[0.2em] text-[#78716C]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            © {new Date().getFullYear()} {BRAND_CONFIG.name}. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* ── Glass call / WhatsApp dock, same as the homepage ── */}
      <LuxuryContactDock whatsappHref={whatsappHref} location="paid_contact_dock" metadata={meta} />
    </div>
  );
}
