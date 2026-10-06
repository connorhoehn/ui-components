import { type ReactNode } from 'react';
export interface ChoiceListProps {
    children: ReactNode;
    className?: string;
    'data-testid'?: string;
}
/** The list. Rows divide themselves; the list draws the outer rule. */
export declare function ChoiceList({ children, className, 'data-testid': testId }: ChoiceListProps): import("react").JSX.Element;
export interface ChoiceRowProps {
    icon?: ReactNode;
    title: string;
    /** One line: what choosing this does. */
    description?: string;
    /** An action row: pressing it does the thing. */
    onSelect?: () => void;
    /**
     * A disclosure row: pressing it opens `children` beneath. Controlled when
     * `open` is given, otherwise the row keeps its own state.
     */
    children?: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    /** Why it is disabled, as the row's tooltip. */
    disabledReason?: string;
    /** The row is doing what it was asked; it reads as pressed and takes no more presses. */
    busy?: boolean;
    /**
     * One of several: the row is a radio (`role="radio"`, `aria-checked`) and a
     * selection mark leads it in place of the icon tile. Undefined for an action row.
     */
    selected?: boolean;
    'data-testid'?: string;
}
export declare function ChoiceRow({ icon, title, description, onSelect, children, open: openProp, onOpenChange, disabled, disabledReason, busy, selected, 'data-testid': testId, }: ChoiceRowProps): import("react").JSX.Element;
export interface ChoiceOptionProps {
    icon?: ReactNode;
    label: string;
    onSelect: () => void;
    disabled?: boolean;
    'data-testid'?: string;
}
/** One target inside an open disclosure: indented under the row's glyph. */
export declare function ChoiceOption({ icon, label, onSelect, disabled, 'data-testid': testId }: ChoiceOptionProps): import("react").JSX.Element;
export default ChoiceList;
//# sourceMappingURL=ChoiceList.d.ts.map