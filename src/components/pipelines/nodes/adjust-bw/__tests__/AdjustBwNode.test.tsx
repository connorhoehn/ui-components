// src/components/pipelines/nodes/adjust-bw/__tests__/AdjustBwNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdjustBwNode from '../AdjustBwNode';
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
    id: 'node-adjust-bw',
    data: { type: 'image:adjust-bw' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:adjust-bw' as const,
  } as Parameters<typeof AdjustBwNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

describe('AdjustBwNode', () => {
  it('renders "Awaiting input" placeholder when no image has been produced', () => {
    render(
      <Wrapper>
        <AdjustBwNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByTestId('adjust-bw-placeholder')).toBeInTheDocument();
    expect(screen.queryByTestId('adjust-bw-output-thumb')).not.toBeInTheDocument();
  });

  it('shows algorithm and contrast in footer with defaults', () => {
    render(
      <Wrapper>
        <AdjustBwNode {...makeProps()} />
      </Wrapper>,
    );
    const footer = screen.getByTestId('adjust-bw-footer');
    expect(footer.textContent).toContain('luminosity');
    expect(footer.textContent).toContain('1');
  });

  it('shows configured algorithm and contrast in footer', () => {
    render(
      <Wrapper>
        <AdjustBwNode {...makeProps({ algorithm: 'average', contrast: 1.4 })} />
      </Wrapper>,
    );
    const footer = screen.getByTestId('adjust-bw-footer');
    expect(footer.textContent).toContain('average');
    expect(footer.textContent).toContain('1.4');
  });
});
