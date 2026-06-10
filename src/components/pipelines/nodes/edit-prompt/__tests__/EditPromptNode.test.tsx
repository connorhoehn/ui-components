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

const mockLatestStep = vi.fn(() => null);
vi.mock('../../../context/PipelineRunsContext', () => ({
  useLatestStepForNode: () => mockLatestStep(),
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

/* eslint-disable @typescript-eslint/no-explicit-any */
function step(overrides: Record<string, unknown>) {
  return { nodeId: 'node-edit-prompt', ...overrides } as any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

describe('EditPromptNode', () => {
  it('renders "No prompt set" placeholder when prompt is empty', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <EditPromptNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByTestId('edit-prompt-placeholder')).toBeInTheDocument();
    expect(screen.getByTestId('edit-prompt-placeholder').textContent).toBe('No prompt set');
    expect(screen.queryByTestId('generative-image-preview')).not.toBeInTheDocument();
  });

  it('shows prompt preview in placeholder when prompt is configured', () => {
    mockLatestStep.mockReturnValue(null);
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

  it('shows the synthesizing preview while running with no images yet', () => {
    mockLatestStep.mockReturnValue(
      step({ status: 'running', startedAt: new Date().toISOString() }),
    );
    render(
      <Wrapper>
        <EditPromptNode {...makeProps({ prompt: 'anything' })} />
      </Wrapper>,
    );
    const preview = screen.getByTestId('generative-image-preview');
    expect(preview.getAttribute('data-status')).toBe('synthesizing');
    expect(screen.getByTestId('generative-image-preview-elapsed')).toBeInTheDocument();
    expect(screen.queryByTestId('edit-prompt-placeholder')).not.toBeInTheDocument();
  });

  it('flips the SAME preview to done when the image lands (reveal path)', () => {
    mockLatestStep.mockReturnValue(
      step({ status: 'running', startedAt: new Date().toISOString() }),
    );
    const { rerender } = render(
      <Wrapper>
        <EditPromptNode {...makeProps({ prompt: 'anything' })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('generative-image-preview').getAttribute('data-status')).toBe(
      'synthesizing',
    );

    mockLatestStep.mockReturnValue(
      step({
        status: 'completed',
        images: [{ imageId: 'img_edit_001', width: 1024, height: 1024, mimeType: 'image/png' }],
      }),
    );
    rerender(
      <Wrapper>
        <EditPromptNode {...makeProps({ prompt: 'anything' })} />
      </Wrapper>,
    );

    expect(screen.getByTestId('generative-image-preview').getAttribute('data-status')).toBe(
      'done',
    );
    const img = screen.getByTestId('generative-image-preview-img') as HTMLImageElement;
    expect(img.src).toContain('/test/img_edit_001');
  });

  it('renders a NodeThumbStrip when the step produced multiple images', () => {
    mockLatestStep.mockReturnValue(
      step({
        status: 'completed',
        images: [
          { imageId: 'img_edit_a', width: 1024, height: 1024, mimeType: 'image/png' },
          { imageId: 'img_edit_b', width: 1024, height: 1024, mimeType: 'image/png' },
        ],
      }),
    );
    render(
      <Wrapper>
        <EditPromptNode {...makeProps({ prompt: 'anything' })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('edit-prompt-thumb-strip')).toBeInTheDocument();
    expect(screen.getByTestId('edit-prompt-thumb-strip-thumb-0')).toBeInTheDocument();
    expect(screen.getByTestId('edit-prompt-thumb-strip-thumb-1')).toBeInTheDocument();
    expect(screen.queryByTestId('edit-prompt-output-preview')).not.toBeInTheDocument();
  });
});
