// src/components/pipelines/lineage/__tests__/ImageLineageGraph.test.tsx

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageLineageGraph } from '../ImageLineageGraph';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../services/PipelineEditorServicesContext';
import type { ImageLineageEntry } from '../useImageLineage';

// ---------------------------------------------------------------------------
// Mock xyflow — provides just enough API surface for the component to render
// ---------------------------------------------------------------------------

vi.mock('@xyflow/react', () => ({
  ReactFlow: ({
    nodes,
    onNodeClick,
  }: {
    nodes: Array<{ id: string; data: Record<string, unknown> }>;
    onNodeClick?: (e: React.MouseEvent, node: { id: string }) => void;
  }) => (
    <div data-testid="rf-canvas">
      {nodes.map((n) => (
        <div
          key={n.id}
          data-testid={`rf-node-${n.id}`}
          onClick={(e) => onNodeClick?.(e, { id: n.id })}
        />
      ))}
    </div>
  ),
  Background: () => <div data-testid="rf-bg" />,
  Controls: () => <div data-testid="rf-controls" />,
  Handle: ({ id }: { id: string }) => <div data-testid={`handle-${id}`} />,
  Position: { Left: 'left', Right: 'right', Top: 'top', Bottom: 'bottom' },
  useNodesState: (initial: unknown[]) => [initial, vi.fn(), vi.fn()],
  useEdgesState: (initial: unknown[]) => [initial, vi.fn(), vi.fn()],
}));

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

describe('ImageLineageGraph', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
});
