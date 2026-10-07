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
    /**
     * `sm` (default) is the 13px field. `md` (2.386.3) is the Documents
     * explorer's: a 36px field, 14px text (15px until 2.407.18 — off the type scale) and an 18px glass. `lg` (2.389.6) is
     * a page's primary search: a 44px field, 16px text, a 20px glass and a
     * larger clear ×.
     */
    size?: 'sm' | 'md' | 'lg';
    /** Keys on the field — e.g. ArrowDown into a result list. Since 2.389.6. */
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    /** Class for the `<input>` itself — the one `className` cannot reach. */
    inputClassName?: string;
    style?: React.CSSProperties;
    autoFocus?: boolean;
    'aria-label'?: string;
    /**
     * Addresses the `<input>` itself, not the wrapper.
     *
     * Without it a caller who needs to drive this field from a test had no way
     * to name it: `className` lands on the wrapper, and the accessible name is
     * the placeholder, which changes whenever the copy does. The app's document
     * list ended up wrapping SearchInput in a bare div purely to hang a testid
     * on it — a hand-rolled element around a library component, which is the
     * shape this library exists to remove.
     */
    'data-testid'?: string;
}
declare function SearchInput({ value, onChange, placeholder, onClear, tone, className, inputClassName, size, onKeyDown, style, autoFocus, 'aria-label': ariaLabel, 'data-testid': testId, }: SearchInputProps): React.JSX.Element;
export { SearchInput };
export default SearchInput;
//# sourceMappingURL=SearchInput.d.ts.map