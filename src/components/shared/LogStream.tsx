// LogStream — monospace terminal-style log panel.
//
// Renders a scrollable list of log lines (timestamp, level, source, message)
// in a fixed-pitch font. When `follow` is true and the user has not scrolled
// up, new lines auto-scroll into view. When the user has scrolled up, a
// "Jump to live ↓" pill appears. Composes <CardHeader> and (optionally)
// <Chip> for the level glyphs — no inline styles.

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Card } from '../ui/Card';
import CardHeader from './CardHeader';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogLine {
  id: string;
  /** Pre-formatted timestamp string (e.g. "10:48:21.024"). Optional. */
  timestamp?: string;
  /** Severity. Drives glyph + color. */
  level?: LogLevel;
  /** Optional source/component prefix (e.g. "auth-svc", "pipeline-7"). */
  source?: string;
  /** The log message body. */
  message: ReactNode;
}

export interface LogStreamProps {
  lines: LogLine[];
  /** When true, autoscroll to the latest line as new lines arrive. Default true. */
  follow?: boolean;
  /** When true, render the small timestamp column. Default true. */
  showTimestamp?: boolean;
  /** When true, render the level glyph. Default true. */
  showLevel?: boolean;
  /** When true, render the source prefix column. Default true. */
  showSource?: boolean;
  /** Header title. Default: "Log stream". Set to null to hide the header. */
  title?: string | null;
  /** Optional right-side meta slot in the header (overrides default line count). */
  headerSlot?: ReactNode;
  /** Empty-state message when lines is empty. */
  emptyMessage?: ReactNode;
  /** Optional max-height for the scroll region. */
  maxHeight?: string;
  /**
   * Colour family for the scroll region. `'code'` (default) is today's
   * permanently-dark console — `--color-surface-subtle` with a `#0b1020`
   * fallback for hosts that don't define it, `--color-text-primary` with a
   * `#e5e7eb` fallback for the text. `'surface'` follows the host theme
   * instead (`bg-surface-inset text-text-primary`), for a log panel embedded
   * in an otherwise light-themed page rather than a terminal pane.
   * `'transparent'` keeps the light-on-dark text but paints no background at
   * all, for a log sitting over a surface that owns its own — the working-state
   * backdrop in `RisingParticles`, whose star field an opaque scroll region
   * would hide completely.
   */
  tone?: 'code' | 'surface' | 'transparent';
  /** When provided, renders a "Clear" button in the header. */
  onClear?: () => void;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

const LEVEL_LABEL: Record<LogLevel, string> = {
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
};

const LEVEL_COLOR: Record<LogLevel, string> = {
  debug: 'text-[var(--color-text-tertiary)]',
  // Text tokens (2.515.12): the level words are text, so they take the `-fg`
  // ink that holds 4.5:1, not the fill colour (WARN was --color-warning,
  // #d97706 on white, 3.07:1).
  info: 'text-[var(--color-info-fg,#1d4ed8)]',
  warn: 'text-[var(--color-warning-fg,#b45309)]',
  error: 'text-[var(--color-danger-fg,#b91c1c)]',
};

export function LogStream({
  lines,
  follow = true,
  showTimestamp = true,
  showLevel = true,
  showSource = true,
  title = 'Log stream',
  headerSlot,
  emptyMessage = 'No log lines yet.',
  maxHeight,
  tone = 'code',
  onClear,
  className,
  style,
  'data-testid': testId = 'log-stream',
}: LogStreamProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [detached, setDetached] = useState(false);

  useEffect(() => {
    if (!follow || detached) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines, follow, detached]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
    setDetached(!atBottom);
  };

  const jumpToLive = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    setDetached(false);
  };

  const defaultMeta = (
    <div className="flex items-center gap-2">
      <span
        className="text-[11px] text-[var(--color-text-tertiary)]"
        data-testid={`${testId}-count`}
      >
        {lines.length} {lines.length === 1 ? 'line' : 'lines'}
      </span>
      {onClear && (
        <button
          data-ui-part=""
          type="button"
          onClick={onClear}
          data-testid={`${testId}-clear`}
          className={cn(
            'text-[11px] uppercase tracking-wide',
            'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
            'border border-[var(--color-border)] rounded px-1.5 py-0.5',
            'cursor-pointer bg-transparent',
          )}
        >
          Clear
        </button>
      )}
    </div>
  );

