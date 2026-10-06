export interface CallPresenceIndicatorProps {
    /** People currently on the call. Names must be pre-resolved. */
    participants: Array<{
        userId: string;
        name: string;
        avatarUrl?: string;
    }>;
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
export declare function CallPresenceIndicator({ participants, count, onClick, label, maxVisible, }: CallPresenceIndicatorProps): import("react").JSX.Element | null;
export default CallPresenceIndicator;
//# sourceMappingURL=CallPresenceIndicator.d.ts.map