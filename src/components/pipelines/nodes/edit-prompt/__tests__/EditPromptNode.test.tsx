// src/components/pipelines/nodes/edit-prompt/__tests__/EditPromptNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import EditPromptNode from '../EditPromptNode';
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
    id: 'node-edit-prompt',
    data: { type: 'image:edit-prompt' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:edit-prompt' as const,
  } as Parameters<typeof EditPromptNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

describe('EditPromptNode', () => {
  it('renders "No prompt set" placeholder when prompt is empty', () => {
    render(
      <Wrapper>
        <EditPromptNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByTestId('edit-prompt-placeholder')).toBeInTheDocument();
    expect(screen.getByTestId('edit-prompt-placeholder').textContent).toBe('No prompt set');
    expect(screen.queryByTestId('edit-prompt-output-thumb')).not.toBeInTheDocument();
  });

  it('shows prompt preview in placeholder when prompt is configured', () => {
    render(
      <Wrapper>
        <EditPromptNode
          {...makeProps({ prompt: 'Replace the background with a sunny beach.' })}
        />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('edit-prompt-placeholder');
    expect(placeholder.textContent).toContain('Replace the background');
  });
});
