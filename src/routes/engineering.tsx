import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/shell/placeholder-page";

export const Route = createFileRoute("/engineering")({
  head: () => ({
    meta: [
      { title: "Engineering — VÆRØX" },
      {
        name: "description",
        content: "Engineering practices, incident reviews, and internal standards.",
      },
      { property: "og:title", content: "Engineering — VÆRØX" },
      {
        property: "og:description",
        content: "Engineering practices, incident reviews, and internal standards.",
      },
    ],
  }),
  component: () => (
    <PlaceholderPage
      section="§ · Engineering"
      title="Practices and reviews."
      summary="How VÆRØX writes, ships, and operates software. Incident post-mortems, code review standards, and engineering guides."
    />
  ),
});
