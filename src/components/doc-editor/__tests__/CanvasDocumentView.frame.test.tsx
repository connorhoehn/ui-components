// renderFrame: the host places the toolbar and ruler; default layout unchanged.
//
// Separate from CanvasDocumentView.test.tsx because these need an editor that
// can actually be asked questions — a selection, a `textBetween`, and event
// subscriptions — while that file's stub is deliberately an inert `{stub:true}`
// so its assertions can only be about the page's own state machine.

import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useEffect } from 'react';
import * as Y from 'yjs';
import CanvasDocumentView, { type CanvasDocumentFrame } from '../CanvasDocumentView';

/** The listeners the view has subscribed, so a test can fire them. */
let listeners: Record<string, Array<() => void>> = {};
/** The editor the view is holding, so a test can move its selection. */
let liveEditor: FakeEditor | null = null;

interface FakeEditor {
  state: {
    doc: {
      descendants(fn: (node: unknown, pos: number) => void): void;
      textBetween(from: number, to: number, blockSep?: string, leafText?: string): string;
    };
    selection: { from: number; to: number; empty: boolean };
  };
  on(evt: string, cb: () => void): void;
  off(evt: string, cb: () => void): void;
  commands: { focus(): void };
  chain(): unknown;
  view: { domAtPos(): { node: Node } };
}

const TEXT = 'the cache expired for every key at once and the origin took the load';

function makeEditor(): FakeEditor {
  // Every chain method returns the chain, so the find bar can build one
  // without the test caring what it built.
  const chain: Record<string, unknown> = new Proxy({}, { get: () => () => chain });
  return {
    state: {
      doc: {
        descendants: (fn) => { fn({ type: { name: 'paragraph' }, text: TEXT, textContent: TEXT }, 1); },
        textBetween: (from, to) => TEXT.slice(from, to),
      },
      selection: { from: 0, to: 0, empty: true },
    },
    on: (evt, cb) => { (listeners[evt] ??= []).push(cb); },
    off: (evt, cb) => { listeners[evt] = (listeners[evt] ?? []).filter((c) => c !== cb); },
    commands: { focus: () => {} },
    chain: () => chain,
    view: { domAtPos: () => ({ node: document.createElement('div') }) },
  };
}

function emit(evt: string) {
  act(() => { (listeners[evt] ?? []).forEach((cb) => cb()); });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).__makeCanvasChromeEditor = makeEditor;

vi.mock('../TiptapEditor', () => ({
  default: ({ onEditorReady }: { onEditorReady?: (e: unknown) => void }) => {
    // Fires ONCE — see the sibling suite: the view passes an inline arrow, so
    // a dep on `onEditorReady` re-fires forever.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      liveEditor = (globalThis as any).__makeCanvasChromeEditor();
      onEditorReady?.(liveEditor);
    }, []);
    return <div data-testid="tiptap-stub" />;
  },
}));

// The real toolbar drives a real ProseMirror editor; what these tests need is
// only that it OCCUPIES the chrome row, so the find bar's relationship to it
// is assertable.
vi.mock('../DocumentToolbar', () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).__canvasToolbarProps = props;
    return <div data-testid="toolbar-stub">toolbar</div>;
  },
}));

function renderView(overrides: Partial<React.ComponentProps<typeof CanvasDocumentView>> = {}) {
  const ydoc = new Y.Doc();
  return render(
    <CanvasDocumentView
      isCanvas
      body={ydoc.getXmlFragment('body')}
      ydoc={ydoc}
      provider={null}
      user={{ name: 'Hank', color: '#2563eb' }}
      extensions={[]}
      editable
      {...overrides}
    />,
  );
}

beforeEach(() => { listeners = {}; liveEditor = null; window.localStorage.clear(); });
afterEach(cleanup);

describe('CanvasDocumentView — renderFrame', () => {
  it('default: toolbar and ruler live inside the workspace scroller', () => {
    renderView();
    const workspace = screen.getByTestId('canvas-document-workspace');
    expect(workspace).toContainElement(screen.getByTestId('canvas-document-toolbar'));
    expect(workspace).toContainElement(screen.getByTestId('canvas-document-ruler-row'));
    expect(screen.getByTestId('canvas-document-toolbar').className).toContain('sticky');
  });

  it('framed: hands toolbar, ruler and surface to the host and keeps them out of the workspace', () => {
    let seen: CanvasDocumentFrame | null = null;
    renderView({
      renderFrame: (frame) => {
        seen = frame;
        return (
          <div>
            <div data-testid="slot-toolbar">{frame.toolbar}</div>
            <div data-testid="slot-ruler">{frame.ruler}</div>
            <div data-testid="slot-body">{frame.surface}</div>
          </div>
        );
      },
    });
    const workspace = screen.getByTestId('canvas-document-workspace');
    expect(screen.getByTestId('slot-toolbar')).toContainElement(screen.getByTestId('canvas-document-toolbar'));
    expect(screen.getByTestId('slot-ruler')).toContainElement(screen.getByTestId('canvas-document-ruler-row'));
    expect(screen.getByTestId('slot-body')).toContainElement(workspace);
    expect(workspace).not.toContainElement(screen.getByTestId('canvas-document-toolbar'));
    expect(workspace).not.toContainElement(screen.getByTestId('canvas-document-ruler-row'));
    expect(screen.getByTestId('canvas-document-toolbar').className).not.toContain('sticky');
    expect(seen).not.toBeNull();
  });

  it('framed: find opens inside the slotted toolbar', () => {
    renderView({ renderFrame: (f) => <><div data-testid="slot-toolbar">{f.toolbar}</div>{f.surface}</> });
    fireEvent.keyDown(screen.getByTestId('canvas-document-workspace'), { key: 'f', metaKey: true });
    expect(screen.getByTestId('slot-toolbar')).toContainElement(screen.getByTestId('canvas-document-find'));
  });

  it('framed: toolbar is null when read-only and ruler is null when off', () => {
    let frame: CanvasDocumentFrame | null = null;
    renderView({ editable: false, showRuler: false, renderFrame: (f) => { frame = f; return f.surface; } });
    expect(frame!.toolbar).toBeNull();
    expect(frame!.ruler).toBeNull();
    expect(screen.queryByTestId('canvas-document-toolbar')).toBeNull();
  });
});
