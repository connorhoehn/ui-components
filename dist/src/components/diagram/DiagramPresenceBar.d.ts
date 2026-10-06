import type { DiagramCollaborator } from '@connorhoehn/realtime-modules/adapters/excalidraw';
import type { DiagramPresenceActions } from './types';
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
export declare function DiagramPresenceBar({ participants, size, actions, followingUserId, className, 'data-testid': testId, }: DiagramPresenceBarProps): import("react").JSX.Element;
export default DiagramPresenceBar;
//# sourceMappingURL=DiagramPresenceBar.d.ts.map