// A `/agent <pick>` from the argument menu survives the words typed after it
// (2.403.1). Menu mode hides the command line the chip names; while the pick
// was the WHOLE line, the paragraph had nothing rendered in it, so a browser
// had no caret position inside it and put the next keystrokes in a new
// paragraph AHEAD of the command — `<p>Find…</p><p>/agent Advisor </p>` — and
// the dock's re-match found no command.
//
// jsdom has no layout, so `typeLikeBrowser` stands in for the browser's
// caret: it inserts at the DOM position ProseMirror put the selection at, or —
// when that position's block has no rendered text, as a Chromium caret cannot
// rest in `display:none` content — ahead of the block in the editor root, which
// is exactly where the reported words landed. ProseMirror then reads the DOM
// change through its own observer, as it does for real typing.
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { EditorView } from '@tiptap/pm/view';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { AgentComposerDock, type AgentComposerDockProps } from '../AgentComposerDock';
import { RichChatComposer, type ComposedMessage, type RichChatComposerHandle } from '../RichChatComposer';
import type { ComposerCommand } from '../composerCommands';

afterEach(cleanup);

// ProseMirror scrolls the selection into view after a DOM-read change; jsdom
// has no layout, so give it empty rects.
beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  const rect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
    if (!proto.getBoundingClientRect) Object.assign(proto, { getBoundingClientRect: rect });
  }
});

const AGENTS = [
  { id: 'advisor', label: 'Advisor', hint: 'orgiq-advisor' },
  { id: 'search', label: 'Search', hint: 'orgiq-search' },
];
const commands: ComposerCommand[] = [{
  trigger: '/agent',
  label: 'Ask a specific agent',
  argument: { placeholder: 'Choose an agent', search: (q) => AGENTS.filter((a) => a.label.toLowerCase().startsWith(q.toLowerCase())) },
}];

/** Text of the text nodes a browser would render (outside `.hidden`). */
function renderedText(el: Element): string {
  let out = '';
  const walk = (n: Node) => {
    if (n instanceof Element && n.classList.contains('hidden')) return;
    if (n.nodeType === Node.TEXT_NODE) out += n.textContent ?? '';
    n.childNodes.forEach(walk);
  };
  walk(el);
  return out;
}

function typeLikeBrowser(view: EditorView, text: string) {
  act(() => {
    const { node, offset } = view.domAtPos(view.state.selection.from);
    const block = (node instanceof Element ? node : node.parentElement)!.closest('p')!;
    if (renderedText(block) === '') {
      view.dom.insertBefore(document.createTextNode(text), block);
    } else if (node.nodeType === Node.TEXT_NODE) {
      (node as Text).insertData(offset, text);
    } else {
      const before = node.childNodes[offset - 1];
      if (before?.nodeType === Node.TEXT_NODE) (before as Text).appendData(text);
      else node.insertBefore(document.createTextNode(text), node.childNodes[offset] ?? null);
    }
    (view as unknown as { domObserver: { flush(): void } }).domObserver.flush();
  });
}

/** Backspace over typed characters (the browser's own deletion, not a key binding). */
function deleteBack(view: EditorView, count: number) {
  act(() => {
    const { from } = view.state.selection;
    view.dispatch(view.state.tr.delete(from - count, from));
  });
}

function setupDock(overrides: Partial<AgentComposerDockProps> = {}) {
  let handle: RichChatComposerHandle | null = null;
  const onSend = vi.fn((_m: ComposedMessage) => true);
  render(
    <AgentComposerDock
      commands={commands}
      onSend={onSend}
      composerTestId="composer"
      composerRef={(h) => { handle = h; }}
      {...overrides}
    />,
  );
  const h = () => handle!;
  return { onSend, h, view: () => h().editor!.view, html: () => h().editor!.getHTML() };
}

async function pickAdvisor(h: () => RichChatComposerHandle) {
  act(() => { h().insertText('/agent Adv'); });
  await waitFor(() => expect(screen.getAllByTestId('command-option')).toHaveLength(1));
  fireEvent.keyDown(screen.getByTestId('composer-input'), { key: 'Enter' });
  await waitFor(() => expect(screen.queryByTestId('command-suggestions')).toBeNull());
  expect(h().editor!.getText()).toBe('/agent Advisor ');
}

