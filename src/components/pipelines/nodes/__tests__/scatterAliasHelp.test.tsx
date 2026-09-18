// The item alias is written at the ROOT of each arm's context, not under
// `scatter`. The executor builds an arm as
// `{ ...context, scatter: { item, index, total, parentStepId }, [alias]: item }`,
// so the old help — "Key written to $.scatter.<alias>" — pointed at a path
// that resolves to nothing, and a downstream step reading it got undefined
// with no error at author time or run time.

import { describe, it, expect, vi } from 'vitest';

// ScatterConfig reads the definition and the selection to offer an upstream
// schema; neither matters to the help text under test.
vi.mock('../../context/PipelineEditorContext', () => ({
  usePipelineEditor: () => ({ definition: { nodes: [], edges: [] }, selectedNodeId: 's1' }),
  // The pane takes the optional hook now, so the module mock must provide it.
  usePipelineEditorOptional: () => ({ definition: { nodes: [], edges: [] }, selectedNodeId: 's1' }),
}));
import { render, screen } from '@testing-library/react';
import ScatterConfig from '../scatter/ScatterConfig';

function show() {
  render(
    <ScatterConfig
      data={{ type: 'scatter', itemsPath: '$.items' } as never}
      onChange={() => {}}
    />,
  );
}

describe('ScatterConfig — item alias help', () => {
  it('points at the root context key the executor really writes', () => {
    show();
    expect(screen.getByText(/context\.<alias>/)).toBeTruthy();
  });

  it('no longer points at the path that resolves to nothing', () => {
    show();
    expect(screen.queryByText(/\$\.scatter\.<alias>/)).toBeNull();
  });

  it('names the always-present scatter.item form too', () => {
    show();
    expect(screen.getByText(/context\.scatter\.item/)).toBeTruthy();
  });
});
