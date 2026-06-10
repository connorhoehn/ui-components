// src/components/pipelines/nodes/vision/__tests__/VisionNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VisionNode from '../VisionNode';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../../services/PipelineEditorServicesContext';

vi.mock('@xyflow/react', () => ({
  Handle: ({ id }: { id: string }) => <div data-testid={`handle-${id}`} />,
  Position: { Left: 'left', Right: 'right' },
}));

// Mock the runs-context module so tests can drive the live-step path.
// useRetryFromStep must also be provided since VisionNode imports it.
const mockLatestStep = vi.fn(() => null);
vi.mock('../../../context/PipelineRunsContext', () => ({
  useLatestStepForNode: () => mockLatestStep(),
  useRetryFromStep: () => async () => {},
}));

const stubServices: PipelineEditorServices = {
  getImageUrl: (id) => `/test/${id}`,
};

function makeProps(overrides: Record<string, unknown> = {}) {
  return {
    id: 'node-vision',
    data: { type: 'image:vision-analyze' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:vision-analyze' as const,
  } as Parameters<typeof VisionNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function visionStep(vision: Record<string, unknown>, status = 'completed') {
  return { nodeId: 'node-vision', status, vision } as any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

describe('VisionNode', () => {
  it('shows "Not configured" in body when no prompt is set', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <VisionNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByText('Not configured')).toBeInTheDocument();
  });

  it('shows truncated prompt preview in body when userPrompt is set', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <VisionNode {...makeProps({ userPrompt: 'Describe the image in detail.' })} />
      </Wrapper>,
    );
    expect(screen.getByText('Describe the image in detail.')).toBeInTheDocument();
  });

  it('shows no footer when there is no live step vision data', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <VisionNode {...makeProps({ userPrompt: 'Classify this.' })} />
      </Wrapper>,
    );
    // No response/streaming footer rendered without live context data.
    expect(screen.queryByTestId('vision-cost')).not.toBeInTheDocument();
    expect(screen.queryByTestId('vision-awaiting')).not.toBeInTheDocument();
  });

  it('renders the input thumb at a fixed size and keeps token/cost UI', () => {
    mockLatestStep.mockReturnValue(
      visionStep({
        response: 'A cat on a sofa.',
        tokensIn: 100,
        tokensOut: 12,
        tokensSeen: 12,
        analyzed: true,
        imageId: 'img_input_001',
        costUsd: 0.0042,
      }),
    );
    render(
      <Wrapper>
        <VisionNode {...makeProps({ userPrompt: 'Describe.' })} />
      </Wrapper>,
    );
    const thumb = screen.getByTestId('vision-input-thumb') as HTMLImageElement;
    expect(thumb.src).toContain('/test/img_input_001');
    expect(screen.getByTestId('vision-cost').textContent).toContain('$0.004');
    expect(screen.getByText(/100 → 12 tokens/)).toBeInTheDocument();
  });

  it('clicking the input thumb opens an ImageLightbox (no inline resize) and stops propagation', () => {
    mockLatestStep.mockReturnValue(
      visionStep({
        response: 'A cat on a sofa.',
        tokensSeen: 12,
        analyzed: true,
        imageId: 'img_input_001',
      }),
    );
    const onMouseDown = vi.fn();
    const onClick = vi.fn();
    render(
      <Wrapper>
        <div onMouseDown={onMouseDown} onClick={onClick}>
          <VisionNode {...makeProps({ userPrompt: 'Describe.' })} />
        </div>
      </Wrapper>,
    );

    const thumbButton = screen.getByRole('button', { name: 'View vision input image' });
    fireEvent.mouseDown(thumbButton);
    fireEvent.click(thumbButton);
    expect(onMouseDown).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();

    const lightbox = screen.getByTestId('image-lightbox');
    expect(lightbox).toBeInTheDocument();
    const img = screen.getByTestId('image-lightbox-img') as HTMLImageElement;
    expect(img.src).toContain('/test/img_input_001');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('image-lightbox')).not.toBeInTheDocument();
  });

  it('keeps the streaming indicator while tokens are arriving', () => {
    mockLatestStep.mockReturnValue(
      visionStep(
        { response: 'A ca', tokensSeen: 2, analyzed: false, imageId: 'img_input_001' },
        'running',
      ),
    );
    render(
      <Wrapper>
        <VisionNode {...makeProps({ userPrompt: 'Describe.' })} />
      </Wrapper>,
    );
    expect(screen.getByText(/streaming…/)).toBeInTheDocument();
  });
});
