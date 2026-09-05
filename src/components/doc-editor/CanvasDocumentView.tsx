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
import { createPortal } from 'react-dom';
import type { XmlFragment } from 'yjs';
import type * as Y from 'yjs';
import { cn } from '../../lib/cn';
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
  /**
   * Where to render the convert control on a legacy document.
   *
   * Given an element, the button is portaled into it and the full-width
   * explanatory prompt is not rendered at all. That is the right shape once
   * the host has a toolbar: the prompt is a standing offer about the
   * document's FORMAT, not a piece of its content, and as a block it pushed
   * the actual document down the page every single visit — an advertisement
   * above the thing you came to read.
   *
   * Null or omitted keeps the block prompt, which is still correct for a host
   * with nowhere else to put it.
   */
  convertSlot?: HTMLElement | null;
  /** Forms that could not be represented, from the last conversion. */
  unsupported?: readonly CanvasUnsupportedForm[];
  /**
   * The (still empty) canvas body, so the conversion has a live schema to run
   * against.
   *
   * ## Why this prop has to exist
   *
   * `onConvert` ultimately calls `materialize(schema, model)`, and that schema
   * must be the LIVE editor's — building a second one puts a second
   * prosemirror-model in the graph. But before conversion there IS no editor:
   * this component only mounted one inside the `isCanvas` branch, so
   * `onEditorReady` never fired, the host's schema stayed null, and
   * `WrappedCanvasDocument` refused every conversion with "the editor is still
   * loading — try again in a moment" — permanently, because it never would.
   *
   * Given the fragment, the convert prompt mounts a read-only, hidden editor
   * beside itself whose only job is to exist, so the schema is real and the
   * button works. Read-only is load-bearing: the fragment is the one
   * `materialize` writes into, and it REFUSES a non-empty body, so an editor a
   * user could type into would break conversion by being used.
   *
   * Omit it and the prompt behaves as before — the host is then responsible
   * for supplying `schema` some other way.
   */
  schemaProbe?: XmlFragment | null;
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
  /**
   * Pinned to the top of the gutter — this is where a docked call goes.
   *
   * The margin beside the sheet is the right home for it: it scrolls with the
   * document, it is beside the text rather than over it, and it does not
   * reserve a band of empty page above the toolbar the way a floating dock
   * did. Its presence alone is enough to show the gutter — a call has to live
   * somewhere and "no comments yet" is not a reason to drop it.
   */
  gutterLead?: ReactNode;
  onFocusGutterItem?: (id: string) => void;
  /**
   * Whether the margin gutter is showing. Defaults to true, so a caller that
   * knows nothing about this keeps today's behaviour.
   *
   * CONTROLLED on purpose. "Show comments" is a reading preference, and a
   * preference the component owns privately is one it forgets on every
   * navigation — open the document again and the margin is back. Only the host
   * can persist it (profile, localStorage, the document itself), so only the
   * host can own it.
   */
  gutterVisible?: boolean;
  /**
   * Flips `gutterVisible`. Its absence means no toggle is offered at all,
   * which is the right default for a read-only embed with no place to store
   * the answer.
   */
  onToggleGutter?: () => void;
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
  convertSlot = null,
  unsupported = [],
  schemaProbe,
  header,
  toolbarActions,
  gutterItems,
  gutterLead,
  onFocusGutterItem,
  gutterVisible = true,
  onToggleGutter,
  onEditorReady,
  'data-testid': testId = 'canvas-document',
}: CanvasDocumentViewProps) {
  const [converting, setConverting] = useState(false);
  const [convertError, setConvertError] = useState<string | null>(null);
  // Held so the toolbar can render in the chrome ABOVE the sheet rather than
  // inside the page margins. Null until the editor finishes initialising.
  const [editor, setEditor] = useState<Parameters<typeof DocumentToolbar>[0]['editor'] | null>(null);

  const commentCount = gutterItems?.length ?? 0;
  // Two conditions, not one: there has to be something to show, AND the gutter
  // has to be switched on. Splitting them is what lets the toolbar keep
  // reporting the count while the column itself is gone.
  // A docked call keeps the gutter open on its own. Without this the call
  // would vanish the moment a document had no comments, which is most of them.
  const showGutter = (commentCount > 0 || !!gutterLead) && gutterVisible;

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
        // The workspace: a recessed grey field the page floats on — `bg-workspace`,
        // NOT `bg-surface-inset`, whose 2% tint is invisible against white paper. This is
        // what reads as "a document" rather than "a text field" — without a
        // surrounding surface, a white box on a white app is just a widget.
        <div
          data-testid={`${testId}-workspace`}
          className="rounded-lg bg-workspace overflow-y-auto"
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
              {/* Full workspace width, NOT the sheet's 816px.

                  Capping chrome at the PAPER width contradicts the comment
                  above it: the toolbar belongs to the app, not to the page. It
                  also broke as soon as the toolbar earned another control —
                  `Insert diagram` pushed it past 816px, `flex-wrap` folded it
                  onto a second row, and the result read as two unrelated
                  toolbars stacked on top of each other (measured: the inner bar
                  was 800px wide and 68px tall, i.e. two rows of controls, inside
                  a 1372px workspace with room to spare).

                  Word processors put the toolbar across the whole chrome for
                  this reason — the sheet is centred beneath it, the controls are
                  not. */}
              <div className="w-full px-3">
                <DocumentToolbar
                  editor={editor}
                  actions={toolbarActions}
                  // Passed even when the gutter is hidden — that is precisely
                  // when the count is the only remaining evidence that a
                  // discussion exists.
                  commentCount={commentCount}
                  gutterVisible={gutterVisible}
                  {...(onToggleGutter ? { onToggleGutter } : {})}
                />
              </div>
            </div>
          )}
          {/* Page and gutter share a row, so a thread sits BESIDE the text it
              refers to rather than under the document. With the gutter off the
              row collapses to the sheet alone: no reserved column, no gap, so
              the page recentres across the full workspace instead of sitting
              left of centre to leave margin space for threads that are not
              being rendered. */}
          <div
            data-testid={`${testId}-page-row`}
            data-gutter={showGutter ? 'visible' : 'hidden'}
            // Page padding shrinks first when the window does: the sheet is
            // the content, and giving a narrow window six paces of empty
            // workspace on each side while the text squeezes gets the priority
            // backwards.
            className={cn('flex justify-center py-4 px-2 sm:py-8 sm:px-6', showGutter && 'gap-3 sm:gap-6')}
          >
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
            // 96px is a 1in margin and right on a full-width sheet. On a
            // narrow window it is most of the line: 816px of paper minus
            // 192px of margin leaves the text in a column too thin to read,
            // and the page still overflows. The margin scales with the
            // viewport and reaches its proper inch when there is room for it.
            className="doc-page w-full max-w-[816px] min-h-[1056px] bg-paper px-6 py-10 sm:px-12 sm:py-16 lg:px-[96px] lg:py-[96px] text-paper-ink shadow-[0_1px_3px_rgba(60,64,67,0.15),0_4px_12px_rgba(60,64,67,0.15)]"
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
            {showGutter && (
              <DocumentGutter
                items={gutterItems ?? []}
                lead={gutterLead}
                onFocusItem={onFocusGutterItem}
                data-testid={`${testId}-gutter`}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          {onConvert && convertSlot
            ? createPortal(
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleConvert}
                  disabled={converting}
                  data-testid={`${testId}-convert`}
                  // The explanation the block prompt carried has to survive the
                  // move somewhere, or the control becomes a verb with no
                  // object: "convert to what, and what happens to my sections?"
                  title="Convert this sectioned document into a single page. Your sections become headings; nothing is deleted."
                >
                  {converting ? 'Converting…' : 'Convert to page'}
                </Button>,
                convertSlot,
              )
            : (
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
          {/* The schema probe — see `schemaProbe`. `hidden` rather than a
              utility class so it does not depend on the consuming app having
              this package's stylesheet; the UA rule alone takes it out of the
              layout, and ProseMirror builds its schema perfectly well in a
              display:none subtree.

              Deliberately NOT fed into this component's own `editor` state:
              that state exists for the toolbar, which the prompt has no use
              for, and holding it would leave a DESTROYED editor in state for
              one render after the conversion flips the branch. Only the host
              is told, and only so it can hand the schema back. */}
          {onConvert && schemaProbe && (
            <div hidden aria-hidden="true" data-testid={`${testId}-schema-probe`}>
              <TiptapEditor
                fragment={schemaProbe}
                ydoc={ydoc}
                // No provider: a probe must not publish presence or a caret
                // into a document nobody is looking at through it.
                provider={null}
                user={user}
                editable={false}
                extensions={extensions}
                chrome="none"
                hideToolbar
                onEditorReady={(e) => onEditorReady?.(e)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
