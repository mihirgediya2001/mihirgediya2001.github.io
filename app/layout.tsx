import type { Metadata } from "next";
import "./globals.css";
import { getVariant } from "@/lib/variant";
import CursorBlob from "@/components/CursorBlob";
import { RippleFilterDefs } from "@/components/Ripple";

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
      <body className="min-h-screen">
        <div className="ambient" aria-hidden />
        <CursorBlob />
        <RippleFilterDefs />
        {children}
      </body>
    </html>
  );
}
