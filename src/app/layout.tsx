import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Pulse — Générateur de QR Code Moderne",
  description:
    "Générez, personnalisez et téléchargez des QR Codes professionnels en haute résolution (PNG, SVG, Wi-Fi, vCard, Liens).",
  keywords: [
    "QR code generator",
    "générateur qr code",
    "qr wifi",
    "qr png svg",
    "free qr code",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-slate-100 min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200`}
      >
        {children}
      </body>
    </html>
  );
}
