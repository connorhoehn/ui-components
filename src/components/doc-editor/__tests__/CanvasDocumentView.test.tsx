import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as Y from 'yjs';
import CanvasDocumentView from '../CanvasDocumentView';

// TiptapEditor mounts a real ProseMirror view, which is not what this file is
// testing — the STATE MACHINE around it is. Stubbed so a failure here always
// means the page logic broke, never that the editor did.
vi.mock('../TiptapEditor', () => ({
  default: ({ extensions }: { extensions?: readonly unknown[] }) => (
    <div data-testid="tiptap-stub" data-extension-count={String(extensions?.length ?? 0)} />
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
