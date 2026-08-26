// SummaryPanel — markdown summary of a recording's transcript. Pairs
// with <TranscriptPanel>: same status semantics (idle / pending /
// processing / ready / failed), different content.
//
// Markdown is rendered via the consumer-provided `renderMarkdown` slot
// so this lib stays markdown-renderer-agnostic. Most apps already have
// a configured renderer (react-markdown, markdown-it, custom Tiptap)
// for chat/docs; reusing it here keeps style consistent.

import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import type { TranscriptStatus } from './TranscriptPanel';

export interface SummaryPanelProps {
  status: TranscriptStatus;
  /** The raw markdown returned by GET /api/recordings/:id/summary. */
  markdown?: string | null;
  /** Caller-provided renderer. If omitted, the markdown is rendered as
   *  a <pre>-wrapped code block — readable but not pretty. */
  renderMarkdown?: (md: string) => ReactNode;
  /** Optional title above the panel. Defaults to "Summary". */
  title?: string;
  errorMessage?: string;
  pendingMessage?: string;
  idleState?: ReactNode;
  className?: string;
}

export function SummaryPanel({
  status,
  markdown,
  renderMarkdown,
  title = 'Summary',
  errorMessage,
  pendingMessage,
  idleState,
  className,
}: SummaryPanelProps) {
  if (status === 'idle') {
    return (
      <section className={cn('rounded-lg border border-border bg-surface p-4', className)}>
        <header className="text-sm font-medium text-text-secondary mb-2">{title}</header>
        <div className="text-sm text-text-tertiary">
          {idleState ?? 'No summary generated for this recording.'}
        </div>
      </section>
    );
  }

  if (status === 'pending' || status === 'processing') {
    return (
      <section className={cn('rounded-lg border border-border bg-surface p-4', className)}>
        <header className="text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
          <span>{title}</span>
          <span className="inline-block h-2 w-2 rounded-full bg-warning animate-pulse" aria-hidden="true" />
        </header>
        <div className="text-sm text-text-secondary">
          {pendingMessage ?? 'Generating summary from the transcript. This typically completes within a minute of transcription finishing.'}
        </div>
      </section>
    );
  }

  if (status === 'failed') {
    return (
      <section className={cn('rounded-lg border border-danger-border bg-surface p-4', className)}>
        <header className="text-sm font-medium text-danger mb-2">
          {title} — failed
        </header>
        <div className="text-sm text-text-secondary">
          {errorMessage ?? 'Summary generation failed.'}
        </div>
      </section>
    );
  }

  // status === 'ready'
  if (!markdown || markdown.trim().length === 0) {
    return (
      <section className={cn('rounded-lg border border-border bg-surface p-4', className)}>
        <header className="text-sm font-medium text-text-secondary mb-2">{title}</header>
        <div className="text-sm text-text-tertiary">
          No summary content was generated.
        </div>
      </section>
    );
  }

  return (
    <section className={cn('rounded-lg border border-border bg-surface flex flex-col', className)}>
      <header className="text-sm font-medium text-text-secondary px-4 py-3 border-b border-border">
        {title}
      </header>
      <div className="prose prose-sm prose-invert max-w-none p-4 overflow-y-auto max-h-[60vh]">
        {renderMarkdown ? (
          renderMarkdown(markdown)
        ) : (
          <pre className="whitespace-pre-wrap text-sm font-sans text-text-primary">{markdown}</pre>
        )}
      </div>
    </section>
  );
}
