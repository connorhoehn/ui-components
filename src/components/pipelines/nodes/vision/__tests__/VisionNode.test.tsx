// src/components/pipelines/nodes/vision/__tests__/VisionNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VisionNode from '../VisionNode';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../../services/PipelineEditorServicesContext';

vi.mock('@xyflow/react', () => ({
  Handle: ({ id }: { id: string }) => <div data-testid={`handle-${id}`} />,
  Position: { Left: 'left', Right: 'right' },
}));

// useRetryFromStep and useLatestStepForNode both operate on PipelineRunsContext.
// Without the context provider, useLatestStepForNode returns null and
// useRetryFromStep returns a no-op. This is the expected "idle" state.

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

describe('VisionNode', () => {
  it('shows "Not configured" in body when no prompt is set', () => {
    render(
      <Wrapper>
        <VisionNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByText('Not configured')).toBeInTheDocument();
  });

  it('shows truncated prompt preview in body when userPrompt is set', () => {
    render(
      <Wrapper>
        <VisionNode {...makeProps({ userPrompt: 'Describe the image in detail.' })} />
      </Wrapper>,
    );
    expect(screen.getByText('Describe the image in detail.')).toBeInTheDocument();
  });

  it('shows no footer when there is no live step vision data', () => {
    render(
      <Wrapper>
        <VisionNode {...makeProps({ userPrompt: 'Classify this.' })} />
      </Wrapper>,
    );
    // No response/streaming footer rendered without live context data.
    expect(screen.queryByTestId('vision-cost')).not.toBeInTheDocument();
    expect(screen.queryByTestId('vision-awaiting')).not.toBeInTheDocument();
  });
});
