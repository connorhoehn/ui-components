// ui-components/src/components/diagram/index.ts
//
// Collaborative diagramming. Published as its own `./diagram` subpath rather
// than from the root barrel so that nothing about Excalidraw — including the
// type imports — reaches an app that does not draw.

export { default as CollaborativeExcalidraw } from './CollaborativeExcalidraw';
export {
    default as DiagramBlockRenderer,
    registerDiagramBlock,
    DIAGRAM_BLOCK_TYPE,
} from './DiagramBlockRenderer';
export { useResolvedTheme } from './useResolvedTheme';
export type { ResolvedTheme } from './useResolvedTheme';

export type {
    DiagramUser,
    SharedDiagramProps,
    CollaborativeExcalidrawProps,
    CollaborativeExcalidrawHostedProps,
    CollaborativeExcalidrawBootstrapProps,
    ExcalidrawCanvasProps,
} from './types';
