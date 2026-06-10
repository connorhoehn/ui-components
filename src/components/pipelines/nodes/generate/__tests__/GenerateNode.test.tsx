// src/components/pipelines/nodes/generate/__tests__/GenerateNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GenerateNode from '../GenerateNode';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../../services/PipelineEditorServicesContext';

vi.mock('@xyflow/react', () => ({
  Handle: ({ id }: { id: string }) => <div data-testid={`handle-${id}`} />,
  Position: { Left: 'left', Right: 'right' },
}));

// Mock the runs context hook so individual tests can drive the live-step path.
const mockLatestStep = vi.fn(() => null);
vi.mock('../../../context/PipelineRunsContext', () => ({
  useLatestStepForNode: () => mockLatestStep(),
}));

const stubServices: PipelineEditorServices = {
  getImageUrl: (id) => `/test/${id}`,
};

function makeProps(overrides: Record<string, unknown> = {}) {
  return {
    id: 'node-generate',
    data: { type: 'image:generate' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:generate' as const,
  } as Parameters<typeof GenerateNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function step(overrides: Record<string, unknown>) {
  return { nodeId: 'node-generate', ...overrides } as any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

describe('GenerateNode', () => {
  it('renders "No prompt set" placeholder when prompt is empty', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <GenerateNode {...makeProps()} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('generate-placeholder');
    expect(placeholder.textContent).toBe('No prompt set');
    expect(screen.queryByTestId('generative-image-preview')).not.toBeInTheDocument();
    expect(screen.queryByTestId('generate-thumb-strip')).not.toBeInTheDocument();
  });

  it('shows prompt preview in placeholder when prompt is configured', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <GenerateNode {...makeProps({ prompt: 'A golden sunset over the ocean.' })} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('generate-placeholder');
    expect(placeholder.textContent).toContain('golden sunset');
  });

  it('shows the synthesizing preview (with elapsed chip) while running with no images yet', () => {
    mockLatestStep.mockReturnValue(
      step({ status: 'running', startedAt: new Date().toISOString() }),
    );
    render(
      <Wrapper>
        <GenerateNode {...makeProps({ prompt: 'anything' })} />
      </Wrapper>,
    );
    const preview = screen.getByTestId('generative-image-preview');
    expect(preview.getAttribute('data-status')).toBe('synthesizing');
    expect(screen.getByTestId('generative-image-preview-elapsed')).toBeInTheDocument();
    expect(screen.queryByTestId('generate-placeholder')).not.toBeInTheDocument();
  });

  it('omits the elapsed chip when the live step has no startedAt', () => {
    mockLatestStep.mockReturnValue(step({ status: 'running' }));
    render(
      <Wrapper>
        <GenerateNode {...makeProps({ prompt: 'anything' })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('generative-image-preview').getAttribute('data-status')).toBe(
      'synthesizing',
    );
    expect(screen.queryByTestId('generative-image-preview-elapsed')).not.toBeInTheDocument();
  });

  it('flips the SAME preview to done (blur-up reveal path) when the first image lands', () => {
    mockLatestStep.mockReturnValue(
      step({ status: 'running', startedAt: new Date().toISOString() }),
    );
    const { rerender } = render(
      <Wrapper>
        <GenerateNode {...makeProps({ prompt: 'anything' })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('generative-image-preview').getAttribute('data-status')).toBe(
      'synthesizing',
    );

    mockLatestStep.mockReturnValue(
      step({
        status: 'completed',
        images: [{ imageId: 'img_gen_001', width: 1024, height: 1024, mimeType: 'image/png' }],
      }),
    );
    rerender(
      <Wrapper>
        <GenerateNode {...makeProps({ prompt: 'anything' })} />
      </Wrapper>,
    );

    const preview = screen.getByTestId('generative-image-preview');
    expect(preview.getAttribute('data-status')).toBe('done');
    const img = screen.getByTestId('generative-image-preview-img') as HTMLImageElement;
    expect(img.src).toContain('/test/img_gen_001');
    expect(screen.queryByTestId('generate-placeholder')).not.toBeInTheDocument();
  });

  it('renders the done preview for a completed single-image step', () => {
    mockLatestStep.mockReturnValue(
      step({
        status: 'completed',
        images: [{ imageId: 'img_gen_001', width: 1024, height: 1024, mimeType: 'image/png' }],
      }),
    );
    render(
      <Wrapper>
        <GenerateNode {...makeProps({ prompt: 'anything' })} />
      </Wrapper>,
    );
    const img = screen.getByTestId('generative-image-preview-img') as HTMLImageElement;
    expect(img.src).toContain('/test/img_gen_001');
  });

  it('clicking the single-image preview opens a lightbox and stops propagation', () => {
    mockLatestStep.mockReturnValue(
      step({
        status: 'completed',
        images: [{ imageId: 'img_gen_001', width: 1024, height: 1024, mimeType: 'image/png' }],
      }),
    );
    const onMouseDown = vi.fn();
    const onClick = vi.fn();
    render(
      <Wrapper>
        <div onMouseDown={onMouseDown} onClick={onClick}>
          <GenerateNode {...makeProps({ prompt: 'anything' })} />
        </div>
      </Wrapper>,
    );
    const button = screen.getByTestId('generate-output-preview');
    fireEvent.mouseDown(button);
    fireEvent.click(button);
    expect(onMouseDown).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();

    const lightboxImg = screen.getByTestId('image-lightbox-img') as HTMLImageElement;
    expect(lightboxImg.src).toContain('/test/img_gen_001');
  });

  it('renders a NodeThumbStrip with ALL results when multiple images land', () => {
    mockLatestStep.mockReturnValue(
      step({
        status: 'completed',
        images: [
          { imageId: 'img_a', width: 512, height: 512, mimeType: 'image/png' },
          { imageId: 'img_b', width: 512, height: 512, mimeType: 'image/png' },
          { imageId: 'img_c', width: 512, height: 512, mimeType: 'image/png' },
        ],
      }),
    );
    render(
      <Wrapper>
        <GenerateNode {...makeProps({ prompt: 'anything' })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('generate-thumb-strip')).toBeInTheDocument();
    expect(screen.getByTestId('generate-thumb-strip-thumb-0')).toBeInTheDocument();
    expect(screen.getByTestId('generate-thumb-strip-thumb-2')).toBeInTheDocument();
    expect(screen.queryByTestId('generate-output-preview')).not.toBeInTheDocument();
  });

  it('uses the strip when numImages > 1 even while only the first image has landed', () => {
    mockLatestStep.mockReturnValue(
      step({
        status: 'running',
        images: [{ imageId: 'img_first', width: 512, height: 512, mimeType: 'image/png' }],
      }),
    );
    render(
      <Wrapper>
        <GenerateNode {...makeProps({ prompt: 'anything', numImages: 3 })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('generate-thumb-strip')).toBeInTheDocument();
    expect(screen.getByTestId('generate-thumb-strip-thumb-0')).toBeInTheDocument();
    expect(screen.queryByTestId('generate-thumb-strip-thumb-1')).not.toBeInTheDocument();
  });
});
