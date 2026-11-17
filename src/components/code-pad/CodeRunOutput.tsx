// ui-components/src/components/code-pad/CodeRunOutput.tsx
//
// One run of a program, while it runs or after: a header row (what happened,
// who ran it, how long it took, the exit code, the host's own actions) over
// the output in the library's monospace console (`LogStream`), compiler
// output first, then standard output, then standard error, each labelled.
//
// This file must not import CodeMirror (or anything that does): a page that
// shows only a run's output loads the `./code-pad` subpath's output without
// the editor. `src/components/code-pad/__tests__/CodeRunOutput.test.tsx`
// reads this file's imports to keep it that way.
//
// Accessibility: the status is told by a word, not a colour, and is the one
// thing announced (a polite status region); the output itself is a quiet log
// (`announceLines={false}`) so a screen reader is not read every line of a
// program's output as it streams. Standard error is labelled and toned, and
// each of its lines carries `data-level="error"`.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Card } from '../ui/Card';
import { Inline } from '../ui/Stack';
import { LogStream, type LogLine } from '../shared/LogStream';
import Chip, { type ChipTone } from '../shared/Chip';
import { T } from '../shared/Text';
import VisuallyHidden from '../shared/VisuallyHidden';

/** Where a run is: waiting, building, running, or one of the ways it ended. */
export type CodeRunStatus =
  | 'queued'
  | 'compiling'
  | 'running'
  | 'succeeded'
  | 'failed'
  | 'compile_error'
  | 'timed_out'
  | 'memory_exceeded'
  | 'cancelled'
  | 'internal_error';

export interface CodeRunOutputProps {
  /** The run's status; `null` when nothing has been run yet. */
  status: CodeRunStatus | null;
  /** Standard output so far (or in full). */
  stdout?: string;
  /** Standard error so far (or in full). */
  stderr?: string;
  /** What the compiler printed, shown first. */
  compileOutput?: string;
  /** A stream that was cut at the output limit gets a line saying so after it. */
  truncated?: { stdout?: boolean; stderr?: boolean };
  /** Shown in the header once known. */
  exitCode?: number | null;
  /** Wall time, shown in the header once known. */
  timeMs?: number | null;
  /** Peak memory, shown in the header once known. */
  peakMemoryMb?: number | null;
  /** Who started the run: a name ("Ada") shows as "Run by Ada"; text already starting "Run by" shows as given. */
  runBy?: string;
  /** The language's name as people read it ("Python"). */
  languageLabel?: string;
  /** The runtime's version ("3.12"), shown after the language. */
  runtimeVersion?: string;
  /** Keep the newest output in view while it grows. Default true. */
  follow?: boolean;
  /** Shown when `status` is null. Default "Nothing has been run yet." */
  emptyMessage?: ReactNode;
  /** The host's controls (Run again, Cancel), at the end of the header row. */
  actions?: ReactNode;
  /** `framed` (default) draws a rounded border; `flush` draws none, for a pane that has its own. */
  variant?: 'framed' | 'flush';
  className?: string;
  'data-testid'?: string;
}

/** The chip's word, its tone, and the sentence a screen reader hears when the run reaches it. */
const STATUS: Record<CodeRunStatus, { label: string; tone: ChipTone; live?: boolean; announce: string }> = {
  queued: { label: 'Queued', tone: 'neutral', announce: 'The run is waiting to start.' },
  compiling: { label: 'Compiling', tone: 'info', live: true, announce: 'The code is compiling.' },
  running: { label: 'Running', tone: 'info', live: true, announce: 'The code is running.' },
  succeeded: { label: 'Finished', tone: 'success', announce: 'The run finished.' },
  failed: { label: 'Failed', tone: 'danger', announce: 'The run failed.' },
  compile_error: { label: "Didn't compile", tone: 'danger', announce: "The code didn't compile." },
  timed_out: { label: 'Timed out', tone: 'warning', announce: 'The run took too long and was stopped.' },
  memory_exceeded: { label: 'Out of memory', tone: 'warning', announce: 'The run used too much memory and was stopped.' },
  cancelled: { label: 'Cancelled', tone: 'neutral', announce: 'The run was cancelled.' },
  internal_error: { label: "Couldn't run", tone: 'danger', announce: "The code couldn't be run. Try again." },
};

/** The plain word the header shows for a status. Exported for hosts that list runs. */
export function codeRunStatusLabel(status: CodeRunStatus): string {
  return STATUS[status]?.label ?? String(status);
}

