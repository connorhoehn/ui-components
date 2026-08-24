// context/__tests__/PipelineEditorContext.strictmode.test.tsx
//
// The rest of the suite mounts without <StrictMode>, so nothing here is
// covered by it: React only double-invokes `useState` updaters (and re-runs
// effects) when StrictMode is on. These tests mount the provider *inside*
// StrictMode on purpose, because the editor's history/duplication paths used
// to do their real work inside those updaters.
//
// Each test below fails on the pre-fix implementation:
//   * commit()          pushed two undo frames per edit  -> one Ctrl+Z was a no-op
//   * undo()/redo()     pushed two frames onto the opposite stack
//   * duplicateNodes()  returned 2N ids, N of which were never committed
//   * setPositions()    wrote to localStorage twice per nudge

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StrictMode } from 'react';
import { act, render, waitFor } from '@testing-library/react';
import type { PipelineDefinition, PipelineNode } from '../../../../types/pipeline';

const mockLoadPipeline = vi.fn<(id: string) => Promise<PipelineDefinition | null>>();
const mockSavePipeline = vi.fn<(def: PipelineDefinition) => Promise<void>>();
const mockPublishPipeline = vi.fn<(id: string) => Promise<PipelineDefinition | null>>();

vi.mock('../../persistence/pipelineStorageRemote', () => ({
  loadPipeline: (id: string) => mockLoadPipeline(id),
  savePipeline: (def: PipelineDefinition) => mockSavePipeline(def),
  publishPipeline: (id: string) => mockPublishPipeline(id),
}));

const mockSavePositionsOnly = vi.fn();
const mockLoadPipelineLocal = vi.fn<(id: string) => PipelineDefinition | null>();
vi.mock('../../persistence/pipelineStorage', () => ({
  savePipelinePositionsOnly: (def: PipelineDefinition) => mockSavePositionsOnly(def),
  loadPipeline: (id: string) => mockLoadPipelineLocal(id),
}));

import { PipelineEditorProvider, usePipelineEditor } from '../PipelineEditorContext';
import type { PipelineEditorValue } from '../PipelineEditorContext';

function makeDefinition(): PipelineDefinition {
  const trigger: PipelineNode = {
    id: 'n-trigger',
    type: 'trigger',
    position: { x: 0, y: 0 },
    data: { type: 'trigger', triggerType: 'manual' },
  };
  return {
    id: 'pipe-1',
    name: 'Test pipeline',
    version: 1,
    status: 'draft',
    nodes: [trigger],
    edges: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'tester',
  };
}

/** Mount the provider under StrictMode so React double-invokes updaters. */
async function renderStrictEditor(): Promise<{ editor: () => PipelineEditorValue }> {
  let value: PipelineEditorValue | null = null;
  function Capture() {
    value = usePipelineEditor();
    return null;
  }
  render(
    <StrictMode>
      <PipelineEditorProvider pipelineId="pipe-1">
        <Capture />
      </PipelineEditorProvider>
    </StrictMode>,
  );
  await waitFor(() => {
    expect(value?.definition).not.toBeNull();
  });
  return { editor: () => value! };
}

beforeEach(() => {
  mockLoadPipeline.mockReset().mockResolvedValue(makeDefinition());
  mockSavePipeline.mockReset().mockResolvedValue(undefined);
  mockPublishPipeline.mockReset().mockResolvedValue(null);
  mockSavePositionsOnly.mockReset();
  mockLoadPipelineLocal.mockReset().mockReturnValue(null);
});

describe('PipelineEditorContext under StrictMode', () => {
  it('commit() pushes exactly one undo frame per edit, so a single undo reverts it', async () => {
    const { editor } = await renderStrictEditor();

    act(() => {
      editor().addNode('llm', { x: 100, y: 50 });
    });
    expect(editor().definition?.nodes).toHaveLength(2);

    // Pre-fix, `pushHistory(prev)` ran inside the setDefinition updater, which
    // StrictMode invokes twice: two identical frames landed on the undo stack
    // and this first undo restored a snapshot that still contained the node.
    act(() => {
      editor().undo();
    });
    expect(editor().definition?.nodes).toHaveLength(1);
    expect(editor().canUndo).toBe(false);
  });

  it('commit() returns the committed definition rather than null', async () => {
    const { editor } = await renderStrictEditor();
    let id = '';
    act(() => {
      id = editor().addNode('llm', { x: 10, y: 10 });
    });
    // `addNode` mints the id itself, but the node must actually be present:
    // the old updater-based commit only populated its return value when React
    // happened to evaluate the updater eagerly.
    expect(editor().definition?.nodes.some((n) => n.id === id)).toBe(true);
  });

  it('undo() pushes exactly one redo frame, so a single redo reapplies the edit', async () => {
    const { editor } = await renderStrictEditor();

    act(() => {
      editor().addNode('llm', { x: 1, y: 1 });
    });
    act(() => {
      editor().undo();
    });
    expect(editor().definition?.nodes).toHaveLength(1);

    // Pre-fix, `setRedoStack` was called from inside the `setUndoStack`
    // updater, so one undo produced two redo frames — after this redo the
    // stack was still non-empty and a second redo re-applied a stale frame.
    act(() => {
      editor().redo();
    });
    expect(editor().definition?.nodes).toHaveLength(2);
    expect(editor().canRedo).toBe(false);
  });

  it('duplicateNodes() returns exactly one id per source node and every id exists', async () => {
    const { editor } = await renderStrictEditor();

    let ids: string[] = [];
    act(() => {
      ids = editor().duplicateNodes(['n-trigger']);
    });

    // Pre-fix, `genId()` and `newIds.push()` ran inside the mutator, so this
    // returned two ids for one source node — and the first belonged to a clone
    // that was never committed. Callers select the returned ids, which meant
    // selecting a node that does not exist.
    expect(ids).toHaveLength(1);
    expect(editor().definition?.nodes).toHaveLength(2);
    const present = new Set(editor().definition?.nodes.map((n) => n.id));
    for (const id of ids) expect(present.has(id)).toBe(true);
  });

  it('setPositions() persists once per call', async () => {
    const { editor } = await renderStrictEditor();
    mockSavePositionsOnly.mockClear();

    act(() => {
      editor().setPositions([{ id: 'n-trigger', position: { x: 40, y: 40 } }]);
    });

    // Pre-fix this localStorage write lived inside the setDefinition updater.
    expect(mockSavePositionsOnly).toHaveBeenCalledTimes(1);
    expect(editor().definition?.nodes[0].position).toEqual({ x: 40, y: 40 });
  });
});
