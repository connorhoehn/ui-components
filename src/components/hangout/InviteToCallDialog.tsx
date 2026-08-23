// InviteToCallDialog — "add people" for a call that is ALREADY running.
//
// The gap this closes: once two people are on a call there was no way to
// pull a third person in. Starting a call had affordances (per-user 📞,
// group multi-select); joining one had affordances (incoming toast,
// discovery banner, resume dialog) — but mid-call invitation had none.
//
// Purely presentational. The consumer owns the invite wire call: it
// passes the candidate list (typically the presence roster minus the
// people already in the call), and receives the selected user ids on
// confirm. Selection state lives here so the consumer doesn't have to
// manage it just to render a picker.
//
// Composition: Modal (focus trap + Esc) · Avatar · Button — the same
// shell ResumeCallDialog uses, so focus and a11y behave identically.
// Tailwind design tokens only; no inline styles.

import { useEffect, useMemo, useState } from 'react';

import { Avatar } from '../shared/Avatar';
import Modal from '../shared/Modal';
import { Button } from '../ui/Button';

/** A person who can be invited. Thin on purpose so callers can map a
 *  presence roster straight in without dragging in PresenceUser. */
export interface InviteCandidate {
    userId: string;
    /** Pre-resolved display name — callers MUST pass a human name, never
     *  a raw id/UUID (mirrors ResumeCallParticipant's contract). */
    name: string;
    avatarUrl?: string;
    /** True when this person is already on the call. Rendered as a
     *  non-selectable "In call" row so the list still reads as the full
     *  roster rather than mysteriously omitting people. */
    alreadyInCall?: boolean;
    /** True when they have been rung but have not answered yet. */
    pending?: boolean;
}

export interface InviteToCallDialogProps {
    open: boolean;
    onClose: () => void;
    /** Confirm handler — receives every selected userId. May be async;
     *  the caller flips `loading` while the invites are in flight. */
    onInvite: (userIds: string[]) => void | Promise<void>;
    /** Everyone invitable, including people already on the call (they
     *  render disabled). */
    candidates: InviteCandidate[];
    /** Human label for the call being invited to, shown in the subtitle. */
    lobbyLabel?: string;
    loading?: boolean;
    /** Optional join URL. Rooms are link-shareable, so the picker is the
     *  natural home for that link — it is the one place the user goes
     *  when they want more people here. Previously this lived in a
     *  full-bleed overlay across the call tiles, which covered the video
     *  and read as a rendering bug. */
    shareLink?: string;
}

