import type { ReactNode } from "react";

type Kind = "note" | "warning" | "incident" | "decision";

const LABEL: Record<Kind, string> = {
  note: "NOTE",
  warning: "WARNING",
  incident: "INCIDENT",
  decision: "DECISION",
};

/**
 * Callout — hairline block, no fill. Kind sets only the label and
 * a subtle top border tint via a single utility class.
 */
export function Callout({
  kind = "note",
  title,
  children,
}: {
  kind?: Kind;
  title?: string;
  children: ReactNode;
}) {
  const accent =
    kind === "warning"
      ? "border-t-warning"
      : kind === "incident"
        ? "border-t-danger"
        : kind === "decision"
          ? "border-t-info"
          : "border-t-line-3";

  return (
    <div className={`hairline bg-canvas mt-6 border-t-2 ${accent}`}>
      <div className="px-4 py-2 hairline-b flex items-baseline justify-between">
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.18em]">
          {LABEL[kind]}
        </span>
        {title && (
          <span className="font-mono text-[10px] text-text-2 tabular truncate">{title}</span>
        )}
      </div>
      <div className="px-4 py-4 text-[14px] text-text-2 leading-[1.65]">{children}</div>
    </div>
  );
}
