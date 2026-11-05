// src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
//
// FileUploadDrop wired directly to a useFileUpload() hook return from
// realtime-modules. Bridges the drag-drop component's onFiles callback
// to the hook's upload() method, and renders a progress list below.

import type { RMUseFileUploadReturn } from './types';
import { adaptFileUploads, type FileUploadSummary } from './adapters';
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
        <UploadProgressList
          summaries={summaries}
          onDismiss={() => fileUpload.removeCompleted()}
        />
      )}
    </div>
  );
}

interface UploadProgressListProps {
  summaries: FileUploadSummary[];
  onDismiss: () => void;
}

function UploadProgressList({ summaries, onDismiss }: UploadProgressListProps) {
  return (
    <ul className="mt-2 p-0 list-none text-[13px]">
      {summaries.map((s) => (
        <li
          key={s.id}
          className="flex items-center gap-2 py-1 border-b border-border"
        >
          <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {s.filename}
          </span>
          <span className={`text-xs font-semibold ${statusClass(s.status)}`}>
            {s.status === 'uploading' ? `${s.progress}%` : s.status}
          </span>
          {(s.status === 'completed' || s.status === 'clean') && s.downloadUrl && (
            <a
              href={s.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-info"
            >
              Download
            </a>
          )}
          {(s.status === 'failed' || s.status === 'infected') && (
            <button
              data-ui-part=""
              type="button"
              onClick={onDismiss}
              className="text-xs text-danger bg-transparent border-0 cursor-pointer p-0"
            >
              Dismiss
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

function statusClass(status: FileUploadSummary['status']): string {
  switch (status) {
    case 'completed':
    case 'clean':
      return 'text-state-completed';
    case 'failed':
    case 'infected':
      return 'text-state-failed';
    case 'scanning':
      return 'text-state-awaiting';
    case 'uploading':
      return 'text-state-running';
    default:
      return 'text-text-tertiary';
  }
}
