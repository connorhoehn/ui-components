// src/components/pipelines/nodes/crop/__tests__/CropConfig.test.tsx
//
// Tests for the BBoxAuthoringCanvas adoption in CropConfig (W4.2).
//   - empty state when no upstream image is present
//   - drag-to-create single box writes to nodeData.bbox
//   - drawing a second box replaces the first (single-box invariant)

import { createContext } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CropConfig from '../CropConfig';
import type { ImageCropNodeData, BBox } from '../../../../../types/pipeline';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../../services/PipelineEditorServicesContext';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// Mock the editor context so we don't have to mount PipelineEditorProvider
// (which loads a pipeline via the persistence service on mount).
const mockUsePipelineEditor = vi.fn();
vi.mock('../../../context/PipelineEditorContext', () => ({
  usePipelineEditor: () => mockUsePipelineEditor(),
  // useUpstreamContext reads the context object directly (so a panel stays
  // renderable with no provider), so the mock has to supply it too.
  PipelineEditorContext: createContext<unknown>(null),
}));

// Mock the runs context so we can control the upstream step image record.
const mockUseLatestStepForNode = vi.fn();
vi.mock('../../../context/PipelineRunsContext', () => ({
  useLatestStepForNode: (nodeId: string) => mockUseLatestStepForNode(nodeId),
}));

const stubServices: PipelineEditorServices = {
  getImageUrl: (id) => `https://example.test/img/${id}`,
};

beforeEach(() => {
  mockUsePipelineEditor.mockReset();
  mockUseLatestStepForNode.mockReset();

  // BBoxAuthoringCanvas needs a stable bounding rect + pointer-capture
  // shim — jsdom doesn't implement either.
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
    left: 0, top: 0,
    width: 200, height: 200,
    right: 200, bottom: 200,
    x: 0, y: 0,
    toJSON: () => ({}),
  } as DOMRect);
  Element.prototype.setPointerCapture = vi.fn();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function setEditor(opts: {
  selectedNodeId?: string | null;
  definition?: { edges: Array<{ source: string; target: string }> } | null;
}) {
  mockUsePipelineEditor.mockReturnValue({
    selectedNodeId: opts.selectedNodeId ?? 'crop-1',
    definition: opts.definition ?? null,
  });
}

function setUpstreamImage(
  upstreamNodeId: string,
  img: { imageId: string; width: number; height: number } | null,
) {
  mockUseLatestStepForNode.mockImplementation((nodeId: string) => {
    if (nodeId !== upstreamNodeId) return null;
    if (!img) return null;
    return {
      nodeId: upstreamNodeId,
      status: 'success',
      images: [{ ...img, mimeType: 'image/png' }],
    };
  });
}

function renderCropConfig(
  data: ImageCropNodeData,
  onChange: (patch: Partial<ImageCropNodeData>) => void = vi.fn(),
) {
  return render(
    <PipelineEditorServicesProvider services={stubServices}>
      <CropConfig data={data} onChange={onChange} />
    </PipelineEditorServicesProvider>,
  );
}

function getOverlay(container: HTMLElement): HTMLDivElement {
  const overlay = container.querySelector(
    '[data-testid="bbox-authoring-overlay"]',
  ) as HTMLDivElement | null;
  if (!overlay) throw new Error('bbox-authoring-overlay not found');
  return overlay;
}

function drag(
  el: Element,
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  fireEvent.pointerDown(el, {
    button: 0,
    pointerId: 1,
    clientX: from.x,
    clientY: from.y,
  });
  fireEvent.pointerMove(el, {
    pointerId: 1,
    clientX: to.x,
    clientY: to.y,
  });
  fireEvent.pointerUp(el, {
    pointerId: 1,
    clientX: to.x,
    clientY: to.y,
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('CropConfig — BBoxAuthoringCanvas adoption (W4.2)', () => {
  it('empty state: with no upstream image, shows the empty-state Banner and no canvas', () => {
    setEditor({ selectedNodeId: 'crop-1', definition: { edges: [] } });
    setUpstreamImage('upstream-1', null);

    renderCropConfig({ type: 'image:crop' });

    expect(
      screen.getByTestId('crop-region-empty-banner'),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('bbox-authoring-canvas'),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('crop-region-chips')).not.toBeInTheDocument();
  });

  it('drag-to-create: a single box drawn on the canvas writes to nodeData.bbox', () => {
    setEditor({
      selectedNodeId: 'crop-1',
      definition: { edges: [{ source: 'upstream-1', target: 'crop-1' }] },
    });
    setUpstreamImage('upstream-1', {
      imageId: 'img-abc',
      width: 200,
      height: 200,
    });

    const onChange = vi.fn();
    const { container } = renderCropConfig({ type: 'image:crop' }, onChange);

    // Canvas mounts with the upstream image.
    expect(screen.getByTestId('bbox-authoring-canvas')).toBeInTheDocument();

    // Drag (20,20) → (120,100). Container rect == image dims so px == image px.
    drag(getOverlay(container), { x: 20, y: 20 }, { x: 120, y: 100 });

    expect(onChange).toHaveBeenCalledTimes(1);
    const patch = onChange.mock.calls[0][0] as Partial<ImageCropNodeData>;
    expect(patch.bbox).toBeDefined();
    const bbox = patch.bbox as BBox;
    expect(bbox.x).toBe(20);
    expect(bbox.y).toBe(20);
    expect(bbox.width).toBe(100);
    expect(bbox.height).toBe(80);
  });

  it('redraw: drawing a second box replaces the existing one (single-box invariant)', () => {
    setEditor({
      selectedNodeId: 'crop-1',
      definition: { edges: [{ source: 'upstream-1', target: 'crop-1' }] },
    });
    setUpstreamImage('upstream-1', {
      imageId: 'img-abc',
      width: 200,
      height: 200,
    });

    const onChange = vi.fn();
    // Seed with an existing bbox so a single box is already painted.
    const { container } = renderCropConfig(
      {
        type: 'image:crop',
        bbox: { x: 10, y: 10, width: 50, height: 50 },
      },
      onChange,
    );

    // Sanity: chips reflect the seeded bbox.
    expect(screen.getByTestId('crop-chip-x')).toHaveTextContent('x: 10');
    expect(screen.getByTestId('crop-chip-width')).toHaveTextContent('w: 50');

    // Drag in a region OUTSIDE the existing box so the gesture is "create"
    // (not "move"). Existing box: (10,10)–(60,60). Draw at (120,120)–(180,180).
    drag(getOverlay(container), { x: 120, y: 120 }, { x: 180, y: 180 });

    expect(onChange).toHaveBeenCalledTimes(1);
    const patch = onChange.mock.calls[0][0] as Partial<ImageCropNodeData>;
    // Single-box invariant: the new box wins; old (10,10,50,50) is gone.
    expect(patch.bbox).toEqual({
      x: 120,
      y: 120,
      width: 60,
      height: 60,
    });
  });
});
