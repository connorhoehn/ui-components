import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import CookbooksModal from '../CookbooksModal';
import type { DocumentType } from '../../../types/documentType';
import type { SaveOutcome } from '../../../hooks/useDocumentTypes';

function makeType(data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>): DocumentType {
  return {
    ...data,
    id: 'new-type-id',
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  } as DocumentType;
}

/** createType is async and fallible — see SaveOutcome. Default: server accepted. */
function makeCreateType(outcome?: (t: DocumentType) => SaveOutcome) {
  return vi.fn(
    async (data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>): Promise<SaveOutcome> => {
      const type = makeType(data);
      return outcome ? outcome(type) : { status: 'synced', type };
    },
  );
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

  it('invokes createType + onCreated and closes when a cookbook is installed', async () => {
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
    await waitFor(() => expect(onCreated).toHaveBeenCalledWith('new-type-id'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // The reason this modal had to change: createType became async AND fallible.
  // A `rejected` outcome means the server saved NOTHING, so announcing a
  // created type would name one that does not exist.
  it('does NOT close or report creation when the server rejects', async () => {
    const createType = makeCreateType(() => ({ status: 'rejected', error: 'name already taken' }));
    const onCreated = vi.fn();
    const onClose = vi.fn();
    render(
      <CookbooksModal open onClose={onClose} onCreated={onCreated} createType={createType} />,
    );
    fireEvent.click(screen.getByTestId('cookbook-use-meeting-notes'));

    const err = await screen.findByTestId('cookbooks-save-error');
    expect(err).toHaveTextContent('name already taken');
    expect(onCreated).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  // 'offline' DID persist locally, so the type exists for this user and the
  // caller should still proceed to the wizard.
  it('treats an offline save as created', async () => {
    const createType = makeCreateType((type) => ({ status: 'offline', type, error: 'unreachable' }));
    const onCreated = vi.fn();
    const onClose = vi.fn();
    render(
      <CookbooksModal open onClose={onClose} onCreated={onCreated} createType={createType} />,
    );
    fireEvent.click(screen.getByTestId('cookbook-use-meeting-notes'));
    await waitFor(() => expect(onCreated).toHaveBeenCalledWith('new-type-id'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('surfaces a thrown error instead of closing', async () => {
    const createType = vi.fn(async () => { throw new Error('boom'); });
    const onCreated = vi.fn();
    const onClose = vi.fn();
    render(
      <CookbooksModal open onClose={onClose} onCreated={onCreated} createType={createType} />,
    );
    fireEvent.click(screen.getByTestId('cookbook-use-meeting-notes'));
    expect(await screen.findByTestId('cookbooks-save-error')).toHaveTextContent('boom');
    expect(onCreated).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
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
