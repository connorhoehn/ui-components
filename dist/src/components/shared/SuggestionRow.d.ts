import type { ReactNode } from 'react';
export interface SuggestionRowProps {
    /** Is this the row the keyboard cursor sits on (`aria-selected`)? */
    active: boolean;
    /** Pointer entered the row — move the host's cursor here. */
    onHighlight?: () => void;
    /** Click (the host handles Enter on its input). */
    onPick: () => void;
    primary: ReactNode;
    secondary?: ReactNode;
    /** Leading slot — an avatar or kind mark. */
    leading?: ReactNode;
    id?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function SuggestionRow({ active, onHighlight, onPick, primary, secondary, leading, id, className, 'data-testid': testId, }: SuggestionRowProps): import("react").JSX.Element;
export default SuggestionRow;
//# sourceMappingURL=SuggestionRow.d.ts.map