// src/components/identity/admin/DiagnosticsPage.tsx
//
// System diagnostics viewer with node info, rate limiter stats, and DLQ management.

import { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '../../../lib/cn';

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
    <pre className="p-4 font-mono text-sm text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[400px] overflow-y-auto m-0">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

function RateTable({ rates }: { rates: Record<string, unknown> }) {
  const entries = Object.entries(rates);
  if (entries.length === 0) {
    return <p className="p-4 text-center text-text-tertiary">No rate limiter data available.</p>;
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          <th className="text-left px-4 py-2 border-b border-border text-text-secondary font-semibold">Key</th>
          <th className="text-left px-4 py-2 border-b border-border text-text-secondary font-semibold">Value</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([key, val]) => (
          <tr key={key}>
            <td className="px-4 py-2 border-b border-border text-text-primary align-middle">{key}</td>
            <td className="px-4 py-2 border-b border-border text-text-primary align-middle">
              {typeof val === 'object' ? JSON.stringify(val) : String(val)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-text-primary">Diagnostics</h1>
        </div>
        <div className="h-[120px] rounded-md bg-border opacity-50" />
        <div className="h-[120px] rounded-md bg-border opacity-50" />
        <div className="h-[120px] rounded-md bg-border opacity-50" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-text-primary">Diagnostics</h1>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-sm text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            Auto-refresh (10s)
          </label>
          <button
            type="button"
            className="px-4 py-2 border border-border rounded-sm bg-surface text-text-primary text-sm cursor-pointer"
            onClick={onRefresh}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Node/Cluster diagnostics */}
      <section className="bg-surface border border-border rounded-md overflow-hidden">
        <div className="px-4 py-2 bg-surface-inset border-b border-border font-semibold text-base text-text-primary">
          Node / Cluster Diagnostics
        </div>
        {diagnostics ? (
          <JsonViewer data={diagnostics} />
        ) : (
          <p className="p-4 text-center text-text-tertiary">No diagnostics data available.</p>
        )}
      </section>

      {/* Rate limiter stats */}
      <section className="bg-surface border border-border rounded-md overflow-hidden">
        <div className="px-4 py-2 bg-surface-inset border-b border-border font-semibold text-base text-text-primary">
          Rate Limiter Stats
        </div>
        {rates ? <RateTable rates={rates} /> : <p className="p-4 text-center text-text-tertiary">No rate data available.</p>}
      </section>

      {/* Dead Letter Queue */}
      <section className="bg-surface border border-border rounded-md overflow-hidden">
        <div className="px-4 py-2 bg-surface-inset border-b border-border font-semibold text-base text-text-primary">
          Dead Letter Queue
        </div>
        {!dlq || dlq.length === 0 ? (
          <p className="p-4 text-center text-text-tertiary">Dead letter queue is empty.</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 border-b border-border text-text-secondary font-semibold">ID</th>
                <th className="text-left px-4 py-2 border-b border-border text-text-secondary font-semibold">Error</th>
                <th className="text-left px-4 py-2 border-b border-border text-text-secondary font-semibold">Failed At</th>
                <th className="text-left px-4 py-2 border-b border-border text-text-secondary font-semibold">Retries</th>
                <th className="text-left px-4 py-2 border-b border-border text-text-secondary font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dlq.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-4 py-2 border-b border-border text-text-primary align-middle font-mono text-sm">
                    {entry.id.substring(0, 12)}...
                  </td>
                  <td className="px-4 py-2 border-b border-border text-text-primary align-middle">{entry.error}</td>
                  <td className="px-4 py-2 border-b border-border text-text-primary align-middle">{new Date(entry.failedAt).toLocaleString()}</td>
                  <td className="px-4 py-2 border-b border-border text-text-primary align-middle">{entry.retryCount}</td>
                  <td className="px-4 py-2 border-b border-border text-text-primary align-middle">
                    <button
                      type="button"
                      className="px-2.5 py-1 text-sm border border-border rounded-sm bg-surface text-text-primary cursor-pointer mr-1.5"
                      onClick={() => handleRedrive(entry.id)}
                    >
                      Redrive
                    </button>
                    <button
                      type="button"
                      className="px-2.5 py-1 text-sm border border-danger rounded-sm bg-surface text-danger cursor-pointer mr-1.5"
                      onClick={() => handlePurge(entry.id)}
                    >
                      Purge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
