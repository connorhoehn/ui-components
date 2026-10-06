export type MarkdownViewScale = 'sm' | 'md' | 'lg';
export interface MarkdownViewProps {
    markdown: string;
    /**
     * Type scale (since 2.388.0). `md` (default) is the long-standing rendering:
     * 14px body, h1 20px. `sm` steps headings down to 17/15/14/13px over a 13px
     * body, for prose inside a card (an assistant answer) whose `#` must not
     * compete with the page title. `lg` is a document read on its own page:
     * 15px body, h1 24px, h2 20px.
     */
    scale?: MarkdownViewScale;
    className?: string;
    'data-testid'?: string;
}
export declare function MarkdownView({ markdown, scale, className, 'data-testid': testId }: MarkdownViewProps): import("react").JSX.Element;
export default MarkdownView;
//# sourceMappingURL=MarkdownView.d.ts.map