// REGRESSION — "Completed in ?s" for a run that took 0 ms.
//
// The pill tested `currentRun.durationMs ? … : '?'`. `durationMs` is
// `number | undefined`, so a legitimate 0 — a pipeline the server timed at
// under a millisecond — took the "unknown" branch and the toolbar claimed it
// could not measure a duration it had been handed. Only null/undefined is
// unknown.

import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { PipelineDefinition } from '../../../types/pipeline';

// The bar reads rename/setIcon/setSelectedNodeId off the editor context. None
// of that is under test here, so stub it rather than stand up a provider.
vi.mock('../context/PipelineEditorContext', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../context/PipelineEditorContext')>();
  return {
    ...actual,
    usePipelineEditor: () => ({
      rename: vi.fn(),
      setIcon: vi.fn(),
      setSelectedNodeId: vi.fn(),
    }),
  };
});

import EditorTopBar from '../editor/EditorTopBar';

const definition = {
  id: 'pipe-1',
  name: 'Nightly ETL',
  version: 1,
  nodes: [],
  edges: [],
} as unknown as PipelineDefinition;

const noop = () => {};

function renderBar(durationMs: number | undefined) {
  return render(
    <MemoryRouter>
      <EditorTopBar
        pipelineId="pipe-1"
        definition={definition}
        dirty={false}
        savingFlash={false}
        isRunActive={false}
        isTriggering={false}
        runDisabled={false}
        runTitle="Run"
        currentRun={{
          status: 'completed',
          durationMs,
          steps: {},
          startedAt: '2026-08-16T10:00:00.000Z',
        }}
        breakpoints={new Set()}
        onRunClick={noop}
        onDebugRunClick={noop}
        onExport={noop}
        onPublishClick={noop}
        onDuplicate={noop}
        onCopyMermaid={noop}
        onViewVersions={noop}
        onRevert={noop}
        onToggleShowTags={noop}
        showTags={false}
        onViewRunHistory={noop}
        onClearRunHistory={noop}
        onSimPanelOpen={noop}
        onDelete={noop}
      />
    </MemoryRouter>,
  );
}

describe('EditorTopBar run-status pill', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-16T10:00:05.000Z'));
  });
  afterEach(() => vi.useRealTimers());

  it('renders a sub-millisecond duration as 0.0s, not "?"', () => {
    const { container } = renderBar(0);
    expect(container.textContent).toContain('Completed in 0.0s');
    expect(container.textContent).not.toContain('Completed in ?s');
  });

  it('still renders "?" when the duration is genuinely absent', () => {
    const { container } = renderBar(undefined);
    expect(container.textContent).toContain('Completed in ?s');
  });

  it('renders a normal duration unchanged', () => {
    const { container } = renderBar(1500);
    expect(container.textContent).toContain('Completed in 1.5s');
  });
});
