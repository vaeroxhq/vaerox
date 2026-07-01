import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/shell/placeholder-page";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VÆRØX" },
      { name: "description", content: "The VÆRØX engineering organization, principles, and people." },
      { property: "og:title", content: "About — VÆRØX" },
      {
        property: "og:description",
        content: "The VÆRØX engineering organization, principles, and people.",
      },
    ],
  }),
  component: () => (
    <PlaceholderPage
      section="§ · About"
      title="The organization."
      summary="What VÆRØX is, how it operates, and what it commits to. Engineering-first, documentation-first, in public by default."
    />
  ),
});
