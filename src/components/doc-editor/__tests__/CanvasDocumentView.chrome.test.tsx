// The chrome around the sheet: find, zoom and the status bar.
//
// Separate from CanvasDocumentView.test.tsx because these need an editor that
// can actually be asked questions — a selection, a `textBetween`, and event
// subscriptions — while that file's stub is deliberately an inert `{stub:true}`
// so its assertions can only be about the page's own state machine.

import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useEffect } from 'react';
import * as Y from 'yjs';
import CanvasDocumentView, { ZOOM_STORAGE_KEY, readStoredZoom } from '../CanvasDocumentView';

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
  default: () => <div data-testid="toolbar-stub">toolbar</div>,
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
      {...overrides}
    />,
  );
}

beforeEach(() => {
  listeners = {};
  liveEditor = null;
  window.localStorage.clear();
});
afterEach(cleanup);

function openFind() {
  fireEvent.keyDown(screen.getByTestId('canvas-document-workspace'), { key: 'f', metaKey: true });
}

describe('CanvasDocumentView — find does not take the toolbar away', () => {
  // The regression this suite exists for. Find had its own `sticky top-0 z-20`
  // block above the toolbar's `sticky top-0 z-10`; two elements claiming the
  // same offset in one scrollport do not stack, they collide, and the higher
  // z-index wins. Measured in the browser at scrollTop 300: both occupied
  // y=40..81 and the toolbar was gone from the screen entirely — while a
  // search is very often the step BEFORE a formatting change.
  it('puts find inside the toolbar chrome rather than over it', () => {
    renderView();
    openFind();
    const chrome = screen.getByTestId('canvas-document-toolbar');
    expect(chrome).toContainElement(screen.getByTestId('canvas-document-find'));
    expect(chrome).toContainElement(screen.getByTestId('toolbar-stub'));
  });

  // One sticky offset, one element. A second `sticky top-0` anywhere in the
  // chrome is the bug coming back.
  it('leaves exactly one element stuck to the top of the workspace', () => {
    renderView();
    openFind();
    const workspace = screen.getByTestId('canvas-document-workspace');
    const stuckToTop = [...workspace.querySelectorAll<HTMLElement>('*')]
      .filter((el) => el.className.includes?.('sticky') && el.className.includes('top-0'));
    expect(stuckToTop).toHaveLength(1);
    expect(stuckToTop[0]).toBe(screen.getByTestId('canvas-document-toolbar'));
  });

  // In flow, not floated — which is what guarantees it cannot sit across the
  // page's first line. The find row is a sibling ABOVE the sheet, so the sheet
  // moves down by its height instead of being covered by it.
  it('reserves a row for find instead of overlaying the page', () => {
    renderView();
    openFind();
    const row = screen.getByTestId('canvas-document-find-row');
    expect(row.className).not.toMatch(/absolute|fixed/);
    const paper = screen.getByTestId('canvas-document-paper');
    // DOCUMENT_POSITION_FOLLOWING: the sheet comes after the find row.
    expect(row.compareDocumentPosition(paper) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('opens on Cmd/Ctrl+F and closes on Escape', () => {
    renderView();
    expect(screen.queryByTestId('canvas-document-find')).toBeNull();
    openFind();
    expect(screen.getByTestId('canvas-document-find')).toBeInTheDocument();
    fireEvent.keyDown(screen.getByTestId('canvas-document-find-query'), { key: 'Escape' });
    expect(screen.queryByTestId('canvas-document-find')).toBeNull();
  });

  // A second Cmd+F used to be a dead keystroke: the bar was already open, so
  // nothing changed, and the browser's own find had been suppressed — the
  // worst of both.
  it('brings focus back to the query on a repeat Cmd/Ctrl+F', () => {
    renderView();
    openFind();
    const query = screen.getByTestId('canvas-document-find-query') as HTMLInputElement;
    fireEvent.change(query, { target: { value: 'cache' } });
    (document.activeElement as HTMLElement | null)?.blur();
    expect(document.activeElement).not.toBe(query);

    openFind();
    expect(document.activeElement).toBe(query);
    // Selected, so the next keystroke starts a new search rather than
    // appending to the last one.
    expect(query.selectionStart).toBe(0);
    expect(query.selectionEnd).toBe('cache'.length);
  });

  it('offers no find at all on a read-only document', () => {
    renderView({ editable: false });
    openFind();
    expect(screen.queryByTestId('canvas-document-find')).toBeNull();
  });
});

describe('CanvasDocumentView — zoom is a reader preference, so it is remembered', () => {
  it('reads back a stored scale on mount', () => {
    window.localStorage.setItem(ZOOM_STORAGE_KEY, '1.25');
    renderView();
    const select = screen.getByTestId('canvas-document-status-bar-zoom') as HTMLSelectElement;
    expect(select.value).toBe('1.25');
    expect(screen.getByTestId('canvas-document-paper').style.zoom).toBe('1.25');
  });

  it('writes the scale the reader picks', () => {
    renderView();
    fireEvent.change(screen.getByTestId('canvas-document-status-bar-zoom'), { target: { value: '1.5' } });
    expect(window.localStorage.getItem(ZOOM_STORAGE_KEY)).toBe('1.5');
    expect(screen.getByTestId('canvas-document-paper').style.zoom).toBe('1.5');
  });

  // localStorage is a string store anything on the origin can write, and the
  // value goes straight into a CSS `zoom`. A 40x page is not recoverable from
  // inside the page — the control that would fix it is at the bottom of a
  // workspace that no longer fits the screen.
  it.each(['nonsense', '', '0', '-2', '99', 'NaN'])('ignores a junk stored scale (%s)', (raw) => {
    window.localStorage.setItem(ZOOM_STORAGE_KEY, raw);
    expect(readStoredZoom()).toBe(1);
  });

  it('accepts a stored scale outside the presets', () => {
    window.localStorage.setItem(ZOOM_STORAGE_KEY, '1.1');
    expect(readStoredZoom()).toBe(1.1);
  });
});

describe('CanvasDocumentView — the ruler is honest, so it is on', () => {
  it('shows a ruler without being asked', () => {
    renderView();
    expect(screen.getByTestId('document-ruler')).toBeInTheDocument();
  });

  it('still lets a host with no room for it opt out', () => {
    renderView({ showRuler: false });
    expect(screen.queryByTestId('document-ruler')).toBeNull();
  });

  // The integration the unit tests cannot cover: the VIEW has to hand the
  // ruler document pixels and the scale separately. It used to pre-multiply
  // the margins by zoom and pass the measured (already scaled) width, which
  // left the tick grid counting screen pixels while the labels counted inches.
  it.each([0.5, 1, 1.5])('reads the same ruler at %s zoom', (zoom) => {
    window.localStorage.setItem(ZOOM_STORAGE_KEY, String(zoom));
    renderView();
    expect(screen.getByTestId('document-ruler-track')).toHaveStyle({ width: `${816 * zoom}px` });
    expect(screen.getAllByTestId('document-ruler-label').map((e) => e.textContent))
      .toEqual(['1', '1', '2', '3', '4', '5', '6', '7']);
    // One document inch of margin, drawn at the scale the sheet is drawn at —
    // the sheet's own padding is `96px` inside a CSS `zoom`, so the two agree.
    expect((screen.getAllByTestId('document-ruler-margin-marker')[0] as HTMLElement).style.left)
      .toBe(`${96 * zoom}px`);
  });
});

describe('CanvasDocumentView — the status bar counts the selection too', () => {
  it('reports nothing extra while the caret is collapsed', () => {
    renderView();
    expect(screen.getByTestId('canvas-document-status-bar-word-count')).toBeInTheDocument();
    expect(screen.queryByTestId('canvas-document-selected-word-count')).toBeNull();
  });

  // Anyone writing to a length selects the part they are working on and asks
  // how long THAT is. The document total cannot answer it.
  it('reports the selection once there is one', () => {
    renderView();
    liveEditor!.state.selection = { from: 0, to: 20, empty: false };
    emit('selectionUpdate');
    // 'the cache expired fo' — the trailing partial word still counts as one,
    // the same way a word processor counts a partial selection.
    expect(screen.getByTestId('canvas-document-selected-word-count').textContent).toBe('4 selected');
  });

  // A selection changes without the document changing, so an `update`-only
  // subscription would report a count that refreshed only when you typed.
  it('clears the selection count when the selection collapses', () => {
    renderView();
    liveEditor!.state.selection = { from: 0, to: 20, empty: false };
    emit('selectionUpdate');
    expect(screen.getByTestId('canvas-document-selected-word-count')).toBeInTheDocument();

    liveEditor!.state.selection = { from: 5, to: 5, empty: true };
    emit('selectionUpdate');
    expect(screen.queryByTestId('canvas-document-selected-word-count')).toBeNull();
  });
});
