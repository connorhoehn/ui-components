import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import { createRef } from 'react';
import * as Y from 'yjs';
import { Awareness, applyAwarenessUpdate, encodeAwarenessUpdate } from 'y-protocols/awareness';
import { language as languageFacet } from '@codemirror/language';
import { CodePad, type CodePadHandle, type CodePadEdit, type CodePadPaste } from '../index';

// jsdom has no layout: CodeMirror's measure pass asks a Range for its rects.
beforeAll(() => {
  const empty = () => Object.assign([], { item: () => null }) as unknown as DOMRectList;
  if (!Range.prototype.getClientRects) Range.prototype.getClientRects = empty;
  if (!Range.prototype.getBoundingClientRect) {
    Range.prototype.getBoundingClientRect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  }
});

afterEach(() => cleanup());

/**
 * Two documents joined by a wire that can be held: updates queue while held
 * and are delivered on flush, so both sides can type "at the same time".
 */
function pair() {
  const a = new Y.Doc();
  const b = new Y.Doc();
  const awA = new Awareness(a);
  const awB = new Awareness(b);
  let held = false;
  const queue: Array<() => void> = [];
  const send = (fn: () => void) => (held ? queue.push(fn) : fn());
  a.on('update', (u: Uint8Array, origin: unknown) => origin !== 'wire' && send(() => Y.applyUpdate(b, u, 'wire')));
  b.on('update', (u: Uint8Array, origin: unknown) => origin !== 'wire' && send(() => Y.applyUpdate(a, u, 'wire')));
  const relay = (from: Awareness, to: Awareness) =>
    from.on('update', ({ added, updated, removed }: { added: number[]; updated: number[]; removed: number[] }, origin: unknown) => {
      if (origin === 'wire') return;
      const changed = [...added, ...updated, ...removed];
      applyAwarenessUpdate(to, encodeAwarenessUpdate(from, changed), 'wire');
    });
  relay(awA, awB);
  relay(awB, awA);
  return {
    a,
    b,
    awA,
    awB,
    hold: () => (held = true),
    flush: () => {
      held = false;
      while (queue.length) queue.shift()!();
    },
    destroy: () => {
      awA.destroy();
      awB.destroy();
    },
  };
}

function type(view: NonNullable<CodePadHandle['view']>, at: number, text: string) {
  act(() => view.dispatch({ changes: { from: at, insert: text }, selection: { anchor: at + text.length }, userEvent: 'input.type' }));
}

function paste(view: NonNullable<CodePadHandle['view']>, text: string) {
  const ev = new Event('paste', { bubbles: true, cancelable: true });
  Object.defineProperty(ev, 'clipboardData', { value: { getData: (t: string) => (t === 'text/plain' ? text : '') } });
  act(() => {
    view.contentDOM.dispatchEvent(ev);
  });
}

