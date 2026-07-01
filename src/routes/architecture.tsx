import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/shell/placeholder-page";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Architecture — VÆRØX" },
      { name: "description", content: "System diagrams and architecture decision records." },
      { property: "og:title", content: "Architecture — VÆRØX" },
      {
        property: "og:description",
        content: "System diagrams and architecture decision records.",
      },
    ],
  }),
  component: () => (
    <PlaceholderPage
      section="§ · Architecture"
      title="Diagrams and decisions."
      summary="High-fidelity architecture diagrams, ADRs, and system interfaces. Each decision recorded with context, alternatives, and consequences."
    />
  ),
});
