import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from '../Slider';

const track = () => screen.getByRole('slider') as HTMLInputElement;

describe('Slider', () => {
  it('reports a parsed number, not the raw string', () => {
    const onChange = vi.fn();
    render(<Slider value={0.5} onChange={onChange} min={0} max={1} step={0.1} aria-label="Temp" />);
    fireEvent.change(track(), { target: { value: '0.8' } });
    expect(onChange).toHaveBeenCalledWith(0.8);
  });

  it('shows the current value by default', () => {
    // A slider with no numeric feedback is unusable for anything with a real
    // scale — "somewhere around the middle" is not a temperature.
    render(<Slider value={42} onChange={vi.fn()} aria-label="X" />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('formats the readout when given a formatter', () => {
    render(
      <Slider value={0.7} onChange={vi.fn()} readout={(v) => v.toFixed(1)} aria-label="X" />,
    );
    expect(screen.getByText('0.7')).toBeInTheDocument();
  });

  it('omits the readout when asked', () => {
    render(<Slider value={42} onChange={vi.fn()} readout={false} aria-label="X" />);
    expect(screen.queryByText('42')).toBeNull();
  });

  it('passes min, max and step through', () => {
    render(<Slider value={5} onChange={vi.fn()} min={1} max={9} step={2} aria-label="X" />);
    expect(track()).toHaveAttribute('min', '1');
    expect(track()).toHaveAttribute('max', '9');
    expect(track()).toHaveAttribute('step', '2');
  });

  it('is reachable by its accessible name', () => {
    render(<Slider value={1} onChange={vi.fn()} aria-label="Temperature" />);
    expect(screen.getByLabelText('Temperature')).toBe(track());
  });
});

// The export this component was missing: reachable from `/shared`, not only
// from the root barrel (which drags seven @tiptap packages in with it).
import { Slider as SliderFromShared } from '../../shared';

describe('Slider reachability', () => {
  it('is the same component when imported from the shared barrel', () => {
    expect(SliderFromShared).toBe(Slider);
  });
});
