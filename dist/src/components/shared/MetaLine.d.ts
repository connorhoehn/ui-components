import { type ReactNode } from 'react';
export type MetaLineSize = 'xs' | 'sm';
export type MetaLineTone = 'tertiary' | 'secondary';
export interface MetaLineProps {
    /** The pieces, in order. Falsy entries are dropped with their separator. */
    items: ReactNode[];
    /** Separator woven between surviving items. Default `·`. */
    separator?: ReactNode;
    /** `xs` (11px, the default) is the card/list scale; `sm` (12px) is body meta. */
    size?: MetaLineSize;
    tone?: MetaLineTone;
    className?: string;
    'data-testid'?: string;
}
export declare function MetaLine({ items, separator, size, tone, className, 'data-testid': testId, }: MetaLineProps): import("react").JSX.Element | null;
export default MetaLine;
//# sourceMappingURL=MetaLine.d.ts.map