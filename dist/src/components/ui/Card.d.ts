import { HTMLAttributes, ReactNode } from 'react';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    padding?: CardPadding;
}
export declare function Card({ children, padding, className, ...rest }: CardProps): import("react").JSX.Element;
//# sourceMappingURL=Card.d.ts.map