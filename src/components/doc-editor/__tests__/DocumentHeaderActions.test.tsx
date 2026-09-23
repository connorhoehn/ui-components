// The `actions` variant: the header's right-hand cluster for EditorShell's
// headActions slot, without the title, save state or banners.
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { DocumentMeta } from '../../../types/document';
import WorkspaceDocumentHeader, { DocumentLifecyclePill, WorkspaceDocumentHeaderNotices } from '../WorkspaceDocumentHeader';

const meta: DocumentMeta = {
  id: 'd1', title: 'My Doc', sourceType: 'notes', sourceId: 's1',
  createdBy: 'u1', createdAt: '2026-01-01T00:00:00Z', aiModel: 'claude', status: 'draft',
};

afterEach(cleanup);

describe('WorkspaceDocumentHeader variant="actions"', () => {
  it('renders the actions and menu but no title, save state or lifecycle pill', () => {
    render(
      <WorkspaceDocumentHeader
        variant="actions"
        meta={{ ...meta, updatedAt: '2026-01-01T00:00:00Z' }}
        mode="editor"
        participants={[]}
        saveState={{ status: 'saved' }}
        lifecycleStatus="draft"
        onToggleHistory={vi.fn()}
        onToggleMyItems={vi.fn()}
        onShare={vi.fn()}
        owner={null}
      />,
    );
    const root = screen.getByTestId('document-header');
    expect(root.getAttribute('data-variant')).toBe('actions');
    expect(screen.queryByLabelText('Document title')).toBeNull();
    expect(screen.queryByTestId('document-save-status')).toBeNull();
    expect(screen.queryByTestId('lifecycle-status')).toBeNull();
    expect(screen.queryByText(/Last edited/)).toBeNull();
    expect(screen.getByText('My Items')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'More actions' })).toBeInTheDocument();
  });

  it('keeps the lifecycle confirmation dialog working', () => {
    const onLifecycleAction = vi.fn();
    render(
      <WorkspaceDocumentHeader
        variant="actions"
        meta={meta}
        mode="editor"
        participants={[]}
        lifecycleActions={['submit_for_review']}
        onLifecycleAction={onLifecycleAction}
      />,
    );
    fireEvent.click(screen.getByTestId('lifecycle-action-submit_for_review'));
    const buttons = screen.getAllByRole('button', { name: 'Submit for review' });
    fireEvent.click(buttons[buttons.length - 1]!);
    expect(onLifecycleAction).toHaveBeenCalledWith('submit_for_review', undefined);
  });

  it('does not render the banners; the notices component does', () => {
    const error = { kind: 'forbidden' as const, message: 'Document has no established owner' };
    const { rerender } = render(
      <WorkspaceDocumentHeader variant="actions" meta={meta} mode="editor" participants={[]} lifecycleError={error} />,
    );
    expect(screen.queryByTestId('lifecycle-error')).toBeNull();
    rerender(<WorkspaceDocumentHeaderNotices lifecycleError={error} canClaimOwnership />);
    expect(screen.getByTestId('lifecycle-error')).toBeInTheDocument();
    expect(screen.getByTestId('lifecycle-ownerless-note').textContent).toMatch(/Take ownership/);
  });

  it('renders nothing from the notices when there is nothing to say', () => {
    const { container } = render(<WorkspaceDocumentHeaderNotices />);
    expect(container.innerHTML).toBe('');
  });

  it('prints the lifecycle pill the header used to', () => {
    render(<DocumentLifecyclePill status="in_review" />);
    expect(screen.getByTestId('lifecycle-status').textContent).toMatch(/In review/);
  });
});
