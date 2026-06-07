// src/components/pipelines/vision/__tests__/VisionPromptBench.test.tsx
//
// Tests:
//   - render empty (no image, empty prompts)
//   - click Try with image + prompt → fetch fired with right body → result renders
//   - save button writes back via onSave callback

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import VisionPromptBench from '../VisionPromptBench';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../services/PipelineEditorServicesContext';
import type { UploadedImage } from '../../services/PipelineEditorServicesContext';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// Mock ImageUploader so we can control uploaded image without real file I/O
vi.mock('../../../image/ImageUploader', () => ({
  ImageUploader: ({
    value,
    onChange,
    'data-testid': testId,
  }: {
    value: UploadedImage | null;
    onChange: (img: UploadedImage | null) => void;
    'data-testid'?: string;
  }) => (
    <div data-testid={testId ?? 'image-uploader'}>
      {value ? (
        <span data-testid="uploader-has-image">{value.imageId}</span>
      ) : (
        <button
          data-testid="uploader-trigger"
          onClick={() =>
            onChange({
              imageId: 'mock-img-id',
              width: 100,
              height: 100,
              mimeType: 'image/png',
              sizeBytes: 1000,
            })
          }
        >
          Upload
        </button>
      )}
    </div>
  ),
}));

// Mock VisionResultViewer to avoid deep rendering
vi.mock('../VisionResultViewer', () => ({
  VisionResultViewer: ({ result }: { result: { caption?: string } }) => (
    <div data-testid="mock-vision-viewer">{result.caption}</div>
  ),
}));

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.unstubAllGlobals();
  mockFetch.mockReset();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const services: PipelineEditorServices = {
  getImageUrl: (id: string) => `https://cdn.example.com/${id}`,
};

function renderBench(props: Partial<React.ComponentProps<typeof VisionPromptBench>> = {}) {
  const onSave = vi.fn();
  const utils = render(
    <PipelineEditorServicesProvider services={services}>
      <VisionPromptBench
        systemPrompt=""
        userPrompt=""
        onSave={onSave}
        {...props}
      />
    </PipelineEditorServicesProvider>,
  );
  return { ...utils, onSave };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('VisionPromptBench', () => {
  it('renders in empty state with Try button disabled-looking and no result panel', () => {
    renderBench();
    expect(screen.getByTestId('vision-prompt-bench')).toBeInTheDocument();
    expect(screen.getByTestId('bench-try-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('bench-result')).not.toBeInTheDocument();
  });

  it('shows error when Try is clicked without an image', async () => {
    renderBench();
    fireEvent.click(screen.getByTestId('bench-try-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('bench-error')).toHaveTextContent(/image/i);
    });
  });

  it('fires fetch with correct body when Try is clicked with image + prompt', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        caption: 'A mountain landscape.',
        usage: { inputTokens: 100, outputTokens: 50 },
        latencyMs: 200,
        costUsd: 0.0012,
      }),
    });

    renderBench({ userPrompt: 'Describe this image.' });

    // Upload an image via the mock uploader
    fireEvent.click(screen.getByTestId('uploader-trigger'));

    // Click Try
    await act(async () => {
      fireEvent.click(screen.getByTestId('bench-try-btn'));
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/pipeline/preview/vision'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('Describe this image.'),
        }),
      );
    });

    // Result panel appears
    await waitFor(() => {
      expect(screen.getByTestId('bench-result')).toBeInTheDocument();
    });
    expect(screen.getByTestId('mock-vision-viewer')).toHaveTextContent('A mountain landscape.');
  });

  it('save button calls onSave with current prompt values', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        caption: 'A test caption.',
        usage: { inputTokens: 80, outputTokens: 30 },
        latencyMs: 150,
        costUsd: 0.0005,
      }),
    });

    const { onSave } = renderBench({
      systemPrompt: 'You analyze images.',
      userPrompt: 'What is in this image?',
    });

    // Upload + run to get result panel visible
    fireEvent.click(screen.getByTestId('uploader-trigger'));
    await act(async () => {
      fireEvent.click(screen.getByTestId('bench-try-btn'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('bench-save-btn')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('bench-save-btn'));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        systemPrompt: 'You analyze images.',
        userPrompt: 'What is in this image?',
      }),
    );
  });
});
