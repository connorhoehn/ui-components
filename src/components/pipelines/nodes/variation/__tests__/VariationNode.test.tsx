// src/components/pipelines/nodes/variation/__tests__/VariationNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VariationNode from '../VariationNode';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../../services/PipelineEditorServicesContext';

vi.mock('@xyflow/react', () => ({
  Handle: ({ id }: { id: string }) => <div data-testid={`handle-${id}`} />,
  Position: { Left: 'left', Right: 'right' },
}));

const mockLatestStep = vi.fn(() => null);
vi.mock('../../../context/PipelineRunsContext', () => ({
  useLatestStepForNode: () => mockLatestStep(),
}));

const stubServices: PipelineEditorServices = {
  getImageUrl: (id) => `/test/${id}`,
};

function makeProps(overrides: Record<string, unknown> = {}) {
  return {
    id: 'node-variation',
    data: { type: 'image:variation' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:variation' as const,
  } as Parameters<typeof VariationNode>[0];
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
  return { nodeId: 'node-variation', ...overrides } as any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

describe('VariationNode', () => {
  it('renders "Awaiting input" placeholder when no image has been produced', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <VariationNode {...makeProps({ numVariations: 3 })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('variation-placeholder')).toBeInTheDocument();
    expect(screen.queryByTestId('variation-thumb-strip')).not.toBeInTheDocument();
    expect(screen.queryByTestId('generative-image-preview')).not.toBeInTheDocument();
  });

  it('shows the variation count badge reflecting numVariations', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <VariationNode {...makeProps({ numVariations: 4 })} />
      </Wrapper>,
    );
    expect(screen.getByText('×4 variations')).toBeInTheDocument();
  });

  it('shows the synthesizing preview while running with no images yet', () => {
    mockLatestStep.mockReturnValue(
      step({ status: 'running', startedAt: new Date().toISOString() }),
    );
    render(
      <Wrapper>
        <VariationNode {...makeProps({ numVariations: 3 })} />
      </Wrapper>,
    );
    const preview = screen.getByTestId('generative-image-preview');
    expect(preview.getAttribute('data-status')).toBe('synthesizing');
    expect(screen.getByTestId('generative-image-preview-elapsed')).toBeInTheDocument();
    expect(screen.queryByTestId('variation-placeholder')).not.toBeInTheDocument();
  });

  it('renders the done preview for a single-variation completed step', () => {
    mockLatestStep.mockReturnValue(
      step({
        status: 'completed',
        images: [{ imageId: 'img_var_001', width: 1024, height: 1024, mimeType: 'image/png' }],
      }),
    );
    render(
      <Wrapper>
        <VariationNode {...makeProps({ numVariations: 1 })} />
      </Wrapper>,
    );
    const img = screen.getByTestId('generative-image-preview-img') as HTMLImageElement;
    expect(img.src).toContain('/test/img_var_001');
    expect(screen.queryByTestId('variation-thumb-strip')).not.toBeInTheDocument();
  });

  it('renders a NodeThumbStrip over ALL results when fan-out images land', () => {
    mockLatestStep.mockReturnValue(
      step({
        status: 'completed',
        images: [
          { imageId: 'img_var_a', width: 1024, height: 1024, mimeType: 'image/png' },
          { imageId: 'img_var_b', width: 1024, height: 1024, mimeType: 'image/png' },
        ],
      }),
    );
    render(
      <Wrapper>
        <VariationNode {...makeProps({ numVariations: 2 })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('variation-thumb-strip')).toBeInTheDocument();
    expect(screen.getByTestId('variation-thumb-strip-thumb-0')).toBeInTheDocument();
    expect(screen.getByTestId('variation-thumb-strip-thumb-1')).toBeInTheDocument();
    expect(screen.queryByTestId('variation-output-preview')).not.toBeInTheDocument();
  });

  it('uses the strip when numVariations > 1 even with a single image landed so far', () => {
    mockLatestStep.mockReturnValue(
      step({
        status: 'running',
        images: [{ imageId: 'img_var_first', width: 1024, height: 1024, mimeType: 'image/png' }],
      }),
    );
    render(
      <Wrapper>
        <VariationNode {...makeProps({ numVariations: 3 })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('variation-thumb-strip')).toBeInTheDocument();
    expect(screen.getByTestId('variation-thumb-strip-thumb-0')).toBeInTheDocument();
  });
});
