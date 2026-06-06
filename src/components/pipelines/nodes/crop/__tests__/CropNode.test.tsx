// src/components/pipelines/nodes/crop/__tests__/CropNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CropNode from '../CropNode';
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
    id: 'node-crop',
    data: { type: 'image:crop' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:crop' as const,
  } as Parameters<typeof CropNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

describe('CropNode', () => {
  it('renders "No crop yet" placeholder when no liveStep image is produced', () => {
    render(
      <Wrapper>
        <CropNode {...makeProps({ sourceImagePath: '$.trigger.imageRef', bboxPath: '$.steps.vision.output.bbox' })} />
      </Wrapper>,
    );
    expect(screen.getByTestId('crop-placeholder')).toBeInTheDocument();
    expect(screen.queryByTestId('crop-output-thumb')).not.toBeInTheDocument();
    expect(screen.queryByTestId('crop-bbox-coords')).not.toBeInTheDocument();
  });

  it('does not show bbox footer when no step output is available', () => {
    render(
      <Wrapper>
        <CropNode {...makeProps()} />
      </Wrapper>,
    );
    expect(screen.queryByTestId('crop-bbox-coords')).not.toBeInTheDocument();
  });
});
