import { CSSProperties, ReactNode } from 'react';
export type TabsVariant = 'underline' | 'pill' | 'segmented';
export interface TabItem {
    id: string;
    label: ReactNode;
    icon?: ReactNode;
    badge?: ReactNode;
    disabled?: boolean;
}
export interface TabsProps {
    items: TabItem[];
    value: string;
    onValueChange: (id: string) => void;
    variant?: TabsVariant;
    size?: 'sm' | 'md';
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
    /** Shared id used to wire <TabPanel> regions to their <tab> triggers. Auto-generated if omitted. */
    idPrefix?: string;
}
export declare function Tabs({ items, value, onValueChange, variant, size, className, style, 'aria-label': ariaLabel, idPrefix: idPrefixProp, }: TabsProps): import("react").JSX.Element;
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