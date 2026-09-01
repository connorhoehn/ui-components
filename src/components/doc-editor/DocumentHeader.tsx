// frontend/src/components/doc-editor/DocumentHeader.tsx
//
// Header bar with title, status, mode selector, participants, and export menu.

import { useState } from 'react';
import type { ViewMode, DocumentMeta, Participant } from '../../types/document';
import ParticipantAvatars from './ParticipantAvatars';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';

/**
 * How the call button presents itself.
 *
 * A boolean could only say "in a call" or "not", so the state that matters
 * most — a call is RUNNING in this document and you have not joined it — had
 * to render as a plain "Call", visually identical to no call existing at all.
 * Hosts worked around it by suppressing this button and rendering their own
 * beneath the header, which is a duplicated control waiting to drift.
 *
 * - `idle`      — nothing running; the button starts a call.
 * - `available` — a call is running that you are not in; the button joins it.
 * - `active`    — you are in the call; the button toggles its surface.
 */
export type DocumentHeaderCallVariant = 'idle' | 'available' | 'active';

interface DocumentHeaderProps {
  meta: DocumentMeta;
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  participants: Participant[];
  onUpdateMeta: (patch: Partial<DocumentMeta>) => void;
  onExport: (format: 'markdown' | 'pdf' | 'json') => void;
  onToggleHistory: () => void;
  onToggleVideoCall?: () => void;
  onToggleVideoHistory?: () => void;
  isCallActive?: boolean;
  /**
   * Overrides the call button's presentation. Omit and it is derived from
   * `isCallActive`, so callers written before this prop existed are unchanged.
   */
  callVariant?: DocumentHeaderCallVariant;
  /**
   * Overrides the call button's text — the room name in "Join standup", say.
   * Omit for the variant's default wording.
   */
  callLabel?: string;
  onClearDocument: () => void;
  onJumpToUser?: (participant: Participant) => void;
  sections?: { id: string; title: string }[];
  onToggleMyItems?: () => void;
  myItemCount?: number;
  commentCount?: number;
  onBack?: () => void;
  onFollowUser?: (participant: Participant) => void;
  followingUserId?: string | null;
  onFinalize?: () => void;
  onUnlock?: () => void;
  pastCallsCount?: number;
}

const STATUS_BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  draft: { bg: 'var(--color-warning-bg)', text: 'var(--color-warning-fg)' },
  review: { bg: 'var(--color-info-bg)', text: 'var(--color-info-fg)' },
  final: { bg: 'var(--color-success-bg)', text: 'var(--color-success-fg)' },
};

const CALL_VARIANT_LABELS: Record<DocumentHeaderCallVariant, string> = {
  idle: 'Call',
  available: 'Join Call',
  active: 'In Call',
};

// Header chrome, so these are the themed chrome tokens — never paper. `available`
// borrows the info tone deliberately: an offered call has to read as live and
// joinable, and the neutral surface it used to share with `idle` read as dead.
const CALL_VARIANT_CLASSES: Record<DocumentHeaderCallVariant, string> = {
  idle: 'bg-surface text-text-primary border-border-field',
  available: 'bg-info-bg text-info-fg border-info-border',
  active: 'bg-success-bg text-success-fg border-success-border',
};

const modeLabels: { mode: ViewMode; label: string }[] = [
  { mode: 'editor', label: 'Editor' },
  { mode: 'ack', label: 'Review' },
  { mode: 'reader', label: 'Read' },
];

