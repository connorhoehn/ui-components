import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FollowUpChips } from '../FollowUpChips';

describe('FollowUpChips', () => {
  it('renders one chip per suggestion and reports the clicked text', () => {
    const onSelect = vi.fn();
    render(<FollowUpChips suggestions={['A?', 'B?']} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'B?' }));
    expect(onSelect).toHaveBeenCalledWith('B?');
  });

  it('shows the refresh button only when onRefresh is provided', () => {
    const onRefresh = vi.fn();
    const { rerender } = render(<FollowUpChips suggestions={[]} onSelect={() => {}} />);
    expect(screen.queryByTitle('Refresh suggestions')).toBeNull();
    rerender(<FollowUpChips suggestions={[]} onSelect={() => {}} onRefresh={onRefresh} />);
    fireEvent.click(screen.getByTitle('Refresh suggestions'));
    expect(onRefresh).toHaveBeenCalled();
  });

  it('renders the optional label', () => {
    render(<FollowUpChips suggestions={[]} onSelect={() => {}} label="Follow up:" />);
    expect(screen.getByText('Follow up:')).toBeInTheDocument();
  });
});
