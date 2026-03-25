import { useState, useCallback, useRef } from 'react';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useLanguage } from '../../i18n';
import type {
  SandboxState,
  SandboxComponentInstance,
  SandboxConnection,
} from '../../types';

export interface SavedDesign {
  name: string;
  createdAt: string;
  state: SandboxState;
}

export type SavedDesigns = Record<string, SavedDesign>;

const EMPTY_STATE: SandboxState = { components: [], connections: [] };

let idCounter = 0;
function uid() {
  return `comp-${Date.now()}-${++idCounter}`;
}

export function useCanvasState() {
  const { t } = useLanguage();
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
          const label = window.prompt(t.sandbox_connection_label, '') ?? '';
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
    [connectMode, t],
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
      const el = canvasRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

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

  const handleClear = useCallback(() => {
    setState(EMPTY_STATE);
    setSelectedId(null);
    connectSourceRef.current = null;
  }, []);

  const handleSave = useCallback(() => {
    const name = window.prompt(t.sandbox_design_name);
    if (!name) return;
    const key = name.toLowerCase().replace(/\s+/g, '-');
    setSavedDesigns((prev) => ({
      ...prev,
      [key]: { name, createdAt: new Date().toISOString(), state },
    }));
  }, [t, state, setSavedDesigns]);

  const handleLoad = useCallback(
    (key: string) => {
      const design = savedDesigns[key];
      if (design) {
        setState(design.state);
        setSelectedId(null);
        setLoadMenuOpen(false);
      }
    },
    [savedDesigns],
  );

  const toggleConnectMode = useCallback(() => {
    setConnectMode((v) => !v);
    connectSourceRef.current = null;
  }, []);

  return {
    state,
    selectedId,
    connectMode,
    canvasRef,
    sensors,
    savedDesigns,
    loadMenuOpen,
    setLoadMenuOpen,
    handleSelect,
    handleDelete,
    handleCanvasClick,
    handleDragEnd,
    handleClear,
    handleSave,
    handleLoad,
    toggleConnectMode,
  };
}
