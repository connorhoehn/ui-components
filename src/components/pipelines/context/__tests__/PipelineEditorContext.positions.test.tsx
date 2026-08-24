// context/__tests__/PipelineEditorContext.positions.test.tsx
//
// Node drag positions used to be written to localStorage and NOWHERE ELSE.
// The remote is the source of truth, so an arranged layout survived a reload
// on the same browser and nothing more: reopen the pipeline on another
// machine, or after a cache clear, and every node snapped back to where the
// last content edit had left it.
//
// The naive fix — write to the remote from `setPositions` — would issue a
// request per position event. `PipelineCanvas` already filters mouse drags
// down to the settle (`dragging === false`), but the keyboard nudge path in
// `useCanvasKeyboard` calls `setPositions` once PER KEYPRESS, and key repeat
// makes that a burst. So the move is routed through the existing debounced
// autosave, and these tests pin the three properties that makes it safe:
// coalescing, a flush on teardown, and a failed write that keeps the layout
// instead of eating it.
//
// Kept in its own file rather than appended to PipelineEditorContext.test.tsx
// because it needs fake timers, which that file's real-timer waits do not want.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, render } from '@testing-library/react';
import type { PipelineDefinition, PipelineNode } from '../../../../types/pipeline';

// ---------------------------------------------------------------------------
// Persistence mocks — same seam as the sibling suite.
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
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    createdBy: 'tester',
  };
}

const SAVE_DEBOUNCE_MS = 500;

interface Harness {
  editor: () => PipelineEditorValue;
  unmount: () => void;
}

/**
 * Renders the provider under fake timers and flushes the mount load, which is
 * a resolved promise rather than a timer.
 */
async function renderEditor(): Promise<Harness> {
  let value: PipelineEditorValue | null = null;
  function Capture() {
    value = usePipelineEditor();
    return null;
  }
  const utils = render(
    <PipelineEditorProvider pipelineId="pipe-1">
      <Capture />
    </PipelineEditorProvider>,
  );
  await act(async () => { await Promise.resolve(); });
  if (!value || !(value as PipelineEditorValue).definition) {
    throw new Error('definition did not load');
  }
  return { editor: () => value!, unmount: utils.unmount };
}

