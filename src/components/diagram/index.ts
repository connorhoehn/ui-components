// ui-components/src/components/diagram/index.ts
//
// Collaborative diagramming. Published as its own `./diagram` subpath rather
// than from the root barrel so that nothing about Excalidraw — including the
// type imports — reaches an app that does not draw.

export { default as CollaborativeExcalidraw } from './CollaborativeExcalidraw';
export { default as DiagramBlockRenderer } from './DiagramBlockRenderer';
export type { DiagramBlockProps, DiagramBlockUser } from './DiagramBlockRenderer';

// Rendered inside the canvas already — exported so a host that wants the
// roster somewhere else (a page header, a sidebar) reuses this mapping rather
// than writing a second one that disagrees about colour.
export { DiagramPresenceBar } from './DiagramPresenceBar';
export type { DiagramPresenceBarProps } from './DiagramPresenceBar';

// The canvas half: a `macro:diagram` fence, drawn in the page.
export { DiagramMacro, diagramRenderer, diagramMacroPluginKey } from './DiagramMacro';
export type { DiagramMacroContext, DiagramMacroOptions } from './DiagramMacro';

// The document-macro system the diagram is now one citizen of: the registry
// that owns the single `macro` node view, and every renderer registered
// through it (action items today, an agent -> human hand-off next).
//
// Published from here rather than from a `./doc-macros` subpath of its own
// because this entry already externalises `@tiptap/core` and the
// `prosemirror-*` graph and already carries the canvas macro half — a new
// subpath needs `vite.config.ts` and `package.json` changes this work does not
// own. See `../doc-macros/index.ts`.
export * from '../doc-macros';
export {
    DIAGRAM_MACRO_NAME,
    MACRO_NODE_NAME,
    newDiagramId,
    isDiagramId,
    diagramMacroText,
    readDiagramId,
} from './macro';

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
