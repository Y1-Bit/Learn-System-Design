import { useLanguage } from '../../i18n';

interface CanvasToolbarProps {
  connectMode: boolean;
  onToggleConnect: () => void;
  onClear: () => void;
  onSave: () => void;
  onLoad: (key: string) => void;
  savedDesigns: Record<string, { name: string; createdAt: string }>;
  loadMenuOpen: boolean;
  onToggleLoadMenu: () => void;
}

export default function CanvasToolbar({
  connectMode,
  onToggleConnect,
  onClear,
  onSave,
  onLoad,
  savedDesigns,
  loadMenuOpen,
  onToggleLoadMenu,
}: CanvasToolbarProps) {
  const { t } = useLanguage();
  const savedEntries = Object.entries(savedDesigns);

  return (
    <div className="flex items-center gap-2 border-b border-[#2a2a4a] bg-[#16162a] px-4 py-2">
      <button
        onClick={onToggleConnect}
        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors
          ${connectMode ? 'bg-purple-600 text-white' : 'bg-[#2a2a4a]/60 text-gray-300 hover:bg-[#2a2a4a]'}`}
      >
        {connectMode ? t.sandbox_connecting : t.sandbox_connect}
      </button>
      <div className="mx-2 h-4 w-px bg-[#2a2a4a]" />
      <button
        onClick={onClear}
        className="rounded-lg bg-[#2a2a4a]/60 px-3 py-1.5 text-xs text-gray-300 hover:bg-[#2a2a4a]"
      >
        {t.sandbox_clear}
      </button>
      <button
        onClick={onSave}
        className="rounded-lg bg-[#2a2a4a]/60 px-3 py-1.5 text-xs text-gray-300 hover:bg-[#2a2a4a]"
      >
        {t.sandbox_save}
      </button>
      <div className="relative">
        <button
          onClick={onToggleLoadMenu}
          className="rounded-lg bg-[#2a2a4a]/60 px-3 py-1.5 text-xs text-gray-300 hover:bg-[#2a2a4a]"
        >
          {t.sandbox_load}
        </button>
        {loadMenuOpen && (
          <div className="absolute left-0 top-full z-50 mt-1 min-w-48 rounded-lg border border-[#2a2a4a] bg-[#1a1a2e] p-1 shadow-xl">
            {savedEntries.length === 0 ? (
              <p className="px-3 py-2 text-xs text-gray-500">{t.sandbox_no_saved}</p>
            ) : (
              savedEntries.map(([key, d]) => (
                <button
                  key={key}
                  onClick={() => onLoad(key)}
                  className="flex w-full flex-col items-start rounded-md px-3 py-2 text-left hover:bg-[#2a2a4a]"
                >
                  <span className="text-xs text-gray-200">{d.name}</span>
                  <span className="text-[10px] text-gray-500">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
      {connectMode && (
        <span className="ml-auto text-[11px] text-purple-400">
          {t.sandbox_connect_hint}
        </span>
      )}
    </div>
  );
}
