// frontend/src/components/doc-editor/ReviewableItem.tsx
//
// A single task item in ack mode with review controls.

import { useState, useEffect, useRef } from 'react';
import type { TaskItem } from '../../types/document';
import { cn } from '../../lib/cn';
import { Textarea } from '../forms/Textarea';

interface ReviewableItemProps {
  item: TaskItem;
  onAck: (notes?: string) => void;
  onReject: (reason: string) => void;
}

const statusColors: Record<TaskItem['status'], { bg: string; text: string }> = {
  pending: { bg: 'var(--color-warning-bg)', text: 'var(--color-warning-fg)' },
  acked: { bg: 'var(--color-success-bg)', text: 'var(--color-success-fg)' },
  done: { bg: 'var(--color-info-bg)', text: 'var(--color-info-fg)' },
  rejected: { bg: 'var(--color-danger-bg)', text: 'var(--color-danger-fg)' },
};

const priorityColors: Record<TaskItem['priority'], string> = {
  low: 'var(--color-neutral)',
  medium: 'var(--color-warning)',
  high: 'var(--color-danger)',
};

// A `TaskItem` reaches this row from the CRDT section payload or the host's
// document API — `src/renderers/sectionItems.ts` documents the same boundary
// for `section.items`. `status`/`priority` are compile-time unions only, so an
// item written by another build ('deferred', 'urgent') gave `undefined` here
// and `sc.bg` below threw, blanking the whole item list. Both now fall back to
// neutral styling while the row still renders its real status/priority text.
const UNKNOWN_STATUS_COLORS = {
  bg: 'var(--color-surface-hover)',
  text: 'var(--color-text-secondary)',
} as const;

export default function ReviewableItem({ item, onAck, onReject }: ReviewableItemProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [transition, setTransition] = useState<'none' | 'ack' | 'reject'>('none');
  const prevStatus = useRef(item.status);
  const sc = statusColors[item.status] ?? UNKNOWN_STATUS_COLORS;
  const priorityColor = priorityColors[item.priority] ?? 'var(--color-neutral)';

  // Ack/reject are deferred 150ms so the pulse animation can play. Two things
  // fall out of that delay: the buttons stay live during the window, so a
  // double click submits twice; and the timer outlives the row, so a list that
  // re-renders mid-animation still fires against an item the user can no
  // longer see. `submitting` covers the first, the ref + cleanup the second.
  const [submitting, setSubmitting] = useState(false);
  const submitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (submitTimer.current) clearTimeout(submitTimer.current);
  }, []);

  useEffect(() => {
    if (prevStatus.current === 'pending' && item.status === 'acked') {
      setTransition('ack');
    } else if (prevStatus.current === 'pending' && item.status === 'rejected') {
      setTransition('reject');
    }
    prevStatus.current = item.status;
  }, [item.status]);

  const handleAck = () => {
    if (submitting) return;
    setSubmitting(true);
    setTransition('ack');
    submitTimer.current = setTimeout(() => {
      submitTimer.current = null;
      onAck(noteText || undefined);
      setNoteText('');
      setShowNotes(false);
      setSubmitting(false);
    }, 150);
  };

  const handleReject = () => {
    if (submitting) return;
    if (!noteText.trim()) {
      setShowNotes(true);
      return;
    }
    setSubmitting(true);
    setTransition('reject');
    submitTimer.current = setTimeout(() => {
      submitTimer.current = null;
      onReject(noteText);
      setNoteText('');
      setShowNotes(false);
      setSubmitting(false);
    }, 150);
  };

  const transitionClass = transition === 'ack'
    ? 'animate-[ackPulse_0.6s_ease-out] border-success bg-success-bg'
    : transition === 'reject'
    ? 'animate-[rejectPulse_0.6s_ease-out] border-danger bg-danger-bg'
    : '';

  return (
    <div className={cn('bg-surface border border-border rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out', transitionClass)}>
      <div className={cn('flex items-center mb-1.5')}>
        <span className={cn('text-sm font-medium flex-1 text-text-primary')}>{item.text}</span>
        <span
          className={cn('inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2')}
          style={{ background: sc.bg, color: sc.text }}
        >
          {item.status}
        </span>
        <span
          className={cn('inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent')}
          style={{ color: priorityColor, border: `1px solid ${priorityColor}` }}
        >
          {item.priority}
        </span>
      </div>

      {item.status === 'acked' && (
        <div className={cn('flex items-center gap-1.5 text-xs text-text-secondary mb-1')}>
          <span className={cn('w-5 h-5 rounded-full bg-success text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0')}>✓</span>
          <span>
            Approved by <strong className={cn('text-text-primary')}>{item.ackedBy?.slice(0, 8) ?? 'user'}</strong>
            {item.ackedAt && <> · {new Date(item.ackedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>}
            {item.notes && <> — {item.notes}</>}
          </span>
        </div>
      )}

      {item.status === 'rejected' && (
        <div className={cn('flex items-center gap-1.5 text-xs text-danger-fg mb-1')}>
          <span className={cn('w-5 h-5 rounded-full bg-danger text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0')}>✕</span>
          <span>
            Rejected by <strong>{item.ackedBy?.slice(0, 8) ?? 'user'}</strong>
            {item.ackedAt && <> · {new Date(item.ackedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>}
            {item.notes && <> — {item.notes}</>}
          </span>
        </div>
      )}

      {item.status === 'pending' && (
        <div>
          <div className={cn('flex gap-2 mt-1.5')}>
            <button data-ui-part="" type="button" className={cn('px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-success text-white', submitting && 'opacity-60 cursor-not-allowed')} onClick={handleAck} disabled={submitting}>
              Acknowledge
            </button>
            <button data-ui-part="" type="button" className={cn('px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-danger text-white', submitting && 'opacity-60 cursor-not-allowed')} onClick={handleReject} disabled={submitting}>
              Reject
            </button>
            {!showNotes && (
              <button
                data-ui-part=""
                type="button"
                className={cn('px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field')}
                onClick={() => setShowNotes(true)}
              >
                Add note
              </button>
            )}
          </div>

          {showNotes && (
            <div className={cn('mt-2')}>
              <Textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (noteText.trim()) handleAck();
                  }
                  if (e.key === 'Escape') {
                    setShowNotes(false);
                    setNoteText('');
                  }
                }}
                placeholder="Add notes or rejection reason... (Enter to submit, Esc to cancel)"
                autoFocus
                className={cn('min-h-[60px] resize-y')}
              />
              <div className={cn('flex gap-1.5 mt-1.5')}>
                <button
                  data-ui-part=""
                  type="button"
                  className={cn('px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-success text-white')}
                  onClick={handleAck}
                  disabled={submitting}
                  tabIndex={0}
                >
                  Submit & Acknowledge
                </button>
                <button
                  data-ui-part=""
                  type="button"
                  className={cn('px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-danger text-white')}
                  onClick={handleReject}
                  disabled={submitting}
                  tabIndex={0}
                >
                  Submit & Reject
                </button>
                <button
                  data-ui-part=""
                  type="button"
                  className={cn('px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field')}
                  onClick={() => { setShowNotes(false); setNoteText(''); }}
                  tabIndex={0}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
