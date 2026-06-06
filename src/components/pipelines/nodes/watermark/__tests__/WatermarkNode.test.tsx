// src/components/pipelines/nodes/watermark/__tests__/WatermarkNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import WatermarkNode from '../WatermarkNode';
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
    id: 'node-watermark',
    data: { type: 'image:watermark' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:watermark' as const,
  } as Parameters<typeof WatermarkNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

describe('WatermarkNode', () => {
  it('renders "No overlay image set" when overlayImageId is absent', () => {
    render(
      <Wrapper>
        <WatermarkNode {...makeProps()} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('watermark-placeholder');
    expect(placeholder.textContent).toBe('No overlay image set');
    expect(screen.queryByTestId('watermark-output-thumb')).not.toBeInTheDocument();
  });

  it('shows gravity and opacity in placeholder when overlayImageId is configured', () => {
    render(
      <Wrapper>
        <WatermarkNode
          {...makeProps({ overlayImageId: 'img_logo', gravity: 'northwest', opacity: 0.5 })}
        />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('watermark-placeholder');
    expect(placeholder.textContent).toContain('northwest');
    expect(placeholder.textContent).toContain('50%');
  });
});
