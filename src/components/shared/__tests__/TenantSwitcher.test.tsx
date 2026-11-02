import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TenantSwitcher, type TenantSwitcherDestination } from '../TenantSwitcher';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const two: TenantSwitcherDestination[] = [
  { id: 'assessment', label: 'Assessment', unread: 2 },
  { id: 'social', label: 'Social' },
];

const trigger = () => screen.getByRole('button', { name: 'Work: switch tenant' });
const dialog = () => screen.getByRole('dialog', { name: 'Switch tenant' });

describe('TenantSwitcher', () => {
  it('draws the brand trigger with the planet, the moon and the label, closed', () => {
    const { container } = render(<TenantSwitcher label="Work" healthy destinations={two} onSelect={() => {}} />);
    expect(trigger()).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
    expect(trigger()).toHaveClass('tenant-switcher-trigger');
    expect(container.querySelector('.tenant-brand-planet svg')).not.toBeNull();
    expect(container.querySelector('.tenant-brand-orbit > span')?.className).toContain('animate-[tenant-orbit_5s_linear_infinite]');
    expect(screen.getByText('Work')).toHaveClass('tenant-brand-label');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('keeps the moon still with motion off, and draws none when unhealthy', () => {
    const { container, rerender } = render(<TenantSwitcher label="Work" healthy motion={false} destinations={two} onSelect={() => {}} />);
    const orbit = container.querySelector('.tenant-brand-orbit')!;
    expect(orbit.className).not.toContain('animate-');
    expect(orbit.firstElementChild!.className).not.toContain('animate-');
    rerender(<TenantSwitcher label="Work" destinations={two} onSelect={() => {}} />);
    expect(container.querySelector('.tenant-brand-orbit')).toBeNull();
  });

  it('lists each destination with its unread activity, labelled for assistive tech', () => {
    render(<TenantSwitcher label="Work" destinations={two} onSelect={() => {}} />);
    fireEvent.click(trigger());
    const panel = dialog();
    expect(trigger()).toHaveAttribute('aria-expanded', 'true');
    expect(trigger()).toHaveAttribute('aria-controls', panel.id);
    expect(panel.querySelectorAll('.tenant-destination')).toHaveLength(2);
    const assessment = within(panel).getByRole('group', { name: 'Assessment, 2 unread notifications' });
    expect(within(assessment).getByRole('button', { name: 'Assessment' })).toHaveClass('tenant-destination-action');
    const activity = within(assessment).getByRole('img', { name: 'Assessment: 2 unread notices in this inbox. Live updates are currently unavailable.' });
    expect(activity).toHaveAttribute('data-status', 'unread');
    expect(activity).toHaveClass('tenant-activity', 'tenant-activity-unread');
    expect(panel.querySelector('.tenant-unread')).toHaveTextContent('2');
    const social = within(panel).getByRole('group', { name: 'Social' });
    expect(within(social).getByRole('img', { name: /Live notification updates are currently unavailable/ })).toHaveAttribute('data-status', 'unavailable');
    expect(panel.querySelector('[data-tenant="assessment"]')).not.toBeNull();
  });

  it('says "no unread" when live and empty', () => {
    render(<TenantSwitcher label="Work" live destinations={[{ id: 'social', label: 'Social' }]} onSelect={() => {}} />);
    fireEvent.click(trigger());
    expect(within(dialog()).getByRole('img', { name: 'Social: No unread notices in this inbox.' })).toHaveAttribute('data-status', 'empty');
  });

  it('opens on a mouse hover after a beat, and ArrowDown opens and focuses the first destination', () => {
    vi.useFakeTimers();
    render(<TenantSwitcher label="Work" destinations={two} onSelect={() => {}} />);
    const root = screen.getByTestId('tenant-switcher');
    fireEvent.pointerEnter(root, { pointerType: 'mouse' });
    expect(screen.queryByRole('dialog')).toBeNull();
    act(() => { vi.advanceTimersByTime(260); });
    expect(dialog()).toBeInTheDocument();
    fireEvent.keyDown(root, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(trigger()).toHaveFocus();

    // The focus move waits a frame, for the panel to render.
    const frames: FrameRequestCallback[] = [];
    const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => { frames.push(cb); return frames.length; });
    fireEvent.keyDown(trigger(), { key: 'ArrowDown' });
    act(() => { frames.forEach((cb) => cb(0)); });
    expect(within(dialog()).getByRole('button', { name: 'Assessment' })).toHaveFocus();
    raf.mockRestore();
  });

  it('closes on an outside pointerdown', () => {
    render(<div><TenantSwitcher label="Work" destinations={two} onSelect={() => {}} /><p>outside</p></div>);
    fireEvent.click(trigger());
    fireEvent.pointerDown(screen.getByText('outside'));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('calls onSelect, and shows a refusal while re-enabling every destination', async () => {
    const onSelect = vi.fn().mockRejectedValue(new Error('This fixture tenant is no longer available.'));
    render(<TenantSwitcher label="Work" destinations={two} onSelect={onSelect} />);
    fireEvent.click(trigger());
    await act(async () => { fireEvent.click(within(dialog()).getByRole('button', { name: 'Assessment' })); });
    expect(onSelect).toHaveBeenCalledWith('assessment');
    expect(dialog()).toHaveTextContent('no longer available');
    expect(within(dialog()).getByRole('button', { name: 'Social' })).toBeEnabled();
  });

  it('holds destinations disabled after a successful switch until resetKey changes', async () => {
    const onSelect = vi.fn().mockResolvedValue(undefined);
    const { rerender } = render(<TenantSwitcher label="Work" destinations={two} onSelect={onSelect} resetKey="a" />);
    fireEvent.click(trigger());
    await act(async () => { fireEvent.click(within(dialog()).getByRole('button', { name: 'Social' })); });
    expect(within(dialog()).getByRole('button', { name: 'Assessment' })).toBeDisabled();
    rerender(<TenantSwitcher label="Work" destinations={two} onSelect={onSelect} resetKey="b" />);
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.click(trigger());
    expect(within(dialog()).getByRole('button', { name: 'Assessment' })).toBeEnabled();
  });

  it('blocks every destination with a reason, and shows the empty message when there are none', () => {
    const onSelect = vi.fn();
    const { rerender } = render(<TenantSwitcher label="Work" destinations={two} onSelect={onSelect} blockedReason="Finish your huddle before switching workspaces." />);
    fireEvent.click(trigger());
    expect(dialog()).toHaveTextContent('Finish your huddle before switching workspaces.');
    for (const button of within(dialog()).getAllByRole('button')) expect(button).toBeDisabled();
    rerender(<TenantSwitcher label="Work" destinations={[]} onSelect={onSelect} />);
    expect(dialog()).toHaveTextContent('No other tenants are available for your account.');
    expect(within(dialog()).queryAllByRole('button')).toHaveLength(0);
  });
});

it('can switch project workspaces without claiming an inbox connection', () => {
 render(<TenantSwitcher label="Spike" showActivity={false} destinations={[{id:'demo',label:'Workshop'}]} onSelect={()=>{}} />);
 fireEvent.click(screen.getByRole('button',{name:'Spike: switch tenant'}));
 expect(screen.getByRole('button',{name:'Workshop'})).toBeInTheDocument();
 expect(screen.queryByRole('img',{name:/inbox|notification/i})).toBeNull();
});
