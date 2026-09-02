import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useEffect } from 'react';
import * as Y from 'yjs';
import CanvasDocumentView from '../CanvasDocumentView';

// TiptapEditor mounts a real ProseMirror view, which is not what this file is
// testing — the STATE MACHINE around it is. Stubbed so a failure here always
// means the page logic broke, never that the editor did.
vi.mock('../TiptapEditor', () => ({
  default: ({
    extensions,
    chrome,
    hideToolbar,
    onEditorReady,
  }: {
    extensions?: readonly unknown[];
    chrome?: string;
    hideToolbar?: boolean;
    onEditorReady?: (e: unknown) => void;
  }) => {
    // Hands out a stand-in editor so the page's own toolbar renders, which is
    // the thing under test — the real editor is exercised elsewhere.
    //
    // Fires ONCE, and the empty dep array is load-bearing. CanvasDocumentView
    // passes an inline arrow, so `[onEditorReady]` changes identity on every
    // render: calling back would setEditor -> re-render -> new arrow -> call
    // back again, forever. That spun this file for 900s+ while every other
    // suite finished in about a second. The real TiptapEditor depends on
    // `[editor]`, so only the stub had the loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { onEditorReady?.({ stub: true }); }, []);
    return (
      <div
        data-testid="tiptap-stub"
        data-extension-count={String(extensions?.length ?? 0)}
        data-chrome={chrome ?? 'card'}
        data-hide-toolbar={String(Boolean(hideToolbar))}
      />
    );
  },
}));

// Reflects the gutter props back as attributes. The toggle's own rendering
// (count badge, aria-pressed, the zero-comment case) is DocumentToolbar's
// contract and is tested there against the real component; what this file
// owns is whether the page hands it the right numbers.
vi.mock('../DocumentToolbar', () => ({
  default: ({
    actions, commentCount, gutterVisible, onToggleGutter,
  }: {
    actions?: React.ReactNode;
    commentCount?: number;
    gutterVisible?: boolean;
    onToggleGutter?: () => void;
  }) => (
    <div
      data-testid="toolbar-stub"
      data-comment-count={String(commentCount ?? 0)}
      data-gutter-visible={String(gutterVisible)}
      data-has-toggle={String(Boolean(onToggleGutter))}
    >
      {actions}
    </div>
  ),
}));

function makeDoc() {
  const ydoc = new Y.Doc();
  return { ydoc, body: ydoc.getXmlFragment('body') };
}

const USER = { name: 'Hank', color: '#2563eb' };
const EXTENSIONS = [{ name: 'macro' }, { name: 'headingAnchor' }];

function renderView(overrides: Partial<React.ComponentProps<typeof CanvasDocumentView>> = {}) {
  const { ydoc, body } = makeDoc();
  return render(
    <CanvasDocumentView
      isCanvas
      body={body}
      ydoc={ydoc}
      provider={null}
      user={USER}
      extensions={EXTENSIONS}
      {...overrides}
    />,
  );
}

afterEach(cleanup);

