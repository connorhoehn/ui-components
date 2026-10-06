import type { RefObject } from 'react';
import type { InlinePopoverPlacement } from '../shared/InlinePopover';
import { type InviteCandidate } from '../hangout/InviteCandidateList';
export interface NewChatDialogProps {
    open: boolean;
    /** Everyone who can be messaged. Already-selectable; presence drives grouping. */
    candidates: InviteCandidate[];
    /** The control that opened it. Without one the shell centres — the fallback, not the intent. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    busy?: boolean;
    /** A refusal from the server, shown in place without moving the footer. */
    error?: string | null;
    onStart: (userIds: string[]) => void | Promise<void>;
    onClose: () => void;
    'data-testid'?: string;
}
export declare function NewChatDialog({ open, candidates, anchor, placement, busy, error, onStart, onClose, 'data-testid': testId, }: NewChatDialogProps): import("react").JSX.Element | null;
export default NewChatDialog;
//# sourceMappingURL=NewChatDialog.d.ts.map