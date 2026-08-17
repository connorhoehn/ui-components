// Phase 51 / hub#71 — File Upload editor renderer.
//
// v1: stores the selected file as a data-URL in section.metadata so the
// content survives a save without an external storage pipeline. A future
// task can swap the data-URL for an S3-equivalent upload (LocalStack
// in dev). The reader component renders a download link from whatever
// is stored.

import { useState } from 'react';
import { cn } from '../../lib/cn';
import type { SectionRendererProps } from '../types';

interface FileMeta {
  fileName?: string;
  fileDataUrl?: string;
  fileSize?: number;
}

function readMeta(section: SectionRendererProps['section']): FileMeta {
  const m = (section.metadata ?? {}) as FileMeta;
  return m;
}

export default function FileUploadEditorRenderer({
  section, editable, onUpdateSection,
}: SectionRendererProps) {
  const meta = readMeta(section);
  const [busy, setBusy] = useState(false);

  const handleFile = (file: File): void => {
    setBusy(true);
    const reader = new FileReader();
    reader.onload = () => {
      onUpdateSection?.({
        metadata: {
          ...(section.metadata ?? {}),
          fileName: file.name,
          fileDataUrl: typeof reader.result === 'string' ? reader.result : '',
          fileSize: file.size,
        },
      });
      setBusy(false);
    };
    reader.onerror = () => setBusy(false);
    reader.readAsDataURL(file);
  };

  const clear = (): void => {
    onUpdateSection?.({
      metadata: {
        ...(section.metadata ?? {}),
        fileName: undefined,
        fileDataUrl: undefined,
        fileSize: undefined,
      },
    });
  };

  return (
    <div data-testid={`file-upload-editor-${section.id}`}>
      {meta.fileName ? (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]">
          <span className="text-base">📎</span>
          <span className="flex-1 font-medium text-text-primary">{meta.fileName}</span>
          {typeof meta.fileSize === 'number' && (
            <span className="text-[11px] text-text-tertiary">
              {(meta.fileSize / 1024).toFixed(1)} kB
            </span>
          )}
          {editable && (
            <button
              type="button"
              data-testid={`file-upload-remove-${section.id}`}
              onClick={clear}
              className="border-none bg-transparent text-danger-fg cursor-pointer text-sm px-1.5 py-0.5"
            >
              ×
            </button>
          )}
        </div>
      ) : (
        <label
          data-testid={`file-upload-empty-${section.id}`}
          className={cn(
            'block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset',
            editable ? 'cursor-pointer' : 'cursor-default',
          )}
        >
          {busy ? 'Reading file…' : (section.placeholder ?? 'Click to upload a file')}
          <input
            type="file"
            data-testid={`file-upload-input-${section.id}`}
            disabled={!editable}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </label>
      )}
    </div>
  );
}
