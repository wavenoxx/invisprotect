import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { BRAND_CONFIG } from "@/config/brand";
import { captureAttribution } from "@/lib/attribution";
import { GADS_ACCOUNT_ID, trackEngagement, trackPageView } from "@/lib/analytics";
import { getGoogleTagHeadScripts } from "@/lib/google-tag";
import { ConsentBanner } from "@/components/ConsentBanner";
import { BUSINESS, SERVICE_HUBS } from "@/config/business";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-light text-[#1C1917] font-serif">404</h1>
        <h2 className="mt-4 text-xl font-normal text-[#1C1917] uppercase tracking-widest font-serif">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-[#78716C] font-light">
          The requested page does not exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="sn-btn-luxury-solid">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-normal tracking-wide text-[#1C1917] uppercase font-serif">
          An error occurred
        </h1>
        <p className="mt-2 text-sm text-[#78716C] font-light">
          Something went wrong loading this view. You may refresh or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="sn-btn-luxury-solid cursor-pointer"
          >
            Try again
          </button>
          <Link to="/" className="sn-btn-luxury-dark">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const socialProfiles = [
  BRAND_CONFIG.socials.instagram,
  BRAND_CONFIG.socials.facebook,
  BRAND_CONFIG.socials.youtube,
].filter((url): url is string => Boolean(url && url.length > 0));

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
  name: BRAND_CONFIG.name,
  ...(BRAND_CONFIG.legalName ? { legalName: BRAND_CONFIG.legalName } : {}),
  description: BRAND_CONFIG.description,
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, UPI, Bank Transfer",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.primaryCity,
    addressRegion: BUSINESS.primaryRegion,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  areaServed: SERVICE_HUBS.map((hub) => ({ "@type": "City", name: hub.schemaName })),
  ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
  ...(BRAND_CONFIG.domain
    ? {
        url: BRAND_CONFIG.domain,
        image: `${BRAND_CONFIG.domain}/images/homepage/hero-desktop.jpg`,
      }
    : {}),
  ...(BRAND_CONFIG.contact.enabled && BRAND_CONFIG.contact.phoneDial
    ? {
        telephone: BRAND_CONFIG.contact.phoneDial,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: BRAND_CONFIG.contact.phoneDial,
          ...(BRAND_CONFIG.contact.email ? { email: BRAND_CONFIG.contact.email } : {}),
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Telugu", "Hindi"],
        },
      }
    : {}),
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const pageTitle = BRAND_CONFIG.name
      ? `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`
      : BRAND_CONFIG.tagline;

    const meta = [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: pageTitle },
      { name: "description", content: BRAND_CONFIG.description },
      { name: "author", content: BRAND_CONFIG.name },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: BRAND_CONFIG.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ];

    const links = [
      { rel: "stylesheet", href: appCss },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500;600&family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap",
      },
    ];

    return {
      meta,
      links,
      scripts: [
        ...getGoogleTagHeadScripts(GADS_ACCOUNT_ID),
        {
          type: "application/ld+json",
          children: JSON.stringify(organizationSchema),
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Compatibility shim: map legacy trackGoogleConversion calls safely to secondary trackEngagement
    window.trackGoogleConversion = function (actionType: string) {
      trackEngagement(
        actionType === "whatsapp" ? "whatsapp" : actionType === "phone" ? "phone" : "navigation",
        "legacy_shim",
      );
    };
  }, []);

  return (
    <html
      lang="en"
      style={{ backgroundColor: "#FAF8F5", color: "#1C1917" }}
      className="bg-[#FAF8F5]"
    >
      <head>
        <HeadContent />
      </head>
      <body
        style={{ backgroundColor: "#FAF8F5", color: "#1C1917" }}
        className="bg-[#FAF8F5] text-[#1C1917] selection:bg-brand/20"
      >
        <MeasurementLifecycle />
        {children}
        <ConsentBanner />
        <Scripts />
      </body>
    </html>
  );
}

function MeasurementLifecycle() {
  const href = useRouterState({ select: (state) => state.location.href });

  useEffect(() => {
    captureAttribution();
    trackPageView(window.location.href, document.title);
  }, [href]);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917]">
        <Outlet />
      </div>
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
}
