import { useState } from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  RichChatComposer,
  matchesModeTrigger,
  type ComposerMode,
  type RichChatComposerHandle,
  type RichChatComposerProps,
} from '../RichChatComposer';

afterEach(cleanup);

/**
 * Replaces the draft with `text` as typed characters. `insertContent` with a
 * plain string keeps a trailing space (`/run `), which `setContent('<p>…</p>')`
 * would collapse away as HTML whitespace.
 */
function typeInto(handle: RichChatComposerHandle | null, text: string) {
  act(() => {
    handle?.editor?.chain().clearContent(true).insertContent(text).run();
  });
}

type HostProps = Partial<RichChatComposerProps> & { initial?: ComposerMode; onMode?: (m: ComposerMode) => void; handleRef?: (h: RichChatComposerHandle | null) => void };

/** A host that owns the mode, as every consumer of this feature does. */
function Host({ initial = 'chat', onMode, handleRef, ...rest }: HostProps) {
  const [mode, setMode] = useState<ComposerMode>(initial);
  return (
    <RichChatComposer
      ref={handleRef}
      onSend={vi.fn()}
      data-testid="composer"
      modeControl="compact"
      {...rest}
      mode={mode}
      onModeChange={(next) => { setMode(next); onMode?.(next); }}
    />
  );
}

const editorEl = () => screen.getByTestId('composer-input');
const option = (el: Element, digit: 1 | 2 | 3) =>
  fireEvent.keyDown(el, { key: ['¡', '™', '£'][digit - 1], code: `Digit${digit}`, altKey: true });

describe('compact mode control', () => {
  it('replaces the three large tabs with a label, 1 2 3 and the current shortcut', () => {
    render(<Host modeShortcuts />);
    expect(screen.queryByRole('tab')).toBeNull();
    expect(screen.getByTestId('composer-modes')).toHaveAttribute('data-mode-control', 'compact');
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Chat');
    const group = screen.getByRole('group', { name: 'Composer mode' });
    const buttons = within(group).getAllByRole('button');
    expect(buttons.map((b) => b.textContent)).toEqual(['1', '2', '3']);
    expect(buttons.map((b) => b.getAttribute('aria-label'))).toEqual(['Chat', 'Agent', 'Terminal']);
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(buttons[0]).toHaveAttribute('aria-keyshortcuts', 'Alt+1');
    expect(screen.getByTestId('composer-mode-kbd')).toHaveTextContent('⌥1');
  });

  it('switches mode from its buttons', () => {
    const onMode = vi.fn();
    render(<Host onMode={onMode} />);
    fireEvent.click(screen.getByRole('button', { name: 'Agent' }));
    expect(onMode).toHaveBeenCalledWith('agent');
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Agent');
    expect(screen.getByRole('button', { name: 'Agent' })).toHaveAttribute('aria-pressed', 'true');
    // No shortcut advertised when shortcuts are off.
    expect(screen.queryByTestId('composer-mode-kbd')).toBeNull();
  });

  it('keeps the default tabs for a host that does not opt in', () => {
    render(<RichChatComposer onSend={vi.fn()} data-testid="composer" mode="chat" onModeChange={vi.fn()} />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.queryByTestId('composer-mode-label')).toBeNull();
  });
});