describe('CanvasDocumentView — a document that is already a canvas', () => {
  it('renders the page body, not the conversion prompt', () => {
    renderView();
    expect(screen.getByTestId('tiptap-stub')).toBeInTheDocument();
    expect(screen.queryByTestId('canvas-document-convert-prompt')).toBeNull();
  });

  // Without the canvas extensions the schema has no `macro` node, so every
  // macro degrades to plain text and the NEXT save writes that loss back.
  // Asserting they reach the editor is asserting the data does not rot.
  it('passes the canvas extensions through to the editor', () => {
    renderView();
    expect(screen.getByTestId('tiptap-stub')).toHaveAttribute('data-extension-count', '2');
  });

  it('paints the body on invariant paper', () => {
    renderView();
    const paper = screen.getByTestId('canvas-document-paper');
    expect(paper.className).toContain('bg-paper');
    // Paired ink. `text-text-primary` here would be near-white on white in
    // dark mode — see darkSurfaceTokens (d).
    expect(paper.className).toContain('text-paper-ink');
    expect(paper.className).not.toMatch(/\btext-text-/);
  });

  // What makes it read as a document rather than a text field: a bounded
  // sheet floating on a recessed workspace, not a full-bleed white box.
  it('floats a bounded sheet on a workspace', () => {
    renderView();
    const workspace = screen.getByTestId('canvas-document-workspace');
    const paper = screen.getByTestId('canvas-document-paper');
    expect(workspace).toContainElement(paper);
    // bg-workspace, NOT bg-surface-inset: the latter is a 2% tint (#fafbfc)
    // that is invisible against white paper (#fff), so the sheet dissolved into
    // its own workspace and the page read as an expanse of empty white. The
    // desk has to be a visibly different surface from the page on it.
    expect(workspace.className).toContain('bg-workspace');
    expect(workspace.className).not.toContain('bg-surface-inset');
    expect(paper.className).toMatch(/max-w-\[816px\]/); // 8.5in at 96dpi
    expect(paper.className).toMatch(/shadow-/);
  });

  // The document typography lives under `.doc-page`. Without the class the
  // base .ProseMirror rules apply: 13px and no heading scale, i.e. a form
  // field. The class IS the styling, so its absence is a silent regression.
  it('scopes document typography to the sheet', () => {
    renderView();
    expect(screen.getByTestId('canvas-document-paper').className).toContain('doc-page');
  });

  // Chrome, not paper: the toolbar is themed and goes dark; the sheet does
  // not. It must therefore live OUTSIDE the paper element.
  it('renders the toolbar outside the sheet', () => {
    renderView();
    const toolbar = screen.getByTestId('canvas-document-toolbar');
    const paper = screen.getByTestId('canvas-document-paper');
    expect(paper).not.toContainElement(toolbar);
    expect(screen.getByTestId('canvas-document-workspace')).toContainElement(toolbar);
    expect(toolbar.className).toContain('sticky');
  });

  it('runs the editor bare and suppresses its built-in toolbar', () => {
    renderView();
    const stub = screen.getByTestId('tiptap-stub');
    expect(stub).toHaveAttribute('data-chrome', 'none');
    expect(stub).toHaveAttribute('data-hide-toolbar', 'true');
  });

  it('does not render a toolbar in read-only mode', () => {
    renderView({ editable: false });
    expect(screen.queryByTestId('canvas-document-toolbar')).toBeNull();
  });
});

describe('CanvasDocumentView — a legacy sectioned document', () => {
  it('offers conversion instead of rendering an empty page', () => {
    renderView({ isCanvas: false, body: null });
    expect(screen.getByTestId('canvas-document-convert-prompt')).toBeInTheDocument();
    expect(screen.queryByTestId('tiptap-stub')).toBeNull();
  });

  // Converting rewrites the user's document. Doing that because they opened a
  // page is a migration nobody asked for.
  it('does not convert on mount', () => {
    const onConvert = vi.fn();
    renderView({ isCanvas: false, body: null, onConvert });
    expect(onConvert).not.toHaveBeenCalled();
  });

  it('converts on click', async () => {
    const onConvert = vi.fn().mockResolvedValue(null);
    renderView({ isCanvas: false, body: null, onConvert });
    fireEvent.click(screen.getByTestId('canvas-document-convert'));
    await waitFor(() => expect(onConvert).toHaveBeenCalledTimes(1));
  });

  // materialize() refuses on a non-empty body — that refusal is what stops a
  // double-convert from duplicating the document. A refusal the user cannot
  // see reads as a dead button.
  it('surfaces a refusal instead of failing silently', async () => {
    const onConvert = vi.fn().mockResolvedValue('body is not empty');
    renderView({ isCanvas: false, body: null, onConvert });
    fireEvent.click(screen.getByTestId('canvas-document-convert'));
    const err = await screen.findByTestId('canvas-document-convert-error');
    expect(err).toHaveTextContent('body is not empty');
  });

  it('surfaces a thrown error too', async () => {
    const onConvert = vi.fn().mockRejectedValue(new Error('offline'));
    renderView({ isCanvas: false, body: null, onConvert });
    fireEvent.click(screen.getByTestId('canvas-document-convert'));
    expect(await screen.findByTestId('canvas-document-convert-error')).toHaveTextContent('offline');
  });

  it('ignores a second click while the first is in flight', async () => {
    let release: (v: string | null) => void = () => {};
    const onConvert = vi.fn(() => new Promise<string | null>((r) => { release = r; }));
    renderView({ isCanvas: false, body: null, onConvert });
    const btn = screen.getByTestId('canvas-document-convert');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(onConvert).toHaveBeenCalledTimes(1);
    release(null);
    await waitFor(() => expect(btn).not.toBeDisabled());
  });
});

