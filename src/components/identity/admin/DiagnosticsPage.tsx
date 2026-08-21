// src/components/identity/admin/DiagnosticsPage.tsx
//
// System diagnostics viewer with node info, rate limiter stats, and DLQ management.

import { useState, useCallback, useEffect, useRef } from 'react';
import { Card } from '../../ui/Card';
import { Table, TableHead, TableBody, TableRow, TableTh, TableTd } from '../../ui/Table';
import { PageSection } from '../../ui/PageSection';
import { Button } from '../../ui/Button';
import { Checkbox } from '../../forms/Checkbox';
import Chip from '../../shared/Chip';

export interface DiagnosticsPageProps {
  diagnostics?: Record<string, unknown>;
  rates?: Record<string, unknown>;
  dlq?: Array<{
    id: string;
    payload: unknown;
    error: string;
    failedAt: string;
    retryCount: number;
  }>;
  onRedrive: (id: string) => Promise<void>;
  onPurge: (id: string) => Promise<void>;
  onRefresh: () => void;
  loading?: boolean;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function JsonViewer({ data }: { data: unknown }) {
  return (
    <pre className="p-5 font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[400px] overflow-y-auto m-0 bg-surface-panel">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

function RateTable({ rates }: { rates: Record<string, unknown> }) {
  const entries = Object.entries(rates);
  if (entries.length === 0) {
    return <p className="p-5 text-center text-text-tertiary text-sm m-0">No rate limiter data available.</p>;
  }

  return (
    <Table>
      <TableHead>
        <tr>
          <TableTh>Key</TableTh>
          <TableTh>Value</TableTh>
        </tr>
      </TableHead>
      <TableBody>
        {entries.map(([key, val]) => (
          <TableRow key={key}>
            <TableTd className="font-mono text-xs">{key}</TableTd>
            <TableTd>{typeof val === 'object' ? JSON.stringify(val) : String(val)}</TableTd>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function DiagnosticsPage({
  diagnostics,
  rates,
  dlq,
  onRedrive,
  onPurge,
  onRefresh,
  loading,
}: DiagnosticsPageProps) {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(onRefresh, 10000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRefresh, onRefresh]);

  const handleRedrive = useCallback(
    async (id: string) => {
      await onRedrive(id);
    },
    [onRedrive],
  );

  const handlePurge = useCallback(
    async (id: string) => {
      await onPurge(id);
    },
    [onPurge],
  );

  if (loading) {
    return (
      <PageSection title="Diagnostics">
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-[120px] animate-pulse" />
          ))}
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection
      title="Diagnostics"
      actions={
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-sm text-neutral cursor-pointer">
            <Checkbox
              checked={autoRefresh}
              onChange={setAutoRefresh}
              className="rounded"
            />
            Auto-refresh (10s)
          </label>
          <Button variant="ghost" size="lg" onClick={onRefresh}>
            Refresh
          </Button>
        </div>
      }
    >
      {/* Node/Cluster diagnostics */}
      <Card>
        <div className="px-5 py-3 border-b border-border bg-surface-panel">
          <h3 className="text-sm font-semibold text-text-primary m-0">Node / Cluster Diagnostics</h3>
        </div>
        {diagnostics ? (
          <JsonViewer data={diagnostics} />
        ) : (
          <p className="p-5 text-center text-text-tertiary text-sm m-0">No diagnostics data available.</p>
        )}
      </Card>

      {/* Rate limiter stats */}
      <Card>
        <div className="px-5 py-3 border-b border-border bg-surface-panel">
          <h3 className="text-sm font-semibold text-text-primary m-0">Rate Limiter Stats</h3>
        </div>
        {rates ? <RateTable rates={rates} /> : <p className="p-5 text-center text-text-tertiary text-sm m-0">No rate data available.</p>}
      </Card>

      {/* Dead Letter Queue */}
      <Card>
        <div className="px-5 py-3 border-b border-border bg-surface-panel">
          <h3 className="text-sm font-semibold text-text-primary m-0">Dead Letter Queue</h3>
        </div>
        {!dlq || dlq.length === 0 ? (
          <p className="p-5 text-center text-text-tertiary text-sm m-0">Dead letter queue is empty.</p>
        ) : (
          <Table>
            <TableHead>
              <tr>
                <TableTh>ID</TableTh>
                <TableTh>Error</TableTh>
                <TableTh>Failed At</TableTh>
                <TableTh>Retries</TableTh>
                <TableTh className="text-right">Actions</TableTh>
              </tr>
            </TableHead>
            <TableBody>
              {dlq.map((entry) => (
                <TableRow key={entry.id}>
                  <TableTd className="font-mono text-xs">{entry.id.substring(0, 12)}...</TableTd>
                  <TableTd>
                    <Chip tone="danger" size="xs">{entry.error}</Chip>
                  </TableTd>
                  <TableTd className="text-xs text-neutral">{new Date(entry.failedAt).toLocaleString()}</TableTd>
                  <TableTd>
                    <Chip tone="neutral" size="xs" mono>{entry.retryCount}</Chip>
                  </TableTd>
                  <TableTd className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleRedrive(entry.id)}>
                        Redrive
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handlePurge(entry.id)}>
                        Purge
                      </Button>
                    </div>
                  </TableTd>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </PageSection>
  );
}
