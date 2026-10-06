import { type ReactNode } from 'react';
import type { Node } from '@tiptap/core';
import { type NodeViewProps } from '@tiptap/react';
/** Fetch bytes using the current viewer's identity; credentials never enter the document. */
export type DocumentImageLoader = (src: string, signal: AbortSignal) => Promise<Blob>;
export interface DocumentImageProviderProps {
    loadImage: DocumentImageLoader;
    /** Only these URLs are passed to the authenticated loader. Defaults to gateway uploads. */
    requiresAuthentication?: (src: string) => boolean;
    children: ReactNode;
}
export declare function DocumentImageProvider({ children, ...value }: DocumentImageProviderProps): import("react").JSX.Element;
/** Shared node view extracted from the reference document editor. */
export declare function AuthenticatedDocumentImageView({ node, selected }: NodeViewProps): import("react").JSX.Element;
/** Inject the caller's image extension to preserve one TipTap module graph. */
export declare function createAuthenticatedDocumentImage(image: Node): Node;
//# sourceMappingURL=AuthenticatedDocumentImage.d.ts.map