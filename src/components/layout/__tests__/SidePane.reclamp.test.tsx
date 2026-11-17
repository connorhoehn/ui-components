import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SidePane, SidePaneProvider, SidePaneSplit, floorSidePaneRatio } from '../SidePane';
import { SplitPane } from '../SplitPane';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });
beforeEach(() => window.localStorage.clear());

let width = 1240;
function mockWidth() {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
    x: 0, y: 0, left: 0, top: 0, right: width, bottom: 800, width, height: 800, toJSON: () => ({}),
  }));
}
const primaryPct = () => parseFloat((screen.getByTestId('side-pane-split-primary') as HTMLElement).style.flexBasis);

describe('floorSidePaneRatio', () => {
  it('keeps the pane at its minimum and the page at its own', () => {
    // 1240px split, 560px pane floor → the page may take at most 680px (54.8%).
    expect(floorSidePaneRatio(0.6, 1240, 560, 520)).toBeCloseTo(680 / 1240);
    expect(floorSidePaneRatio(0.5, 1240, 560, 520)).toBe(0.5);
    // The page's floor: at least 520px.
    expect(floorSidePaneRatio(0.2, 1240, 560, 520)).toBeCloseTo(520 / 1240);
    // Too narrow for both: any ratio between the two floors stays.
    expect(floorSidePaneRatio(0.5, 1000, 560, 520)).toBe(0.5);
    expect(floorSidePaneRatio(0.5, null, 560, 520)).toBe(0.5);
  });
});

describe('SidePane re-clamps on resize', () => {
  it('draws a remembered share no narrower than the pane minimum at a narrower window', () => {
    // The share it got at a wide window (0.6 of 1600 = 640px pane) is remembered.
    window.localStorage.setItem('t.pane.ratio.review', '0.6');
    width = 1240;
    mockWidth();
    render(
      <SidePaneProvider storageKey="t.pane">
        <SidePaneSplit><p>page</p><SidePane title="Review" paneId="review" widthPx={{ min: 560, max: 640 }}><p>pane</p></SidePane></SidePaneSplit>
      </SidePaneProvider>,
    );
    // 0.6 would leave a 496px pane; it draws at 560px instead.
    expect(primaryPct()).toBeCloseTo((680 / 1240) * 100, 0);
  });

  it('a window resize inside the floors does not record a width the reader never chose', () => {
    width = 1600;
    mockWidth();
    render(
      <SidePaneProvider storageKey="t.pane">
        <SidePaneSplit><p>page</p><SidePane title="Review" paneId="review" widthPx={{ min: 560, max: 640 }}><p>pane</p></SidePane></SidePaneSplit>
      </SidePaneProvider>,
    );
    // Unsized: bounded to 560–640px at 1600 → 0.72 gives 448px → 560px.
    expect(primaryPct()).toBeCloseTo((1040 / 1600) * 100, 0);
    width = 1280;
    act(() => { window.dispatchEvent(new Event('resize')); });
    expect(window.localStorage.getItem('t.pane.ratio.review')).toBeNull();
    // Still bounded by widthPx at the new width, not the old share.
    expect(primaryPct()).toBeCloseTo((720 / 1280) * 100, 0);
  });

  it('stops a drag at the pane minimum', () => {
    width = 1240;
    mockWidth();
    render(
      <SidePaneProvider storageKey="t.pane">
        <SidePaneSplit><p>page</p><SidePane title="Review" paneId="review" widthPx={{ min: 560, max: 640 }}><p>pane</p></SidePane></SidePaneSplit>
      </SidePaneProvider>,
    );
    fireEvent.keyDown(screen.getByRole('separator'), { key: 'End' });
    expect(Number(window.localStorage.getItem('t.pane.ratio.review'))).toBeCloseTo(680 / 1240, 2);
  });
});

describe('SplitPane resize re-clamp', () => {
  it('reports only a ratio outside the floors', () => {
    width = 1000;
    mockWidth();
    const onRatioChange = vi.fn();
    const { rerender } = render(<SplitPane primary={<p>a</p>} secondary={<p>b</p>} ratio={0.5} onRatioChange={onRatioChange} minPrimaryPx={280} minSecondaryPx={360} />);
    act(() => { window.dispatchEvent(new Event('resize')); });
    expect(onRatioChange).not.toHaveBeenCalled();
    rerender(<SplitPane primary={<p>a</p>} secondary={<p>b</p>} ratio={0.8} onRatioChange={onRatioChange} minPrimaryPx={280} minSecondaryPx={360} />);
    act(() => { window.dispatchEvent(new Event('resize')); });
    expect(onRatioChange).toHaveBeenLastCalledWith(0.64);
  });
});
