import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SegmentedControl } from '../SegmentedControl';

const OPTIONS = [
  { label: 'List', value: 'list' },
  { label: 'Grid', value: 'grid' },
];

describe('SegmentedControl', () => {
  it('marks the active segment with aria-pressed', () => {
    render(<SegmentedControl options={OPTIONS} value="grid" onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Grid' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'List' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('reports the clicked value', () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={OPTIONS} value="list" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Grid' }));
    expect(onChange).toHaveBeenCalledWith('grid');
  });

  it('groups the segments', () => {
    render(<SegmentedControl options={OPTIONS} value="list" onChange={() => {}} />);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  // `role="group"` with no name announces as a bare "group" — a reader
  // arriving at Public / Private is told two unrelated toggle buttons rather
  // than one setting with two values. Inside a form the name should come from
  // the visible label, not a second copy of the wording that can drift.
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
    expect(screen.getByRole('group')).toHaveAccessibleName('Who can find you');
  });
});
