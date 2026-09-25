// The prompt card (toolbar="prompt", 2.390.0): the docked card with no
// formatting strip — a host mode select at the head, `/ Commands` and
// `# Context` at the foot with the host's extras, "⌘ Return to send" and a
// round Send — whose command chip switches commands, and whose `#` menu can
// be the grouped "Add context" card.
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer, type RichChatComposerHandle } from '../RichChatComposer';
import { DocumentSuggestions } from '../DocumentSuggestions';
import type { ComposerCommand } from '../composerCommands';

afterEach(cleanup);

const commands: ComposerCommand[] = [
  { trigger: '/adjust', label: 'Adjust light and color' },
  { trigger: '/crop', label: 'Crop and straighten' },
];

const base = {
  onSend: () => {},
  'data-testid': 'composer',
  layout: 'wide',
  mode: 'agent',
  modeControl: 'menu',
  onModeChange: () => {},
  hideModeMenu: true,
  toolbar: 'prompt',
  commands,
  onSearchDocuments: () => [],
  onDraftChange: () => {},
} as const;

describe('prompt card', () => {
  it('draws the head and foot from the mockup, with no formatting strip', () => {
    render(
      <RichChatComposer
        {...base}
        sendShortcut="mod-enter"
        modeRowStart={<span data-testid="assistant-select">Assistant</span>}
        modeRowEnd={<span data-testid="image-button">img</span>}
        references={[{ id: 'photo', label: 'This photo' }]}
        onRemoveReference={() => {}}
        toolbarExtras={<span data-testid="mic">mic</span>}
      />,
    );
    const modes = screen.getByTestId('composer-modes');
    expect(modes.firstElementChild).toContainElement(screen.getByTestId('assistant-select'));
    expect(screen.getByTestId('composer-references')).toHaveTextContent('This photo');
    expect(screen.queryByRole('button', { name: 'Bold' })).toBeNull();
    expect(screen.getByTestId('composer-commands-button')).toHaveTextContent('Commands');
    expect(screen.getByTestId('composer-context-button')).toHaveTextContent('Context');
    expect(screen.getByTestId('composer-prompt-end')).toContainElement(screen.getByTestId('mic'));
    expect(screen.getByTestId('composer-send-hint')).toHaveTextContent('⌘ Return to send');
    expect(screen.getByTestId('composer-send')).toHaveClass('rounded-full');
    expect(screen.queryByTestId('composer-commands-hint')).toBeNull();
  });

  it('hides a bare command in the text and names it as a switchable chip', () => {
    render(<RichChatComposer {...base} draft={{ html: '<p>/adjust Lift the shadows</p>', files: [] }} />);
    const chip = screen.getByTestId('composer-command');
    expect(chip).toHaveTextContent('/adjust');
    expect(screen.getByTestId('composer-command-switch')).toBeInTheDocument();
    const hidden = document.querySelector('[data-command-prefix]');
    expect(hidden?.textContent).toContain('/adjust');
  });

  it('switching the command rewrites the leading trigger', async () => {
    const onDraftChange = vi.fn();
    render(<RichChatComposer {...base} onDraftChange={onDraftChange} draft={{ html: '<p>/adjust Lift the shadows</p>', files: [] }} />);
    fireEvent.click(screen.getByTestId('composer-command-switch'));
    fireEvent.click(await screen.findByText('/crop'));
    const last = onDraftChange.mock.calls.at(-1)?.[0];
    expect(last.html).toContain('/crop Lift the shadows');
  });

  it('mod-enter: Enter does not send, ⌘Enter does', () => {
    const onSend = vi.fn();
    const ref = createRef<RichChatComposerHandle>();
    render(<RichChatComposer {...base} ref={ref} onSend={onSend} sendShortcut="mod-enter" draft={{ html: '<p>/adjust Lift the shadows</p>', files: [] }} />);
    const input = screen.getByTestId('composer-input');
    act(() => { fireEvent.keyDown(input, { key: 'Enter' }); });
    expect(onSend).not.toHaveBeenCalled();
    act(() => { fireEvent.keyDown(input, { key: 'Enter', ctrlKey: true }); });
    expect(onSend).toHaveBeenCalledTimes(1);
  });
});

describe('the Add context card', () => {
  it('shows the title, the typed query, groups and the keys', () => {
    const onClear = vi.fn();
    render(
      <DocumentSuggestions
        panel={{}}
        query="pe"
        onClearQuery={onClear}
        command={() => {}}
        items={[
          { id: 'people', label: 'People', hint: '2 subjects', group: 'Masks in this photo' },
          { id: 'left', label: 'Person on left', hint: 'Subject mask', group: 'Masks in this photo' },
          { id: 'p2', label: 'L1040607', hint: 'Photo', group: 'Other photos' },
        ]}
      />,
    );
    expect(screen.getByTestId('document-suggestions-title')).toHaveTextContent('Add context');
    expect(screen.getByTestId('document-suggestions-search')).toHaveTextContent('#pe');
    expect(screen.getAllByTestId('document-suggestions-group').map((g) => g.textContent)).toEqual(['Masks in this photo', 'Other photos']);
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('document-suggestions-keys')).toHaveTextContent('Choose');
    fireEvent.mouseDown(screen.getByTestId('document-suggestions-clear'));
    expect(onClear).toHaveBeenCalled();
  });
});
