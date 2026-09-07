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

  it('shows removed text struck and added text inserted', () => {
    render(
      <SuggestionCard
        kind="replace"
        author="Bo Chen"
        deletedText="old words"
        insertedText="new words"
      />,
    );
    expect(screen.getByTestId('suggestion-card-deleted').tagName).toBe('DEL');
    expect(screen.getByTestId('suggestion-card-inserted').tagName).toBe('INS');
  });

  it('labels the kind of change', () => {
    render(<SuggestionCard kind="delete" author="Bo Chen" deletedText="gone" />);
    expect(screen.getByTestId('suggestion-card-kind')).toHaveTextContent('Deletion');
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
    expect(screen.getByTestId('suggestion-card-kind')).toHaveTextContent('Formatting');
    expect(screen.queryByTestId('suggestion-card-body')).toBeNull();
  });
});
