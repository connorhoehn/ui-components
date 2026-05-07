// Phase 51 Phase A — page that lists API-side document types, lets the
// end-user pick one, renders an auto-generated form for that type, and
// shows the resulting persisted instances below the form.
//
// Phase A scope: read-only on types (CRUD on types is the wizard's job).
// Phase A.5 will unify the type-creation surface; until then this page
// simply consumes whatever types the backend has.

import { useEffect, useMemo, useState, type JSX } from 'react';
import { cn } from '../../lib/cn';
import { TypedDocumentForm, type ReferenceOption } from './TypedDocumentForm';
import { ALL_DISPLAY_MODES, visibleFieldsForMode } from './displayMode';
import {
  useTypedDocuments,
  type ApiDisplayMode,
  type ApiDocumentType,
  type TypedDocument,
} from '../../hooks/useTypedDocuments';

interface Props {
  idToken: string | null;
}

function getBaseUrl(): string {
  return (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';
}

export function TypedDocumentsPage({ idToken }: Props): JSX.Element {
  const [types, setTypes] = useState<ApiDocumentType[]>([]);
  const [typesLoading, setTypesLoading] = useState(true);
  const [typesError, setTypesError] = useState<string | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<ApiDisplayMode>('full');

  // Phase 51 Phase G — bulk CSV import state
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    imported: number;
    failed: number;
    columns?: string[];
    errors: Array<{ row: number; reason: string; rawRow?: Record<string, string> }>;
  } | null>(null);
  const [importFilename, setImportFilename] = useState<string | null>(null);

  // Fetch the list of document types from the backend.
  useEffect(() => {
    if (!idToken) return;
    let cancelled = false;
    setTypesLoading(true);
    setTypesError(null);
    fetch(`${getBaseUrl()}/api/document-types`, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load types (${res.status})`);
        return res.json() as Promise<{ items: ApiDocumentType[] }>;
      })
      .then((data) => {
        if (cancelled) return;
        setTypes(data.items ?? []);
        if ((data.items ?? []).length > 0 && !selectedTypeId) {
          setSelectedTypeId(data.items[0].typeId);
        }
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setTypesError(err.message);
      })
      .finally(() => {
        if (!cancelled) setTypesLoading(false);
      });
    return () => { cancelled = true; };
  }, [idToken]);

  const selectedType = types.find((t) => t.typeId === selectedTypeId) ?? null;

  const { documents, loading: docsLoading, error: docsError, createDocument, refresh } = useTypedDocuments({
    idToken,
    typeId: selectedTypeId,
  });

  // Phase 51 Phase G — bulk CSV import handler
  const handleBulkImport = async (file: File) => {
    if (!idToken || !selectedTypeId) return;
    setImporting(true);
    setImportResult(null);
    setImportFilename(file.name);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${getBaseUrl()}/api/typed-documents/bulk-import?typeId=${encodeURIComponent(selectedTypeId)}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}` },
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(errorData.error || `Import failed (${res.status})`);
      }
      const result = await res.json() as {
        imported: number;
        failed: number;
        columns?: string[];
        errors: Array<{ row: number; reason: string; rawRow?: Record<string, string> }>;
      };
      setImportResult(result);
      if (result.imported > 0) {
        refresh();
      }
    } catch (e) {
      alert(`Import failed: ${(e as Error).message}`);
    } finally {
      setImporting(false);
    }
  };

  // Phase 51 polish — re-emit a CSV of just the failed rows so the operator
  // can fix them in their spreadsheet and re-upload, instead of editing the
  // original 1000-row file. Prepends an Error column carrying the per-row
  // reason; preserves the original header order for round-tripping.
  const handleDownloadFailedRows = () => {
    if (!importResult || importResult.errors.length === 0) return;
    const columns = importResult.columns ?? [];
    const rowsWithRaw = importResult.errors.filter((e) => e.rawRow);
    if (columns.length === 0 || rowsWithRaw.length === 0) return;
    const escape = (cell: string): string =>
      /[",\n\r]/.test(cell) ? `"${cell.replace(/"/g, '""')}"` : cell;
    const header = ['Error', ...columns].map(escape).join(',');
    const lines = rowsWithRaw.map((err) => {
      const cells = [err.reason, ...columns.map((c) => err.rawRow?.[c] ?? '')];
      return cells.map(escape).join(',');
    });
    const csv = [header, ...lines].join('\n') + '\n';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const base = (importFilename ?? 'bulk-import').replace(/\.csv$/i, '');
    a.download = `${base}-failed.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Phase C — pre-fetch instances of any DocumentType referenced by the
  // selected type's `reference`-kind fields so the picker has a populated
  // option list. Keyed by referenced typeId. Best-effort: failed fetches
  // leave the picker disabled with the "no options" hint.
  const referencedTypeIds = useMemo<string[]>(() => {
    if (!selectedType) return [];
    const ids = new Set<string>();
    for (const f of selectedType.fields) {
      if (f.fieldType === 'reference' && f.referenceTypeId) ids.add(f.referenceTypeId);
    }
    return Array.from(ids);
  }, [selectedType]);

  const [referenceOptions, setReferenceOptions] = useState<Record<string, ReferenceOption[]>>({});

  useEffect(() => {
    if (!idToken || referencedTypeIds.length === 0) {
      setReferenceOptions({});
      return;
    }
    let cancelled = false;
    Promise.all(
      referencedTypeIds.map(async (refTypeId) => {
        const res = await fetch(
          `${getBaseUrl()}/api/typed-documents?typeId=${encodeURIComponent(refTypeId)}`,
          { headers: { Authorization: `Bearer ${idToken}` } },
        );
        if (!res.ok) return [refTypeId, []] as const;
        const data = (await res.json()) as { items: TypedDocument[] };
        const refTypeMeta = types.find((t) => t.typeId === refTypeId);
        const labelField = refTypeMeta?.fields.find((f) => f.fieldType === 'text');
        const opts: ReferenceOption[] = (data.items ?? []).map((d) => ({
          value: d.documentId,
          label: (labelField && (d.values[labelField.fieldId] as string)) || d.documentId,
        }));
        return [refTypeId, opts] as const;
      }),
    ).then((entries) => {
      if (cancelled) return;
      setReferenceOptions(Object.fromEntries(entries));
    });
    return () => { cancelled = true; };
  }, [idToken, referencedTypeIds, types]);

  return (
    <div data-testid="typed-documents-page" className={cn('flex h-full overflow-hidden font-[inherit]')}>

      <aside className={cn('w-60 shrink-0 border-r border-border flex flex-col overflow-hidden bg-[#fafbfc]')}>
        <div className={cn('px-4 py-3.5 border-b border-border text-[13px] font-bold text-[#374151]')}>
          Document Types
        </div>
        <div data-testid="types-list" className={cn('flex-1 overflow-y-auto p-2')}>
          {typesLoading && <div className={cn('text-text-tertiary text-[13px] p-3')}>Loading…</div>}
          {typesError && (
            <div data-testid="types-error" role="alert" className={cn('text-[#dc2626] text-[13px] p-3')}>
              {typesError}
            </div>
          )}
          {!typesLoading && !typesError && types.length === 0 && (
            <div data-testid="types-empty" className={cn('text-text-tertiary text-[13px] p-3')}>
              No types yet. Use the wizard to create one.
            </div>
          )}
          {types.map((t) => (
            <button
              key={t.typeId}
              data-testid={`type-${t.typeId}`}
              onClick={() => setSelectedTypeId(t.typeId)}
              className={cn(
                'flex items-center gap-2 w-full text-left px-2.5 py-2 rounded-[7px] mb-0.5 cursor-pointer font-[inherit] text-[13px]',
                selectedTypeId === t.typeId
                  ? 'bg-[#ede9fe] border border-[#c4b5fd]'
                  : 'bg-transparent border border-transparent',
              )}
            >
              <span className={cn('text-lg')}>{t.icon}</span>
              <span className={cn('flex-1 text-text-primary')}>{t.name}</span>
              <span className={cn('text-[11px] text-text-tertiary')}>
                {t.fields.length} field{t.fields.length !== 1 ? 's' : ''}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <main className={cn('flex-1 overflow-y-auto px-9 py-7')} data-testid="typed-documents-main">
        {!selectedType && (
          <div data-testid="empty-detail" className={cn('text-text-tertiary text-sm')}>
            Select a document type to start creating documents.
          </div>
        )}

        {selectedType && (
          <div className={cn('flex flex-col gap-7')}>
            <TypedDocumentForm
              key={selectedType.typeId}
              type={selectedType}
              onSubmit={async (values) => { await createDocument(values); }}
              referenceOptions={referenceOptions}
            />

            <section data-testid="documents-list">
              <div className={cn('flex items-center justify-between mb-2')}>
                <div className={cn('text-sm font-semibold text-text-primary')}>
                  {selectedType.name} documents ({documents.length})
                </div>
                <div className={cn('flex items-center gap-3')}>
                  <label className={cn('flex items-center gap-1.5 text-xs text-[#64748b]')}>
                    Display:
                    <select
                      data-testid="display-mode-picker"
                      value={displayMode}
                      onChange={(e) => setDisplayMode(e.target.value as ApiDisplayMode)}
                      className={cn('font-[inherit] text-xs px-1.5 py-[3px] border border-[#cbd5e1] rounded-[5px] bg-white')}
                    >
                      {ALL_DISPLAY_MODES.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </label>
                  <label
                    className={cn(
                      'font-[inherit] text-xs font-semibold px-3 py-[5px] rounded-[5px] bg-white text-primary border border-primary',
                      importing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                    )}
                  >
                    {importing ? 'Importing…' : 'Bulk Import'}
                    <input
                      type="file"
                      accept=".csv"
                      disabled={importing}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleBulkImport(file);
                        e.target.value = '';
                      }}
                      className={cn('hidden')}
                    />
                  </label>
                </div>
              </div>
              {importResult && (
                <div
                  data-testid="import-result"
                  className={cn(
                    'mb-3 p-3 rounded-lg border',
                    importResult.failed > 0
                      ? 'bg-[#fef2f2] border-[#fca5a5]'
                      : 'bg-[#f0fdf4] border-[#86efac]',
                  )}
                >
                  <div className={cn(
                    'text-[13px] font-semibold mb-1.5',
                    importResult.failed > 0 ? 'text-[#dc2626]' : 'text-[#16a34a]',
                  )}>
                    Import {importResult.failed > 0 ? 'Partially' : 'Successfully'} Completed
                  </div>
                  <div className={cn('text-xs text-text-primary')}>
                    {importResult.imported} imported, {importResult.failed} failed
                  </div>
                  {importResult.errors.length > 0 && (
                    <details className={cn('mt-2 text-xs')}>
                      <summary className={cn('cursor-pointer font-semibold text-[#dc2626]')}>
                        {importResult.errors.length} error{importResult.errors.length !== 1 ? 's' : ''}
                      </summary>
                      <ul className={cn('mt-1.5 m-0 pl-5 max-h-[150px] overflow-y-auto')}>
                        {importResult.errors.map((err, i) => (
                          <li key={i} className={cn('mt-1')}>
                            <span className={cn('font-semibold')}>Row {err.row}:</span> {err.reason}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                  <div className={cn('mt-2 flex gap-2')}>
                    {importResult.errors.length > 0 && importResult.errors.some((e) => e.rawRow) && (
                      <button
                        data-testid="download-failed-rows"
                        onClick={handleDownloadFailedRows}
                        className={cn('text-[11px] px-2 py-[3px] rounded bg-white border border-[#dc2626] text-[#dc2626] cursor-pointer font-[inherit] font-semibold')}
                      >
                        Download failed rows
                      </button>
                    )}
                    <button
                      onClick={() => setImportResult(null)}
                      className={cn('text-[11px] px-2 py-[3px] rounded bg-transparent border border-[#cbd5e1] cursor-pointer font-[inherit]')}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
              {docsLoading && <div className={cn('text-text-tertiary text-[13px]')}>Loading…</div>}
              {docsError && (
                <div data-testid="documents-error" role="alert" className={cn('text-[#dc2626] text-[13px]')}>
                  {docsError}
                </div>
              )}
              {!docsLoading && !docsError && documents.length === 0 && (
                <div data-testid="documents-empty" className={cn('text-text-tertiary text-[13px]')}>
                  No documents yet. Fill the form above to add one.
                </div>
              )}
              <ul className={cn('list-none m-0 p-0 flex flex-col gap-2')}>
                {documents.map((doc: TypedDocument) => (
                  <li
                    key={doc.documentId}
                    data-testid={`document-${doc.documentId}`}
                    className={cn('border border-border rounded-lg p-3 bg-white')}
                  >
                    <div className={cn('text-[11px] text-text-tertiary mb-1.5')}>
                      {doc.createdAt} · by {doc.createdBy}
                    </div>
                    <div className={cn('flex flex-col gap-1')}>
                      {visibleFieldsForMode(selectedType, displayMode).map((f) => {
                        const v = doc.values[f.fieldId];
                        if (v === undefined) return null;
                        let display: string;
                        if (Array.isArray(v)) {
                          display = v.join(', ');
                        } else if (typeof v === 'boolean') {
                          display = v ? '✓' : '—';
                        } else {
                          display = String(v);
                        }
                        return (
                          <div key={f.fieldId} className={cn('text-[13px]')}>
                            <span className={cn('font-medium text-[#374151]')}>{f.name}: </span>
                            <span className={cn('text-text-primary')}>{display}</span>
                          </div>
                        );
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
