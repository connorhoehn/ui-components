// context/__tests__/PipelineEditorContext.test.tsx
//
// Behavior tests for the pipeline editor core: load-on-mount, node/edge
// mutations (add / update / remove / duplicate), undo/redo history, dirty
// tracking, and explicit save. Persistence is mocked at the module seam
// (pipelineStorageRemote) so no network or localStorage round-trips happen.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import type {
  PipelineDefinition,
  PipelineNode,
} from '../../../../types/pipeline';

// ---------------------------------------------------------------------------
// Persistence mocks
// ---------------------------------------------------------------------------

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

import {
  PipelineEditorProvider,
  usePipelineEditor,
} from '../PipelineEditorContext';
import type { PipelineEditorValue } from '../PipelineEditorContext';

// ---------------------------------------------------------------------------
// Fixtures + harness
// ---------------------------------------------------------------------------

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

async function renderEditor(): Promise<{ editor: () => PipelineEditorValue }> {
  let value: PipelineEditorValue | null = null;
  function Capture() {
    value = usePipelineEditor();
    return null;
  }
  render(
    <PipelineEditorProvider pipelineId="pipe-1">
      <Capture />
    </PipelineEditorProvider>,
  );
  // Definition loads asynchronously on mount.
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

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('PipelineEditorContext', () => {
  it('throws when usePipelineEditor is used outside the provider', () => {
    function Naked() {
      usePipelineEditor();
      return null;
    }
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Naked />)).toThrow(/within a PipelineEditorProvider/);
    spy.mockRestore();
  });

  it('loads the definition on mount and starts clean', async () => {
    const { editor } = await renderEditor();
    expect(mockLoadPipeline).toHaveBeenCalledWith('pipe-1');
    expect(editor().definition?.id).toBe('pipe-1');
    expect(editor().dirty).toBe(false);
    expect(editor().canUndo).toBe(false);
    expect(editor().canRedo).toBe(false);
  });

  it('addNode appends a node with valid default data, returns its id, and marks dirty', async () => {
    const { editor } = await renderEditor();
    let id = '';
    act(() => {
      id = editor().addNode('llm', { x: 100, y: 50 });
    });
    const def = editor().definition!;
    expect(def.nodes).toHaveLength(2);
    const added = def.nodes.find((n) => n.id === id)!;
    expect(added.type).toBe('llm');
    expect(added.position).toEqual({ x: 100, y: 50 });
    // Default data keeps the discriminated union valid on insert.
    expect(added.data.type).toBe('llm');
    expect(editor().dirty).toBe(true);
    expect(editor().canUndo).toBe(true);
  });

  it('updateNodeData merges a partial patch while preserving the discriminator', async () => {
    const { editor } = await renderEditor();
    let id = '';
    act(() => {
      id = editor().addNode('llm', { x: 0, y: 0 });
    });
    act(() => {
      editor().updateNodeData(id, { temperature: 0.1 } as never);
    });
    const node = editor().definition!.nodes.find((n) => n.id === id)!;
    expect(node.data.type).toBe('llm');
    expect((node.data as { temperature?: number }).temperature).toBe(0.1);
  });

  it('removeNode drops the node and any attached edges, and clears its selection', async () => {
    const { editor } = await renderEditor();
    let llmId = '';
    act(() => {
      llmId = editor().addNode('llm', { x: 200, y: 0 });
    });
    act(() => {
      editor().addEdge({ source: 'n-trigger', target: llmId } as never);
    });
    act(() => {
      editor().setSelectedNodeId(llmId);
    });
    expect(editor().definition!.edges).toHaveLength(1);
    act(() => {
      editor().removeNode(llmId);
    });
    const def = editor().definition!;
    expect(def.nodes.find((n) => n.id === llmId)).toBeUndefined();
    expect(def.edges).toHaveLength(0);
    expect(editor().selectedNodeId).toBeNull();
  });

  it('duplicateNodes clones nodes with offset positions and fresh ids', async () => {
    const { editor } = await renderEditor();
    let llmId = '';
    act(() => {
      llmId = editor().addNode('llm', { x: 10, y: 20 });
    });
    let cloneIds: string[] = [];
    act(() => {
      cloneIds = editor().duplicateNodes([llmId]);
    });
    expect(cloneIds).toHaveLength(1);
    const clone = editor().definition!.nodes.find((n) => n.id === cloneIds[0])!;
    expect(clone.id).not.toBe(llmId);
    expect(clone.type).toBe('llm');
    expect(clone.position).toEqual({ x: 50, y: 60 });
  });

  it('undo restores the previous nodes/edges snapshot; redo re-applies it', async () => {
    const { editor } = await renderEditor();
    act(() => {
      editor().addNode('llm', { x: 0, y: 0 });
    });
    expect(editor().definition!.nodes).toHaveLength(2);

    act(() => {
      editor().undo();
    });
    expect(editor().definition!.nodes).toHaveLength(1);
    expect(editor().canRedo).toBe(true);

    act(() => {
      editor().redo();
    });
    expect(editor().definition!.nodes).toHaveLength(2);
    expect(editor().canRedo).toBe(false);
  });

  it('save persists via the remote seam and clears the dirty flag', async () => {
    const { editor } = await renderEditor();
    act(() => {
      editor().addNode('llm', { x: 0, y: 0 });
    });
    expect(editor().dirty).toBe(true);
    act(() => {
      editor().save();
    });
    await waitFor(() => {
      expect(editor().dirty).toBe(false);
    });
    expect(mockSavePipeline).toHaveBeenCalledTimes(1);
    expect(mockSavePipeline.mock.calls[0][0].nodes).toHaveLength(2);
  });

  // Regression: the debounced autosave resolved with an unconditional
  // `setDirty(false)`. An edit made while an earlier save was still in flight
  // therefore got marked clean the moment that stale save landed — and
  // because the autosave effect's cleanup clears the pending timer as soon
  // as `dirty` flips to false, nothing ever wrote the newer definition. The
  // editor showed "saved" while the last edit existed only in memory.
  it('keeps dirty set (and still autosaves) for an edit made while a save is in flight', async () => {
    let releaseFirstSave: () => void = () => {};
    let call = 0;
    mockSavePipeline.mockImplementation(() => {
      call += 1;
      if (call === 1) {
        return new Promise<void>((resolve) => {
          releaseFirstSave = () => resolve();
        });
      }
      return Promise.resolve();
    });

    const { editor } = await renderEditor();

    // Edit #1 — let the debounce elapse so save #1 is genuinely in flight.
    act(() => {
      editor().addNode('llm', { x: 0, y: 0 });
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 600));
    });
    expect(mockSavePipeline).toHaveBeenCalledTimes(1);

    // Edit #2 lands before save #1 resolves.
    act(() => {
      editor().addNode('llm', { x: 40, y: 40 });
    });
    expect(editor().definition!.nodes).toHaveLength(3);

    // Save #1 resolves. It persisted the 2-node definition, so it must not
    // declare the (now 3-node) editor clean.
    await act(async () => {
      releaseFirstSave();
      await Promise.resolve();
    });
    expect(editor().dirty).toBe(true);

    // ...and the pending autosave for edit #2 must actually fire.
    await act(async () => {
      await new Promise((r) => setTimeout(r, 600));
    });
    await waitFor(() => expect(mockSavePipeline).toHaveBeenCalledTimes(2));
    expect(mockSavePipeline.mock.calls[1][0].nodes).toHaveLength(3);
    await waitFor(() => expect(editor().dirty).toBe(false));
  });

  it('setPositions repositions nodes without touching the undo stack (drag path)', async () => {
    const { editor } = await renderEditor();
    act(() => {
      editor().setPositions([{ id: 'n-trigger', position: { x: 99, y: 77 } }]);
    });
    const trigger = editor().definition!.nodes.find((n) => n.id === 'n-trigger')!;
    expect(trigger.position).toEqual({ x: 99, y: 77 });
    expect(editor().canUndo).toBe(false);
    expect(mockSavePositionsOnly).toHaveBeenCalledTimes(1);
  });

  // -------------------------------------------------------------------------
  // Load failure. `pipelineStorageRemote.loadPipeline` only absorbs transport
  // errors; an expired session (401), a 403 or a 400 rejects. There was no
  // catch on the load promise, so the rejection went unhandled and
  // `definition` stayed null forever — PipelineEditorPage renders
  // "Loading pipeline…" for a null definition, with no error and no retry.
  // -------------------------------------------------------------------------

  it('falls back to the cached copy when the remote load rejects', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockLoadPipeline.mockRejectedValue(new Error('loadPipelineRemote failed (401)'));
    const cached = makeDefinition();
    cached.name = 'Cached copy';
    mockLoadPipelineLocal.mockReturnValue(cached);

    let value: PipelineEditorValue | null = null;
    function Capture() {
      value = usePipelineEditor();
      return null;
    }
    render(
      <PipelineEditorProvider pipelineId="pipe-1">
        <Capture />
      </PipelineEditorProvider>,
    );

    await waitFor(() => {
      expect(value?.definition?.name).toBe('Cached copy');
    });
    expect(mockLoadPipelineLocal).toHaveBeenCalledWith('pipe-1');
    spy.mockRestore();
  });

  it('does not leave the load promise unhandled when there is no cached copy', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const rejection = vi.fn();
    process.on('unhandledRejection', rejection);
    mockLoadPipeline.mockRejectedValue(new Error('loadPipelineRemote failed (403)'));
    mockLoadPipelineLocal.mockReturnValue(null);

    render(
      <PipelineEditorProvider pipelineId="pipe-1">
        <div />
      </PipelineEditorProvider>,
    );
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    process.off('unhandledRejection', rejection);
    expect(rejection).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('metadata mutations (rename / setTags) mark dirty but stay off the undo stack', async () => {
    const { editor } = await renderEditor();
    act(() => {
      editor().rename('Renamed pipeline');
      editor().setTags(['alpha', 'beta']);
    });
    expect(editor().definition!.name).toBe('Renamed pipeline');
    expect(editor().definition!.tags).toEqual(['alpha', 'beta']);
    expect(editor().dirty).toBe(true);
    expect(editor().canUndo).toBe(false);
  });
});
