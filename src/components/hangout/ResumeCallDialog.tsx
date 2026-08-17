// ResumeCallDialog — "you were in a call, want to rejoin?" prompt.
//
// Rendered by the gateway's frontend (AppLayout) when the user mounts the
// app and the gateway reports an active call session they were part of
// (typical case: page refresh / tab crash mid-call). Purely
// presentational — the consumer wires `onReconnect` to the existing
// openHangout flow.
//
// Composition:
//   - Modal (focus trap + Esc/backdrop close) — same shell used by
//     ConfirmDialog so we inherit a11y for free.
//   - Avatar list for participants (≥1, falls back to safeDisplayName).
//   - Live duration counter — re-derived from a per-second tick so the
//     parent never has to re-render the whole tree to advance the clock.
//   - Primary "Reconnect" + secondary "Dismiss" buttons.
//
// No inline styles — everything goes through Tailwind v4 design tokens
// (same palette as ConfirmDialog: text-text-primary / text-text-secondary /
// bg-info-bg chips).

import { useEffect, useState } from 'react';

import { Avatar } from '../shared/Avatar';
import Modal from '../shared/Modal';
import { Button } from '../ui/Button';

/** Resume-dialog participant shape. Independent of any hangout-internal
 *  type so callers can pass thin {id,name} objects without dragging in
 *  PresenceUser / SfuParticipant. */
export interface ResumeCallParticipant {
    /** Stable identifier — used as React key + safeDisplayName fallback. */
    userId: string;
    /** Pre-resolved display name. Caller MUST pass safeDisplayName output
     *  so a raw UUID never reaches the dialog. */
    name: string;
    /** Optional avatar URL — Avatar falls back to initials when absent. */
    avatarUrl?: string;
}

export interface ResumeCallDialogProps {
    /** Visibility — when false the modal is unmounted entirely. */
    open: boolean;
    /** Backdrop click / Esc / Dismiss button → caller decides whether to
     *  hide (typically yes) and whether to remember the dismissal. */
    onClose: () => void;
    /** Reconnect button. May be async; the dialog spins while pending
     *  IF `loading` is also true (the caller controls that state). */
    onReconnect: () => void | Promise<void>;
    /** Display name of the user who originally started the call. Pass
     *  safeDisplayName output — must never be a raw UUID. */
    callerName: string;
    /** Human-readable lobby name shown in the dialog subtitle. */
    lobbyName: string;
    /** Elapsed ms at MOUNT time. The dialog re-derives the displayed
     *  duration from a per-second tick so the parent never has to re-
     *  render to advance the clock. Pass `Date.now() - call.startedAtMs`
     *  (or just `call.durationMs` from the API). */
    elapsedMs: number;
    /** Other participants currently in the call (excludes self). When
     *  empty the dialog still renders — the prompt becomes
     *  "you were in a call" with no chip row — but the parent should
     *  generally not show the dialog with zero participants (see
     *  useActiveCallResume's filter). */
    participants: ResumeCallParticipant[];
    /** True while a reconnect attempt is in flight. Disables the buttons
     *  and replaces the Reconnect label with "Reconnecting…". */
    loading?: boolean;
}

/** Format a millisecond duration as "MM:SS" / "H:MM:SS". Mirrors the
 *  pattern in components/video/StatusStrip.tsx — kept inline so this
 *  component has no cross-module coupling beyond Modal + Button + Avatar. */
function formatElapsed(ms: number): string {
    const totalSec = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function ResumeCallDialog({
    open,
    onClose,
    onReconnect,
    callerName,
    lobbyName,
    elapsedMs,
    participants,
    loading = false,
}: ResumeCallDialogProps) {
    // Anchor the clock to a single point in time on open: elapsedMs is
    // the snapshot the caller passed, openedAt is the wall-clock when
    // the dialog mounted. Live display = elapsedMs + (now - openedAt).
    // Resets every time the dialog re-opens (open false→true).
    const [openedAt, setOpenedAt] = useState<number | null>(null);
    const [now, setNow] = useState<number>(() => Date.now());

    useEffect(() => {
        if (!open) {
            setOpenedAt(null);
            return;
        }
        setOpenedAt(Date.now());
        setNow(Date.now());
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, [open]);

    const liveElapsed =
        openedAt !== null ? elapsedMs + (now - openedAt) : elapsedMs;

    // Re-rendered footer keeps loading state UI in sync without forcing
    // the consumer to manage a separate "reconnecting" prop.
    const footer = (
        <>
            <Button
                variant="ghost"
                size="md"
                onClick={onClose}
                disabled={loading}
                data-testid="resume-call-dismiss"
            >
                Dismiss
            </Button>
            <Button
                variant="primary"
                size="md"
                onClick={() => {
                    // Don't await — the caller flips `loading` themselves
                    // and we trust them to call onClose on success. Fire-
                    // and-forget keeps the dialog responsive.
                    void onReconnect();
                }}
                disabled={loading}
                data-autofocus
                data-testid="resume-call-reconnect"
            >
                {loading ? 'Reconnecting…' : 'Reconnect'}
            </Button>
        </>
    );

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Reconnect to your call?"
            maxWidth={420}
            footer={footer}
            backdropTestId="resume-call-backdrop"
        >
            <div
                className="flex flex-col gap-3"
                data-testid="resume-call-dialog"
                data-lobby-name={lobbyName}
            >
                <p className="text-[13px] text-[#475569]">
                    You were in a call with{' '}
                    <span className="font-semibold text-text-primary">{callerName}</span>
                    {lobbyName ? (
                        <>
                            {' '}in{' '}
                            <span className="font-mono text-[12px] text-slate-700">{lobbyName}</span>
                        </>
                    ) : null}
                    .
                </p>

                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral">
                        Elapsed
                    </span>
                    <span
                        className="font-mono text-[13px] text-text-primary"
                        data-testid="resume-call-elapsed"
                        aria-live="polite"
                    >
                        {formatElapsed(liveElapsed)}
                    </span>
                </div>

                {participants.length > 0 && (
                    <div
                        className="flex flex-wrap items-center gap-2"
                        role="list"
                        aria-label="Other participants in the call"
                    >
                        {participants.map((p) => (
                            <div
                                key={p.userId}
                                role="listitem"
                                data-testid="resume-call-participant"
                                data-participant-id={p.userId}
                                data-participant-name={p.name}
                                className="inline-flex items-center gap-1.5 rounded-full bg-surface-hover pl-1 pr-2.5 py-1"
                                title={p.name}
                            >
                                {p.avatarUrl ? (
                                    <img
                                        src={p.avatarUrl}
                                        alt={p.name}
                                        className="rounded-full object-cover w-5 h-5"
                                    />
                                ) : (
                                    <Avatar name={p.name} size={20} />
                                )}
                                <span className="text-[12px] font-medium text-slate-700">
                                    {p.name}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default ResumeCallDialog;