describe('Option-1/2/3', () => {
  it('flips the mode from inside the editor and moves the caret to the new input', () => {
    render(<Host modeShortcuts />);
    option(editorEl(), 2);
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Agent');
    option(editorEl(), 3);
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Terminal');
    const shell = screen.getByTestId('composer-shell-input');
    expect(document.activeElement).toBe(shell);
    // …and back from the shell line.
    option(shell, 1);
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Chat');
  });

  it('prevents the character Option-digit would have typed', () => {
    render(<Host modeShortcuts />);
    const notPrevented = option(editorEl(), 2);
    expect(notPrevented).toBe(false);
  });

  it('does not fire when focus is outside the composer', () => {
    const onMode = vi.fn();
    render(
      <>
        <input aria-label="Elsewhere" />
        <Host modeShortcuts onMode={onMode} />
      </>,
    );
    const elsewhere = screen.getByRole('textbox', { name: 'Elsewhere' });
    elsewhere.focus();
    expect(option(elsewhere, 2)).toBe(true);
    option(document.body, 3);
    expect(onMode).not.toHaveBeenCalled();
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Chat');
  });

  it('is off unless modeShortcuts is set, and ignores Ctrl/Cmd combinations', () => {
    const onMode = vi.fn();
    const { unmount } = render(<Host onMode={onMode} />);
    option(editorEl(), 2);
    expect(onMode).not.toHaveBeenCalled();
    unmount();
    render(<Host modeShortcuts onMode={onMode} />);
    fireEvent.keyDown(editorEl(), { code: 'Digit2', altKey: true, metaKey: true });
    fireEvent.keyDown(editorEl(), { code: 'Digit2', altKey: false });
    expect(onMode).not.toHaveBeenCalled();
  });

  it('does nothing on a pinned (fixedMode) composer', () => {
    const onModeChange = vi.fn();
    render(<RichChatComposer onSend={vi.fn()} data-testid="composer" fixedMode="agent" onModeChange={onModeChange} modeShortcuts />);
    option(editorEl(), 3);
    expect(onModeChange).not.toHaveBeenCalled();
  });
});

describe('prefix triggers', () => {
  it('typing `>` in chat mode yields terminal mode with an empty draft', () => {
    let handle: RichChatComposerHandle | null = null;
    const onDraftChange = vi.fn();
    render(<Host modeTriggers handleRef={(h) => { handle = h; }} onDraftChange={onDraftChange} />);
    typeInto(handle, '>');
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Terminal');
    expect(handle!.editor!.isEmpty).toBe(true);
    expect(onDraftChange.mock.calls.at(-1)?.[0].html).toBe('');
    expect(document.activeElement).toBe(screen.getByTestId('composer-shell-input'));
  });

  it('`/run ` yields agent mode with the prefix consumed', () => {
    let handle: RichChatComposerHandle | null = null;
    render(<Host modeTriggers handleRef={(h) => { handle = h; }} />);
    typeInto(handle, '/run ');
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Agent');
    expect(handle!.editor!.isEmpty).toBe(true);
  });

  it('leaves `/run` alone until its space, and never touches a longer word or a sentence', () => {
    let handle: RichChatComposerHandle | null = null;
    render(<Host modeTriggers handleRef={(h) => { handle = h; }} />);
    for (const text of ['/run', '/running', 'a > b', '>>']) {
      typeInto(handle, text);
      expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Chat');
      expect(handle!.editor!.getText()).toBe(text);
    }
  });

  it('honours custom prefixes', () => {
    let handle: RichChatComposerHandle | null = null;
    render(<Host modeTriggers={{ terminalPrefix: '$', agentPrefix: '/do' }} handleRef={(h) => { handle = h; }} />);
    typeInto(handle, '>');
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Chat');
    typeInto(handle, '/do ');
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Agent');
    typeInto(handle, '$');
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Terminal');
  });

  it('is off unless modeTriggers is set', () => {
    let handle: RichChatComposerHandle | null = null;
    render(<Host handleRef={(h) => { handle = h; }} />);
    typeInto(handle, '>');
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Chat');
    expect(handle!.editor!.getText()).toBe('>');
  });

  it('matchesModeTrigger: symbol prefixes match alone, word prefixes need their space', () => {
    expect(matchesModeTrigger('>', '>')).toBe(true);
    expect(matchesModeTrigger('> ', '>')).toBe(true);
    expect(matchesModeTrigger('/run', '/run')).toBe(false);
    expect(matchesModeTrigger('/run ', '/run')).toBe(true);
    expect(matchesModeTrigger('/run ', '/run')).toBe(true);
    expect(matchesModeTrigger('/run it', '/run')).toBe(false);
    expect(matchesModeTrigger('', '')).toBe(false);
  });
});

