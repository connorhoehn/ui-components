import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
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

  // mouseDown, not click: a click would blur the editor first and collapse
  // the selection the command is supposed to act on.
  it('acts on mouseDown so the selection survives', () => {
    const { editor, calls } = makeEditor();
    render(<DocumentToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('document-toolbar-bold'));
    expect(calls).toEqual([]);
    fireEvent.mouseDown(screen.getByTestId('document-toolbar-bold'));
    expect(calls).toContain('toggleBold');
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

  it('shows the align group once text-align is registered', () => {
    const { editor, calls } = makeEditor({}, ['setTextAlign']);
    render(<DocumentToolbar editor={editor} />);
    for (const a of ['left', 'center', 'right']) {
      expect(screen.getByTestId(`document-toolbar-align-${a}`)).toBeInTheDocument();
    }
    fireEvent.mouseDown(screen.getByTestId('document-toolbar-align-center'));
    expect(calls.join('|')).toContain('setTextAlign:["center"]');
  });

  it('renders caller actions at the end of the bar', () => {
    const { editor } = makeEditor();
    render(<DocumentToolbar editor={editor} actions={<button data-testid="extra">Insert</button>} />);
    expect(screen.getByTestId('extra')).toBeInTheDocument();
  });
});
