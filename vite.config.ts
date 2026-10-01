// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    define: {
      "import.meta.env.VITE_GADS_ACCOUNT_ID": JSON.stringify(
        process.env.VITE_GADS_ACCOUNT_ID || "AW-18458426727",
      ),
      "import.meta.env.VITE_GADS_PRIMARY_LEAD_CONVERSION": JSON.stringify(
        process.env.VITE_GADS_PRIMARY_LEAD_CONVERSION || "AW-18458426727/y4y4CJW2m40dEOf61OFE",
      ),
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
