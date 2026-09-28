import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { RailNavList } from '../RailNavList';

afterEach(cleanup);
it('uses the shared tinted current style without changing inactive rows', () => {
  render(<RailNavList currentStyle="tint" items={[{ id: 'all', label: 'All initiatives', href: '/all', current: true }, { id: 'mine', label: 'My initiatives', href: '/mine' }]} />);
  expect(screen.getByRole('link', { name: 'All initiatives' })).toHaveAttribute('aria-current', 'page');
  expect(screen.getByRole('link', { name: 'All initiatives' })).toHaveClass('bg-primary/10');
  expect(screen.getByRole('link', { name: 'My initiatives' })).not.toHaveClass('bg-primary/10');
});
it('exposes the native link event to routers and retains the existing selection callback', () => {
  const navigate = vi.fn(), select = vi.fn();
  render(<RailNavList items={[{ id: 'all', label: 'All initiatives', href: '/all', onSelect: select, onNavigate: (event) => {
    if (!event.ctrlKey) { event.preventDefault(); navigate(); }
  } }]} />);
  fireEvent.click(screen.getByRole('link'));
  expect(navigate).toHaveBeenCalledOnce();
  expect(select).toHaveBeenCalledOnce();
  fireEvent.click(screen.getByRole('link'), { ctrlKey: true });
  expect(navigate).toHaveBeenCalledOnce();
});
