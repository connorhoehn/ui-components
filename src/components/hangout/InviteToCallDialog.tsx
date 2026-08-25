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
// confirm.
//
// Composition: Modal (focus trap + Esc) — the same shell
// ResumeCallDialog uses, so focus and a11y behave identically — around
// InviteCandidateList, which owns the selection state and the candidate
// rows + confirm button. The list's render-prop seam places the rows in
// the modal body and the confirm in the modal footer, so this dialog
// renders exactly the DOM it always did. Tailwind design tokens only;
// no inline styles.

import { useEffect, useRef, useState } from 'react';

import Modal from '../shared/Modal';
import { Button } from '../ui/Button';
import { InviteCandidateList, type InviteCandidate } from './InviteCandidateList';

export type { InviteCandidate } from './InviteCandidateList';

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
    const [copied, setCopied] = useState(false);

    // "Copied!" reset timer, scheduled from the copy-link click handler.
    // This is a modal: copying the link and then closing or confirming inside
    // 1.5s is the ordinary flow, so the timer routinely outlives the mount.
    const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => () => {
        if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
    }, []);

    return (
        <InviteCandidateList
            candidates={candidates}
            onInvite={onInvite}
            loading={loading}
            // Reset the selection each time the dialog opens so a previous
            // invite's choices never leak into the next one.
            resetKey={open}
        >
            {({ list, confirm }) => (
                <Modal
                    open={open}
                    onClose={onClose}
                    title="Add people to this call"
                    maxWidth={420}
                    footer={(
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
                            {confirm}
                        </>
                    )}
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
                                            if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
                                            copiedTimerRef.current = setTimeout(() => setCopied(false), 1500);
                                        }}
                                    >
                                        {copied ? '✓ Copied' : 'Copy'}
                                    </Button>
                                </div>
                            </div>
                        ) : null}

                        {list}
                    </div>
                </Modal>
            )}
        </InviteCandidateList>
    );
}

export default InviteToCallDialog;
