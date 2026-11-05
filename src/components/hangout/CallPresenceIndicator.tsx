// CallPresenceIndicator — "who's on the call right now", for the app shell.
//
// Rooms already answer this: HangoutRoomRow renders PresenceAvatars + a
// count badge per row. Ad-hoc calls (global-hangout, `dm:` lobbies) are
// not room rows, so there was no at-a-glance signal that a call was
// running or how many people were on it — you only found out if you were
// rung, or if the discovery banner happened to be showing.
//
// Deliberately compact so it can sit in a header next to the Hangout
// button. Renders nothing at zero participants, so consumers can mount
// it unconditionally.
//
// Composition: PresenceAvatars (the same face-pile rooms use, so the two
// surfaces look like one system) + a count. Tokens only, no inline styles.

import { PresenceAvatars, type PresenceUser } from '../shared/PresenceAvatars';

export interface CallPresenceIndicatorProps {
    /** People currently on the call. Names must be pre-resolved. */
    participants: Array<{ userId: string; name: string; avatarUrl?: string }>;
    /** Overrides the rendered count when the caller knows a truer number
     *  than it has names for (e.g. the server's participantCount while
     *  some display names are still resolving). */
    count?: number;
    /** Click target — typically "open/expand the call". */
    onClick?: () => void;
    /** Live-region label prefix, e.g. the lobby name. */
    label?: string;
    maxVisible?: number;
}

export function CallPresenceIndicator({
    participants,
    count,
    onClick,
    label,
    maxVisible = 3,
}: CallPresenceIndicatorProps) {
    const total = count ?? participants.length;
    if (total <= 0) return null;

    const users: PresenceUser[] = participants.map((p) => ({
        id: p.userId,
        name: p.name,
        avatarUrl: p.avatarUrl,
    } as PresenceUser));

    const body = (
        <>
            {/* Pulsing dot — the same "this is happening now" cue the
                discovery banner uses. */}
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {users.length > 0 && (
                <PresenceAvatars users={users} maxVisible={maxVisible} size={22} />
            )}
            <span className="text-[12px] font-medium text-text-primary" data-testid="call-presence-count">
                {total}
            </span>
        </>
    );

    const className =
        'inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2 py-1';

    if (onClick) {
        return (
            <button
                data-ui-part=""
                type="button"
                onClick={onClick}
                data-testid="call-presence-indicator"
                data-participant-count={total}
                aria-label={`${total} ${total === 1 ? 'person' : 'people'} on the call${label ? ` in ${label}` : ''}`}
                className={`${className} cursor-pointer hover:bg-surface-hover`}
            >
                {body}
            </button>
        );
    }

    return (
        <span
            role="status"
            aria-live="polite"
            data-testid="call-presence-indicator"
            data-participant-count={total}
            aria-label={`${total} ${total === 1 ? 'person' : 'people'} on the call${label ? ` in ${label}` : ''}`}
            className={className}
        >
            {body}
        </span>
    );
}

export default CallPresenceIndicator;
