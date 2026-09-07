// The wizard's "Export Schema" seam.
//
// Three things this pins, all of them the difference between a page and a
// LIBRARY page:
//
//   1. A failed export reports inline. The version this was de-forked from
//      called `alert()`, which assumes the host has a modal-capable window,
//      cannot be styled or suppressed by an embedder, and cannot be asserted
//      on at all — jsdom's alert throws "not implemented".
//   2. The default request carries `Authorization` from `idToken`. Every
//      other /api/document-types call this surface makes is authenticated via
//      documentTypeApiAdapter; the export was the one that was not, so it
//      only ever worked against a SKIP_AUTH dev stack.
//   3. `onExportSchema` replaces the request entirely, for a host whose
//      schemas do not live at that path.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DocumentTypeWizard } from '../DocumentTypeWizard';
import type { DocumentType } from '../../../types/documentType';

const existingType: DocumentType = {
  id: 'type-1',
  name: 'Sprint Planning',
  description: '',
  icon: '📄',
  fields: [],
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

describe('DocumentTypeWizard — export schema seam', () => {
  beforeEach(() => {
    // jsdom has neither; the export path touches both on success.
    if (!URL.createObjectURL) {
      Object.defineProperty(URL, 'createObjectURL', { value: vi.fn(() => 'blob:x'), writable: true });
      Object.defineProperty(URL, 'revokeObjectURL', { value: vi.fn(), writable: true });
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('reports a failed export inline instead of calling alert()', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('nope', { status: 500, statusText: 'Internal Server Error' }),
    );
    const user = userEvent.setup();
    render(<DocumentTypeWizard initialType={existingType} onSave={vi.fn()} onCancel={vi.fn()} />);

    await user.click(screen.getByTitle('Download JSON Schema'));

    const banner = await screen.findByTestId('export-schema-error');
    expect(banner).toHaveTextContent(/Export failed/);
    expect(banner).toHaveAttribute('role', 'alert');
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it('sends the bearer token on the default export request', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 200 }));
    const user = userEvent.setup();
    render(
      <DocumentTypeWizard
        initialType={existingType}
        idToken="tok-abc"
        onSave={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    await user.click(screen.getByTitle('Download JSON Schema'));

    expect(fetchSpy).toHaveBeenCalledWith(
      '/api/document-types/type-1/schema',
      expect.objectContaining({ headers: { Authorization: 'Bearer tok-abc' } }),
    );
  });

  it('onExportSchema replaces the built-in request entirely', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const onExportSchema = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(
      <DocumentTypeWizard
        initialType={existingType}
        onSave={vi.fn()}
        onCancel={vi.fn()}
        onExportSchema={onExportSchema}
      />,
    );

    await user.click(screen.getByTitle('Download JSON Schema'));

    expect(onExportSchema).toHaveBeenCalledWith(existingType);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(screen.queryByTestId('export-schema-error')).not.toBeInTheDocument();
  });

  it('surfaces a rejection from onExportSchema in the same inline banner', async () => {
    const user = userEvent.setup();
    render(
      <DocumentTypeWizard
        initialType={existingType}
        onSave={vi.fn()}
        onCancel={vi.fn()}
        onExportSchema={() => Promise.reject(new Error('no exporter configured'))}
      />,
    );

    await user.click(screen.getByTitle('Download JSON Schema'));

    expect(await screen.findByTestId('export-schema-error')).toHaveTextContent(
      'no exporter configured',
    );
  });
});
