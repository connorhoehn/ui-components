// frontend/src/components/doc-editor/DocumentHeader.tsx
//
// Header bar with title, status, mode selector, participants, and export menu.

import { useState } from 'react';
import type { ViewMode, DocumentMeta, Participant } from '../../types/document';
import ParticipantAvatars from './ParticipantAvatars';
import { cn } from '../../lib/cn';

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
  draft: { bg: '#fef3c7', text: '#92400e' },
  review: { bg: '#dbeafe', text: '#1e40af' },
  final: { bg: '#d1fae5', text: '#065f46' },
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

  return (
    <header className={cn('flex flex-col py-2 px-4 bg-white border-b border-[#e5e7eb] shrink-0 gap-1.5 sticky top-[53px] z-[34]')}>
      {/* Row 1: breadcrumb + title + status + participants */}
      <div className={cn('flex items-center justify-between')}>
        <div className={cn('flex items-center gap-2.5')}>
          {onBack && (
            <button
              onClick={onBack}
              className={cn('bg-transparent border-none text-[#3b82f6] cursor-pointer text-[13px] p-0 flex items-center gap-1 font-[inherit]')}
            >
              &larr; Documents
            </button>
          )}
          <input
            className={cn('text-base font-semibold border border-transparent rounded outline-none bg-transparent font-[inherit] min-w-[180px] text-[#111827] py-1 px-2 focus:border-[#3b82f6]')}
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
            <span className={cn('inline-flex items-center gap-1 text-[11px] font-semibold py-0.5 px-2.5 rounded-full bg-[#f3f4f6] text-[#6b7280]')}>
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
                'py-1.5 px-3.5 text-[13px] font-semibold border border-[#d1d5db] rounded-md cursor-pointer font-[inherit]',
                mode === m ? 'bg-[#3b82f6] text-white' : 'bg-white text-[#374151]',
              )}
              onClick={() => onModeChange(m)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className={cn('flex items-center gap-2')}>

          {/* My Items — always visible */}
          <button
            type="button"
            className={cn('py-1.5 px-3 text-[13px] font-medium border border-[#d1d5db] rounded-md bg-white text-[#374151] cursor-pointer font-[inherit] relative')}
            onClick={onToggleMyItems}
          >
            My Items{myItemCount ? ` (${myItemCount})` : ''}
          </button>

          {/* Call button — always visible when available */}
          {onToggleVideoCall && (
            <button
              type="button"
              className={cn(
                'py-1.5 px-3 text-[13px] font-medium border rounded-md cursor-pointer font-[inherit] relative',
                isCallActive ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]' : 'bg-white text-[#374151] border-[#d1d5db]',
              )}
              onClick={onToggleVideoCall}
            >
              {isCallActive ? 'In Call' : 'Call'}
            </button>
          )}

          {/* Finalize / Unlock */}
          {meta.status === 'final' ? (
            <button
              type="button"
              className={cn('py-1.5 px-3 text-[13px] font-medium border border-[#86efac] rounded-md bg-[#f0fdf4] text-[#065f46] cursor-pointer font-[inherit] relative')}
              onClick={onUnlock}
            >
              Unlock
            </button>
          ) : (
            <button
              type="button"
              className={cn('py-1.5 px-3 text-[13px] font-medium border border-[#86efac] rounded-md bg-[#f0fdf4] text-[#065f46] cursor-pointer font-[inherit] relative')}
              onClick={onFinalize}
            >
              Finalize
            </button>
          )}

          {/* More — secondary actions + export */}
          <div className={cn('relative')}>
            <button
              type="button"
              className={cn('py-1.5 px-3 text-[13px] font-medium border border-[#d1d5db] rounded-md bg-white text-[#374151] cursor-pointer font-[inherit] relative tracking-wider')}
              onClick={() => setShowMore((v) => !v)}
              title="More actions"
            >
              ⋯
            </button>
            {showMore && (
              <div className={cn('absolute top-full right-0 mt-1 bg-white border border-[#e5e7eb] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] overflow-hidden')}>
                <button
                  type="button"
                  className={cn('block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#374151] text-left cursor-pointer font-[inherit] hover:bg-[#f3f4f6]')}
                  onClick={() => { onToggleHistory(); setShowMore(false); }}
                >
                  History
                </button>
                {onToggleVideoHistory && (pastCallsCount ?? 0) > 0 && (
                  <button
                    type="button"
                    className={cn('block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#374151] text-left cursor-pointer font-[inherit] hover:bg-[#f3f4f6]')}
                    onClick={() => { onToggleVideoHistory(); setShowMore(false); }}
                  >
                    Past Calls ({pastCallsCount})
                  </button>
                )}
                <div className={cn('border-t border-[#f1f5f9] my-1')} />
                {(['markdown', 'pdf', 'json'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    className={cn('block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#374151] text-left cursor-pointer font-[inherit] hover:bg-[#f3f4f6]')}
                    onClick={() => { onExport(fmt); setShowMore(false); }}
                  >
                    Export {fmt.charAt(0).toUpperCase() + fmt.slice(1)}
                  </button>
                ))}
                <div className={cn('border-t border-[#f1f5f9] my-1')} />
                <button
                  type="button"
                  className={cn('block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#dc2626] text-left cursor-pointer font-[inherit] hover:bg-[#fff5f5]')}
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
