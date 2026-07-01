import { useEffect, useState, createContext, useContext, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { NAV } from "@/lib/nav";
import { useTheme } from "@/lib/theme";
import { allEntities, KIND_LABEL, type Entity, type EntityKind } from "@/lib/graph";

type Ctx = { open: () => void };
const PaletteCtx = createContext<Ctx | null>(null);

export function useCommandPalette() {
  const ctx = useContext(PaletteCtx);
  if (!ctx) throw new Error("useCommandPalette must be used inside <CommandPaletteProvider>");
  return ctx;
}

const GROUP_ORDER: EntityKind[] = [
  "system", "adr", "incident", "benchmark", "api",
  "project", "research", "journal", "handbook",
];

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (to: string) => {
    setIsOpen(false);
    navigate({ to } as never);
  };

  // Group entities by kind for the palette (all entities are indexed).
  const grouped = new Map<EntityKind, Entity[]>();
  for (const e of allEntities()) {
    if (!grouped.has(e.kind)) grouped.set(e.kind, []);
    grouped.get(e.kind)!.push(e);
  }

  return (
    <PaletteCtx.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Search VÆRØX — systems, ADRs, incidents, benchmarks, APIs…" />
        <CommandList className="max-h-[520px]">
          <CommandEmpty>
            <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
              No results
            </span>
          </CommandEmpty>

          <CommandGroup heading="Navigate">
            {NAV.filter((n) => n.section === "Primary").map((n) => (
              <PaletteItem key={n.to} label={n.label} hint={n.hint} tag="NAV" onSelect={() => go(n.to)} />
            ))}
          </CommandGroup>

          {GROUP_ORDER.filter((k) => grouped.has(k)).map((k) => (
            <CommandGroup key={k} heading={KIND_LABEL[k]}>
              {grouped.get(k)!.map((e) => (
                <PaletteItem
                  key={`${e.kind}:${e.id}`}
                  label={e.title}
                  hint={e.summary}
                  tag={e.kicker}
                  onSelect={() => go(e.href)}
                />
              ))}
            </CommandGroup>
          ))}

          <CommandGroup heading="Meta">
            {NAV.filter((n) => n.section === "Meta").map((n) => (
              <PaletteItem key={n.to} label={n.label} hint={n.hint} tag="META" onSelect={() => go(n.to)} />
            ))}
            <PaletteItem label="Home" hint="Return to the index" tag="NAV" onSelect={() => go("/")} />
          </CommandGroup>

          <CommandGroup heading="Actions">
            <PaletteItem
              label="Toggle theme"
              hint="Switch between dark and light"
              tag="ACTION"
              onSelect={() => {
                toggleTheme();
                setIsOpen(false);
              }}
            />
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </PaletteCtx.Provider>
  );
}

function PaletteItem({
  label,
  hint,
  tag,
  onSelect,
}: {
  label: string;
  hint: string;
  tag: string;
  onSelect: () => void;
}) {
  return (
    <CommandItem
      value={`${label} ${hint} ${tag}`}
      onSelect={onSelect}
      className="flex items-baseline justify-between gap-6"
    >
      <div className="min-w-0 flex items-baseline gap-3">
        <span className="font-mono text-[9.5px] text-text-3 uppercase tracking-[0.18em] tabular w-[70px] shrink-0">
          {tag}
        </span>
        <span className="font-display text-[14px] text-text-1 tracking-[-0.01em] truncate">{label}</span>
      </div>
      <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] truncate max-w-[40%]">
        {hint}
      </span>
    </CommandItem>
  );
}
