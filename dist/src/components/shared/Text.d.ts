import type { MouseEventHandler, ReactNode } from 'react';
export interface TextProps {
    /** Element to render as. Default `'span'`. */
    as?: 'span' | 'div' | 'p' | 'li';
    className?: string;
    title?: string;
    /** Forwarded to `Inline`'s own `wrap` (`flex-wrap` vs not). Default
     *  `false` — a single line of text, matching a plain inline element. */
    wrap?: boolean;
    role?: string;
    'aria-label'?: string;
    'aria-hidden'?: boolean | 'true' | 'false';
    onClick?: MouseEventHandler<HTMLElement>;
    'data-testid'?: string;
    id?: string;
    children?: ReactNode;
}
export declare function Text({ as, className, title, children, wrap, ...rest }: TextProps): import("react").JSX.Element;
/** Short alias — `<T>` reads better inline in dense JSX than `<Text>`. */
export declare const T: typeof Text;
export default Text;
//# sourceMappingURL=Text.d.ts.map