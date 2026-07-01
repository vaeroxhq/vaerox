import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/shell/placeholder-page";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — VÆRØX" },
      { name: "description", content: "Case studies and engineering builds published by VÆRØX." },
      { property: "og:title", content: "Projects — VÆRØX" },
      {
        property: "og:description",
        content: "Case studies and engineering builds published by VÆRØX.",
      },
    ],
  }),
  component: () => (
    <PlaceholderPage
      section="§ · Projects"
      title="Case studies and builds."
      summary="Individual projects with context, architecture, benchmarks, and outcomes. Long-form documents, versioned like software."
    />
  ),
});
