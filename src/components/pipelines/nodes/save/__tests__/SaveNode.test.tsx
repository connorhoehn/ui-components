import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SaveNode from '../SaveNode';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../../services/PipelineEditorServicesContext';

// ---------------------------------------------------------------------------
// Stubs
// ---------------------------------------------------------------------------

// @xyflow/react Handle shim
vi.mock('@xyflow/react', () => ({
  Handle: ({ id }: { id: string }) => <div data-testid={`handle-${id}`} />,
  Position: { Left: 'left', Right: 'right' },
}));

// PipelineRunsContext is not mounted in these unit tests — useLatestStepForNode
// returns null when no context is present, exercising the "no live step" path.
// For the live-step path we mock the module directly.
const mockLatestStep = vi.fn(() => null);
vi.mock('../../../context/PipelineRunsContext', () => ({
  useLatestStepForNode: () => mockLatestStep(),
}));

const stubServices: PipelineEditorServices = {
  getImageUrl: (id) => `/test/${id}`,
};

function makeProps(overrides: Record<string, unknown> = {}) {
  return {
    id: 'node-save-1',
    data: { type: 'image:save' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:save' as const,
  } as Parameters<typeof SaveNode>[0];
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

describe('SaveNode', () => {
  it('renders the placeholder when there is no live step', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <SaveNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByTestId('save-placeholder')).toBeInTheDocument();
    expect(screen.queryByTestId('save-output-thumb')).not.toBeInTheDocument();
  });

  it('renders a NodeThumbStrip resolving via the stub getImageUrl when a step has images', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockLatestStep.mockReturnValue({
      nodeId: 'node-save-1',
      status: 'completed',
      images: [
        { imageId: 'img_saved_001', width: 800, height: 600, mimeType: 'image/jpeg' },
      ],
    } as any);
    render(
      <Wrapper>
        <SaveNode {...makeProps({ filenameTemplate: 'output.png' })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('save-thumb-strip')).toBeInTheDocument();
    const img = screen
      .getByTestId('save-thumb-strip-thumb-0')
      .querySelector('img') as HTMLImageElement;
    expect(img.src).toContain('/test/img_saved_001');
    expect(screen.queryByTestId('save-placeholder')).not.toBeInTheDocument();
  });

  it('renders ALL saved artifacts in the strip, not just the first', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockLatestStep.mockReturnValue({
      nodeId: 'node-save-1',
      status: 'completed',
      images: [
        { imageId: 'img_saved_001', width: 800, height: 600, mimeType: 'image/jpeg' },
        { imageId: 'img_saved_002', width: 800, height: 600, mimeType: 'image/jpeg' },
        { imageId: 'img_saved_003', width: 800, height: 600, mimeType: 'image/jpeg' },
      ],
    } as any);
    render(
      <Wrapper>
        <SaveNode {...makeProps({ filenameTemplate: 'output.png' })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('save-thumb-strip-thumb-0')).toBeInTheDocument();
    expect(screen.getByTestId('save-thumb-strip-thumb-1')).toBeInTheDocument();
    expect(screen.getByTestId('save-thumb-strip-thumb-2')).toBeInTheDocument();
  });

  it('keeps the resolved-filename badge alongside the strip', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockLatestStep.mockReturnValue({
      nodeId: 'node-save-1',
      status: 'completed',
      output: { filename: 'crop-3.png' },
      images: [
        { imageId: 'img_saved_001', width: 800, height: 600, mimeType: 'image/jpeg' },
      ],
    } as any);
    render(
      <Wrapper>
        <SaveNode {...makeProps({ filenameTemplate: 'crop-{{scatter.index}}.png' })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('save-filename-badge').textContent).toBe('crop-3.png');
  });

  it('shows the footer with the filename template', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <SaveNode {...makeProps({ filenameTemplate: 'my-{{scatter.index}}.png' })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('save-footer')).toBeInTheDocument();
    expect(screen.getByTestId('save-footer').textContent).toContain('my-{{scatter.index}}.png');
  });
});
