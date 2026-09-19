import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Symbion v2.0 - Industrial Symbiosis Decision Support System",
  description:
    "Ex-ante decision evaluation engine for industrial symbiosis, circular resource matching, and industrial ecology networks. Prepared for I-SINERGIE Malaysia 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="min-h-screen bg-slate-canvas text-slate-dark antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