export default function DocumentHeader({
  meta,
  mode,
  onModeChange,
  participants,
  onUpdateMeta,
  onExport,
  onToggleHistory,
  onToggleVideoCall,
  onToggleVideoHistory,
  isCallActive,
  callVariant,
  callLabel,
  onClearDocument,
  onJumpToUser,
  sections,
  onToggleMyItems,
  myItemCount,
  commentCount,
  onBack,
  onFollowUser,
  followingUserId,
  onFinalize,
  onUnlock,
  pastCallsCount,
}: DocumentHeaderProps) {
  const [showMore, setShowMore] = useState(false);

  const sc = STATUS_BADGE_COLORS[meta.status] ?? STATUS_BADGE_COLORS.draft;

  // `isCallActive` is the pre-variant contract and stays authoritative when no
  // variant is given, so nothing an existing caller renders moves.
  const resolvedCallVariant: DocumentHeaderCallVariant =
    callVariant ?? (isCallActive ? 'active' : 'idle');

  return (
    <header className={cn('flex flex-col py-2 px-4 bg-surface border-b border-border shrink-0 gap-1.5 sticky top-[53px] z-[34]')}>
      {/* Row 1: breadcrumb + title + status + participants */}
      <div className={cn('flex items-center justify-between')}>
        <div className={cn('flex items-center gap-2.5')}>
          {onBack && (
            <button
              onClick={onBack}
              className={cn('bg-transparent border-none text-info-fg cursor-pointer text-[13px] p-0 flex items-center gap-1 font-[inherit]')}
            >
              &larr; Documents
            </button>
          )}
          {/* Inline document-title editor — chrome stripped so it reads as
              the page heading until focused. */}
          <Input
            aria-label="Document title"
            className={cn('w-auto h-auto min-w-[180px] text-base font-semibold border-transparent bg-transparent py-1 px-2')}
            value={meta.title}
            placeholder="Untitled document"
            onChange={(e) => onUpdateMeta({ title: e.target.value })}
          />
          <span
            className={cn('inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full')}
            style={{ background: sc.bg, color: sc.text }}
          >
            {meta.status}
          </span>
          {mode === 'editor' && (
            <span className={cn('text-[11px] text-text-tertiary italic')}>
              Auto-saved
            </span>
          )}
          {meta.updatedAt && (
            <span className={cn('text-[11px] text-text-tertiary')}>
              Last edited {(() => {
                const diff = Date.now() - new Date(meta.updatedAt).getTime();
                const mins = Math.floor(diff / 60000);
                if (mins < 1) return 'just now';
                if (mins < 60) return `${mins}m ago`;
                const hrs = Math.floor(mins / 60);
                if (hrs < 24) return `${hrs}h ago`;
                return `${Math.floor(hrs / 24)}d ago`;
              })()}
            </span>
          )}
          {commentCount != null && commentCount > 0 && (
            <span className={cn('inline-flex items-center gap-1 text-[11px] font-semibold py-0.5 px-2.5 rounded-full bg-surface-hover text-text-secondary')}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {commentCount}
            </span>
          )}
        </div>
        {participants.length > 0 && (
          <ParticipantAvatars participants={participants} sections={sections} onJumpToUser={onJumpToUser} onFollowUser={onFollowUser} followingUserId={followingUserId} />
        )}
      </div>

      {/* Row 2: mode selector + actions */}
      <div className={cn('flex items-center justify-between flex-wrap gap-1')}>
        <div className={cn('flex gap-1')}>
          {modeLabels.map(({ mode: m, label }) => (
            <button
              key={m}
              type="button"
              data-testid={`mode-btn-${m}`}
              className={cn(
                'py-1.5 px-3.5 text-[13px] font-semibold border border-border-field rounded-md cursor-pointer font-[inherit]',
                mode === m ? 'bg-info text-white' : 'bg-surface text-text-primary',
              )}
              onClick={() => onModeChange(m)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className={cn('flex items-center gap-2')}>

          {/* My Items — visible when the host wired the panel. It used to say
              "always visible" and render unguarded, but `onToggleMyItems` is
              optional and nothing else opens that panel, so without it the
              button (and its item count) was pure decoration: clicking it did
              nothing at all. The Call button beside it was already gated on
              `onToggleVideoCall` for exactly this reason. */}
          {onToggleMyItems && (
            <button
              type="button"
              className={cn('py-1.5 px-3 text-[13px] font-medium border border-border-field rounded-md bg-surface text-text-primary cursor-pointer font-[inherit] relative')}
              onClick={onToggleMyItems}
            >
              My Items{myItemCount ? ` (${myItemCount})` : ''}
            </button>
          )}

          {/* Call button — always visible when available. `aria-pressed` carries
              the in-call state to screen readers; the tone alone would leave it
              invisible to anyone not seeing colour. */}
          {onToggleVideoCall && (
            <button
              type="button"
              aria-pressed={resolvedCallVariant === 'active'}
              data-call-variant={resolvedCallVariant}
              className={cn(
                'py-1.5 px-3 text-[13px] font-medium border rounded-md cursor-pointer font-[inherit] relative',
                CALL_VARIANT_CLASSES[resolvedCallVariant],
              )}
              onClick={onToggleVideoCall}
            >
              {callLabel ?? CALL_VARIANT_LABELS[resolvedCallVariant]}
            </button>
          )}

          {/* Finalize / Unlock — the status transition lives entirely with the
              host (`onFinalize` / `onUnlock` are both optional and neither has
              a local fallback). Rendered unguarded, a caller that wired
              neither got a live "Finalize" button whose click left the doc in
              draft with no message. */}
          {meta.status === 'final'
            ? onUnlock && (
              <button
                type="button"
                className={cn('py-1.5 px-3 text-[13px] font-medium border border-success-border rounded-md bg-success-bg text-success-fg cursor-pointer font-[inherit] relative')}
                onClick={onUnlock}
              >
                Unlock
              </button>
            )
            : onFinalize && (
              <button
                type="button"
                className={cn('py-1.5 px-3 text-[13px] font-medium border border-success-border rounded-md bg-success-bg text-success-fg cursor-pointer font-[inherit] relative')}
                onClick={onFinalize}
              >
                Finalize
              </button>
            )}

          {/* More — secondary actions + export */}
          <div className={cn('relative')}>
            <button
              type="button"
              className={cn('py-1.5 px-3 text-[13px] font-medium border border-border-field rounded-md bg-surface text-text-primary cursor-pointer font-[inherit] relative tracking-wider')}
              onClick={() => setShowMore((v) => !v)}
              title="More actions"
            >
              ⋯
            </button>
            {showMore && (
              <div className={cn('absolute top-full right-0 mt-1 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] overflow-hidden')}>
                <button
                  type="button"
                  className={cn('block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover')}
                  onClick={() => { onToggleHistory(); setShowMore(false); }}
                >
                  History
                </button>
                {onToggleVideoHistory && (pastCallsCount ?? 0) > 0 && (
                  <button
                    type="button"
                    className={cn('block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover')}
                    onClick={() => { onToggleVideoHistory(); setShowMore(false); }}
                  >
                    Past Calls ({pastCallsCount})
                  </button>
                )}
                <div className={cn('border-t border-border-subtle my-1')} />
                {(['markdown', 'pdf', 'json'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    className={cn('block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover')}
                    onClick={() => { onExport(fmt); setShowMore(false); }}
                  >
                    Export {fmt.charAt(0).toUpperCase() + fmt.slice(1)}
                  </button>
                ))}
                <div className={cn('border-t border-border-subtle my-1')} />
                <button
                  type="button"
                  className={cn('block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-danger-fg text-left cursor-pointer font-[inherit] hover:bg-danger-bg')}
                  onClick={() => { setShowMore(false); if (window.confirm('Clear all document content? This cannot be undone.')) onClearDocument(); }}
                >
                  Clear Document
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
