import { VaeroxMark } from "@/components/brand/vaerox-mark";

/**
 * Site footer — the ONLY place identity/contact metadata is repeated.
 * Removed the eight-cell strip; four cells cover studio, source, network,
 * and email. Everything else is a page.
 */
export function SiteFooter() {
  return (
    <footer aria-label="Site metadata" className="mt-24">
      <div className="w-shell mx-auto px-6 md:px-10 lg:px-16">
        <div className="hairline-t grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
          <FootCell label="Studio" value="VÆRØX · Independent" />
          <FootLink label="Source"   value="github.com/vaerox"       href="https://github.com/vaerox" />
          <FootLink label="Network"  value="linkedin/vaerox"          href="https://www.linkedin.com/company/vaerox" />
          <FootLink label="Contact"  value="vaeroxhq@gmail.com"       href="mailto:vaeroxhq@gmail.com" />
        </div>

        <div className="hairline-t py-6 flex items-center justify-between">
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
            © VÆRØX · Independent AI engineering studio
          </span>
          <VaeroxMark size={14} className="opacity-60" />
        </div>
      </div>
    </footer>
  );
}

function FootCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas px-4 py-3 flex items-baseline justify-between gap-4">
      <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </span>
      <span className="font-mono text-[11px] text-text-2 tabular truncate">{value}</span>
    </div>
  );
}

function FootLink({ label, value, href }: { label: string; value: string; href: string }) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group bg-canvas px-4 py-3 flex items-baseline justify-between gap-4 transition-micro hover:bg-surface"
    >
      <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </span>
      <span className="font-mono text-[11px] text-text-2 tabular group-hover:text-text-1 truncate">
        {value}
      </span>
    </a>
  );
}
