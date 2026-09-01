export interface UserPickerProps {
    value: string[];
    onChange: (userIds: string[]) => void;
    placeholder?: string;
    maxSelect?: number;
}
declare function UserPicker({ value, onChange, placeholder, maxSelect }: UserPickerProps): import("react").JSX.Element;
export default UserPicker;
//# sourceMappingURL=UserPicker.d.ts.map