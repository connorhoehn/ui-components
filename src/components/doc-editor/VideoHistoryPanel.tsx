// frontend/src/components/doc-editor/VideoHistoryPanel.tsx
//
// Shows past video call sessions for a document — participants, duration,
// and future transcript/summary once the video pipeline populates them.

import { useEffect } from 'react';
import { Panel, PanelHeader, PanelBody } from '../ui/Panel';
import type { VideoSession } from '../../hooks/useVideoSessions';
import { cn } from '../../lib/cn';

interface VideoHistoryPanelProps {
  sessions: VideoSession[];
  loading: boolean;
  onFetch: () => void;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDuration(startedAt: string, endedAt?: string): string {
  const start = new Date(startedAt).getTime();
  const end = endedAt ? new Date(endedAt).getTime() : Date.now();
  const diffMs = end - start;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return '<1m';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ${mins % 60}m`;
}

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function VideoHistoryPanel({ sessions, loading, onFetch, onClose }: VideoHistoryPanelProps) {
  useEffect(() => { onFetch(); }, [onFetch]);

  const endedSessions = sessions.filter(s => s.status === 'ended');
  const activeSessions = sessions.filter(s => s.status === 'active');

  return (
    <Panel width={340}>
      <PanelHeader title="Past Conversations" onClose={onClose} />
      <PanelBody padding="12px">
        {loading && (
          <div className={cn('text-center text-text-tertiary text-[13px] py-6')}>
            Loading...
          </div>
        )}

        {!loading && sessions.length === 0 && (
          <div className={cn('text-center text-text-tertiary text-[13px] py-6')}>
            No video conversations yet for this document.
          </div>
        )}

        {/* Active calls */}
        {activeSessions.map(session => (
          <SessionCard key={session.sessionId} session={session} isActive />
        ))}

        {/* Past calls */}
        {endedSessions.map(session => (
          <SessionCard key={session.sessionId} session={session} />
        ))}
      </PanelBody>
    </Panel>
  );
}

// ---------------------------------------------------------------------------
// SessionCard
// ---------------------------------------------------------------------------

function SessionCard({ session, isActive }: { session: VideoSession; isActive?: boolean }) {
  return (
    <div className={cn(
      'rounded-lg p-3 mb-2',
      isActive ? 'border border-[#10b981] bg-[rgba(16,185,129,0.04)]' : 'border border-border bg-white',
    )}>
      {/* Top row: time + duration */}
      <div className={cn('flex justify-between items-center mb-1')}>
        <span className={cn('text-[11px] text-text-tertiary')}>
          {relativeTime(session.startedAt)}
        </span>
        <div className={cn('flex items-center gap-1')}>
          {isActive && (
            <span className={cn('text-[11px] font-semibold text-[#10b981] bg-[rgba(16,185,129,0.1)] px-1.5 py-px rounded-full')}>
              Live
            </span>
          )}
          <span className={cn('text-[11px] text-text-secondary')}>
            {formatDuration(session.startedAt, session.endedAt)}
          </span>
        </div>
      </div>

      {/* Participants */}
      <div className={cn('flex flex-wrap gap-1 mb-2')}>
        {session.participants.map((p, i) => (
          <span key={`${p.userId}-${i}`} className={cn('text-[11px] text-text-secondary bg-surface-panel px-2 py-0.5 rounded-full')}>
            {p.displayName || p.userId.slice(0, 10)}
          </span>
        ))}
      </div>

      {/* Summary (if available) */}
      {session.aiSummary && (
        <div className={cn('text-[11px] text-text-primary bg-surface-panel p-2 rounded-md leading-normal')}>
          {session.aiSummary}
        </div>
      )}

      {/* Transcript status */}
      {session.transcriptStatus && session.transcriptStatus !== 'available' && (
        <div className={cn('text-[11px] text-text-tertiary mt-1')}>
          Transcript: {session.transcriptStatus}
        </div>
      )}
    </div>
  );
}
