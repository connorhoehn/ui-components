import type { ReactNode } from 'react';
export interface KeyValueItem {
    label: string;
    value: ReactNode;
    /** Monospace value — ids, shas, model ids. */
    mono?: boolean;
    /**
     * Native tooltip on the value — the full text of a value the layout
     * truncates (a long id, a path).
     */
    title?: string;
    /**
     * The value in tertiary ink — a fact that is really an absence ("Not
     * defined yet", "No links added"). Since 2.390.0.
     */
    muted?: boolean;
    /**
     * A control at the row's end, after the value — "Draft with agent", "Add a
     * note". Row layout only. Since 2.390.0.
     */
    action?: ReactNode;
}
export type KeyValueLayout = 'stack' | 'row' | 'grid';
export interface KeyValueProps {
    items: KeyValueItem[];
    /**
     * `row` (default): label in a fixed column left of the value.
     * `stack`: label above value, one fact per line.
     * `grid`: stacked pairs in two columns.
     */
    layout?: KeyValueLayout;
    /** Row layout only: the label column's Tailwind width class. Default `w-28`. */
    labelWidth?: string;
    /**
     * Row layout only: each fact on its own ruled row (a rule above the first
     * and under every row), at 15px, with any `action` right-aligned — a small
     * checklist table ("Complete the brief"). Default `false`. Since 2.390.0.
     */
    divided?: boolean;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}
export declare function KeyValue({ items, layout, labelWidth, divided, className, 'aria-label': ariaLabel, 'data-testid': testId, }: KeyValueProps): import("react").JSX.Element | null;
export default KeyValue;
//# sourceMappingURL=KeyValue.d.ts.map