import type { CSSProperties, ReactNode } from 'react';
export type ChipTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'caution' | 'purple';
export interface ChipProps {
    tone?: ChipTone;
    size?: 'sm' | 'xs';
    /** Solid fill (dark bg + white text) instead of soft tint. */
    solid?: boolean;
    /** Monospace font — for count badges. */
    mono?: boolean;
    children: ReactNode;
    title?: string;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
    'aria-label'?: string;
}
export default function Chip({ tone, size, solid, mono, children, title, className, style, 'data-testid': testId, 'aria-label': ariaLabel, }: ChipProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Chip.d.ts.map