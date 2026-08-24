// canvas/__tests__/useCanvasKeyboard.strictmode.test.tsx
//
// The Delete and Shift+Arrow handlers used to call back into the pipeline
// definition (`removeDefEdge`, `setPositions`) from *inside* a `setEdges` /
// `setNodes` updater. React double-invokes updaters under StrictMode, so one
// keypress produced two definition mutations — each of which pushes its own
// undo frame, so a single Ctrl+Z after deleting an edge appeared to do nothing.
//
// The suite does not mount in StrictMode globally, so this file opts in.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StrictMode, useRef, useState } from 'react';
import { render, act } from '@testing-library/react';
import type { Edge, Node } from '@xyflow/react';
import { useCanvasKeyboard } from '../useCanvasKeyboard';
import type { PipelineDefinition } from '../../../../types/pipeline';

const removeDefEdge = vi.fn();
const setPositions = vi.fn();
const removeNode = vi.fn();
const duplicateNodes = vi.fn(() => [] as string[]);

const definition = {
  id: 'pipe-1',
  nodes: [{ id: 'n1', type: 'trigger', position: { x: 0, y: 0 }, data: {} }],
  edges: [{ id: 'e1', source: 'n1', target: 'n1' }],
} as unknown as PipelineDefinition;

function Harness({ selectedNodeId }: { selectedNodeId: string | null }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const clipboardRef = useRef<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'n1', position: { x: 0, y: 0 }, data: {} },
  ]);
  const [edges, setEdges] = useState<Edge[]>([
    { id: 'e1', source: 'n1', target: 'n1', selected: true },
  ]);

  useCanvasKeyboard({
    definition,
    selectedNodeId,
    setSelectedNodeId: vi.fn(),
    removeNode,
    removeDefEdge,
    nodes,
    edges,
    setNodes,
    setEdges,
    setPositions,
    duplicateNodes,
    clipboardRef,
    containerRef,
  });

  return (
    <div ref={containerRef} data-testid="canvas">
      <button type="button" data-testid="focusable">
        canvas
      </button>
    </div>
  );
}

function mount(selectedNodeId: string | null) {
  const utils = render(
    <StrictMode>
      <Harness selectedNodeId={selectedNodeId} />
    </StrictMode>,
  );
  const focusable = utils.getByTestId('focusable');
  focusable.focus();
  return { ...utils, focusable, container: utils.getByTestId('canvas') };
}

function press(target: HTMLElement, key: string, init: KeyboardEventInit = {}) {
  act(() => {
    target.dispatchEvent(
      new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init }),
    );
  });
}

beforeEach(() => {
  removeDefEdge.mockClear();
  setPositions.mockClear();
});

describe('useCanvasKeyboard under StrictMode', () => {
  it('Delete removes the selected edge from the definition exactly once', () => {
    const { focusable } = mount(null);
    press(focusable, 'Delete');

    // Pre-fix: 2 — `removeDefEdge` ran inside the setEdges updater, so the
    // edge deletion landed on the undo stack twice.
    expect(removeDefEdge).toHaveBeenCalledTimes(1);
    expect(removeDefEdge).toHaveBeenCalledWith('e1');
  });

  it('Shift+Arrow persists the nudged position exactly once', () => {
    const { focusable } = mount('n1');
    press(focusable, 'ArrowRight', { shiftKey: true });

    // Pre-fix: 2 — `setPositions` (a definition write + localStorage write)
    // ran inside the setNodes updater.
    expect(setPositions).toHaveBeenCalledTimes(1);
    expect(setPositions).toHaveBeenCalledWith([
      { id: 'n1', position: { x: 8, y: 0 } },
    ]);
  });
});
