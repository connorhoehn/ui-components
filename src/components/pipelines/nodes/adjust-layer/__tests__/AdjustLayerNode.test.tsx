// src/components/pipelines/nodes/adjust-layer/__tests__/AdjustLayerNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdjustLayerNode from '../AdjustLayerNode';
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
    id: 'node-adjust-layer',
    data: { type: 'image:adjust-layer' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:adjust-layer' as const,
  } as Parameters<typeof AdjustLayerNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

describe('AdjustLayerNode', () => {
  it('renders "Awaiting input" placeholder when no layers are configured', () => {
    render(
      <Wrapper>
        <AdjustLayerNode {...makeProps({ layers: [] })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('adjust-layer-placeholder')).toBeInTheDocument();
    expect(screen.queryByTestId('adjust-layer-chips')).not.toBeInTheDocument();
    expect(screen.queryByTestId('adjust-layer-output-thumb')).not.toBeInTheDocument();
  });

  it('renders chips for each configured layer', () => {
    render(
      <Wrapper>
        <AdjustLayerNode
          {...makeProps({
            layers: [
              { kind: 'brightness', value: 1.2 },
              { kind: 'contrast', value: 0.8 },
            ],
          })}
        />
      </Wrapper>,
    );
    const chips = screen.getByTestId('adjust-layer-chips');
    expect(chips).toBeInTheDocument();
    expect(chips.textContent).toContain('brightness');
    expect(chips.textContent).toContain('contrast');
  });

  it('shows layer count in footer', () => {
    render(
      <Wrapper>
        <AdjustLayerNode
          {...makeProps({
            layers: [{ kind: 'blur', radiusPx: 2 }],
          })}
        />
      </Wrapper>,
    );
    const footer = screen.getByTestId('adjust-layer-footer');
    expect(footer.textContent).toContain('1 layer');
  });
});
