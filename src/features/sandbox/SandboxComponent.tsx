import { useDraggable } from '@dnd-kit/core';
import { sandboxComponentDefs } from '../../data/sandbox-components';
import type { SandboxComponentInstance } from '../../types';

interface Props {
  instance: SandboxComponentInstance;
  selected: boolean;
  connectMode: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function SandboxComponent({
  instance,
  selected,
  connectMode,
  onSelect,
  onDelete,
}: Props) {
  const def = sandboxComponentDefs.find((d) => d.type === instance.type);
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: instance.id,
    data: { source: 'canvas', instanceId: instance.id },
    disabled: connectMode,
  });

  if (!def) return null;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`absolute flex flex-col items-center gap-1 rounded-xl px-4 py-3 select-none transition-shadow
        ${connectMode ? 'cursor-crosshair' : 'cursor-grab'}
        ${isDragging ? 'opacity-60 z-50' : 'z-10'}
        ${selected ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-500/20' : 'ring-1 ring-white/10'}`}
      style={{
        left: instance.position.x,
        top: instance.position.y,
        backgroundColor: '#1e1e3a',
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(instance.id);
      }}
      onKeyDown={(e) => {
        if (selected && (e.key === 'Delete' || e.key === 'Backspace')) {
          onDelete(instance.id);
        }
      }}
      tabIndex={0}
    >
      {selected && !connectMode && (
        <button
          className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white hover:bg-red-500"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(instance.id);
          }}
        >
          x
        </button>
      )}
      <span className="text-2xl">{def.icon}</span>
      <span className="text-xs text-gray-300 whitespace-nowrap">{def.label}</span>
    </div>
  );
}
