import { useState } from 'react';

export interface AgUiReasoningBlockProps {
  /** Reasoning text accumulated from REASONING_MESSAGE_CONTENT events. */
  reasoning: string;
  /** Whether the parent message is still streaming. Drives the "thinking..." vs "Reasoning" label. */
  isStreaming?: boolean;
  /** Default open state. Defaults to false (collapsed). */
  defaultOpen?: boolean;
  /** Optional className for outer wrapper. */
  className?: string;
}

export function AgUiReasoningBlock({
  reasoning,
  isStreaming = false,
  defaultOpen = false,
  className,
}: AgUiReasoningBlockProps) {
  const [open, setOpen] = useState(defaultOpen);

  // Render nothing when reasoning is empty or only whitespace
  if (!reasoning || !reasoning.trim()) {
    return null;
  }

  const tokenCount = reasoning.split(/\s+/).filter(Boolean).length;

  return (
    <div
      className={className}
      style={{
        border: '1px dashed var(--color-border, #cbd5e1)',
        padding: '8px 10px',
        borderRadius: 4,
        maxWidth: '100%',
        marginBottom: 6,
      }}
    >
      <style>{`
        @keyframes agui-reasoning-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .agui-reasoning-cursor {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-text-secondary, #64748b);
          margin-left: 4px;
          vertical-align: middle;
          animation: agui-reasoning-pulse 1.4s ease-in-out infinite;
        }
      `}</style>

      {/* Header toggle button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          gap: 6,
          textAlign: 'left',
        }}
      >
        {/* Chevron icon */}
        <span
          style={{
            fontSize: 10,
            color: 'var(--color-text-secondary, #64748b)',
            userSelect: 'none',
            lineHeight: 1,
            width: 12,
            display: 'inline-block',
            flexShrink: 0,
          }}
        >
          {open ? '▾' : '▸'}
        </span>

        {/* Label */}
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--color-text-primary, #334155)',
            flex: 1,
            userSelect: 'none',
          }}
        >
          {isStreaming ? 'Thinking…' : 'Reasoning'}
        </span>

        {/* Token count chip */}
        <span
          style={{
            fontSize: 11,
            color: 'var(--color-text-tertiary, #94a3b8)',
            background: 'var(--color-surface, #f8fafc)',
            border: '1px solid var(--color-border, #cbd5e1)',
            borderRadius: 10,
            padding: '1px 7px',
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          {tokenCount} tok
        </span>
      </button>

      {/* Body — shown when open */}
      {open && (
        <div
          style={{
            maxHeight: 240,
            overflowY: 'auto',
            padding: '8px 0 0 0',
          }}
        >
          <pre
            style={{
              margin: 0,
              fontFamily: 'inherit',
              fontSize: 12,
              color: 'var(--color-text-secondary, #64748b)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: 1.6,
            }}
          >
            {reasoning}
            {isStreaming && <span className="agui-reasoning-cursor" />}
          </pre>
        </div>
      )}
    </div>
  );
}

export default AgUiReasoningBlock;
