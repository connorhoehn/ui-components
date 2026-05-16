// Phase 51 / hub#71 — File Upload reader renderer (read-only viewer).

import type { SectionRendererProps } from '../types';

export default function FileUploadReaderRenderer({ section }: SectionRendererProps) {
  const m = (section.metadata ?? {}) as { fileName?: string; fileDataUrl?: string; fileSize?: number };
  if (!m.fileName) {
    return (
      <div data-testid={`file-upload-reader-empty-${section.id}`} className="text-text-tertiary text-[13px] italic">
        No file uploaded.
      </div>
    );
  }
  return (
    <div
      data-testid={`file-upload-reader-${section.id}`}
      className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]"
    >
      <span className="text-base">📎</span>
      <a
        href={m.fileDataUrl ?? '#'}
        download={m.fileName}
        data-testid={`file-upload-link-${section.id}`}
        className="text-primary font-medium no-underline"
      >
        Download {m.fileName}
      </a>
      {typeof m.fileSize === 'number' && (
        <span className="text-[11px] text-text-tertiary">
          ({(m.fileSize / 1024).toFixed(1)} kB)
        </span>
      )}
    </div>
  );
}
