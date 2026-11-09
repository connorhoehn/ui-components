// 2.510.0 — `presentation="prompt"`: the docked composer as a quiet prompt
// box. The record and its references in one header row, the suggestion chips,
// the text box and ONE button showing the host's label — no mode label, no
// `/ commands` hint, no paper plane; a command with nothing to ask runs on
// the pick; references never add a row.
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContextComposer, type ContextComposerProps } from '../ContextComposer';
import { createConversationComposer } from '../ConversationComposer';
import { RichChatComposer, type RichChatComposerHandle } from '../RichChatComposer';
import { ComposerSendError } from '../composerSendError';

afterEach(cleanup);
beforeEach(() => { window.localStorage.clear(); });

beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  const rect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
    if (!proto.getBoundingClientRect) Object.assign(proto, { getBoundingClientRect: rect });
  }
});

const WORK = { kind: 'initiative', id: 'show-1', title: 'Synthetic workshop' } as const;
const COMMANDS = [
  { trigger: '/episode', label: 'Create a new episode' },
  { trigger: '/doc', label: 'Edit a document', argument: { placeholder: 'a document', search: () => [{ id: 'd1', label: 'Roadmap' }] } },
];

function prompt(props: Partial<ContextComposerProps> = {}) {
  let handle: RichChatComposerHandle | null = null;
  const onSend = vi.fn<ContextComposerProps['onSend']>(() => true);
  const utils = render(
    <ContextComposer
      context={WORK}
      presentation="prompt"
      defaultMode="agent"
      modes={['agent']}
      expanded
      onSend={onSend}
      submitLabel="Plan"
      composerTestId="composer"
      composerRef={(h) => { handle = h; }}
      {...props}
    />,
  );
  return { ...utils, onSend, handle: () => handle };
}

describe('ContextComposer presentation="prompt"', () => {
  it('marks the composer and draws no mode label, pill, picker or ⌥n badge', () => {
    prompt({ modes: ['chat', 'agent'] });
    const root = screen.getByTestId('composer');
    expect(root).toHaveAttribute('data-presentation', 'prompt');
    expect(screen.queryByTestId('composer-mode-label')).toBeNull();
    expect(screen.queryByTestId('composer-mode-pill')).toBeNull();
    expect(screen.queryByTestId('composer-mode-menu')).toBeNull();
    expect(screen.queryByTestId('composer-mode-kbd')).toBeNull();
    expect(within(root).queryByText('Agent')).toBeNull();
    expect(screen.getByTestId('composer-modes')).toHaveAttribute('data-mode-control', 'none');
  });

  it('draws no mode chrome on the idle row either', () => {
    prompt({ expanded: false });
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'true');
    expect(screen.queryByTestId('composer-mode-pill')).toBeNull();
    expect(screen.queryByTestId('composer-mode-label')).toBeNull();
  });

  it('has no formatting strip, no `/ commands` hint and no input well; Send is the label alone', () => {
    prompt({ commands: COMMANDS });
    expect(screen.queryByRole('button', { name: 'Bold' })).toBeNull();
    expect(screen.queryByTestId('composer-commands-hint')).toBeNull();
    expect(document.querySelector('[data-basic-well]')).toBeNull();
    const send = screen.getByTestId('composer-send');
    expect(send).toHaveTextContent(/^Plan$/);
    expect(send.querySelector('svg')).toBeNull();
    expect(send.textContent).not.toContain('→');
  });

  it('the default presentations keep their chrome', () => {
    render(<ContextComposer context={WORK} presentation="document" toolbar="prompt" defaultMode="agent" modes={['agent']} expanded onSend={() => true} submitLabel="Plan" composerTestId="composer" commands={COMMANDS} />);
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Agent');
    expect(screen.getByTestId('composer-commands-hint')).toBeInTheDocument();
    expect(screen.getByTestId('composer-send').querySelector('svg')).not.toBeNull();
    expect(screen.getByTestId('composer')).not.toHaveAttribute('data-presentation');
  });

  it('keeps the host row content, extras and suggestion chips', () => {
    const onSuggestion = vi.fn();
    prompt({
      modeRowEnd: <button type="button" data-testid="plans">Plans</button>,
      toolbarExtras: <button type="button" data-testid="upload">Upload</button>,
      suggestions: ['Add a character'], onSuggestion, suggestionsVisible: 'empty',
    });
    expect(within(screen.getByTestId('composer-modes')).getByTestId('plans')).toBeInTheDocument();
    expect(within(screen.getByTestId('composer-toolbar')).getByTestId('upload')).toBeInTheDocument();
    fireEvent.click(within(screen.getByTestId('composer-suggestions')).getByText('Add a character'));
    expect(onSuggestion).toHaveBeenCalledWith('Add a character');
  });

  it('Enter still sends in the default mode', async () => {
    const { onSend, handle } = prompt();
    act(() => { handle()!.editor!.commands.setContent('<p>Make the porch warmer</p>', { emitUpdate: true }); });
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onSend.mock.calls[0]![1].mode).toBe('agent');
  });

  it('references sit in the header row beside the context chip, add no row, and stay removable', () => {
    const onRemoveReference = vi.fn();
    const { rerender } = prompt({ onRemoveReference });
    const rowsBefore = Array.from(screen.getByTestId('composer').children).length;
    const header = screen.getByTestId('composer-modes');
    expect(within(header).getByText('Synthetic workshop')).toBeInTheDocument();
    rerender(
      <ContextComposer context={WORK} presentation="prompt" defaultMode="agent" modes={['agent']} expanded onSend={() => true}
        submitLabel="Plan" composerTestId="composer" references={[{ id: 'guide', label: 'Guide' }]} onRemoveReference={onRemoveReference} />,
    );
    // Same header row, same number of rows in the card: the box does not grow.
    expect(Array.from(screen.getByTestId('composer').children)).toHaveLength(rowsBefore);
    const refs = within(screen.getByTestId('composer-modes')).getByTestId('composer-references');
    expect(refs).toHaveTextContent('Guide');
    expect(refs.className).toContain('flex-nowrap');
    expect(screen.getByTestId('composer-modes').className).toContain('min-h-8');
    fireEvent.click(screen.getByRole('button', { name: 'Remove Guide from this draft' }));
    expect(onRemoveReference).toHaveBeenCalledWith('guide');
  });

  it('picking a command with no argument sends it at once and clears the draft', async () => {
    const { onSend, handle } = prompt({ commands: COMMANDS });
    act(() => { handle()!.insertText('/ep'); });
    await waitFor(() => expect(screen.getAllByTestId('command-option')).toHaveLength(1));
    fireEvent.keyDown(screen.getByTestId('composer-input'), { key: 'Enter' });
    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onSend.mock.calls[0]![0]).toMatchObject({ text: '/episode', command: { trigger: '/episode' }, files: [] });
    expect(handle()!.editor!.getText()).toBe('');
    expect(screen.queryByTestId('composer-command')).toBeNull();
    expect(screen.getByTestId('composer')).not.toHaveAttribute('data-command');
  });

  it('a fully typed trigger picked with Enter runs the same way', async () => {
    const { onSend, handle } = prompt({ commands: COMMANDS });
    act(() => { handle()!.insertText('/episode'); });
    await waitFor(() => expect(screen.getAllByTestId('command-option')).toHaveLength(1));
    fireEvent.keyDown(screen.getByTestId('composer-input'), { key: 'Enter' });
    expect(onSend).toHaveBeenCalledTimes(1);
    expect(handle()!.editor!.getText()).toBe('');
  });

  it('a command that takes an argument still writes its trigger and asks', async () => {
    const { onSend, handle } = prompt({ commands: COMMANDS });
    act(() => { handle()!.insertText('/do'); });
    await waitFor(() => expect(screen.getAllByTestId('command-option')).toHaveLength(1));
    fireEvent.keyDown(screen.getByTestId('composer-input'), { key: 'Enter' });
    expect(onSend).not.toHaveBeenCalled();
    expect(handle()!.editor!.getText()).toBe('/doc ');
  });
});

