// src/components/pipelines/nodes/dimensions/__tests__/DimensionsNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DimensionsNode from '../DimensionsNode';
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
    id: 'node-dimensions',
    data: { type: 'image:dimensions' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:dimensions' as const,
  } as Parameters<typeof DimensionsNode>[0];
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
  return { nodeId: 'node-dimensions', ...overrides } as any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

describe('DimensionsNode', () => {
  it('renders the subtitle, transform category and image-in / data-out / error handles', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <DimensionsNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.getByText('image:dimensions')).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Dimensions node/).getAttribute('data-node-category'),
    ).toBe('transform');
    expect(screen.getByTestId('handle-in')).toBeInTheDocument();
    expect(screen.getByTestId('handle-out')).toBeInTheDocument();
    expect(screen.getByTestId('handle-error')).toBeInTheDocument();
  });

  it('renders the "reads image size" placeholder when there is no live output', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <DimensionsNode {...makeProps()} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('dimensions-placeholder');
    expect(placeholder.textContent).toBe('reads image size');
    expect(screen.queryByTestId('dimensions-output')).not.toBeInTheDocument();
  });

  it('shows the derived genWidth×genHeight (and src dims) once a live step has output', () => {
    mockLatestStep.mockReturnValue(
      step({
        status: 'completed',
        output: { width: 2000, height: 1500, aspectRatio: 1.333, genWidth: 1024, genHeight: 768 },
      }),
    );
    render(
      <Wrapper>
        <DimensionsNode {...makeProps()} />
      </Wrapper>,
    );
    const out = screen.getByTestId('dimensions-output');
    expect(out.textContent).toContain('1024×768');
    expect(out.textContent).toContain('2000×1500');
    expect(screen.queryByTestId('dimensions-placeholder')).not.toBeInTheDocument();
  });

  it('shows the maxEdge target in the footer', () => {
    mockLatestStep.mockReturnValue(null);
    render(
      <Wrapper>
        <DimensionsNode {...makeProps({ maxEdge: 768 })} />
      </Wrapper>,
    );
    expect(screen.getByText('maxEdge 768')).toBeInTheDocument();
  });
});
