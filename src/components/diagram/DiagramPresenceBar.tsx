// ui-components/src/components/diagram/DiagramPresenceBar.tsx
//
// "Who is on this board" — the avatar cluster that floats over a canvas.
//
// ## Why this is a thin adapter and not a component
//
// The app already answers this question in three other places (the document
// header, the canvas pane, the recordings list) and all three render
// `PresenceAvatars`. A diagram that drew its own avatar row would be a fourth
// answer that drifts: different size, different status dot, no hover card, no
// Follow affordance, and — the one that actually bites — a different idea of
// what colour a person is.
//
// So this file maps `DiagramCollaborator` onto `PresenceUser` and gets out of
// the way. Everything visual belongs to `PresenceAvatars`.
//
// ## The local user is in the list
//
// `useCollaborativeDiagram` hands out two arrays and this one takes
// `participants`, which includes you. A presence list that omits the reader is
// answering a different question ("who else"), and it reads as a bug the moment
// you are alone on a board and the list is empty.
//
// Excalidraw's collaborator map gets the OTHER array (`collaborators`) for the
// opposite reason: it draws your cursor from your own pointer, so putting
// yourself in it renders a second cursor chasing the first.

// Imported from the MODULE, not from `../shared`. The shared barrel is the
// whole design system; pulling it in here would drag every one of those
// components into the `./diagram` chunk that Excalidraw is already lazy-loaded
// out of.
import { PresenceAvatars, type PresenceUser } from '../shared/PresenceAvatars';
import { DropdownMenu, type DropdownMenuSection } from '../shared/DropdownMenu';
import { cn } from '../../lib/cn';
import type { DiagramCollaborator } from '@connorhoehn/realtime-modules/adapters/excalidraw';
import type { DiagramPresenceActions, DiagramPresencePerson } from './types';

export interface DiagramPresenceBarProps {
    participants: DiagramCollaborator[];
    size?: number;
    /**
     * What a reader can do with each person. With any of these the bar is a
     * button: click it and every OTHER person on the diagram is listed with
     * the actions the host backs. Without them it is a roster.
     */
    actions?: DiagramPresenceActions;
    /** Whose viewport the reader is following, so the menu can offer to stop. */
    followingUserId?: string | null;
    className?: string;
    'data-testid'?: string;
}

const PILL_CLASS =
    'pointer-events-auto flex items-center gap-2 rounded-full border border-border bg-surface-panel/95 px-2.5 py-1.5 shadow-sm backdrop-blur';

export function DiagramPresenceBar({
    participants,
    size = 26,
    actions,
    followingUserId = null,
    className,
    'data-testid': testId = 'diagram-presence',
}: DiagramPresenceBarProps) {
    const users: PresenceUser[] = participants.map((p) => ({
        id: p.userId || p.clientId,
        name: p.isSelf ? `${p.displayName} (you)` : p.displayName,
        color: p.color,
        online: true,
        detail: p.isSelf
            ? 'you'
            : p.pointer
              ? 'drawing'
              : 'viewing',
    }));

    const face = (
        <>
            <PresenceAvatars users={users} maxVisible={6} size={size} />
            <span className="pr-0.5 text-[11px] font-medium tabular-nums text-text-secondary">
                {participants.length}
            </span>
        </>
    );

    // The menu lists the OTHER people: there is nothing to message yourself
    // about, and following your own viewport is a no-op with a name.
    const others = participants.filter((p) => !p.isSelf);
    const hasActions = !!actions && !!(actions.onMessage || actions.onCall || actions.onFollow);

    if (!hasActions || others.length === 0) {
        return (
            <div
                data-testid={testId}
                data-participant-count={participants.length}
                className={cn(PILL_CLASS, className)}
            >
                {face}
            </div>
        );
    }

    const sections: DropdownMenuSection[] = others.map((p) => {
        const person: DiagramPresencePerson = {
            userId: p.userId || p.clientId,
            clientId: p.clientId,
            displayName: p.displayName,
            color: p.color,
        };
        const following = followingUserId != null && (followingUserId === p.userId || followingUserId === p.clientId);
        return {
            label: `${p.displayName} · ${p.pointer ? 'drawing' : 'viewing'}`,
            items: [
                ...(actions!.onMessage ? [{ label: 'Message', onSelect: () => actions!.onMessage!(person) }] : []),
                ...(actions!.onCall ? [{ label: 'Call', onSelect: () => actions!.onCall!(person) }] : []),
                ...(actions!.onFollow
                    ? [{ label: following ? 'Stop following' : 'Follow', active: following, onSelect: () => actions!.onFollow!(person) }]
                    : []),
            ],
        };
    });

    return (
        <div data-testid={testId} data-participant-count={participants.length} className={cn('pointer-events-auto', className)}>
            <DropdownMenu
                trigger={face}
                triggerLabel={`People on this diagram (${participants.length})`}
                triggerTitle="Who is here — message, call or follow them"
                triggerClassName={cn(PILL_CLASS, 'text-inherit')}
                align="end"
                sections={sections}
                data-testid={`${testId}-menu`}
            />
        </div>
    );
}

export default DiagramPresenceBar;
