import React from 'react';
import type { SurfaceTone } from './tones';
export type InlineAlertTone = 'error' | 'success' | 'info' | 'warning';
/**
 * `tone` already names the severity here, so the surface-family axis is
 * `palette` — same split as Chip. See `SurfaceTone` in tones.ts.
 */
export type InlineAlertPalette = SurfaceTone;
export interface InlineAlertProps {
    tone: InlineAlertTone;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette, for alerts inside a log console
     * or debugger panel.
     */
    palette?: InlineAlertPalette;
    children: React.ReactNode;
    onDismiss?: () => void;
    className?: string;
}
declare function InlineAlert({ tone, palette, children, onDismiss, className }: InlineAlertProps): React.JSX.Element;
export { InlineAlert };
export default InlineAlert;
//# sourceMappingURL=InlineAlert.d.ts.map