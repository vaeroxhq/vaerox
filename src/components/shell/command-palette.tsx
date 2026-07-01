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
import { PROJECTS, NOTES } from "@/lib/home-data";

type Ctx = { open: () => void };
const PaletteCtx = createContext<Ctx | null>(null);

export function useCommandPalette() {
  const ctx = useContext(PaletteCtx);
  if (!ctx) throw new Error("useCommandPalette must be used inside <CommandPaletteProvider>");
  return ctx;
}

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
    // navigate is dynamically typed here; all NAV paths exist as file routes.
    navigate({ to } as never);
  };

  return (
    <PaletteCtx.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Search VÆRØX — pages, systems, references…" />
        <CommandList className="max-h-[420px]">
          <CommandEmpty>
            <span className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]">
              No results
            </span>
          </CommandEmpty>

          <CommandGroup heading="Navigate">
            {NAV.filter((n) => n.section === "Primary").map((n) => (
              <PaletteItem key={n.to} label={n.label} hint={n.hint} onSelect={() => go(n.to)} />
            ))}
          </CommandGroup>

          <CommandGroup heading="Meta">
            {NAV.filter((n) => n.section === "Meta").map((n) => (
              <PaletteItem key={n.to} label={n.label} hint={n.hint} onSelect={() => go(n.to)} />
            ))}
            <PaletteItem label="Home" hint="Return to the index" onSelect={() => go("/")} />
          </CommandGroup>

          <CommandGroup heading="Actions">
            <PaletteItem
              label="Toggle theme"
              hint="Switch between dark and light"
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
  onSelect,
}: {
  label: string;
  hint: string;
  onSelect: () => void;
}) {
  return (
    <CommandItem
      value={`${label} ${hint}`}
      onSelect={onSelect}
      className="flex items-baseline justify-between gap-6"
    >
      <span className="font-display text-[14px] text-text-1 tracking-[-0.01em]">{label}</span>
      <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em] truncate">
        {hint}
      </span>
    </CommandItem>
  );
}
