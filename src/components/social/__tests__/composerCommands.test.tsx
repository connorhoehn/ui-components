import { createRef } from 'react';
import { render, screen, fireEvent, cleanup, act, waitFor } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  RichChatComposer,
  matchComposerCommand,
  composerCommandArgumentText,
  type ComposerCommand,
  type RichChatComposerHandle,
} from '../RichChatComposer';
import { CommandSuggestions, type CommandSuggestionsHandle } from '../CommandSuggestions';

afterEach(cleanup);

// jsdom has no layout, and its Range lacks the two methods ProseMirror's
// `coordsAtPos` uses to find the caret when a menu opens. Without them the
// plugin's async update rejects (an unhandled rejection, not a failing
// assertion) — so give them a zero box, which is all placement needs here.
beforeAll(() => {
  const zero = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  if (!Range.prototype.getClientRects) {
    Range.prototype.getClientRects = () => [] as unknown as DOMRectList;
    Range.prototype.getBoundingClientRect = zero;
  }
});

const commands: ComposerCommand[] = [
  { trigger: '/doc', label: 'Edit the open document with Haiku' },
  { trigger: '/call', label: 'Start a call' },
];

describe('matchComposerCommand', () => {
  it('matches the trigger alone or followed by the instruction, case-insensitively', () => {
    expect(matchComposerCommand('/doc', commands)?.trigger).toBe('/doc');
    expect(matchComposerCommand('/Doc rename it', commands)?.trigger).toBe('/doc');
    expect(matchComposerCommand('  /call now', commands)?.trigger).toBe('/call');
  });
  it('does not match a longer word, a trigger mid-sentence, or an empty draft', () => {
    expect(matchComposerCommand('/document', commands)).toBeNull();
    expect(matchComposerCommand('use /doc please', commands)).toBeNull();
    expect(matchComposerCommand('', commands)).toBeNull();
    expect(matchComposerCommand('/doc x', undefined)).toBeNull();
  });
});

describe('composerCommandArgumentText', () => {
  it('is the text after the trigger and its one separator', () => {
    expect(composerCommandArgumentText('/doc Roadmap', commands[0])).toBe('Roadmap');
    expect(composerCommandArgumentText('  /doc  Roadmap', commands[0])).toBe(' Roadmap');
    expect(composerCommandArgumentText('/doc', commands[0])).toBe('');
  });
});

// The composer drives its menus through Tiptap's Suggestion plugin, which
// watches ProseMirror transactions — so `insertContent` through the handle is
// typing as far as the plugin is concerned, and a keydown on the contenteditable
// reaches the plugin's `handleKeyDown` exactly as a real key would.
const DOCS = [
  { id: 'd1', label: 'Roadmap', hint: 'Product', icon: '📄' },
  { id: 'd2', label: 'Rollout plan', hint: 'Ops', icon: '📄' },
  { id: 'd3', label: 'Budget', hint: 'Finance', icon: '📄' },
];

function setup(opts: { onPick?: () => 'execute' | 'insert'; disabledCall?: boolean } = {}) {
  const onSend = vi.fn();
  const onCommand = vi.fn();
  const search = vi.fn((q: string) => DOCS.filter((d) => d.label.toLowerCase().startsWith(q.toLowerCase())));
  const cmds: ComposerCommand[] = [
    {
      trigger: '/doc',
      label: 'Edit a document',
      hint: 'with Haiku',
      description: 'Opens the document and applies your instruction as a collaborator.',
      argument: { placeholder: 'type a document name', search, onPick: opts.onPick },
    },
    { trigger: '/call', label: 'Start a call', disabled: opts.disabledCall },
    { trigger: '/shrug', label: 'Append a shrug' },
  ];
  const ref = createRef<RichChatComposerHandle>();
  render(<RichChatComposer ref={ref} onSend={onSend} onCommand={onCommand} commands={cmds} data-testid="composer" />);
  const input = screen.getByTestId('composer-input');
  const type = (text: string) => act(() => { ref.current!.insertText(text); });
  const key = (k: string) => fireEvent.keyDown(input, { key: k });
  const text = () => ref.current!.editor!.getText();
  return { onSend, onCommand, search, cmds, type, key, text, input };
}

