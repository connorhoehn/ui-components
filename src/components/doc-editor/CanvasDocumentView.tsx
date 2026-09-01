// src/components/doc-editor/CanvasDocumentView.tsx
//
// The page surface for a canvas document — the Confluence/Google-Docs style
// white page that replaces section-by-section form editing.
//
// Presentational on purpose. It knows nothing about Y.js roots, schema
// versions or migration; it renders the three states a canvas document can be
// in and calls back. `WrappedCanvasDocument` in integrations/realtime-modules
// binds it to `useCanvasDocument()`.
//
// The three states, and why each exists:
//
//   1. canvas          → render the body. The whole page is ONE editor, so a
//                        heading is just a heading and a selection can span
//                        what used to be two section cards.
//   2. not yet a canvas → offer the conversion. Never convert on mount: it
//                        rewrites the user's document, and doing that as a
//                        side effect of opening a page is how you get a
//                        surprise migration nobody asked for.
//   3. converting/failed → say so. `materialize` REFUSES on a non-empty body
//                        (that refusal is what stops a double-convert from
//                        duplicating content), and a refusal the user cannot
//                        see reads as a dead button.

import { useState, type ReactNode } from 'react';
import type { XmlFragment } from 'yjs';
import type * as Y from 'yjs';
import TiptapEditor from './TiptapEditor';
import DocumentToolbar from './DocumentToolbar';
import DocumentGutter, { type GutterItem } from './DocumentGutter';
import Banner from '../shared/Banner';
import EmptyState from '../shared/EmptyState';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';

/**
 * A form the ProseMirror schema could not express, surfaced rather than
 * dropped. Mirrors `UnsupportedForm` in realtime-modules structurally so this
 * package keeps zero runtime dependency on it.
 */
export interface CanvasUnsupportedForm {
  kind: string;
  reason?: string;
}

export interface CanvasDocumentViewProps {
  /** True when the document is already a canvas (`meta.schemaVersion >= 2`). */
  isCanvas: boolean;
  /** The page body. Required when `isCanvas`; ignored otherwise. */
  body: XmlFragment | null;
  ydoc: Y.Doc;
  provider: Parameters<typeof TiptapEditor>[0]['provider'];
  user: { name: string; color: string };
  editable?: boolean;
  /**
   * Canvas extensions (macro node views, heading anchors). Without these the
   * schema has no `macro` node and macros degrade to plain text, so this is
   * required rather than optional — a caller that forgets loses data on the
   * next save.
   */
  extensions: readonly unknown[];
  /**
   * Converts a legacy sectioned document into a canvas. Resolves to the
   * refusal reason on failure, or null on success.
   */
  onConvert?: () => Promise<string | null>;
  /** Forms that could not be represented, from the last conversion. */
  unsupported?: readonly CanvasUnsupportedForm[];
  /** Rendered above the page — title, participants, actions. */
  header?: ReactNode;
  /**
   * Rendered at the right end of the toolbar — presence avatars, share, and
   * anything belonging to the document rather than to formatting.
   */
  toolbarActions?: ReactNode;
  /**
   * Comment threads for the margin. Each carries the offset it wants and the
   * gutter resolves collisions between them.
   *
   * Omitted entirely when empty rather than rendered as a blank column, so a
   * document with no discussion keeps the full width for its text.
   */
  gutterItems?: readonly GutterItem[];
  onFocusGutterItem?: (id: string) => void;
  /**
   * Hands the live editor out once it exists (null while initialising).
   *
   * Not a convenience: `materialize()` needs the LIVE editor's ProseMirror
   * schema, and building a second one puts a second prosemirror-model in the
   * graph — the `instanceof` break the app's optimizeDeps.exclude entries
   * already exist to prevent. This is how a caller gets the real one.
   */
  onEditorReady?: (editor: Parameters<typeof DocumentToolbar>[0]['editor'] | null) => void;
  'data-testid'?: string;
}

