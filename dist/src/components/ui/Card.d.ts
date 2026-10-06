import { type HTMLAttributes, type ReactNode, type Ref } from 'react';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    padding?: CardPadding;
    /**
     * The underlying `<div>`. A plain prop, not `forwardRef` — see the note on
     * `StackProps.ref`; React 19 passes `ref` through as an ordinary prop and
     * this card is not polymorphic, so the type is exact.
     */
    ref?: Ref<HTMLDivElement>;
}
export declare function Card({ children, padding, className, ref, ...rest }: CardProps): import("react").JSX.Element;
//# sourceMappingURL=Card.d.ts.map