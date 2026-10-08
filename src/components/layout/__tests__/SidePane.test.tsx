import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import {
  SidePane, SidePaneProvider, SidePaneSplit, boundedSidePaneRatio, readSidePaneOpen, readSidePaneRatio, sidePaneFits,
  useSidePane, useSidePaneHost,
} from '../SidePane';
import { useDensity } from '../../shared/Density';

afterEach(cleanup);
beforeEach(() => window.localStorage.clear());

function HostProbe() {
  const host = useSidePaneHost();
  return <output data-testid="probe">{JSON.stringify({ registered: host.registered, asked: host.asked, shown: host.shown, explored: host.explored })}</output>;
}
const probe = () => JSON.parse(screen.getByTestId('probe').textContent ?? '{}') as Record<string, boolean>;

function DensityProbe() { return <span data-testid="density">{useDensity()}</span>; }

describe('SidePane pure rules', () => {
  it('reads the remembered open choice and ratio inside the bounds', () => {
    expect(readSidePaneOpen('1')).toBe(true);
    expect(readSidePaneOpen('0')).toBe(false);
    expect(readSidePaneOpen(null)).toBe(true);
    expect(readSidePaneOpen(null, false)).toBe(false);
    expect(readSidePaneRatio('0.6')).toBe(0.6);
    expect(readSidePaneRatio('0.1')).toBe(0.4);
    expect(readSidePaneRatio('9')).toBe(0.85);
    expect(readSidePaneRatio('junk')).toBe(0.72);
  });
  it('fits only with room for the page and the pane; unmeasured fits', () => {
    expect(sidePaneFits(null)).toBe(true);
    expect(sidePaneFits(1160)).toBe(true);
    expect(sidePaneFits(1159)).toBe(false);
  });
  it('keeps a width-bounded pane inside its bounds', () => {
    // 1000px split at 0.72 → 280px pane; bounded to 320–380 → 320px → 0.68.
    expect(boundedSidePaneRatio(0.72, 1000, { min: 320, max: 380 })).toBeCloseTo(0.68);
    expect(boundedSidePaneRatio(0.5, 1000, { min: 320, max: 380 })).toBeCloseTo(0.62);
    expect(boundedSidePaneRatio(0.5, null, { min: 320, max: 380 })).toBe(0.5);
    expect(boundedSidePaneRatio(0.5, 1000, null)).toBe(0.5);
  });
});

describe('SidePane in a host', () => {
  it('portals the page pane into the frame, at compact density, with its tab row and footer', () => {
    const onValueChange = vi.fn();
    render(
      <SidePaneProvider storageKey="t.pane">
        <SidePaneSplit paneTestId="the-pane">
          <p>page</p>
          <SidePane title="Discussion" subtitle="Auth" tabs={[{ id: 'discussion', label: 'Discussion' }, { id: 'details', label: 'Details' }]}
            value="discussion" onValueChange={onValueChange} trailing={<span data-testid="views" />} footer={<textarea aria-label="Composer" />}
            data-testid="pane-content">
            <DensityProbe />
          </SidePane>
        </SidePaneSplit>
        <HostProbe />
      </SidePaneProvider>,
    );
    expect(screen.getByTestId('the-pane-title').textContent).toBe('Discussion');
    expect(screen.getByTestId('the-pane-subtitle').textContent).toBe('Auth');
    expect(screen.getByTestId('density').textContent).toBe('compact');
    expect(screen.getByRole('tablist').getAttribute('aria-label')).toBe('Pane sections');
    expect(screen.getByTestId('pane-content-header-row')).toBeTruthy();
    expect(screen.getByTestId('views')).toBeTruthy();
    expect(screen.getByLabelText('Composer')).toBeTruthy();
    fireEvent.click(screen.getByTestId('pane-content-tab-details'));
    expect(onValueChange).toHaveBeenCalledWith('details');
    expect(probe()).toEqual({ registered: true, asked: true, shown: true, explored: false });
    // The frame is a popover boundary: menus opened in it stay in it.
    expect(screen.getByTestId('the-pane').hasAttribute('data-uic-popover-boundary')).toBe(true);
  });

  it('× collapses it, remembered per device, and keeps the page content mounted', () => {
    function Draft() { const [v, setV] = useState(''); return <input aria-label="Draft" value={v} onChange={(e) => setV(e.target.value)} />; }
    function Reveal() { const pane = useSidePane(); return <button type="button" onClick={pane.reveal}>Message</button>; }
    render(
      <SidePaneProvider storageKey="t.pane">
        <SidePaneSplit paneTestId="the-pane">
          <Reveal />
          <SidePane title="Discussion"><Draft /></SidePane>
        </SidePaneSplit>
      </SidePaneProvider>,
    );
    fireEvent.change(screen.getByLabelText('Draft'), { target: { value: 'half' } });
    fireEvent.click(screen.getByRole('button', { name: 'Collapse discussion' }));
    expect(screen.queryByTestId('the-pane')).toBeNull();
    expect(window.localStorage.getItem('t.pane.open')).toBe('0');
    fireEvent.click(screen.getByRole('button', { name: 'Message' }));
    expect(screen.getByTestId('the-pane')).toBeTruthy();
    expect((screen.getByLabelText('Draft') as HTMLInputElement).value).toBe('half');
    expect(window.localStorage.getItem('t.pane.open')).toBe('1');
  });

  it('a page-owned pane shows while registered, its × is the page’s, and it says when it explores a selection', () => {
    const onClose = vi.fn();
    window.localStorage.setItem('t.pane.open', '0');
    render(
      <SidePaneProvider storageKey="t.pane">
        <SidePaneSplit paneTestId="the-pane">
          <SidePane title="Org Assistant" onClose={onClose} explores widthPx={{ min: 320, max: 380 }}><p>ask</p></SidePane>
        </SidePaneSplit>
        <HostProbe />
      </SidePaneProvider>,
    );
    expect(screen.getByTestId('the-pane')).toBeTruthy();
    expect(probe().explored).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Collapse org assistant' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem('t.pane.open')).toBe('0');
  });

  it('with nothing registered there is no pane and no divider; before/after stack in the column', () => {
    const { rerender } = render(<SidePaneSplit><p>page</p></SidePaneSplit>);
    expect(screen.queryByRole('separator')).toBeNull();
    rerender(<SidePaneSplit after={<section aria-label="Huddle chat" />}><p>page</p></SidePaneSplit>);
    expect(screen.getByRole('separator')).toBeTruthy();
    expect(screen.getByRole('region', { name: 'Huddle chat' })).toBeTruthy();
  });

  it('outside a host a SidePane renders nothing', () => {
    render(<SidePane title="Discussion"><p>hidden</p></SidePane>);
    expect(screen.queryByText('hidden')).toBeNull();
  });

  it('unregisters when the page unmounts', () => {
    function Page({ on }: { on: boolean }) { return on ? <SidePane title="Details"><p>d</p></SidePane> : null; }
    const { rerender } = render(<SidePaneProvider><SidePaneSplit><Page on /></SidePaneSplit><HostProbe /></SidePaneProvider>);
    expect(probe().registered).toBe(true);
    act(() => { rerender(<SidePaneProvider><SidePaneSplit><Page on={false} /></SidePaneSplit><HostProbe /></SidePaneProvider>); });
    expect(probe().registered).toBe(false);
  });
});