describe('AgentComposerDock: a `/agent` argument pick, then typing', () => {
  it('types after the command on the same line, and onSend carries the picked agent', async () => {
    const { onSend, h, view, html } = setupDock();
    await pickAdvisor(h);
    typeLikeBrowser(view(), 'Find migration guides');
    expect(html()).toBe('<p>/agent Advisor Find migration guides</p>');
    expect(screen.getByTestId('composer-command-argument')).toHaveTextContent('Advisor');
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    expect(onSend).toHaveBeenCalledOnce();
    const message = onSend.mock.calls[0]![0];
    expect(message.text).toBe('/agent Advisor Find migration guides');
    expect(message.command).toEqual({ trigger: '/agent', argument: expect.objectContaining({ id: 'advisor', label: 'Advisor' }) });
  });

  it('the caret sits after the hidden prefix in rendered text, not in the hidden run', async () => {
    const { h, view } = setupDock();
    await pickAdvisor(h);
    const input = screen.getByTestId('composer-input');
    expect(input.querySelector('[data-command-prefix]')).toHaveTextContent('/agent Advisor');
    expect(view().state.selection.from).toBe(1 + '/agent Advisor '.length);
    expect(renderedText(input.querySelector('p')!)).toBe(' ');
  });

  it('typing, deleting back to the prefix, then typing again stays on the command line', async () => {
    const { onSend, h, view, html } = setupDock();
    await pickAdvisor(h);
    typeLikeBrowser(view(), 'Find');
    deleteBack(view(), 4);
    expect(html()).toBe('<p>/agent Advisor </p>');
    expect(screen.getByTestId('composer-command-argument')).toHaveTextContent('Advisor');
    typeLikeBrowser(view(), 'Who owns auth?');
    expect(html()).toBe('<p>/agent Advisor Who owns auth?</p>');
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    expect(onSend.mock.calls[0]![0].command?.argument?.id).toBe('advisor');
  });

  it('Backspace at the prefix still removes the whole command after typing was deleted', async () => {
    const { h, view, html } = setupDock();
    await pickAdvisor(h);
    typeLikeBrowser(view(), 'Fi');
    deleteBack(view(), 2);
    fireEvent.keyDown(screen.getByTestId('composer-input'), { key: 'Backspace' });
    expect(html()).toBe('<p></p>');
    expect(screen.queryByTestId('composer-command')).toBeNull();
  });

  it('Enter with nothing typed after the pick sends the bare command, as before, and the host can keep the draft', async () => {
    const onSend = vi.fn((_m: ComposedMessage) => false);
    const { h } = setupDock({ onSend });
    await pickAdvisor(h);
    fireEvent.keyDown(screen.getByTestId('composer-input'), { key: 'Enter' });
    expect(onSend).toHaveBeenCalledOnce();
    expect(onSend.mock.calls[0]![0]).toMatchObject({ text: '/agent Advisor ', command: { trigger: '/agent', argument: { id: 'advisor' } } });
    expect(h().editor!.getText()).toBe('/agent Advisor ');
  });
});

describe('RichChatComposer modeControl="tabs": the pick is not hidden', () => {
  it('shows the command line and types after it', async () => {
    const ref = { current: null as RichChatComposerHandle | null };
    const onSend = vi.fn();
    render(
      <RichChatComposer
        ref={(h) => { ref.current = h; }}
        data-testid="composer"
        commands={commands}
        mode="agent"
        onModeChange={() => {}}
        modeControl="tabs"
        onSend={onSend}
      />,
    );
    await pickAdvisor(() => ref.current!);
    const input = screen.getByTestId('composer-input');
    expect(input.querySelector('[data-command-prefix]')).toBeNull();
    typeLikeBrowser(ref.current!.editor!.view, 'Find migration guides');
    expect(ref.current!.editor!.getHTML()).toBe('<p>/agent Advisor Find migration guides</p>');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend.mock.calls[0]![0]).toMatchObject({ text: '/agent Advisor Find migration guides', command: { trigger: '/agent', argument: { id: 'advisor' } } });
  });
});

describe('inputLabel: the editor has an accessible name', () => {
  it('RichChatComposer puts it on the contenteditable, a multiline textbox', () => {
    render(<RichChatComposer onSend={() => {}} data-testid="composer" inputLabel="Search question" />);
    const editor = screen.getByRole('textbox', { name: 'Search question' });
    expect(editor).toBe(screen.getByTestId('composer-input'));
    expect(editor).toHaveAttribute('contenteditable', 'true');
    expect(editor).toHaveAttribute('aria-multiline', 'true');
  });

  it('a changed inputLabel reaches the living editor without rebuilding it', () => {
    const { rerender } = render(<RichChatComposer onSend={() => {}} data-testid="composer" inputLabel="Ask" />);
    const before = screen.getByRole('textbox', { name: 'Ask' });
    rerender(<RichChatComposer onSend={() => {}} data-testid="composer" inputLabel="Reply" />);
    expect(screen.getByRole('textbox', { name: 'Reply' })).toBe(before);
  });

  it('AgentComposerDock names it "Message" by default, or passes inputLabel through', () => {
    const { unmount } = render(<AgentComposerDock onSend={() => true} composerTestId="composer" />);
    expect(screen.getByRole('textbox', { name: 'Message' })).toBe(screen.getByTestId('composer-input'));
    unmount();
    render(<AgentComposerDock onSend={() => true} composerTestId="composer" inputLabel="Search question" />);
    expect(screen.getByRole('textbox', { name: 'Search question' })).toBe(screen.getByTestId('composer-input'));
  });
});
