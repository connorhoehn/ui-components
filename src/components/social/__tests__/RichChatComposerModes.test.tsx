import { useState } from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer, type ComposedMessage, type ComposerMode, type RichChatComposerHandle } from '../RichChatComposer';

afterEach(cleanup);

/**
 * jsdom has no real selection, so the honest way to put words in the editor is
 * the same handle a host uses. `setContent` emits an update, which is what the
 * composer listens to for emptiness and for the command bar.
 */
function typeInto(handle: RichChatComposerHandle | null, text: string) {
  act(() => {
    handle?.editor?.commands.setContent(`<p>${text}</p>`);
  });
}

/** A host that owns the mode, the way every consumer of this feature will. */
function ModedComposer(props: Partial<Parameters<typeof RichChatComposer>[0]> & { initial?: ComposerMode }) {
  const [mode, setMode] = useState<ComposerMode>(props.initial ?? 'chat');
  const { initial: _initial, ...rest } = props;
  return (
    <RichChatComposer
      onSend={vi.fn()}
      data-testid="composer"
      {...rest}
      mode={mode}
      onModeChange={(next) => { setMode(next); props.onModeChange?.(next); }}
    />
  );
}

describe('RichChatComposer is unchanged for a host that adopts nothing', () => {
  it('renders no process line, no mode switch, no hints and no split send', () => {
    render(<RichChatComposer onSend={vi.fn()} data-testid="composer" />);
    for (const id of ['composer-processes', 'composer-modes', 'composer-hints', 'composer-shell', 'composer-shell-input', 'composer-send-options']) {
      expect(screen.queryByTestId(id)).toBeNull();
    }
    expect(screen.queryByRole('tab')).toBeNull();
    // The primary action is the same single button, in the same place, with
    // the same classes — a split Send would move it.
    expect(screen.getByTestId('composer-send')).toHaveAttribute(
      'class',
      'ml-auto shrink-0 rounded bg-primary font-semibold text-on-primary disabled:opacity-40 px-2.5 py-1 text-xs',
    );
  });

  it('publishes no `mode` key on the message', () => {
    const onSend = vi.fn();
    let handle: RichChatComposerHandle | null = null;
    render(<RichChatComposer ref={(h) => { handle = h; }} onSend={onSend} data-testid="composer" />);
    typeInto(handle, 'hello');
    fireEvent.click(screen.getByTestId('composer-send'));
    const message = onSend.mock.calls[0]![0] as ComposedMessage;
    expect(message.text).toBe('hello');
    expect('mode' in message).toBe(false);
  });
});

describe('the process status line', () => {
  it('names what is already running, and disappears when nothing is', () => {
    const { rerender } = render(
      <RichChatComposer
        onSend={vi.fn()}
        data-testid="composer"
        processes={[
          { id: 'deck', label: 'Presentation agent · v3 generating', tone: 'running' },
          { id: 'tests', label: 'Terminal tests running', tone: 'running' },
        ]}
      />,
    );
    const line = screen.getByTestId('composer-processes');
    expect(line).toHaveTextContent('Presentation agent · v3 generating');
    expect(line).toHaveTextContent('Terminal tests running');

    rerender(<RichChatComposer onSend={vi.fn()} data-testid="composer" processes={[]} />);
    expect(screen.queryByTestId('composer-processes')).toBeNull();
  });
});

