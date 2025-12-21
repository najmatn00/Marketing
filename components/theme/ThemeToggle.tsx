"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = resolvedTheme ?? theme;
  const isDark = current === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-xl border border-light-grey bg-white/70 px-3 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-white transition-colors"
      aria-label="تغییر حالت روشن/تاریک"
      title={isDark ? "حالت روشن" : "حالت تاریک"}
    >
      <span className="h-2 w-2 rounded-full bg-primary" />
      {isDark ? "روشن" : "تاریک"}
    </button>
  );
}


