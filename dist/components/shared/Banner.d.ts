import type { ReactNode, CSSProperties } from 'react';
export type BannerVariant = 'error' | 'warning' | 'info' | 'success';
export interface BannerProps {
    variant?: BannerVariant;
    /** Bold prefix label shown before children. */
    title?: string;
    onDismiss?: () => void;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export default function Banner({ variant, title, onDismiss, children, className, style, 'data-testid': testId, }: BannerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Banner.d.ts.map