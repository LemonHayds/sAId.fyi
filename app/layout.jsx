import "./globals.css";
import Navbar from "./auth/Navbar";
import QueryWrapper from "./auth/QueryWrapper";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        className={`bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-900 antialiased`}
      >
        <QueryWrapper>
          <main className="flex flex-col min-h-screen font-inter">
            <Navbar />
            {children}
          </main>
        </QueryWrapper>
      </body>
    </html>
  );
}
