import type { CSSProperties, ElementType, ReactNode } from 'react';
/**
 * The canonical visually-hidden clip. Not `display: none` and not
 * `visibility: hidden` — both remove the node from the accessibility tree.
 */
export declare const VISUALLY_HIDDEN_STYLE: CSSProperties;
export interface VisuallyHiddenProps {
    /** Element to render. Defaults to `span`; use `div` inside block content. */
    as?: ElementType;
    children: ReactNode;
    className?: string;
    id?: string;
    'data-testid'?: string;
}
/**
 * Renders `children` for screen readers only.
 *
 *   <VisuallyHidden>Sorted ascending</VisuallyHidden>
 */
export default function VisuallyHidden({ as: Tag, children, className, id, 'data-testid': testId, }: VisuallyHiddenProps): import("react").JSX.Element;
//# sourceMappingURL=VisuallyHidden.d.ts.map