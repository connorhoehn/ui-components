// Phase 51 / hub#71 — File Upload reader renderer (read-only viewer).

import type { SectionRendererProps } from '../types';
import { safeDownloadHref } from '../../lib/safeHref';

export default function FileUploadReaderRenderer({ section }: SectionRendererProps) {
  const m = (section.metadata ?? {}) as { fileName?: string; fileDataUrl?: string; fileSize?: number };
  if (!m.fileName) {
    return (
      <div data-testid={`file-upload-reader-empty-${section.id}`} className="text-text-tertiary text-[13px] italic">
        No file uploaded.
      </div>
    );
  }
  // The data URL round-trips through the document; only passive types may be
  // offered as a download. Anything else shows the name with no link.
  const href = safeDownloadHref(m.fileDataUrl);
  return (
    <div
      data-testid={`file-upload-reader-${section.id}`}
      className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]"
    >
      <span className="text-base">📎</span>
      {href ? (
        <a
          href={href}
          download={m.fileName}
          data-testid={`file-upload-link-${section.id}`}
          className="text-primary font-medium no-underline"
        >
          Download {m.fileName}
        </a>
      ) : (
        <span data-testid={`file-upload-name-${section.id}`} className="text-text-secondary font-medium">
          {m.fileName}
        </span>
      )}
      {typeof m.fileSize === 'number' && (
        <span className="text-[11px] text-text-tertiary">
          ({(m.fileSize / 1024).toFixed(1)} kB)
        </span>
      )}
    </div>
  );
}
