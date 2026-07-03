import { createFileRoute } from "@tanstack/react-router";
import { HANDBOOK, type HandbookSection } from "@/lib/engineering-data";
import { PageHeader, SectionShell } from "@/components/section/section-bits";
import { OpsTag } from "@/components/ops/ops-tag";

export const Route = createFileRoute("/engineering")({
  head: () => ({
    meta: [
      { title: "Engineering Handbook — Vaerox" },
      {
        name: "description",
        content:
          "How Vaerox writes, reviews, ships, and operates software. Canonical engineering standards.",
      },
      { property: "og:title", content: "Engineering Handbook — Vaerox" },
      {
        property: "og:description",
        content:
          "How Vaerox writes, reviews, ships, and operates software. Canonical engineering standards.",
      },
    ],
  }),
  component: EngineeringPage,
});

function EngineeringPage() {
  const canonical = HANDBOOK.filter((h) => h.status === "Canonical").length;
  return (
    <SectionShell>
      <PageHeader
        section="§ · Engineering"
        title="Engineering handbook."
        summary="The standards the lab itself follows — how software is written, reviewed, shipped, and operated at VÆRØX. Canonical, not aspirational. Each section is dated and versioned."
        meta={[
          { label: "Sections", value: HANDBOOK.length.toString().padStart(2, "0") },
          { label: "Canonical", value: canonical.toString().padStart(2, "0") },
          { label: "Owners", value: new Set(HANDBOOK.map((h) => h.owner)).size.toString() },
          {
            label: "Last edit",
            value:
              HANDBOOK.map((h) => h.updated)
                .sort()
                .at(-1) ?? "—",
          },
        ]}
      />

      {/* Table of contents */}
      <nav className="hairline bg-canvas mb-10">
        <div className="px-4 py-3 hairline-b flex items-baseline justify-between">
          <span className="text-overline text-text-3 opacity-70">Contents</span>
          <span className="text-overline text-text-3 opacity-70">
            {HANDBOOK.length.toString().padStart(2, "0")} sections
          </span>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-1">
          {HANDBOOK.map((h) => (
            <li key={h.slug} className="bg-canvas">
              <a
                href={`#${h.slug}`}
                className="group card-hover hover:card-hover-on flex items-baseline gap-3 px-4 py-3"
              >
                <span className="text-metadata text-text-3 w-6">{h.index}</span>
                <span className="text-heading-s text-text-2 group-hover:text-text-1 transition-micro tracking-[-0.005em]">
                  {h.title}
                </span>
                <span className="ml-auto text-metadata text-text-3">{h.revision}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Sections */}
      <div className="space-y-16">
        {HANDBOOK.map((h) => (
          <HandbookArticle key={h.slug} section={h} />
        ))}
      </div>
    </SectionShell>
  );
}

function HandbookArticle({ section }: { section: HandbookSection }) {
  return (
    <article
      id={section.slug}
      className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8"
    >
      <aside className="hairline bg-canvas h-fit">
        <div className="px-4 py-3 hairline-b flex items-baseline justify-between">
          <span className="text-label text-text-2 tabular">§ {section.index}</span>
          <span className="text-metadata text-text-3">{section.revision}</span>
        </div>
        <dl className="text-label">
          <SideRow k="Owner" v={section.owner} />
          <SideRow k="Updated" v={section.updated} />
          <SideRow k="Status" v={section.status} />
        </dl>
        <div className="px-4 py-3 hairline-t flex flex-wrap gap-x-3 gap-y-2">
          <OpsTag label="CANONICAL" />
          <OpsTag label="VERSIONED" />
        </div>
      </aside>

      <div className="max-w-[720px]">
        <h2 className="font-display text-heading-xl md:text-heading-xl text-text-1 tracking-[-0.022em]">
          {section.title}
        </h2>
        <p className="mt-3 text-body-m text-text-2 leading-[1.65]">{section.summary}</p>

        <div className="mt-6 hairline-t pt-6 space-y-5">
          {section.body.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </div>
      </div>
    </article>
  );
}

function SideRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[70px_1fr] items-baseline gap-3 px-4 py-2 hairline-b last:border-b-0">
      <dt className="text-overline text-text-3 opacity-70">{k}</dt>
      <dd className="text-label text-text-2 tabular">{v}</dd>
    </div>
  );
}

function Block({ block }: { block: HandbookSection["body"][number] }) {
  if (block.kind === "p") {
    return <p className="text-body-m text-text-2 leading-[1.7]">{block.text}</p>;
  }
  if (block.kind === "list") {
    return (
      <ul className="space-y-2">
        {block.items.map((it, i) => (
          <li key={i} className="flex gap-3 text-body-m text-text-2">
            <span className="mt-[9px] inline-block h-px w-3 bg-line-3 shrink-0" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.kind === "kv") {
    return (
      <dl className="hairline bg-canvas">
        {block.rows.map((r, i) => (
          <div
            key={i}
            className={`grid grid-cols-[1fr_auto] items-baseline gap-6 px-4 py-3 ${i < block.rows.length - 1 ? "hairline-b" : ""}`}
          >
            <dt className="text-label text-text-3 uppercase tracking-[0.12em]">{r.k}</dt>
            <dd className="text-code text-text-1">{r.v}</dd>
          </div>
        ))}
      </dl>
    );
  }
  return (
    <blockquote className="hairline-l pl-4 border-l-line-3">
      <p className="text-heading-s text-text-1 italic leading-[1.55] tracking-[-0.005em]">
        "{block.text}"
      </p>
      {block.source && (
        <cite className="mt-2 block font-mono text-overline text-text-3 not-italic uppercase tracking-[0.14em]">
          {block.source}
        </cite>
      )}
    </blockquote>
  );
}
