import { render, screen } from '@testing-library/react';
import { ChangeDiff } from '../ChangeDiff';
// The export this component was missing: reachable from `/shared`, not only
// from the root barrel (which statically drags seven @tiptap packages in).
// Its sibling DiffViewer was already exported there, which is what made the
// asymmetry visible.
import { ChangeDiff as ChangeDiffFromShared } from '../../shared';

describe('ChangeDiff', () => {
  it('renders both sides of each pair', () => {
    render(<ChangeDiff pairs={[{ before: 'old value', after: 'new value' }]} />);
    expect(screen.getByText('old value')).toBeInTheDocument();
    expect(screen.getByText('new value')).toBeInTheDocument();
  });

  it('accepts custom side labels', () => {
    render(
      <ChangeDiff
        pairs={[{ before: 'a', after: 'b' }]}
        beforeLabel="Current"
        afterLabel="Proposed"
      />,
    );
    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.getByText('Proposed')).toBeInTheDocument();
  });

  it('is the same component when imported from the shared barrel', () => {
    expect(ChangeDiffFromShared).toBe(ChangeDiff);
  });
});
