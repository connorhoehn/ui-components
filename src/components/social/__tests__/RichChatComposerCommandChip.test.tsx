// The docked card (modeControl="menu") names an active command as a chip on
// its own line under the mode row — "/workflow ⟡ migration-plan" — and the
// picked argument replaces the command's label while it is intact in the
// draft (2.385.0). Other mode controls keep the tinted strip.
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';
import type { ComposerCommand } from '../composerCommands';

afterEach(cleanup);

const workflow: ComposerCommand = {
  trigger: '/workflow',
  label: 'Choose a workflow',
  icon: <span data-testid="wf-icon">⑂</span>,
  argument: { placeholder: 'which pipeline', search: () => [{ id: 'migration-plan', label: 'migration-plan', icon: '⟡' }] },
};

const base = {
  onSend: () => {},
  'data-testid': 'composer',
  layout: 'wide',
  mode: 'agent',
  modeControl: 'menu',
  onModeChange: () => {},
  commands: [workflow] as ComposerCommand[],
  onDraftChange: () => {},
} as const;

describe('command chip in the docked card', () => {
  it('shows the picked argument after the trigger, below the mode row', () => {
    render(
      <RichChatComposer
        {...base}
        draft={{ html: '<p>/workflow migration-plan Remove the bridge</p>', files: [], command: { trigger: '/workflow', argument: { id: 'migration-plan', label: 'migration-plan', icon: '⟡' } } }}
      />,
    );
    const chip = screen.getByTestId('composer-command');
    expect(chip).toHaveAttribute('data-command-chip', 'true');
    expect(chip).toHaveTextContent('/workflow');
    expect(screen.getByTestId('composer-command-argument')).toHaveTextContent('migration-plan');
    expect(chip).not.toHaveTextContent('Choose a workflow');
    expect(screen.getByTestId('wf-icon')).toBeInTheDocument();
    const modes = screen.getByTestId('composer-modes');
    expect(modes.compareDocumentPosition(chip) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('the editor dock puts the chip at the start of the instruction line (2.386.0)', () => {
    render(
      <RichChatComposer
        {...base}
        toolbar="editor"
        draft={{ html: '<p>/workflow migration-plan Remove the bridge</p>', files: [], command: { trigger: '/workflow', argument: { id: 'migration-plan', label: 'migration-plan', icon: '⟡' } } }}
      />,
    );
    const chip = screen.getByTestId('composer-command');
    expect(chip).toHaveAttribute('data-command-chip', 'inline');
    const line = screen.getByTestId('composer-input-line');
    expect(line).toContainElement(chip);
    expect(line).toContainElement(screen.getByTestId('composer-input'));
    expect(chip).toHaveTextContent('/workflow');
    expect(screen.getByTestId('composer-command-argument')).toHaveTextContent('migration-plan');
  });

  it('with no argument yet, the chip says what to pick', () => {
    render(<RichChatComposer {...base} draft={{ html: '<p>/workflow </p>', files: [] }} />);
    expect(screen.getByTestId('composer-command-placeholder')).toHaveTextContent('which pipeline');
  });

  it('other mode controls keep the strip', () => {
    render(<RichChatComposer {...base} modeControl="tabs" draft={{ html: '<p>/workflow </p>', files: [] }} />);
    expect(screen.getByTestId('composer-command')).not.toHaveAttribute('data-command-chip');
  });

  it('hides the command line the chip names, keeping it in the draft (2.385.4)', () => {
    const onDraftChange = vi.fn();
    const html = '<p>/workflow migration-plan Remove the bridge</p>';
    render(
      <RichChatComposer
        {...base}
        onDraftChange={onDraftChange}
        draft={{ html, files: [], command: { trigger: '/workflow', argument: { id: 'migration-plan', label: 'migration-plan', icon: '⟡' } } }}
      />,
    );
    const input = screen.getByTestId('composer-input');
    const hidden = input.querySelector('[data-command-prefix]')!;
    expect(hidden).not.toBeNull();
    expect(hidden.getAttribute('data-command-prefix')).toBe('inline');
    expect(hidden).toHaveClass('hidden');
    expect(hidden.textContent).toBe('/workflow migration-plan ');
    // The words stay in the editor, and nothing was rewritten for the host.
    expect(input.textContent).toBe('/workflow migration-plan Remove the bridge');
    expect(onDraftChange).not.toHaveBeenCalled();
  });

  it('Backspace right after the hidden command removes the whole command, chip and all', () => {
    const onDraftChange = vi.fn();
    render(
      <RichChatComposer
        {...base}
        onDraftChange={onDraftChange}
        draft={{ html: '<p>/workflow migration-plan </p>', files: [], command: { trigger: '/workflow', argument: { id: 'migration-plan', label: 'migration-plan' } } }}
      />,
    );
    fireEvent.keyDown(screen.getByTestId('composer-input'), { key: 'Backspace' });
    expect(screen.queryByTestId('composer-command')).toBeNull();
    const last = onDraftChange.mock.calls.at(-1)![0];
    expect(last.html).toBe('');
    expect(last.command).toBeUndefined();
  });

  it('a host-written command paragraph hides whole, leaving the instruction lines', () => {
    render(
      <RichChatComposer
        {...base}
        draft={{ html: '<p>/workflow migration-plan</p><p>Create a short deck.</p>', files: [], command: { trigger: '/workflow', argument: { id: 'migration-plan', label: 'migration-plan' } } }}
      />,
    );
    const input = screen.getByTestId('composer-input');
    const first = input.querySelector('p')!;
    expect(first.getAttribute('data-command-prefix')).toBe('block');
    expect(first).toHaveClass('hidden');
    expect(input.querySelectorAll('p')[1]!.textContent).toBe('Create a short deck.');
  });

  it('shows the typed command until an argument is picked, and outside menu mode', () => {
    const { unmount } = render(<RichChatComposer {...base} draft={{ html: '<p>/workflow </p>', files: [] }} />);
    expect(screen.getByTestId('composer-input').querySelector('[data-command-prefix]')).toBeNull();
    unmount();
    render(
      <RichChatComposer
        {...base}
        modeControl="tabs"
        draft={{ html: '<p>/workflow migration-plan Go</p>', files: [], command: { trigger: '/workflow', argument: { id: 'migration-plan', label: 'migration-plan' } } }}
      />,
    );
    expect(screen.getByTestId('composer-input').querySelector('[data-command-prefix]')).toBeNull();
  });
});
