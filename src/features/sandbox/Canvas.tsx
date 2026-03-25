import { useCallback, type RefObject } from 'react';
import { DndContext, useDroppable } from '@dnd-kit/core';
import SandboxComponent from './SandboxComponent';
import ConnectionLines from './ConnectionLines';
import ComponentPalette from './ComponentPalette';
import CanvasToolbar from './CanvasToolbar';
import { useCanvasState } from './useCanvasState';
import { useLanguage } from '../../i18n';
import type { SandboxState } from '../../types';

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
  const { t } = useLanguage();
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
            {t.sandbox_drag_hint}
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
  const {
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
  } = useCanvasState();

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex h-full flex-col">
        <CanvasToolbar
          connectMode={connectMode}
          onToggleConnect={toggleConnectMode}
          onClear={handleClear}
          onSave={handleSave}
          onLoad={handleLoad}
          savedDesigns={savedDesigns}
          loadMenuOpen={loadMenuOpen}
          onToggleLoadMenu={() => setLoadMenuOpen((v) => !v)}
        />

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
