// src/components/pipelines/nodes/vision-tag/__tests__/VisionTagNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VisionTagNode from '../VisionTagNode';
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
    id: 'node-vision-tag',
    data: { type: 'image:vision-tag' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:vision-tag' as const,
  } as Parameters<typeof VisionTagNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

describe('VisionTagNode', () => {
  it('shows "Open-vocabulary tagging" when no candidateTags are configured', () => {
    render(
      <Wrapper>
        <VisionTagNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByText('Open-vocabulary tagging')).toBeInTheDocument();
    expect(screen.queryByTestId('tag-pills')).not.toBeInTheDocument();
  });

  it('shows candidate tags preview when candidateTags are configured', () => {
    render(
      <Wrapper>
        <VisionTagNode {...makeProps({ candidateTags: ['sunset', 'mountain', 'snow'] })} />
      </Wrapper>,
    );
    expect(screen.getByText(/Candidates: sunset, mountain, snow/)).toBeInTheDocument();
  });

  it('renders no tag pills when no live step output is available', () => {
    render(
      <Wrapper>
        <VisionTagNode {...makeProps({ candidateTags: ['nature'] })} />
      </Wrapper>,
    );
    // Without PipelineRunsContext, tags come from liveStep which is null.
    expect(screen.queryByTestId('tag-pills')).not.toBeInTheDocument();
  });
});
