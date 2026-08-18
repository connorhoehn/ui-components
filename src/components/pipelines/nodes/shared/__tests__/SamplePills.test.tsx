import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SamplePills from '../SamplePills';

describe('SamplePills', () => {
  it('renders one button per sample', () => {
    render(<SamplePills samples={['$.a', '$.b']} onSelect={vi.fn()} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByText('$.a')).toBeInTheDocument();
  });

  it('hands the picked value back', () => {
    const onSelect = vi.fn();
    render(<SamplePills samples={['$.trigger.imageRef']} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('$.trigger.imageRef'));
    expect(onSelect).toHaveBeenCalledWith('$.trigger.imageRef');
  });

  it('renders nothing at all when there are no samples', () => {
    // The seventeen inlined copies rendered an empty flex wrapper, whose
    // `mt-1.5` showed up as a stray gap under any input with no upstream
    // suggestions to offer.
    render(<SamplePills samples={[]} onSelect={vi.fn()} />);
    expect(screen.queryByTestId('sample-pills')).toBeNull();
  });

  it('is a labelled group so the buttons are not loose in the form', () => {
    render(
      <SamplePills
        samples={['$.a']}
        onSelect={vi.fn()}
        aria-label="Upstream image refs"
      />,
    );
    expect(screen.getByRole('group', { name: 'Upstream image refs' })).toBeInTheDocument();
  });

  it('uses type="button" so a pill never submits an enclosing form', () => {
    render(<SamplePills samples={['$.a']} onSelect={vi.fn()} />);
    expect(screen.getByText('$.a')).toHaveAttribute('type', 'button');
  });
});
