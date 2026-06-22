import { PipelineRunError } from '../../../types/pipeline';
export interface ErrorOverlayProps {
    error: PipelineRunError;
    /** Screen-space coordinates to anchor the popover near the failed node. */
    anchor: {
        x: number;
        y: number;
    };
    onDismiss: () => void;
    onRetry?: () => void;
}
export default function ErrorOverlay({ error, anchor, onDismiss, onRetry }: ErrorOverlayProps): import("react").JSX.Element;
//# sourceMappingURL=ErrorOverlay.d.ts.map