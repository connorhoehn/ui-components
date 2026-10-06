import { type ReactNode } from 'react';
export interface PickerDialogOption {
    id: string;
    label: string;
    /** A quieter second line. */
    description?: string;
    icon?: ReactNode;
    /** Indent level — a folder's depth in its tree. Default 0. */
    depth?: number;
    /** Shown, not choosable ("the folder it is already in"). */
    disabled?: boolean;
    /** Said beside a disabled row. */
    disabledReason?: string;
}
export interface PickerDialogProps {
    open: boolean;
    title: string;
    /** A sentence under the title. */
    body?: string;
    options: readonly PickerDialogOption[];
    /** The confirm button's words ("Move", "Run", "Create"). Default 'Choose'. */
    confirmLabel?: string;
    onPick: (id: string) => void;
    onCancel: () => void;
    /** Search placeholder; the box is shown when there are more than 6 options. */
    searchPlaceholder?: string;
    /** Said when there is nothing to choose (or nothing matches). */
    emptyText?: string;
    /** Said while the options are loading. */
    loading?: boolean;
    /** Preselected row. */
    initialId?: string;
    'data-testid'?: string;
}
export declare function PickerDialog({ open, title, body, options, confirmLabel, onPick, onCancel, searchPlaceholder, emptyText, loading, initialId, 'data-testid': testId, }: PickerDialogProps): import("react").JSX.Element;
export default PickerDialog;
//# sourceMappingURL=PickerDialog.d.ts.map