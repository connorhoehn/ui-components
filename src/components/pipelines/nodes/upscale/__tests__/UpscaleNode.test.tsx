// src/components/pipelines/nodes/upscale/__tests__/UpscaleNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import UpscaleNode from '../UpscaleNode';
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
    id: 'node-upscale',
    data: { type: 'image:upscale' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:upscale' as const,
  } as Parameters<typeof UpscaleNode>[0];
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
  return { nodeId: 'node-upscale', ...overrides } as any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

describe('UpscaleNode', () => {
  it('renders the subtitle, ai category and image-in / image-out / error handles', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <UpscaleNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByText('image:upscale')).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Upscale node/).getAttribute('data-node-category'),
    ).toBe('ai');
    expect(screen.getByTestId('handle-in')).toBeInTheDocument();
    expect(screen.getByTestId('handle-out')).toBeInTheDocument();
    expect(screen.getByTestId('handle-error')).toBeInTheDocument();
  });

  it('renders the maxEdge placeholder when no image has been produced', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <UpscaleNode {...makeProps({ maxEdge: 768 })} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('upscale-placeholder');
    expect(placeholder.textContent).toContain('768');
    expect(placeholder.textContent).toContain('4×');
    expect(screen.queryByTestId('upscale-output-thumb')).not.toBeInTheDocument();
  });

  it('shows an inline thumbnail using getImageUrl when liveStep produces an image', () => {
    mockLatestStep.mockReturnValue(
      step({
        status: 'completed',
        images: [{ imageId: 'img_up_001', width: 4096, height: 4096, mimeType: 'image/png' }],
      }),
    );
    render(
      <Wrapper>
        <UpscaleNode {...makeProps()} />
      </Wrapper>,
    );
    const img = screen.getByTestId('upscale-output-thumb') as HTMLImageElement;
    expect(img.src).toContain('/test/img_up_001');
    expect(screen.queryByTestId('upscale-placeholder')).not.toBeInTheDocument();
  });
});
