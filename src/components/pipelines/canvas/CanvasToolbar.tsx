import { useCallback, useEffect, useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { PipelineDefinition } from '../../../types/pipeline';
import { colors } from '../../../constants/styles';
import { autoArrange } from './autoArrange';

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
  const fitViewBtnStyle = useMemo<CSSProperties>(
    () => ({
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 5,
      width: 32,
      height: 32,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: 6,
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      color: colors.textSecondary,
      cursor: 'pointer',
      padding: 0,
      fontFamily: 'inherit',
      fontSize: 14,
      lineHeight: 1,
    }),
    [],
  );

  const autoArrangeBtnStyle = useMemo<CSSProperties>(
    () => ({
      ...fitViewBtnStyle,
      right: 12 + 32 + 6,
    }),
    [fitViewBtnStyle],
  );

  const handleFitView = useCallback(() => {
    fitView({ padding: 0.15, duration: 500 });
  }, [fitView]);

  const handleAutoArrange = useCallback(() => {
    if (!definition) return;
    const positions = autoArrange(definition);
    if (positions.length === 0) return;
    setPositions(positions);
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => fitView({ padding: 0.15, duration: 500 }));
    } else {
      fitView({ padding: 0.15, duration: 500 });
    }
  }, [definition, setPositions, fitView]);

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
        type="button"
        onClick={handleAutoArrange}
        style={autoArrangeBtnStyle}
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
        type="button"
        onClick={handleFitView}
        style={fitViewBtnStyle}
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