describe('RichChatComposer `/` menu', () => {
  it('lists commands filtered by prefix, skipping disabled ones, and inserts the trigger on Enter', async () => {
    const { type, key, text, onSend } = setup({ disabledCall: true });
    type('/');
    await waitFor(() => expect(screen.getAllByTestId('command-option')).toHaveLength(2));
    expect(screen.getAllByTestId('command-option').map((b) => b.textContent)).toEqual([
      '/docEdit a documentwith Haiku',
      '/shrugAppend a shrug',
    ]);
    // The highlighted row's long form, under the list.
    expect(screen.getByTestId('command-description')).toHaveTextContent('Opens the document');

    type('s');
    await waitFor(() => expect(screen.getAllByTestId('command-option')).toHaveLength(1));
    expect(screen.getByTestId('command-option')).toHaveTextContent('/shrug');

    key('Enter');
    expect(text()).toBe('/shrug ');
    expect(onSend).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByTestId('command-suggestions')).toBeNull());
  });

  it('does not open mid-message, and Enter with an empty menu still sends', async () => {
    const { type, key, onSend } = setup();
    type('hello /doc');
    // Nothing to await: give the plugin's async item fetch a turn to prove it never mounted.
    await act(async () => { await Promise.resolve(); });
    expect(screen.queryByTestId('command-suggestions')).toBeNull();
    key('Enter');
    expect(onSend).toHaveBeenCalledWith(expect.objectContaining({ text: 'hello /doc' }));
    expect(onSend.mock.calls[0][0].command).toBeUndefined();
  });

  it('gives Enter back to the composer when no command matches the query', async () => {
    const { type, key, onSend } = setup();
    type('/zzz');
    await act(async () => { await Promise.resolve(); });
    expect(screen.queryByTestId('command-suggestions')).toBeNull();
    key('Enter');
    expect(onSend).toHaveBeenCalledWith(expect.objectContaining({ text: '/zzz' }));
  });
});

describe('RichChatComposer argument menu', () => {
  it('searches with the text after the trigger, and an execute pick clears the draft and calls onCommand', async () => {
    const { type, key, text, search, onCommand, onSend, cmds } = setup({ onPick: () => 'execute' });
    type('/doc Ro');
    await waitFor(() => expect(search).toHaveBeenCalledWith('Ro'));
    await waitFor(() => expect(screen.getAllByTestId('command-option')).toHaveLength(2));
    expect(screen.getAllByTestId('command-option')[0]).toHaveTextContent('Roadmap');

    key('Enter');
    expect(onCommand).toHaveBeenCalledTimes(1);
    expect(onCommand.mock.calls[0][0]).toBe(cmds[0]);
    expect(onCommand.mock.calls[0][1]).toEqual(DOCS[0]);
    expect(text()).toBe('');
    expect(onSend).not.toHaveBeenCalled();
  });

  it('an insert pick leaves the label in the draft, closes the menu, and onSend carries the argument', async () => {
    const { type, key, text, onSend, onCommand } = setup();
    type('/doc Ro');
    await waitFor(() => expect(screen.getAllByTestId('command-option')).toHaveLength(2));
    key('ArrowDown');
    key('Enter');
    expect(text()).toBe('/doc Rollout plan ');
    expect(onCommand).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByTestId('command-suggestions')).toBeNull());

    type('make it shorter');
    key('Enter');
    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onSend.mock.calls[0][0]).toMatchObject({
      text: '/doc Rollout plan make it shorter',
      command: { trigger: '/doc', argument: DOCS[1] },
    });
    // The pick does not leak into the next message.
    type('/doc Budget');
    key('Enter');
    expect(onSend.mock.calls[1][0].command).toEqual({ trigger: '/doc' });
  });

  it('shows the argument placeholder in the status bar until something is typed', async () => {
    const { type } = setup();
    type('/doc ');
    expect(screen.getByTestId('composer-command-placeholder')).toHaveTextContent('type a document name');
    type('Ro');
    expect(screen.queryByTestId('composer-command-placeholder')).toBeNull();
    expect(screen.getByTestId('composer-command')).toHaveTextContent('with Haiku');
  });
});

describe('CommandSuggestions', () => {
  it('claims no keys while empty, so Enter still sends', () => {
    const ref = createRef<CommandSuggestionsHandle>();
    const { container } = render(<CommandSuggestions ref={ref} items={[]} command={vi.fn()} />);
    expect(container.firstChild).toBeNull();
    expect(ref.current!.onKeyDown({ event: new KeyboardEvent('keydown', { key: 'Enter' }) })).toBe(false);
  });

  it('shows the highlighted row description and commits on mousedown', () => {
    const command = vi.fn();
    render(
      <CommandSuggestions
        items={[
          { id: '/doc', code: '/doc', label: 'Edit', description: 'Long form for doc' },
          { id: '/call', code: '/call', label: 'Call', description: 'Long form for call' },
        ]}
        command={command}
      />,
    );
    expect(screen.getByTestId('command-description')).toHaveTextContent('Long form for doc');
    fireEvent.mouseEnter(screen.getAllByRole('option')[1]);
    expect(screen.getByTestId('command-description')).toHaveTextContent('Long form for call');
    fireEvent.mouseDown(screen.getAllByRole('option')[1]);
    expect(command).toHaveBeenCalledWith(expect.objectContaining({ id: '/call' }));
  });
});
