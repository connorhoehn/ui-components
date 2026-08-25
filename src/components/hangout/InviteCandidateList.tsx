// InviteCandidateList — the candidate picker + confirm button extracted
// from InviteToCallDialog so "add people to this call" can render inside
// other surfaces (CallSettingsDialog's People tab, side panels) without
// dragging the modal shell along.
//
// Purely presentational. The consumer owns the invite wire call: it
// passes the candidate list (typically the presence roster minus the
// people already in the call), and receives the selected user ids on
// confirm. Selection state lives here so the consumer doesn't have to
// manage it just to render a picker.
//
// Layout seam: InviteToCallDialog needs the list in the modal BODY and
// the confirm button in the modal FOOTER — two different slots — so the
// component exposes a render-prop (`children`) that receives the two
// blocks and decides where each goes. Without `children` it renders the
// default stacked layout (list, then a right-aligned confirm), which is
// what embedded surfaces want.
//
// Every data-testid (`invite-candidate`, `invite-to-call-confirm`,
// `invite-to-call-empty`, `invite-to-call-everyone-here`) is preserved
// verbatim from the dialog so existing e2e selectors keep working in
// both hosts.

import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { cn } from '../../lib/cn';
import { Avatar } from '../shared/Avatar';
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

/** The two extracted blocks handed to the `children` render prop. */
export interface InviteCandidateListParts {
    /** Empty states + the selectable candidate rows. */
    list: ReactNode;
    /** The "Invite N people" confirm button (testid `invite-to-call-confirm`). */
    confirm: ReactNode;
}

export interface InviteCandidateListProps {
    /** Everyone invitable, including people already on the call (they
     *  render disabled). */
    candidates: InviteCandidate[];
    /** Confirm handler — receives every selected userId. May be async;
     *  the caller flips `loading` while the invites are in flight. */
    onInvite: (userIds: string[]) => void | Promise<void>;
    loading?: boolean;
    /** Selection clears whenever this value changes — dialogs pass their
     *  `open` flag so a previous invite's choices never leak into the
     *  next one. */
    resetKey?: unknown;
    /** Custom layout: receives the list and confirm blocks and places
     *  them (InviteToCallDialog puts the confirm in its modal footer).
     *  Omit for the default stacked layout. */
    children?: (parts: InviteCandidateListParts) => ReactNode;
    /** Applied to the default stacked layout's root only. */
    className?: string;
    'data-testid'?: string;
}

export function InviteCandidateList({
    candidates,
    onInvite,
    loading = false,
    resetKey,
    children,
    className,
    'data-testid': testId,
}: InviteCandidateListProps) {
    const [selected, setSelected] = useState<Set<string>>(() => new Set());

    // Reset the selection whenever the host surface says so (e.g. each
    // time its dialog opens).
    useEffect(() => {
        setSelected(new Set());
    }, [resetKey]);

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

    const list = (
        <>
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
        </>
    );

    const confirm = (
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
    );

    if (children) return <>{children({ list, confirm })}</>;

    return (
        <div className={cn('flex flex-col gap-3', className)} data-testid={testId}>
            {list}
            <div className="flex justify-end">{confirm}</div>
        </div>
    );
}

export default InviteCandidateList;
