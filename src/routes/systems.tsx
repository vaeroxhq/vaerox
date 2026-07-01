import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/shell/placeholder-page";

export const Route = createFileRoute("/systems")({
  head: () => ({
    meta: [
      { title: "Systems — VÆRØX" },
      {
        name: "description",
        content: "Production systems and engineering domains operated by VÆRØX.",
      },
      { property: "og:title", content: "Systems — VÆRØX" },
      {
        property: "og:description",
        content: "Production systems and engineering domains operated by VÆRØX.",
      },
    ],
  }),
  component: () => (
    <PlaceholderPage
      section="§ · Systems"
      title="Systems in production."
      summary="Every domain VÆRØX operates — enterprise AI, platform, infrastructure — indexed with owner, maturity, and health. Populated as systems are documented."
    />
  ),
});
