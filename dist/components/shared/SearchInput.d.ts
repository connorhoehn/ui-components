import React from 'react';
export interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    /** Called after the value is cleared via the clear button. */
    onClear?: () => void;
    className?: string;
    style?: React.CSSProperties;
    autoFocus?: boolean;
    'aria-label'?: string;
}
declare function SearchInput({ value, onChange, placeholder, onClear, className, style, autoFocus, 'aria-label': ariaLabel, }: SearchInputProps): import("react/jsx-runtime").JSX.Element;
export { SearchInput };
export default SearchInput;
//# sourceMappingURL=SearchInput.d.ts.map