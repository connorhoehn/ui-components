import { type ReactNode, type RefObject } from 'react';
import { type InlinePopoverPlacement } from './InlinePopover';
export type PopoverFormWidth = 'sm' | 'md' | 'lg';
export interface PopoverFormProps {
    open: boolean;
    /** What it opens beside. Without one it centres, which is the fallback, not the intent. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    /** A word or two. "Create a channel", not "Create a new channel in this team". */
    title: string;
    /** The context line under it — the team a channel is going into, say. */
    subtitle?: string;
    /** A small mark to the left of the title: a team avatar, a glyph. */
    icon?: ReactNode;
    /** Ignored when `submitSlot` is given. */
    submitLabel?: string;
    /**
     * A confirm control to render INSTEAD of the shell's own submit button.
     *
     * For the forms whose body already owns the decision — a people picker knows
     * how many are selected and says so ("Start chat with 2"), and the shell has
     * no way to learn that without the caller lifting the selection out of the
     * component that manages it. Cancel and the chrome stay; only the confirm is
     * the caller's. `submitLabel` is ignored when this is given.
     *
     * `false` means there is NO confirm to render: a destination picker's rows
     * are themselves the commit, and a footer button beside them would be a
     * second way to do the thing that has no state to act on. The footer keeps
     * Cancel, which is the way out a popover still owes anyone who opened it by
     * accident.
     */
    submitSlot?: ReactNode | false;
    /** Overrides the submit button's testid, for hosts whose suites name it. */
    submitTestId?: string;
    submitDisabled?: boolean;
    busy?: boolean;
    /** The server's refusal, shown in place. The footer does not move when it appears. */
    error?: string | null;
    onSubmit: () => void;
    onClose: () => void;
    /** How wide the panel sits. 'md' (320px) by default — a name fits, a paragraph does not. */
    width?: PopoverFormWidth;
    children: ReactNode;
    'data-testid'?: string;
}
export declare function PopoverForm({ open, anchor, placement, title, subtitle, icon, submitLabel, submitSlot, submitTestId, submitDisabled, busy, error, onSubmit, onClose, width, children, 'data-testid': testId, }: PopoverFormProps): import("react").JSX.Element | null;
/** A field in a PopoverForm: a small label over its control, tightly. */
export declare function PopoverField({ label, hint, children, 'data-testid': testId, }: {
    label: string;
    hint?: string;
    children: ReactNode;
    'data-testid'?: string;
}): import("react").JSX.Element;
export default PopoverForm;
//# sourceMappingURL=PopoverForm.d.ts.map