describe('a mode the host cannot serve', () => {
  const reasons = { terminal: 'Start an agent task first' };

  it('disables its button and explains why', () => {
    render(<Host modeShortcuts disabledModes={['terminal']} modeUnavailableReasons={reasons} />);
    const terminal = screen.getByRole('button', { name: 'Terminal' });
    expect(terminal).toBeDisabled();
    expect(terminal.getAttribute('title')).toContain('Start an agent task first');
  });

  it('refuses Option-3 with the reason instead of switching', () => {
    const onMode = vi.fn();
    render(<Host modeShortcuts disabledModes={['terminal']} modeUnavailableReasons={reasons} onMode={onMode} />);
    option(editorEl(), 3);
    expect(onMode).not.toHaveBeenCalled();
    expect(screen.getByTestId('composer-mode-notice')).toHaveTextContent('Start an agent task first');
    option(editorEl(), 2);
    expect(screen.queryByTestId('composer-mode-notice')).toBeNull();
  });

  it('keeps a refused `>` as typed text and clears the notice on the next edit', () => {
    let handle: RichChatComposerHandle | null = null;
    render(<Host modeTriggers disabledModes={['terminal']} modeUnavailableReasons={reasons} handleRef={(h) => { handle = h; }} />);
    typeInto(handle, '>');
    expect(screen.getByTestId('composer-mode-label')).toHaveTextContent('Chat');
    expect(handle!.editor!.getText()).toBe('>');
    expect(screen.getByTestId('composer-mode-notice')).toHaveTextContent('Start an agent task first');
    typeInto(handle, '> ls');
    expect(screen.queryByTestId('composer-mode-notice')).toBeNull();
  });

  it('has a default reason', () => {
    render(<Host modeShortcuts disabledModes={['agent']} />);
    option(editorEl(), 2);
    expect(screen.getByTestId('composer-mode-notice')).toHaveTextContent('Agent is not available here');
  });
});

describe('per-mode hints, submit label and submit lead', () => {
  it('shows the hint row for the active mode', () => {
    render(
      <Host
        modeHints={{
          chat: [{ key: '/', label: 'for commands' }],
          agent: [{ key: '/run', label: 'start work' }],
        }}
      />,
    );
    expect(screen.getByTestId('composer-hints')).toHaveTextContent('for commands');
    fireEvent.click(screen.getByRole('button', { name: 'Agent' }));
    expect(screen.getByTestId('composer-hints')).toHaveTextContent('start work');
  });

  it('labels Send per mode', () => {
    render(<Host submitLabel={{ agent: 'Start', terminal: 'Run' }} />);
    expect(screen.getByTestId('composer-send')).toHaveTextContent('Send');
    fireEvent.click(screen.getByRole('button', { name: 'Agent' }));
    expect(screen.getByTestId('composer-send')).toHaveTextContent('Start');
  });

  it('takes one label for every mode', () => {
    render(<RichChatComposer onSend={vi.fn()} data-testid="composer" submitLabel="Post" />);
    expect(screen.getByTestId('composer-send')).toHaveTextContent('Post');
  });

  it('puts the lead slot before Send and moves the right-alignment onto it', () => {
    render(<RichChatComposer onSend={vi.fn()} data-testid="composer" submitLead={<button type="button">Presentation skill</button>} />);
    const lead = screen.getByTestId('composer-submit-lead');
    const send = screen.getByTestId('composer-send');
    expect(within(lead).getByRole('button', { name: 'Presentation skill' })).toBeInTheDocument();
    expect(lead.compareDocumentPosition(send) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(lead.className).toContain('ml-auto');
    expect(send.className).not.toContain('ml-auto');
  });

  it('leaves the toolbar row exactly as before without a lead', () => {
    render(<RichChatComposer onSend={vi.fn()} data-testid="composer" />);
    expect(screen.queryByTestId('composer-submit-lead')).toBeNull();
    expect(screen.getByTestId('composer-send')).toHaveAttribute(
      'class',
      'ml-auto shrink-0 rounded bg-primary font-semibold text-on-primary disabled:opacity-40 px-2.5 py-1 text-xs',
    );
  });
});
