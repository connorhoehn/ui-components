// Phase 51 / hub#71 — Diagram reader renderer (read-only viewer).

import type { SectionRendererProps } from '../types';

export default function DiagramReaderRenderer({ section }: SectionRendererProps) {
  const m = (section.metadata ?? {}) as { imageDataUrl?: string; alt?: string };
  if (!m.imageDataUrl) {
    return (
      <div data-testid={`diagram-reader-empty-${section.id}`} className="text-text-tertiary text-[13px] italic">
        No diagram uploaded.
      </div>
    );
  }
  return (
    <figure data-testid={`diagram-reader-${section.id}`} className="m-0">
      <img
        src={m.imageDataUrl}
        alt={m.alt ?? ''}
        className="max-w-full max-h-[480px] rounded-md border border-border"
      />
      {m.alt && (
        <figcaption className="text-[11px] text-text-tertiary mt-1 text-center">
          {m.alt}
        </figcaption>
      )}
    </figure>
  );
}
