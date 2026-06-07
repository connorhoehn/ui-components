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

// Mock the runs context hook so individual tests can drive the live-step path.
const mockLatestStep = vi.fn(() => null);
vi.mock('../../../context/PipelineRunsContext', () => ({
  useLatestStepForNode: () => mockLatestStep(),
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
    mockLatestStep.mockReturnValue(null);
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
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <GenerateNode {...makeProps({ prompt: 'A golden sunset over the ocean.' })} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('generate-placeholder');
    expect(placeholder.textContent).toContain('golden sunset');
  });

  it('renders the last-produced image thumbnail when the latest step has an image', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockLatestStep.mockReturnValue({
      nodeId: 'node-generate',
      status: 'completed',
      images: [
        { imageId: 'img_gen_001', width: 1024, height: 1024, mimeType: 'image/png' },
      ],
    } as any);
    render(
      <Wrapper>
        <GenerateNode {...makeProps({ prompt: 'anything' })} />
      </Wrapper>,
    );
    const thumb = screen.getByTestId('generate-output-thumb');
    expect(thumb).toBeInTheDocument();
    const img = thumb.querySelector('img') as HTMLImageElement;
    expect(img.src).toContain('/test/img_gen_001');
    expect(screen.queryByTestId('generate-placeholder')).not.toBeInTheDocument();
  });
});
