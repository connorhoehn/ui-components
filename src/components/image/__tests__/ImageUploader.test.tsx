import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ImageUploader } from '../ImageUploader';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
  type UploadedImage,
} from '../../pipelines/services';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SAMPLE_RESULT: UploadedImage = {
  imageId: 'img_abc',
  width: 300,
  height: 200,
  mimeType: 'image/jpeg',
  sizeBytes: 4096,
};

function makeFile(name: string, size = 100, type = 'image/jpeg'): File {
  return new File(['x'.repeat(size)], name, { type });
}

function makeServices(
  overrides: Partial<PipelineEditorServices> = {},
): PipelineEditorServices {
  return {
    getImageUrl: (id) => `https://cdn.example.com/${id}`,
    uploadImage: vi.fn(async () => SAMPLE_RESULT),
    ...overrides,
  };
}

function renderUploader(
  props: Partial<React.ComponentProps<typeof ImageUploader>> & {
    services?: PipelineEditorServices;
  } = {},
) {
  const { services, ...uploaderProps } = props;
  const svc = services ?? makeServices();
  const onChange = uploaderProps.onChange ?? vi.fn();

  const result = render(
    <PipelineEditorServicesProvider services={svc}>
      <ImageUploader
        value={null}
        onChange={onChange}
        data-testid="uploader"
        {...uploaderProps}
      />
    </PipelineEditorServicesProvider>,
  );
  return { ...result, onChange, svc };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ImageUploader — empty state', () => {
  it('renders both file-drop and URL input by default', () => {
    renderUploader();
    expect(screen.getByTestId('uploader-drop')).toBeInTheDocument();
    expect(screen.getByTestId('uploader-url-input')).toBeInTheDocument();
    expect(screen.getByTestId('uploader-fetch-btn')).toBeInTheDocument();
  });
});

describe('ImageUploader — file upload', () => {
  it('calls uploadImage with the dropped file then fires onChange', async () => {
    const uploadImage = vi.fn(async () => SAMPLE_RESULT);
    const onChange = vi.fn();
    const svc = makeServices({ uploadImage });
    renderUploader({ services: svc, onChange });

    const zone = screen.getByRole('button', { name: /upload/i });
    const file = makeFile('photo.jpg');

    await act(async () => {
      fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    });

    await waitFor(() => expect(uploadImage).toHaveBeenCalledWith(file));
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(SAMPLE_RESULT));
  });
});

describe('ImageUploader — URL fetch', () => {
  it('calls uploadImage with a url object then fires onChange', async () => {
    const uploadImage = vi.fn(async () => SAMPLE_RESULT);
    const onChange = vi.fn();
    const svc = makeServices({ uploadImage });
    renderUploader({ services: svc, onChange });

    const input = screen.getByTestId('uploader-url-input');
    fireEvent.change(input, { target: { value: 'https://example.com/img.jpg' } });

    await act(async () => {
      fireEvent.click(screen.getByTestId('uploader-fetch-btn'));
    });

    await waitFor(() =>
      expect(uploadImage).toHaveBeenCalledWith({ url: 'https://example.com/img.jpg' }),
    );
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(SAMPLE_RESULT));
  });
});

describe('ImageUploader — error state', () => {
  it('shows error banner when uploadImage rejects', async () => {
    const uploadImage = vi.fn(async () => {
      throw new Error('Upload failed');
    });
    const svc = makeServices({ uploadImage });
    renderUploader({ services: svc });

    const zone = screen.getByRole('button', { name: /upload/i });
    const file = makeFile('bad.jpg');

    await act(async () => {
      fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    });

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Upload failed'),
    );
  });
});

describe('ImageUploader — with value', () => {
  it('renders thumbnail and Replace button when value is set', () => {
    const svc = makeServices();
    render(
      <PipelineEditorServicesProvider services={svc}>
        <ImageUploader
          value={{ imageId: 'img_abc', width: 300, height: 200, mimeType: 'image/jpeg' }}
          onChange={vi.fn()}
          data-testid="uploader"
        />
      </PipelineEditorServicesProvider>,
    );
    expect(screen.getByTestId('uploader-thumbnail')).toBeInTheDocument();
    expect(screen.getByTestId('uploader-replace')).toBeInTheDocument();
  });

  it('Replace button fires onChange(null)', () => {
    const onChange = vi.fn();
    const svc = makeServices();
    render(
      <PipelineEditorServicesProvider services={svc}>
        <ImageUploader
          value={{ imageId: 'img_abc' }}
          onChange={onChange}
          data-testid="uploader"
        />
      </PipelineEditorServicesProvider>,
    );
    fireEvent.click(screen.getByTestId('uploader-replace'));
    expect(onChange).toHaveBeenCalledWith(null);
  });
});

describe('ImageUploader — fileOnly', () => {
  it('hides the URL input when fileOnly=true', () => {
    renderUploader({ fileOnly: true });
    expect(screen.getByTestId('uploader-drop')).toBeInTheDocument();
    expect(screen.queryByTestId('uploader-url-input')).not.toBeInTheDocument();
  });
});

describe('ImageUploader — urlOnly', () => {
  it('hides the file picker when urlOnly=true', () => {
    renderUploader({ urlOnly: true });
    expect(screen.queryByTestId('uploader-drop')).not.toBeInTheDocument();
    expect(screen.getByTestId('uploader-url-input')).toBeInTheDocument();
  });
});

describe('ImageUploader — no uploadImage service', () => {
  it('renders "not wired" placeholder when uploadImage is absent', () => {
    const svc: PipelineEditorServices = {
      getImageUrl: (id) => `https://cdn.example.com/${id}`,
      // uploadImage intentionally omitted
    };
    render(
      <PipelineEditorServicesProvider services={svc}>
        <ImageUploader value={null} onChange={vi.fn()} />
      </PipelineEditorServicesProvider>,
    );
    expect(
      screen.getByText(/This host has not wired uploadImage/i),
    ).toBeInTheDocument();
  });
});
