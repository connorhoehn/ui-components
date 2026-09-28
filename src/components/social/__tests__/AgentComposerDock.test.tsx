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

  it('the root (lazy) export renders the same dock', async () => {
    render(<LazyAgentComposerDock onSend={() => true} label="Search composer" />);
    expect(await screen.findByRole('region', { name: 'Search composer' })).toBeInTheDocument();
  });
});
