"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import ThemeToaster from "../components/ui/ThemeToaster";

interface Props {
  children?: ReactNode;
}

const queryClient = new QueryClient();

const QueryWrapper = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" enableSystem={true}>
        <ThemeToaster />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default QueryWrapper;
