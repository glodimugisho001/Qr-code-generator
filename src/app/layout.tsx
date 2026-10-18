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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://qr-pulse.vercel.app",
  ),
  title: {
    default: "QR Pulse — Générateur de QR Code Gratuit & Personnalisé HD",
    template: "%s | QR Pulse",
  },
  description:
    "Créez des QR Codes personnalisés, vectoriels et en haute définition gratuitement. Formats Wi-Fi, URL, vCard, Email, SMS avec export PNG HD et SVG. 100% privé, sans inscription.",
  keywords: [
    "générateur de qr code",
    "générateur qr code gratuit",
    "créer qr code en ligne",
    "qr code wifi",
    "qr code carte de visite vcard",
    "qr code haute définition png",
    "qr code vectoriel svg",
    "qr code personnalisé",
    "qr code sans inscription",
    "free qr code generator",
    "custom qr code creator",
  ],
  authors: [{ name: "QR Pulse Studio" }],
  creator: "QR Pulse Studio",
  publisher: "QR Pulse Studio",
  applicationName: "QR Pulse",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "QR Pulse — Générateur de QR Code Gratuit & Personnalisé HD",
    description:
      "Générez et téléchargez des QR codes professionnels (Wi-Fi, URLs, vCard, SMS, Email) en PNG HD ou SVG vectoriel. Gratuit et sans inscription.",
    url: "/",
    siteName: "QR Pulse",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "QR Pulse — Générateur de QR Code Gratuit & Personnalisé",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Pulse — Générateur de QR Code Gratuit & Personnalisé HD",
    description:
      "Créez vos QR Codes en haute définition (PNG, SVG, Wi-Fi, vCard). 100% gratuit et instantané.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://qr-pulse.vercel.app/#webapp",
      name: "QR Pulse",
      url: "https://qr-pulse.vercel.app",
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      description:
        "Générateur de QR code en ligne gratuit et sans inscription. Créez des QR codes pour URL, Wi-Fi, vCard, Email, SMS avec téléchargement en PNG et SVG.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      featureList: [
        "Génération de QR codes pour sites Web, Wi-Fi, Cartes de visite (vCard), SMS et Email",
        "Personnalisation intégrale des couleurs et marges",
        "Niveaux de correction d'erreurs (L, M, Q, H)",
        "Exportation vectorielle SVG et PNG haute définition jusqu'à 2048px",
        "Traitement 100% local pour une confidentialité totale",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://qr-pulse.vercel.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Comment créer un QR Code gratuitement sur QR Pulse ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Il vous suffit de sélectionner le type de contenu (lien URL, réseau Wi-Fi, carte vCard, email ou SMS), de saisir vos informations et de personnaliser les couleurs. Votre QR Code se génère en temps réel et peut être téléchargé en PNG ou SVG sans aucune inscription.",
          },
        },
        {
          "@type": "Question",
          name: "Comment fonctionne le QR Code Wi-Fi pour se connecter sans mot de passe ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "En choisissant l'onglet Wi-Fi, vous saisissez le nom de votre réseau (SSID) et le mot de passe. Lors du scan avec un smartphone Android ou iPhone, l'appareil propose automatiquement de rejoindre le réseau sans devoir saisir manuellement le mot de passe.",
          },
        },
        {
          "@type": "Question",
          name: "Quelle est la différence entre les formats d'export PNG et SVG ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Le format PNG est idéal pour un affichage sur le web, les réseaux sociaux ou des documents bureautiques standards. Le format SVG est un format vectoriel évolutif sans limite de résolution, parfait pour les impressions professionnelles grands formats (affiches, enseignes, packaging).",
          },
        },
        {
          "@type": "Question",
          name: "Mes données ou mots de passe Wi-Fi sont-ils enregistrés sur vos serveurs ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Non. La génération du QR code est effectuée à 100% dans votre navigateur web grâce au moteur JavaScript local. Aucune donnée saisie n'est transmise ni stockée sur nos serveurs.",
          },
        },
        {
          "@type": "Question",
          name: "Les QR codes créés ont-ils une durée de validité ou limite de scans ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Non, les QR codes créés sont statiques : les informations sont directement encodées dans les motifs du code. Ils ne dépendent d'aucun abonnement et restent valables à vie sans limite de scans.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Valid JSON-LD schema
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-slate-100 min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200`}
      >
        {children}
      </body>
    </html>
  );
}
