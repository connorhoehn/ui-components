// src/integrations/realtime-modules/WrappedCanvasDocument.tsx
//
// CanvasDocumentView wired to a useCanvasDocument() return from
// realtime-modules.
//
// The binding is the reason this layer exists: CanvasDocumentView must not
// know what a Y.Doc schema version is, and the hook must not know what a
// button looks like. What lives here is the one piece of glue between them —
// turning `materialize(schema, model)` into the `onConvert(): Promise<string
// | null>` the view can call, and carrying `unsupported` back out.

import { useCallback, useState } from 'react';
import type * as Y from 'yjs';
import CanvasDocumentView, {
  type CanvasUnsupportedForm,
} from '../../components/doc-editor/CanvasDocumentView';
import type { CanvasDocumentViewProps } from '../../components/doc-editor/CanvasDocumentView';

/**
 * `useCanvasDocument(ydoc)`'s return, restated structurally so this package
 * keeps zero runtime dependency on realtime-modules — the same convention the
 * other Wrapped* components follow.
 */
export interface RMUseCanvasDocumentReturn {
  isCanvas: boolean;
  schemaVersion: number;
  body: Y.XmlFragment | null;
  exportMarkdown: () => string;
  materialize: (
    schema: { nodes: unknown; marks: unknown },
    model: unknown,
  ) => { ok: boolean; reason?: string; unsupported: CanvasUnsupportedForm[] };
  importMarkdown: (
    schema: { nodes: unknown; marks: unknown },
    markdown: string,
  ) => { ok: boolean; reason?: string; unsupported: CanvasUnsupportedForm[] };
}

export interface WrappedCanvasDocumentProps
  extends Omit<
    CanvasDocumentViewProps,
    'isCanvas' | 'body' | 'onConvert' | 'unsupported'
  > {
  /** Return value of useCanvasDocument(ydoc) from realtime-modules. */
  canvas: RMUseCanvasDocumentReturn;
  /**
   * The live editor's ProseMirror schema, needed to build the canvas body.
   *
   * Deliberately supplied by the caller rather than constructed here: a second
   * schema means a second copy of prosemirror-model in the module graph, which
   * breaks `instanceof` across the boundary. See the note on `PmSchemaLike` in
   * useCanvasDocument.
   */
  schema: { nodes: unknown; marks: unknown } | null;
  /**
   * The legacy document to convert, as a `DocModel`. When omitted, conversion
   * starts from an empty page.
   */
  legacyModel?: unknown;
}

export default function WrappedCanvasDocument({
  canvas,
  schema,
  legacyModel,
  ...viewProps
}: WrappedCanvasDocumentProps) {
  const [unsupported, setUnsupported] = useState<readonly CanvasUnsupportedForm[]>([]);

  const onConvert = useCallback(async (): Promise<string | null> => {
    // Refused rather than attempted: materialize needs the live editor's
    // schema, and calling it with a stand-in is how you get a second
    // prosemirror-model in the graph. A clear refusal beats a subtle break.
    if (!schema) return 'The editor is still loading — try again in a moment.';

    const result = canvas.materialize(schema, legacyModel ?? { frontMatter: {}, content: [] });
    // Set even on success: a conversion can succeed AND have dropped a form
    // into a code block, and that is exactly when the user needs telling.
    setUnsupported(result.unsupported ?? []);
    return result.ok ? null : (result.reason ?? 'Conversion was refused.');
  }, [canvas, schema, legacyModel]);

  return (
    <CanvasDocumentView
      {...viewProps}
      isCanvas={canvas.isCanvas}
      body={canvas.body}
      onConvert={onConvert}
      unsupported={unsupported}
    />
  );
}
