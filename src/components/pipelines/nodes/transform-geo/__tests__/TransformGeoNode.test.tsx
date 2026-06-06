// src/components/pipelines/nodes/transform-geo/__tests__/TransformGeoNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TransformGeoNode from '../TransformGeoNode';
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
    id: 'node-transform-geo',
    data: { type: 'image:transform' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:transform' as const,
  } as Parameters<typeof TransformGeoNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

describe('TransformGeoNode', () => {
  it('renders "No ops configured" placeholder when operations list is empty', () => {
    render(
      <Wrapper>
        <TransformGeoNode {...makeProps({ operations: [] })} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('transform-geo-placeholder');
    expect(placeholder.textContent).toBe('No ops configured');
    expect(screen.queryByTestId('transform-geo-output-thumb')).not.toBeInTheDocument();
  });

  it('shows ops preview in placeholder when operations are configured', () => {
    render(
      <Wrapper>
        <TransformGeoNode
          {...makeProps({
            operations: [
              { op: 'rotate', degrees: 90 },
              { op: 'flip' },
            ],
          })}
        />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('transform-geo-placeholder');
    expect(placeholder.textContent).toContain('rotate 90');
    expect(placeholder.textContent).toContain('flip');
  });
});
