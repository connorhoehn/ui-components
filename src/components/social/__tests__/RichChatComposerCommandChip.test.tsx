// The docked card (modeControl="menu") names an active command as a chip on
// its own line under the mode row — "/workflow ⟡ migration-plan" — and the
// picked argument replaces the command's label while it is intact in the
// draft (2.385.0). Other mode controls keep the tinted strip.
import { createRef, useState } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer, type RichChatComposerHandle, type RichChatDraft } from '../RichChatComposer';
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

// 2.407.41 — realtime-examples' DM composer (a ContextComposer: the docked
// editor card) showed "/doc Edit the open document with Haiku" as the inline
// chip — the command's LABEL, which read as the previous instruction — beside a
// still-visible "/doc make sure…": the trigger twice. The chip names only what
// the input hides: the trigger and a picked argument.
describe('the docked card chip names what the input hides (2.407.41)', () => {
  const doc: ComposerCommand = { trigger: '/doc', label: 'Edit the open document with Haiku', hint: 'Runs as a pipeline' };
  const docked = { ...base, mode: 'chat' as const, toolbar: 'editor' as const, commands: [doc, workflow] };

  function host(initial: RichChatDraft | undefined, onSend = vi.fn()) {
    const ref = createRef<RichChatComposerHandle>();
    const drafts: Array<RichChatDraft | undefined> = [];
    function Host() {
      const [draft, setDraft] = useState(initial);
      return <RichChatComposer {...docked} ref={ref} onSend={onSend} draft={draft} onDraftChange={(next) => { drafts.push(next); setDraft(next); }} />;
    }
    render(<Host />);
    const type = (text: string) => act(() => { ref.current!.editor!.chain().focus('end').insertContent(text).run(); });
    return { ref, drafts, type, onSend };
  }
  const hidden = () => screen.getByTestId('composer-input').querySelector('[data-command-prefix]');

  it('a bare command: the chip is the trigger alone, the trigger hides in the input, never the label', () => {
    const { type } = host(undefined);
    type('/doc make sure to add your basic recipe style');
    const chip = screen.getByTestId('composer-command');
    expect(chip).toHaveAttribute('data-command-chip', 'inline');
    expect(chip.textContent).toBe('/doc');
    expect(chip).not.toHaveTextContent('Edit the open document with Haiku');
    expect(chip).toHaveAttribute('title', 'Runs as a pipeline');
    expect(hidden()?.textContent).toBe('/doc ');
    // The draft still carries the command for the host.
    expect(screen.getByTestId('composer-input').textContent).toBe('/doc make sure to add your basic recipe style');
  });

  it('the trigger alone stays visible, with no chip, until the space after it — then one hides and the chip names it', () => {
    const { type, drafts } = host(undefined);
    type('/doc');
    // Hiding the whole line would leave the caret nowhere to type (2.403.1).
    expect(hidden()).toBeNull();
    expect(screen.queryByTestId('composer-command')).toBeNull();
    expect(screen.getByTestId('composer-input').textContent).toBe('/doc');
    type(' ');
    expect(hidden()?.textContent).toBe('/doc');
    expect(screen.getByTestId('composer-command').textContent).toBe('/doc');
    type('make sure');
    expect(drafts.at(-1)).toMatchObject({ html: '<p>/doc make sure</p>', command: { trigger: '/doc' } });
  });

  it('send clears the command: no chip, no hidden prefix, the published draft has no command', () => {
    const { type, drafts, onSend } = host(undefined);
    type('/doc Edit the open document please');
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(onSend).toHaveBeenCalledWith(expect.objectContaining({ command: { trigger: '/doc' }, text: '/doc Edit the open document please' }));
    expect(screen.queryByTestId('composer-command')).toBeNull();
    expect(hidden()).toBeNull();
    expect(drafts.at(-1)).toMatchObject({ html: '', files: [] });
    expect(drafts.at(-1)!.command).toBeUndefined();
  });

  it('a second typed trigger after a send is one chip and one hidden trigger, nothing left of the first', () => {
    const { type } = host(undefined);
    type('/doc Edit the open document please');
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    type('/doc make sure to add your basic recipe style');
    expect(screen.getAllByTestId('composer-command')).toHaveLength(1);
    expect(screen.getByTestId('composer-command').textContent).toBe('/doc');
    const input = screen.getByTestId('composer-input');
    expect(input.textContent).toBe('/doc make sure to add your basic recipe style');
    expect(input.textContent!.match(/\/doc/g)).toHaveLength(1);
    expect(hidden()?.textContent).toBe('/doc ');
  });

  it('a draft whose text does not start with the trigger has no chip, whatever its stored command says', () => {
    host({ html: '<p>make sure to add your basic recipe style</p>', files: [], command: { trigger: '/doc' } });
    expect(screen.queryByTestId('composer-command')).toBeNull();
    expect(hidden()).toBeNull();
  });

  it('a controlled draft with a stale command pick is reconciled against its text', () => {
    const { drafts, type } = host({ html: '<p>/doc tidy up</p>', files: [], command: { trigger: '/workflow', argument: { id: 'migration-plan', label: 'migration-plan' } } });
    const chip = screen.getByTestId('composer-command');
    expect(chip.textContent).toBe('/doc');
    expect(screen.queryByTestId('composer-command-argument')).toBeNull();
    type(' now');
    expect(drafts.at(-1)!.command).toEqual({ trigger: '/doc' });
  });
});

describe('typed command prefixes outside the editor toolbar', () => {
  it('a recognized typed trigger is visually replaced without losing its execution text', () => {
    const ref = createRef<RichChatComposerHandle>(), onSend = vi.fn();
    render(<RichChatComposer {...base} ref={ref} mode="chat" toolbar="compact" onSend={onSend} commands={[{ trigger: '/doc', label: 'Document' }]} />);
    act(() => { ref.current!.editor!.chain().focus('end').insertContent('/doc summarize the notes').run(); });
    expect(screen.getByTestId('composer-input').querySelector('[data-command-prefix]')?.textContent).toBe('/doc ');
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(onSend).toHaveBeenCalledWith(expect.objectContaining({ text: '/doc summarize the notes', command: { trigger: '/doc' } }));
  });
});
