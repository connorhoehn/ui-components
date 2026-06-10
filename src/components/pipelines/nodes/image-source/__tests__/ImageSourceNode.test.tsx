import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageSourceNode from '../ImageSourceNode';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../../services/PipelineEditorServicesContext';

// ---------------------------------------------------------------------------
// Stubs
// ---------------------------------------------------------------------------

// Mock the runs-context module so tests can drive the live-step path
// (runtime-injected image vs design-time config).
const mockLatestStep = vi.fn(() => null);
vi.mock('../../../context/PipelineRunsContext', () => ({
  useLatestStepForNode: () => mockLatestStep(),
}));

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
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <ImageSourceNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByTestId('image-source-placeholder')).toBeInTheDocument();
    expect(screen.queryByTestId('image-source-thumb')).not.toBeInTheDocument();
  });

  it('renders a thumbnail using the stub getImageUrl when imageId is set', () => {
    mockLatestStep.mockReturnValue(null);
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

  it('prefers the runtime-injected image (liveStep.images) over the configured imageId', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockLatestStep.mockReturnValue({
      nodeId: 'node-1',
      status: 'completed',
      images: [
        { imageId: 'img_runtime_999', width: 640, height: 480, mimeType: 'image/png' },
      ],
      output: { imageId: 'img_runtime_999', width: 640, height: 480, mimeType: 'image/png' },
    } as any);
    render(
      <Wrapper>
        <ImageSourceNode {...makeProps({ imageId: 'img_configured_111' })} />
      </Wrapper>,
    );
    const img = screen.getByTestId('image-source-thumb') as HTMLImageElement;
    expect(img.src).toContain('/test/img_runtime_999');
    expect(img.src).not.toContain('img_configured_111');
  });

  it('falls back to liveStep.output.imageId when no images[] entry exists', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockLatestStep.mockReturnValue({
      nodeId: 'node-1',
      status: 'completed',
      output: { imageId: 'img_from_output', width: 640, height: 480, mimeType: 'image/png' },
    } as any);
    render(
      <Wrapper>
        <ImageSourceNode {...makeProps()} />
      </Wrapper>,
    );
    const img = screen.getByTestId('image-source-thumb') as HTMLImageElement;
    expect(img.src).toContain('/test/img_from_output');
  });

  it('clicking the thumb opens an ImageLightbox and stops propagation', () => {
    mockLatestStep.mockReturnValue(null);
    const onMouseDown = vi.fn();
    const onClick = vi.fn();
    render(
      <Wrapper>
        <div onMouseDown={onMouseDown} onClick={onClick}>
          <ImageSourceNode {...makeProps({ imageId: 'img_abc123' })} />
        </div>
      </Wrapper>,
    );

    const button = screen.getByRole('button', { name: 'View source image' });
    fireEvent.mouseDown(button);
    fireEvent.click(button);
    expect(onMouseDown).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();

    const lightboxImg = screen.getByTestId('image-lightbox-img') as HTMLImageElement;
    expect(lightboxImg.src).toContain('/test/img_abc123');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('image-lightbox')).not.toBeInTheDocument();
  });
});
