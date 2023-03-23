"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";

const ThemeToaster = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      <Toaster
        toastOptions={{
          className:
            "bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-lg antialiased rounded-lg text-black dark:text-slate-50",
        }}
      />{" "}
    </div>
  );
};

export default ThemeToaster;
