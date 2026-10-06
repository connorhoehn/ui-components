// An unreviewed suggestion is visible to everyone the moment it exists, so the
// name on it is the only thing separating "a proposal" from "an agreed edit".
// These tests treat attribution and the accept/reject affordances as the two
// things the card cannot get wrong.

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SuggestionCard } from '../SuggestionCard';

afterEach(cleanup);

describe('SuggestionCard', () => {
  it('names the author', () => {
    render(<SuggestionCard kind="insert" author="Bo Chen" insertedText="new words" />);
    expect(screen.getByTestId('suggestion-card-author')).toHaveTextContent('Bo Chen');
  });

  // The marks make the author required, so a blank one is a bug upstream.
  // Rendering an empty span would hide it; saying so does not.
  it('says the author is unknown rather than showing nothing', () => {
    render(<SuggestionCard kind="insert" author="   " insertedText="new words" />);
    expect(screen.getByTestId('suggestion-card-author')).toHaveTextContent('Unknown author');
  });

  // A suggestion an agent run produced belongs to the person who triggered it.
  // "Haiku" names the engine, not anyone you can ask about the change, and in a
  // document with several collaborators it is the least useful name on the card.
  it('gives the author row to the person, not the model that drafted for them', () => {
    render(
      <SuggestionCard kind="insert" author="Eve (powered by Haiku)" insertedText="new words" />,
    );
    const person = screen.getByTestId('suggestion-card-author');
    expect(person).toHaveTextContent('Eve');
    // Not merely "contains Eve": the model must be nowhere in the row that the
    // narrow gutter truncates, or it would compete for the person's space.
    expect(person.textContent).toBe('Eve');
    expect(screen.getByTestId('suggestion-card-model')).toHaveTextContent('powered by Haiku');
  });

  // The author row lives in a ~280px gutter beside a timestamp and a kind
  // label. Truncation there is a certainty, so the only question is WHAT it
  // eats — and the answer has to be the model, never the person.
  it('truncates a long name without letting the model be what survives', () => {
    render(
      <SuggestionCard
        kind="insert"
        author="Evangelina Marchetti-Okonkwo (powered by Haiku)"
        insertedText="new words"
      />,
    );
    const person = screen.getByTestId('suggestion-card-author');
    // The person is the one element the row clips, and it clips in CSS with the
    // full name still in the DOM — so a screen reader reads all of it and the
    // `title` gives a sighted reader the rest on hover.
    expect(person.textContent).toBe('Evangelina Marchetti-Okonkwo');
    expect(person).toHaveClass('truncate');
    expect(person).toHaveAttribute('title', 'Evangelina Marchetti-Okonkwo');
    // The model is out of the clipping row entirely, so no width can reduce
    // this card to "…Haiku".
    expect(screen.getByTestId('suggestion-card-model')).not.toContainElement(person);
    expect(screen.getByTestId('suggestion-card-model')).toHaveTextContent('powered by Haiku');
  });

  // A person typing their own suggestion is the common case and must be
  // untouched — no stray "powered by" line, no reinterpreted brackets.
  it('leaves a plain name alone', () => {
    render(<SuggestionCard kind="insert" author="Bo Chen" insertedText="new" />);
    expect(screen.getByTestId('suggestion-card-author').textContent).toBe('Bo Chen');
    expect(screen.queryByTestId('suggestion-card-model')).toBeNull();
  });

  it('shows removed text struck and added text inserted', () => {
    render(
      <SuggestionCard
        kind="replace"
        author="Bo Chen"
        deletedText="old words"
        insertedText="new words"
      />,
    );
    // One <del>/<ins> per block, inside the labelled containers.
    expect(screen.getByTestId('suggestion-card-deleted').querySelector('del')).toHaveTextContent('old words');
    expect(screen.getByTestId('suggestion-card-inserted').querySelector('ins')).toHaveTextContent('new words');
  });

  it('labels the kind of change', () => {
    render(<SuggestionCard kind="delete" author="Bo Chen" deletedText="gone" />);
    expect(screen.getByTestId('suggestion-card-kind')).toHaveTextContent('Removed');
    expect(screen.getByTestId('suggestion-card')).toHaveAttribute('data-kind', 'delete');
  });

  // A reader without the authority to resolve must not be shown buttons that
  // do nothing — that failure mode is the reason this component exists.
  it('shows no accept or reject unless the host supplies them', () => {
    render(<SuggestionCard kind="insert" author="Bo Chen" insertedText="new words" />);
    expect(screen.queryByTestId('suggestion-card-accept')).toBeNull();
    expect(screen.queryByTestId('suggestion-card-reject')).toBeNull();
  });

  it('accepts and rejects through the host', () => {
    const onAccept = vi.fn();
    const onReject = vi.fn();
    render(
      <SuggestionCard
        kind="insert"
        author="Bo Chen"
        insertedText="new words"
        onAccept={onAccept}
        onReject={onReject}
      />,
    );
    fireEvent.click(screen.getByTestId('suggestion-card-accept'));
    fireEvent.click(screen.getByTestId('suggestion-card-reject'));
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onReject).toHaveBeenCalledTimes(1);
  });

  it('offers only what the host gave it', () => {
    render(
      <SuggestionCard kind="insert" author="Bo Chen" insertedText="new" onReject={() => {}} />,
    );
    expect(screen.queryByTestId('suggestion-card-accept')).toBeNull();
    expect(screen.getByTestId('suggestion-card-reject')).toBeTruthy();
  });

  it('takes the reader to the change in the document', () => {
    const onFocus = vi.fn();
    render(
      <SuggestionCard kind="insert" author="Bo Chen" insertedText="new" onFocus={onFocus} />,
    );
    fireEvent.click(screen.getByTestId('suggestion-card-body'));
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('marks the suggestion the reader is sitting on', () => {
    render(
      <SuggestionCard kind="insert" author="Bo Chen" insertedText="new" active />,
    );
    expect(screen.getByTestId('suggestion-card')).toHaveAttribute('data-active', 'true');
  });

  // A formatting change has no text on either side; the card must still render
  // rather than collapsing to an unlabelled row.
  it('renders a formatting change that has no text', () => {
    render(<SuggestionCard kind="modify" author="Bo Chen" />);
    expect(screen.getByTestId('suggestion-card-kind')).toHaveTextContent('Formatted');
    expect(screen.queryByTestId('suggestion-card-body')).toBeNull();
  });
});

describe('SuggestionCard selection, status and accept label', () => {
  it('draws a controlled checkbox only when onSelectedChange is given', () => {
    const onSelectedChange = vi.fn();
    const { rerender } = render(<SuggestionCard kind="insert" author="Eve" insertedText="x" />);
    expect(screen.queryByTestId('suggestion-card-select')).toBeNull();
    rerender(<SuggestionCard kind="insert" author="Eve" insertedText="x" selected onSelectedChange={onSelectedChange} />);
    const box = screen.getByTestId('suggestion-card-select') as HTMLInputElement;
    expect(box.checked).toBe(true);
    expect(screen.getByTestId('suggestion-card')).toHaveAttribute('data-selected', 'true');
    fireEvent.click(box);
    expect(onSelectedChange).toHaveBeenCalledWith(false);
  });

  it('shows a status slot and a custom accept label', () => {
    render(<SuggestionCard kind="insert" author="Eve" insertedText="x" status={<span>Drafting</span>} onAccept={() => {}} acceptLabel="Add" />);
    expect(screen.getByTestId('suggestion-card-status')).toHaveTextContent('Drafting');
    expect(screen.getByTestId('suggestion-card-accept')).toHaveTextContent('Add');
  });
});
