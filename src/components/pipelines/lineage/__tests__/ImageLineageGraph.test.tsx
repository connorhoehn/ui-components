// src/components/pipelines/lineage/__tests__/ImageLineageGraph.test.tsx

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ImageLineageGraph } from '../ImageLineageGraph';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../services/PipelineEditorServicesContext';
import type { ImageLineageEntry } from '../useImageLineage';

// ---------------------------------------------------------------------------
// Mock xyflow — provides just enough API surface for the component to render.
// Captures props so we can assert virtualization flags like
// `onlyRenderVisibleElements`.
// ---------------------------------------------------------------------------

const rfPropsCapture: { last: Record<string, unknown> | null } = { last: null };

// INVERTED (was: `useNodesState: (initial) => [initial, vi.fn(), vi.fn()]`).
// That stub returned the freshly-computed `initialNodes` on EVERY render, so
// the mock silently supplied the syncing the component was missing — the whole
// suite passed against a canvas that in a browser rendered a frozen first
// snapshot (or, for an async `entries` source, nothing at all, forever). The
// real hook is `useState` + a change reducer, so the stub is now `useState`
// too: read once, and only what the setter writes thereafter.
vi.mock('@xyflow/react', async () => {
  const { useState } = await import('react');
  return {
  useNodesState: (initial: unknown[]) => {
    const [items, setItems] = useState(initial);
    return [items, setItems, vi.fn()];
  },
  useEdgesState: (initial: unknown[]) => {
    const [items, setItems] = useState(initial);
    return [items, setItems, vi.fn()];
  },
  ReactFlow: (props: {
    nodes: Array<{ id: string; data: Record<string, unknown> }>;
    onNodeClick?: (e: React.MouseEvent, node: { id: string }) => void;
    onlyRenderVisibleElements?: boolean;
  }) => {
    rfPropsCapture.last = props as unknown as Record<string, unknown>;
    const { nodes, onNodeClick } = props;
    return (
      <div data-testid="rf-canvas">
        {nodes.map((n) => (
          <div
            key={n.id}
            data-testid={`rf-node-${n.id}`}
            data-node-selected={String(n.data.selected)}
            data-node-highlighted={String(n.data.highlighted)}
            onClick={(e) => onNodeClick?.(e, { id: n.id })}
          />
        ))}
      </div>
    );
  },
  Background: () => <div data-testid="rf-bg" />,
  Controls: () => <div data-testid="rf-controls" />,
  Handle: ({ id }: { id: string }) => <div data-testid={`handle-${id}`} />,
  Position: { Left: 'left', Right: 'right', Top: 'top', Bottom: 'bottom' },
  };
});

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const stubServices: PipelineEditorServices = {
  getImageUrl: (id) => `/test-thumb/${id}`,
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

const sourceEntry: ImageLineageEntry = {
  imageId: 'img-source',
  producedByStepId: 'node-source',
  producedByNodeKind: 'image-source',
  width: 1568,
  height: 1024,
  mimeType: 'image/jpeg',
  at: '2026-01-01T00:00:00.000Z',
};

const cropEntry1: ImageLineageEntry = {
  imageId: 'img-crop-1',
  producedByStepId: 'node-crop',
  producedByNodeKind: 'image:crop',
  parentImageId: 'img-source',
  width: 400,
  height: 300,
  mimeType: 'image/png',
  bbox: { x: 0, y: 0, width: 400, height: 300 },
  at: '2026-01-01T00:00:01.000Z',
};

const cropEntry2: ImageLineageEntry = {
  imageId: 'img-crop-2',
  producedByStepId: 'node-crop',
  producedByNodeKind: 'image:crop',
  parentImageId: 'img-source',
  width: 200,
  height: 150,
  mimeType: 'image/png',
  bbox: { x: 50, y: 50, width: 200, height: 150 },
  at: '2026-01-01T00:00:02.000Z',
};

const cropEntry3: ImageLineageEntry = {
  imageId: 'img-crop-3',
  producedByStepId: 'node-crop',
  producedByNodeKind: 'image:crop',
  parentImageId: 'img-source',
  width: 100,
  height: 80,
  mimeType: 'image/png',
  bbox: { x: 100, y: 100, width: 100, height: 80 },
  at: '2026-01-01T00:00:03.000Z',
};

const fourEntries = [sourceEntry, cropEntry1, cropEntry2, cropEntry3];

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// jsdom does not implement IntersectionObserver — provide a minimal stub
// for the LazyThumb wrapper. The stub fires immediately so thumbs render.
// ---------------------------------------------------------------------------

class StubIntersectionObserver {
  private cb: IntersectionObserverCallback;
  constructor(cb: IntersectionObserverCallback) {
    this.cb = cb;
  }
  observe(target: Element) {
    this.cb(
      [
        {
          isIntersecting: true,
          target,
          intersectionRatio: 1,
          time: 0,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
        } as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

(globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver })
  .IntersectionObserver = StubIntersectionObserver as unknown as typeof IntersectionObserver;

// ---------------------------------------------------------------------------
// Synthetic fixture generator — for windowing / perf tests
// ---------------------------------------------------------------------------

function makeEntries(n: number): ImageLineageEntry[] {
  const out: ImageLineageEntry[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      imageId: `img-${i}`,
      producedByStepId: `step-${i % 4}`,
      producedByNodeKind: `kind-${i % 4}`,
      parentImageId: i === 0 ? undefined : `img-${i - 1}`,
      width: 256,
      height: 256,
      mimeType: 'image/png',
      // Monotonically-increasing timestamps so windowMostRecent picks the tail.
      at: new Date(2026, 0, 1, 0, 0, i).toISOString(),
    });
  }
  return out;
}

describe('ImageLineageGraph', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    rfPropsCapture.last = null;
  });

  it('renders 4 RF nodes for source + 3 crops', () => {
    render(
      <Wrapper>
        <ImageLineageGraph entries={fourEntries} />
      </Wrapper>,
    );

    // The mocked ReactFlow renders one div per node
    expect(screen.getByTestId('rf-node-img-source')).toBeInTheDocument();
    expect(screen.getByTestId('rf-node-img-crop-1')).toBeInTheDocument();
    expect(screen.getByTestId('rf-node-img-crop-2')).toBeInTheDocument();
    expect(screen.getByTestId('rf-node-img-crop-3')).toBeInTheDocument();
  });

  it('renders the xyflow canvas wrapper', () => {
    render(
      <Wrapper>
        <ImageLineageGraph entries={fourEntries} />
      </Wrapper>,
    );
    expect(screen.getByTestId('rf-canvas')).toBeInTheDocument();
  });

  it('fires onSelect with the correct imageId when a leaf node is clicked', () => {
    const onSelect = vi.fn();
    render(
      <Wrapper>
        <ImageLineageGraph entries={fourEntries} onSelect={onSelect} />
      </Wrapper>,
    );

    // Click the crop node via the mocked ReactFlow which calls onNodeClick
    fireEvent.click(screen.getByTestId('rf-node-img-crop-1'));
    expect(onSelect).toHaveBeenCalledWith('img-crop-1');
  });

  it('shows the empty-state message when entries is empty', () => {
    render(
      <Wrapper>
        <ImageLineageGraph entries={[]} />
      </Wrapper>,
    );
    expect(screen.getByTestId('lineage-graph-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('rf-canvas')).not.toBeInTheDocument();
  });

  it('passes onlyRenderVisibleElements to <ReactFlow> for viewport culling', () => {
    render(
      <Wrapper>
        <ImageLineageGraph entries={fourEntries} />
      </Wrapper>,
    );
    expect(rfPropsCapture.last).not.toBeNull();
    expect(rfPropsCapture.last?.onlyRenderVisibleElements).toBe(true);
  });

  it('renders all entries when count is below maxRenderedNodes (60 < 100 default)', () => {
    const entries = makeEntries(60);
    render(
      <Wrapper>
        <ImageLineageGraph entries={entries} />
      </Wrapper>,
    );
    // All 60 RF nodes present, no clip banner.
    for (let i = 0; i < 60; i++) {
      expect(screen.getByTestId(`rf-node-img-${i}`)).toBeInTheDocument();
    }
    expect(screen.queryByTestId('lineage-graph-clip-banner')).not.toBeInTheDocument();
  });

  it('opens the preview modal with the right imageId when a thumb is clicked', () => {
    render(
      <Wrapper>
        <ImageLineageGraph entries={fourEntries} />
      </Wrapper>,
    );

    // No modal initially.
    expect(screen.queryByTestId('lineage-preview-modal')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('rf-node-img-crop-2'));

    // Modal renders with the chosen artifact's image.
    expect(screen.getByTestId('lineage-preview-modal')).toBeInTheDocument();
    expect(
      screen.getByTestId('lineage-preview-image-img-crop-2'),
    ).toHaveAttribute('src', '/test-thumb/img-crop-2');
  });

  it('closes the preview modal when Escape is pressed', () => {
    render(
      <Wrapper>
        <ImageLineageGraph entries={fourEntries} />
      </Wrapper>,
    );

    fireEvent.click(screen.getByTestId('rf-node-img-crop-1'));
    expect(screen.getByTestId('lineage-preview-modal')).toBeInTheDocument();

    act(() => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });

    expect(screen.queryByTestId('lineage-preview-modal')).not.toBeInTheDocument();
  });

  it('ArrowRight advances the preview to the next artifact by `at`', () => {
    // Just two entries: source (00:00:00) and crop-1 (00:00:01).
    const twoEntries = [sourceEntry, cropEntry1];
    render(
      <Wrapper>
        <ImageLineageGraph entries={twoEntries} />
      </Wrapper>,
    );

    // Open on the source (earliest by `at`).
    fireEvent.click(screen.getByTestId('rf-node-img-source'));
    expect(
      screen.getByTestId('lineage-preview-image-img-source'),
    ).toBeInTheDocument();

    // ArrowRight → next in `at`-asc order is img-crop-1.
    act(() => {
      fireEvent.keyDown(window, { key: 'ArrowRight' });
    });

    expect(
      screen.getByTestId('lineage-preview-image-img-crop-1'),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('lineage-preview-image-img-source'),
    ).not.toBeInTheDocument();
  });

  it('windows to 100 of 150 entries and expands on Show all click', () => {
    const entries = makeEntries(150);
    render(
      <Wrapper>
        <ImageLineageGraph entries={entries} />
      </Wrapper>,
    );

    // Initial render: only 100 nodes (the most-recent-first window: img-50..img-149).
    const initial = screen.getAllByTestId(/^rf-node-img-/);
    expect(initial).toHaveLength(100);

    // Banner reports the clip count.
    const banner = screen.getByTestId('lineage-graph-clip-banner');
    expect(banner.textContent).toContain('Showing 100 of 150 artifacts');

    // Show all (totalCount 150 < perf threshold 500 → no confirm dialog).
    act(() => {
      fireEvent.click(screen.getByTestId('lineage-graph-show-all'));
    });

    const expanded = screen.getAllByTestId(/^rf-node-img-/);
    expect(expanded).toHaveLength(150);
    expect(screen.queryByTestId('lineage-graph-clip-banner')).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// REGRESSION: the `useNodesState` / `useEdgesState` setters were discarded, so
// the canvas only ever showed the node set computed on the very first render.
// ---------------------------------------------------------------------------

describe('ImageLineageGraph — canvas tracks its inputs', () => {
  it('renders entries that arrive after mount (async useImageLineage)', () => {
    // The host's own hook resolves a fetch: first render has [], the real
    // entries land on a later one. This mounted a canvas that stayed blank
    // forever, with working zoom controls over the emptiness.
    const { rerender } = render(
      <Wrapper>
        <ImageLineageGraph entries={[]} />
      </Wrapper>,
    );
    expect(screen.getByTestId('lineage-graph-empty')).toBeInTheDocument();

    rerender(
      <Wrapper>
        <ImageLineageGraph entries={fourEntries} />
      </Wrapper>,
    );

    expect(screen.queryByTestId('lineage-graph-empty')).not.toBeInTheDocument();
    expect(screen.getAllByTestId(/^rf-node-img-/)).toHaveLength(4);
    expect(screen.getByTestId('rf-node-img-source')).toBeInTheDocument();
  });

  it('picks up entries appended after mount', () => {
    const { rerender } = render(
      <Wrapper>
        <ImageLineageGraph entries={[sourceEntry]} />
      </Wrapper>,
    );
    expect(screen.getAllByTestId(/^rf-node-img-/)).toHaveLength(1);

    rerender(
      <Wrapper>
        <ImageLineageGraph entries={fourEntries} />
      </Wrapper>,
    );
    expect(screen.getAllByTestId(/^rf-node-img-/)).toHaveLength(4);
  });

  it('"Show all" actually adds the clipped nodes, not just clears the banner', () => {
    render(
      <Wrapper>
        <ImageLineageGraph entries={makeEntries(150)} />
      </Wrapper>,
    );
    const before = screen.getAllByTestId(/^rf-node-img-/).length;
    expect(before).toBe(100);

    act(() => {
      fireEvent.click(screen.getByTestId('lineage-graph-show-all'));
    });

    // Delta on the node set — the banner disappearing proved nothing before.
    expect(screen.getAllByTestId(/^rf-node-img-/).length).toBe(before + 50);
    expect(screen.getByTestId('rf-node-img-0')).toBeInTheDocument();
  });

  it('re-tints the ancestry when selectedImageId changes', () => {
    const { rerender } = render(
      <Wrapper>
        <ImageLineageGraph entries={fourEntries} />
      </Wrapper>,
    );
    expect(screen.getByTestId('rf-node-img-crop-1')).toHaveAttribute('data-node-selected', 'false');

    rerender(
      <Wrapper>
        <ImageLineageGraph entries={fourEntries} selectedImageId="img-crop-1" />
      </Wrapper>,
    );

    expect(screen.getByTestId('rf-node-img-crop-1')).toHaveAttribute('data-node-selected', 'true');
    // The parent is an ancestor of the selection, so it highlights too.
    expect(screen.getByTestId('rf-node-img-source')).toHaveAttribute('data-node-highlighted', 'true');
    expect(screen.getByTestId('rf-node-img-crop-2')).toHaveAttribute('data-node-highlighted', 'false');
  });

  it('feeds the same node set to the edge list', () => {
    const { rerender } = render(
      <Wrapper>
        <ImageLineageGraph entries={[]} />
      </Wrapper>,
    );
    rerender(
      <Wrapper>
        <ImageLineageGraph entries={fourEntries} />
      </Wrapper>,
    );
    const edges = (rfPropsCapture.last?.edges ?? []) as Array<{ id: string }>;
    expect(edges.map((e) => e.id)).toEqual([
      'img-source->img-crop-1',
      'img-source->img-crop-2',
      'img-source->img-crop-3',
    ]);
  });
});

// ---------------------------------------------------------------------------
// Performance benchmark — skipped by default; run manually with
//   vitest --testNamePattern=perf
// to verify p99 first-paint < 300ms for a 500-entry synthetic case.
// ---------------------------------------------------------------------------

describe.skip('perf', () => {
  it('renders 500 entries in under 300ms (p99)', () => {
    const entries = makeEntries(500);
    const samples: number[] = [];
    for (let i = 0; i < 20; i++) {
      const t0 = performance.now();
      const { unmount } = render(
        <Wrapper>
          <ImageLineageGraph entries={entries} maxRenderedNodes={500} />
        </Wrapper>,
      );
      const t1 = performance.now();
      samples.push(t1 - t0);
      unmount();
    }
    samples.sort((a, b) => a - b);
    const p99 = samples[Math.floor(samples.length * 0.99) - 1] ?? samples[samples.length - 1];
    // eslint-disable-next-line no-console
    console.log('[perf] 500-entry render p99:', p99, 'ms', 'samples:', samples);
    expect(p99).toBeLessThan(300);
  });
});
