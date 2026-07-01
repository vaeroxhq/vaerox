import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/shell/placeholder-page";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — VÆRØX" },
      { name: "description", content: "Long-form journal entries from the VÆRØX engineering team." },
      { property: "og:title", content: "Journal — VÆRØX" },
      {
        property: "og:description",
        content: "Long-form journal entries from the VÆRØX engineering team.",
      },
    ],
  }),
  component: () => (
    <PlaceholderPage
      section="§ · Journal"
      title="Notes, in public."
      summary="Working notes, essays, and observations. Written to be re-read. Chronological, versioned, and permanent."
    />
  ),
});
