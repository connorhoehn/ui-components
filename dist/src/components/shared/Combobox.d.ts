export interface ComboboxOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}
interface BaseProps {
    options: readonly ComboboxOption[];
    placeholder?: string;
    'aria-label'?: string;
    size?: 'sm' | 'md';
    disabled?: boolean;
    /** Commit typed text that matches no option on Enter. */
    allowCustom?: boolean;
    /** Cap on rendered suggestions (default 8). */
    maxOptions?: number;
    emptyMessage?: string;
    /** Custom matcher; default is a case-insensitive substring on label. */
    filter?: (option: ComboboxOption, query: string) => boolean;
    /** Called as the query changes (for hosts that fetch suggestions). */
    onQueryChange?: (query: string) => void;
    className?: string;
    'data-testid'?: string;
}
export interface SingleComboboxProps extends BaseProps {
    multiple?: false;
    value: string;
    onChange: (value: string) => void;
}
export interface MultiComboboxProps extends BaseProps {
    multiple: true;
    value: readonly string[];
    onChange: (value: string[]) => void;
}
export type ComboboxProps = SingleComboboxProps | MultiComboboxProps;
export declare function Combobox(props: ComboboxProps): import("react").JSX.Element;
export default Combobox;
//# sourceMappingURL=Combobox.d.ts.map