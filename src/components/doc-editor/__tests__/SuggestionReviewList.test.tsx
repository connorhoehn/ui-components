import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SuggestionReviewList } from '../SuggestionReviewList';
import { SuggestionCard } from '../SuggestionCard';

describe('SuggestionReviewList + SuggestionCard', () => {
  it('heads the list with the count and the whole-document resolutions, one line per block on a card', () => {
    const onAcceptAll = vi.fn();
    const onAccept = vi.fn();
    render(
      <SuggestionReviewList count={1} onAcceptAll={onAcceptAll} onRejectAll={() => {}}>
        <li>
          <SuggestionCard kind="insert" author="Haiku" when={0} context="Overview" insertedBlocks={['| Column 1 | Column 2 |', 'Placeholder text']} onAccept={onAccept} onReject={() => {}} onFocus={() => {}} />
        </li>
      </SuggestionReviewList>,
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByTestId('suggestion-card-inserted').querySelectorAll('ins')).toHaveLength(2);
    expect(screen.getByTestId('suggestion-card-context').textContent).toBe('in Overview');
    fireEvent.click(screen.getByRole('button', { name: 'Accept all' }));
    expect(onAcceptAll).toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('suggestion-card-accept'));
    expect(onAccept).toHaveBeenCalled();
  });

  it('offers no resolutions to a reader who cannot resolve, and says when there is nothing', () => {
    render(<SuggestionReviewList count={0} />);
    expect(screen.queryByRole('button', { name: 'Accept all' })).toBeNull();
    expect(screen.getByTestId('suggestion-review-list-empty')).toBeInTheDocument();
  });
});
