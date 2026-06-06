// src/components/pipelines/nodes/vision-describe/__tests__/VisionDescribeNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VisionDescribeNode from '../VisionDescribeNode';
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
    id: 'node-vision-describe',
    data: { type: 'image:vision-describe' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:vision-describe' as const,
  } as Parameters<typeof VisionDescribeNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

describe('VisionDescribeNode', () => {
  it('shows "No prompt set" when no userPrompt is configured', () => {
    render(
      <Wrapper>
        <VisionDescribeNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByText('No prompt set')).toBeInTheDocument();
    expect(screen.queryByTestId('describe-caption')).not.toBeInTheDocument();
  });

  it('shows userPrompt preview in body when configured', () => {
    render(
      <Wrapper>
        <VisionDescribeNode {...makeProps({ userPrompt: 'Describe the scene.' })} />
      </Wrapper>,
    );
    expect(screen.getByText('Describe the scene.')).toBeInTheDocument();
  });
});
