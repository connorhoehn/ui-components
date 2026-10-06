import { type ReactNode } from 'react';
export interface HighlightProps {
    /** The text to render. */
    text: string;
    /** Terms or phrases to mark. Empty or blank terms are ignored. */
    terms: readonly string[];
    /** Classes for the outer span. */
    className?: string;
    /** Classes merged onto every <mark>. */
    markClassName?: string;
    'data-testid'?: string;
}
/**
 * Split `text` into alternating plain / matched segments. Exported so a host
 * that needs the match positions (a count, an aria description) reads the
 * same answer the component draws.
 */
export declare function highlightSegments(text: string, terms: readonly string[]): Array<{
    text: string;
    match: boolean;
}>;
export declare function Highlight({ text, terms, className, markClassName, 'data-testid': testId }: HighlightProps): ReactNode;
export default Highlight;
//# sourceMappingURL=Highlight.d.ts.map