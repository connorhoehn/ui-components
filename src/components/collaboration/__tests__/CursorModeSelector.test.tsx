import { render, screen, fireEvent } from '@testing-library/react';
import { CursorModeSelector } from '../CursorModeSelector';
import type { CursorMode } from '../CursorModeSelector';

describe('CursorModeSelector', () => {
  it('renders all four mode buttons with their labels', () => {
    render(<CursorModeSelector activeMode="freeform" onModeChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Freeform' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Table' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Text' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Canvas' })).toBeInTheDocument();
  });

  it('applies active styling only to the active mode button', () => {
    render(<CursorModeSelector activeMode="text" onModeChange={() => {}} />);
    const activeBtn = screen.getByRole('button', { name: 'Text' });
    const inactiveBtn = screen.getByRole('button', { name: 'Freeform' });
    expect(activeBtn.className).toMatch(/bg-\[#007bff\]/);
    expect(activeBtn.className).toMatch(/text-white/);
    expect(inactiveBtn.className).not.toMatch(/bg-\[#007bff\]/);
    expect(inactiveBtn.className).toMatch(/text-text-primary/);
  });

  it('invokes onModeChange with the corresponding CursorMode when a non-active button is clicked', () => {
    const onModeChange = vi.fn();
    render(<CursorModeSelector activeMode="freeform" onModeChange={onModeChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Table' }));
    expect(onModeChange).toHaveBeenCalledTimes(1);
    expect(onModeChange).toHaveBeenCalledWith('table' satisfies CursorMode);
  });

  it('fires onModeChange for each of the four modes with the right value', () => {
    const onModeChange = vi.fn();
    render(<CursorModeSelector activeMode="freeform" onModeChange={onModeChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Freeform' }));
    fireEvent.click(screen.getByRole('button', { name: 'Table' }));
    fireEvent.click(screen.getByRole('button', { name: 'Text' }));
    fireEvent.click(screen.getByRole('button', { name: 'Canvas' }));
    const calls = onModeChange.mock.calls.map((c) => c[0]);
    expect(calls).toEqual(['freeform', 'table', 'text', 'canvas']);
  });

  it('still fires onModeChange when the already-active mode is clicked (parent decides whether to no-op)', () => {
    const onModeChange = vi.fn();
    render(<CursorModeSelector activeMode="canvas" onModeChange={onModeChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Canvas' }));
    expect(onModeChange).toHaveBeenCalledTimes(1);
    expect(onModeChange).toHaveBeenCalledWith('canvas');
  });
});