describe('CanvasDocumentView — the comment gutter', () => {
  const ITEMS = [
    { id: 'c1', top: 20, content: <p>first</p> },
    { id: 'c2', top: 90, content: <p>second</p> },
    { id: 'c3', top: 300, content: <p>third</p> },
  ];

  it('shows the gutter by default when there are threads', () => {
    renderView({ gutterItems: ITEMS });
    expect(screen.getByTestId('canvas-document-gutter')).toBeInTheDocument();
  });

  it('unmounts the gutter when the host turns it off', () => {
    renderView({ gutterItems: ITEMS, gutterVisible: false });
    expect(screen.queryByTestId('canvas-document-gutter')).toBeNull();
  });

  // The point of hiding it. With the column gone the row must not keep
  // reserving space for it, or the sheet stays shoved left of centre with an
  // empty margin nobody can explain.
  it('gives the row back to the sheet when the gutter is off', () => {
    renderView({ gutterItems: ITEMS, gutterVisible: false });
    const row = screen.getByTestId('canvas-document-page-row');
    expect(row).toHaveAttribute('data-gutter', 'hidden');
    expect(row.className).not.toContain('gap-6');
    expect(row).toContainElement(screen.getByTestId('canvas-document-paper'));
    expect(row).not.toContainElement(screen.queryByTestId('canvas-document-gutter'));
  });

  it('shares the row with the gutter when it is on', () => {
    renderView({ gutterItems: ITEMS });
    const row = screen.getByTestId('canvas-document-page-row');
    expect(row).toHaveAttribute('data-gutter', 'visible');
    expect(row.className).toContain('gap-6');
    expect(row).toContainElement(screen.getByTestId('canvas-document-gutter'));
  });

  // The critical detail: hiding the threads must not hide the FACT of them.
  // The toolbar keeps the count whether or not the column is drawn.
  it('still reports the count to the toolbar while hidden', () => {
    renderView({ gutterItems: ITEMS, gutterVisible: false, onToggleGutter: () => {} });
    const toolbar = screen.getByTestId('toolbar-stub');
    expect(toolbar).toHaveAttribute('data-comment-count', '3');
    expect(toolbar).toHaveAttribute('data-gutter-visible', 'false');
    expect(toolbar).toHaveAttribute('data-has-toggle', 'true');
  });

  it('offers nothing to toggle when the document has no comments', () => {
    renderView({ gutterItems: [], onToggleGutter: () => {} });
    expect(screen.getByTestId('toolbar-stub')).toHaveAttribute('data-comment-count', '0');
    expect(screen.queryByTestId('canvas-document-gutter')).toBeNull();
  });

  // Controlled, not internal: the component never flips its own state, so a
  // host that forgets to persist the preference is a visible bug rather than
  // one that silently resets on the next navigation.
  it('does not hide the gutter on its own when told to stay open', () => {
    const onToggleGutter = vi.fn();
    renderView({ gutterItems: ITEMS, gutterVisible: true, onToggleGutter });
    expect(screen.getByTestId('canvas-document-gutter')).toBeInTheDocument();
    expect(onToggleGutter).not.toHaveBeenCalled();
  });
});

describe('CanvasDocumentView — content that could not be represented', () => {
  it('names each unsupported form rather than counting them', () => {
    renderView({ unsupported: [{ kind: 'table' }, { kind: 'image' }] });
    const banner = screen.getByTestId('canvas-document-unsupported');
    expect(banner).toHaveTextContent('table');
    expect(banner).toHaveTextContent('image');
    // The content is preserved on the page, so this is a pointer, not an error.
    expect(banner).toHaveTextContent('nothing was lost');
  });

  it('says nothing when everything converted cleanly', () => {
    renderView({ unsupported: [] });
    expect(screen.queryByTestId('canvas-document-unsupported')).toBeNull();
  });
});
