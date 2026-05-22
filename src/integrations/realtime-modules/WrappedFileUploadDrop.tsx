// src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
//
// FileUploadDrop wired directly to a useFileUpload() hook return from
// realtime-modules. Bridges the drag-drop component's onFiles callback
// to the hook's upload() method, and renders a progress list below.

import type { RMUseFileUploadReturn } from './types';
import { adaptFileUploads } from './adapters';
import { FileUploadDrop } from '../../components/shared/FileUploadDrop';

export interface WrappedFileUploadDropProps {
  /** Return value of useFileUpload(channel) from realtime-modules */
  fileUpload: RMUseFileUploadReturn;
  /** Forwarded to FileUploadDrop */
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
  /** Optional metadata attached to each upload request */
  uploadMetadata?: Record<string, unknown>;
  /** Called when any upload fails */
  onError?: (message: string) => void;
}

export function WrappedFileUploadDrop({
  fileUpload,
  accept,
  maxSize,
  multiple,
  disabled,
  label,
  className,
  uploadMetadata,
  onError,
}: WrappedFileUploadDropProps) {
  const summaries = adaptFileUploads(fileUpload.uploads);

  function handleFiles(files: File[]) {
    for (const file of files) {
      fileUpload.upload(file, uploadMetadata ? { metadata: uploadMetadata } : undefined).catch(
        (err: unknown) => {
          const msg =
            err instanceof Error ? err.message : 'Upload failed';
          onError?.(msg);
        },
      );
    }
  }

  return (
    <div>
      <FileUploadDrop
        accept={accept}
        maxSize={maxSize}
        multiple={multiple}
        disabled={disabled}
        label={label}
        className={className}
        onFiles={handleFiles}
        onError={onError}
      />

      {summaries.length > 0 && (
        <ul
          style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', fontSize: 13 }}
        >
          {summaries.map((s) => (
            <li
              key={s.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 0',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {s.filename}
              </span>
              <span style={{ color: statusColor(s.status), fontWeight: 600, fontSize: 12 }}>
                {s.status === 'uploading' ? `${s.progress}%` : s.status}
              </span>
              {(s.status === 'completed' || s.status === 'clean') && s.downloadUrl && (
                <a
                  href={s.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 12, color: '#3b82f6' }}
                >
                  Download
                </a>
              )}
              {(s.status === 'failed' || s.status === 'infected') && (
                <button
                  type="button"
                  onClick={() => fileUpload.removeCompleted()}
                  style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Dismiss
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function statusColor(status: string): string {
  switch (status) {
    case 'completed':
    case 'clean':
      return '#22c55e';
    case 'failed':
    case 'infected':
      return '#ef4444';
    case 'scanning':
      return '#f59e0b';
    case 'uploading':
      return '#3b82f6';
    default:
      return '#94a3b8';
  }
}
