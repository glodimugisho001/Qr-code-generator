"use client";

import { PaletteIcon } from "./Icons";

export interface QRSettings {
  fgColor: string;
  bgColor: string;
  isTransparentBg: boolean;
  margin: number;
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
  downloadSize: number;
}

interface CustomizationPanelProps {
  settings: QRSettings;
  onChange: (newSettings: Partial<QRSettings>) => void;
  onReset: () => void;
}

const COLOR_PRESETS = [
  { name: "Obsidienne", hex: "#0f172a" },
  { name: "Indigo Tech", hex: "#6366f1" },
  { name: "Violet Cyber", hex: "#8b5cf6" },
  { name: "Émeraude", hex: "#10b981" },
  { name: "Rose Ruby", hex: "#f43f5e" },
  { name: "Ambre Vif", hex: "#f59e0b" },
  { name: "Bleu Océan", hex: "#0284c7" },
  { name: "Pure White", hex: "#ffffff" },
];

const BG_COLOR_PRESETS = [
  { name: "Blanc pur", hex: "#ffffff" },
  { name: "Gris doux", hex: "#f1f5f9" },
  { name: "Crème", hex: "#fefce8" },
  { name: "Sombre Nuit", hex: "#0b0f19" },
];

export function CustomizationPanel({
  settings,
  onChange,
  onReset,
}: CustomizationPanelProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <PaletteIcon className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm">
              Personnalisation du style
            </h3>
            <p className="text-xs text-slate-400">
              Couleurs, taille et tolérance
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-indigo-400 transition-colors px-2 py-1 rounded hover:bg-white/5"
        >
          Réinitialiser
        </button>
      </div>

      {/* Foreground Color */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-medium text-slate-300">
          <span>Couleur du QR Code</span>
          <span className="font-mono text-[11px] text-slate-400 uppercase">
            {settings.fgColor}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color.hex}
              type="button"
              onClick={() => onChange({ fgColor: color.hex })}
              title={color.name}
              className={`w-7 h-7 rounded-full transition-transform border ${
                settings.fgColor.toLowerCase() === color.hex.toLowerCase()
                  ? "scale-110 ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 border-white"
                  : "border-white/20 hover:scale-105"
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
          <label className="relative flex items-center cursor-pointer">
            <span className="sr-only">Couleur personnalisée</span>
            <input
              type="color"
              value={settings.fgColor}
              onChange={(e) => onChange({ fgColor: e.target.value })}
              className="w-7 h-7 rounded-full cursor-pointer opacity-0 absolute inset-0 z-10"
              title="Couleur personnalisée"
            />
            <div
              className="w-7 h-7 rounded-full border border-dashed border-slate-500 flex items-center justify-center text-[10px] text-slate-400 hover:border-slate-300 transition-colors pointer-events-none"
              style={{ backgroundColor: settings.fgColor }}
            >
              +
            </div>
          </label>
        </div>
      </div>

      {/* Background Color */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-300">
            Couleur d'arrière-plan
          </span>
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-slate-300">
            <input
              type="checkbox"
              checked={settings.isTransparentBg}
              onChange={(e) => onChange({ isTransparentBg: e.target.checked })}
              className="rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <span>Transparent</span>
          </label>
        </div>

        {!settings.isTransparentBg && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {BG_COLOR_PRESETS.map((color) => (
              <button
                key={color.hex}
                type="button"
                onClick={() => onChange({ bgColor: color.hex })}
                title={color.name}
                className={`w-7 h-7 rounded-full transition-transform border ${
                  settings.bgColor.toLowerCase() === color.hex.toLowerCase()
                    ? "scale-110 ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 border-white"
                    : "border-white/20 hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
            <label className="relative flex items-center cursor-pointer">
              <span className="sr-only">Arrière-plan personnalisé</span>
              <input
                type="color"
                value={settings.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="w-7 h-7 rounded-full cursor-pointer opacity-0 absolute inset-0 z-10"
                title="Arrière-plan personnalisé"
              />
              <div
                className="w-7 h-7 rounded-full border border-dashed border-slate-500 flex items-center justify-center text-[10px] text-slate-400 hover:border-slate-300 transition-colors pointer-events-none"
                style={{ backgroundColor: settings.bgColor }}
              >
                +
              </div>
            </label>
          </div>
        )}
      </div>

      {/* Sliders and Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Margin */}
        <label htmlFor="margin-slider" className="space-y-2 block">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Marge externe</span>
            <span className="text-indigo-400 font-mono font-medium">
              {settings.margin}
            </span>
          </div>
          <input
            id="margin-slider"
            type="range"
            min="1"
            max="6"
            step="1"
            value={settings.margin}
            onChange={(e) => onChange({ margin: Number(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </label>

        {/* Resolution */}
        <label htmlFor="resolution-select" className="space-y-2 block">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Résolution export</span>
            <span className="text-indigo-400 font-mono font-medium">
              {settings.downloadSize}px
            </span>
          </div>
          <select
            id="resolution-select"
            value={settings.downloadSize}
            onChange={(e) => onChange({ downloadSize: Number(e.target.value) })}
            className="w-full bg-slate-800/80 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
          >
            <option value={256}>256 x 256 (Web rapide)</option>
            <option value={512}>512 x 512 (Standard HD)</option>
            <option value={1024}>1024 x 1024 (Impression)</option>
            <option value={2048}>2048 x 2048 (Ultra HD 4K)</option>
          </select>
        </label>
      </div>

      {/* Error Correction Level */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between text-xs">
          <span className="text-slate-300">Tolérance aux erreurs</span>
          <span className="text-slate-400 text-[11px]">
            {settings.errorCorrectionLevel === "L" && "Faible (7%)"}
            {settings.errorCorrectionLevel === "M" && 
              "Moyenne (15% - Recommandé)"}
            {settings.errorCorrectionLevel === "Q" && "Élevée (25%)"}
            {settings.errorCorrectionLevel === "H" && "Maximale (30%)"}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {(["L", "M", "Q", "H"] as const).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => onChange({ errorCorrectionLevel: lvl })}
              className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                settings.errorCorrectionLevel === lvl
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-500/30"
                  : "bg-slate-800/60 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
