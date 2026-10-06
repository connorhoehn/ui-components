import { type ReactNode } from 'react';
export interface SkipLinkProps {
    /**
     * `id` of the element to jump to. That element needs `tabIndex={-1}` for
     * the jump to move focus (not just the viewport) in every browser.
     * @default 'main-content'
     */
    targetId?: string;
    children?: ReactNode;
    className?: string;
    /** Called after the jump — use it to focus the target explicitly. */
    onSkip?: () => void;
}
export default function SkipLink({ targetId, children, className, onSkip, }: SkipLinkProps): import("react").JSX.Element;
//# sourceMappingURL=SkipLink.d.ts.map