import { type ReactNode } from 'react';
export interface ConversationStartDestination {
    /** The host's key for the destination — a channel, a user id. */
    id: string;
    /** What to call it: `#design`, `Hank Anderson`. */
    label: string;
    icon?: ReactNode;
}
export interface ConversationStartReceipt {
    tone: 'success' | 'error';
    text: string;
    /** An optional way onward — "Open the chat" after sending to a person. */
    actionLabel?: string;
    onAction?: () => void;
}
export interface ConversationStartProps {
    /** Default "No conversation yet". */
    title?: string;
    /** Default names the three choices. */
    body?: string;
    /** Present, the first row: make a new conversation about this. */
    onStart?: () => void;
    /** Default "Start a conversation". */
    startLabel?: string;
    /** What starting makes. Default "A new room, named after this page". */
    startDescription?: string;
    /** Conversations that already exist. Empty: the row is disabled, not hidden — it still says the choice exists. */
    rooms?: readonly ConversationStartDestination[];
    onAddToRoom?: (id: string) => void;
    /** People it could be sent to. */
    people?: readonly ConversationStartDestination[];
    onShareWith?: (id: string) => void;
    /** Something is in flight — every row waits. */
    busy?: boolean;
    /** What the last attempt did, under the intro. */
    receipt?: ConversationStartReceipt | null;
    /** Lists longer than this get a search box. Default 6. */
    searchAbove?: number;
    'data-testid'?: string;
}
export declare function ConversationStart({ title, body, onStart, startLabel, startDescription, rooms, onAddToRoom, people, onShareWith, busy, receipt, searchAbove, 'data-testid': testId, }: ConversationStartProps): import("react").JSX.Element;
export default ConversationStart;
//# sourceMappingURL=ConversationStart.d.ts.map