// src/components/pipelines/nodes/generate/__tests__/GenerateNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import GenerateNode from '../GenerateNode';
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
    id: 'node-generate',
    data: { type: 'image:generate' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:generate' as const,
  } as Parameters<typeof GenerateNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

describe('GenerateNode', () => {
  it('renders "No prompt set" placeholder when prompt is empty', () => {
    render(
      <Wrapper>
        <GenerateNode {...makeProps()} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('generate-placeholder');
    expect(placeholder.textContent).toBe('No prompt set');
    expect(screen.queryByTestId('generate-output-thumb')).not.toBeInTheDocument();
  });

  it('shows prompt preview in placeholder when prompt is configured', () => {
    render(
      <Wrapper>
        <GenerateNode {...makeProps({ prompt: 'A golden sunset over the ocean.' })} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('generate-placeholder');
    expect(placeholder.textContent).toContain('golden sunset');
  });
});
