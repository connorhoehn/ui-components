import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MediaCollectionCard } from '../MediaCollectionCard';

describe('MediaCollectionCard empty variant (2.515.0)', () => {
  const noop = () => {};
  it('hideWhenEmpty draws nothing without previews', () => {
    const { container } = render(<MediaCollectionCard title="Review movie" previews={[]} onOpen={noop} onPlay={noop} hideWhenEmpty />);
    expect(container).toBeEmptyDOMElement();
  });
  it('emptyLabel draws one EmptyState line instead of the 16:9 card', () => {
    const { container } = render(<MediaCollectionCard title="Review movie" previews={[]} onOpen={noop} onPlay={noop} emptyLabel="No review movie yet" />);
    expect(container.querySelector('[data-media-collection]')).toBeNull();
    expect(screen.getByTestId('media-collection-empty')).toHaveTextContent('No review movie yet');
    expect(screen.queryByRole('button', { name: 'Play Review movie' })).toBeNull();
  });
  it('with previews both options are inert: the card draws', () => {
    render(<MediaCollectionCard title="Ep" previews={[{ id: 'a', label: 'Cut 1' }]} onOpen={noop} onPlay={noop} hideWhenEmpty emptyLabel="none" />);
    expect(screen.getByRole('button', { name: 'Play Ep' })).toBeEnabled();
  });
});