/** What the console says when a run has printed nothing (yet). */
function quietMessage(status: CodeRunStatus): string {
  switch (status) {
    case 'queued':
      return 'Waiting to start.';
    case 'compiling':
      return 'Compiling…';
    case 'running':
      return 'Running. Nothing printed yet.';
    case 'cancelled':
      return 'The run was cancelled before it printed anything.';
    default:
      return 'The program printed nothing.';
  }
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)} ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(2)} s`;
  const m = Math.floor(ms / 60_000);
  const s = Math.round((ms % 60_000) / 1000);
  return `${m} min ${s} s`;
}

/** Text to lines; a trailing newline does not make an empty last line. */
function splitLines(text: string): string[] {
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  if (lines.length > 1 && lines[lines.length - 1] === '') lines.pop();
  return lines;
}

type Section = 'compile' | 'stdout' | 'stderr';
const SECTION_LABEL: Record<Section, string> = {
  compile: 'Compiler output',
  stdout: 'Output',
  stderr: 'Error output',
};

function sectionLines(section: Section, text: string, cut: boolean): LogLine[] {
  const isError = section === 'stderr';
  const out: LogLine[] = [
    {
      id: `${section}-label`,
      message: (
        <T size="xs" weight="semibold" tone={isError ? 'danger' : 'secondary'} data-testid={`code-run-${section}-label`}>
          {SECTION_LABEL[section]}
        </T>
      ),
    },
  ];
  splitLines(text).forEach((line, i) => {
    out.push({
      id: `${section}-${i}`,
      level: isError ? 'error' : undefined,
      // A space keeps a blank line one line tall in the pre-wrap row.
      message: isError ? <T tone="danger">{line || ' '}</T> : line || ' ',
    });
  });
  if (cut) {
    out.push({
      id: `${section}-cut`,
      message: (
        <T size="xs" tone="tertiary" data-testid={`code-run-${section}-cut`}>
          Cut at the output limit; the rest was not kept.
        </T>
      ),
    });
  }
  return out;
}

/**
 * One program run's output, live or finished: a status chip in plain words, who ran it, time, memory and exit code when known and the host's actions, over compiler output, standard output and labelled standard error in the library's monospace console, with a line where output was cut.
 *
 * Import from `@connorhoehn/ui-components/code-pad`. It does not load the
 * editor: a page showing only output pays for no CodeMirror. It announces the
 * status change (a polite status region), not every line. It knows nothing of
 * queues or buttons: the page passes the run's fields and its own `actions`.
 *
 * ```tsx
 * <CodeRunOutput
 *   status={run.status}
 *   stdout={run.stdout}
 *   stderr={run.stderr}
 *   truncated={run.truncated}
 *   exitCode={run.exitCode}
 *   timeMs={run.timeMs}
 *   runBy="Run by Ada"
 *   languageLabel="Python"
 *   runtimeVersion="3.12"
 *   actions={<Button size="sm" onClick={runAgain}>Run again</Button>}
 * />
 * ```
 */
export function CodeRunOutput({
  status,
  stdout = '',
  stderr = '',
  compileOutput = '',
  truncated,
  exitCode,
  timeMs,
  peakMemoryMb,
  runBy,
  languageLabel,
  runtimeVersion,
  follow = true,
  emptyMessage = 'Nothing has been run yet.',
  actions,
  variant = 'framed',
  className,
  'data-testid': testId = 'code-run-output',
}: CodeRunOutputProps) {
  // A status from a newer server than this library still shows, as itself.
  const info = status ? STATUS[status] ?? { label: String(status), tone: 'neutral' as const, announce: String(status) } : null;

  const lines: LogLine[] = status
    ? [
        ...(compileOutput ? sectionLines('compile', compileOutput, false) : []),
        ...(stdout || truncated?.stdout ? sectionLines('stdout', stdout, !!truncated?.stdout) : []),
        ...(stderr || truncated?.stderr ? sectionLines('stderr', stderr, !!truncated?.stderr) : []),
      ]
    : [];

  const language = [languageLabel, runtimeVersion].filter(Boolean).join(' ');
  const facts: string[] = [];
  if (runBy) facts.push(runBy.startsWith('Run by') ? runBy : `Run by ${runBy}`);
  if (language) facts.push(language);
  if (typeof timeMs === 'number' && Number.isFinite(timeMs)) facts.push(formatDuration(timeMs));
  if (typeof peakMemoryMb === 'number' && Number.isFinite(peakMemoryMb)) facts.push(`${Math.round(peakMemoryMb)} MB`);
  if (typeof exitCode === 'number') facts.push(`Exit code ${exitCode}`);

  return (
    <Card
      data-testid={testId}
      data-status={status ?? undefined}
      data-variant={variant}
      className={cn(
        'flex min-h-0 min-w-0 flex-col',
        variant === 'flush' && 'rounded-none border-0 bg-transparent',
        className,
      )}
    >
      <Inline
        gap="sm"
        align="center"
        justify="between"
        wrap={false}
        data-testid={`${testId}-header`}
        className="min-w-0 shrink-0 border-b border-[var(--color-border)] px-3 py-2"
      >
        <Inline gap="sm" align="center" wrap={false} className="min-w-0">
          {info ? (
            // A Chip, not a StatusPill: the pill is itself a status region,
            // and the announcer below is the one this output wants heard.
            <Chip tone={info.tone} size="sm" dot={info.live ? 'pulse' : 'static'} data-testid={`${testId}-status`}>
              {info.label}
            </Chip>
          ) : (
            <T size="sm" weight="semibold" tone="secondary">
              Output
            </T>
          )}
          {facts.length > 0 && (
            <T size="xs" tone="tertiary" tabular truncate data-testid={`${testId}-facts`}>
              {facts.join(' · ')}
            </T>
          )}
        </Inline>
        {actions && (
          <Inline gap="xs" align="center" wrap={false} className="shrink-0" data-testid={`${testId}-actions`}>
            {actions}
          </Inline>
        )}
      </Inline>
      {/* The one announcement: the status word, which screen readers hear when it changes. */}
      <VisuallyHidden as="div" data-testid={`${testId}-announcer`}>
        <span role="status" aria-live="polite" aria-atomic="true">
          {info ? info.announce : ''}
        </span>
      </VisuallyHidden>
      <LogStream
        lines={lines}
        title={null}
        follow={follow}
        announceLines={false}
        showTimestamp={false}
        showLevel={false}
        showSource={false}
        emptyMessage={status ? quietMessage(status) : emptyMessage}
        data-testid={`${testId}-log`}
        className="min-h-0 flex-1 rounded-none border-0"
      />
    </Card>
  );
}

export default CodeRunOutput;
