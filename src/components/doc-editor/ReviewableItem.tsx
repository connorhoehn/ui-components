// frontend/src/components/doc-editor/ReviewableItem.tsx
//
// A single task item in ack mode with review controls.

import { useState, useEffect, useRef } from 'react';
import type { TaskItem } from '../../types/document';
import { cn } from '../../lib/cn';

interface ReviewableItemProps {
  item: TaskItem;
  onAck: (notes?: string) => void;
  onReject: (reason: string) => void;
}

const statusColors: Record<TaskItem['status'], { bg: string; text: string }> = {
  pending: { bg: '#fef3c7', text: '#92400e' },
  acked: { bg: '#d1fae5', text: '#065f46' },
  done: { bg: '#dbeafe', text: '#1e40af' },
  rejected: { bg: '#fee2e2', text: '#991b1b' },
};

const priorityColors: Record<TaskItem['priority'], string> = {
  low: '#6b7280',
  medium: '#f59e0b',
  high: '#ef4444',
};

export default function ReviewableItem({ item, onAck, onReject }: ReviewableItemProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [transition, setTransition] = useState<'none' | 'ack' | 'reject'>('none');
  const prevStatus = useRef(item.status);
  const sc = statusColors[item.status];

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
    ? 'animate-[ackPulse_0.6s_ease-out] border-[#22c55e] bg-[#f0fdf4]'
    : transition === 'reject'
    ? 'animate-[rejectPulse_0.6s_ease-out] border-[#ef4444] bg-[#fef2f2]'
    : '';

  return (
    <div className={cn('bg-white border border-[#e5e7eb] rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out', transitionClass)}>
      <div className={cn('flex items-center mb-1.5')}>
        <span className={cn('text-sm font-medium flex-1 text-[#1e293b]')}>{item.text}</span>
        <span
          className={cn('inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2')}
          style={{ background: sc.bg, color: sc.text }}
        >
          {item.status}
        </span>
        <span
          className={cn('inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent')}
          style={{ color: priorityColors[item.priority], border: `1px solid ${priorityColors[item.priority]}` }}
        >
          {item.priority}
        </span>
      </div>

      {item.status === 'acked' && (
        <div className={cn('flex items-center gap-1.5 text-xs text-[#6b7280] mb-1')}>
          <span className={cn('w-5 h-5 rounded-full bg-[#22c55e] text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0')}>✓</span>
          <span>
            Approved by <strong className={cn('text-[#334155]')}>{item.ackedBy?.slice(0, 8) ?? 'user'}</strong>
            {item.ackedAt && <> · {new Date(item.ackedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>}
            {item.notes && <> — {item.notes}</>}
          </span>
        </div>
      )}

      {item.status === 'rejected' && (
        <div className={cn('flex items-center gap-1.5 text-xs text-[#991b1b] mb-1')}>
          <span className={cn('w-5 h-5 rounded-full bg-[#ef4444] text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0')}>✕</span>
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
            <button type="button" className={cn('px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-[#22c55e] text-white', submitting && 'opacity-60 cursor-not-allowed')} onClick={handleAck} disabled={submitting}>
              Acknowledge
            </button>
            <button type="button" className={cn('px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-[#ef4444] text-white', submitting && 'opacity-60 cursor-not-allowed')} onClick={handleReject} disabled={submitting}>
              Reject
            </button>
            {!showNotes && (
              <button
                type="button"
                className={cn('px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-[#6b7280] border border-[#d1d5db]')}
                onClick={() => setShowNotes(true)}
              >
                Add note
              </button>
            )}
          </div>

          {showNotes && (
            <div className={cn('mt-2')}>
              <textarea
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
                className={cn('w-full min-h-[60px] p-2 text-[13px] border border-[#d1d5db] rounded-md resize-y font-[inherit] bg-white text-[#1e293b] outline-none')}
              />
              <div className={cn('flex gap-1.5 mt-1.5')}>
                <button
                  type="button"
                  className={cn('px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-[#22c55e] text-white')}
                  onClick={handleAck}
                  disabled={submitting}
                  tabIndex={0}
                >
                  Submit & Acknowledge
                </button>
                <button
                  type="button"
                  className={cn('px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-[#ef4444] text-white')}
                  onClick={handleReject}
                  disabled={submitting}
                  tabIndex={0}
                >
                  Submit & Reject
                </button>
                <button
                  type="button"
                  className={cn('px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer bg-transparent text-[#6b7280] border border-[#d1d5db]')}
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
