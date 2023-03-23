"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex justify-center items-center ">
      {currentTheme === "dark" ? (
        <button
          onClick={() => setTheme("light")}
          className="rounded-md hover:bg-slate-200/50 hover:dark:bg-slate-700/50 p-2"
        >
          <div className="text-black dark:text-slate-50">
            <LightModeIcon />
          </div>
        </button>
      ) : (
        <button
          onClick={() => setTheme("dark")}
          className="rounded-md hover:bg-slate-200/50 hover:dark:bg-slate-700/50 p-2"
        >
          <div className="text-black dark:text-slate-50">
            <DarkModeIcon />
          </div>
        </button>
      )}
    </div>
  );
}
