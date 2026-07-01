import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";
const KEY = "vx-theme";

type Ctx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };
const ThemeCtx = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  // Hydrate from localStorage (client-only).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(KEY) as Theme | null;
      if (stored === "dark" || stored === "light") setThemeState(stored);
    } catch {
      /* noop */
    }
  }, []);

  // Reflect state to <html> class. Dark is canonical; light adds .light.
  useEffect(() => {
    const el = document.documentElement;
    el.classList.remove("dark", "light");
    el.classList.add(theme);
    try {
      window.localStorage.setItem(KEY, theme);
    } catch {
      /* noop */
    }
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggle = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));

  return <ThemeCtx.Provider value={{ theme, toggle, setTheme }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
