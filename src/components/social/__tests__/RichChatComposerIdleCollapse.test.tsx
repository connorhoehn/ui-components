// `collapseWhenIdle`: an empty composer with the caret elsewhere is ONE row —
// mode pill, input, Send — so a canvas above a pinned dock keeps the height.
// Focus in the input, words in it, or a status brings the full composer back.
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';

afterEach(cleanup);

const modes = {
  onSend: () => {},
  'data-testid': 'composer',
  layout: 'wide',
  density: 'compact',
  mode: 'agent',
  onModeChange: () => {},
  modeControl: 'compact',
  collapseWhenIdle: true,
} as const;

const input = () => document.querySelector('[data-testid=composer] .ProseMirror') as HTMLElement;

describe('collapseWhenIdle', () => {
  it('idle: pill, input and Send only — no toolbar, mode row or submit lead', () => {
    render(
      <RichChatComposer
        {...modes}
        modeRowEnd={<span data-testid="scope">scope</span>}
        submitLead={<span data-testid="lead">Deck actions</span>}
        suggestions={['Tighten the bullets']}
        onSuggestion={() => {}}
      />,
    );
    const root = screen.getByTestId('composer');
    expect(root).toHaveAttribute('data-collapsed', 'true');
    expect(screen.getByTestId('composer-mode-pill')).toHaveTextContent('Agent');
    expect(screen.getByTestId('composer-send')).toBeInTheDocument();
    expect(screen.queryByTestId('composer-format-toolbar')).toBeNull();
    expect(screen.queryByTestId('composer-modes')).toBeNull();
    expect(screen.queryByTestId('scope')).toBeNull();
    expect(screen.queryByTestId('lead')).toBeNull();
    expect(screen.queryByTestId('composer-references')).toBeNull();
    expect(screen.queryByTestId('composer-hints-toggle')).toBeNull();
  });

  // Regression (2.373.0): a "Reference in chat" chip was invisible until the
  // box was focused. A reference is part of the draft — it shows while idle.
  it('references stay visible in the idle row, removable, beside the pill', async () => {
    const onRemoveReference = vi.fn();
    render(
      <RichChatComposer
        {...modes}
        references={[{ id: 'work-1', label: 'Sprint review' }]}
        onRemoveReference={onRemoveReference}
      />,
    );
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'true');
    const refs = screen.getByTestId('composer-references');
    expect(refs).toHaveTextContent('Sprint review');
    // In the one row (the body), not a row of its own above it.
    expect(screen.getByTestId('composer-body')).toContainElement(refs);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Sprint review from this draft' }));
    expect(onRemoveReference).toHaveBeenCalledWith('work-1');
    // One copy when expanded, too.
    await act(async () => { input().focus(); fireEvent.focusIn(input()); });
    expect(screen.getAllByTestId('composer-references')).toHaveLength(1);
  });

  it('references show in the idle row without modes (a DM composer)', () => {
    render(
      <RichChatComposer
        onSend={() => {}}
        data-testid="composer"
        layout="wide"
        collapseWhenIdle
        references={[{ id: 'work-1', label: 'Sprint review' }]}
      />,
    );
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'true');
    expect(screen.getByTestId('composer-references')).toHaveTextContent('Sprint review');
  });

  it('a staged attachment keeps the full composer and shows the file', () => {
    const file = new File(['x'], 'notes.txt', { type: 'text/plain' });
    render(<RichChatComposer {...modes} draft={{ html: '', files: [file] }} onDraftChange={() => {}} />);
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'false');
    expect(screen.getByText('notes.txt')).toBeInTheDocument();
  });

  it('a pending command keeps the full composer', () => {
    render(
      <RichChatComposer
        {...modes}
        commands={[{ trigger: '/deck', label: 'Deck', hint: 'make a deck' }]}
        onCommand={() => {}}
        draft={{ html: '<p>/deck </p>', files: [] }}
      />,
    );
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'false');
  });

  it('expands when the input takes focus and collapses again when focus leaves an empty box', async () => {
    render(<RichChatComposer {...modes} submitLead={<span data-testid="lead">Deck actions</span>} />);
    await act(async () => { input().focus(); fireEvent.focusIn(input()); });
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'false');
    expect(screen.getByTestId('composer-format-toolbar')).toBeInTheDocument();
    expect(screen.getByTestId('composer-modes')).toBeInTheDocument();
    expect(screen.getByTestId('lead')).toBeInTheDocument();
    expect(screen.queryByTestId('composer-mode-pill')).toBeNull();
    await act(async () => { fireEvent.focusOut(input(), { relatedTarget: document.body }); });
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'true');
  });

  it('keeps the input element across collapse and expand (no remount, caret kept)', async () => {
    render(<RichChatComposer {...modes} />);
    const before = input();
    await act(async () => { before.focus(); fireEvent.focusIn(before); });
    expect(input()).toBe(before);
  });

  it('focus on the pill alone does not re-lay the row out; its click puts the caret in the input', async () => {
    render(<RichChatComposer {...modes} />);
    const pill = screen.getByTestId('composer-mode-pill');
    await act(async () => { pill.focus(); fireEvent.focusIn(pill); });
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'true');
  });

  it('a status keeps the full composer (the status line shows)', () => {
    render(<RichChatComposer {...modes} status={{ text: 'Saved as v16.', tone: 'success' }} />);
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'false');
    expect(screen.getByTestId('composer-status')).toHaveTextContent('Saved as v16.');
  });

  it('a draft with words keeps the full composer', () => {
    render(<RichChatComposer {...modes} draft={{ html: '<p>half a thought</p>', files: [] }} />);
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'false');
  });

  it('off by default: nothing changes for other composers', () => {
    const { collapseWhenIdle: _off, ...rest } = modes;
    render(<RichChatComposer {...rest} />);
    expect(screen.getByTestId('composer')).not.toHaveAttribute('data-collapsed');
    expect(screen.getByTestId('composer-format-toolbar')).toBeInTheDocument();
    expect(screen.queryByTestId('composer-mode-pill')).toBeNull();
  });

  it('without modes: input and Send on one row, no pill', () => {
    const onSend = vi.fn();
    render(<RichChatComposer onSend={onSend} data-testid="composer" layout="wide" collapseWhenIdle />);
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'true');
    expect(screen.queryByTestId('composer-mode-pill')).toBeNull();
    expect(screen.getByTestId('composer-send')).toBeDisabled();
  });
});