describe('composer modes', () => {
  it('switches between Chat, Agent and Terminal and re-labels the field', () => {
    const onModeChange = vi.fn();
    render(<ModedComposer onModeChange={onModeChange} />);
    expect(screen.getByRole('tab', { name: /Chat/ })).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(screen.getByRole('tab', { name: /Terminal/ }));
    expect(onModeChange).toHaveBeenCalledWith('terminal');
    expect(screen.getByTestId('composer-shell-input')).toHaveAttribute('placeholder', '$ command in the cloud shell');
    // The rich editor is hidden, NOT unmounted: switching modes must not eat
    // the half-written message somebody switched away from.
    expect(screen.getByTestId('composer-input')).toBeInTheDocument();
    expect(screen.getByTestId('composer-input').closest('[hidden]')).not.toBeNull();
  });

  it('keeps the rich draft across a round trip through terminal mode', () => {
    let handle: RichChatComposerHandle | null = null;
    render(<ModedComposer ref={(h: RichChatComposerHandle | null) => { handle = h; }} />);
    typeInto(handle, 'half a sentence');
    const before = screen.getByTestId('composer-input');

    fireEvent.click(screen.getByRole('tab', { name: /Terminal/ }));
    fireEvent.click(screen.getByRole('tab', { name: /Chat/ }));
    expect(screen.getByTestId('composer-input')).toBe(before);
    expect(handle!.editor!.getText()).toBe('half a sentence');
  });

  it('runs a terminal line on Enter and walks the history with the arrow keys', () => {
    const onShellCommand = vi.fn();
    render(<ModedComposer initial="terminal" onShellCommand={onShellCommand} />);
    const input = screen.getByTestId('composer-shell-input');

    fireEvent.change(input, { target: { value: 'ls -la' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onShellCommand).toHaveBeenCalledWith('ls -la');
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'npm test' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onShellCommand).toHaveBeenLastCalledWith('npm test');

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('npm test');
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('ls -la');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('npm test');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('');
  });

  it('leaves the prompt inert, not lying, when no shell is wired', () => {
    render(<ModedComposer initial="terminal" />);
    const input = screen.getByTestId('composer-shell-input');
    fireEvent.change(input, { target: { value: 'ls' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    // Nothing ran, so the line is still there to be sent another way.
    expect(input).toHaveValue('ls');
    expect(screen.getByTestId('composer-send')).toBeDisabled();
  });

  it('sends agent mode through the host’s own /agent command path', () => {
    const onSend = vi.fn();
    let handle: RichChatComposerHandle | null = null;
    render(
      <ModedComposer
        initial="agent"
        onSend={onSend}
        commands={[{ trigger: '/agent', label: 'Start an agent loop', hint: 'in a cloud computer · budgeted' }]}
        ref={(h: RichChatComposerHandle | null) => { handle = h; }}
      />,
    );
    typeInto(handle, 'create the sprint deck 200k');
    fireEvent.click(screen.getByTestId('composer-send'));

    const message = onSend.mock.calls[0]![0] as ComposedMessage;
    expect(message.text).toBe('/agent create the sprint deck 200k');
    expect(message.mode).toBe('agent');
    expect(message.command).toEqual({ trigger: '/agent' });
  });

  it('does not double the prefix when the command was typed out by hand', () => {
    const onSend = vi.fn();
    let handle: RichChatComposerHandle | null = null;
    render(<ModedComposer initial="agent" onSend={onSend} ref={(h: RichChatComposerHandle | null) => { handle = h; }} />);
    typeInto(handle, '/agent already prefixed');
    fireEvent.click(screen.getByTestId('composer-send'));
    expect((onSend.mock.calls[0]![0] as ComposedMessage).text).toBe('/agent already prefixed');
  });
});

describe('the hints row', () => {
  it('appears with the three default keys once modes are adopted', () => {
    const onQuickOpen = vi.fn();
    render(<ModedComposer onQuickOpen={onQuickOpen} />);
    const hints = screen.getByTestId('composer-hints');
    expect(hints).toHaveTextContent('for commands');
    expect(hints).toHaveTextContent('for shell');
    expect(hints).toHaveTextContent('to quickly open');

    fireEvent.click(within(hints).getByRole('button', { name: /quickly open/ }));
    expect(onQuickOpen).toHaveBeenCalledTimes(1);

    // The shell hint is the switch, so it cannot drift from the control above.
    fireEvent.click(within(hints).getByRole('button', { name: /for shell/ }));
    expect(screen.getByTestId('composer-shell-input')).toBeInTheDocument();
  });

  it('takes the host’s own list when it has one', () => {
    render(<RichChatComposer onSend={vi.fn()} data-testid="composer" hints={[{ key: '⇧↵', label: 'for a newline' }]} />);
    expect(screen.getByTestId('composer-hints')).toHaveTextContent('for a newline');
    expect(screen.getByTestId('composer-hints')).not.toHaveTextContent('for shell');
  });
});

describe('the split send', () => {
  it('keeps Send doing what it always did and puts the alternatives behind the caret', () => {
    const onSend = vi.fn();
    const onSendOption = vi.fn();
    let handle: RichChatComposerHandle | null = null;
    render(
      <RichChatComposer
        ref={(h) => { handle = h; }}
        onSend={onSend}
        data-testid="composer"
        sendOptions={[{ id: 'agent', label: 'Send as agent task' }, { id: 'shell', label: 'Run in shell' }]}
        onSendOption={onSendOption}
      />,
    );
    typeInto(handle, 'ship it');
    fireEvent.click(screen.getByTestId('composer-send'));
    expect(onSend).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('composer-send-options'));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Run in shell' }));
    expect(onSendOption).toHaveBeenCalledWith('shell');
    // Choosing an alternative is the host's business; the draft is not cleared
    // out from under it.
    expect(onSend).toHaveBeenCalledTimes(1);
  });

  it('the caret half follows Send: secondary while Send is dimmed for an empty draft, primary once there is text', () => {
    const onSendOption = vi.fn();
    let handle: RichChatComposerHandle | null = null;
    render(
      <RichChatComposer
        ref={(h) => { handle = h; }}
        onSend={vi.fn()}
        data-testid="composer"
        sendOptions={[{ id: 'agent', label: 'Send as agent task' }]}
        onSendOption={onSendOption}
      />,
    );
    const send = screen.getByTestId('composer-send') as HTMLButtonElement;
    const caret = screen.getByTestId('composer-send-options');
    expect(send.disabled).toBe(true);
    // Not a saturated primary block beside a dimmed Send…
    expect(caret.className).not.toContain('bg-primary');
    expect(caret.className).toContain('text-text-secondary');
    // …but still a working menu: its options switch the mode and need no text.
    fireEvent.click(caret);
    fireEvent.click(screen.getByRole('menuitem', { name: 'Send as agent task' }));
    expect(onSendOption).toHaveBeenCalledWith('agent');

    typeInto(handle, 'ship it');
    expect(send.disabled).toBe(false);
    expect(screen.getByTestId('composer-send-options').className).toContain('bg-primary');
  });
});

describe('the composer goes to the console in Agent and Terminal mode', () => {
  it('is untouched in chat mode and mounts no backdrop', () => {
    render(<ModedComposer />);
    const composer = screen.getByTestId('composer');
    expect(composer).toHaveAttribute('data-mode', 'chat');
    expect(composer).not.toHaveAttribute('data-console');
    expect(composer).not.toHaveAttribute('data-theme');
    expect(composer.className).not.toContain('uic-chat-console');
    expect(screen.queryByTestId('composer-console-backdrop')).toBeNull();
  });

  it('flips to the dark console surface when the mode switch moves, and back', () => {
    render(<ModedComposer />);
    const composer = screen.getByTestId('composer');

    fireEvent.click(within(screen.getByTestId('composer-modes')).getByRole('tab', { name: 'Agent' }));
    expect(composer).toHaveAttribute('data-console', 'true');
    // The two hooks that carry the whole look: the per-subtree theme switch
    // from styles.css, and the class that makes the panels transparent so the
    // star field reads through them.
    expect(composer).toHaveAttribute('data-theme', 'dark');
    expect(composer.className).toContain('uic-chat-console');
    expect(screen.getByTestId('composer-console-backdrop')).toBeInTheDocument();

    fireEvent.click(within(screen.getByTestId('composer-modes')).getByRole('tab', { name: 'Terminal' }));
    expect(composer).toHaveAttribute('data-console', 'true');
    expect(composer).toHaveAttribute('data-mode', 'terminal');

    fireEvent.click(within(screen.getByTestId('composer-modes')).getByRole('tab', { name: 'Chat' }));
    expect(composer).not.toHaveAttribute('data-console');
    expect(composer).not.toHaveAttribute('data-theme');
  });

  it('never clips the box: the backdrop is clipped, the composer is not', () => {
    render(<ModedComposer initial="agent" />);
    // `overflow-hidden` on the composer itself would cut off the send
    // split-menu and every suggestion popover, all of which are its children.
    expect(screen.getByTestId('composer').className).not.toContain('overflow-hidden');
    expect(screen.getByTestId('composer-console').className).toContain('overflow-hidden');
  });
});

describe('placeholder text changes without a mode change', () => {
  it('redecorates the empty editor with the new text', async () => {
    const { rerender, container } = render(<RichChatComposer onSend={() => true} placeholder="Tell the agent what to change on slide 1…" />);
    await act(async () => { await Promise.resolve(); });
    const text = () => container.querySelector('[data-placeholder]')?.getAttribute('data-placeholder');
    expect(text()).toBe('Tell the agent what to change on slide 1…');
    rerender(<RichChatComposer onSend={() => true} placeholder="Tell the agent what to change on slide 3…" />);
    await act(async () => { await Promise.resolve(); });
    expect(text()).toBe('Tell the agent what to change on slide 3…');
  });
});

describe('RichChatComposer `modes` limits what is offered', () => {
  it('draws only the offered tabs and drops the shell hint', () => {
    render(<ModedComposer modes={['chat', 'agent']} />);
    const tabs = screen.getAllByRole('tab').map((t) => t.textContent);
    expect(tabs).toEqual(['Chat', 'Agent']);
    expect(screen.getByTestId('composer-hints').textContent).not.toContain('for shell');
  });

  it('keeps `>` as ordinary text and renders a stale terminal mode as Chat', () => {
    const onModeChange = vi.fn();
    let handle: RichChatComposerHandle | null = null;
    render(<ModedComposer ref={(h) => { handle = h; }} modes={['chat', 'agent']} modeTriggers initial="terminal" onModeChange={onModeChange} />);
    expect(screen.queryByTestId('composer-shell-input')).toBeNull();
    expect(screen.getByRole('tab', { name: /Chat/ })).toHaveAttribute('aria-selected', 'true');
    typeInto(handle, '>');
    expect(onModeChange).not.toHaveBeenCalledWith('terminal');
    expect(handle!.editor?.getText()).toBe('>');
  });

  it('still offers all three by default', () => {
    render(<ModedComposer />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByTestId('composer-hints').textContent).toContain('for shell');
  });
});
