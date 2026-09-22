import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WorkActivityHeader } from '../WorkActivityHeader';

afterEach(cleanup);

describe('WorkActivityHeader', () => {
  it('renders no body switch for a host with one body', () => {
    render(<WorkActivityHeader title="Connor’s activity" subtitle="Working now · Sharing with you" />);
    expect(screen.getByTestId('work-activity-header-title')).toHaveTextContent('Connor’s activity');
    // The whole opt-in is `onViewChange`: without it, not one extra node.
    expect(screen.queryByTestId('work-activity-header-views')).toBeNull();
    expect(screen.queryByRole('tab')).toBeNull();
  });

  it('offers Activity and Computer Lab, with the host’s own clause beside them', () => {
    const onViewChange = vi.fn();
    render(
      <WorkActivityHeader
        title="Connor’s activity"
        view="activity"
        onViewChange={onViewChange}
        viewNote="Shared work · newest first"
      />,
    );
    expect(screen.getByRole('tab', { name: 'Activity' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('work-activity-header-view-note')).toHaveTextContent('Shared work · newest first');

    fireEvent.click(screen.getByRole('tab', { name: 'Computer Lab' }));
    expect(onViewChange).toHaveBeenCalledWith('lab');
  });

  it('is controlled — the switch shows what the host applied, not what was pressed', () => {
    const { rerender } = render(<WorkActivityHeader title="Connor’s activity" view="activity" onViewChange={vi.fn()} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Computer Lab' }));
    expect(screen.getByRole('tab', { name: 'Activity' })).toHaveAttribute('aria-selected', 'true');

    rerender(<WorkActivityHeader title="Connor’s activity" view="lab" onViewChange={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'Computer Lab' })).toHaveAttribute('aria-selected', 'true');
  });

  it('keeps the three ways out alongside the switch', () => {
    const onClose = vi.fn();
    render(<WorkActivityHeader title="Connor’s activity" onViewChange={vi.fn()} onExpand={vi.fn()} onPopOut={vi.fn()} onClose={onClose} />);
    expect(screen.getByTestId('work-activity-header-expand')).toBeInTheDocument();
    expect(screen.getByTestId('work-activity-header-pop-out')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('work-activity-header-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
