import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

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

      <main className="flex-1 max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Header */}
        <header className="mb-12 pb-8 border-b border-[#1C1917]/10">
          <p className="sn-eyebrow text-[#F37021] mb-3 font-medium">
            Governance &amp; Transparency
          </p>
          <h1 className="sn-h1 text-[#1C1917]">Privacy Declaration</h1>
          <p className="sn-subtext text-[#78716C] mt-3">
            Effective Date: 2026 · Client Privacy &amp; Data Stewardship Protocol
          </p>
        </header>

        {/* Content Body */}
        <article className="space-y-12 text-xs md:text-sm font-light leading-relaxed text-[#44403C]">
          {/* 1. Introduction */}
          <section className="space-y-3 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base font-serif uppercase tracking-wider font-medium text-[#1C1917]">
              01. Philosophy of Privacy
            </h2>
            <p>
              At {BRAND_CONFIG.name} (&quot;we&quot;, &quot;our&quot;, or &quot;the Atelier&quot;),
              we hold privacy to the same rigorous standard of quiet elegance that defines our
              architectural safety installations. This Privacy Declaration transparently details the
              categories of information we collect, how that information is utilized to coordinate
              on-site laser site surveys, and the third-party infrastructure processors involved in
              delivering our services.
            </p>
          </section>

          {/* 2. Categories of Data Collected */}
          <section className="space-y-3 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base font-serif uppercase tracking-wider font-medium text-[#1C1917]">
              02. Categories of Information We Collect
            </h2>
            <p>We strictly collect only the data necessary to fulfill your site survey request:</p>
            <ul className="list-disc pl-5 space-y-2 text-[#78716C]">
              <li>
                <strong className="text-[#1C1917] font-medium">Contact Details:</strong> Your name,
                10-digit mobile phone number, and email address (if provided) when scheduling a site
                survey or inquiry.
              </li>
              <li>
                <strong className="text-[#1C1917] font-medium">Location &amp; Spatial Data:</strong>{" "}
                Pincode, locality, city hub, and spatial requirements (such as balcony dimensions or
                requested safety solutions) to assign the nearest regional master installation team.
              </li>
              <li>
                <strong className="text-[#1C1917] font-medium">
                  Measurement &amp; Attribution Identifiers:
                </strong>{" "}
                Technical identifiers (such as Google Click ID / GCLID, WBRAID, GBRAID, and campaign
                UTM parameters) captured during website entry to accurately measure ad channel
                efficiency without collecting personal identity.
              </li>
              <li>
                <strong className="text-[#1C1917] font-medium">Technical Log Data:</strong> IP
                addresses, device operating system, browser type, and anonymous interaction
                timestamps necessary for cybersecurity protection and rate-limiting abuse
                prevention.
              </li>
            </ul>
          </section>

          {/* 3. Third-Party Processors */}
          <section className="space-y-3 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base font-serif uppercase tracking-wider font-medium text-[#1C1917]">
              03. Disclosed Third-Party Processors
            </h2>
            <p>
              To maintain high operational security, {BRAND_CONFIG.name} engages trusted cloud
              processors. We do NOT sell, lease, or rent customer personal information to data
              brokers or third-party advertisers. Data is processed solely by:
            </p>
            <div className="border border-[#1C1917]/10 divide-y divide-[#1C1917]/10 mt-3">
              <div className="p-4 bg-[#FAF8F5]">
                <p className="font-medium text-[#1C1917] text-xs uppercase tracking-wider text-[#F37021]">
                  Supabase Inc. (Database &amp; Storage Infrastructure)
                </p>
                <p className="text-[11.5px] text-[#78716C] mt-1">
                  Purpose: Encrypted storage of site survey consultation requests with Row-Level
                  Security (RLS). Location: Secure regional AWS data centers.
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F5]">
                <p className="font-medium text-[#1C1917] text-xs uppercase tracking-wider text-[#F37021]">
                  Google LLC (Google Ads &amp; Google Tag Manager)
                </p>
                <p className="text-[11.5px] text-[#78716C] mt-1">
                  Purpose: Campaign conversion measurement and website performance analytics
                  governed by Google Consent Mode v2.
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F5]">
                <p className="font-medium text-[#1C1917] text-xs uppercase tracking-wider text-[#F37021]">
                  Meta Platforms Inc. (WhatsApp Business Cloud API)
                </p>
                <p className="text-[11.5px] text-[#78716C] mt-1">
                  Purpose: Instant notification dispatch to internal installation coordinators and
                  customer consultation confirmations.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Purpose of Processing */}
          <section className="space-y-3 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base font-serif uppercase tracking-wider font-medium text-[#1C1917]">
              04. Purpose &amp; Lawful Basis of Processing
            </h2>
            <p>We process your personal information based on:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#78716C]">
              <li>
                <strong className="text-[#1C1917] font-medium">Contractual Coordination:</strong>{" "}
                Contacting you to confirm appointment timing, location access, and laser measurement
                feasibility for requested safety systems.
              </li>
              <li>
                <strong className="text-[#1C1917] font-medium">Legitimate Interest:</strong>{" "}
                Preventing spam, detecting automated bot abuse on lead forms, and maintaining server
                security.
              </li>
              <li>
                <strong className="text-[#1C1917] font-medium">Explicit Consent:</strong> Processing
                optional advertising and analytics cookies in accordance with your Consent Banner
                selection.
              </li>
            </ul>
          </section>

          {/* 5. Retention & Erasure */}
          <section className="space-y-3 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base font-serif uppercase tracking-wider font-medium text-[#1C1917]">
              05. Data Retention &amp; Security
            </h2>
            <p>
              Site survey lead records are retained in our secure database for up to 24 months to
              support active warranties, maintenance history, and retensioning requests. If an
              inquiry does not proceed to an installation, you may request permanent erasure at any
              time.
            </p>
            <p>
              All database records are protected by strict Row-Level Security policies ensuring
              anonymous web visitors cannot query, read, or alter client personal records.
            </p>
          </section>

          {/* 6. Your Rights & Contact */}
          <section className="space-y-3 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base font-serif uppercase tracking-wider font-medium text-[#1C1917]">
              06. Access, Correction, Erasure &amp; Withdrawal
            </h2>
            <p>You maintain the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#78716C]">
              <li>Request an export of the personal records associated with your phone number.</li>
              <li>Request immediate correction of inaccurate contact or address information.</li>
              <li>Withdraw consent and request complete deletion (erasure) from our database.</li>
              <li>Reset cookie and measurement choices at any time.</li>
            </ul>
            <div className="bg-[#FAF8F5] p-6 border border-[#1C1917]/10 mt-4">
              <h3 className="font-medium text-[#1C1917] uppercase text-xs tracking-wider mb-2 text-[#F37021]">
                Data Privacy Officer &amp; Client Concierge
              </h3>
              <p className="text-[#44403C] mb-3">
                To submit an access, correction, or erasure request, reach out directly to:
              </p>
              <div className="space-y-1 text-[#44403C]">
                {BRAND_CONFIG.contact.enabled ? (
                  <>
                    <p>
                      • Email:{" "}
                      <a
                        href={`mailto:${BRAND_CONFIG.contact.email}`}
                        className="underline focus-ring text-[#F37021]"
                      >
                        {BRAND_CONFIG.contact.email}
                      </a>
                    </p>
                    <p>
                      • Phone:{" "}
                      <a
                        href={`tel:${BRAND_CONFIG.contact.phoneDial}`}
                        className="underline focus-ring text-[#F37021]"
                      >
                        {BRAND_CONFIG.contact.phoneDisplay}
                      </a>
                    </p>
                  </>
                ) : (
                  <p className="italic text-[#78716C]">
                    Client contact details will be published upon launch.
                  </p>
                )}
                <p>
                  • Operating Hubs: Hyderabad, Visakhapatnam, Vijayawada, Amaravati, Tirupati,
                  Warangal, Hanamkonda
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-[#1C1917]/10 flex flex-col sm:flex-row justify-between gap-4 text-xs font-light">
          <Link
            to="/terms"
            className="text-[#78716C] hover:text-[#F37021] underline underline-offset-4 focus-ring transition-colors"
          >
            ← View Terms and Conditions
          </Link>
          <Link
            to="/consultation"
            className="text-[#F37021] font-medium hover:underline underline-offset-4 focus-ring transition-colors"
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
