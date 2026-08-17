// src/components/image/ImageUploader.tsx
//
// Composes FileUploadDrop + ImageThumbnail + the host's uploadImage service
// into a single self-contained image picker. Guests that have not wired the
// service get a graceful "not wired" placeholder rather than a crash.

import { useState } from 'react';
import { FileUploadDrop } from '../shared/FileUploadDrop';
import { ImageThumbnail } from './ImageThumbnail';
import { Input } from '../forms/Input';
import { Button } from '../ui/Button';
import {
  usePipelineEditorServices,
  type UploadedImage,
} from '../pipelines/services';
import { cn } from '../../lib/cn';

export interface ImageUploaderValue {
  imageId: string;
  width?: number;
  height?: number;
  mimeType?: string;
}

export interface ImageUploaderProps {
  /** Current uploaded image (null until something has been uploaded). */
  value: ImageUploaderValue | null;
  onChange: (next: UploadedImage | null) => void;
  /** Max upload size in bytes. Default: 8 * 1024 * 1024 (8 MB). */
  maxSize?: number;
  /** Accepted mime types. Default: 'image/*'. */
  accept?: string;
  /** When true, hide the URL input and accept only drag-drop + file picker. */
  fileOnly?: boolean;
  /** When true, hide the file picker and accept only URL. */
  urlOnly?: boolean;
  className?: string;
  'data-testid'?: string;
}

// ---------------------------------------------------------------------------
// Inner component — rendered only when uploadImage is wired.
// ---------------------------------------------------------------------------

interface InnerProps extends ImageUploaderProps {
  uploadImage: (input: File | { url: string }) => Promise<UploadedImage>;
  getImageUrl: (imageId: string) => string;
}

function ImageUploaderInner({
  value,
  onChange,
  uploadImage,
  getImageUrl,
  maxSize = 8 * 1024 * 1024,
  accept = 'image/*',
  fileOnly = false,
  urlOnly = false,
  className,
  'data-testid': testId,
}: InnerProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');

  async function runUpload(input: File | { url: string }) {
    setUploading(true);
    setError(null);
    try {
      const result = await uploadImage(input);
      onChange(result);
      setUrlInput('');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Upload failed. Please try again.';
      setError(message);
    } finally {
      setUploading(false);
    }
  }

  function handleFiles(files: File[]) {
    if (files.length > 0) {
      void runUpload(files[0]);
    }
  }

  async function handleFetch() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    await runUpload({ url: trimmed });
  }

  // ---- With value: thumbnail + replace ----
  if (value) {
    const src = getImageUrl(value.imageId);
    return (
      <div
        className={cn('flex flex-col gap-3', className)}
        data-testid={testId}
      >
        <div className="flex items-start gap-3">
          <ImageThumbnail
            src={src}
            alt="Uploaded image"
            size="md"
            aspectRatio="square"
            data-testid={testId ? `${testId}-thumbnail` : undefined}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange(null)}
            data-testid={testId ? `${testId}-replace` : undefined}
          >
            Replace
          </Button>
        </div>
      </div>
    );
  }

  // ---- Empty state: file drop + URL input ----
  return (
    <div
      className={cn('flex flex-col gap-3', className)}
      data-testid={testId}
    >
      {uploading && (
        <p
          className="text-sm text-neutral"
          data-testid={testId ? `${testId}-uploading` : undefined}
        >
          Uploading...
        </p>
      )}

      {!urlOnly && (
        <FileUploadDrop
          accept={accept}
          maxSize={maxSize}
          onFiles={handleFiles}
          disabled={uploading}
          data-testid={testId ? `${testId}-drop` : undefined}
        />
      )}

      {!fileOnly && (
        <div
          className="flex items-center gap-2"
          data-testid={testId ? `${testId}-url-row` : undefined}
        >
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            disabled={uploading}
            data-testid={testId ? `${testId}-url-input` : undefined}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void handleFetch();
            }}
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => void handleFetch()}
            disabled={uploading || !urlInput.trim()}
            data-testid={testId ? `${testId}-fetch-btn` : undefined}
          >
            Fetch
          </Button>
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="text-sm text-danger-fg"
          data-testid={testId ? `${testId}-error` : undefined}
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Public export — handles missing-service guard.
// ---------------------------------------------------------------------------

export function ImageUploader(props: ImageUploaderProps) {
  const services = usePipelineEditorServices();
  const upload = services.uploadImage;

  if (!upload) {
    return (
      <div className="text-sm text-neutral">
        This host has not wired uploadImage. Cannot accept new uploads.
      </div>
    );
  }

  return (
    <ImageUploaderInner
      {...props}
      uploadImage={upload}
      getImageUrl={services.getImageUrl}
    />
  );
}

export default ImageUploader;
