import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CanvasZoomControls } from '../CanvasZoomControls';

afterEach(cleanup);

describe('CanvasZoomControls', () => {
  it('shows the zoom as a percentage and calls back', () => {
    const onIn = vi.fn();
    const onOut = vi.fn();
    const onFit = vi.fn();
    render(<CanvasZoomControls zoom={1} onZoomIn={onIn} onZoomOut={onOut} onFit={onFit} />);
    expect(screen.getByRole('toolbar', { name: 'Zoom' })).toBeTruthy();
    expect(screen.getByLabelText('Zoom 100%').textContent).toBe('100%');
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));
    fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
    expect(onIn).toHaveBeenCalledTimes(1);
    expect(onOut).toHaveBeenCalledTimes(1);
    expect(onFit).toHaveBeenCalledTimes(1);
  });

  it('disables the buttons at the zoom limits', () => {
    const { rerender } = render(<CanvasZoomControls zoom={0.5} minZoom={0.5} maxZoom={2} onZoomIn={() => {}} onZoomOut={() => {}} />);
    expect((screen.getByRole('button', { name: 'Zoom out' }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole('button', { name: 'Zoom in' }) as HTMLButtonElement).disabled).toBe(false);
    rerender(<CanvasZoomControls zoom={2} minZoom={0.5} maxZoom={2} onZoomIn={() => {}} onZoomOut={() => {}} />);
    expect((screen.getByRole('button', { name: 'Zoom in' }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('hides the readout without a zoom and the fit button without onFit', () => {
    render(<CanvasZoomControls onZoomIn={() => {}} onZoomOut={() => {}} />);
    expect(screen.queryByTestId('canvas-zoom-controls-percent')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Fit to view' })).toBeNull();
  });
});
