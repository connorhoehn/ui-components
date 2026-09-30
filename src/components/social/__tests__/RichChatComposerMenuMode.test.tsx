// `modeControl="menu"` (2.377.0): the mode as one dropdown (`Agent ▾`) with
// its `⌥n` beside it, the draft's references at the row's end, and a muted
// `/ commands` where the toolbar ends — the shape of an editor's docked composer.
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';

afterEach(cleanup);

const base = {
  onSend: () => {},
  'data-testid': 'composer',
  layout: 'wide',
  mode: 'agent',
  modeControl: 'menu',
  modeShortcuts: true,
} as const;

describe('modeControl="menu"', () => {
  it('one dropdown names the mode; the shortcut chip rides beside it; no numbered buttons', () => {
    render(<RichChatComposer {...base} onModeChange={() => {}} />);
    const rows = screen.getAllByTestId('composer-modes');
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveAttribute('data-mode-control', 'menu');
    expect(screen.getByTestId('composer-mode-menu')).toHaveTextContent('Agent');
    expect(screen.getByTestId('composer-mode-kbd')).toHaveTextContent('⌥2');
    expect(screen.queryByTestId('composer-mode-agent')).toBeNull();
    // 2.407.41: the chip is the mode control's hint, shown only while the
    // control is hovered or focused — never a standing badge beside "Agent ▾".
    const kbd = screen.getByTestId('composer-mode-kbd');
    expect(screen.getByTestId('composer-mode-control')).toContainElement(kbd);
    expect(screen.getByTestId('composer-mode-control')).toContainElement(screen.getByTestId('composer-mode-menu'));
    expect(kbd).toHaveClass('hidden', 'group-hover/modemenu:inline-block', 'group-focus-within/modemenu:inline-block');
    expect(screen.queryByRole('group', { name: 'Composer mode' })).toBeNull();
  });

  it('the menu lists the other modes with their shortcuts and switches on select', async () => {
    const onModeChange = vi.fn();
    render(<RichChatComposer {...base} onModeChange={onModeChange} disabledModes={['terminal']} modeUnavailableReasons={{ terminal: 'No loop is running' }} />);
    await act(async () => { fireEvent.click(screen.getByTestId('composer-mode-menu')); });
    const menu = screen.getByTestId('composer-mode-menu-list');
    expect(within(menu).getByText('Chat')).toBeInTheDocument();
    expect(within(menu).getByText('Terminal')).toBeInTheDocument();
    expect(within(menu).getByText('No loop is running')).toBeInTheDocument();
    expect(within(menu).getByText('⌥1')).toBeInTheDocument();
    await act(async () => { fireEvent.click(within(menu).getByText('Chat')); });
    expect(onModeChange).toHaveBeenCalledWith('chat');
  });

  it('references sit at the end of the mode row, before a row-end control, and nowhere else', () => {
    render(
      <RichChatComposer
        {...base}
        onModeChange={() => {}}
        references={[{ id: 'doc-1', label: 'Audit Renderers' }]}
        modeRowEnd={<span data-testid="scope">scope</span>}
      />,
    );
    const row = screen.getByTestId('composer-modes');
    const refs = within(row).getByTestId('composer-references');
    expect(refs.className).toContain('ml-auto');
    expect(screen.getAllByTestId('composer-references')).toHaveLength(1);
    const end = within(row).getByTestId('composer-mode-row-end');
    expect(end.className).toContain('ml-2');
    expect(end.className).not.toContain('ml-auto');
    expect(refs.compareDocumentPosition(end) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('with no references the row-end control still takes the far end', () => {
    render(<RichChatComposer {...base} onModeChange={() => {}} modeRowEnd={<span>scope</span>} />);
    expect(screen.getByTestId('composer-mode-row-end').className).toContain('ml-auto');
  });
});

describe('the / commands hint', () => {
  const command = { trigger: '/', name: 'doc', label: '/doc', description: 'Document commands' };
  it('shows, muted, where the toolbar ends when the host has slash commands', () => {
    render(<RichChatComposer {...base} onModeChange={() => {}} commands={[command as never]} />);
    const hint = screen.getByTestId('composer-commands-hint');
    expect(hint).toHaveTextContent('/ commands');
    expect(hint.className).toContain('text-text-tertiary');
  });
  it('is absent without commands', () => {
    render(<RichChatComposer {...base} onModeChange={() => {}} />);
    expect(screen.queryByTestId('composer-commands-hint')).toBeNull();
  });
});
