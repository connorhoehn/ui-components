// frontend/src/components/pipelines/canvas/ErrorOverlay.tsx
//
// Error drill-down overlay for failed pipeline nodes. When a run fails, this
// popover anchors near the failed node on the canvas showing error details:
// category badge, error message, failed nodeId, optional collapsible stack
// trace, "Copy error details" and "Retry from here" actions.

import { useState, useCallback, type CSSProperties } from 'react';
import { colors } from '../../../constants/styles';
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
  LLMError:         { bg: '#fef2f2', fg: '#dc2626' },
  TimeoutError:     { bg: '#fff7ed', fg: '#ea580c' },
  NetworkError:     { bg: '#fffbeb', fg: '#d97706' },
  ValidationError:  { bg: '#fefce8', fg: '#ca8a04' },
  RegistryConflict: { bg: '#faf5ff', fg: '#9333ea' },
  UnknownError:     { bg: '#f1f5f9', fg: '#475569' },
};

function categoryLabel(cat: ErrorCategory): string {
  switch (cat) {
    case 'LLMError':         return 'LLM Error';
    case 'TimeoutError':     return 'Timeout';
    case 'NetworkError':     return 'Network Error';
    case 'ValidationError':  return 'Validation Error';
    case 'RegistryConflict': return 'Registry Conflict';
    case 'UnknownError':     return 'Unknown Error';
    default:                 return String(cat);
  }
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const overlayStyle: CSSProperties = {
  position: 'fixed',
  zIndex: 100,
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: 10,
  boxShadow: '0 12px 32px rgba(15, 23, 42, 0.18), 0 2px 6px rgba(15, 23, 42, 0.08)',
  padding: 0,
  width: 340,
  maxHeight: 420,
  overflowY: 'auto',
  fontFamily: 'inherit',
  color: colors.textPrimary,
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '12px 14px 10px',
  borderBottom: `1px solid ${colors.border}`,
};

const bodyStyle: CSSProperties = {
  padding: '12px 14px',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
};

const footerStyle: CSSProperties = {
  display: 'flex',
  gap: 8,
  padding: '10px 14px 12px',
  borderTop: `1px solid ${colors.border}`,
};

const btnStyle: CSSProperties = {
  padding: '6px 12px',
  fontSize: 12,
  fontWeight: 600,
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  fontFamily: 'inherit',
  lineHeight: 1.3,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ErrorOverlay({ error, anchor, onDismiss, onRetry }: ErrorOverlayProps) {
  const [stackOpen, setStackOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Clipboard unavailable — silently ignore.
    }
  }, [error, category]);

  const handleRetry = useCallback(() => {
    onRetry?.();
  }, [onRetry]);

  // Position the overlay near the anchor with a slight offset to avoid
  // covering the node itself. Clamp to viewport bounds.
  const top = Math.min(anchor.y + 8, window.innerHeight - 440);
  const left = Math.min(anchor.x + 12, window.innerWidth - 360);

  return (
    <div
      style={{ ...overlayStyle, top: Math.max(8, top), left: Math.max(8, left) }}
      data-testid="error-overlay"
      role="dialog"
      aria-label={`Error details for node ${error.nodeId}`}
    >
      {/* Header */}
      <div style={headerStyle}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 700,
            background: catColor.bg,
            color: catColor.fg,
            lineHeight: 1.4,
          }}
          data-testid="error-category-badge"
        >
          {categoryLabel(category)}
        </span>
        <span style={{ flex: 1 }} />
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss error overlay"
          style={{
            background: 'transparent',
            border: 'none',
            color: colors.textTertiary,
            cursor: 'pointer',
            fontSize: 16,
            lineHeight: 1,
            padding: '2px 4px',
          }}
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div style={bodyStyle}>
        {/* Error message */}
        <div style={{ fontSize: 13, lineHeight: 1.5, color: colors.textPrimary }}>
          {error.message}
        </div>

        {/* Node ID */}
        <div style={{ fontSize: 11, color: colors.textTertiary }}>
          Failed node:{' '}
          <code
            style={{
              background: '#f1f5f9',
              padding: '1px 5px',
              borderRadius: 3,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 11,
              color: colors.textSecondary,
            }}
          >
            {error.nodeId}
          </code>
        </div>

        {/* Stack trace (collapsible) */}
        {error.stack && (
          <div>
            <button
              type="button"
              onClick={() => setStackOpen((v) => !v)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                color: colors.textSecondary,
                fontFamily: 'inherit',
              }}
              data-testid="error-stack-toggle"
            >
              {stackOpen ? '▾' : '▸'} Stack trace
            </button>
            {stackOpen && (
              <pre
                style={{
                  marginTop: 6,
                  padding: 10,
                  background: '#f8fafc',
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  fontSize: 10,
                  lineHeight: 1.5,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  color: colors.textSecondary,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  maxHeight: 160,
                  overflowY: 'auto',
                  margin: 0,
                }}
                data-testid="error-stack-content"
              >
                {error.stack}
              </pre>
            )}
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div style={footerStyle}>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            ...btnStyle,
            background: '#f1f5f9',
            color: colors.textSecondary,
          }}
          data-testid="error-copy-btn"
        >
          {copied ? 'Copied!' : 'Copy error details'}
        </button>
        {onRetry && (
          <button
            type="button"
            onClick={handleRetry}
            style={{
              ...btnStyle,
              background: colors.primary,
              color: '#ffffff',
            }}
            data-testid="error-retry-btn"
          >
            Retry from here
          </button>
        )}
      </div>
    </div>
  );
}
