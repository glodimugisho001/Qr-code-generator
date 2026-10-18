"use client";

import { useEffect, useState } from "react";
import {
  CustomizationPanel,
  type QRSettings,
} from "@/components/CustomizationPanel";
import { type HistoryItem, HistorySection } from "@/components/HistorySection";
import { QrScanIcon, SparklesIcon } from "@/components/Icons";
import { InputTabs, type QRContentType } from "@/components/InputTabs";
import { QRCodePreview } from "@/components/QRCodePreview";

const DEFAULT_SETTINGS: QRSettings = {
  fgColor: "#0f172a",
  bgColor: "#ffffff",
  isTransparentBg: false,
  margin: 3,
  errorCorrectionLevel: "M",
  downloadSize: 512,
};

export default function Home() {
  const [contentType, setContentType] = useState<QRContentType>("url");
  const [payload, setPayload] = useState("https://antigravity.google.com");
  const [label, setLabel] = useState("URL: https://antigravity.google.com");
  const [settings, setSettings] = useState<QRSettings>(DEFAULT_SETTINGS);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage once on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("qr_pulse_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not load history from localStorage", e);
    }
  }, []);

  // Update history in localStorage
  const saveHistoryToStorage = (items: HistoryItem[]) => {
    setHistory(items);
    try {
      localStorage.setItem("qr_pulse_history", JSON.stringify(items));
    } catch (e) {
      console.warn("Could not save history to localStorage", e);
    }
  };

  const handleSaveToHistory = (newPayload: string, newLabel: string) => {
    if (!newPayload) return;
    const item: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      payload: newPayload,
      label: newLabel || newPayload.substring(0, 30),
      timestamp: Date.now(),
    };
    // Keep max 15 items, unshift to top
    const updated = [
      item,
      ...history.filter((h) => h.payload !== newPayload),
    ].slice(0, 15);
    saveHistoryToStorage(updated);
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setPayload(item.payload);
    setLabel(item.label);
    // Identify tab if possible
    if (
      item.payload.startsWith("http://") ||
      item.payload.startsWith("https://")
    ) {
      setContentType("url");
    } else if (item.payload.startsWith("WIFI:")) {
      setContentType("wifi");
    } else if (item.payload.startsWith("mailto:")) {
      setContentType("email");
    } else if (item.payload.startsWith("BEGIN:VCARD")) {
      setContentType("vcard");
    } else if (item.payload.startsWith("smsto:")) {
      setContentType("sms");
    } else {
      setContentType("text");
    }
  };

  const handleClearHistory = () => {
    saveHistoryToStorage([]);
  };

  const handleRemoveHistoryItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    saveHistoryToStorage(updated);
  };

  const handleSettingsChange = (newSettings: Partial<QRSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-100">
      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <QrScanIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-base sm:text-lg bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  QR Studio
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Pro & Gratuit
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Générateur de QR Code HD instantané
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Génération 100% locale</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 w-full space-y-10">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>
              Créez vos codes pour le web, Wi-Fi, cartes de visite et plus
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Générez des QR Codes élégants en quelques secondes
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Simple, rapide et sans inscription. Personnalisez vos couleurs,
            prévisualisez en direct et téléchargez en PNG haute définition ou
            format vectoriel SVG.
          </p>
        </div>

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Data entry & Customization (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Content Tabs */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>Choisissez le type de contenu</span>
              </div>
              <InputTabs
                contentType={contentType}
                onContentTypeChange={setContentType}
                onPayloadChange={(newPayload, newLabel) => {
                  setPayload(newPayload);
                  setLabel(newLabel);
                }}
              />
            </div>

            {/* Step 2: Customization Panel */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>Personnalisez l'apparence</span>
              </div>
              <CustomizationPanel
                settings={settings}
                onChange={handleSettingsChange}
                onReset={handleResetSettings}
              />
            </div>
          </div>

          {/* Right Column: Sticky Live Preview & Download (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Aperçu & Téléchargement</span>
            </div>
            <QRCodePreview
              payload={payload}
              label={label}
              settings={settings}
              onSaveToHistory={handleSaveToHistory}
            />
          </div>
        </div>

        {/* Bottom Section: History */}
        <div className="pt-4">
          <HistorySection
            items={history}
            onSelect={handleSelectHistoryItem}
            onClear={handleClearHistory}
            onRemoveItem={handleRemoveHistoryItem}
          />
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/5">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 space-y-1.5">
            <h4 className="text-xs font-semibold text-slate-200">
              ⚡ Aperçu instantané
            </h4>
            <p className="text-xs text-slate-400">
              Chaque frappe au clavier met à jour le QR code en direct sans
              recharger la page.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 space-y-1.5">
            <h4 className="text-xs font-semibold text-slate-200">
              📐 Haute Définition & Vectoriel
            </h4>
            <p className="text-xs text-slate-400">
              Exportez jusqu'à 2048px en PNG ou SVG sans aucune perte de qualité
              pour vos impressions.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 space-y-1.5">
            <h4 className="text-xs font-semibold text-slate-200">
              🔒 Confidentialité Totale
            </h4>
            <p className="text-xs text-slate-400">
              Aucune de vos données ou mots de passe n'est envoyée sur un
              serveur. Tout est calculé dans votre navigateur.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/80 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} QR Studio — Créé avec Next.js &
            Tailwind CSS.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">Rapide • Moderne • Gratuit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
