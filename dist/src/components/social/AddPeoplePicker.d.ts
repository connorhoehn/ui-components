export interface AddPeoplePickerCandidate {
    userId: string;
    displayName: string;
    /** Role, email or team — a second line under the name. */
    subtitle?: string;
}
export interface AddPeoplePickerProps {
    open: boolean;
    onClose: () => void;
    candidates: readonly AddPeoplePickerCandidate[];
    onAdd: (userIds: string[]) => void | Promise<void>;
    title?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    /** Confirm button label; the count is appended. */
    confirmLabel?: string;
    busy?: boolean;
    /** A refusal from the server, shown in place. */
    error?: string | null;
    'data-testid'?: string;
}
export declare function AddPeoplePicker({ open, onClose, candidates, onAdd, title, searchPlaceholder, emptyMessage, confirmLabel, busy, error, 'data-testid': testId, }: AddPeoplePickerProps): import("react").JSX.Element;
export default AddPeoplePicker;
//# sourceMappingURL=AddPeoplePicker.d.ts.map