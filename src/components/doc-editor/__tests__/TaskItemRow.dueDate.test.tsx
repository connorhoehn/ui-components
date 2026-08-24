import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { TaskItem } from '../../../types/document';
import TaskItemRow from '../TaskItemRow';

// ---------------------------------------------------------------------------
// Date-only `dueDate` (regression)
//
// `TaskItem.dueDate` is a bare `YYYY-MM-DD` — it is produced by the
// `<Input type="date">` in this very component. `new Date('2026-08-16')` is UTC
// midnight per spec, so `toLocaleDateString()` rendered "Due: Aug 15" for every
// viewer west of Greenwich, and `d < today` (where `today` was LOCAL midnight)
// raised the danger-tone overdue badge on a task due *today*.
//
// The zone and "now" are both pinned: the assertions have to discriminate on a
// UTC runner as well as a US one.
// ---------------------------------------------------------------------------

const makeItem = (overrides: Partial<TaskItem> = {}): TaskItem => ({
  id: '1',
  text: 'Ship the thing',
  status: 'pending',
  assignee: '',
  ackedBy: '',
  ackedAt: '',
  priority: 'medium',
  notes: '',
  ...overrides,
});

function renderRow(item: TaskItem) {
  return render(
    <TaskItemRow item={item} editable={false} onUpdate={vi.fn()} onRemove={vi.fn()} />,
  );
}

describe('TaskItemRow due-date badge (America/Los_Angeles)', () => {
  const ORIGINAL_TZ = process.env.TZ;

  beforeAll(() => {
    process.env.TZ = 'America/Los_Angeles';
  });
  afterAll(() => {
    if (ORIGINAL_TZ === undefined) delete process.env.TZ;
    else process.env.TZ = ORIGINAL_TZ;
  });
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    // 2026-08-16 09:00 PDT.
    vi.setSystemTime(new Date('2026-08-16T16:00:00Z'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the authored day, not the UTC-shifted previous day', () => {
    renderRow(makeItem({ dueDate: '2026-08-16' }));
    expect(screen.getByText('Due: Aug 16')).toBeInTheDocument();
    expect(screen.queryByText(/Aug 15/)).not.toBeInTheDocument();
  });

  it('does not raise the overdue badge for a task due today', () => {
    renderRow(makeItem({ dueDate: '2026-08-16' }));
    const badge = screen.getByText('Due: Aug 16');
    expect(badge.textContent).not.toContain('⚠');
    expect(badge.className).toContain('bg-info-bg');
    expect(badge.className).not.toContain('bg-danger-bg');
  });

  it('still raises the overdue badge for a task due yesterday', () => {
    renderRow(makeItem({ dueDate: '2026-08-15' }));
    const badge = screen.getByText('⚠ Due: Aug 15');
    expect(badge.className).toContain('bg-danger-bg');
  });

  it('falls back to the raw string when the date is unparseable', () => {
    renderRow(makeItem({ dueDate: 'end of sprint' }));
    expect(screen.getByText('Due: end of sprint')).toBeInTheDocument();
  });
});
