import { render, screen, fireEvent, createEvent, cleanup, act } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DocumentToolbar from '../DocumentToolbar';

/**
 * A stand-in for the Tiptap editor.
 *
 * Records the chain calls instead of driving a real ProseMirror view: this
 * file is testing WHICH command each control issues, and a real editor would
 * make a wrong-command bug look like a rendering bug.
 */
/**
 * @param optional command names to expose, simulating extra extensions being
 *   registered (highlight, text-align). Absent by default, which is the
 *   StarterKit-only baseline.
 */
function makeEditor(active: Record<string, unknown> = {}, optional: string[] = []) {
  const calls: string[] = [];
  const chain: Record<string, unknown> = {};
  for (const m of [
    'focus', 'toggleBold', 'toggleItalic', 'toggleStrike', 'toggleCode',
    'toggleBulletList', 'toggleOrderedList', 'toggleTaskList',
    'toggleBlockquote', 'setParagraph', 'setHorizontalRule',
  ]) {
    chain[m] = (...args: unknown[]) => { calls.push(args.length ? `${m}:${JSON.stringify(args)}` : m); return chain; };
  }
  chain['setNode'] = (name: string, attrs?: Record<string, unknown>) => {
    calls.push(attrs ? `setNode:${name}:${JSON.stringify(attrs)}` : `setNode:${name}`);
    return chain;
  };
  for (const m of optional) {
    chain[m] = (...args: unknown[]) => { calls.push(args.length ? `${m}:${JSON.stringify(args)}` : m); return chain; };
  }
  chain['run'] = () => { calls.push('run'); return true; };

  // `useEditorState` subscribes via on/off, so the stand-in has to emit —
  // otherwise the toolbar can never observe the cursor moving, which is the
  // exact bug these tests exist to prevent.
  const listeners = new Set<() => void>();
  const state: Record<string, unknown> = { ...active };

  // `commands` is what the toolbar feature-detects against.
  const commands: Record<string, unknown> = {};
  for (const m of optional) commands[m] = () => true;

  const editor = {
    commands,
    chain: () => chain,
    // The link popover reads the current href to prefill itself when editing
    // an existing link.
    getAttributes: (name: string) => {
      if (name === 'link') return { href: state['linkHref'] ?? '' };
      // The line-spacing menu reads the caret's paragraph attributes.
      if (name === 'paragraph') return { lineSpacing: state['lineSpacing'] };
      return {};
    },
    isActive: (name: string, attrs?: Record<string, unknown>) => {
      const key = attrs ? `${name}:${JSON.stringify(attrs)}` : name;
      return Boolean(state[key]);
    },
    on: (_evt: string, cb: () => void) => { listeners.add(cb); return editor; },
    off: (_evt: string, cb: () => void) => { listeners.delete(cb); return editor; },
  };

  /** Moves the cursor: swap what is active, then fire a transaction. */
  const moveCursor = (next: Record<string, unknown>) => {
    for (const k of Object.keys(state)) delete state[k];
    Object.assign(state, next);
    for (const cb of listeners) cb();
  };

  return { editor: editor as never, calls, moveCursor };
}

afterEach(cleanup);

