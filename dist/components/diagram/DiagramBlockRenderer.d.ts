import type { SectionRendererProps } from '../../renderers/types';
/** Section type key this block registers under. */
export declare const DIAGRAM_BLOCK_TYPE = "excalidraw";
export default function DiagramBlockRenderer({ section, editable, ydoc, provider, user, }: SectionRendererProps): import("react").JSX.Element;
/**
 * Register the diagram block with the section-renderer registry.
 *
 * Call once during host app startup. Idempotent.
 */
export declare function registerDiagramBlock(): void;
//# sourceMappingURL=DiagramBlockRenderer.d.ts.map