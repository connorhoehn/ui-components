import { cleanup, createEvent, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import MyMentionsPanel from '../MyMentionsPanel';
import type { MentionItem, TaskAssignment } from '../../../hooks/useMyMentionsAndTasks';

afterEach(cleanup);

const mention: MentionItem = {
  kind: 'mention',
  sectionId: 'sec-1',
  sectionTitle: 'Overview',
  commentId: 'c1',
  authorName: 'Ann Lee',
  authorColor: '#0f0',
  commentText: 'Can you review this?',
  timestamp: '2026-06-07T12:00:00Z',
};

const task: TaskAssignment = {
  kind: 'task',
  sectionId: 'sec-2',
  sectionTitle: 'Rollout',
  itemId: 't1',
  taskText: 'Update the runbook',
  status: 'pending',
  priority: 'high',
};

function renderPanel(items = [mention, task]) {
  const onNavigateToSection = vi.fn();
  render(
    <MyMentionsPanel items={items} onNavigateToSection={onNavigateToSection} onClose={() => {}} />,
  );
  return { onNavigateToSection };
}

// REGRESSION: mention and task rows were bare <div>s with onClick. The only
// focusable control inside them was "Dismiss", so a keyboard user could throw
// an item away but never jump to it. The rows wrap that nested button, so they
// are role="button" + tabIndex + onKeyDown rather than real <button>s.
describe('MyMentionsPanel — row keyboard access', () => {
  it('exposes the mention row as a focusable button', () => {
    renderPanel();

    const row = screen.getByRole('button', { name: /Can you review this\?/ });
    expect(row).toHaveAttribute('tabindex', '0');
    row.focus();
    expect(row).toHaveFocus();
  });

  it('navigates to the mention section on Enter', () => {
    const { onNavigateToSection } = renderPanel();

    fireEvent.keyDown(screen.getByRole('button', { name: /Can you review this\?/ }), {
      key: 'Enter',
    });

    // The comment id rides along: it is the ONLY landmark a page-shaped
    // document has, since a canvas files its comments under an empty section id.
    expect(onNavigateToSection).toHaveBeenCalledWith('sec-1', 'c1');
  });

  it('navigates on Space and prevents the panel from scrolling', () => {
    const { onNavigateToSection } = renderPanel();

    const row = screen.getByRole('button', { name: /Can you review this\?/ });
    const ev = createEvent.keyDown(row, { key: ' ' });
    fireEvent(row, ev);

    // The comment id rides along: it is the ONLY landmark a page-shaped
    // document has, since a canvas files its comments under an empty section id.
    expect(onNavigateToSection).toHaveBeenCalledWith('sec-1', 'c1');
    expect(ev.defaultPrevented).toBe(true);
  });

  it('navigates from a task row on Space and prevents scrolling', () => {
    const { onNavigateToSection } = renderPanel();

    const row = screen.getByRole('button', { name: /Update the runbook/ });
    expect(row).toHaveAttribute('tabindex', '0');
    const ev = createEvent.keyDown(row, { key: ' ' });
    fireEvent(row, ev);

    expect(onNavigateToSection).toHaveBeenCalledWith('sec-2');
    expect(ev.defaultPrevented).toBe(true);
  });

  it('keeps Dismiss independent of the row it sits in', () => {
    const { onNavigateToSection } = renderPanel();

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss mention' }));

    expect(onNavigateToSection).not.toHaveBeenCalled();
    expect(screen.queryByText('Can you review this?')).not.toBeInTheDocument();
  });
});
