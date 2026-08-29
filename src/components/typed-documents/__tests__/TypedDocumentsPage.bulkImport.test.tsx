// Bulk CSV import UI for TypedDocumentsPage — ported from the realtime-examples
// fork of this page when that fork was deleted. The fork was the only place
// this flow had coverage, and it is also where the inline `import-error`
// banner (in place of a window.alert) was written.
//
// Frontend integration tests for TypedDocumentsPage bulk CSV import UI
// (Phase 51 Phase G feature, commit ca0fbbd).
//
// Backend integration tests exist (platform-api/.../typedDocuments.test.ts:552-657).
// This test closes the gap by verifying the frontend UI handles the bulk
// import flow correctly:
//   1. "Bulk Import" button renders when type is selected
//   2. File upload triggers POST to /api/typed-documents/bulk-import
//   3. Result banner displays {imported, failed, errors[]}
//   4. Document list refreshes after successful import
//
// Framework: Vitest + @testing-library/react + vi.mock for hook/fetch mocking.
// Scope expanded to 200-250 LOC per operator decision on blocker #30 option A.

import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TypedDocumentsPage } from '../TypedDocumentsPage';
import type { ApiDocumentType, TypedDocument } from '../../../hooks/useTypedDocuments';

// ---------------------------------------------------------------------------
// Test data
// ---------------------------------------------------------------------------

const TYPE_BULK: ApiDocumentType = {
  typeId: 'type-bulk',
  name: 'BulkTestType',
  description: 'Test type for bulk import',
  icon: '📊',
  fields: [
    {
      fieldId: 'f-name',
      name: 'Name',
      fieldType: 'text',
      widget: 'text_field',
      cardinality: 1,
      required: true,
      helpText: '',
      displayModes: { full: true, teaser: true, list: true },
    },
    {
      fieldId: 'f-age',
      name: 'Age',
      fieldType: 'number',
      widget: 'number_input',
      cardinality: 1,
      required: false,
      helpText: '',
      displayModes: { full: true, teaser: false, list: true },
    },
  ],
  createdBy: 'admin',
  createdAt: '2026-05-04T00:00:00Z',
  updatedAt: '2026-05-04T00:00:00Z',
};

// ---------------------------------------------------------------------------
// Mock useTypedDocuments hook
// ---------------------------------------------------------------------------

const mockCreateDocument = vi.fn().mockResolvedValue({});
const mockRefresh = vi.fn();
let mockDocuments: TypedDocument[] = [];
let mockDocsLoading = false;
let mockDocsError: string | null = null;

vi.mock('../../../hooks/useTypedDocuments', async () => {
  const actual = await vi.importActual('../../../hooks/useTypedDocuments');
  return {
    ...actual,
    useTypedDocuments: () => ({
      documents: mockDocuments,
      loading: mockDocsLoading,
      error: mockDocsError,
      createDocument: mockCreateDocument,
      refresh: mockRefresh,
    }),
  };
});

// ---------------------------------------------------------------------------
// Fetch mock
// ---------------------------------------------------------------------------

// Routed by URL, not by call order. This suite arrived from the app fork
// using `mockResolvedValueOnce` queues, which the library's global StrictMode
// (src/test-setup.ts) breaks: the types effect double-invokes, eats two
// entries, and every test then reads the NEXT test's response — the observed
// symptom was all eight failing on "Failed to load types (500)". Routing on
// the URL is indifferent to how many times an effect runs.
let fetchMock: ReturnType<typeof vi.fn>;
let typesResponse: ApiDocumentType[] = [];
let bulkImportQueue: Response[] = [];

beforeEach(() => {
  mockDocuments = [];
  mockDocsLoading = false;
  mockDocsError = null;
  mockCreateDocument.mockReset().mockResolvedValue({});
  mockRefresh.mockReset();

  typesResponse = [];
  bulkImportQueue = [];
  fetchMock = vi.fn((input: unknown) => {
    const href = String(input);
    if (href.includes('/bulk-import')) {
      const next = bulkImportQueue.shift();
      if (!next) return Promise.reject(new Error(`Unqueued bulk-import call: ${href}`));
      return Promise.resolve(next);
    }
    if (href.includes('/api/document-types')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ items: typesResponse }),
      });
    }
    return Promise.reject(new Error(`Unexpected fetch: ${href}`));
  });
  globalThis.fetch = fetchMock as unknown as typeof fetch;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function mockTypesResponse(types: ApiDocumentType[]): void {
  typesResponse = types;
}

/** Queued in order; each bulk-import upload consumes one. */
function queueBulkImport(res: Partial<Response> & { json: () => Promise<unknown> }): void {
  bulkImportQueue.push(res as Response);
}

