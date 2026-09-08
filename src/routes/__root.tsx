import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { BRAND_CONFIG } from "@/config/brand";
import { captureAttribution } from "@/lib/attribution";
import { trackEngagement } from "@/lib/analytics";
import { ConsentBanner, initializeGoogleConsentDefaults } from "@/components/ConsentBanner";

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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_CONFIG.name || "InvisProtect",
  ...(BRAND_CONFIG.legalName ? { legalName: BRAND_CONFIG.legalName } : {}),
  description: BRAND_CONFIG.description,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Telangana & Andhra Pradesh",
    addressCountry: "IN",
  },
  ...(BRAND_CONFIG.domain
    ? {
        url: BRAND_CONFIG.domain,
        image: `${BRAND_CONFIG.domain}/images/homepage/hero-desktop.png`,
      }
    : {}),
  ...(BRAND_CONFIG.contact.enabled && BRAND_CONFIG.contact.phoneDial
    ? {
        contactPoint: {
          "@type": "ContactPoint",
          telephone: BRAND_CONFIG.contact.phoneDial,
          email: BRAND_CONFIG.contact.email,
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
      { name: "author", content: BRAND_CONFIG.name || "InvisProtect" },
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
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
      {
        rel: "preload",
        as: "image",
        href: "/images/homepage/hero-desktop.png",
      },
    ];

    return {
      meta,
      links,
      scripts: [
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
    // Initialize Google Consent Mode v2 defaults immediately
    initializeGoogleConsentDefaults();

    // Capture attribution parameters (gclid, wbraid, gbraid, utms)
    captureAttribution();

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
        className="bg-[#FAF8F5] text-[#1C1917] selection:bg-[#F37021]/20"
      >
        {children}
        <ConsentBanner />
        <Scripts />
      </body>
    </html>
  );
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
