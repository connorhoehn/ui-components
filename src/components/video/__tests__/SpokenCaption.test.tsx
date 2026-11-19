import { render, screen, act } from '@testing-library/react';
import { SpokenCaption } from '../SpokenCaption';

describe('SpokenCaption', () => {
  it('shows the speaker and the words in a polite live region', () => {
    render(<SpokenCaption speaker="Hugo" text="Hello there" />);
    expect(screen.getByText('Hugo')).toBeInTheDocument();
    expect(screen.getByTestId('spoken-caption-text')).toHaveAttribute('aria-live', 'polite');
    expect(screen.queryByText('Question')).toBeNull();
  });

  it('marks a question and a speaking line', () => {
    render(<SpokenCaption speaker="Milo" kind="question" speaking text="What changed?" mark={<span>M</span>} />);
    expect(screen.getByText('Question')).toBeInTheDocument();
    expect(screen.getByText('Speaking')).toBeInTheDocument();
    expect(screen.getByTestId('spoken-caption')).toHaveAttribute('data-tone', 'assistant');
  });

  it('expires holdMs after the last text change', () => {
    vi.useFakeTimers();
    const onExpire = vi.fn();
    const { rerender } = render(<SpokenCaption speaker="A" text="one" holdMs={1000} onExpire={onExpire} />);
    act(() => { vi.advanceTimersByTime(800); });
    rerender(<SpokenCaption speaker="A" text="one two" holdMs={1000} onExpire={onExpire} />);
    act(() => { vi.advanceTimersByTime(800); });
    expect(onExpire).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(300); });
    expect(onExpire).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