describe('SidePane fold and width (2.438.1)', () => {
  it('minimizes to a 44px strip and restores, remembered per device, without remounting the page', () => {
    function Draft() { const [v, setV] = useState(''); return <input aria-label="Page draft" value={v} onChange={(e) => setV(e.target.value)} />; }
    render(
      <SidePaneProvider storageKey="t.pane">
        <SidePaneSplit paneTestId="the-pane"><Draft /><SidePane title="Discussion"><p>thread</p></SidePane></SidePaneSplit>
        <HostProbe />
      </SidePaneProvider>,
    );
    fireEvent.change(screen.getByLabelText('Page draft'), { target: { value: 'kept' } });
    fireEvent.click(screen.getByRole('button', { name: 'Minimize discussion' }));
    expect(screen.queryByTestId('the-pane')).toBeNull();
    expect(screen.getByTestId('the-pane-strip').className).toContain('w-11');
    expect(window.localStorage.getItem('t.pane.folded')).toBe('1');
    expect((screen.getByLabelText('Page draft') as HTMLInputElement).value).toBe('kept');
    fireEvent.click(screen.getByRole('button', { name: 'Restore discussion' }));
    expect(screen.getByTestId('the-pane')).toBeTruthy();
    expect(window.localStorage.getItem('t.pane.folded')).toBe('0');
    // Enter on the focused divider folds it too.
    fireEvent.keyDown(screen.getByRole('separator'), { key: 'Enter' });
    expect(screen.getByTestId('the-pane-strip')).toBeTruthy();
  });

  it('remembers each pane’s width by paneId, bounded to 60% of the split', () => {
    render(
      <SidePaneProvider storageKey="t.pane">
        <SidePaneSplit paneTestId="the-pane"><p>page</p><SidePane title="Org Assistant" paneId="search" widthPx={{ min: 320, max: 380 }}><p>a</p></SidePane></SidePaneSplit>
      </SidePaneProvider>,
    );
    const divider = screen.getByRole('separator');
    fireEvent.keyDown(divider, { key: 'ArrowLeft', shiftKey: true });
    const stored = Number(window.localStorage.getItem('t.pane.ratio.search'));
    expect(stored).toBeGreaterThanOrEqual(0.4);
    expect(window.localStorage.getItem('t.pane.ratio')).toBeNull();
    fireEvent.keyDown(divider, { key: 'Home' });
    expect(Number(window.localStorage.getItem('t.pane.ratio.search'))).toBe(0.4);
  });
});
