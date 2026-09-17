// InviteCandidateList — the candidate picker + confirm button extracted
// from InviteToCallDialog so "add people to this call" can render inside
// other surfaces (CallSettingsDialog's People tab, side panels) without
// dragging the modal shell along.
//
// v2 grew it into a general presence-aware people picker: an optional
// filter input (`searchable`), Online/Offline section grouping
// (`grouped`, driven by the new `online` field), and a single-select
// mode (`selectMode='single'`) where clicking a row fires `onPick`
// immediately — the shape a "start a DM with someone" surface needs.
// Every pre-v2 default (multi-select checkboxes + confirm, testids,
// empty-state copy) is preserved verbatim.
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
// what embedded surfaces want. In single-select mode `confirm` is null.
//
// Every data-testid (`invite-candidate`, `invite-to-call-confirm`,
// `invite-to-call-empty`, `invite-to-call-everyone-here`) is preserved
// verbatim from the dialog so existing e2e selectors keep working in
// both hosts.

import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { Avatar } from '../shared/Avatar';
import { PresenceDot } from '../shared/PresenceDot';
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
    /** Non-selectable for a reason that is NOT "already on this call" —
     *  e.g. an offline person a ring would never reach. Renders the same
     *  dimmed, non-clickable row without claiming "In call". Pair it with
     *  `statusLabel` so the row says WHY. */
    disabled?: boolean;
    /** Free-text right-hand annotation, e.g. "On a call" / "Offline".
     *  Purely informational — it does NOT affect selectability, so a
     *  caller can mark someone busy while still allowing a knock/join.
     *  `alreadyInCall` and `pending` keep their own fixed labels and win
     *  over this one. */
    statusLabel?: string;
    /** Presence: true → online dot, false → offline dot, undefined → no
     *  dot. Also drives which section a row lands in under `grouped`. */
    online?: boolean;
    /** Shown on offline rows when present, e.g. "Last seen 2h ago".
     *  Pre-formatted by the caller — this component never touches
     *  Date.now(). */
    lastSeenLabel?: string;
    /** Avatar brand color override (falls back to the name hash). */
    color?: string;
}

