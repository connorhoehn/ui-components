import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DocumentHeader from '../DocumentHeader';
import type { WorkspaceDocumentHeaderProps } from '../WorkspaceDocumentHeader';

const props: WorkspaceDocumentHeaderProps = {
  meta: { id: 'd', title: 'Source draft', status: 'draft', sourceType: 'custom', sourceId: '', createdBy: 'u', createdAt: '', aiModel: '' },
  mode: 'editor', participants: [], onExport: vi.fn(), onToggleHistory: vi.fn(),
};
afterEach(cleanup);

describe('shared workspace header', () => {
  it('does not infer persistence or permission from editor mode', () => {
    render(<DocumentHeader {...props} />);
    expect(screen.queryByTestId('document-save-status')).toBeNull();
    expect(screen.getByLabelText('Document title')).toHaveAttribute('readonly');
    expect(screen.queryByTestId('mode-btn-editor')).toBeNull();
  });
  it('keeps source workflow actions host-owned and title access explicit', () => {
    const rename = vi.fn();
    render(<DocumentHeader {...props} mode="reader" onUpdateMeta={rename} workflowActions={<button>Review changeset</button>} />);
    fireEvent.change(screen.getByLabelText('Document title'), { target: { value: 'Forbidden rename' } });
    expect(rename).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Review changeset' })).toBeInTheDocument();
  });
  it('shows pending, durable saved and failed receipts with actionable retry', () => {
    const retry = vi.fn();
    const { rerender } = render(<DocumentHeader {...props} saveState={{ status: 'pending' }} />);
    expect(screen.getByTestId('document-save-status')).toHaveTextContent('Saving…');
    rerender(<DocumentHeader {...props} saveState={{ status: 'saved' }} />);
    expect(screen.getByTestId('document-save-status')).toHaveTextContent('Saved');
    rerender(<DocumentHeader {...props} saveState={{ status: 'error', onRetry: retry }} />);
    expect(screen.getByTestId('document-save-status')).toHaveTextContent('Changes not saved');
    fireEvent.click(screen.getByRole('button', { name: 'Retry save' }));
    expect(retry).toHaveBeenCalledOnce();
  });
});
