import { type RefObject } from 'react';
import type { InlinePopoverPlacement } from '../shared/InlinePopover';
export type ChannelPrivacy = 'standard' | 'private';
export interface CreateChannelDialogInput {
    name: string;
    description?: string;
    privacy: ChannelPrivacy;
}
export interface CreateChannelDialogProps {
    open: boolean;
    teamName: string;
    busy?: boolean;
    /** The control that opened it. The popover hangs off this; without it, it centres. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    /** Reject with a reason (e.g. a duplicate name) and it shows inline. */
    onCreate: (input: CreateChannelDialogInput) => Promise<void> | void;
    onClose: () => void;
    'data-testid'?: string;
}
export declare function CreateChannelDialog({ open, teamName, busy, anchor, placement, onCreate, onClose, 'data-testid': testId, }: CreateChannelDialogProps): import("react").JSX.Element;
export default CreateChannelDialog;
//# sourceMappingURL=CreateChannelDialog.d.ts.map