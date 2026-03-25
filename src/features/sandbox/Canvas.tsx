import { useState, useCallback, useRef, type RefObject } from 'react';
import { DndContext, useDroppable, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import SandboxComponent from './SandboxComponent';
import ConnectionLines from './ConnectionLines';
import ComponentPalette from './ComponentPalette';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type {
  SandboxState,
  SandboxComponentInstance,
  SandboxConnection,
} from '../../types';

interface SavedDesign {
  name: string;
  createdAt: string;
  state: SandboxState;
}

type SavedDesigns = Record<string, SavedDesign>;

const EMPTY_STATE: SandboxState = { components: [], connections: [] };

let idCounter = 0;
function uid() {
  return `comp-${Date.now()}-${++idCounter}`;
}

function CanvasDropZone({
  state,
  selectedId,
  connectMode,
  onSelect,
  onDelete,
  onCanvasClick,
  canvasRef,
}: {
  state: SandboxState;
  selectedId: string | null;
  connectMode: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onCanvasClick: () => void;
  canvasRef: RefObject<HTMLDivElement | null>;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-drop-zone' });

  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      setNodeRef(node);
      (canvasRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [setNodeRef, canvasRef],
  );

  return (
    <div
      ref={mergedRef}
      className={`relative flex-1 overflow-auto ${isOver ? 'ring-2 ring-purple-500/40 ring-inset' : ''}`}
      style={{
        minHeight: 600,
        backgroundColor: '#0a0a15',
        backgroundImage: 'radial-gradient(circle, #2a2a4a 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
      onClick={onCanvasClick}
    >
      <ConnectionLines
        components={state.components}
        connections={state.connections}
      />
      {state.components.length === 0 && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="text-gray-600 text-sm">
            Drag components from the palette to start designing
          </p>
        </div>
      )}
      {state.components.map((inst) => (
        <SandboxComponent
          key={inst.id}
          instance={inst}
          selected={selectedId === inst.id}
          connectMode={connectMode}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default function Canvas() {
  const [state, setState] = useState<SandboxState>(EMPTY_STATE);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [connectMode, setConnectMode] = useState(false);
  const connectSourceRef = useRef<string | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [savedDesigns, setSavedDesigns] = useLocalStorage<SavedDesigns>(
    'systemprep-designs',
    {},
  );
  const [loadMenuOpen, setLoadMenuOpen] = useState(false);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  });
  const sensors = useSensors(sensor);

  // --- handlers ---

  const handleSelect = useCallback(
    (id: string) => {
      if (connectMode) {
        if (!connectSourceRef.current) {
          connectSourceRef.current = id;
        } else if (connectSourceRef.current !== id) {
          const from = connectSourceRef.current;
          const to = id;
          const label = window.prompt('Connection label (e.g. HTTP, TCP, gRPC):', '') ?? '';
          const conn: SandboxConnection = {
            id: `conn-${Date.now()}`,
            from,
            to,
            label: label || undefined,
          };
          setState((prev) => ({
            ...prev,
            connections: [...prev.connections, conn],
          }));
          connectSourceRef.current = null;
        }
        return;
      }
      setSelectedId(id);
    },
    [connectMode],
  );

  const handleDelete = useCallback((id: string) => {
    setState((prev) => ({
      components: prev.components.filter((c) => c.id !== id),
      connections: prev.connections.filter(
        (c) => c.from !== id && c.to !== id,
      ),
    }));
    setSelectedId(null);
  }, []);

  const handleCanvasClick = useCallback(() => {
    if (connectMode) {
      connectSourceRef.current = null;
    }
    setSelectedId(null);
  }, [connectMode]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over, delta } = event;
    if (!over || over.id !== 'canvas-drop-zone') return;

    const data = active.data.current as Record<string, unknown> | undefined;
    if (!data) return;

    if (data.source === 'palette') {
      // Drop new component from palette
      const el = canvasRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      // active.rect.current.translated gives the final position of the dragged element
      const translated = active.rect.current.translated;
      if (!translated) return;

      const x = translated.left - rect.left + el.scrollLeft;
      const y = translated.top - rect.top + el.scrollTop;

      const inst: SandboxComponentInstance = {
        id: uid(),
        type: data.componentType as string,
        position: { x: Math.max(0, x), y: Math.max(0, y) },
      };
      setState((prev) => ({
        ...prev,
        components: [...prev.components, inst],
      }));
    } else if (data.source === 'canvas') {
      // Reposition existing component
      const instanceId = data.instanceId as string;
      setState((prev) => ({
        ...prev,
        components: prev.components.map((c) =>
          c.id === instanceId
            ? {
                ...c,
                position: {
                  x: Math.max(0, c.position.x + delta.x),
                  y: Math.max(0, c.position.y + delta.y),
                },
              }
            : c,
        ),
      }));
    }
  }, []);

  // --- toolbar ---

  const handleClear = () => {
    setState(EMPTY_STATE);
    setSelectedId(null);
    connectSourceRef.current = null;
  };

  const handleSave = () => {
    const name = window.prompt('Design name:');
    if (!name) return;
    const key = name.toLowerCase().replace(/\s+/g, '-');
    setSavedDesigns((prev) => ({
      ...prev,
      [key]: { name, createdAt: new Date().toISOString(), state },
    }));
  };

  const handleLoad = (key: string) => {
    const design = savedDesigns[key];
    if (design) {
      setState(design.state);
      setSelectedId(null);
      setLoadMenuOpen(false);
    }
  };

  const savedEntries = Object.entries(savedDesigns);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex h-full flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#111128] px-4 py-2">
          <button
            onClick={() => {
              setConnectMode((v) => !v);
              connectSourceRef.current = null;
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors
              ${connectMode ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/15'}`}
          >
            {connectMode ? 'Connecting...' : 'Connect'}
          </button>
          <div className="mx-2 h-4 w-px bg-white/10" />
          <button
            onClick={handleClear}
            className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/15"
          >
            Clear Canvas
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/15"
          >
            Save Design
          </button>
          <div className="relative">
            <button
              onClick={() => setLoadMenuOpen((v) => !v)}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/15"
            >
              Load Design
            </button>
            {loadMenuOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 min-w-48 rounded-lg border border-white/10 bg-[#1a1a2e] p-1 shadow-xl">
                {savedEntries.length === 0 ? (
                  <p className="px-3 py-2 text-xs text-gray-500">No saved designs</p>
                ) : (
                  savedEntries.map(([key, d]) => (
                    <button
                      key={key}
                      onClick={() => handleLoad(key)}
                      className="flex w-full flex-col items-start rounded-md px-3 py-2 text-left hover:bg-white/10"
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
              Click source, then target to connect
            </span>
          )}
        </div>

        {/* Main area: palette + canvas */}
        <div className="flex flex-1 overflow-hidden">
          <ComponentPalette />
          <div className="flex-1 overflow-auto">
            <CanvasDropZone
              state={state}
              selectedId={selectedId}
              connectMode={connectMode}
              onSelect={handleSelect}
              onDelete={handleDelete}
              onCanvasClick={handleCanvasClick}
              canvasRef={canvasRef}
            />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
