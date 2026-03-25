import { useDraggable } from '@dnd-kit/core';
import { sandboxComponentDefs } from '../../data/sandbox-components';
import type { SandboxComponentDef } from '../../types';

const CATEGORY_ORDER = ['compute', 'storage', 'network', 'messaging'] as const;

const CATEGORY_LABELS: Record<string, string> = {
  compute: 'Compute',
  storage: 'Storage',
  network: 'Network',
  messaging: 'Messaging',
};

function PaletteItem({ def }: { def: SandboxComponentDef }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${def.type}`,
    data: { source: 'palette', componentType: def.type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 cursor-grab select-none transition-colors
        ${isDragging ? 'opacity-50 bg-purple-900/40' : 'hover:bg-[#2a2a4a] bg-[#1a1a2e]'}`}
    >
      <span className="text-lg">{def.icon}</span>
      <span className="text-sm text-gray-300">{def.label}</span>
    </div>
  );
}

export default function ComponentPalette() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    items: sandboxComponentDefs.filter((d) => d.category === cat),
  }));

  return (
    <aside
      className="w-52 shrink-0 overflow-y-auto border-r border-[#2a2a4a] p-3 flex flex-col gap-4"
      style={{ backgroundColor: '#1a1a2e' }}
    >
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        Components
      </h2>
      {grouped.map((g) => (
        <div key={g.category}>
          <h3 className="mb-1 text-[11px] font-medium uppercase tracking-wider text-gray-500">
            {g.label}
          </h3>
          <div className="flex flex-col gap-1">
            {g.items.map((def) => (
              <PaletteItem key={def.type} def={def} />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
