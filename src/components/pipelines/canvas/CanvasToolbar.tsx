import { useEffect } from 'react';
import type { PipelineDefinition } from '../../../types/pipeline';
import { useCanvasLayout } from './useCanvasLayout';

export interface CanvasToolbarProps {
  definition: PipelineDefinition | null;
  setPositions: (positions: Array<{ id: string; position: { x: number; y: number } }>) => void;
  fitView: (opts?: { padding?: number; duration?: number }) => void;
}

export default function CanvasToolbar({
  definition,
  setPositions,
  fitView,
}: CanvasToolbarProps) {
  const { handleFitView, handleAutoArrange } = useCanvasLayout({
    definition,
    setPositions,
    fitView,
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        e.preventDefault();
        handleAutoArrange();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleAutoArrange]);

  return (
    <>
      <button
        data-ui-part=""
        type="button"
        onClick={handleAutoArrange}
        className="absolute top-3 right-[50px] z-[5] w-8 h-8 inline-flex items-center justify-center bg-surface border border-border rounded-md shadow-sm text-text-secondary cursor-pointer p-0 font-inherit text-sm leading-none"
        title="Auto-arrange (Shift+A)"
        aria-label="Auto-arrange"
        data-testid="auto-arrange-btn"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2 4h8M2 8h12M2 12h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <button
        data-ui-part=""
        type="button"
        onClick={handleFitView}
        className="absolute top-3 right-3 z-[5] w-8 h-8 inline-flex items-center justify-center bg-surface border border-border rounded-md shadow-sm text-text-secondary cursor-pointer p-0 font-inherit text-sm leading-none"
        title="Fit view"
        aria-label="Fit view"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