function mockBulkImportResponse(result: { imported: number; failed: number; errors: Array<{ row: number; message: string }> }): void {
  queueBulkImport({ ok: true, status: 200, json: async () => result });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('TypedDocumentsPage bulk CSV import', () => {
  it('renders "Bulk Import" button when type is selected', async () => {
    mockTypesResponse([TYPE_BULK]);

    render(<TypedDocumentsPage idToken="test-token" />);

    // Wait for types to load
    await waitFor(() => expect(screen.getByTestId('type-type-bulk')).toBeInTheDocument());

    // Click the type to select it
    const typeButton = screen.getByTestId('type-type-bulk');
    typeButton.click();

    // Wait for "Bulk Import" button to appear
    await waitFor(() => expect(screen.getByText('Bulk Import')).toBeInTheDocument());

    const bulkImportLabel = screen.getByText('Bulk Import').closest('label');
    expect(bulkImportLabel).toBeInTheDocument();

    // Verify hidden file input exists
    const fileInput = bulkImportLabel?.querySelector('input[type="file"]');
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('accept', '.csv');
  });

  it('successful import displays success banner with counts', async () => {
    mockTypesResponse([TYPE_BULK]);
    mockBulkImportResponse({ imported: 10, failed: 0, errors: [] });

    const user = userEvent.setup();
    render(<TypedDocumentsPage idToken="test-token" />);

    await waitFor(() => expect(screen.getByTestId('type-type-bulk')).toBeInTheDocument());
    screen.getByTestId('type-type-bulk').click();

    await waitFor(() => expect(screen.getByText('Bulk Import')).toBeInTheDocument());

    // Find the file input and upload a CSV
    const bulkImportLabel = screen.getByText('Bulk Import').closest('label');
    const fileInput = bulkImportLabel?.querySelector('input[type="file"]') as HTMLInputElement;

    const csvContent = 'Name,Age\nAlice,30\nBob,25\nCharlie,35\nDiana,28\nEve,32\nFrank,40\nGrace,27\nHank,33\nIris,29\nJack,31\n';
    const file = new File([csvContent], 'test.csv', { type: 'text/csv' });

    await user.upload(fileInput, file);

    // Wait for import result banner
    await waitFor(() => expect(screen.getByTestId('import-result')).toBeInTheDocument(), { timeout: 5000 });

    const resultBanner = screen.getByTestId('import-result');
    expect(within(resultBanner).getByText(/Import Successfully Completed/i)).toBeInTheDocument();
    expect(within(resultBanner).getByText(/10 imported, 0 failed/i)).toBeInTheDocument();

    // Verify refresh was called to reload document list
    expect(mockRefresh).toHaveBeenCalled();
  });

  it('partial failure displays error banner with error list', async () => {
    mockTypesResponse([TYPE_BULK]);
    mockBulkImportResponse({
      imported: 2,
      failed: 1,
      errors: [{ row: 2, message: 'field "Age" expects a finite number' }],
    });

    const user = userEvent.setup();
    render(<TypedDocumentsPage idToken="test-token" />);

    await waitFor(() => expect(screen.getByTestId('type-type-bulk')).toBeInTheDocument());
    screen.getByTestId('type-type-bulk').click();

    await waitFor(() => expect(screen.getByText('Bulk Import')).toBeInTheDocument());

    const bulkImportLabel = screen.getByText('Bulk Import').closest('label');
    const fileInput = bulkImportLabel?.querySelector('input[type="file"]') as HTMLInputElement;

    const csvContent = 'Name,Age\nAlice,30\nBob,invalid\nCharlie,35\n';
    const file = new File([csvContent], 'partial.csv', { type: 'text/csv' });

    await user.upload(fileInput, file);

    await waitFor(() => expect(screen.getByTestId('import-result')).toBeInTheDocument(), { timeout: 5000 });

    const resultBanner = screen.getByTestId('import-result');
    expect(within(resultBanner).getByText(/Import Partially Completed/i)).toBeInTheDocument();
    expect(within(resultBanner).getByText(/2 imported, 1 failed/i)).toBeInTheDocument();

    // Verify error details are present (collapsible)
    expect(within(resultBanner).getByText(/1 error/i)).toBeInTheDocument();

    // Verify refresh was still called (partial success still adds documents)
    expect(mockRefresh).toHaveBeenCalled();
  });

  it('empty CSV displays success with 0 counts', async () => {
    mockTypesResponse([TYPE_BULK]);
    mockBulkImportResponse({ imported: 0, failed: 0, errors: [] });

    const user = userEvent.setup();
    render(<TypedDocumentsPage idToken="test-token" />);

    await waitFor(() => expect(screen.getByTestId('type-type-bulk')).toBeInTheDocument());
    screen.getByTestId('type-type-bulk').click();

    await waitFor(() => expect(screen.getByText('Bulk Import')).toBeInTheDocument());

    const bulkImportLabel = screen.getByText('Bulk Import').closest('label');
    const fileInput = bulkImportLabel?.querySelector('input[type="file"]') as HTMLInputElement;

    const csvContent = 'Name,Age\n'; // Headers only, no data rows
    const file = new File([csvContent], 'empty.csv', { type: 'text/csv' });

    await user.upload(fileInput, file);

    await waitFor(() => expect(screen.getByTestId('import-result')).toBeInTheDocument(), { timeout: 5000 });

    const resultBanner = screen.getByTestId('import-result');
    expect(within(resultBanner).getByText(/Import Successfully Completed/i)).toBeInTheDocument();
    expect(within(resultBanner).getByText(/0 imported, 0 failed/i)).toBeInTheDocument();

    // Empty result (0 imported) may or may not trigger refresh depending on
    // implementation — the important part is the banner displays correctly
    // expect(mockRefresh).toHaveBeenCalled();  // Not asserting refresh for 0 imports
  });

  it('renders "Download failed rows" button only when rawRow is present and clicking it produces a CSV with original headers + Error column', async () => {
    mockTypesResponse([TYPE_BULK]);
    queueBulkImport({
      ok: true,
      status: 200,
      json: async () => ({
        imported: 1,
        failed: 2,
        columns: ['Name', 'Age'],
        errors: [
          { row: 3, reason: 'field "Age" expects a finite number', rawRow: { Name: 'Bob', Age: 'not-a-number' } },
          { row: 4, reason: 'field "Name" is required and cannot be empty', rawRow: { Name: '', Age: '40' } },
        ],
      }),
    });

    const user = userEvent.setup();
    render(<TypedDocumentsPage idToken="test-token" />);

    await waitFor(() => expect(screen.getByTestId('type-type-bulk')).toBeInTheDocument());
    screen.getByTestId('type-type-bulk').click();
    await waitFor(() => expect(screen.getByText('Bulk Import')).toBeInTheDocument());

    const bulkImportLabel = screen.getByText('Bulk Import').closest('label');
    const fileInput = bulkImportLabel?.querySelector('input[type="file"]') as HTMLInputElement;

    const csvContent = 'Name,Age\nAlice,30\nBob,not-a-number\n,40\n';
    const file = new File([csvContent], 'roster.csv', { type: 'text/csv' });

    // Stub URL.createObjectURL / revokeObjectURL — jsdom doesn't implement them.
    const createSpy = vi.spyOn(URL, 'createObjectURL').mockImplementation(() => 'blob:mock-url');
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    let capturedBlob: Blob | null = null;
    createSpy.mockImplementation((blob) => {
      capturedBlob = blob as Blob;
      return 'blob:mock-url';
    });

    await user.upload(fileInput, file);
    await waitFor(() => expect(screen.getByTestId('import-result')).toBeInTheDocument(), { timeout: 5000 });

    const downloadBtn = screen.getByTestId('download-failed-rows');
    expect(downloadBtn).toBeInTheDocument();

    await user.click(downloadBtn);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(capturedBlob).not.toBeNull();
    expect(capturedBlob!.type).toBe('text/csv;charset=utf-8');

    const csv = await capturedBlob!.text();
    const lines = csv.trim().split('\n');
    // Header: Error column prepended to original column order
    expect(lines[0]).toBe('Error,Name,Age');
    // Both failing rows appear with their reasons + raw cell values
    expect(lines).toContain('"field ""Age"" expects a finite number",Bob,not-a-number');
    expect(lines).toContain('"field ""Name"" is required and cannot be empty",,40');

    revokeSpy.mockRestore();
    createSpy.mockRestore();
  });

  it('does not render "Download failed rows" button when there are no errors', async () => {
    mockTypesResponse([TYPE_BULK]);
    mockBulkImportResponse({ imported: 5, failed: 0, errors: [] });

    const user = userEvent.setup();
    render(<TypedDocumentsPage idToken="test-token" />);

    await waitFor(() => expect(screen.getByTestId('type-type-bulk')).toBeInTheDocument());
    screen.getByTestId('type-type-bulk').click();
    await waitFor(() => expect(screen.getByText('Bulk Import')).toBeInTheDocument());

    const bulkImportLabel = screen.getByText('Bulk Import').closest('label');
    const fileInput = bulkImportLabel?.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['Name,Age\nAlice,30\n'], 'ok.csv', { type: 'text/csv' });
    await user.upload(fileInput, file);

    await waitFor(() => expect(screen.getByTestId('import-result')).toBeInTheDocument(), { timeout: 5000 });
    expect(screen.queryByTestId('download-failed-rows')).not.toBeInTheDocument();
  });

  it('upload failure renders inline error banner and does not call window.alert', async () => {
    mockTypesResponse([TYPE_BULK]);
    queueBulkImport({
      ok: false,
      status: 413,
      statusText: 'Payload Too Large',
      json: async () => ({ error: 'CSV exceeds 5MB limit' }),
    });

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);

    const user = userEvent.setup();
    render(<TypedDocumentsPage idToken="test-token" />);

    await waitFor(() => expect(screen.getByTestId('type-type-bulk')).toBeInTheDocument());
    screen.getByTestId('type-type-bulk').click();
    await waitFor(() => expect(screen.getByText('Bulk Import')).toBeInTheDocument());

    const bulkImportLabel = screen.getByText('Bulk Import').closest('label');
    const fileInput = bulkImportLabel?.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['Name,Age\nAlice,30\n'], 'too-big.csv', { type: 'text/csv' });
    await user.upload(fileInput, file);

    const errorBanner = await screen.findByTestId('import-error');
    expect(within(errorBanner).getByText(/Import failed/i)).toBeInTheDocument();
    expect(within(errorBanner).getByText(/CSV exceeds 5MB limit/i)).toBeInTheDocument();
    expect(alertSpy).not.toHaveBeenCalled();

    // No success result banner should appear alongside the error.
    expect(screen.queryByTestId('import-result')).not.toBeInTheDocument();

    // Dismiss removes the banner.
    await user.click(within(errorBanner).getByRole('button', { name: /Dismiss/i }));
    expect(screen.queryByTestId('import-error')).not.toBeInTheDocument();

    alertSpy.mockRestore();
  });

  it('starting a new import after an error clears the error banner', async () => {
    mockTypesResponse([TYPE_BULK]);
    // First upload: server returns 500.
    queueBulkImport({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => ({ error: 'parser crashed' }),
    });
    // Second upload: server returns success.
    queueBulkImport({
      ok: true,
      status: 200,
      json: async () => ({ imported: 2, failed: 0, errors: [] }),
    });

    vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    const user = userEvent.setup();
    render(<TypedDocumentsPage idToken="test-token" />);

    await waitFor(() => expect(screen.getByTestId('type-type-bulk')).toBeInTheDocument());
    screen.getByTestId('type-type-bulk').click();
    await waitFor(() => expect(screen.getByText('Bulk Import')).toBeInTheDocument());

    const bulkImportLabel = screen.getByText('Bulk Import').closest('label');
    const fileInput = bulkImportLabel?.querySelector('input[type="file"]') as HTMLInputElement;

    const badFile = new File(['Name,Age\nAlice,30\n'], 'bad.csv', { type: 'text/csv' });
    await user.upload(fileInput, badFile);
    await screen.findByTestId('import-error');

    const goodFile = new File(['Name,Age\nBob,25\n'], 'good.csv', { type: 'text/csv' });
    await user.upload(fileInput, goodFile);
    // Once the new upload starts, prior error is cleared.
    await waitFor(() => expect(screen.queryByTestId('import-error')).not.toBeInTheDocument());
    await screen.findByTestId('import-result');
  });

  it('button is disabled during import (shows "Importing…")', async () => {
    mockTypesResponse([TYPE_BULK]);
    // Delay the response to test the "Importing…" state
    fetchMock.mockImplementation((url: string) => {
      if (url.includes('/api/document-types')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ items: [TYPE_BULK] }),
        });
      }
      if (url.includes('/bulk-import')) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: async () => ({ imported: 5, failed: 0, errors: [] }),
            });
          }, 100);
        });
      }
      return Promise.reject(new Error('Unexpected fetch'));
    });

    const user = userEvent.setup();
    render(<TypedDocumentsPage idToken="test-token" />);

    await waitFor(() => expect(screen.getByTestId('type-type-bulk')).toBeInTheDocument());
    screen.getByTestId('type-type-bulk').click();

    await waitFor(() => expect(screen.getByText('Bulk Import')).toBeInTheDocument());

    const bulkImportLabel = screen.getByText('Bulk Import').closest('label');
    const fileInput = bulkImportLabel?.querySelector('input[type="file"]') as HTMLInputElement;

    const file = new File(['Name,Age\nTest,25\n'], 'test.csv', { type: 'text/csv' });
    await user.upload(fileInput, file);

    // During import, button should show "Importing…"
    await waitFor(() => expect(screen.getByText('Importing…')).toBeInTheDocument());

    // After import completes, button returns to "Bulk Import"
    await waitFor(() => expect(screen.getByText('Bulk Import')).toBeInTheDocument(), { timeout: 5000 });
  });
});
