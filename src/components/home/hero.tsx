import { DiamondGlyph, CornerFramed, MetaCell } from "./primitives";

/**
 * Hero — studio positioning. VÆRØX is an independent AI & Software
 * Engineering Studio building modern systems for startups, SMBs, and
 * enterprise teams. Founder attribution stays on the About page.
 */
export function Hero() {
  return (
    <section className="relative pt-28 md:pt-40 lg:pt-48 pb-24 md:pb-32">
      <div className="flex items-center gap-3 mb-14">
        <DiamondGlyph />
        <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
          §01 · AI &amp; Software Engineering Studio
        </span>
      </div>

      <h1 className="font-display text-[52px] md:text-[80px] lg:text-[96px] leading-[0.98] tracking-[-0.032em] max-w-[1040px]">
        Modern software,
        <br />
        <span className="text-text-2">engineered end-to-end.</span>
      </h1>

      <p className="mt-12 max-w-[700px] text-text-2 text-[15px] leading-[1.65]">
        VÆRØX is an independent AI &amp; software engineering studio. We design,
        build, deploy and maintain modern software systems — AI agents, SaaS
        products, internal tools, dashboards, backend platforms, and workflow
        automation — for startups, growing businesses and enterprise teams.
        Every system on this site is engineered under the same discipline we
        bring to client work.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href="/contact"
          className="font-mono text-[11px] text-text-1 uppercase tracking-[0.14em] hover:opacity-70 transition-micro"
        >
          Book a discovery call →
        </a>
        <a
          href="/services"
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1 transition-micro"
        >
          Services →
        </a>
        <a
          href="/case-studies"
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1 transition-micro"
        >
          Case studies →
        </a>
        <a
          href="/industries"
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1 transition-micro"
        >
          Industries →
        </a>
        <a
          href="/engagements"
          className="font-mono text-[11px] text-text-2 uppercase tracking-[0.14em] hover:text-text-1 transition-micro"
        >
          Engagement models →
        </a>
      </div>

      <div className="mt-20 max-w-[640px]">
        <div className="hairline-t" />
        <div className="hairline-t mt-[3px]" />
      </div>

      <CornerFramed className="mt-8">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
          <MetaCell label="Studio" value="VÆRØX" />
          <MetaCell label="Model" value="Independent" />
          <MetaCell label="Clients" value="Startup → Enterprise" />
          <MetaCell label="Contact" value="hello@vaerox.dev" />
        </dl>
      </CornerFramed>
    </section>
  );
}
