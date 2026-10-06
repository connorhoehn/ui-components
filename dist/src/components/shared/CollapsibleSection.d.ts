import React from 'react';
export interface CollapsibleSectionProps {
    /**
     * The header label. A node, not a string: real section headers pair a name
     * with something that qualifies it — an id slug, a status dot, a count —
     * and a `string` prop forces every such caller to either drop the qualifier
     * or hand-roll its own accordion, which is what this component exists to
     * stop. It is only ever rendered, never measured or compared.
     */
    title: React.ReactNode;
    defaultOpen?: boolean;
    /** Optional element rendered on the right side of the header (e.g. a count chip). */
    badge?: React.ReactNode;
    /**
     * Interactive controls for the header row — a Terminate button, a menu.
     * Rendered BESIDE the header button, never inside it: the header is a
     * `<button>`, and a button inside a button is invalid HTML that React
     * warns about on every render. `badge` stays for inert content.
     */
    actions?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    /** If provided, the open state is persisted to localStorage under this key. */
    storageKey?: string;
    /**
     * `'compact'` tightens the header's padding, drops it to `text-xs`, and
     * shrinks the chevron — for a section nested inside an already-dense
     * panel where the default's `text-sm` / `px-4 py-3` header reads
     * oversized next to its neighbours. Default: unchanged.
     */
    density?: 'default' | 'compact';
    /** Lands on the header button — the thing tests and contrast probes read. */
    'data-testid'?: string;
}
declare function CollapsibleSection({ title, defaultOpen, badge, actions, children, className, storageKey, density, 'data-testid': testId, }: CollapsibleSectionProps): React.JSX.Element;
export { CollapsibleSection };
export default CollapsibleSection;
//# sourceMappingURL=CollapsibleSection.d.ts.map