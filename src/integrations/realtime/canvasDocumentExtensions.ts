import type { AnyExtension, Node } from '@tiptap/core';
import { createAuthenticatedDocumentImage } from '../../components/doc-editor/AuthenticatedDocumentImage';

/** The schema inputs an app supplies from its own installed packages (one module graph). */
export interface CanvasDocumentExtensionParts {
  MacroNode: AnyExtension;
  HeadingAnchor: AnyExtension;
  MarkdownClipboard: AnyExtension;
  Callout: AnyExtension;
  CanvasTextAlign: AnyExtension;
  TextStyleKit: AnyExtension;
  /** The BASE `@tiptap/extension-image`; it is wrapped with the authenticated node view here. */
  Image: Node;
  TableKit: AnyExtension;
  /** Per-document comment/suggestion bindings; never replace shared node definitions. */
  additional?: readonly AnyExtension[];
}

/** `createCanvasExtensions` from `@…/realtime-modules/adapters/tiptap`, injected. */
export type CreateCanvasExtensions = (parts: CanvasDocumentExtensionParts) => AnyExtension[];

/**
 * THE canvas extension list: realtime-modules' canonical factory over the app's
 * parts, with the image node swapped for the authenticated one. Both apps build
 * their list here so the schema cannot drift. Call once at module scope —
 * ProseMirror reads extensions once, so a new array per render rebuilds the editor.
 */
export function buildCanvasDocumentExtensions(
  createCanvasExtensions: CreateCanvasExtensions,
  parts: CanvasDocumentExtensionParts,
): AnyExtension[] {
  return createCanvasExtensions({
    ...parts,
    Image: createAuthenticatedDocumentImage(parts.Image),
  });
}