describe('CodePad, shared', () => {
  it('two clients on two documents converge after both type', () => {
    const w = pair();
    const refA = createRef<CodePadHandle>();
    const refB = createRef<CodePadHandle>();
    render(
      <>
        <CodePad ref={refA} ydoc={w.a} provider={{ awareness: w.awA }} user={{ name: 'Ada', color: '#2563eb' }} />
        <CodePad ref={refB} ydoc={w.b} provider={{ awareness: w.awB }} user={{ name: 'Grace', color: '#16a34a' }} />
      </>,
    );
    const viewA = refA.current!.view!;
    const viewB = refB.current!.view!;

    type(viewA, 0, 'def solve():\n    return 1\n');
    expect(refB.current!.getText()).toBe('def solve():\n    return 1\n');

    // Both type before either hears the other.
    w.hold();
    type(viewA, 0, '# Ada\n');
    type(viewB, viewB.state.doc.length, 'print(solve())\n');
    expect(refA.current!.getText()).not.toBe(refB.current!.getText());
    act(() => w.flush());

    const a = refA.current!.getText();
    expect(a).toBe(refB.current!.getText());
    expect(a).toBe(w.a.getText('code').toString());
    expect(a).toContain('# Ada\n');
    expect(a).toContain('print(solve())\n');
    w.destroy();
  });

  it("draws another person's caret with their name", () => {
    const w = pair();
    const refA = createRef<CodePadHandle>();
    const { container } = render(
      <>
        <CodePad ref={refA} ydoc={w.a} provider={{ awareness: w.awA }} user={{ name: 'Ada', color: '#2563eb' }} />
        <CodePad ydoc={w.b} provider={{ awareness: w.awB }} user={{ name: 'Grace Hopper', color: '#16a34a' }} />
      </>,
    );
    type(refA.current!.view!, 0, 'x = 1\ny = 2\n');
    // The pad wrote this person's name into awareness; place Grace's caret.
    expect((w.awB.getLocalState()?.user as { name: string }).name).toBe('Grace Hopper');
    const textB = w.b.getText('code');
    act(() =>
      w.awB.setLocalStateField('cursor', {
        anchor: Y.createRelativePositionFromTypeIndex(textB, 6),
        head: Y.createRelativePositionFromTypeIndex(textB, 6),
      }),
    );
    const padA = container.querySelectorAll('[data-testid="code-pad"]')[0]!;
    const labels = [...padA.querySelectorAll('.cm-ySelectionInfo')].map((n) => n.textContent);
    expect(labels).toEqual(['Grace Hopper']);
    // Its own caret is not drawn as a remote one.
    expect(labels).not.toContain('Ada');
    w.destroy();
  });

  it('reports local edits but not remote ones', () => {
    const w = pair();
    const refA = createRef<CodePadHandle>();
    const refB = createRef<CodePadHandle>();
    const edits: CodePadEdit[] = [];
    render(
      <>
        <CodePad ref={refA} ydoc={w.a} provider={{ awareness: w.awA }} onLocalEdit={(e) => edits.push(e)} />
        <CodePad ref={refB} ydoc={w.b} provider={{ awareness: w.awB }} />
      </>,
    );
    type(refA.current!.view!, 0, 'abc');
    type(refB.current!.view!, 3, 'def');
    expect(refA.current!.getText()).toBe('abcdef');
    expect(edits.map((e) => [e.kind, e.inserted, e.from])).toEqual([['type', 3, 0]]);
    w.destroy();
  });

  it("a read-only pad still shows other people's typing", () => {
    const w = pair();
    const refA = createRef<CodePadHandle>();
    const refB = createRef<CodePadHandle>();
    render(
      <>
        <CodePad ref={refA} ydoc={w.a} provider={{ awareness: w.awA }} readOnly />
        <CodePad ref={refB} ydoc={w.b} provider={{ awareness: w.awB }} />
      </>,
    );
    type(refB.current!.view!, 0, 'shared');
    expect(refA.current!.getText()).toBe('shared');
    type(refA.current!.view!, 0, 'nope');
    expect(refA.current!.getText()).toBe('shared');
    expect(refB.current!.getText()).toBe('shared');
    w.destroy();
  });
});