export function InviteToCallDialog({
    open,
    onClose,
    onInvite,
    candidates,
    lobbyLabel,
    loading = false,
    shareLink,
}: InviteToCallDialogProps) {
    const [selected, setSelected] = useState<Set<string>>(() => new Set());
    const [copied, setCopied] = useState(false);

    // Reset the selection each time the dialog opens so a previous
    // invite's choices never leak into the next one.
    useEffect(() => {
        if (open) setSelected(new Set());
    }, [open]);

    const invitable = useMemo(
        () => candidates.filter((c) => !c.alreadyInCall),
        [candidates],
    );

    const toggle = (userId: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(userId)) next.delete(userId);
            else next.add(userId);
            return next;
        });
    };

    const count = selected.size;

    const footer = (
        <>
            <Button
                variant="ghost"
                size="md"
                onClick={onClose}
                disabled={loading}
                data-testid="invite-to-call-cancel"
            >
                Cancel
            </Button>
            <Button
                variant="primary"
                size="md"
                onClick={() => { void onInvite([...selected]); }}
                disabled={loading || count === 0}
                data-autofocus
                data-testid="invite-to-call-confirm"
            >
                {loading
                    ? 'Inviting…'
                    : count === 0
                        ? 'Invite'
                        : `Invite ${count} ${count === 1 ? 'person' : 'people'}`}
            </Button>
        </>
    );

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Add people to this call"
            maxWidth={420}
            footer={footer}
            backdropTestId="invite-to-call-backdrop"
        >
            <div className="flex flex-col gap-3" data-testid="invite-to-call-dialog">
                {lobbyLabel ? (
                    <p className="text-[13px] text-text-secondary m-0">
                        They&apos;ll be rung into{' '}
                        <span className="font-mono text-[12px] text-text-primary">{lobbyLabel}</span>.
                    </p>
                ) : null}

                {shareLink ? (
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                            Or share a link
                        </span>
                        <div className="flex items-center gap-2">
                            <span
                                className="min-w-0 flex-1 truncate rounded border border-border bg-surface-hover px-2 py-1.5 font-mono text-[11px] text-text-secondary"
                                data-testid="hangout-invite-link"
                                title={shareLink}
                            >
                                {shareLink}
                            </span>
                            <Button
                                variant={copied ? 'secondary' : 'ghost'}
                                size="sm"
                                data-testid="hangout-invite-copy"
                                aria-live="polite"
                                onClick={async () => {
                                    try {
                                        await navigator.clipboard.writeText(shareLink);
                                    } catch {
                                        // Non-secure context / older Safari: a
                                        // transient textarea still copies.
                                        const ta = document.createElement('textarea');
                                        ta.value = shareLink;
                                        ta.style.position = 'fixed';
                                        ta.style.opacity = '0';
                                        document.body.appendChild(ta);
                                        ta.select();
                                        try { document.execCommand('copy'); } catch { /* noop */ }
                                        document.body.removeChild(ta);
                                    }
                                    setCopied(true);
                                    window.setTimeout(() => setCopied(false), 1500);
                                }}
                            >
                                {copied ? '✓ Copied' : 'Copy'}
                            </Button>
                        </div>
                    </div>
                ) : null}

                {candidates.length === 0 ? (
                    <p
                        className="text-[13px] text-text-secondary m-0"
                        data-testid="invite-to-call-empty"
                    >
                        Nobody else is online right now.
                    </p>
                ) : invitable.length === 0 ? (
                    <p
                        className="text-[13px] text-text-secondary m-0"
                        data-testid="invite-to-call-everyone-here"
                    >
                        Everyone who&apos;s online is already on this call.
                    </p>
                ) : (
                    <ul
                        className="flex flex-col gap-1 m-0 p-0 list-none max-h-[280px] overflow-y-auto"
                        aria-label="People you can invite"
                    >
                        {candidates.map((c) => {
                            const disabled = !!c.alreadyInCall || loading;
                            const isSelected = selected.has(c.userId);
                            return (
                                <li key={c.userId}>
                                    <button
                                        type="button"
                                        disabled={disabled}
                                        aria-pressed={isSelected}
                                        onClick={() => toggle(c.userId)}
                                        data-testid="invite-candidate"
                                        data-user-id={c.userId}
                                        data-selected={isSelected ? 'true' : 'false'}
                                        data-already-in-call={c.alreadyInCall ? 'true' : 'false'}
                                        className={[
                                            'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left',
                                            disabled
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'cursor-pointer hover:bg-surface-hover',
                                            isSelected ? 'bg-surface-hover' : '',
                                        ].join(' ')}
                                    >
                                        {c.avatarUrl ? (
                                            <img
                                                src={c.avatarUrl}
                                                alt=""
                                                className="h-6 w-6 rounded-full object-cover"
                                            />
                                        ) : (
                                            <Avatar name={c.name} size={24} />
                                        )}
                                        <span className="flex-1 truncate text-[13px] text-text-primary">
                                            {c.name}
                                        </span>
                                        {c.alreadyInCall ? (
                                            <span className="text-[11px] text-neutral">In call</span>
                                        ) : c.pending ? (
                                            <span className="text-[11px] text-neutral">Ringing…</span>
                                        ) : (
                                            <span
                                                aria-hidden="true"
                                                className={[
                                                    'grid h-4 w-4 place-items-center rounded border text-[10px]',
                                                    isSelected
                                                        ? 'border-transparent bg-primary text-white'
                                                        : 'border-border text-transparent',
                                                ].join(' ')}
                                            >
                                                ✓
                                            </span>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </Modal>
    );
}

export default InviteToCallDialog;
