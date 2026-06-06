// src/components/pipelines/nodes/vision-classify/__tests__/VisionClassifyNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VisionClassifyNode from '../VisionClassifyNode';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../../services/PipelineEditorServicesContext';

vi.mock('@xyflow/react', () => ({
  Handle: ({ id }: { id: string }) => <div data-testid={`handle-${id}`} />,
  Position: { Left: 'left', Right: 'right' },
}));

const stubServices: PipelineEditorServices = {
  getImageUrl: (id) => `/test/${id}`,
};

function makeProps(overrides: Record<string, unknown> = {}) {
  return {
    id: 'node-vision-classify',
    data: { type: 'image:vision-classify' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:vision-classify' as const,
  } as Parameters<typeof VisionClassifyNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

describe('VisionClassifyNode', () => {
  it('renders "No labels configured" when no labels are set', () => {
    render(
      <Wrapper>
        <VisionClassifyNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByText('No labels configured')).toBeInTheDocument();
    expect(screen.queryByTestId('classify-label')).not.toBeInTheDocument();
  });

  it('renders a preview of the configured labels', () => {
    render(
      <Wrapper>
        <VisionClassifyNode {...makeProps({ labels: ['cat', 'dog', 'bird'] })} />
      </Wrapper>,
    );
    expect(screen.getByText(/Labels: cat, dog, bird/)).toBeInTheDocument();
  });

  it('renders no label badge when no live step output is available', () => {
    render(
      <Wrapper>
        <VisionClassifyNode {...makeProps({ labels: ['cat'] })} />
      </Wrapper>,
    );
    // Without PipelineRunsContext, liveStep is null and output is undefined.
    expect(screen.queryByTestId('classify-label')).not.toBeInTheDocument();
    expect(screen.queryByTestId('classify-confidence')).not.toBeInTheDocument();
  });
});
