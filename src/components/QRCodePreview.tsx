"use client";

import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import type { QRSettings } from "./CustomizationPanel";
import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  QrScanIcon,
  SparklesIcon,
} from "./Icons";

interface QRCodePreviewProps {
  payload: string;
  label: string;
  settings: QRSettings;
  onSaveToHistory: (payload: string, label: string) => void;
}

export function QRCodePreview({
  payload,
  label,
  settings,
  onSaveToHistory,
}: QRCodePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [svgString, setSvgString] = useState<string>("");

  // Re-generate QR Code whenever payload or settings change
  useEffect(() => {
    let isCancelled = false;

    async function generate() {
      if (!payload.trim()) {
        setError("Veuillez saisir du contenu pour générer le code QR.");
        return;
      }

      setError(null);
      setIsGenerating(true);

      const effectiveBg = settings.isTransparentBg
        ? "#00000000"
        : settings.bgColor;

      try {
        // 1. Render on visible canvas for live preview
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, payload, {
            errorCorrectionLevel: settings.errorCorrectionLevel,
            margin: settings.margin,
            width: 320,
            color: {
              dark: settings.fgColor,
              light: effectiveBg,
            },
          });
        }

        // 2. Generate SVG representation for vector download
        const svg = await QRCode.toString(payload, {
          type: "svg",
          errorCorrectionLevel: settings.errorCorrectionLevel,
          margin: settings.margin,
          color: {
            dark: settings.fgColor,
            light: effectiveBg,
          },
        });

        if (!isCancelled) {
          setSvgString(svg);
          setIsGenerating(false);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("QR Generation error:", err);
          setError(
            (err as Error).message ||
              "Erreur lors de la génération. Le texte est peut-être trop long.",
          );
          setIsGenerating(false);
        }
      }
    }

    const timeout = setTimeout(() => {
      generate();
    }, 150);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [payload, settings]);

  // Download high-resolution PNG
  const handleDownloadPNG = async () => {
    if (!payload.trim()) return;

    try {
      const effectiveBg = settings.isTransparentBg
        ? "#00000000"
        : settings.bgColor;

      const dataUrl = await QRCode.toDataURL(payload, {
        errorCorrectionLevel: settings.errorCorrectionLevel,
        margin: settings.margin,
        width: settings.downloadSize,
        color: {
          dark: settings.fgColor,
          light: effectiveBg,
        },
      });

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `qrcode-${Date.now()}-${settings.downloadSize}px.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      onSaveToHistory(payload, label);
    } catch (err) {
      console.error("Download PNG error:", err);
    }
  };

  // Download vector SVG
  const handleDownloadSVG = () => {
    if (!svgString) return;

    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qrcode-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    onSaveToHistory(payload, label);
  };

  // Copy image to clipboard
  const handleCopyImage = async () => {
    if (!canvasRef.current) return;

    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setCopiedImage(true);
          setTimeout(() => setCopiedImage(false), 2200);
        } catch (clipErr) {
          console.warn(
            "ClipboardItem write failed, fallbacking to URL copy",
            clipErr,
          );
        }
      });
    } catch (e) {
      console.error("Copy error:", e);
    }
  };

  // Copy raw payload text
  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2200);
    } catch (e) {
      console.error("Copy text error:", e);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col items-center">
      {/* Background glow matching QR color */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-25"
        style={{ backgroundColor: settings.fgColor }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20"
        style={{ backgroundColor: settings.fgColor }}
      />

      {/* Header bar */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 z-10">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <QrScanIcon className="w-4 h-4" />
          </span>
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Aperçu Direct
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          <SparklesIcon className="w-3 h-3" />
          {settings.downloadSize}x{settings.downloadSize} HD
        </span>
      </div>

      {/* QR Code Canvas Frame */}
      <div className="relative my-6 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner flex flex-col items-center justify-center z-10 group">
        {error ? (
          <div className="w-64 h-64 flex flex-col items-center justify-center text-center p-4 text-red-400 text-xs">
            <p className="font-semibold mb-1">Impossible de générer :</p>
            <p className="text-slate-400">{error}</p>
          </div>
        ) : (
          <div
            className={`p-3 rounded-xl transition-all duration-300 ${
              settings.isTransparentBg
                ? "bg-[radial-gradient(#334155_1px,transparent_1px)] bg-size-[12px_12px]"
                : ""
            }`}
            style={{
              backgroundColor: settings.isTransparentBg
                ? "transparent"
                : settings.bgColor,
            }}
          >
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto rounded-lg shadow-sm block"
              style={{ width: "260px", height: "260px" }}
            />
          </div>
        )}

        {isGenerating && (
          <div className="absolute inset-0 bg-slate-950/60 rounded-2xl backdrop-blur-xs flex items-center justify-center text-xs text-indigo-300">
            Génération en cours...
          </div>
        )}
      </div>

      {/* Content Label / Subtitle */}
      <div className="w-full text-center mb-5 z-10 px-2">
        <p className="text-xs font-medium text-slate-300 truncate max-w-xs mx-auto">
          {label || "Code QR personnalisé"}
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center justify-center gap-1">
          <span>📱</span> Pointez votre caméra pour scanner
        </p>
      </div>

      {/* Action Buttons Grid */}
      <div className="w-full space-y-2.5 z-10">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleDownloadPNG}
            disabled={!!error || !payload.trim()}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-xs bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Télécharger PNG</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadSVG}
            disabled={!!error || !payload.trim() || !svgString}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-xs bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-slate-200 border border-white/10 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <SparklesIcon className="w-4 h-4 text-purple-400" />
            <span>Format SVG</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleCopyImage}
            disabled={!!error || !payload.trim()}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs bg-white/5 hover:bg-white/10 active:scale-[0.98] text-slate-300 border border-white/5 transition-all disabled:opacity-40 cursor-pointer"
          >
            {copiedImage ? (
              <>
                <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">
                  Image copiée !
                </span>
              </>
            ) : (
              <>
                <CopyIcon className="w-3.5 h-3.5" />
                <span>Copier l'image</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyText}
            disabled={!payload.trim()}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs bg-white/5 hover:bg-white/10 active:scale-[0.98] text-slate-300 border border-white/5 transition-all disabled:opacity-40 cursor-pointer"
          >
            {copiedText ? (
              <>
                <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">
                  Texte copié !
                </span>
              </>
            ) : (
              <>
                <CopyIcon className="w-3.5 h-3.5" />
                <span>Copier le texte</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
