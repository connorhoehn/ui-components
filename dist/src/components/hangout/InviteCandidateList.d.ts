import { type ReactNode } from 'react';
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
export declare function InviteCandidateList({ candidates, onInvite, loading, resetKey, children, tone, searchable, grouped, selectMode, onPick, confirmLabel, confirmLoadingLabel, confirmCountLabel, className, 'data-testid': testId, }: InviteCandidateListProps): import("react").JSX.Element;
export default InviteCandidateList;
//# sourceMappingURL=InviteCandidateList.d.ts.map