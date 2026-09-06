// Whose document is this, and who else is on it — the first question anyone
// opening someone else's page asks, and the one a status pill cannot answer.

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DocumentOwnership } from '../DocumentOwnership';

afterEach(cleanup);

const person = (n: string) => ({ userId: `u-${n}`, displayName: n });

describe('DocumentOwnership', () => {
  it('renders nothing until the owner is known', () => {
    const { container } = render(<DocumentOwnership />);
    expect(container).toBeEmptyDOMElement();
  });

  // "Owned by X" not a bare name: a name beside a status pill reads as "who
  // last touched it", which is a different fact.
  it('names the owner as the owner', () => {
    render(<DocumentOwnership owner={person('Eve Thompson')} />);
    expect(screen.getByTestId('document-ownership-owner')).toHaveTextContent('Owned by Eve Thompson');
  });

  it('shows collaborators beside the owner', () => {
    render(
      <DocumentOwnership owner={person('Eve')} collaborators={[person('Ana'), person('Bo')]} />,
    );
    expect(screen.getByTestId('document-ownership-collaborators')).toBeInTheDocument();
    expect(screen.queryByTestId('document-ownership-overflow')).toBeNull();
  });

  it('collapses the tail into a count rather than a wall of faces', () => {
    render(
      <DocumentOwnership
        owner={person('Eve')}
        collaborators={[person('A'), person('B'), person('C'), person('D'), person('E')]}
      />,
    );
    expect(screen.getByTestId('document-ownership-overflow')).toHaveTextContent('+2');
  });

  it('names the hidden people for a reader who hovers', () => {
    render(
      <DocumentOwnership
        owner={person('Eve')}
        maxAvatars={1}
        collaborators={[person('A'), person('Bo Diaz')]}
      />,
    );
    expect(screen.getByTestId('document-ownership-overflow')).toHaveAttribute('title', 'Bo Diaz');
  });

  it('offers no Share control to a host that cannot handle it', () => {
    render(<DocumentOwnership owner={person('Eve')} />);
    expect(screen.queryByTestId('document-ownership-share')).toBeNull();
  });

  it('asks the host to open sharing', () => {
    const onShare = vi.fn();
    render(<DocumentOwnership owner={person('Eve')} onShare={onShare} />);
    fireEvent.click(screen.getByTestId('document-ownership-share'));
    expect(onShare).toHaveBeenCalledTimes(1);
  });
});
