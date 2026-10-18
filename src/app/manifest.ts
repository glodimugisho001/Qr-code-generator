import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "QR Code Generator — Générateur de QR Code Gratuit & HD",
    short_name: "QR Code Generator",
    description:
      "Générez, personnalisez et téléchargez des QR Codes professionnels en haute résolution (PNG, SVG, Wi-Fi, vCard, Liens).",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
