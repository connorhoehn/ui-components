import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WorkActivityHeader } from '../WorkActivityHeader';
import { WORK_ACTIVITY_ALL_EFFORTS } from '../effortLayout';

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

describe('WorkActivityHeader activity cap', () => {
  const control = () => screen.getByTestId('work-activity-header-max-efforts') as HTMLSelectElement;
  const shown = () => control().selectedOptions[0].textContent;

  it('says how much of the day it is showing when the cap is biting', () => {
    render(<WorkActivityHeader title="Connor’s activity" effortCount={9} maxEfforts={2} onMaxEffortsChange={vi.fn()} />);
    expect(control()).toHaveValue('2');
    expect(shown()).toBe('Show 2 of 9 activities');
  });

  it('says so plainly when nothing is being withheld', () => {
    render(<WorkActivityHeader title="Connor’s activity" effortCount={9} maxEfforts={WORK_ACTIVITY_ALL_EFFORTS} onMaxEffortsChange={vi.fn()} />);
    expect(shown()).toBe('All 9 activities');
  });

  it('reads as All when the cap is at or above the real count', () => {
    render(<WorkActivityHeader title="Connor’s activity" effortCount={3} maxEfforts={5} onMaxEffortsChange={vi.fn()} />);
    expect(shown()).toBe('All 3 activities');
    // Nothing on the list may promise more activities than exist.
    expect([...control().options].map((option) => option.textContent))
      .toEqual(['Show 1 of 3 activities', 'Show 2 of 3 activities', 'All 3 activities']);
  });

  it('offers nothing to filter with one activity, or none', () => {
    const { rerender } = render(<WorkActivityHeader title="Connor’s activity" effortCount={1} maxEfforts={2} onMaxEffortsChange={vi.fn()} />);
    expect(screen.queryByTestId('work-activity-header-max-efforts')).toBeNull();
    expect(screen.queryByTestId('work-activity-header-views')).toBeNull();
    rerender(<WorkActivityHeader title="Connor’s activity" effortCount={0} onMaxEffortsChange={vi.fn()} />);
    expect(screen.queryByTestId('work-activity-header-max-efforts')).toBeNull();
  });

  it('renders no control when no host is listening', () => {
    render(<WorkActivityHeader title="Connor’s activity" effortCount={9} maxEfforts={2} />);
    expect(screen.queryByTestId('work-activity-header-max-efforts')).toBeNull();
  });

  it('reports the chosen number, and the all sentinel for All', () => {
    const onMaxEffortsChange = vi.fn();
    render(<WorkActivityHeader title="Connor’s activity" effortCount={9} maxEfforts={2} onMaxEffortsChange={onMaxEffortsChange} />);
    fireEvent.change(control(), { target: { value: '5' } });
    expect(onMaxEffortsChange).toHaveBeenLastCalledWith(5);
    fireEvent.change(control(), { target: { value: 'all' } });
    expect(onMaxEffortsChange).toHaveBeenLastCalledWith(WORK_ACTIVITY_ALL_EFFORTS);
  });

  it('sits beside the body switch without displacing it', () => {
    render(<WorkActivityHeader title="Connor’s activity" effortCount={9} maxEfforts={2} onMaxEffortsChange={vi.fn()} onViewChange={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'Activity' })).toBeInTheDocument();
    expect(screen.getByTestId('work-activity-header-max-efforts')).toBeInTheDocument();
  });
});

describe('WorkActivityHeader view note', () => {
  it('shows the note whole or not at all, by the row’s own width', () => {
    render(<WorkActivityHeader title="Connor’s activity" view="activity" onViewChange={vi.fn()} viewNote="Shared work · newest first" />);
    expect(screen.getByTestId('work-activity-header-views')).toHaveClass('@container');
    const note = screen.getByTestId('work-activity-header-view-note');
    expect(note).toHaveClass('hidden');
    expect(note).toHaveClass('@lg:inline');
  });
});
