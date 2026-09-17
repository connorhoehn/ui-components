// One choice out of a few — which is what every caller uses this for.
//
// It used to be a `role="group"` of `aria-pressed` buttons, so a reader was
// told "Public, pressed" and then "Private, not pressed": several independent
// toggles, with nothing saying they are one question, and one tab stop each.
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { SegmentedControl } from '../SegmentedControl';

afterEach(cleanup);

const OPTIONS = [
  { label: 'List', value: 'list' },
  { label: 'Grid', value: 'grid' },
];

const THREE = [
  { label: 'Editing', value: 'editing' },
  { label: 'Suggesting', value: 'suggesting' },
  { label: 'Viewing', value: 'viewing' },
];

describe('SegmentedControl', () => {
  it('is one radiogroup, and the options are its values', () => {
    render(<SegmentedControl options={OPTIONS} value="grid" onChange={() => {}} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Grid' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'List' })).toHaveAttribute('aria-checked', 'false');
  });

  it('reports the clicked value', () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={OPTIONS} value="list" onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio', { name: 'Grid' }));
    expect(onChange).toHaveBeenCalledWith('grid');
  });

  it('costs ONE tab stop, and it is on the current answer', () => {
    // Tab should land on what is chosen, not always on the first option.
    render(<SegmentedControl options={THREE} value="viewing" onChange={() => {}} />);
    const radios = screen.getAllByRole('radio');
    expect(radios.filter((r) => r.tabIndex === 0)).toHaveLength(1);
    expect(screen.getByRole('radio', { name: 'Viewing' }).tabIndex).toBe(0);
  });

  it('stays reachable when nothing is chosen yet', () => {
    render(<SegmentedControl options={THREE} value="" onChange={() => {}} />);
    expect(screen.getAllByRole('radio').filter((r) => r.tabIndex === 0)).toHaveLength(1);
  });

  it('moves AND chooses with the arrow keys, which is what it looks like it does', () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={THREE} value="editing" onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('radio', { name: 'Editing' }), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('suggesting');
  });

  it('treats down as right and up as left, so either axis works', () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={THREE} value="suggesting" onChange={onChange} />);
    const el = screen.getByRole('radio', { name: 'Suggesting' });
    fireEvent.keyDown(el, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith('viewing');
    fireEvent.keyDown(el, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith('editing');
  });

  it('wraps at both ends', () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={THREE} value="editing" onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('radio', { name: 'Editing' }), { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith('viewing');
  });

  it('jumps to the ends with Home and End', () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={THREE} value="suggesting" onChange={onChange} />);
    const el = screen.getByRole('radio', { name: 'Suggesting' });
    fireEvent.keyDown(el, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith('editing');
    fireEvent.keyDown(el, { key: 'End' });
    expect(onChange).toHaveBeenCalledWith('viewing');
  });

  it('does nothing on the arrows while disabled', () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={THREE} value="editing" onChange={onChange} disabled />);
    fireEvent.keyDown(screen.getByRole('radio', { name: 'Editing' }), { key: 'ArrowRight' });
    expect(onChange).not.toHaveBeenCalled();
  });

  // Inside a form the name should come from the visible label, not a second
  // copy of the wording that can drift from it.
  it('takes its name from the label that already says what it is for', () => {
    render(
      <>
        <span id="vis-label">Who can find you</span>
        <SegmentedControl
          aria-labelledby="vis-label"
          value="public"
          onChange={() => {}}
          options={[{ value: 'public', label: 'Public' }, { value: 'private', label: 'Private' }]}
        />
      </>,
    );
    expect(screen.getByRole('radiogroup')).toHaveAccessibleName('Who can find you');
  });
});
