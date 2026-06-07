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

describe('VariationNode', () => {
  it('renders "Awaiting input" placeholder when no image has been produced', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <VariationNode {...makeProps({ numVariations: 3 })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('variation-placeholder')).toBeInTheDocument();
    expect(screen.queryByTestId('variation-output-thumb')).not.toBeInTheDocument();
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

  it('renders the last-produced image thumbnail when the latest step has an image', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockLatestStep.mockReturnValue({
      nodeId: 'node-variation',
      status: 'completed',
      images: [
        { imageId: 'img_var_001', width: 1024, height: 1024, mimeType: 'image/png' },
      ],
    } as any);
    render(
      <Wrapper>
        <VariationNode {...makeProps({ numVariations: 2 })} />
      </Wrapper>,
    );
    const thumb = screen.getByTestId('variation-output-thumb');
    expect(thumb).toBeInTheDocument();
    const img = thumb.querySelector('img') as HTMLImageElement;
    expect(img.src).toContain('/test/img_var_001');
    expect(screen.queryByTestId('variation-placeholder')).not.toBeInTheDocument();
  });
});
