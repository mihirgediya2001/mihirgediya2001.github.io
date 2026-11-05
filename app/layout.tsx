import type { Metadata } from "next";
import "./globals.css";
import { getVariant } from "@/lib/variant";

export function generateMetadata(): Metadata {
  const v = getVariant();
  return {
    title: `${v.name} — ${v.roles[0]}`,
    description: v.summary,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain min-h-screen">
        <div className="ambient" aria-hidden />
        {children}
      </body>
    </html>
  );
}
