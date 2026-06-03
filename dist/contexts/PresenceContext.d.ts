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
}): import("react/jsx-runtime").JSX.Element;
export declare function usePresenceContext(): PresenceContextValue;
//# sourceMappingURL=PresenceContext.d.ts.map