describe('CodePad, local', () => {
  it('switches language without losing the text', () => {
    const ref = createRef<CodePadHandle>();
    const { rerender, getByTestId } = render(<CodePad ref={ref} language="python" defaultValue={'print("hi")\n'} />);
    const view = ref.current!.view!;
    expect(view.state.facet(languageFacet)?.name).toBe('python');
    for (const [lang, name] of [['go', 'go'], ['swift', 'swift'], ['typescript', 'typescript'], ['cpp', 'cpp'], ['java', 'java'], ['javascript', 'javascript']] as const) {
      rerender(<CodePad ref={ref} language={lang} defaultValue={'print("hi")\n'} />);
      expect(ref.current!.view).toBe(view);
      expect(view.state.facet(languageFacet)?.name).toBe(name);
      expect(getByTestId('code-pad').getAttribute('data-language')).toBe(lang);
      expect(ref.current!.getText()).toBe('print("hi")\n');
    }
  });

  it('read-only refuses typing, pasting and deleting', () => {
    const ref = createRef<CodePadHandle>();
    const onLocalEdit = vi.fn();
    render(<CodePad ref={ref} readOnly defaultValue="x = 1" onLocalEdit={onLocalEdit} />);
    const view = ref.current!.view!;
    expect(view.contentDOM.getAttribute('contenteditable')).toBe('false');
    expect(view.contentDOM.getAttribute('aria-readonly')).toBe('true');
    type(view, 0, 'y');
    paste(view, 'import os\n');
    act(() => view.dispatch({ changes: { from: 0, to: 1 }, userEvent: 'delete.backward' }));
    expect(ref.current!.getText()).toBe('x = 1');
    expect(onLocalEdit).not.toHaveBeenCalled();
  });

  it('becomes editable again when read-only is lifted', () => {
    const ref = createRef<CodePadHandle>();
    const { rerender } = render(<CodePad ref={ref} readOnly defaultValue="a" />);
    rerender(<CodePad ref={ref} defaultValue="a" />);
    type(ref.current!.view!, 1, 'b');
    expect(ref.current!.getText()).toBe('ab');
  });

  it('a paste reports its size and when', () => {
    const ref = createRef<CodePadHandle>();
    const pastes: CodePadPaste[] = [];
    const edits: CodePadEdit[] = [];
    render(<CodePad ref={ref} onPaste={(p) => pastes.push(p)} onLocalEdit={(e) => edits.push(e)} />);
    const before = Date.now();
    paste(ref.current!.view!, 'for i in range(3):\n    print(i)\n');
    expect(ref.current!.getText()).toBe('for i in range(3):\n    print(i)\n');
    expect(pastes).toHaveLength(1);
    expect(pastes[0]).toMatchObject({ characters: 32, lines: 3, from: 0, via: 'paste' });
    expect(pastes[0]!.at).toBeGreaterThanOrEqual(before);
    expect(pastes[0]!.at).toBeLessThanOrEqual(Date.now());
    expect(edits.map((e) => e.kind)).toEqual(['paste']);
    // Typing is not a paste.
    type(ref.current!.view!, 0, '#');
    expect(pastes).toHaveLength(1);
  });

  it('insertText puts text at the caret and reports it as an insert', () => {
    const ref = createRef<CodePadHandle>();
    const edits: CodePadEdit[] = [];
    const onChange = vi.fn();
    render(<CodePad ref={ref} defaultValue="body" onLocalEdit={(e) => edits.push(e)} onChange={onChange} />);
    act(() => ref.current!.insertText('# Two sum\n', 'start'));
    expect(ref.current!.getText()).toBe('# Two sum\nbody');
    expect(edits.map((e) => [e.kind, e.inserted])).toEqual([['insert', 10]]);
    expect(onChange).toHaveBeenLastCalledWith('# Two sum\nbody');
  });

  it('follows a controlled value without reporting it as an edit', () => {
    const ref = createRef<CodePadHandle>();
    const onLocalEdit = vi.fn();
    const { rerender } = render(<CodePad ref={ref} value="one" onLocalEdit={onLocalEdit} />);
    rerender(<CodePad ref={ref} value="two" onLocalEdit={onLocalEdit} />);
    expect(ref.current!.getText()).toBe('two');
    expect(onLocalEdit).not.toHaveBeenCalled();
  });

  it('shows line numbers and names the editing area', () => {
    const ref = createRef<CodePadHandle>();
    const { container } = render(<CodePad ref={ref} defaultValue={'a\nb\nc'} aria-label="Candidate's code" />);
    expect(container.querySelector('.cm-lineNumbers')).not.toBeNull();
    expect(ref.current!.view!.contentDOM.getAttribute('aria-label')).toBe("Candidate's code");
  });
});
