import type { CSSProperties, ReactNode } from 'react';
import type { ChipTone } from './Chip';
export interface StackLayerSpec {
    id: string;
    label: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    /** Color tone (matches <Chip> tones). Default 'neutral'. */
    tone?: ChipTone;
    /** Optional right-aligned meta slot (badge, version chip). */
    meta?: ReactNode;
}
export type StackDiagramOrientation = 'vertical' | 'horizontal';
export type StackDiagramConnector = 'arrow' | 'line' | 'none';
export interface StackDiagramProps {
    layers: StackLayerSpec[];
    /** Vertical stacks top-to-bottom (default); horizontal flows left-to-right. */
    orientation?: StackDiagramOrientation;
    /** Connector glyph between layers. Default 'arrow'. */
    connector?: StackDiagramConnector;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function StackDiagram({ layers, orientation, connector, className, style, 'data-testid': testId, }: StackDiagramProps): import("react/jsx-runtime").JSX.Element;
/** Alias kept for diagrams better described as a stack of horizontal layers. */
export declare const LayerStack: typeof StackDiagram;
export default StackDiagram;
//# sourceMappingURL=StackDiagram.d.ts.map