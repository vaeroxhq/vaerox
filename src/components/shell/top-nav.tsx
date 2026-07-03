import { Link } from "@tanstack/react-router";
import { VaeroxLockup } from "@/components/brand/vaerox-mark";
import { NAV } from "@/lib/nav";
import { useCommandPalette } from "./command-palette";
import { useTheme } from "@/lib/theme";

/**
 * Top navigation — typography + hairlines only.
 * No buttons, no backgrounds. Active state is a top hairline over the link.
 *
 * Animation: Navigation link underline grows from LEFT to RIGHT on hover
 * Duration: 200ms, easing: ease-out
 */
export function TopNav() {
  const { open } = useCommandPalette();
  const { theme, toggle } = useTheme();
  const primary = NAV.filter((n) => n.section === "Primary");

  return (
    <header className="hairline-b bg-canvas">
      <div className="w-shell mx-auto h-16 flex items-center justify-between gap-8">
        {/* Left — lockup */}
        <Link
          to="/"
          className="shrink-0 animate-logo-hover hover:opacity-80 active:opacity-50"
          aria-label="VÆRØX — Home"
        >
          <VaeroxLockup markSize={25} />
        </Link>

        {/* Center — primary nav (hidden on small screens) */}
        <nav aria-label="Primary" className="hidden lg:flex items-center h-full">
          <ul className="flex items-center h-full">
            {primary.map((item) => (
              <li key={item.to} className="h-full relative">
                <Link
                  to={item.to}
                  className="relative h-full px-4 flex items-center text-nav text-text-3 transition-micro transition-ui hover:text-text-1 group"
                  activeProps={{
                    className:
                      "relative h-full px-4 flex items-center text-nav text-text-1 transition-colors duration-200",
                  }}
                >
                  {item.label}
                  <span className="absolute bottom-3 left-4 right-4 h-px bg-text-3 transition-ui duration-300 scale-x-0 origin-left group-hover:scale-x-100 group-hover:bg-text-1" />
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
            className="inline-flex items-center gap-3 text-nav text-text-3 transition-micro transition-ui hover:text-text-1 active:opacity-50"
          >
            <span>Search</span>
            <kbd className="hidden sm:inline text-metadata text-text-3 hairline px-1.5 py-[1px] rounded-[2px] transition-micro transition-ui group-hover:text-text-1">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="text-nav text-text-3 transition-micro transition-ui hover:text-text-1 active:opacity-50 tabular"
          >
            {theme === "dark" ? "Dark" : "Light"}
          </button>

          <span
            aria-label="System status: nominal"
            className="hidden md:inline-flex items-center gap-2 text-nav text-text-3"
          >
            <span className="dot text-success" aria-hidden="true" />
            Nominal
          </span>
        </div>
      </div>
    </header>
  );
}
