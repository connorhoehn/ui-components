import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AgentComposerDock, type AgentComposerDockProps } from '../AgentComposerDock';
import { AgentComposerDock as LazyAgentComposerDock } from '../AgentComposerDockLazy';
import type { ComposedMessage, RichChatComposerHandle } from '../RichChatComposer';

afterEach(cleanup);

const workflows = [
  { id: 'prioritize', label: 'Prioritize next work', description: 'Rank the open work and explain the tradeoffs' },
  { id: 'unblock', label: 'Unblock this item', disabled: true, disabledReason: 'Open a work item first' },
];
const commands = [
  { trigger: '/prioritize', label: 'Prioritize next work' },
  { trigger: '/unblock', label: 'Unblock this item' },
];

function setup(overrides: Partial<AgentComposerDockProps> = {}) {
  let handle: RichChatComposerHandle | null = null;
  const props: AgentComposerDockProps = {
    presentation: 'document',
    placeholder: 'Ask about this initiative…',
    references: [{ id: 'p-auth', label: 'Auth Migration', marker: 'dot' }],
    onRemoveReference: vi.fn(),
    workflows,
    commands,
    onSend: vi.fn(() => true),
    composerTestId: 'composer',
    composerRef: (h) => { handle = h; },
    ...overrides,
  };
  render(<AgentComposerDock {...props} />);
  return { props, handle: () => handle };
}

const text = (h: RichChatComposerHandle | null) => h?.editor?.getText() ?? '';
function typeInto(h: RichChatComposerHandle | null, value: string) {
  act(() => { h?.editor?.commands.setContent(`<p>${value}</p>`); });
}