/** The two extracted blocks handed to the `children` render prop. */
export interface InviteCandidateListParts {
    /** Empty states + the selectable candidate rows. */
    list: ReactNode;
    /** The "Invite N people" confirm button (testid `invite-to-call-confirm`).
     *  null when `selectMode='single'` — there is nothing to confirm. */
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
    /** Surface the list renders on. 'light' (default) uses the theme
     *  tokens the invite modal always used; 'dark' swaps to white/alpha
     *  classes for dark call chrome (CallSettingsDialog's People tab) —
     *  without it the names render dark-on-dark and disappear. */
    tone?: 'light' | 'dark';
    /** Renders a filter input (testid `people-search`) that narrows the
     *  rows by name or userId, case-insensitive. */
    searchable?: boolean;
    /** Renders "Online" then "Offline" section headers. Rows with
     *  `online: true` land under Online; everything else (including rows
     *  without presence data) lands under Offline. Offline rows show
     *  `lastSeenLabel` when present and are STILL selectable. */
    grouped?: boolean;
    /** 'multi' (default) keeps the checkbox + confirm flow. 'single'
     *  drops checkboxes and confirm — clicking a row fires `onPick`
     *  immediately. */
    selectMode?: 'multi' | 'single';
    /** Row click handler for `selectMode='single'`. */
    onPick?: (userId: string) => void;
    /** Verb on the confirm button. Defaults to "Invite" (so every existing
     *  host keeps "Invite 2 people"); a call picker passes "Call". The
     *  zero-selection state renders the bare verb. */
    confirmLabel?: string;
    /** Text while `loading`. Defaults to "Inviting…". */
    confirmLoadingLabel?: string;
    /**
     * The counted form of the confirm label, when `<verb> N people` is not
     * English for this verb.
     *
     * The default reads "Invite 2 people" and "Call 2 people", which is why it
     * was written that way — but it also produced "Start chat 2 people" the
     * moment a host used a verb that wants a preposition. The grammar belongs
     * to the caller's verb, and the caller is the only one that knows it.
     */
    confirmCountLabel?: (count: number) => string;
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
    tone = 'light',
    searchable = false,
    grouped = false,
    selectMode = 'multi',
    onPick,
    confirmLabel = 'Invite',
    confirmLoadingLabel = 'Inviting…',
    confirmCountLabel,
    className,
    'data-testid': testId,
}: InviteCandidateListProps) {
    const dark = tone === 'dark';
    const single = selectMode === 'single';
    const [selected, setSelected] = useState<Set<string>>(() => new Set());
    const [query, setQuery] = useState('');

    // Reset the selection whenever the host surface says so (e.g. each
    // time its dialog opens).
    useEffect(() => {
        setSelected(new Set());
        setQuery('');
    }, [resetKey]);

    const invitable = useMemo(
        () => candidates.filter((c) => !c.alreadyInCall),
        [candidates],
    );

    // A selection only ever names people who can still be invited. The one
    // this existed for: pick Bob, ring him, he joins — his row flips to
    // "already on this call" and the list says everyone is here, but the
    // button still read "Invite 1 person" because the picked id lived on in
    // state. Prune on every candidate change, not just on the reset key.
    useEffect(() => {
        setSelected((prev) => {
            if (prev.size === 0) return prev;
            const keep = new Set(invitable.map((c) => c.userId));
            let changed = false;
            const next = new Set<string>();
            for (const id of prev) {
                if (keep.has(id)) next.add(id);
                else changed = true;
            }
            return changed ? next : prev;
        });
    }, [invitable]);

    // Search narrows what renders; it never touches the selection, so a
    // person picked before typing stays picked while filtered out.
    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!searchable || !q) return candidates;
        return candidates.filter(
            (c) =>
                c.name.toLowerCase().includes(q) ||
                c.userId.toLowerCase().includes(q),
        );
    }, [candidates, searchable, query]);

    const toggle = (userId: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(userId)) next.delete(userId);
            else next.add(userId);
            return next;
        });
    };

    const count = selected.size;

    const renderRow = (c: InviteCandidate) => {
        const disabled = !!c.alreadyInCall || !!c.disabled || loading;
        const isSelected = !single && selected.has(c.userId);
        return (
            <li key={c.userId}>
                <button
                    type="button"
                    disabled={disabled}
                    aria-pressed={single ? undefined : isSelected}
                    onClick={() => {
                        if (single) onPick?.(c.userId);
                        else toggle(c.userId);
                    }}
                    data-testid="invite-candidate"
                    data-user-id={c.userId}
                    data-selected={isSelected ? 'true' : 'false'}
                    data-already-in-call={c.alreadyInCall ? 'true' : 'false'}
                    data-disabled={disabled ? 'true' : 'false'}
                    className={cn(
                        'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left',
                        disabled
                            ? 'opacity-50 cursor-not-allowed'
                            : cn('cursor-pointer', dark ? 'hover:bg-white/10' : 'hover:bg-surface-hover'),
                        isSelected && (dark ? 'bg-white/10' : 'bg-surface-hover'),
                    )}
                >
                    <span className="relative inline-flex shrink-0">
                        <Avatar name={c.name} src={c.avatarUrl} color={c.color} size={24} />
                        {c.online !== undefined && (
                            <PresenceDot
                                state={c.online ? 'online' : 'offline'}
                                pulse={false}
                                size="xs"
                                className={cn(
                                    'absolute -bottom-0.5 -right-0.5 rounded-full ring-2',
                                    dark ? 'ring-call-chrome' : 'ring-surface',
                                )}
                            />
                        )}
                    </span>
                    <span className={cn('flex-1 truncate text-[13px]', dark ? 'text-white' : 'text-text-primary')}>
                        {c.name}
                    </span>
                    {c.online === false && c.lastSeenLabel && (
                        <span
                            data-testid="invite-candidate-last-seen"
                            className={cn('shrink-0 text-[11px]', dark ? 'text-white/50' : 'text-neutral')}
                        >
                            {c.lastSeenLabel}
                        </span>
                    )}
                    {/* Informational annotation. Sits alongside the checkbox
                        rather than replacing it — a person can be busy AND
                        still selectable (you knock to join their call). */}
                    {c.statusLabel && !c.alreadyInCall && !c.pending && (
                        <span
                            data-testid="invite-candidate-status"
                            className={cn('shrink-0 text-[11px]', dark ? 'text-white/50' : 'text-neutral')}
                        >
                            {c.statusLabel}
                        </span>
                    )}
                    {c.alreadyInCall ? (
                        <span className={cn('text-[11px]', dark ? 'text-white/50' : 'text-neutral')}>In call</span>
                    ) : c.pending ? (
                        <span className={cn('text-[11px]', dark ? 'text-white/50' : 'text-neutral')}>Ringing…</span>
                    ) : single || c.disabled ? null : (
                        <span
                            aria-hidden="true"
                            className={cn(
                                'grid h-4 w-4 place-items-center rounded border text-[10px]',
                                isSelected
                                    ? 'border-transparent bg-primary text-white'
                                    : cn('text-transparent', dark ? 'border-white/30' : 'border-border'),
                            )}
                        >
                            ✓
                        </span>
                    )}
                </button>
            </li>
        );
    };

    const sectionHeader = (label: string, id: string) => (
        <li
            key={`section-${id}`}
            data-testid={`people-group-${id}`}
            aria-hidden="true"
            className={cn(
                'px-2 pb-0.5 pt-2 text-[11px] font-semibold uppercase tracking-wide first:pt-0',
                dark ? 'text-white/40' : 'text-text-tertiary',
            )}
        >
            {label}
        </li>
    );

    const onlineRows = grouped ? visible.filter((c) => c.online === true) : [];
    const offlineRows = grouped ? visible.filter((c) => c.online !== true) : [];

    const list = (
        <>
            {searchable && (
                <Input
                    type="search"
                    size="sm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search people"
                    aria-label="Search people"
                    data-testid="people-search"
                    className={cn(
                        'mb-1',
                        dark &&
                            'border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:ring-white/20',
                    )}
                />
            )}
            {candidates.length === 0 ? (
                <p
                    className={cn('m-0 text-[13px]', dark ? 'text-white/60' : 'text-text-secondary')}
                    data-testid="invite-to-call-empty"
                >
                    {/* Grouped pickers list offline people too, so "nobody is
                        online" would be the wrong claim for their empty list. */}
                    {grouped ? 'No one to show yet.' : 'Nobody else is online right now.'}
                </p>
            ) : invitable.length === 0 ? (
                <p
                    className={cn('m-0 text-[13px]', dark ? 'text-white/60' : 'text-text-secondary')}
                    data-testid="invite-to-call-everyone-here"
                >
                    Everyone who&apos;s online is already on this call.
                </p>
            ) : visible.length === 0 ? (
                <p
                    className={cn('m-0 text-[13px]', dark ? 'text-white/60' : 'text-text-secondary')}
                    data-testid="people-search-empty"
                >
                    No one matches &ldquo;{query.trim()}&rdquo;.
                </p>
            ) : (
                <ul
                    /* A flat 280px showed ~6 of 9 candidates with no visible
                       scrollbar (macOS overlay scrollbars), so the rest read as
                       missing. Grow with the viewport and keep the track drawn. */
                    className="flex flex-col gap-1 m-0 p-0 list-none max-h-[min(55vh,480px)] overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-gutter:stable]"
                    aria-label="People you can invite"
                >
                    {grouped ? (
                        <>
                            {onlineRows.length > 0 && sectionHeader('Online', 'online')}
                            {onlineRows.map(renderRow)}
                            {offlineRows.length > 0 && sectionHeader('Offline', 'offline')}
                            {offlineRows.map(renderRow)}
                        </>
                    ) : (
                        visible.map(renderRow)
                    )}
                </ul>
            )}
        </>
    );

    const confirm = single ? null : (
        <Button
            variant="primary"
            size="md"
            // The ring went out: the picker starts over. Left selected, the
            // same people were one click from being rung twice.
            onClick={() => {
                const ids = [...selected];
                setSelected(new Set());
                void onInvite(ids);
            }}
            disabled={loading || count === 0}
            data-autofocus
            // Derived from the list's own testid where the host gave one, so a
            // "New chat" popover does not emit a control named after calling.
            // The bare fallback is the name every existing suite already
            // reaches for.
            data-testid={testId ? `${testId}-confirm` : 'invite-to-call-confirm'}
        >
            {loading
                ? confirmLoadingLabel
                : count === 0
                    ? confirmLabel
                    : confirmCountLabel
                        ? confirmCountLabel(count)
                        : `${confirmLabel} ${count} ${count === 1 ? 'person' : 'people'}`}
        </Button>
    );

    if (children) return <>{children({ list, confirm })}</>;

    return (
        <div className={cn('flex flex-col gap-3', className)} data-testid={testId}>
            {list}
            {confirm && <div className="flex justify-end">{confirm}</div>}
        </div>
    );
}

export default InviteCandidateList;
