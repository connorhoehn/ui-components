// src/components/pipelines/nodes/vision-extract-text/__tests__/VisionExtractTextNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VisionExtractTextNode from '../VisionExtractTextNode';
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
    id: 'node-vision-extract-text',
    data: { type: 'image:vision-extract-text' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:vision-extract-text' as const,
  } as Parameters<typeof VisionExtractTextNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

describe('VisionExtractTextNode', () => {
  it('renders "Awaiting OCR" when no live step output is available', () => {
    render(
      <Wrapper>
        <VisionExtractTextNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByText('Awaiting OCR')).toBeInTheDocument();
    expect(screen.queryByTestId('extract-text-result')).not.toBeInTheDocument();
  });

  it('does not render extract-text-result when there is no liveStep', () => {
    render(
      <Wrapper>
        <VisionExtractTextNode {...makeProps({ model: 'claude-sonnet-4-6' })} />
      </Wrapper>,
    );
    expect(screen.queryByTestId('extract-text-result')).not.toBeInTheDocument();
    expect(screen.queryByTestId('extract-text-first-line')).not.toBeInTheDocument();
  });
});
