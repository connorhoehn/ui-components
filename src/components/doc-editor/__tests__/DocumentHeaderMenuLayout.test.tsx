// actionsLayout="menu": the Documents mockups' editor head — Share · (i) · ⋯.
// The owner line, the mode, My Items and the lifecycle actions live in ⋯.
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { DocumentMeta } from '../../../types/document';
import WorkspaceDocumentHeader from '../WorkspaceDocumentHeader';

const meta: DocumentMeta = {
  id: 'd1', title: 'Release plan', sourceType: 'notes', sourceId: 's1',
  createdBy: 'u1', createdAt: '2026-01-01T00:00:00Z', aiModel: 'claude', status: 'draft',
};

afterEach(cleanup);

function renderMenu(extra: Partial<Parameters<typeof WorkspaceDocumentHeader>[0]> = {}) {
  return render(
    <WorkspaceDocumentHeader
      variant="actions"
      actionsLayout="menu"
      meta={meta}
      mode="editor"
      modeReason="You own this document."
      participants={[]}
      owner={{ userId: 'u1', displayName: 'Connor Hoehn' }}
      onToggleMyItems={vi.fn()}
      myItemCount={2}
      commentCount={3}
      onToggleHistory={vi.fn()}
      {...extra}
    />,
  );
}

describe('WorkspaceDocumentHeader actionsLayout="menu"', () => {
  it('keeps the row to the menu: no mode pill, My Items button, owner block or comment chip', () => {
    renderMenu();
    expect(screen.queryByTestId('document-mode-pill')).toBeNull();
    expect(screen.queryByText('My Items (2)')).toBeNull();
    expect(screen.queryByText('Connor Hoehn')).toBeNull();
    expect(screen.getByRole('button', { name: 'More actions' })).toBeInTheDocument();
  });

  it('states the owner, the mode and its reason, and My items inside ⋯', () => {
    const onToggleMyItems = vi.fn();
    renderMenu({ onToggleMyItems });
    fireEvent.click(screen.getByRole('button', { name: 'More actions' }));
    expect(screen.getByText('Owned by Connor Hoehn')).toBeInTheDocument();
    expect(screen.getByTestId('document-header-menu-mode')).toHaveTextContent('Editing');
    expect(screen.getByTestId('document-header-menu-mode')).toHaveTextContent('You own this document.');
    fireEvent.click(screen.getByTestId('document-header-menu-my-items'));
    expect(onToggleMyItems).toHaveBeenCalled();
  });

  it('offers the lifecycle actions from ⋯ and still confirms them', () => {
    const onLifecycleAction = vi.fn();
    renderMenu({ lifecycleActions: ['submit_for_review'], onLifecycleAction });
    expect(screen.queryByTestId('lifecycle-actions')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'More actions' }));
    fireEvent.click(screen.getByTestId('lifecycle-action-submit_for_review'));
    const buttons = screen.getAllByRole('button', { name: 'Submit for review' });
    fireEvent.click(buttons[buttons.length - 1]!);
    expect(onLifecycleAction).toHaveBeenCalledWith('submit_for_review', undefined);
  });

  it('leaves the default cluster unchanged', () => {
    render(<WorkspaceDocumentHeader variant="actions" meta={meta} mode="editor" participants={[]} onToggleMyItems={vi.fn()} />);
    expect(screen.getByTestId('document-mode-pill')).toBeInTheDocument();
    expect(screen.getByText('My Items')).toBeInTheDocument();
  });
});
