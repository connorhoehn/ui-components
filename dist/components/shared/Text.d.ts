import type { MouseEventHandler, ReactNode } from 'react';
export type TextSize = 'xs' | 'sm' | 'base' | 'lg';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextTone = 'primary' | 'secondary' | 'tertiary' | 'inherit';
export interface TextProps {
    /** Type scale step. Since 2.420.0; omitted: inherits. */
    size?: TextSize;
    /** Font weight. Since 2.420.0; omitted: inherits. */
    weight?: TextWeight;
    /** Text colour token. Since 2.420.0. */
    tone?: TextTone;
    /** Draw numerals at equal width (timers, counts). Since 2.420.0. */
    tabular?: boolean;
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
export declare function Text({ as, className, title, children, wrap, size, weight, tone, tabular, ...rest }: TextProps): import("react").JSX.Element;
/** Short alias — `<T>` reads better inline in dense JSX than `<Text>`. */
export declare const T: typeof Text;
export default Text;
//# sourceMappingURL=Text.d.ts.map