  return (
    <Card
      data-testid={testId}
      className={cn(
        'flex flex-col',
        // Card's own base classes paint `bg-surface` unconditionally, which
        // would sit *behind* the scroll region below and show straight
        // through it once that region goes `bg-transparent` — the whole
        // point of `tone="transparent"` is a log floating over a surface
        // that owns its own background (a working-state particle field),
        // so the Card wrapping it has to go transparent too, not just the
        // strip inside it.
        tone === 'transparent' && 'border-transparent bg-transparent',
        className,
      )}
      style={style}
    >
      {title !== null && (
        <div className="px-4 py-3 border-b border-[var(--color-border)]">
          <CardHeader title={title} meta={headerSlot ?? defaultMeta} />
        </div>
      )}
      <div className="relative flex-1 min-h-0 flex">
        <div
          ref={scrollRef}
          onScroll={onScroll}
          role="log"
          aria-live={follow ? 'polite' : 'off'}
          data-testid={`${testId}-scroll`}
          className={cn(
            'flex-1 overflow-y-auto',
            'font-mono text-[12px] leading-[1.55]',
            tone === 'surface'
              ? 'bg-surface-inset text-text-primary'
              : tone === 'transparent'
                ? 'bg-transparent text-[var(--color-text-primary,#e5e7eb)]'
                : 'bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]',
            'py-2',
          )}
          style={{ maxHeight }}
        >
          {lines.length === 0 ? (
            <div
              data-testid={`${testId}-empty`}
              className="px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]"
            >
              {emptyMessage}
            </div>
          ) : (
            lines.map((line) => {
              // `line.level` is typed as a four-value union, but log lines come
              // from a host API or a gateway socket and the type is erased at
              // runtime — a server that emits `trace`/`fatal`/`WARN` used to
              // make `LEVEL_LABEL[level]` undefined and `.toLowerCase()` throw,
              // which unmounted the entire stream (every line, not just the bad
              // one). Unknown levels now render *as themselves* in the neutral
              // colour rather than disappearing.
              const level = line.level ?? 'info';
              const rawLevel = String(level);
              const levelLabel = LEVEL_LABEL[level] ?? rawLevel.toUpperCase();
              const levelColor = LEVEL_COLOR[level] ?? LEVEL_COLOR.info;
              return (
                <div
                  key={line.id}
                  role="listitem"
                  data-testid={`${testId}-line`}
                  data-level={line.level || undefined}
                  className="flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]"
                >
                  {showTimestamp && line.timestamp && (
                    <span className="shrink-0 text-[var(--color-text-tertiary)] tabular-nums">
                      {line.timestamp}
                    </span>
                  )}
                  {showLevel && line.level && (
                    <span
                      className={cn(
                        'shrink-0 font-semibold uppercase text-[11px] w-[44px]',
                        levelColor,
                      )}
                      aria-label={`level ${rawLevel.toLowerCase()}`}
                    >
                      {levelLabel}
                    </span>
                  )}
                  {showSource && line.source && (
                    <span className="shrink-0 text-[var(--color-text-secondary)]">
                      [{line.source}]
                    </span>
                  )}
                  <span className="flex-1 whitespace-pre-wrap break-words">
                    {line.message}
                  </span>
                </div>
              );
            })
          )}
        </div>
        {follow && detached && (
          <button
            data-ui-part=""
            type="button"
            data-testid={`${testId}-jump`}
            onClick={jumpToLive}
            className={cn(
              'absolute bottom-3 left-1/2 -translate-x-1/2',
              'px-3 py-1 text-[11px] font-semibold uppercase tracking-wide',
              'bg-primary text-on-primary rounded-full border-none cursor-pointer',
              'shadow-[0_2px_8px_rgba(0,0,0,0.25)]',
            )}
          >
            Jump to live ↓
          </button>
        )}
      </div>
    </Card>
  );
}

/** Alias kept for clarity in contexts where "terminal log" reads better. */
export const TerminalLog = LogStream;

export default LogStream;
