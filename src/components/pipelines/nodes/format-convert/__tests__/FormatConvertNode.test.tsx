// src/components/pipelines/nodes/format-convert/__tests__/FormatConvertNode.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormatConvertNode from '../FormatConvertNode';
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
    id: 'node-format-convert',
    data: { type: 'image:format-convert' as const, ...overrides },
    selected: false,
    dragging: false,
    isConnectable: true,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    zIndex: 0,
    type: 'image:format-convert' as const,
  } as Parameters<typeof FormatConvertNode>[0];
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <PipelineEditorServicesProvider services={stubServices}>
      {children}
    </PipelineEditorServicesProvider>
  );
}

describe('FormatConvertNode', () => {
  it('renders "No format set" placeholder when format is not configured', () => {
    render(
      <Wrapper>
        <FormatConvertNode {...makeProps()} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('format-convert-placeholder');
    expect(placeholder.textContent).toBe('No format set');
    expect(screen.queryByTestId('format-convert-output-thumb')).not.toBeInTheDocument();
  });

  it('shows format chip label including quality when format and quality are set', () => {
    render(
      <Wrapper>
        <FormatConvertNode {...makeProps({ format: 'jpeg', quality: 80 })} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('format-convert-placeholder');
    expect(placeholder.textContent).toContain('JPEG');
    expect(placeholder.textContent).toContain('q80');
  });

  it('shows "lossless" label for lossless formats', () => {
    render(
      <Wrapper>
        <FormatConvertNode {...makeProps({ format: 'webp', lossless: true })} />
      </Wrapper>,
    );
    const placeholder = screen.getByTestId('format-convert-placeholder');
    expect(placeholder.textContent).toContain('WEBP');
    expect(placeholder.textContent).toContain('lossless');
  });
});
