import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ActivityTicker, type ActivityTickerProps } from '../ActivityTicker';
import { activityTickerRotationAllowed, readActivityTickerPreferences } from '../activityTickerModel';
const categories = [{ id: 'review', label: 'Review' }, { id: 'agenda', label: 'Agenda' }];
const items = categories.map(category => ({ category: category.id, label: category.label, summary: 'Host supplied summary', detail: `Host ${category.label} details` }));
const props: ActivityTickerProps = { categories, items };
const trigger = () => screen.getByRole('button', { name: /^Today:/ });
beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
describe('ActivityTicker', () => {
  it('presents host content and action slots without sample or workspace assumptions', () => {
    const action = vi.fn();
    render(<ActivityTicker {...props} renderActions={(item, close) => <button onClick={() => { action(item); close(); }}>Host action</button>} />);
    expect(screen.queryByText('Demo')).toBeNull();
    fireEvent.click(trigger()); expect(screen.getByRole('dialog', { name: 'Today details' })).toHaveTextContent('Host Review details');
    fireEvent.click(screen.getByRole('button', { name: 'Host action' }));
    expect(action).toHaveBeenCalledWith(items[0]); expect(screen.queryByRole('dialog')).toBeNull();
  });
  it('restores keyboard focus after hide/restore and never reuses another preference key', () => {
    const { rerender } = render(<ActivityTicker {...props} preferencesKey="actor-A/context" />);
    fireEvent.focus(trigger()); fireEvent.click(screen.getByRole('button', { name: 'Hide Today strip' }));
    expect(screen.getByRole('button', { name: 'Restore Today strip' })).toHaveFocus();
    rerender(<ActivityTicker {...props} preferencesKey="actor-B/context" />); expect(trigger()).toBeInTheDocument();
    rerender(<ActivityTicker {...props} preferencesKey="actor-A/context" />);
    fireEvent.click(screen.getByRole('button', { name: 'Restore Today strip' })); expect(trigger()).toHaveFocus();
  });
  it('keeps rotation quiet while focused, during calls and with controlled preferences', () => {
    vi.useFakeTimers(); const changed = vi.fn();
    const { rerender } = render(<ActivityTicker {...props} />);
    act(() => vi.advanceTimersByTime(12000)); expect(trigger()).toHaveAccessibleName(/Agenda/);
    fireEvent.focus(trigger()); act(() => vi.advanceTimersByTime(24000)); expect(trigger()).toHaveAccessibleName(/Agenda/);
    rerender(<ActivityTicker {...props} activeCall />); act(() => vi.advanceTimersByTime(24000)); expect(trigger()).toHaveAccessibleName(/Agenda/);
    const preferences = readActivityTickerPreferences(null, ['review', 'agenda']);
    rerender(<ActivityTicker {...props} preferencesKey="controlled" preferences={preferences} onPreferencesChange={changed} />);
    fireEvent.focus(trigger()); fireEvent.click(screen.getByRole('button', { name: 'Pause rotation' }));
    expect(changed).toHaveBeenCalledWith({ ...preferences, paused: true }); expect(localStorage.getItem('controlled')).toBeNull();
  });
  it('bounds stored preferences to host categories and respects independent motion/engagement guards', () => {
    expect(readActivityTickerPreferences('{broken', ['review']).categories).toEqual(['review']);
    expect(readActivityTickerPreferences('{"categories":["review","unknown"],"speed":"unbounded"}', ['review', 'agenda'])).toMatchObject({ speed: 'slow', categories: ['review'] });
    const free = { paused: false, quiet: false, engaged: false, reducedMotion: false, pageVisible: true, activeCall: false, count: 2 };
    expect(activityTickerRotationAllowed(free)).toBe(true);
    for (const flag of ['paused', 'quiet', 'engaged', 'reducedMotion', 'activeCall']) expect(activityTickerRotationAllowed({ ...free, [flag]: true })).toBe(false);
    expect(activityTickerRotationAllowed({ ...free, pageVisible: false })).toBe(false);
  });
});