describe('AgentComposerDock', () => {
  it('is a pinned dock with the Agent ⌄ mode menu and the chip', () => {
    setup();
    const dock = screen.getByRole('region', { name: 'Agent composer' });
    expect(dock).toHaveAttribute('data-placement', 'pinned');
    expect(screen.getByTestId('composer-mode-menu')).toHaveTextContent('Agent');
    expect(within(dock).getByText('Auth Migration')).toBeInTheDocument();
  });

  it('says why Chat is off, by default', async () => {
    setup({ modeUnavailableReasons: { chat: 'No discussion thread here' } });
    await act(async () => { fireEvent.click(screen.getByTestId('composer-mode-menu')); });
    const menu = screen.getByTestId('composer-mode-menu-list');
    expect(within(menu).getByText('No discussion thread here')).toBeInTheDocument();
    expect(within(menu).getByText('This view has no terminal')).toBeInTheDocument();
  });

  it('a workflow pick seeds the draft with /<id> and remounts the editor', async () => {
    const onDraftChange = vi.fn();
    const { handle } = setup({ onDraftChange });
    const before = screen.getByTestId('composer-input');
    await act(async () => { fireEvent.click(screen.getByTestId('agent-composer-dock-workflow')); });
    await act(async () => { fireEvent.click(screen.getByText('Prioritize next work')); });
    expect(onDraftChange).toHaveBeenCalledWith(expect.objectContaining({ html: '<p>/prioritize </p>' }), expect.anything());
    await waitFor(() => expect(text(handle()).trim()).toBe('/prioritize'));
    expect(screen.getByTestId('composer-input')).not.toBe(before);
  });

  it('a disabled workflow row shows its reason and cannot be picked', async () => {
    const onWorkflow = vi.fn();
    setup({ onWorkflow });
    await act(async () => { fireEvent.click(screen.getByTestId('agent-composer-dock-workflow')); });
    expect(screen.getAllByText('Open a work item first').length).toBeGreaterThan(0);
    await act(async () => { fireEvent.click(screen.getByText('Unblock this item')); });
    expect(onWorkflow).not.toHaveBeenCalled();
    await act(async () => { fireEvent.click(screen.getByText('Prioritize next work')); });
    expect(onWorkflow).toHaveBeenCalledWith('prioritize');
  });

  it('removing the chip calls onRemoveReference', () => {
    const { props } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Remove Auth Migration from this draft' }));
    expect(props.onRemoveReference).toHaveBeenCalledWith('p-auth');
  });

  it('hands back what was typed (no /agent prefix), with the mode and the re-matched command', async () => {
    const { props, handle } = setup();
    typeInto(handle(), '/prioritize the auth work');
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    const [message, context] = (props.onSend as ReturnType<typeof vi.fn>).mock.calls[0]! as [ComposedMessage, { mode: string }];
    expect(message.text).toBe('/prioritize the auth work');
    expect(message.command).toEqual({ trigger: '/prioritize' });
    expect(context.mode).toBe('agent');
  });

  it('onSend returning false keeps the draft; true clears it', async () => {
    const onSend = vi.fn(() => false);
    const { handle } = setup({ onSend });
    typeInto(handle(), 'Who can help?');
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    expect(onSend).toHaveBeenCalledOnce();
    expect(text(handle())).toBe('Who can help?');
    onSend.mockImplementation(() => true);
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    await waitFor(() => expect(text(handle())).toBe(''));
  });

  it('prefills from defaultDraft and starts over when draftKey changes', async () => {
    let handle: RichChatComposerHandle | null = null;
    const base = { onSend: () => true, composerRef: (h: RichChatComposerHandle | null) => { handle = h; } };
    const { rerender } = render(<AgentComposerDock {...base} draftKey="a" defaultDraft="Help me prioritize." />);
    expect(text(handle)).toBe('Help me prioritize.');
    rerender(<AgentComposerDock {...base} draftKey="b" defaultDraft="Help me define criteria." />);
    await waitFor(() => expect(text(handle)).toBe('Help me define criteria.'));
  });

  it('composerRef resolves to the live composer', () => {
    const { handle } = setup();
    expect(handle()).not.toBeNull();
    expect(handle()!.editor).not.toBeNull();
    expect(typeof handle()!.focus).toBe('function');
  });

  it('no workflows, no Workflow menu', () => {
    setup({ workflows: [] });
    expect(screen.queryByTestId('agent-composer-dock-workflow')).toBeNull();
  });

  it('dock: renders its children in a slot above the composer', () => {
    setup({ dock: <div data-testid="shelf">Call shelf</div> });
    const slot = screen.getByTestId('agent-composer-dock-dock-slot');
    expect(within(slot).getByTestId('shelf')).toBeInTheDocument();
    expect(slot).toHaveClass('shrink-0');
    const composer = screen.getByTestId('composer-input');
    expect(slot.compareDocumentPosition(composer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole('region', { name: 'Agent composer' })).toContainElement(slot);
  });

  it('no dock, no slot element', () => {
    setup();
    expect(screen.queryByTestId('agent-composer-dock-dock-slot')).toBeNull();
  });

  async function modeRows() {
    await act(async () => { fireEvent.click(screen.getByTestId('composer-mode-menu')); });
    const list = screen.getByTestId('composer-mode-menu-list');
    // The first group is the modes; later groups are hints (`/ for commands`).
    const modes = within(list).getAllByRole('group')[0]!;
    return within(modes).getAllByRole('menuitem').map((b) => b.textContent ?? '');
  }

  it('by default Chat and Terminal are listed, disabled with reasons', async () => {
    setup();
    const rows = await modeRows();
    expect(rows).toHaveLength(3);
    expect(rows.some((r) => r.includes('Chat'))).toBe(true);
    expect(rows.some((r) => r.includes('Terminal'))).toBe(true);
  });

  it("modes={['agent']} hides the Chat and Terminal entries (absent, not disabled)", async () => {
    setup({ modes: ['agent'] });
    const rows = await modeRows();
    expect(rows).toHaveLength(1);
    expect(rows[0]).toContain('Agent');
    expect(screen.queryByText('This view has no terminal')).toBeNull();
  });

  it("modes={['terminal']} alone is a working Terminal (no default disable)", async () => {
    setup({ modes: ['terminal'], defaultMode: 'terminal' });
    expect(screen.getByTestId('composer-mode-menu')).toHaveTextContent('Terminal');
    const rows = await modeRows();
    expect(rows).toEqual([expect.stringContaining('Terminal')]);
    expect(rows[0]).not.toContain('This view has no terminal');
  });

  it('modes + disabledModes: an offered mode can still be shown off with its reason', async () => {
    setup({ modes: ['agent', 'chat'], disabledModes: ['chat'], modeUnavailableReasons: { chat: 'Only SMEs can post' } });
    const rows = await modeRows();
    expect(rows).toHaveLength(2);
    expect(rows.find((r) => r.includes('Chat'))).toContain('Only SMEs can post');
  });

  it('the root (lazy) export renders the same dock', async () => {
    render(<LazyAgentComposerDock onSend={() => true} label="Search composer" />);
    expect(await screen.findByRole('region', { name: 'Search composer' })).toBeInTheDocument();
  });
});
