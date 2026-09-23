import { createFileRoute } from "@tanstack/react-router";

/**
 * GET /api/health
 *
 * Lightweight uptime + database keep-alive endpoint.
 * A scheduled job (.github/workflows/keep-alive.yml or any free uptime
 * monitor) calls this every few days. The tiny head-only count query counts as
 * database activity, so a Supabase Free-plan project does not auto-pause after
 * 7 idle days and silently stop saving leads.
 *
 * Returns no lead data — only whether the database answered.
 */
export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const headers = {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
          "x-robots-tag": "noindex",
        };

        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
          return new Response(JSON.stringify({ ok: true, database: "unconfigured" }), {
            status: 200,
            headers,
          });
        }

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin
            .from("consultations")
            .select("id", { count: "exact", head: true })
            .limit(1);

          if (error) {
            console.error("[Health] Database check failed.");
            return new Response(JSON.stringify({ ok: false, database: "error" }), {
              status: 503,
              headers,
            });
          }

          return new Response(JSON.stringify({ ok: true, database: "ok" }), {
            status: 200,
            headers,
          });
        } catch {
          console.error("[Health] Database check threw.");
          return new Response(JSON.stringify({ ok: false, database: "error" }), {
            status: 503,
            headers,
          });
        }
      },
    },
  },
});
