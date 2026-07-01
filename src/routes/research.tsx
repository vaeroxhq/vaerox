import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/shell/placeholder-page";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — VÆRØX" },
      { name: "description", content: "Papers, benchmarks, and technical research from VÆRØX." },
      { property: "og:title", content: "Research — VÆRØX" },
      {
        property: "og:description",
        content: "Papers, benchmarks, and technical research from VÆRØX.",
      },
    ],
  }),
  component: () => (
    <PlaceholderPage
      section="§ · Research"
      title="Papers, benchmarks, notes."
      summary="Open research on AI infrastructure, distributed systems, and quantitative methods. Reviewed internally before publication."
    />
  ),
});
