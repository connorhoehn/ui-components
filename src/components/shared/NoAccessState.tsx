import EmptyState, { type EmptyStateSize } from './EmptyState';

// NoAccessState — what a reader sees for a thing they may not open: "You
// don't have access to this presentation — ask Frank to share it." Not an
// error (nothing is broken and "Try again" would answer the same) and not a
// status code (a 404 means nothing to the person reading it). A server that
// hides unreadable things behind the same 404 as missing ones is fine here:
// the copy is true for both from where the reader stands.

export interface NoAccessStateProps {
  /** What they tried to open, as a noun phrase: "this presentation". */
  resource: string;
  /** Who can share it. Omitted → "its owner". */
  ownerName?: string | null;
  /** Optional way back ("Back to documents"). */
  actionLabel?: string;
  onAction?: () => void;
  size?: EmptyStateSize;
  className?: string;
  testId?: string;
}

function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** "You don't have access to <resource> — ask <owner> to share it." */
export function noAccessMessage(resource: string, ownerName?: string | null): string {
  const owner = ownerName?.trim() || 'its owner';
  return `You don't have access to ${resource} — ask ${owner} to share it.`;
}

export function NoAccessState({ resource, ownerName, actionLabel, onAction, size, className, testId = 'no-access-state' }: NoAccessStateProps) {
  return (
    <EmptyState
      icon={<LockIcon />}
      title={`You don't have access to ${resource}`}
      body={`Ask ${ownerName?.trim() || 'its owner'} to share it with you.`}
      {...(actionLabel && onAction ? { actionLabel, onAction } : {})}
      {...(size ? { size } : {})}
      {...(className ? { className } : {})}
      testId={testId}
    />
  );
}

export default NoAccessState;