describe('DocumentToolbar', () => {
  it('renders nothing until the editor exists', () => {
    const { container } = render(<DocumentToolbar editor={null} />);
    expect(container.textContent).toBe('');
  });

  /**
   * Group boundaries.
   *
   * The bar holds roughly thirty controls, and without visible boundaries it
   * reads as one undifferentiated run — which is exactly what it did while the
   * dividers were painted in `bg-border` (#e2e8f0) on `bg-surface-panel`
   * (#f8fafc), a step too small to see. These assert the STRUCTURE, not the
   * paint: that boundaries exist, that no group is empty, and that the two
   * regroupings below stay put.
   */
  describe('group boundaries', () => {
    const dividers = (el: HTMLElement) => Array.from(el.querySelectorAll('[data-divider]'));

    it('separates the controls into groups', () => {
      const { editor } = makeEditor();
      render(<DocumentToolbar editor={editor} />);
      // undo/redo │ block │ marks │ lists │ insert │ clear-formatting
      expect(dividers(screen.getByTestId('document-toolbar')).length).toBeGreaterThanOrEqual(4);
    });

    // A divider with nothing after it is a line pointing at empty space, and
    // this toolbar renders half its groups conditionally on the host's
    // extension set — so every boundary has to be gated on the group it opens.
    it('never leaves a dangling divider', () => {
      const { editor } = makeEditor();
      const { container } = render(<DocumentToolbar editor={editor} />);
      const bar = screen.getByTestId('document-toolbar');
      for (const d of dividers(bar)) {
        expect(d.nextElementSibling).not.toBeNull();
        expect(d.nextElementSibling?.hasAttribute('data-divider')).toBe(false);
      }
      expect(container).toBeTruthy();
    });

    // Ink, highlight paint and the highlight toggle are one question about the
    // same text. The toggle used to stand behind its own divider while the two
    // palettes had none in front of them at all.
    it('keeps the colour controls in one group', () => {
      const { editor } = makeEditor({}, [
        'setColor', 'unsetColor', 'setBackgroundColor', 'unsetBackgroundColor', 'toggleHighlight',
      ]);
      render(<DocumentToolbar editor={editor} />);
      const color = screen.getByTestId('document-toolbar-color');
      const highlight = screen.getByTestId('document-toolbar-highlight');
      const between = dividers(screen.getByTestId('document-toolbar')).filter(
        (d) =>
          color.compareDocumentPosition(d) & Node.DOCUMENT_POSITION_FOLLOWING &&
          highlight.compareDocumentPosition(d) & Node.DOCUMENT_POSITION_PRECEDING,
      );
      expect(between).toHaveLength(0);
    });

    // Clear formatting is destructive and used to sit between the link and the
    // horizontal rule, in the middle of the additive insert group.
    it('puts clear formatting last, behind its own boundary', () => {
      const { editor } = makeEditor({}, ['unsetAllMarks', 'clearNodes']);
      render(<DocumentToolbar editor={editor} />);
      const clear = screen.getByTestId('document-toolbar-clear-formatting');
      const hr = screen.getByTestId('document-toolbar-hr');
      expect(hr.compareDocumentPosition(clear) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(clear.previousElementSibling?.hasAttribute('data-divider')).toBe(true);
    });
  });

  it('is exposed as a toolbar to assistive tech', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    expect(screen.getByRole('toolbar', { name: 'Document formatting' })).toBeInTheDocument();
  });

  // The block-type select is the half that makes this Confluence-shaped
  // rather than a row of toggles: it can show what the cursor is IN.
  it('reflects the current block in the style select', () => {
    const { editor } = makeEditor({ 'heading:{"level":2}': true });
    render(<DocumentToolbar editor={editor} />);
    expect(screen.getByTestId('document-toolbar-block')).toHaveValue('heading2');
  });

  it('falls back to Normal text outside any special block', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    expect(screen.getByTestId('document-toolbar-block')).toHaveValue('paragraph');
  });

  it.each([
    ['heading1', 'setNode:heading:[{"level":1}]'.replace('[', '').replace(']', '')],
    ['heading2', 'setNode:heading:{"level":2}'],
    ['heading3', 'setNode:heading:{"level":3}'],
  ])('applies %s via setNode', (value, expected) => {
    const { editor, calls } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    fireEvent.change(screen.getByTestId('document-toolbar-block'), { target: { value } });
    expect(calls.join('|')).toContain(expected);
  });

  // A quote CONTAINS blocks rather than being one. setNode would replace the
  // paragraph instead of wrapping it, which silently loses the text.
  it('wraps for a quote instead of replacing the node', () => {
    const { editor, calls } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    fireEvent.change(screen.getByTestId('document-toolbar-block'), { target: { value: 'blockquote' } });
    expect(calls).toContain('toggleBlockquote');
    expect(calls.join('|')).not.toContain('setNode:blockquote');
  });

  it.each([
    ['bold', 'toggleBold'],
    ['italic', 'toggleItalic'],
    ['strike', 'toggleStrike'],
    ['code', 'toggleCode'],
    ['bulletList', 'toggleBulletList'],
    ['orderedList', 'toggleOrderedList'],
    ['taskList', 'toggleTaskList'],
  ])('%s issues %s', (key, cmd) => {
    const { editor, calls } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    fireEvent.mouseDown(screen.getByTestId(`document-toolbar-${key}`));
    expect(calls).toContain(cmd);
    expect(calls).toContain('run');
  });

  it('conveys toggle state via aria-pressed, not colour alone', () => {
    const { editor } = makeEditor({ bold: true });
    render(<DocumentToolbar editor={editor} />);
    expect(screen.getByTestId('document-toolbar-bold')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('document-toolbar-italic')).toHaveAttribute('aria-pressed', 'false');
  });

  // Markdown stays the native input path; the toolbar is the discoverable
  // surface over the same commands. Naming the shortcut is how a user learns
  // they never needed the button.
  it('names the markdown equivalent in each tooltip', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    expect(screen.getByTestId('document-toolbar-bold')).toHaveAttribute('title', expect.stringContaining('**'));
    expect(screen.getByTestId('document-toolbar-bulletList')).toHaveAttribute('title', expect.stringContaining('- '));
    expect(screen.getByTestId('document-toolbar-taskList')).toHaveAttribute('title', expect.stringContaining('- [ ]'));
  });

  // mouseDown, not click, FOR THE MOUSE: a click would blur the editor first
  // and collapse the selection the command is supposed to act on.
  //
  // This test used to assert `fireEvent.click(...)` produced NOTHING, and that
  // assertion was the defect written down as an invariant. jsdom's bare
  // `click` carries `detail: 0`, which is exactly the shape of a click the
  // browser synthesises from Enter or Space on a focused button — so what the
  // old test pinned was "the keyboard does not work here", and it did not:
  // measured on a live document, bold stayed off through Enter and through
  // Space and came on only with a real mouse click. The invariant that
  // actually matters is the one below: the mouse path still goes through
  // mousedown, and it runs the command once, not twice.
  it('acts on mouseDown so the selection survives, and runs once per mouse click', () => {
    const { editor, calls } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    const bold = screen.getByTestId('document-toolbar-bold');

    const down = createEvent.mouseDown(bold);
    fireEvent(bold, down);
    expect(down.defaultPrevented).toBe(true);
    expect(calls).toContain('toggleBold');

    // The click the browser sends after that mousedown must not repeat it.
    fireEvent.click(bold, { detail: 1 });
    expect(calls.filter((c) => c === 'toggleBold')).toHaveLength(1);
  });

  // The regression this file exists for. Reading editor.isActive() inline
  // during render LOOKS correct and never updates: nothing re-renders when the
  // selection moves, so B stayed dark after the caret entered bold text and
  // the block dropdown never followed the cursor. The toolbar must subscribe.
  it('tracks the cursor — marks update when the selection moves', async () => {
    const { editor, moveCursor } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    expect(screen.getByTestId('document-toolbar-bold')).toHaveAttribute('aria-pressed', 'false');

    await act(async () => { moveCursor({ bold: true }); });
    expect(screen.getByTestId('document-toolbar-bold')).toHaveAttribute('aria-pressed', 'true');

    await act(async () => { moveCursor({}); });
    expect(screen.getByTestId('document-toolbar-bold')).toHaveAttribute('aria-pressed', 'false');
  });

  it('tracks the cursor — the block select follows the caret', async () => {
    const { editor, moveCursor } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    expect(screen.getByTestId('document-toolbar-block')).toHaveValue('paragraph');

    await act(async () => { moveCursor({ 'heading:{"level":3}': true }); });
    expect(screen.getByTestId('document-toolbar-block')).toHaveValue('heading3');
  });

  // Highlight and text-align are not in StarterKit. Rather than adding two
  // dependencies to the library for buttons most pages do not want, the
  // toolbar detects them — so a consumer that registers the extension gets
  // the control, and one that does not never sees a dead button.
  it('hides highlight and align when those extensions are absent', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    expect(screen.queryByTestId('document-toolbar-highlight')).toBeNull();
    expect(screen.queryByTestId('document-toolbar-align-left')).toBeNull();
  });

  it('shows highlight once its extension is registered', () => {
    const { editor, calls } = makeEditor({}, ['toggleHighlight']);
    render(<DocumentToolbar editor={editor} />);
    fireEvent.mouseDown(screen.getByTestId('document-toolbar-highlight'));
    expect(calls).toContain('toggleHighlight');
  });

  // Typeface and size, the two controls a word processor has that a rich-text
  // widget does not. Absent unless the editor registers the commands: this
  // toolbar is shared with pages that build a smaller extension set, and a
  // control that cannot act is worse than an absent one.
  it('hides the font controls when the editor cannot set fonts', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    expect(screen.queryByTestId('document-toolbar-font-family')).toBeNull();
    expect(screen.queryByTestId('document-toolbar-font-size')).toBeNull();
  });

  it('sets a typeface, and clears it back to the page default', () => {
    const { editor, calls } = makeEditor({}, ['setFontFamily', 'unsetFontFamily']);
    render(<DocumentToolbar editor={editor} />);
    const picker = screen.getByTestId('document-toolbar-font-family');

    fireEvent.change(picker, { target: { value: 'Georgia, "Times New Roman", serif' } });
    expect(calls.join('|')).toContain('setFontFamily:["Georgia, \\"Times New Roman\\", serif"]');

    // "Default" is the ABSENCE of a choice — it must unset, or a document
    // could never get back to its own typography.
    fireEvent.change(picker, { target: { value: '' } });
    expect(calls.join('|')).toContain('unsetFontFamily');
  });

  it('sets a size in points, and clears it', () => {
    const { editor, calls } = makeEditor({}, ['setFontSize', 'unsetFontSize']);
    render(<DocumentToolbar editor={editor} />);
    const picker = screen.getByTestId('document-toolbar-font-size');

    fireEvent.change(picker, { target: { value: '18pt' } });
    expect(calls.join('|')).toContain('setFontSize:["18pt"]');

    fireEvent.change(picker, { target: { value: '' } });
    expect(calls.join('|')).toContain('unsetFontSize');
  });

  it('hides the colour controls when the editor cannot set colours', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    expect(screen.queryByTestId('document-toolbar-color')).toBeNull();
    expect(screen.queryByTestId('document-toolbar-highlight-color')).toBeNull();
  });

  it('paints text a colour, and clears it back to the page ink', () => {
    const { editor, calls } = makeEditor({}, ['setColor', 'unsetColor']);
    render(<DocumentToolbar editor={editor} />);

    // Closed, the palette is not occupying the bar.
    expect(screen.queryByTestId('document-toolbar-color-menu')).toBeNull();

    fireEvent.mouseDown(screen.getByTestId('document-toolbar-color'));
    fireEvent.mouseDown(screen.getByTestId('document-toolbar-color-red'));
    expect(calls.join('|')).toContain('setColor:["#c5221f"]');
    // Picking closes it — a colour is a choice, not a palette you keep open.
    expect(screen.queryByTestId('document-toolbar-color-menu')).toBeNull();

    // "None" is a STATE, not a colour: it unsets, so the text goes back to the
    // page's own ink rather than to some other explicit black.
    fireEvent.mouseDown(screen.getByTestId('document-toolbar-color'));
    fireEvent.mouseDown(screen.getByTestId('document-toolbar-color-none'));
    expect(calls.join('|')).toContain('unsetColor');
  });

  it('highlights with a background colour', () => {
    const { editor, calls } = makeEditor({}, ['setBackgroundColor', 'unsetBackgroundColor']);
    render(<DocumentToolbar editor={editor} />);
    // A JSX string attribute is a LITERAL — no escape processing — so a glyph
    // written as glyph="\u270E" rendered those six characters into the bar.
    expect(screen.getByTestId('document-toolbar-highlight-color').textContent).not.toContain('u270E');
    fireEvent.mouseDown(screen.getByTestId('document-toolbar-highlight-color'));
    fireEvent.mouseDown(screen.getByTestId('document-toolbar-highlight-color-yellow'));
    expect(calls.join('|')).toContain('setBackgroundColor:["#fff475"]');
  });

  it('closes a colour palette on Escape without painting anything', () => {
    const { editor, calls } = makeEditor({}, ['setColor', 'unsetColor']);
    render(<DocumentToolbar editor={editor} />);
    fireEvent.mouseDown(screen.getByTestId('document-toolbar-color'));
    expect(screen.getByTestId('document-toolbar-color-menu')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('document-toolbar-color-menu')).toBeNull();
    expect(calls.join('|')).not.toContain('setColor');
  });

  // One button with a caret, the way Word and Google Docs do it — not four
  // always-visible toggles. Alignment is one setting with four values.
  it('opens the align menu once text-align is registered, and applies a choice', () => {
    const { editor, calls } = makeEditor({}, ['setTextAlign']);
    render(<DocumentToolbar editor={editor} />);

    // Closed: the four options are not occupying the bar.
    expect(screen.queryByTestId('document-toolbar-align-menu')).toBeNull();
    expect(screen.queryByTestId('document-toolbar-align-center')).toBeNull();

    fireEvent.mouseDown(screen.getByTestId('document-toolbar-align'));
    expect(screen.getByTestId('document-toolbar-align-menu')).toBeInTheDocument();
    for (const a of ['left', 'center', 'right', 'justify']) {
      expect(screen.getByTestId(`document-toolbar-align-${a}`)).toBeInTheDocument();
    }

    fireEvent.mouseDown(screen.getByTestId('document-toolbar-align-center'));
    expect(calls.join('|')).toContain('setTextAlign:["center"]');
    // Picking a value closes the menu — it is a choice, not a palette.
    expect(screen.queryByTestId('document-toolbar-align-menu')).toBeNull();
  });

  it('closes the align menu on Escape without changing the alignment', () => {
    const { editor, calls } = makeEditor({}, ['setTextAlign']);
    render(<DocumentToolbar editor={editor} />);
    fireEvent.mouseDown(screen.getByTestId('document-toolbar-align'));
    expect(screen.getByTestId('document-toolbar-align-menu')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('document-toolbar-align-menu')).toBeNull();
    expect(calls.join('|')).not.toContain('setTextAlign');
  });

  it('renders caller actions at the end of the bar', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} actions={<button data-testid="extra">Insert</button>} />);
    expect(screen.getByTestId('extra')).toBeInTheDocument();
  });
});

