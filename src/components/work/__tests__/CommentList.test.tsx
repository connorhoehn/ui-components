import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CommentList, type CommentListItem } from '../CommentList';

const NOW = Date.parse('2026-09-23T12:00:00Z');
const DAY = 86_400_000;
const COMMENTS: CommentListItem[] = [
  { id: 'c1', author: { id: 'u1', name: 'Nora DaSilva' }, role: 'PM', createdAt: NOW - 2 * DAY, text: 'Start with low-risk services after the collector rollout.' },
  { id: 'c2', author: { id: 'u2', name: 'Eli Garcia' }, role: 'Architect', createdAt: new Date(NOW - DAY), text: 'Keep the bridge available until dashboard parity is verified.' },
  { id: 'c3', author: { id: 'u3', name: 'Layla Hassan' }, role: null, createdAt: new Date(NOW - 5 * 60_000).toISOString(), text: 'On it.' },
];

describe('CommentList', () => {
  it('renders name · role · relative time and text, with a fixed now', () => {
    render(<CommentList comments={COMMENTS} now={NOW} />);
    expect(screen.getByRole('heading', { name: 'Planning notes' })).toBeTruthy();
    const c1 = screen.getByTestId('comment-c1');
    expect(c1.textContent).toContain('Nora DaSilva');
    expect(c1.textContent).toContain('PM');
    expect(c1.textContent).toContain('2d ago');
    expect(screen.getByTestId('comment-c2').textContent).toContain('1d ago');
    expect(screen.getByText('Start with low-risk services after the collector rollout.')).toBeTruthy();
  });

  it('omits the role when absent', () => {
    render(<CommentList comments={COMMENTS} now={NOW} />);
    const c3 = screen.getByTestId('comment-c3');
    expect(c3.textContent).toContain('5m ago');
    expect(c3.textContent?.match(/·/g)).toHaveLength(1);
  });

  it('max trims; View all shows total and fires', () => {
    const onViewAll = vi.fn();
    render(<CommentList comments={COMMENTS} now={NOW} max={2} total={7} onViewAll={onViewAll} />);
    expect(screen.queryByTestId('comment-c3')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'View all (7)' }));
    expect(onViewAll).toHaveBeenCalled();
  });

  it('empty state, no View all', () => {
    render(<CommentList comments={[]} onViewAll={() => {}} />);
    expect(screen.getByText('No notes yet')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('drops an unparseable timestamp instead of showing garbage', () => {
    render(<CommentList comments={[{ ...COMMENTS[0], createdAt: 'nope' }]} now={NOW} />);
    const c1 = screen.getByTestId('comment-c1');
    expect(c1.textContent).not.toMatch(/ago|NaN|Invalid/);
  });
});
