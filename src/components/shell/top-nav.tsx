import { Link } from "@tanstack/react-router";
import { VaeroxLockup } from "@/components/brand/vaerox-mark";
import { NAV } from "@/lib/nav";
import { useCommandPalette } from "./command-palette";
import { useTheme } from "@/lib/theme";

/**
 * Top navigation — typography + hairlines only.
 * No buttons, no backgrounds. Active state is a top hairline over the link.
 */
export function TopNav() {
  const { open } = useCommandPalette();
  const { theme, toggle } = useTheme();
  const primary = NAV.filter((n) => n.section === "Primary");

  return (
    <header className="hairline-b bg-canvas">
      <div className="w-shell mx-auto px-6 md:px-10 lg:px-16 h-14 flex items-center justify-between gap-8">
        {/* Left — lockup */}
        <Link
          to="/"
          className="shrink-0 transition-micro hover:opacity-80"
          aria-label="VÆRØX — Home"
        >
          <VaeroxLockup markSize={20} />
        </Link>

        {/* Center — primary nav (hidden on small screens) */}
        <nav aria-label="Primary" className="hidden lg:flex items-center h-full">
          <ul className="flex items-center h-full">
            {primary.map((item) => (
              <li key={item.to} className="h-full">
                <Link
                  to={item.to}
                  className="relative h-full px-4 flex items-center font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] transition-micro hover:text-text-1"
                  activeProps={{
                    className:
                      "relative h-full px-4 flex items-center font-mono text-[11px] text-text-1 uppercase tracking-[0.14em] before:content-[''] before:absolute before:left-3 before:right-3 before:top-0 before:h-px before:bg-text-1",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right — search / theme / status */}
        <div className="flex items-center gap-5 shrink-0">
          <button
            type="button"
            onClick={open}
            aria-label="Open command palette"
            className="inline-flex items-center gap-3 font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] transition-micro hover:text-text-1"
          >
            <span>Search</span>
            <kbd className="hidden sm:inline font-mono text-[10px] text-text-3 tracking-[0.14em] hairline px-1.5 py-[1px] rounded-[2px]">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="font-mono text-[11px] text-text-3 uppercase tracking-[0.14em] transition-micro hover:text-text-1 tabular"
          >
            {theme === "dark" ? "Dark" : "Light"}
          </button>

          <span
            aria-label="System status: nominal"
            className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] text-text-3 uppercase tracking-[0.14em]"
          >
            <span className="dot text-success" aria-hidden="true" />
            Nominal
          </span>
        </div>
      </div>
    </header>
  );
}
