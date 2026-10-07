import type { AgUiSession } from '../../../types/agents';
export interface ConversationHistoryProps {
    sessions: AgUiSession[];
    /** Active thread (highlighted). */
    activeThreadId?: string | null;
    onResume?: (session: AgUiSession) => void;
    onDelete?: (session: AgUiSession) => void;
    emptyMessage?: string;
    className?: string;
}
export declare function ConversationHistory({ sessions, activeThreadId, onResume, onDelete, emptyMessage, className, }: ConversationHistoryProps): import("react").JSX.Element;
//# sourceMappingURL=ConversationHistory.d.ts.map