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
  it('idle: pill, input and Send only — no toolbar, mode row, references or submit lead', () => {
    render(
      <RichChatComposer
        {...modes}
        references={[{ id: 'slide-3', label: 'Slide 3' }]}
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
