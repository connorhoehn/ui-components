import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  PipelineEditorServicesProvider,
  useImageUrl,
  usePipelineEditorServices,
  type PipelineEditorServices,
} from '../PipelineEditorServicesContext';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function ImageUrlConsumer() {
  const getImageUrl = useImageUrl();
  return <div data-testid="url">{getImageUrl('img_abc')}</div>;
}

function ServicesConsumer() {
  const svc = usePipelineEditorServices();
  return (
    <div>
      <div data-testid="url">{svc.getImageUrl('img_xyz')}</div>
      <div data-testid="has-upload">{String(typeof svc.uploadImage === 'function')}</div>
    </div>
  );
}

const stubServices: PipelineEditorServices = {
  getImageUrl: (id) => `/test/${id}`,
  uploadImage: vi.fn(),
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useImageUrl', () => {
  it('throws when called outside a provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<ImageUrlConsumer />)).toThrow(
      'useImageUrl must be called inside <PipelineEditorServicesProvider>',
    );
    consoleError.mockRestore();
  });

  it('returns the passed getImageUrl function inside a provider', () => {
    render(
      <PipelineEditorServicesProvider services={stubServices}>
        <ImageUrlConsumer />
      </PipelineEditorServicesProvider>,
    );
    expect(screen.getByTestId('url').textContent).toBe('/test/img_abc');
  });
});

describe('usePipelineEditorServices', () => {
  it('throws when called outside a provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<ServicesConsumer />)).toThrow(
      'usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>',
    );
    consoleError.mockRestore();
  });

  it('returns the full services object inside a provider', () => {
    render(
      <PipelineEditorServicesProvider services={stubServices}>
        <ServicesConsumer />
      </PipelineEditorServicesProvider>,
    );
    expect(screen.getByTestId('url').textContent).toBe('/test/img_xyz');
    expect(screen.getByTestId('has-upload').textContent).toBe('true');
  });
});
