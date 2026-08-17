// Phase 51 / hub#71 — Diagram editor renderer.
//
// v1 stores the selected image as a data-URL in section.metadata. Same
// design as FileUpload but specialized to images: accepts image/* in
// the file input and renders a thumbnail preview when set.

import { useState } from 'react';
import { cn } from '../../lib/cn';
import type { SectionRendererProps } from '../types';

interface DiagramMeta {
  imageDataUrl?: string;
  alt?: string;
}

export default function DiagramEditorRenderer({
  section, editable, onUpdateSection,
}: SectionRendererProps) {
  const meta = (section.metadata ?? {}) as DiagramMeta;
  const [busy, setBusy] = useState(false);

  const handleFile = (file: File): void => {
    setBusy(true);
    const reader = new FileReader();
    reader.onload = () => {
      onUpdateSection?.({
        metadata: {
          ...(section.metadata ?? {}),
          imageDataUrl: typeof reader.result === 'string' ? reader.result : '',
          alt: meta.alt ?? file.name,
        },
      });
      setBusy(false);
    };
    reader.onerror = () => setBusy(false);
    reader.readAsDataURL(file);
  };

  const setAlt = (alt: string): void => {
    onUpdateSection?.({
      metadata: { ...(section.metadata ?? {}), alt },
    });
  };

  const clear = (): void => {
    onUpdateSection?.({
      metadata: { ...(section.metadata ?? {}), imageDataUrl: undefined, alt: undefined },
    });
  };

  return (
    <div data-testid={`diagram-editor-${section.id}`}>
      {meta.imageDataUrl ? (
        <div className="flex flex-col gap-2">
          <img
            data-testid={`diagram-image-${section.id}`}
            src={meta.imageDataUrl}
            alt={meta.alt ?? ''}
            className="max-w-full max-h-[320px] rounded-md border border-border"
          />
          {editable && (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                data-testid={`diagram-alt-${section.id}`}
                value={meta.alt ?? ''}
                placeholder="Alt text"
                onChange={(e) => setAlt(e.target.value)}
                className="flex-1 px-2 py-1 text-xs border border-border-emphasis rounded"
              />
              <button
                type="button"
                data-testid={`diagram-remove-${section.id}`}
                onClick={clear}
                className="bg-transparent border-none text-danger-fg cursor-pointer text-[13px]"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ) : (
        <label
          data-testid={`diagram-empty-${section.id}`}
          className={cn(
            'block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-slate-500 text-[13px] text-center bg-surface-inset',
            editable ? 'cursor-pointer' : 'cursor-default',
          )}
        >
          {busy ? 'Reading image…' : (section.placeholder ?? 'Upload an image (PNG / JPG / SVG)')}
          <input
            type="file"
            accept="image/*"
            data-testid={`diagram-input-${section.id}`}
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
