// Editing / Suggesting / Viewing is ONE question — "what does my typing do?" —
// and the control must never offer an answer the host cannot honour.

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SuggestionModeControl } from '../SuggestionModeControl';

afterEach(cleanup);

describe('SuggestionModeControl', () => {
  it('reports the mode it was given', () => {
    render(<SuggestionModeControl mode="suggesting" onModeChange={() => {}} />);
    expect(screen.getByTestId('suggestion-mode-control')).toHaveAttribute('data-mode', 'suggesting');
  });

  it('says what each mode does, so the three can be told apart', () => {
    render(<SuggestionModeControl mode="suggesting" onModeChange={() => {}} />);
    expect(screen.getByTestId('suggestion-mode-control').getAttribute('title')).toMatch(
      /accept or reject/i,
    );
  });

  it('reports the mode the reader picked', () => {
    const onModeChange = vi.fn();
    render(<SuggestionModeControl mode="editing" onModeChange={onModeChange} />);
    fireEvent.click(screen.getByText('Suggesting'));
    expect(onModeChange).toHaveBeenCalledWith('suggesting');
  });

  // Re-selecting the mode you are already in is not a change, and firing it
  // would make the host re-issue setSuggestionMode to every section editor.
  it('says nothing when the reader picks the mode already in effect', () => {
    const onModeChange = vi.fn();
    render(<SuggestionModeControl mode="editing" onModeChange={onModeChange} />);
    fireEvent.click(screen.getByText('Editing'));
    expect(onModeChange).not.toHaveBeenCalled();
  });

  // A host with no read-only surface must not show a Viewing segment: the whole
  // point of this control is that every position it offers is real.
  it('drops Viewing when the host cannot honour it', () => {
    render(<SuggestionModeControl mode="editing" onModeChange={() => {}} showViewing={false} />);
    expect(screen.queryByText('Viewing')).toBeNull();
    expect(screen.getByText('Suggesting')).toBeTruthy();
  });

  // An unread document is not an empty one. "0 suggestions" on a document
  // nobody has counted is a claim the control has no standing to make.
  it('says nothing about a count it does not have', () => {
    render(<SuggestionModeControl mode="editing" onModeChange={() => {}} />);
    expect(screen.queryByTestId('suggestion-mode-control-count')).toBeNull();
  });

  it('stays quiet at zero and speaks up above it', () => {
    const { rerender } = render(
      <SuggestionModeControl mode="editing" onModeChange={() => {}} openCount={0} />,
    );
    expect(screen.queryByTestId('suggestion-mode-control-count')).toBeNull();

    rerender(<SuggestionModeControl mode="editing" onModeChange={() => {}} openCount={1} />);
    expect(screen.getByTestId('suggestion-mode-control-count')).toHaveTextContent('1 suggestion');

    rerender(<SuggestionModeControl mode="editing" onModeChange={() => {}} openCount={4} />);
    expect(screen.getByTestId('suggestion-mode-control-count')).toHaveTextContent('4 suggestions');
  });
});
