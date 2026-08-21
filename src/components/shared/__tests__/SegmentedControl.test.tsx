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
});
