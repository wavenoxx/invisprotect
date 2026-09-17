import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, MessageSquare, Phone, Ruler, ShieldCheck } from "lucide-react";

import { BrandLogo } from "@/components/BrandLogo";
import { PaidLeadForm } from "@/components/PaidLeadForm";
import { BRAND_CONFIG } from "@/config/brand";
import { getPaidLandingPage, type PaidLandingPageConfig } from "@/data/paidLandingPages";
import { trackEngagement } from "@/lib/analytics";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/lp/$landingId")({
  head: ({ params }) => {
    const landing = getPaidLandingPage(params.landingId);
    return buildMetaTags({
      title: landing ? `${landing.serviceName} in ${landing.city}` : "Campaign landing page",
      description: landing?.summary || "Request an InvisProtect architectural safety site survey.",
      canonicalPath: `/lp/${params.landingId}`,
      ogImage: landing?.heroImageWebp,
      noIndex: true,
      noFollow: true,
    });
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
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#F37021]">
          Campaign page unavailable
        </p>
        <h1 className="mt-3 font-serif text-4xl font-light">
          This landing page could not be found.
        </h1>
        <Link to="/" className="sn-btn-luxury-solid mt-7">
          Visit InvisProtect
        </Link>
      </div>
    </main>
  ),
});

function ContactAction({
  kind,
  location,
  landing,
  compact = false,
}: {
  kind: "phone" | "whatsapp";
  location: string;
  landing: PaidLandingPageConfig;
  compact?: boolean;
}) {
  const isPhone = kind === "phone";
  const href = isPhone ? BRAND_CONFIG.contact.phoneHref : BRAND_CONFIG.contact.whatsappLink;
  if (!href) return null;
  const Icon = isPhone ? Phone : MessageSquare;
  const label = isPhone ? "Call" : "WhatsApp";

  return (
    <a
      href={href}
      target={isPhone ? undefined : "_blank"}
      rel={isPhone ? undefined : "noopener noreferrer"}
      aria-label={`${label} ${BRAND_CONFIG.name}`}
      onClick={() =>
        trackEngagement(kind, location, {
          landingId: landing.id,
          service: landing.serviceId,
          city: landing.city,
        })
      }
      className={
        compact
          ? "flex min-h-12 flex-1 items-center justify-center gap-1.5 border-r border-white/15 px-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white last:border-r-0"
          : "inline-flex min-h-12 items-center justify-center gap-2 border border-[#1C1917]/20 bg-white/90 px-5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1C1917] transition hover:border-[#F37021] hover:text-[#F37021] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F37021]"
      }
    >
      <Icon aria-hidden="true" className="size-4" /> {label}
    </a>
  );
}

function PaidLandingPage() {
  const { landing } = Route.useLoaderData() as { landing: PaidLandingPageConfig };

  const scrollToForm = (location: string) => {
    trackEngagement("survey_open", location, {
      landingId: landing.id,
      service: landing.serviceId,
      city: landing.city,
    });
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 text-[#1C1917] md:pb-0">
      <header className="border-b border-[#1C1917]/10 bg-[#FAF8F5]/95 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-5 px-5 md:px-10">
          <Link to="/" aria-label={`${BRAND_CONFIG.name} home`}>
            <BrandLogo variant="horizontal" />
          </Link>
          <div className="hidden items-center gap-2 sm:flex">
            <ContactAction kind="phone" location="paid_header" landing={landing} />
            <ContactAction kind="whatsapp" location="paid_header" landing={landing} />
            <button
              type="button"
              onClick={() => scrollToForm("paid_header")}
              className="sn-btn-luxury-solid min-h-12 cursor-pointer"
            >
              Get Quote
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-[#1C1917]/10">
          <div className="absolute inset-y-0 right-0 hidden w-[46%] bg-[#1C1917] lg:block" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-10 lg:py-16">
            <div className="flex flex-col justify-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#F37021]">
                {landing.eyebrow}
              </p>
              <h1 className="mt-4 max-w-2xl font-serif text-5xl font-light leading-[0.94] tracking-[-0.02em] text-[#1C1917] sm:text-6xl lg:text-7xl">
                {landing.headline}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#57534E]">{landing.summary}</p>
              <ul className="mt-6 space-y-2.5" aria-label="Service highlights">
                {landing.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm text-[#44403C]">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#F37021]" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => scrollToForm("paid_hero")}
                  className="sn-btn-luxury-solid min-h-12 cursor-pointer"
                >
                  Request Site Survey
                </button>
                <ContactAction kind="phone" location="paid_hero" landing={landing} />
                <ContactAction kind="whatsapp" location="paid_hero" landing={landing} />
              </div>
            </div>

            <div className="relative lg:pl-4">
              <div className="relative aspect-[4/3] overflow-hidden border border-white/15 bg-[#1C1917] shadow-2xl lg:aspect-[5/6]">
                <picture>
                  <source srcSet={landing.heroImageWebp} type="image/webp" />
                  <img
                    src={landing.heroImage}
                    alt={landing.heroAlt}
                    width={landing.heroImageWidth}
                    height={landing.heroImageHeight}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/65 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                    Measured for your opening
                  </p>
                  <p className="mt-2 max-w-sm font-serif text-2xl font-light">
                    A site survey confirms dimensions, material options, and installation scope.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#F37021]">
              Why request a survey
            </p>
            <h2 className="mt-3 max-w-lg font-serif text-4xl font-light leading-tight">
              Clear specifications before installation.
            </h2>
            <div className="mt-8 space-y-7">
              {landing.trustSignals.map((signal, index) => {
                const Icon = index === 0 ? ShieldCheck : Ruler;
                return (
                  <article
                    key={signal.title}
                    className="grid grid-cols-[2rem_1fr] gap-3 border-t border-[#1C1917]/10 pt-5"
                  >
                    <Icon aria-hidden="true" className="mt-0.5 size-5 text-[#F37021]" />
                    <div>
                      <h3 className="text-sm font-medium text-[#1C1917]">{signal.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#78716C]">{signal.detail}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <PaidLeadForm landing={landing} />
        </section>
      </main>

      <footer className="border-t border-[#1C1917]/10 px-5 py-8 text-xs text-[#78716C]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {BRAND_CONFIG.name}
          </span>
          <nav aria-label="Legal" className="flex gap-5">
            <Link to="/privacy" className="underline-offset-4 hover:text-[#F37021] hover:underline">
              Privacy
            </Link>
            <Link to="/terms" className="underline-offset-4 hover:text-[#F37021] hover:underline">
              Terms
            </Link>
          </nav>
        </div>
      </footer>

      <div
        className="fixed inset-x-0 bottom-0 z-40 flex min-h-16 items-stretch bg-[#1C1917] pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(28,25,23,0.18)] sm:hidden"
        aria-label="Quick contact actions"
      >
        <ContactAction kind="phone" location="paid_mobile_sticky" landing={landing} compact />
        <ContactAction kind="whatsapp" location="paid_mobile_sticky" landing={landing} compact />
        <button
          type="button"
          onClick={() => scrollToForm("paid_mobile_sticky")}
          className="flex min-h-12 flex-[1.35] cursor-pointer items-center justify-center bg-[#F37021] px-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-white focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
        >
          Get Quote
        </button>
      </div>
    </div>
  );
}
