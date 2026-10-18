"use client";

import { RefreshIcon, TrashIcon } from "./Icons";

export interface HistoryItem {
  id: string;
  payload: string;
  label: string;
  timestamp: number;
}

interface HistorySectionProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  onRemoveItem: (id: string) => void;
}

export function HistorySection({
  items,
  onSelect,
  onClear,
  onRemoveItem,
}: HistorySectionProps) {
  if (items.length === 0) {
    return null;
  }

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
            <RefreshIcon className="w-4 h-4" />
          </span>
          <h3 className="font-semibold text-slate-200 text-sm">
            Historique récent ({items.length})
          </h3>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1"
        >
          <TrashIcon className="w-3.5 h-3.5" />
          <span>Vider</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-indigo-500/40 transition-all text-left"
          >
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="flex-1 min-w-0 pr-2 text-left cursor-pointer"
            >
              <p className="text-xs font-medium text-slate-200 truncate group-hover:text-indigo-300 transition-colors">
                {item.label}
              </p>
              <p className="text-[10px] text-slate-400 font-mono truncate">
                {item.payload}
              </p>
              <span className="text-[9px] text-slate-400 font-sans">
                {formatDate(item.timestamp)}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onRemoveItem(item.id)}
              className="text-slate-400 hover:text-red-400 opacity-60 hover:opacity-100 p-1 rounded transition-opacity"
              title="Supprimer"
            >
              <TrashIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