describe('DocumentToolbar — the comment-gutter toggle', () => {
  const TOGGLE = 'document-toolbar-gutter-toggle';

  it('shows the count so a hidden gutter still announces itself', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} commentCount={3} gutterVisible={false} onToggleGutter={() => {}} />);
    const btn = screen.getByTestId(TOGGLE);
    expect(btn).toHaveTextContent('Comments');
    expect(btn).toHaveTextContent('3');
    // The reason the whole control exists: with the column gone, this word is
    // the only thing telling the reader a discussion is being withheld.
    expect(btn).toHaveTextContent('hidden');
  });

  it('carries the count in its accessible name too', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} commentCount={2} gutterVisible={false} onToggleGutter={() => {}} />);
    expect(screen.getByRole('button', { name: 'Show comments (2)' })).toBeInTheDocument();
  });

  it('calls back instead of hiding the gutter itself', () => {
    const onToggleGutter = vi.fn();
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} commentCount={1} onToggleGutter={onToggleGutter} />);
    fireEvent.click(screen.getByTestId(TOGGLE));
    expect(onToggleGutter).toHaveBeenCalledTimes(1);
  });

  it('conveys visibility via aria-pressed, not colour alone', () => {
    const { editor } = makeEditor();
    const { rerender } = render(
      <DocumentToolbar editor={editor} commentCount={1} gutterVisible onToggleGutter={() => {}} />,
    );
    expect(screen.getByTestId(TOGGLE)).toHaveAttribute('aria-pressed', 'true');
    rerender(<DocumentToolbar editor={editor} commentCount={1} gutterVisible={false} onToggleGutter={() => {}} />);
    expect(screen.getByTestId(TOGGLE)).toHaveAttribute('aria-pressed', 'false');
  });

  // Nothing to show or hide. A live button whose only effect is invisible
  // reads as broken, not as "no comments".
  it('renders no toggle when there are zero comments', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} commentCount={0} onToggleGutter={() => {}} />);
    expect(screen.queryByTestId(TOGGLE)).toBeNull();
  });

  it('renders no toggle when the host offers no handler', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} commentCount={4} />);
    expect(screen.queryByTestId(TOGGLE)).toBeNull();
  });

  // Chrome, never paper: the toolbar is themed and goes dark, so paper tokens
  // here would paint a white-on-white control in dark mode.
  it('paints the toggle from themed chrome tokens', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} commentCount={3} gutterVisible={false} onToggleGutter={() => {}} />);
    const cls = screen.getByTestId(TOGGLE).className;
    expect(cls).not.toMatch(/bg-paper|text-paper-ink/);
    expect(cls).toMatch(/bg-primary-bg/);
  });

  it('leaves the host actions their place at the far edge', () => {
    const { editor } = makeEditor();
    render(
      <DocumentToolbar
        editor={editor}
        commentCount={2}
        onToggleGutter={() => {}}
        actions={<button data-testid="extra">Share</button>}
      />,
    );
    const toggle = screen.getByTestId(TOGGLE);
    const extra = screen.getByTestId('extra');
    expect(toggle.compareDocumentPosition(extra) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  // ── Line spacing ───────────────────────────────────────────────────────
  //
  // The last main-bar control Google Docs had and this toolbar did not. The
  // trap it walked into is worth pinning: Tiptap's `TextStyleKit` already
  // registers a `setLineHeight`, so a naive implementation would have wired the
  // menu to a command that writes an INLINE SPAN measured in em — 1.21x the
  // paper's leading for "Double", and off the baseline grid. These assert the
  // toolbar drives `setLineSpacing`, the block attribute in grid rows, instead.

  it('hides line spacing when the extension is absent', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    expect(screen.queryByTestId('document-toolbar-line-spacing')).toBeNull();
  });

  it('opens the line-spacing menu and applies a choice', () => {
    const { editor, calls } = makeEditor({}, ['setLineSpacing']);
    render(<DocumentToolbar editor={editor} />);

    expect(screen.queryByTestId('document-toolbar-line-spacing-menu')).toBeNull();
    fireEvent.mouseDown(screen.getByTestId('document-toolbar-line-spacing'));
    expect(screen.getByTestId('document-toolbar-line-spacing-menu')).toBeInTheDocument();

    // The three the paper's grid can hold. 1.15 is deliberately not offered —
    // see canvasLineSpacing.ts.
    for (const key of ['1', '1-5', '2']) {
      expect(screen.getByTestId(`document-toolbar-line-spacing-${key}`)).toBeInTheDocument();
    }
    expect(screen.queryByTestId('document-toolbar-line-spacing-1-15')).toBeNull();

    fireEvent.mouseDown(screen.getByTestId('document-toolbar-line-spacing-1-5'));
    expect(calls).toContain('setLineSpacing:["1.5"]');
    // NOT the Tiptap built-in, which is the whole point.
    expect(calls.some((c) => c.startsWith('setLineHeight'))).toBe(false);
    expect(screen.queryByTestId('document-toolbar-line-spacing-menu')).toBeNull();
  });

  it('shows the spacing the caret is actually in', () => {
    const { editor, moveCursor } = makeEditor({}, ['setLineSpacing']);
    render(<DocumentToolbar editor={editor} />);

    fireEvent.mouseDown(screen.getByTestId('document-toolbar-line-spacing'));
    expect(screen.getByTestId('document-toolbar-line-spacing-1')).toHaveAttribute('aria-checked', 'true');
    fireEvent.keyDown(document, { key: 'Escape' });

    act(() => { moveCursor({ lineSpacing: '2' }); });
    fireEvent.mouseDown(screen.getByTestId('document-toolbar-line-spacing'));
    expect(screen.getByTestId('document-toolbar-line-spacing-2')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByTestId('document-toolbar-line-spacing-1')).toHaveAttribute('aria-checked', 'false');
  });

  // ── Keyboard activation ────────────────────────────────────────────────
  //
  // Every control in this bar handles `mousedown` and calls `preventDefault`,
  // because that is the only way the editor keeps its selection while a button
  // runs. For most of this toolbar's life that was the ONLY handler, which made
  // the whole bar dead to the keyboard: Enter and Space on a focused button
  // fire `click` and no `mousedown` at all. Measured on a live document before
  // the fix — bold stayed off through Enter and Space, and came on with a mouse
  // click.
  //
  // A keyboard-synthesised click carries `detail: 0`; a mouse click carries the
  // click count. Both directions are asserted, because an `onClick` that
  // ignored `detail` would fix the keyboard and toggle bold twice per mouse
  // click.

  it('runs a command when a focused button is activated by keyboard', () => {
    const { editor, calls } = makeEditor();
    render(<DocumentToolbar editor={editor} />);

    fireEvent.click(screen.getByTestId('document-toolbar-bold'), { detail: 0 });
    expect(calls).toContain('toggleBold');
  });

  it('does not double-run a mouse click', () => {
    const { editor, calls } = makeEditor();
    render(<DocumentToolbar editor={editor} />);

    const bold = screen.getByTestId('document-toolbar-bold');
    fireEvent.mouseDown(bold);
    fireEvent.click(bold, { detail: 1 });
    expect(calls.filter((c) => c === 'toggleBold')).toHaveLength(1);
  });

  // A tooltip teaches the markdown shortcut; an accessible name should not read
  // it out. "Bold  **text**" was the aria-label as well as the title, so a
  // screen reader announced "Bold star star text star star" for the B button.
  it('names a button for a screen reader without reading the markdown at it', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    const bold = screen.getByTestId('document-toolbar-bold');
    expect(bold).toHaveAttribute('aria-label', 'Bold');
    expect(bold).toHaveAttribute('title', 'Bold  **text**');
    expect(screen.getByTestId('document-toolbar-taskList')).toHaveAttribute('aria-label', 'Task list');
  });

  it('opens a menu from the keyboard', () => {
    const { editor } = makeEditor({}, ['setTextAlign']);
    render(<DocumentToolbar editor={editor} />);

    fireEvent.click(screen.getByTestId('document-toolbar-align'), { detail: 0 });
    expect(screen.getByTestId('document-toolbar-align-menu')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('document-toolbar-align-center'), { detail: 0 });
    expect(screen.queryByTestId('document-toolbar-align-menu')).toBeNull();
  });

  // ── Menu semantics ─────────────────────────────────────────────────────
  //
  // Opening a menu from the keyboard is not the same as being able to USE one.
  // Measured on a live page-shaped document with the align menu open and the
  // trigger focused: ArrowDown, ArrowUp, ArrowRight, Home, End and a printable
  // key ALL left `document.activeElement` on `document-toolbar-align` — every
  // one of them, on all four menus. `aria-activedescendant` was null
  // throughout and no trigger carried `aria-controls`. Tab reached the items,
  // because they are ordinary buttons, so the menus were usable and not
  // correct: a screen-reader user told "menu, expanded" got a menu whose only
  // navigation was the one a menu exists to replace.
  //
  // The assertions below are on `document.activeElement` rather than on a
  // class or an attribute, because "the roving cursor moved" is a claim about
  // focus and nothing else can stand in for it.

  /** Opens a menu the way a keyboard does, and returns the item elements. */
  function openAlign() {
    const { editor, calls } = makeEditor({}, ['setTextAlign']);
    render(<DocumentToolbar editor={editor} />);
    const trigger = screen.getByTestId('document-toolbar-align');
    trigger.focus();
    fireEvent.click(trigger, { detail: 0 });
    return { trigger, menu: screen.getByTestId('document-toolbar-align-menu'), calls };
  }

  it('moves the roving cursor into the menu when it opens from the keyboard', () => {
    openAlign();
    // Left is the alignment in force in the stand-in, so it is the entry
    // point: a value menu opens on the value you already have.
    expect(document.activeElement).toBe(screen.getByTestId('document-toolbar-align-left'));
  });

  it('walks the items with the arrow keys, on both axes', () => {
    const { menu } = openAlign();

    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByTestId('document-toolbar-align-center'));
    // The align menu is drawn as a ROW, so right has to mean the same as down.
    fireEvent.keyDown(menu, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(screen.getByTestId('document-toolbar-align-right'));
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(screen.getByTestId('document-toolbar-align-center'));
  });

  it('wraps at both ends rather than stopping', () => {
    const { menu } = openAlign();
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(screen.getByTestId('document-toolbar-align-justify'));
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByTestId('document-toolbar-align-left'));
  });

  it('jumps to the ends with Home and End', () => {
    const { menu } = openAlign();
    fireEvent.keyDown(menu, { key: 'End' });
    expect(document.activeElement).toBe(screen.getByTestId('document-toolbar-align-justify'));
    fireEvent.keyDown(menu, { key: 'Home' });
    expect(document.activeElement).toBe(screen.getByTestId('document-toolbar-align-left'));
  });

  it('finds an item by typing its name', () => {
    const { menu } = openAlign();
    // The items draw an ICON, so typeahead has to read the accessible name —
    // "Justify" is what a person types looking for the last one.
    fireEvent.keyDown(menu, { key: 'j' });
    expect(document.activeElement).toBe(screen.getByTestId('document-toolbar-align-justify'));
  });

  it('returns focus to the trigger on Escape, having changed nothing', () => {
    const { trigger, calls } = openAlign();
    expect(document.activeElement).not.toBe(trigger);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByTestId('document-toolbar-align-menu')).toBeNull();
    // The whole point of Escape: focus does not fall to `body`, and the menu
    // did not apply the item it happened to be sitting on.
    expect(document.activeElement).toBe(trigger);
    expect(calls).not.toContain('setTextAlign:["center"]');
  });

  it('returns focus to the trigger after a keyboard choice', () => {
    const { trigger, menu, calls } = openAlign();
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    fireEvent.click(document.activeElement!, { detail: 0 });

    expect(calls).toContain('setTextAlign:["center"]');
    expect(document.activeElement).toBe(trigger);
  });

  // A mouse click must NOT pull focus into the panel. Every control in this
  // bar suppresses the default on `mousedown` so the editor keeps the
  // selection the command acts on, and focusing an item would undo exactly
  // that on the way in.
  it('leaves focus alone when the menu is opened with the mouse', () => {
    const { editor } = makeEditor({}, ['setTextAlign']);
    render(<DocumentToolbar editor={editor} />);
    const before = document.activeElement;

    fireEvent.mouseDown(screen.getByTestId('document-toolbar-align'));
    expect(screen.getByTestId('document-toolbar-align-menu')).toBeInTheDocument();
    expect(document.activeElement).toBe(before);
  });

  it('opens downward from the trigger with ArrowDown, and upward with ArrowUp', () => {
    const { editor } = makeEditor({}, ['setLineSpacing']);
    render(<DocumentToolbar editor={editor} />);
    const trigger = screen.getByTestId('document-toolbar-line-spacing');

    trigger.focus();
    fireEvent.keyDown(trigger, { key: 'ArrowUp' });
    expect(screen.getByTestId('document-toolbar-line-spacing-menu')).toBeInTheDocument();
    expect((document.activeElement as HTMLElement).getAttribute('data-testid'))
      .toBe('document-toolbar-line-spacing-2');
  });

  it('names the panel it controls and the item the cursor is on', () => {
    const { trigger, menu } = openAlign();
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    // The trigger points at the panel, and the panel says which item is
    // current — the two halves an AT needs to follow a roving cursor.
    expect(trigger.getAttribute('aria-controls')).toBe(menu.id);
    expect(menu.getAttribute('aria-activedescendant'))
      .toBe(screen.getByTestId('document-toolbar-align-left').id);

    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(menu.getAttribute('aria-activedescendant'))
      .toBe(screen.getByTestId('document-toolbar-align-center').id);
  });

  // Roving tabindex, so Tab leaves the menu instead of walking it. Without
  // this every item is a tab stop and the menu is a submenu of the toolbar,
  // which is the shape it had before and the reason it read as a list of
  // buttons rather than as one control.
  it('keeps exactly one item in the tab order', () => {
    const { menu } = openAlign();
    const items = Array.from(menu.querySelectorAll('[role^="menuitem"]'));
    expect(items.filter((i) => i.getAttribute('tabindex') === '0')).toHaveLength(1);
    expect(items).toHaveLength(4);
  });

  // The table menu is the one whose item COUNT changes — nine edits appear
  // when the caret enters a table — which is why navigation reads the DOM
  // rather than an index registered at render time.
  it('walks the table menu at both of its lengths', () => {
    const { editor } = makeEditor({ table: true }, ['insertTable', 'addRowAfter', 'deleteTable']);
    render(<DocumentToolbar editor={editor} />);
    const trigger = screen.getByTestId('document-toolbar-table');
    trigger.focus();
    fireEvent.click(trigger, { detail: 0 });

    const menu = screen.getByTestId('document-toolbar-table-menu');
    expect(document.activeElement).toBe(screen.getByTestId('document-toolbar-table-insert'));
    fireEvent.keyDown(menu, { key: 'End' });
    expect(document.activeElement).toBe(screen.getByTestId('document-toolbar-table-del-table'));
  });
});


