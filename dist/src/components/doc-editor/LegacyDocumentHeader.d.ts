import type { ViewMode, DocumentMeta, Participant } from '../../types/document';
import { type DocumentSaveState } from './DocumentSaveStatus';
/**
 * How the call button presents itself.
 *
 * A boolean could only say "in a call" or "not", so the state that matters
 * most — a call is RUNNING in this document and you have not joined it — had
 * to render as a plain "Call", visually identical to no call existing at all.
 * Hosts worked around it by suppressing this button and rendering their own
 * beneath the header, which is a duplicated control waiting to drift.
 *
 * - `idle`      — nothing running; the button starts a call.
 * - `available` — a call is running that you are not in; the button joins it.
 * - `active`    — you are in the call; the button toggles its surface.
 */
export type DocumentHeaderCallVariant = 'idle' | 'available' | 'active';
export interface LegacyDocumentHeaderProps {
    /**
     * Extra rows for the ⋯ menu — actions that are real but not frequent enough
     * to earn a permanent button. The alternative is a toolbar that grows one
     * control per feature until none of them are findable.
     */
    extraMenuItems?: ReadonlyArray<{
        id: string;
        label: string;
        onSelect: () => void;
    }>;
    saveState?: DocumentSaveState;
    meta: DocumentMeta;
    mode: ViewMode;
    onModeChange: (mode: ViewMode) => void;
    participants: Participant[];
    onUpdateMeta: (patch: Partial<DocumentMeta>) => void;
    onExport: (format: 'markdown' | 'pdf' | 'json') => void;
    onToggleHistory: () => void;
    onToggleVideoCall?: () => void;
    onToggleVideoHistory?: () => void;
    isCallActive?: boolean;
    /**
     * Overrides the call button's presentation. Omit and it is derived from
     * `isCallActive`, so callers written before this prop existed are unchanged.
     */
    callVariant?: DocumentHeaderCallVariant;
    /**
     * Overrides the call button's text — the room name in "Join standup", say.
     * Omit for the variant's default wording.
     */
    callLabel?: string;
    onClearDocument: () => void;
    onJumpToUser?: (participant: Participant) => void;
    sections?: {
        id: string;
        title: string;
    }[];
    onToggleMyItems?: () => void;
    myItemCount?: number;
    commentCount?: number;
    onBack?: () => void;
    onFollowUser?: (participant: Participant) => void;
    followingUserId?: string | null;
    onFinalize?: () => void;
    onUnlock?: () => void;
    pastCallsCount?: number;
}
export default function LegacyDocumentHeader({ meta, saveState, mode, onModeChange, participants, onUpdateMeta, onExport, onToggleHistory, onToggleVideoCall, onToggleVideoHistory, isCallActive, callVariant, callLabel, onClearDocument, onJumpToUser, sections, onToggleMyItems, myItemCount, commentCount, onBack, onFollowUser, followingUserId, onFinalize, onUnlock, pastCallsCount, extraMenuItems, }: LegacyDocumentHeaderProps): import("react").JSX.Element;
//# sourceMappingURL=LegacyDocumentHeader.d.ts.map