export default function CanvasDocumentView({
  isCanvas,
  body,
  ydoc,
  provider,
  user,
  editable = true,
  extensions,
  onConvert,
  unsupported = [],
  header,
  toolbarActions,
  gutterItems,
  onFocusGutterItem,
  onEditorReady,
  'data-testid': testId = 'canvas-document',
}: CanvasDocumentViewProps) {
  const [converting, setConverting] = useState(false);
  const [convertError, setConvertError] = useState<string | null>(null);
  // Held so the toolbar can render in the chrome ABOVE the sheet rather than
  // inside the page margins. Null until the editor finishes initialising.
  const [editor, setEditor] = useState<Parameters<typeof DocumentToolbar>[0]['editor'] | null>(null);

  const handleConvert = async () => {
    if (!onConvert || converting) return; // a second click races the first
    setConverting(true);
    setConvertError(null);
    try {
      const reason = await onConvert();
      if (reason) setConvertError(reason);
    } catch (err) {
      setConvertError(err instanceof Error ? err.message : String(err));
    } finally {
      setConverting(false);
    }
  };

  return (
    <div data-testid={testId} className="flex flex-col gap-3">
      {header}

      {unsupported.length > 0 && (
        <Banner
          variant="warning"
          title="Some content could not be represented"
          data-testid={`${testId}-unsupported`}
        >
          <span className="flex flex-wrap items-center gap-1.5">
            {/* Named, not counted: "3 items" tells the user nothing about what
                to go look at. Each kind is preserved on the page as a code
                block, so this is a pointer, not an error. */}
            {unsupported.map((u, i) => (
              <Chip key={`${u.kind}-${i}`} tone="warning" size="xs">
                {u.kind}
              </Chip>
            ))}
            <span>— kept on the page as text so nothing was lost.</span>
          </span>
        </Banner>
      )}

      {convertError && (
        <Banner variant="error" title="Could not convert" data-testid={`${testId}-convert-error`}>
          {convertError}
        </Banner>
      )}

      {isCanvas && body ? (
        // The workspace: a recessed grey field the page floats on. This is
        // what reads as "a document" rather than "a text field" — without a
        // surrounding surface, a white box on a white app is just a widget.
        <div
          data-testid={`${testId}-workspace`}
          className="rounded-lg bg-surface-inset overflow-y-auto"
        >
          {/* Chrome, not paper: the toolbar is themed and goes dark, while the
              sheet below it stays white. Sticky so it survives scrolling a
              long document, which is the only reason a document toolbar is
              useful at all. */}
          {editable && editor && (
            <div
              data-testid={`${testId}-toolbar`}
              className="sticky top-0 z-10 border-b border-border bg-surface-panel"
            >
              <div className="mx-auto max-w-[816px] px-2">
                <DocumentToolbar editor={editor} actions={toolbarActions} />
              </div>
            </div>
          )}
          {/* Page and gutter share a row, so a thread sits BESIDE the text it
              refers to rather than under the document. */}
          <div className="flex justify-center gap-6 py-8 px-6">
          <div
            // The sheet. 816px is 8.5in at 96dpi and 1056px is 11in, so the
            // page has the proportions of the thing it is imitating; 96px
            // padding is a 1in margin. min-h, not h: the page grows with the
            // content instead of clipping at one sheet.
            //
            // Invariant white with PAIRED invariant ink — a document body does
            // not follow the theme, only the chrome around it does.
            // `text-text-primary` here would render near-white prose on white
            // paper in dark mode, which still "renders" and so survives a
            // screenshot check; darkSurfaceTokens (d) fails the build for it.
            data-testid={`${testId}-paper`}
            className="doc-page w-full max-w-[816px] min-h-[1056px] bg-paper px-[96px] py-[96px] text-paper-ink shadow-[0_1px_3px_rgba(60,64,67,0.15),0_4px_12px_rgba(60,64,67,0.15)]"
          >
            <TiptapEditor
              fragment={body}
              ydoc={ydoc}
              provider={provider}
              user={user}
              editable={editable}
              extensions={extensions}
              placeholder="Start writing…"
              // The page owns the surface: no widget border, no imposed ink.
              chrome="none"
              hideToolbar
              onEditorReady={(e) => { setEditor(e); onEditorReady?.(e); }}
            />
            </div>
            {gutterItems && gutterItems.length > 0 && (
              <DocumentGutter
                items={gutterItems}
                onFocusItem={onFocusGutterItem}
                data-testid={`${testId}-gutter`}
              />
            )}
          </div>
        </div>
      ) : (
        <EmptyState
          testId={`${testId}-convert-prompt`}
          title="This document still uses sections"
          description="Convert it to a single page to edit it as one continuous document. Your existing sections become headings; nothing is deleted."
          action={
            onConvert ? (
              <Button onClick={handleConvert} disabled={converting} data-testid={`${testId}-convert`}>
                {converting ? 'Converting…' : 'Convert to page'}
              </Button>
            ) : undefined
          }
        />
      )}
    </div>
  );
}
