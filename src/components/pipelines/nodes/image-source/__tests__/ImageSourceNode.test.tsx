import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ImageSourceNode from '../ImageSourceNode';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../../services/PipelineEditorServicesContext';

// ---------------------------------------------------------------------------
// Stubs
// ---------------------------------------------------------------------------

// useLatestStepForNode is a context hook; in a unit test there is no
// PipelineRunsContext, so it returns null (the hook guards this internally).
// We don't need to mock it — the null path is the expected "no run yet" state.

const stubServices: PipelineEditorServices = {
  getImageUrl: (id) => `/test/${id}`,
};

// @xyflow/react Handle + NodeProps shim — we only need the props shape.
vi.mock('@xyflow/react', () => ({
  Handle: ({ id }: { id: string }) => <div data-testid={`handle-${id}`} />,
  Position: { Left: 'left', Right: 'right' },
}));

function makeProps(overrides: Record<string, unknown> = {}) {
  return {
    id: 'node-1',
    data: { type: 'image-source' as const, ...overrides },
    selected: false,
    // Minimal NodeProps — only what ImageSourceNode accesses
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image-source' as const,
  } as Parameters<typeof ImageSourceNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ImageSourceNode', () => {
  it('renders the placeholder when no imageId is configured', () => {
    render(
      <Wrapper>
        <ImageSourceNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByTestId('image-source-placeholder')).toBeInTheDocument();
    expect(screen.queryByTestId('image-source-thumb')).not.toBeInTheDocument();
  });

  it('renders a thumbnail using the stub getImageUrl when imageId is set', () => {
    render(
      <Wrapper>
        <ImageSourceNode {...makeProps({ imageId: 'img_abc123' })} />
      </Wrapper>,
    );
    const img = screen.getByTestId('image-source-thumb') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/test/img_abc123');
    expect(screen.queryByTestId('image-source-placeholder')).not.toBeInTheDocument();
  });
});
