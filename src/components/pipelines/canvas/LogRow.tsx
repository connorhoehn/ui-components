import { memo } from 'react';
import { cn } from '../../../lib/cn';
import { onActivationKey } from '../../../lib/activationKey';
import { getEventGlyph } from '../../shared/eventGlyphs';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LogRowData {
  id: number;
  at: number;
  eventType: string;
  payload: unknown;
}

export interface LogRowProps {
  row: LogRowData;
  isOpen: boolean;
  onToggle: (id: number) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmtTime(ms: number): string {
  const d = new Date(ms);
  const pad = (n: number, w = 2) => String(n).padStart(w, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`;
}

function summarizePayload(row: LogRowData): string {
  const p = row.payload as Record<string, unknown> | null | undefined;
  if (!p || typeof p !== 'object') return '';
  const parts: string[] = [];
  if (typeof p.stepId === 'string') parts.push(String(p.stepId));
  if (typeof p.runId === 'string' && parts.length === 0) parts.push(String(p.runId));
  if (typeof p.durationMs === 'number') parts.push(`${p.durationMs}ms`);
  if (typeof p.nodeType === 'string') parts.push(`type: ${p.nodeType}`);

  // Error handling: show errorCategory badge if present, otherwise fall back to message
  if (typeof p.error === 'object' && p.error !== null) {
    const err = p.error as Record<string, unknown>;
    if (typeof err.errorCategory === 'string') {
      parts.push(`[${err.errorCategory}]`);
    }
    if (typeof err.message === 'string') {
      parts.push(err.message);
    }
  } else if (typeof p.error === 'string') {
    parts.push(p.error);
  }

  if (
    typeof p.tokensIn === 'number' &&
    typeof p.tokensOut === 'number'
  ) {
    parts.push(`${p.tokensIn}→${p.tokensOut} tokens`);
  }
  return parts.join(' · ');
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

// Memoised: ExecutionLog is a live-tailing surface — every appended event
// re-renders the whole visible list, and each row re-runs `summarizePayload`
// (string building over the event payload). The call site already passes a
// stable `onToggle` (useCallback) and rows out of a useMemo'd array, so the
// shallow compare here means an append re-renders only the new row plus any
// row whose `isOpen` actually flipped. Only internal consumer is ExecutionLog.
function LogRow({ row, isOpen, onToggle }: LogRowProps) {
  const glyph = getEventGlyph(row.eventType);
  const summary = summarizePayload(row);

  return (
    <div
      data-ui-part=""
      className={cn(
        'px-3 py-1 border-b border-border-subtle text-xs text-text-primary cursor-pointer',
        isOpen && 'bg-surface-panel',
      )}
      data-testid={`execution-log-row-${row.id}`}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={() => onToggle(row.id)}
      onKeyDown={onActivationKey(() => onToggle(row.id))}
    >
      <span className="font-mono text-[11px] text-neutral mr-2">
        {fmtTime(row.at)}
      </span>
      <span
        className="font-bold mr-1.5"
        style={{ color: glyph.color }}
      >
        {glyph.icon}
      </span>
      <span className="font-semibold">{row.eventType}</span>
      {summary ? (
        <span className="text-neutral">
          {' · '}
          {summary}
        </span>
      ) : null}
      {isOpen ? (
        <pre
          className="mt-1.5 mb-0 p-2.5 bg-surface-inverse text-code-text rounded-md text-[11px] leading-normal overflow-x-auto font-mono"
          data-testid={`execution-log-row-json-${row.id}`}
        >
          {JSON.stringify(row.payload, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}

export default memo(LogRow);
