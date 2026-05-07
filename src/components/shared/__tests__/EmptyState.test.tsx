import { render, screen, fireEvent } from '@testing-library/react';
import EmptyState from '../EmptyState';

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No items found" />);
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<EmptyState icon="📭" title="Empty inbox" />);
    expect(screen.getByText('📭')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <EmptyState title="No results" body="Try adjusting your search filters." />
    );
    expect(screen.getByText('Try adjusting your search filters.')).toBeInTheDocument();
  });

  it('renders action button when actionLabel and onAction are provided', () => {
    const onAction = vi.fn();
    render(
      <EmptyState
        title="No items"
        actionLabel="Create New"
        onAction={onAction}
      />
    );
    const button = screen.getByTestId('empty-state-action');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Create New');
  });

  it('calls onAction when action button is clicked', () => {
    const onAction = vi.fn();
    render(
      <EmptyState
        title="No items"
        actionLabel="Create New"
        onAction={onAction}
      />
    );
    fireEvent.click(screen.getByTestId('empty-state-action'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('does not render action button when only actionLabel is provided without onAction', () => {
    render(<EmptyState title="No items" actionLabel="Create New" />);
    expect(screen.queryByTestId('empty-state-action')).not.toBeInTheDocument();
  });

  it('uses custom testId', () => {
    render(<EmptyState title="Empty" testId="custom-empty" />);
    expect(screen.getByTestId('custom-empty')).toBeInTheDocument();
  });
});
