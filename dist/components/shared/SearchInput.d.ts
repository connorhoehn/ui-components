import React from 'react';
import type { SurfaceTone } from './tones';
/** @see SurfaceTone — which colour family the field paints in. */
export type SearchInputTone = SurfaceTone;
export interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    /** Called after the value is cleared via the clear button. */
    onClear?: () => void;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette.
     *
     * This prop exists because `className` lands on the WRAPPER — the input is
     * a child, so no caller-supplied class could ever reach the field itself,
     * and a SearchInput dropped into a dark panel stayed a white box.
     */
    tone?: SearchInputTone;
    /** Class for the wrapper. Sizing and positioning; not the field's colours. */
    className?: string;
    /** Class for the `<input>` itself — the one `className` cannot reach. */
    inputClassName?: string;
    style?: React.CSSProperties;
    autoFocus?: boolean;
    'aria-label'?: string;
}
declare function SearchInput({ value, onChange, placeholder, onClear, tone, className, inputClassName, style, autoFocus, 'aria-label': ariaLabel, }: SearchInputProps): React.JSX.Element;
export { SearchInput };
export default SearchInput;
//# sourceMappingURL=SearchInput.d.ts.map