// ActiveCallBanner — "there's a live call in this lobby, want to join?"
//
// The non-participant sibling of ResumeCallDialog: shown when the
// gateway's call `status` query (F3, realtime-modules 2026-08-21)
// reports an active call the user was never invited to — e.g. they
// opened the app while a group call was already running. Deliberately a
// BANNER, not a modal: the user didn't ask for anything, so it must not
// trap focus or block the page.
//
// Purely presentational — the consumer wires `onJoin` to its openHangout
// flow and `onDismiss` to hide + remember the dismissal for this callId.
//
// Composition mirrors ResumeCallDialog: Avatar chips, live duration
// re-derived from a per-second tick, Button pair. Tailwind v4 design
// tokens only — no inline styles.

import { useEffect, useState } from 'react';

import { Avatar } from '../shared/Avatar';
import { Button } from '../ui/Button';

/** Thin participant shape — same contract as ResumeCallParticipant:
 *  caller MUST pass safeDisplayName output, never a raw UUID. */
export interface ActiveCallBannerParticipant {
    userId: string;
    name: string;
    avatarUrl?: string;
}

export interface ActiveCallBannerProps {
    /** Visibility — when false nothing renders. */
    open: boolean;
    /** Join button → consumer starts its join flow (may be async; flip
     *  `loading` while pending). */
    onJoin: () => void | Promise<void>;
    /** Dismiss (X / "Not now") → consumer hides and typically remembers
     *  the dismissal for this callId so the banner doesn't re-appear. */
    onDismiss: () => void;
    /** Human-readable lobby label shown in the banner title. */
    lobbyLabel: string;
    /** Elapsed ms at mount — live display advances on a local 1s tick,
     *  so the parent never re-renders to move the clock. 0/absent hides
     *  the duration chip (status replies without startedAt). */
    elapsedMs?: number;
    /** Participants currently in the call. Names pre-resolved. */
    participants: ActiveCallBannerParticipant[];
    /** Overrides the "N in call" count when the caller knows a truer
     *  number than participants.length (e.g. server participantCount
     *  when some names couldn't be resolved). */
    participantCount?: number;
    /** True while the join attempt is in flight. */
    loading?: boolean;
}

function formatElapsed(ms: number): string {
    const totalSec = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function ActiveCallBanner({
    open,
    onJoin,
    onDismiss,
    lobbyLabel,
    elapsedMs = 0,
    participants,
    participantCount,
    loading = false,
}: ActiveCallBannerProps) {
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

    if (!open) return null;

    const liveElapsed = openedAt !== null ? elapsedMs + (now - openedAt) : elapsedMs;
    const count = participantCount ?? participants.length;

    return (
        <div
            role="status"
            aria-live="polite"
            data-testid="active-call-banner"
            data-lobby-name={lobbyLabel}
            className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-md"
        >
            {/* Pulsing live dot — the one visual that says "happening now". */}
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
            </span>

            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-text-primary">
                    Call in progress
                    {lobbyLabel ? (
                        <>
                            {' '}in{' '}
                            <span className="font-mono text-[12px]">{lobbyLabel}</span>
                        </>
                    ) : null}
                </span>
                <span className="flex items-center gap-2 text-[12px] text-text-secondary">
                    <span data-testid="active-call-count">
                        {count} {count === 1 ? 'person' : 'people'} in call
                    </span>
                    {elapsedMs > 0 && (
                        <span
                            className="font-mono text-[12px]"
                            data-testid="active-call-elapsed"
                        >
                            {formatElapsed(liveElapsed)}
                        </span>
                    )}
                </span>
            </div>

            {participants.length > 0 && (
                <div
                    className="flex -space-x-1.5"
                    role="list"
                    aria-label="People in the call"
                >
                    {participants.slice(0, 4).map((p) => (
                        <div
                            key={p.userId}
                            role="listitem"
                            data-testid="active-call-participant"
                            data-participant-id={p.userId}
                            title={p.name}
                            className="rounded-full ring-2 ring-surface"
                        >
                            {p.avatarUrl ? (
                                <img
                                    src={p.avatarUrl}
                                    alt={p.name}
                                    className="h-6 w-6 rounded-full object-cover"
                                />
                            ) : (
                                <Avatar name={p.name} size={24} />
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="flex shrink-0 items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDismiss}
                    disabled={loading}
                    data-testid="active-call-dismiss"
                >
                    Not now
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => { void onJoin(); }}
                    disabled={loading}
                    data-testid="active-call-join"
                >
                    {loading ? 'Joining…' : 'Join call'}
                </Button>
            </div>
        </div>
    );
}

export default ActiveCallBanner;
