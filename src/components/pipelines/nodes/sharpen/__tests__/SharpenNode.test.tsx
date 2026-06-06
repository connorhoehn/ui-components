// src/components/pipelines/nodes/sharpen/__tests__/SharpenNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SharpenNode from '../SharpenNode';
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
    id: 'node-sharpen',
    data: { type: 'image:sharpen' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:sharpen' as const,
  } as Parameters<typeof SharpenNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

describe('SharpenNode', () => {
  it('renders default sigma placeholder when sigma is not configured', () => {
    render(
      <Wrapper>
        <SharpenNode {...makeProps()} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('sharpen-placeholder');
    expect(placeholder.textContent).toContain('default');
    expect(screen.queryByTestId('sharpen-output-thumb')).not.toBeInTheDocument();
  });

  it('shows sigma value in placeholder when sigma is configured', () => {
    render(
      <Wrapper>
        <SharpenNode {...makeProps({ sigma: 1.5 })} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('sharpen-placeholder');
    expect(placeholder.textContent).toContain('1.5');
  });
});
