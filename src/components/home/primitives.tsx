import type { ReactNode } from "react";

export function DiamondGlyph() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[8px] w-[8px] rotate-45 border border-line-3"
    />
  );
}

export function CornerFramed({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span
        aria-hidden="true"
        className="absolute -top-px -left-px h-2 w-2 border-t border-l border-line-3"
      />
      <span
        aria-hidden="true"
        className="absolute -top-px -right-px h-2 w-2 border-t border-r border-line-3"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-line-3"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-line-3"
      />
      {children}
    </div>
  );
}

export function SectionRule({ label }: { label: string }) {
  return (
    <div className="relative py-2">
      <div className="hairline-t" />
      <div className="absolute inset-x-0 -top-[5px] flex items-center gap-3">
        <span
          aria-hidden="true"
          className="inline-block h-[9px] w-[9px] rotate-45 bg-canvas border border-line-2"
        />
        <span className="text-overline text-text-3 bg-canvas pr-3">{label}</span>
      </div>
    </div>
  );
}

export function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas px-4 pt-3 pb-4">
      <dt className="text-overline text-text-3 opacity-70">{label}</dt>
      <dd className="text-heading-s font-mono text-text-1 mt-2 tabular tracking-[-0.005em]">
        {value}
      </dd>
    </div>
  );
}
