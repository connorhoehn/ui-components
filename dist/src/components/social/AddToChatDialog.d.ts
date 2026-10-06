import { type RefObject } from 'react';
import type { InlinePopoverPlacement } from '../shared/InlinePopover';
import type { MembershipHistory } from './MembershipNotice';
export interface AddToChatPerson {
    id: string;
    name: string;
    avatarUrl?: string;
    /** A second line — a title, an email, "already in 3 of your chats". */
    subtitle?: string;
}
export interface AddToChatDialogProps {
    open: boolean;
    /** "#design", "the chat with Carol" — the place they are being added to. */
    conversationName: string;
    /** Everyone who could be added — members already in are the host's to leave out. */
    people: readonly AddToChatPerson[];
    preselectedIds?: readonly string[];
    busy?: boolean;
    /** The control that opened it. The popover hangs off this; without it, it centres. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    /** Resolves when the server has them; rejects with a reason to show. */
    onAdd: (userIds: string[], history: MembershipHistory) => Promise<void> | void;
    /**
     * Offer the Teams history choice. Off for a place whose policy decides
     * it — a room's members always get the room's past — and `onAdd` then
     * receives `{ mode: 'all' }`.
     */
    historyChoice?: boolean;
    onClose: () => void;
    'data-testid'?: string;
}
export declare const HISTORY_DAYS_DEFAULT = 7;
export declare const HISTORY_DAYS_MIN = 1;
export declare const HISTORY_DAYS_MAX = 3650;
export declare function AddToChatDialog({ open, conversationName, people, preselectedIds, busy, anchor, placement, onAdd, onClose, 'data-testid': testId, historyChoice, }: AddToChatDialogProps): import("react").JSX.Element;
export default AddToChatDialog;
//# sourceMappingURL=AddToChatDialog.d.ts.map