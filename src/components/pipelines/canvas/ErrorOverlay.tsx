// frontend/src/components/pipelines/canvas/ErrorOverlay.tsx
//
// Error drill-down overlay for failed pipeline nodes. When a run fails, this
// popover anchors near the failed node on the canvas showing error details:
// category badge, error message, failed nodeId, optional collapsible stack
// trace, "Copy error details" and "Retry from here" actions.

import { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '../../../lib/cn';
import { focusInitialElement, useDismissableLayer } from '../../../lib/focusTrap';
import type { ErrorCategory, PipelineRunError } from '../../../types/pipeline';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ErrorOverlayProps {
  error: PipelineRunError;
  /** Screen-space coordinates to anchor the popover near the failed node. */
  anchor: { x: number; y: number };
  onDismiss: () => void;
  onRetry?: () => void;
}

// ---------------------------------------------------------------------------
// Category badge color mapping
// ---------------------------------------------------------------------------

const CATEGORY_COLORS: Record<ErrorCategory, { bg: string; fg: string }> = {
  LLMError:         { bg: 'var(--color-danger-bg)', fg: 'var(--color-danger)' },
  TimeoutError:     { bg: 'var(--color-caution-bg)', fg: 'var(--color-caution)' },
  NetworkError:     { bg: 'var(--color-warning-bg)', fg: 'var(--color-warning)' },
  ValidationError:  { bg: 'var(--color-warning-bg)', fg: 'var(--color-warning)' },
  RegistryConflict: { bg: 'var(--color-accent-bg)', fg: 'var(--color-accent)' },
  // A refusal is a decision, not a fault: the step said no to the request.
  Refused:          { bg: 'var(--color-caution-bg)', fg: 'var(--color-caution)' },
  ModelAuth:        { bg: 'var(--color-caution-bg)', fg: 'var(--color-caution)' },
  UnknownError:     { bg: 'var(--color-surface-hover)', fg: 'var(--color-text-secondary)' },
};

function categoryLabel(cat: ErrorCategory): string {
  switch (cat) {
    case 'LLMError':         return 'LLM Error';
    case 'TimeoutError':     return 'Timeout';
    case 'NetworkError':     return 'Network Error';
    case 'ValidationError':  return 'Validation Error';
    case 'RegistryConflict': return 'Registry Conflict';
    case 'Refused':          return 'Refused';
    case 'ModelAuth':        return 'Model sign-in';
    case 'UnknownError':     return 'Unknown Error';
    default:                 return String(cat);
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ErrorOverlay({ error, anchor, onDismiss, onRetry }: ErrorOverlayProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [stackOpen, setStackOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
  }, []);

  const category = error.errorCategory ?? 'UnknownError';
  const catColor = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.UnknownError;

  const handleCopy = useCallback(async () => {
    const details = [
      `Error Category: ${category}`,
      `Node ID: ${error.nodeId}`,
      `Message: ${error.message}`,
      error.stack ? `\nStack Trace:\n${error.stack}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(details);
        setCopied(true);
        // Overlay is dismissable, so a 2s reset easily outlives the mount.
        if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
        copiedTimerRef.current = setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Clipboard unavailable — silently ignore.
    }
  }, [error, category]);

  const handleRetry = useCallback(() => {
    onRetry?.();
  }, [onRetry]);

  // This announces itself as a dialog but focus never entered it and there
  // was no Escape handler, so the only way out was to hunt for the × with a
  // mouse. Move focus in on open, restore it to the node on close, and let
  // Escape dismiss.
  useDismissableLayer(true, onDismiss);
  useEffect(() => {
    focusInitialElement(panelRef.current);
  }, []);

  // Position the overlay near the anchor with a slight offset
  const top = Math.min(anchor.y + 8, window.innerHeight - 440);
  const left = Math.min(anchor.x + 12, window.innerWidth - 360);

  return (
    <div
      ref={panelRef}
      className="fixed z-[100] bg-surface border border-border rounded-[10px] shadow-[0_12px_32px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.08)] p-0 w-[340px] max-h-[420px] overflow-y-auto font-inherit text-text-primary"
      style={{ top: Math.max(8, top), left: Math.max(8, left) }}
      data-testid="error-overlay"
      role="dialog"
      aria-label={`Error details for node ${error.nodeId}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3.5 pt-3 pb-2.5 border-b border-border">
        <span
          className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold leading-snug"
          style={{ background: catColor.bg, color: catColor.fg }}
          data-testid="error-category-badge"
        >
          {categoryLabel(category)}
        </span>
        <span className="flex-1" />
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss error overlay"
          className="bg-transparent border-none text-text-tertiary cursor-pointer text-base leading-none px-1 py-0.5"
        >
          {'×'}
        </button>
      </div>

      {/* Body */}
      <div className="px-3.5 py-3 flex flex-col gap-2.5">
        {/* Error message */}
        <div className="text-[13px] leading-normal text-text-primary">
          {error.message}
        </div>

        {/* Node ID */}
        <div className="text-[11px] text-text-tertiary">
          Failed node:{' '}
          <code className="bg-surface-hover px-[5px] py-px rounded-[3px] font-mono text-[11px] text-text-secondary">
            {error.nodeId}
          </code>
        </div>

        {/* Stack trace (collapsible) */}
        {error.stack && (
          <div>
            <button
              type="button"
              onClick={() => setStackOpen((v) => !v)}
              className="bg-transparent border-none p-0 cursor-pointer text-xs font-medium text-text-secondary font-inherit"
              data-testid="error-stack-toggle"
            >
              {stackOpen ? '▾' : '▸'} Stack trace
            </button>
            {stackOpen && (
              <pre
                className="mt-1.5 p-2.5 bg-surface-panel border border-border rounded-md text-[10px] leading-normal font-mono text-text-secondary whitespace-pre-wrap break-all max-h-40 overflow-y-auto m-0"
                data-testid="error-stack-content"
              >
                {error.stack}
              </pre>
            )}
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex gap-2 px-3.5 pt-2.5 pb-3 border-t border-border">
        <button
          type="button"
          onClick={handleCopy}
          className="px-3 py-1.5 text-xs font-semibold border-none rounded-md cursor-pointer font-inherit leading-snug bg-surface-hover text-text-secondary"
          data-testid="error-copy-btn"
        >
          {copied ? 'Copied!' : 'Copy error details'}
        </button>
        {onRetry && (
          <button
            type="button"
            onClick={handleRetry}
            className="px-3 py-1.5 text-xs font-semibold border-none rounded-md cursor-pointer font-inherit leading-snug bg-primary text-white"
            data-testid="error-retry-btn"
          >
            Retry from here
          </button>
        )}
      </div>
    </div>
  );
}
