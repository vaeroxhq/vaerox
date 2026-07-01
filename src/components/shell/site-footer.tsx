import { VaeroxMark } from "@/components/brand/vaerox-mark";

/**
 * Engineering build footer — monochrome, hairline grid, no marketing.
 */
export function SiteFooter() {
  return (
    <footer aria-label="Build metadata" className="mt-24">
      <div className="w-shell mx-auto px-6 md:px-10 lg:px-16">
        <div className="hairline-t grid grid-cols-2 md:grid-cols-4 gap-px bg-line-1">
          <FootCell label="Revision" value="001" />
          <FootCell label="Build" value="v0.1.0" />
          <FootCell label="Commit" value="—" />
          <FootCell label="Region" value="EU · Global" />
          <FootCell label="Status">
            <span className="inline-flex items-center gap-2">
              <span className="dot text-success" aria-hidden="true" />
              <span className="tabular">Nominal</span>
            </span>
          </FootCell>
          <FootLink label="Source" value="GitHub" href="https://github.com" />
          <FootLink label="Network" value="LinkedIn" href="https://linkedin.com" />
          <FootLink label="Contact" value="hello@vaerox.dev" href="mailto:hello@vaerox.dev" />
        </div>

        <div className="hairline-t py-6 flex items-center justify-between">
          <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
            © VÆRØX · Engineering Journal
          </span>
          <VaeroxMark size={14} className="opacity-60" />
        </div>
      </div>
    </footer>
  );
}

function FootCell({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-canvas px-4 py-3 flex items-baseline justify-between gap-4">
      <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </span>
      <span className="font-mono text-[11px] text-text-2 tabular">{children ?? value}</span>
    </div>
  );
}

function FootLink({ label, value, href }: { label: string; value: string; href: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group bg-canvas px-4 py-3 flex items-baseline justify-between gap-4 transition-micro hover:bg-surface"
    >
      <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] opacity-70">
        {label}
      </span>
      <span className="font-mono text-[11px] text-text-2 tabular group-hover:text-text-1">
        {value}
      </span>
    </a>
  );
}