describe('RichChatComposer onCommandPick', () => {
  it('a refused pick shows in the send-error line', async () => {
    let handle: RichChatComposerHandle | null = null;
    render(<RichChatComposer ref={(h) => { handle = h; }} onSend={() => {}} commands={COMMANDS} data-testid="composer"
      onCommandPick={() => Promise.reject(new ComposerSendError('No show is open'))} />);
    act(() => { handle!.insertText('/ep'); });
    await waitFor(() => expect(screen.getAllByTestId('command-option')).toHaveLength(1));
    await act(async () => { fireEvent.keyDown(screen.getByTestId('composer-input'), { key: 'Enter' }); });
    await waitFor(() => expect(screen.getByTestId('composer')).toHaveTextContent('No show is open.'));
  });
});

describe('ConversationComposer presentation="prompt"', () => {
  const ConversationComposer = createConversationComposer({ useFileUpload: () => ({ upload: async () => ({ status: 'uploading', transferId: 't' }) }) });

  it('a picked command runs its `run` with empty argument text, even when run keeps the draft', async () => {
    const run = vi.fn((_input: unknown) => false);
    let handle: RichChatComposerHandle | null = null;
    render(
      <ConversationComposer channel={null} context={WORK} presentation="prompt" defaultMode="agent" expanded console={false}
        capabilities={{ maySend: false, agent: { allowed: true } }} identity={{ userId: 'u-1', displayName: 'Local' }}
        onAgent={() => true} submitLabel="Plan" composerTestId="composer" composerRef={(h) => { handle = h; }}
        commands={[{ trigger: '/episode', label: 'Create a new episode', modes: ['agent'], run }]} />,
    );
    expect(screen.queryByTestId('composer-mode-label')).toBeNull();
    act(() => { handle!.insertText('/'); });
    await waitFor(() => expect(screen.getAllByTestId('command-option')).toHaveLength(1));
    await act(async () => { fireEvent.mouseDown(screen.getByTestId('command-option')); });
    await waitFor(() => expect(run).toHaveBeenCalledTimes(1));
    expect(run.mock.calls[0]![0]).toMatchObject({ trigger: '/episode', argumentText: '', mode: 'agent' });
    expect(handle!.editor!.getText()).toBe('');
    expect(screen.queryByTestId('composer-command')).toBeNull();
  });
});
