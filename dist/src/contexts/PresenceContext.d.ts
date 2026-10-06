import type { ReactNode } from 'react';
import type { PresenceUser } from '../hooks/usePresence';
export interface PresenceContextValue {
    presenceUsers: PresenceUser[];
    currentClientId: string | null;
    setTyping: (isTyping: boolean) => void;
}
export declare function PresenceProvider({ value, children, }: {
    value: PresenceContextValue;
    children: ReactNode;
}): import("react").JSX.Element;
export declare function usePresenceContext(): PresenceContextValue;
/**
 * Non-throwing variant: returns `null` when there is no `<PresenceProvider>`
 * above.
 *
 * `usePresenceContext` is the right hook for a component that genuinely
 * cannot work without presence. It is the wrong hook for a component that
 * would merely *like* presence data when a host doesn't mount this
 * library's provider — calling it there turns an optional enhancement into
 * a hard mount-time dependency. `UserPicker` is exactly that case: it wants
 * live presence when this library's provider is in the tree, and must still
 * work (via its `presenceUsers` prop) for a host running its own presence
 * provider instead.
 */
export declare function useOptionalPresenceContext(): PresenceContextValue | null;
//# sourceMappingURL=PresenceContext.d.ts.map