import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  component: () => <Navigate to="/safety-faq" replace />,
});
