import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CanvasPaneLayout, canvasPaneGeometry } from '../CanvasPaneLayout';
import { useCanvasPaneInset } from '../canvasPaneInset';

function Inset() {
  return <p data-testid="inset">{useCanvasPaneInset().right}</p>;
}

describe('canvasPaneGeometry', () => {
  it('gives the pane a column while the canvas keeps its floor', () => {
    expect(canvasPaneGeometry(1000)).toEqual({ placement: 'column', paneWidth: 300, canvasWidth: 700 });
    expect(canvasPaneGeometry(1600).paneWidth).toBe(380);
  });
  it('overlays below the canvas floor instead of leaving a sliver (NFR #173: 579 px panel)', () => {
    const g = canvasPaneGeometry(579);
    expect(g.placement).toBe('overlay');
    expect(g.paneWidth).toBe(280);
  });
  it('an overlay always leaves a strip of canvas', () => {
    expect(canvasPaneGeometry(300).paneWidth).toBe(252);
  });
});

describe('CanvasPaneLayout', () => {
  it('has no pane placement when nothing is open', () => {
    render(<CanvasPaneLayout width={900}><p>canvas</p></CanvasPaneLayout>);
    expect(screen.getByTestId('canvas-pane-layout').dataset.placement).toBe('none');
  });
  it('folds to a rail and unfolds; a new item unfolds it', () => {
    const { rerender } = render(<CanvasPaneLayout width={579} expandKey="a" pane={<p>pane a</p>}><p>canvas</p></CanvasPaneLayout>);
    const root = screen.getByTestId('canvas-pane-layout');
    expect(root.dataset.placement).toBe('overlay');
    fireEvent.click(screen.getByRole('button', { name: 'Hide details' }));
    expect(root.dataset.placement).toBe('collapsed');
    expect(screen.queryByText('pane a')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Show details' }));
    expect(root.dataset.placement).toBe('overlay');
    fireEvent.click(screen.getByRole('button', { name: 'Hide details' }));
    rerender(<CanvasPaneLayout width={579} expandKey="b" pane={<p>pane b</p>}><p>canvas</p></CanvasPaneLayout>);
    expect(root.dataset.placement).toBe('overlay');
    expect(screen.getByText('pane b')).toBeTruthy();
  });
  it('is a column when wide', () => {
    render(<CanvasPaneLayout width={1200} pane={<p>pane</p>}><p>canvas</p></CanvasPaneLayout>);
    expect(screen.getByTestId('canvas-pane-layout-pane').dataset.placement).toBe('column');
  });
});

describe('CanvasPaneLayout inset (NFR #173: pan the selected card out from under the pane)', () => {
  it('tells the canvas how much an overlay covers', () => {
    render(<CanvasPaneLayout width={579} pane={<p>pane</p>}><Inset /></CanvasPaneLayout>);
    expect(screen.getByTestId('inset')).toHaveTextContent('280');
  });
  it('a column or a folded pane covers nothing', () => {
    const { rerender } = render(<CanvasPaneLayout width={1200} pane={<p>pane</p>}><Inset /></CanvasPaneLayout>);
    expect(screen.getByTestId('inset')).toHaveTextContent('0');
    rerender(<CanvasPaneLayout width={579} collapsed pane={<p>pane</p>}><Inset /></CanvasPaneLayout>);
    expect(screen.getByTestId('inset')).toHaveTextContent('0');
  });
  it('no pane, no inset', () => {
    render(<CanvasPaneLayout width={579}><Inset /></CanvasPaneLayout>);
    expect(screen.getByTestId('inset')).toHaveTextContent('0');
  });
});
