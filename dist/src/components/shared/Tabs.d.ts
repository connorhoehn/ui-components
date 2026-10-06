import { type CSSProperties, type ReactNode } from 'react';
export type TabsVariant = 'underline' | 'pill' | 'segmented';
export interface TabItem {
    id: string;
    label: ReactNode;
    icon?: ReactNode;
    badge?: ReactNode;
    disabled?: boolean;
    /** data-testid rendered on this tab's trigger button. Overrides Tabs' `getItemTestId` for this item. */
    testId?: string;
}
export interface TabsProps {
    items: TabItem[];
    value: string;
    onValueChange: (id: string) => void;
    variant?: TabsVariant;
    size?: 'sm' | 'md';
    /**
     * `chip` (default): a count sits in a small grey pill. `plain`: muted
     * numerals after the label, no box — "Decisions  2".
     */
    badgeStyle?: 'chip' | 'plain';
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
    /** Shared id used to wire <TabPanel> regions to their <tab> triggers. Auto-generated if omitted. */
    idPrefix?: string;
    /** Derives a data-testid per item when the item itself has no `testId`. */
    getItemTestId?: (item: TabItem) => string;
    /**
     * Every tab grows to fill equal width of the tablist (`flex-1`) instead of
     * sizing to its own label — a tab bar that spans a fixed-width container
     * (a modal header, a narrow side panel) where uneven tab widths leave a
     * ragged edge. Default: unchanged, each tab sized to its content.
     */
    stretch?: boolean;
    /** Extra classes merged onto every tab trigger `<button>`. */
    itemClassName?: string;
    /**
     * `data-testid` on the tablist container. The per-item hook (`getItemTestId`,
     * 2.350.0) covered the triggers but left the bar itself unaddressable, so a
     * spec that scopes its queries to the tab bar — or just asserts the bar
     * exists before any tab does — still had to hand-roll the whole `role=
     * "tablist"` element to hang one attribute on it.
     */
    'data-testid'?: string;
    /**
     * How the `underline` variant marks the selected tab. `border` (default):
     * the tab's own 2px bottom border, hung 1px (`-mb-px`) over the tablist's
     * rule — as before.
     *
     * `bar` (since 2.396.0): an absolutely positioned bar at the bottom of the
     * tab, on `z-[1]`, and the rule drawn as the tablist's own `after:` line.
     * Both sit INSIDE the tablist's box, so nothing hangs past it for the next
     * element (a scrolling pane body with its own background) to paint over —
     * the bug that left a 2px border reading as 1px under `ScopeHeader` in an
     * `ExplorerLayout.paneHeader`. Hide the rule with `after:hidden` when a
     * host draws its own. Other variants ignore this.
     */
    indicator?: 'border' | 'bar';
    /** The `bar` indicator's thickness in px. Default 2. Since 2.396.0. */
    indicatorWeight?: 2 | 3;
}
export declare function Tabs({ items, value, onValueChange, variant, size, badgeStyle, className, style, 'aria-label': ariaLabel, idPrefix: idPrefixProp, getItemTestId, stretch, itemClassName, 'data-testid': testId, indicator, indicatorWeight, }: TabsProps): import("react").JSX.Element;
export interface TabPanelProps {
    /** The tab id this panel is associated with. */
    id: string;
    /** Currently-active tab id. Panel renders only when these match. */
    when: string;
    /** Must match the Tabs `idPrefix` for accessibility wiring. Auto-generated tabs without an idPrefix should pass it through. */
    idPrefix?: string;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}
export declare function TabPanel({ id, when, idPrefix, className, style, children }: TabPanelProps): import("react").JSX.Element | null;
export default Tabs;
//# sourceMappingURL=Tabs.d.ts.map