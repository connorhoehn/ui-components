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
import { cn } from '../../lib/cn';
import type { DiagramCollaborator } from '@connorhoehn/realtime-modules/adapters/excalidraw';

export interface DiagramPresenceBarProps {
    /**
     * Everyone on the board, local user included — i.e.
     * `useCollaborativeDiagram(...).participants`.
     */
    participants: DiagramCollaborator[];
    /** Avatar diameter in px. */
    size?: number;
    className?: string;
    'data-testid'?: string;
}

export function DiagramPresenceBar({
    participants,
    size = 26,
    className,
    'data-testid': testId = 'diagram-presence',
}: DiagramPresenceBarProps) {
    const users: PresenceUser[] = participants.map((p) => ({
        // The avatar key must be the SAME identifier across surfaces or the
        // hover card and Follow action address a different person than the one
        // under the mouse. Stable identity first; the per-socket clientId is
        // only for genuinely anonymous sessions.
        id: p.userId || p.clientId,
        name: p.isSelf ? `${p.displayName} (you)` : p.displayName,
        // Taken from presence, never re-hashed here. The host derives it once
        // (identityToColor) and it has to be the same colour as this person's
        // cursor on the canvas and their caret in the document.
        color: p.color,
        online: true,
        detail: p.isSelf
            ? 'you'
            : p.pointer
              ? 'drawing'
              : 'viewing',
    }));

    return (
        <div
            data-testid={testId}
            data-participant-count={participants.length}
            className={cn(
                'pointer-events-auto flex items-center gap-2 rounded-full border border-border bg-surface-panel/95 px-2.5 py-1.5 shadow-sm backdrop-blur',
                className,
            )}
        >
            <PresenceAvatars users={users} maxVisible={6} size={size} />
            <span className="pr-0.5 text-[11px] font-medium tabular-nums text-text-secondary">
                {participants.length}
            </span>
        </div>
    );
}

export default DiagramPresenceBar;
