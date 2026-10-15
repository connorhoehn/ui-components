// ReviewThread — a threaded review discussion between agents and people.
//
// The shape a design review (ADR), plan iteration, or any HITL loop leaves
// behind: a sequence of typed posts — problem restatement, analysis, options,
// QUESTIONS an agent raised when intent was unclear, human answers, agent
// revisions, and finally a decision. Two design commitments:
//
//   * an OPEN question is a running loop blocked on a person, so it is
//     highlighted and carries its answer composer inline (the ConsultCard
//     posture — navigating away to answer doubles the latency the agent is
//     already paying);
//   * artifacts (browser screenshots, diagrams, docs an agent produced) are
//     framed as first-class evidence, so a thread with visuals reads as a
//     review, not a chat log.
//
// The kind vocabulary ships with defaults for the design-review loop but is
// overridable, so the same thread renders any typed discussion.

import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Chip from './Chip';
import { Avatar } from './Avatar';
import { Button } from '../ui/Button';
import { Textarea } from '../forms/Textarea';
import type { ToneOrAlias } from './tones';

export type ReviewAuthorKind = 'agent' | 'human';

export interface ReviewPostData {
  id: string;
  authorKind: ReviewAuthorKind;
  authorName: string;
  /** Post kind slug — e.g. 'problem' | 'question' | 'decision'. */
  kind: string;
  body: string;
  /** For 'question' posts: true once answered. An unresolved question is the
   *  thread's live HITL gate and renders highlighted with a composer. */
  resolved?: boolean;
  /** What the author produced — a browser screenshot, diagram, document. */
  artifact?: { name: string; type?: string; url?: string | null } | null;
  /** Preformatted timestamp, e.g. "4d ago". */
  timeLabel?: string;
}

export const REVIEW_KIND_LABELS: Record<string, string> = {
  problem: 'problem statement',
  analysis: 'analysis',
  option: 'options',
  question: 'question',
  answer: 'answer',
  artifact: 'artifact',
  revision: 'revision',
  decision: 'decision',
};

export const REVIEW_KIND_TONES: Record<string, ToneOrAlias> = {
  problem: 'info',
  analysis: 'neutral',
  option: 'info',
  question: 'warning',
  answer: 'success',
  artifact: 'purple',
  revision: 'info',
  decision: 'accent',
};

export interface ReviewThreadProps {
  posts: ReviewPostData[];
  /** Answer an open question. Omit to render read-only (terminal threads). */
  onAnswer?: (postId: string, body: string) => void;
  answerBusy?: boolean;
  answerPlaceholder?: string;
  /** The submit label — say what answering does, e.g. "Answer & continue". */
  answerLabel?: string;
  /** Merge/override the built-in kind vocabulary. */
  kindLabels?: Record<string, string>;
  kindTones?: Record<string, ToneOrAlias>;
  /** Shown when the thread has no posts yet. */
  emptyLabel?: string;
  className?: string;
  'data-testid'?: string;
}

export function ArtifactTile({ name, type, url }: { name: string; type?: string; url?: string | null }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-dashed border-border bg-surface-hover/40 px-3 py-2.5">
      <span className="text-lg" role="img" aria-label="artifact">🖼️</span>
      <div className="min-w-0">
        <div className="truncate text-xs font-medium text-text-primary">{name}</div>
        {type && <div className="text-xs text-text-tertiary">{type}</div>}
      </div>
      <div className="flex-1" />
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" className="text-xs text-primary no-underline hover:underline">
          open →
        </a>
      ) : (
        <span className="text-xs text-text-tertiary">stored with the run</span>
      )}
    </div>
  );
}

function Post({ post, labels, tones, onAnswer, busy, placeholder, submitLabel }: {
  post: ReviewPostData;
  labels: Record<string, string>;
  tones: Record<string, ToneOrAlias>;
  onAnswer?: ((postId: string, body: string) => void) | undefined;
  busy: boolean;
  placeholder: string;
  submitLabel: string;
}) {
  const [draft, setDraft] = useState('');
  const openQuestion = post.kind === 'question' && !post.resolved;

  return (
    <div className={cn(
      'border-b border-border px-4 py-3 last:border-b-0',
      openQuestion && 'bg-warning-bg/20',
    )}>
      <div className="flex min-w-0 items-center gap-2">
        {post.authorKind === 'human'
          ? <Avatar name={post.authorName} size={20} />
          : <span className="text-[13px]" role="img" aria-label="agent">🤖</span>}
        <span className="truncate text-xs font-semibold text-text-primary">{post.authorName}</span>
        <Chip tone={tones[post.kind] ?? 'neutral'} size="xs" uppercase>{labels[post.kind] ?? post.kind}</Chip>
        {openQuestion && <Chip tone="warning" size="xs" dot="pulse">needs a human</Chip>}
        {post.kind === 'question' && post.resolved && <Chip tone="success" size="xs">resolved</Chip>}
        <div className="flex-1" />
        {post.timeLabel && <span className="whitespace-nowrap text-xs text-text-tertiary">{post.timeLabel}</span>}
      </div>

      <div className="mt-1.5 whitespace-pre-wrap pl-7 text-xs leading-relaxed text-text-secondary">
        {post.body}
      </div>

      {post.artifact && (
        <div className="mt-2 ml-7">
          <ArtifactTile name={post.artifact.name} type={post.artifact.type} url={post.artifact.url} />
        </div>
      )}

      {openQuestion && onAnswer && (
        <div className="mt-2.5 ml-7 flex flex-col gap-2">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={placeholder}
            rows={2}
            aria-label="Answer this question"
          />
          <div>
            <Button
              size="sm"
              variant="primary"
              disabled={!draft.trim() || busy}
              onClick={() => onAnswer(post.id, draft.trim())}
            >
              {busy ? 'Sending…' : submitLabel}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ReviewThread({
  posts,
  onAnswer,
  answerBusy = false,
  answerPlaceholder = 'Answer the agent — your answer resolves the question and the loop continues.',
  answerLabel = 'Answer & continue the loop',
  kindLabels,
  kindTones,
  emptyLabel = 'No posts yet — an agent opens the thread by restating the problem.',
  className,
  'data-testid': testId,
}: ReviewThreadProps) {
  const labels = { ...REVIEW_KIND_LABELS, ...kindLabels };
  const tones = { ...REVIEW_KIND_TONES, ...kindTones };

  return (
    <div
      className={cn('overflow-hidden rounded-lg border border-border bg-surface', className)}
      {...(testId ? { 'data-testid': testId } : {})}
    >
      {posts.length === 0 ? (
        <div className="px-4 py-8 text-center text-xs text-text-tertiary">{emptyLabel}</div>
      ) : posts.map((p) => (
        <Post
          key={p.id}
          post={p}
          labels={labels}
          tones={tones}
          onAnswer={onAnswer}
          busy={answerBusy}
          placeholder={answerPlaceholder}
          submitLabel={answerLabel}
        />
      ))}
    </div>
  );
}

export default ReviewThread;
