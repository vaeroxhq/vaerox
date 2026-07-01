import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/shell/placeholder-page";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VÆRØX" },
      { name: "description", content: "Reach the VÆRØX engineering team." },
      { property: "og:title", content: "Contact — VÆRØX" },
      { property: "og:description", content: "Reach the VÆRØX engineering team." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      section="§ · Contact"
      title="Reach the team."
      summary="For collaboration, engineering roles, and research inquiries. Async by default."
    />
  ),
});
