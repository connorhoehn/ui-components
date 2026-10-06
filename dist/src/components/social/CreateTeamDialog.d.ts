import { type RefObject } from 'react';
import type { InlinePopoverPlacement } from '../shared/InlinePopover';
export type TeamVisibility = 'org' | 'private';
export interface CreateTeamDialogInput {
    name: string;
    description?: string;
    visibility: TeamVisibility;
}
export interface CreateTeamDialogProps {
    open: boolean;
    busy?: boolean;
    /** The control that opened it. The popover hangs off this; without it, it centres. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    /** Reject with a reason (e.g. a name already taken) and it shows inline. */
    onCreate: (input: CreateTeamDialogInput) => Promise<void> | void;
    onClose: () => void;
    'data-testid'?: string;
}
export declare function CreateTeamDialog({ open, busy, anchor, placement, onCreate, onClose, 'data-testid': testId, }: CreateTeamDialogProps): import("react").JSX.Element;
export default CreateTeamDialog;
//# sourceMappingURL=CreateTeamDialog.d.ts.map