/** Advance past the autosave debounce and let the save promise settle. */
async function settle(ms = SAVE_DEBOUNCE_MS + 1): Promise<void> {
  await act(async () => {
    vi.advanceTimersByTime(ms);
    await Promise.resolve();
    await Promise.resolve();
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  mockLoadPipeline.mockReset().mockResolvedValue(makeDefinition());
  mockSavePipeline.mockReset().mockResolvedValue(undefined);
  mockPublishPipeline.mockReset().mockResolvedValue(null);
  mockSavePositionsOnly.mockReset();
  mockLoadPipelineLocal.mockReset().mockReturnValue(null);
});

afterEach(() => {
  vi.useRealTimers();
});

// ---------------------------------------------------------------------------

describe('PipelineEditorContext — position persistence', () => {
  it('persists a drag to the REMOTE, not just localStorage', async () => {
    const { editor } = await renderEditor();

    act(() => {
      editor().setPositions([{ id: 'n-trigger', position: { x: 99, y: 77 } }]);
    });
    // The local write is still immediate — it is the only thing that survives
    // the tab being killed inside the debounce window.
    expect(mockSavePositionsOnly).toHaveBeenCalledTimes(1);
    // ...but before the fix the remote never heard about it at all.
    expect(mockSavePipeline).not.toHaveBeenCalled();

    await settle();

    expect(mockSavePipeline).toHaveBeenCalledTimes(1);
    const written = mockSavePipeline.mock.calls[0][0];
    expect(written.nodes.find((n) => n.id === 'n-trigger')!.position).toEqual({
      x: 99,
      y: 77,
    });
    expect(editor().dirty).toBe(false);
  });

  it('coalesces a burst of position updates into ONE remote write', async () => {
    const { editor } = await renderEditor();

    // Five nudges inside the debounce window — what holding an arrow key in
    // `useCanvasKeyboard` produces.
    for (let i = 1; i <= 5; i++) {
      act(() => {
        editor().setPositions([{ id: 'n-trigger', position: { x: i * 8, y: 0 } }]);
      });
      await act(async () => { vi.advanceTimersByTime(50); });
    }
    expect(mockSavePipeline).not.toHaveBeenCalled();

    await settle();

    expect(mockSavePipeline).toHaveBeenCalledTimes(1);
    // The single write carries the LAST position, not the first.
    expect(
      mockSavePipeline.mock.calls[0][0].nodes.find((n) => n.id === 'n-trigger')!
        .position,
    ).toEqual({ x: 40, y: 0 });
    // localStorage still saw every step — it is the crash floor.
    expect(mockSavePositionsOnly).toHaveBeenCalledTimes(5);
  });

  it('flushes a pending layout on unmount instead of dropping it', async () => {
    const { editor, unmount } = await renderEditor();

    act(() => {
      editor().setPositions([{ id: 'n-trigger', position: { x: 12, y: 34 } }]);
    });
    // Leave well inside the debounce window: the timer has NOT fired.
    await act(async () => { vi.advanceTimersByTime(100); });
    expect(mockSavePipeline).not.toHaveBeenCalled();

    // Closing the editor here used to throw the drag away — the autosave
    // effect's cleanup cancels the timer, and nothing else knew a write was
    // owed. The pending definition is tracked on its own ref precisely so
    // cancelling the timer cannot erase it.
    await act(async () => {
      unmount();
      await Promise.resolve();
    });

    expect(mockSavePipeline).toHaveBeenCalledTimes(1);
    expect(
      mockSavePipeline.mock.calls[0][0].nodes.find((n) => n.id === 'n-trigger')!
        .position,
    ).toEqual({ x: 12, y: 34 });
  });

  it('does not write twice when the debounce already fired before unmount', async () => {
    const { editor, unmount } = await renderEditor();
    act(() => {
      editor().setPositions([{ id: 'n-trigger', position: { x: 5, y: 5 } }]);
    });
    await settle();
    expect(mockSavePipeline).toHaveBeenCalledTimes(1);

    await act(async () => {
      unmount();
      await Promise.resolve();
    });
    expect(mockSavePipeline).toHaveBeenCalledTimes(1);
  });

  it('explicit save() flushes immediately and leaves nothing behind', async () => {
    const { editor } = await renderEditor();
    act(() => {
      editor().setPositions([{ id: 'n-trigger', position: { x: 7, y: 8 } }]);
    });
    act(() => { editor().save(); });
    await act(async () => { await Promise.resolve(); });

    expect(mockSavePipeline).toHaveBeenCalledTimes(1);
    // The debounced timer must not fire a redundant second write behind it.
    await settle();
    expect(mockSavePipeline).toHaveBeenCalledTimes(1);
  });

  // -------------------------------------------------------------------------
  // Failure path. A rejected write must not look like a successful one.
  // -------------------------------------------------------------------------

  it('keeps the layout pending and reports why when the remote write fails', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockSavePipeline.mockRejectedValue(new Error('savePipelineRemote failed (403)'));
    const { editor } = await renderEditor();

    act(() => {
      editor().setPositions([{ id: 'n-trigger', position: { x: 42, y: 42 } }]);
    });
    await settle();

    expect(mockSavePipeline).toHaveBeenCalledTimes(1);
    // Not discarded: still dirty, and the arranged position is still in state.
    expect(editor().dirty).toBe(true);
    expect(
      editor().definition!.nodes.find((n) => n.id === 'n-trigger')!.position,
    ).toEqual({ x: 42, y: 42 });
    // And the reason is legible instead of being an unhandled rejection.
    expect(editor().saveError).toMatch(/403/);
    spy.mockRestore();
  });

  it('does not spam retries while a write keeps failing', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockSavePipeline.mockRejectedValue(new Error('nope'));
    const { editor } = await renderEditor();

    act(() => {
      editor().setPositions([{ id: 'n-trigger', position: { x: 1, y: 1 } }]);
    });
    await settle();
    expect(mockSavePipeline).toHaveBeenCalledTimes(1);

    // Ten debounce windows pass with no further user input. A retry timer
    // would have fired repeatedly against a server that answers 403 forever.
    await settle(SAVE_DEBOUNCE_MS * 10);
    expect(mockSavePipeline).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it('re-attempts the failed layout once on unmount', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockSavePipeline.mockRejectedValue(new Error('nope'));
    const { editor, unmount } = await renderEditor();

    act(() => {
      editor().setPositions([{ id: 'n-trigger', position: { x: 3, y: 4 } }]);
    });
    await settle();
    expect(mockSavePipeline).toHaveBeenCalledTimes(1);

    await act(async () => {
      unmount();
      await Promise.resolve();
    });
    expect(mockSavePipeline).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });

  // -------------------------------------------------------------------------
  // Regression guard for the autosave semantics this must not break: the
  // completion handler clears `dirty` only for the definition it actually
  // wrote (see the sibling suite's in-flight-edit test). The same guard now
  // governs the pending-write ref.
  // -------------------------------------------------------------------------

  it('a drag made while a save is in flight is still written', async () => {
    let release!: () => void;
    mockSavePipeline.mockImplementationOnce(
      () => new Promise<void>((resolve) => { release = () => resolve(); }),
    );
    const { editor } = await renderEditor();

    act(() => { editor().rename('Renamed'); });
    await act(async () => { vi.advanceTimersByTime(SAVE_DEBOUNCE_MS + 1); });
    expect(mockSavePipeline).toHaveBeenCalledTimes(1);

    // Drag while save #1 is still on the wire.
    act(() => {
      editor().setPositions([{ id: 'n-trigger', position: { x: 60, y: 60 } }]);
    });
    await act(async () => {
      release();
      await Promise.resolve();
    });
    // Save #1 completing must NOT mark the dragged layout as saved.
    expect(editor().dirty).toBe(true);

    await settle();
    expect(mockSavePipeline).toHaveBeenCalledTimes(2);
    expect(
      mockSavePipeline.mock.calls[1][0].nodes.find((n) => n.id === 'n-trigger')!
        .position,
    ).toEqual({ x: 60, y: 60 });
    expect(editor().dirty).toBe(false);
  });

  it('revert() is not undone by a stale unmount flush', async () => {
    const { editor, unmount } = await renderEditor();
    act(() => {
      editor().setPositions([{ id: 'n-trigger', position: { x: 500, y: 500 } }]);
    });
    // Revert before the debounce fires.
    await act(async () => {
      editor().revert();
      await Promise.resolve();
    });
    expect(editor().dirty).toBe(false);

    await act(async () => {
      unmount();
      await Promise.resolve();
    });
    // The dropped layout must not be resurrected onto the server.
    expect(mockSavePipeline).not.toHaveBeenCalled();
  });
});
