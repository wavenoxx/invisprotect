import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";
import { hubCityList } from "@/config/business";

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildMetaTags({
      title: `Privacy Declaration & Data Stewardship — ${BRAND_CONFIG.name}`,
      description: `Complete privacy declaration, data processing principles, cookie governance, and client rights for ${BRAND_CONFIG.name}.`,
      canonicalPath: "/privacy",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Privacy Declaration & Data Stewardship",
        description: `Official privacy policies and data protection practices of ${BRAND_CONFIG.name}.`,
        publisher: {
          "@type": "Organization",
          name: BRAND_CONFIG.name,
          url: BRAND_CONFIG.domain,
        },
      },
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-4xl mx-auto px-5 sm:px-8 md:px-12 pt-32 pb-24 w-full">
        {/* Header */}
        <header className="mb-12 pb-8 border-b border-[#1C1917]/10">
          <p className="sn-eyebrow text-brand mb-3 font-medium">Governance &amp; Transparency</p>
          <h1 className="sn-h1 text-[#1C1917]">Privacy Declaration</h1>
          <p className="sn-subtext text-[#78716C] mt-3">
            Last updated: 28 September 2026 · Client Privacy &amp; Data Stewardship
          </p>
        </header>

        {/* Content Body */}
        <article className="space-y-12 text-xs md:text-sm font-light leading-relaxed text-[#44403C]">
          {/* 1. Introduction */}
          <section className="space-y-3 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="sn-h2 text-[#1C1917] mb-3">01. Philosophy of Privacy</h2>
            <p>
              At {BRAND_CONFIG.name} (&quot;we&quot;, &quot;our&quot;, or &quot;the Atelier&quot;),
              we hold privacy to the same standard of quiet elegance as everything else we do.{" "}
              {BRAND_CONFIG.name} is a referral service: we connect homeowners with one independent,
              checked installer. This Privacy Declaration explains what information we collect, how
              your request reaches us and the installer, and which third parties are involved.
            </p>
          </section>

          {/* 2. Categories of Data Collected */}
          <section className="space-y-3 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="sn-h2 text-[#1C1917] mb-3">02. Categories of Information We Collect</h2>
            <p>We collect only the information needed to handle your site survey request:</p>
            <ul className="list-disc pl-5 space-y-2 text-[#78716C]">
              <li>
                <strong className="text-[#1C1917] font-medium">Contact Details:</strong> Your name
                and 10-digit mobile number when you call us, message us on WhatsApp, or use a form
                on this website (the form opens WhatsApp with your details filled in, and they reach
                us only when you press Send).
              </li>
              <li>
                <strong className="text-[#1C1917] font-medium">Location &amp; Spatial Data:</strong>{" "}
                Pincode, locality, city and your requirement (such as a balcony, windows or the
                safety solution you need), so that we can pass your request to the nearest checked
                installer.
              </li>
              <li>
                <strong className="text-[#1C1917] font-medium">
                  Measurement &amp; Attribution Identifiers:
                </strong>{" "}
                Technical identifiers (such as Google Click ID / GCLID, WBRAID, GBRAID, and campaign
                UTM parameters) held in your browser during the visit, and a short lead reference
                (for example IG-HYD-K7Q2M9XA) shown in your WhatsApp message and used to measure our
                Google Ads. Persistent browser storage is used only after optional measurement
                consent is granted.
              </li>
              <li>
                <strong className="text-[#1C1917] font-medium">Technical Log Data:</strong> IP
                addresses, device operating system, browser type, and request timestamps recorded by
                our website hosting provider for security and abuse prevention.
              </li>
            </ul>
          </section>

          {/* 3. Sharing with an installer */}
          <section className="space-y-3 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="sn-h2 text-[#1C1917] mb-3">
              03. Sharing Your Request With an Installer
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-[#78716C]">
              <li>
                When you submit a request, call or WhatsApp us, we share your name, mobile number,
                area / pincode and requirement with{" "}
                <strong className="text-[#1C1917] font-medium">one</strong> independent installer in
                your city, so they can contact you, visit and quote.
              </li>
              <li>
                We do not share the same request with more than one installer unless you ask us to.
              </li>
              <li>
                The installer is a separate business, responsible for its own quote, work and
                warranty, and for handling your details under its own practices.
              </li>
              <li>{BRAND_CONFIG.name} may receive a fee from installers for introductions.</li>
              <li>We never sell your details to data brokers or advertisers.</li>
              <li>
                To stop being contacted or to have your details deleted, WhatsApp or email us. We
                will also ask the installer to stop.
              </li>
            </ul>
          </section>

          {/* 4. Third-Party Processors */}
          <section className="space-y-3 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="sn-h2 text-[#1C1917] mb-3">04. Disclosed Third-Party Processors</h2>
            <p>Besides the installer described above, your information is handled only by:</p>
            <div className="border border-[#1C1917]/10 divide-y divide-[#1C1917]/10 mt-3">
              <div className="p-4 bg-[#FAF8F5]">
                <p className="font-medium text-[#1C1917] text-xs uppercase tracking-wider text-brand">
                  WhatsApp (Meta Platforms)
                </p>
                <p className="text-[11.5px] text-[#78716C] mt-1">
                  Purpose: Receiving your request and talking to you about it. Messages you send us
                  on WhatsApp are handled under WhatsApp&apos;s own privacy policy.
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F5]">
                <p className="font-medium text-[#1C1917] text-xs uppercase tracking-wider text-brand">
                  Google LLC (Google Ads &amp; Google tag)
                </p>
                <p className="text-[11.5px] text-[#78716C] mt-1">
                  Purpose: Campaign conversion measurement and website performance analytics
                  governed by Google Consent Mode v2.
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F5]">
                <p className="font-medium text-[#1C1917] text-xs uppercase tracking-wider text-brand">
                  Vercel Inc. (Website Hosting)
                </p>
                <p className="text-[11.5px] text-[#78716C] mt-1">
                  Purpose: Serving this website and keeping standard request logs for security.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Purpose of Processing */}
          <section className="space-y-3 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="sn-h2 text-[#1C1917] mb-3">
              05. Purpose &amp; Lawful Basis of Processing
            </h2>
            <p>We process your personal information based on:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#78716C]">
              <li>
                <strong className="text-[#1C1917] font-medium">Your Request:</strong> Contacting you
                about your request and passing it to one checked installer for a site visit and
                quote, as you agreed when you submitted it.
              </li>
              <li>
                <strong className="text-[#1C1917] font-medium">Legitimate Interest:</strong>{" "}
                Preventing spam, detecting automated bot abuse on lead forms, and maintaining server
                security.
              </li>
              <li>
                <strong className="text-[#1C1917] font-medium">Explicit Consent:</strong> Processing
                optional advertising and analytics measurement and browser storage in accordance
                with your Consent Banner selection.
              </li>
            </ul>
          </section>

          {/* 6. Retention & Erasure */}
          <section className="space-y-3 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="sn-h2 text-[#1C1917] mb-3">06. Data Retention &amp; Security</h2>
            <p>
              This website does not store your form details in a database. Your request lives in our
              WhatsApp conversation with you, and we keep it only as long as needed to connect you
              with an installer and follow up — never longer than 24 months.
            </p>
            <p>
              You may ask us at any time to delete the conversation and your details; we will also
              ask the installer to delete them.
            </p>
          </section>

          {/* 7. Your Rights & Contact */}
          <section className="space-y-3 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="sn-h2 text-[#1C1917] mb-3">
              07. Access, Correction, Erasure &amp; Withdrawal
            </h2>
            <p>You maintain the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#78716C]">
              <li>Request a copy of the personal information we hold about your phone number.</li>
              <li>Request immediate correction of inaccurate contact or address information.</li>
              <li>
                Withdraw consent, stop further contact and request complete deletion (erasure).
              </li>
              <li>Reset cookie and measurement choices at any time.</li>
            </ul>
            <div className="bg-[#FAF8F5] p-6 border border-[#1C1917]/10 mt-4">
              <h3 className="font-medium text-[#1C1917] uppercase text-xs tracking-wider mb-2 text-brand">
                Data Privacy Officer &amp; Client Concierge
              </h3>
              <p className="text-[#44403C] mb-3">
                To submit an access, correction, or erasure request, reach out directly to:
              </p>
              <div className="space-y-1 text-[#44403C]">
                {BRAND_CONFIG.contact.emailHref || BRAND_CONFIG.contact.phoneHref ? (
                  <>
                    {BRAND_CONFIG.contact.emailHref ? (
                      <p>
                        • Email:{" "}
                        <a
                          href={BRAND_CONFIG.contact.emailHref}
                          className="underline focus-ring text-brand"
                        >
                          {BRAND_CONFIG.contact.email}
                        </a>
                      </p>
                    ) : null}
                    {BRAND_CONFIG.contact.phoneHref ? (
                      <p>
                        • Phone:{" "}
                        <a
                          href={BRAND_CONFIG.contact.phoneHref}
                          className="underline focus-ring text-brand"
                        >
                          {BRAND_CONFIG.contact.phoneDisplay}
                        </a>
                      </p>
                    ) : null}
                  </>
                ) : (
                  <p className="italic text-[#78716C]">
                    Client contact details will be published upon launch.
                  </p>
                )}
                <p>• Service Areas: {hubCityList()}</p>
              </div>
            </div>
          </section>
        </article>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-[#1C1917]/10 flex flex-col sm:flex-row justify-between gap-4 text-xs font-light">
          <Link
            to="/terms"
            className="text-[#78716C] hover:text-brand underline underline-offset-4 focus-ring transition-colors"
          >
            ← View Terms and Conditions
          </Link>
          <Link
            to="/consultation"
            className="text-brand font-medium hover:underline underline-offset-4 focus-ring transition-colors"
          >
            Request Private Site Survey →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPage;
