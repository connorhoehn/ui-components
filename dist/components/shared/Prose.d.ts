import type { ReactNode } from 'react';
import { type ToneOrAlias } from './tones';
export type ProseSize = 'sm' | 'md';
export interface ProseProps {
    children: ReactNode;
    /**
     * `'sm'` for a dense side panel (a docs tab, inline help next to a form);
     * `'md'` for a standalone reading surface. Default `'md'`.
     */
    size?: ProseSize;
    /**
     * Tints headings and links with a semantic tone instead of the neutral
     * text tokens — a "what's new" callout, a deprecation notice. Body text
     * stays `text-text-primary` either way. Default: untinted (headings
     * `text-text-primary`, links `text-primary`).
     */
    tone?: ToneOrAlias;
    className?: string;
    'data-testid'?: string;
}
export declare function Prose({ children, size, tone, className, 'data-testid': testId, }: ProseProps): import("react").JSX.Element;
export default Prose;
//# sourceMappingURL=Prose.d.ts.map