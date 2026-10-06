import { type ButtonHTMLAttributes, type ReactNode } from 'react';
export type SelectableCardPadding = 'sm' | 'md' | 'lg';
export interface SelectableCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect' | 'children' | 'type'> {
    children?: ReactNode;
    /** Draws the selected chrome and sets `aria-pressed`. */
    selected?: boolean;
    /** Fired on click. Named `onSelect` so callers read as pickers, not buttons. */
    onSelect?: () => void;
    /** Default `sm` (12px) — these sit in dense grids, unlike Card's 24px `md`. */
    padding?: SelectableCardPadding;
}
export declare function SelectableCard({ children, selected, onSelect, padding, disabled, className, ...rest }: SelectableCardProps): import("react").JSX.Element;
export default SelectableCard;
//# sourceMappingURL=SelectableCard.d.ts.map