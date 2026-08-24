import { render, screen, fireEvent, within } from '@testing-library/react';
import CookbooksModal from '../CookbooksModal';
import type { DocumentType } from '../../../types/documentType';

function makeCreateType() {
  return vi.fn((data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => ({
    ...data,
    id: 'new-type-id',
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  }) as DocumentType);
}

describe('CookbooksModal', () => {
  it('renders nothing when open is false', () => {
    const { container } = render(
      <CookbooksModal open={false} onClose={() => {}} onCreated={() => {}} createType={makeCreateType()} />,
    );
    expect(container.textContent).toBe('');
  });

  it('renders the catalog title, search input, and category pills when open', () => {
    render(
      <CookbooksModal open onClose={() => {}} onCreated={() => {}} createType={makeCreateType()} />,
    );
    expect(screen.getByText('Document type cookbooks')).toBeInTheDocument();
    expect(screen.getByTestId('cookbooks-search')).toBeInTheDocument();
    expect(screen.getByTestId('cookbook-cat-all')).toBeInTheDocument();
    // Grid populated with at least one card.
    expect(screen.getByTestId('cookbooks-grid')).toBeInTheDocument();
  });

  it('shows the empty-state when the search matches nothing', () => {
    render(
      <CookbooksModal open onClose={() => {}} onCreated={() => {}} createType={makeCreateType()} />,
    );
    fireEvent.change(screen.getByTestId('cookbooks-search'), {
      target: { value: 'zzzzzz-no-such-cookbook' },
    });
    expect(screen.getByTestId('cookbooks-empty')).toBeInTheDocument();
  });

  it('invokes createType + onCreated and closes when a cookbook is installed', () => {
    const createType = makeCreateType();
    const onCreated = vi.fn();
    const onClose = vi.fn();
    render(
      <CookbooksModal
        open
        onClose={onClose}
        onCreated={onCreated}
        createType={createType}
      />,
    );
    fireEvent.click(screen.getByTestId('cookbook-use-meeting-notes'));
    expect(createType).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onCreated).toHaveBeenCalledWith('new-type-id');
  });
});

// ── Deep a11y audit ─────────────────────────────────────────────────────
describe('CookbooksModal — accessibility', () => {
  it('names the search field beyond its placeholder', () => {
    render(
      <CookbooksModal open onClose={() => {}} onCreated={() => {}} createType={makeCreateType()} />,
    );
    expect(screen.getByRole('searchbox', { name: 'Search cookbooks' })).toBeInTheDocument();
  });

  it('exposes the active category filter via aria-pressed', () => {
    render(
      <CookbooksModal open onClose={() => {}} onCreated={() => {}} createType={makeCreateType()} />,
    );
    const group = screen.getByRole('group', { name: 'Filter by category' });
    // Which pill is active used to be conveyed by colour alone.
    expect(screen.getByTestId('cookbook-cat-all')).toHaveAttribute('aria-pressed', 'true');

    const pills = within(group).getAllByRole('button');
    const other = pills.find((p) => p.getAttribute('data-testid') !== 'cookbook-cat-all');
    expect(other).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(other as HTMLElement);
    expect(other).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('cookbook-cat-all')).toHaveAttribute('aria-pressed', 'false');
  });
});
