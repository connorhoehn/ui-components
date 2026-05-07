// src/components/identity/admin/DiagnosticsPage.tsx
//
// System diagnostics viewer with node info, rate limiter stats, and DLQ management.

import { useState, useCallback, useEffect, useRef } from 'react';

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
// Styles
// ---------------------------------------------------------------------------

const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--ui-spacingLg)',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'var(--ui-fontSizeLg)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
};

const headerActionsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--ui-spacingSm)',
};

const refreshBtnStyle: React.CSSProperties = {
  padding: '8px 16px',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
  fontSize: 'var(--ui-fontSizeSm)',
  cursor: 'pointer',
  font: 'inherit',
};

const autoRefreshLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-textSecondary)',
  cursor: 'pointer',
};

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--ui-surface)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusMd)',
  overflow: 'hidden',
};

const sectionHeaderStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingSm) var(--ui-spacingMd)',
  backgroundColor: 'var(--ui-surfaceAlt)',
  borderBottom: '1px solid var(--ui-border)',
  fontWeight: 600,
  fontSize: 'var(--ui-fontSizeMd)',
  color: 'var(--ui-textPrimary)',
};

const codeBlockStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingMd)',
  fontFamily: 'monospace',
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-textPrimary)',
  overflowX: 'auto',
  whiteSpace: 'pre-wrap',
  maxHeight: '400px',
  overflowY: 'auto',
  margin: 0,
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 'var(--ui-fontSizeSm)',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: 'var(--ui-spacingSm) var(--ui-spacingMd)',
  borderBottom: '1px solid var(--ui-border)',
  color: 'var(--ui-textSecondary)',
  fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingSm) var(--ui-spacingMd)',
  borderBottom: '1px solid var(--ui-border)',
  color: 'var(--ui-textPrimary)',
  verticalAlign: 'middle',
};

const actionBtnStyle: React.CSSProperties = {
  padding: '4px 10px',
  fontSize: 'var(--ui-fontSizeSm)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
  cursor: 'pointer',
  marginRight: '6px',
  font: 'inherit',
};

const dangerBtnStyle: React.CSSProperties = {
  ...actionBtnStyle,
  borderColor: 'var(--ui-danger)',
  color: 'var(--ui-danger)',
};

const skeletonStyle: React.CSSProperties = {
  height: '120px',
  borderRadius: 'var(--ui-radiusMd)',
  backgroundColor: 'var(--ui-border)',
  opacity: 0.5,
};

const emptyStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingMd)',
  textAlign: 'center',
  color: 'var(--ui-textMuted)',
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function JsonViewer({ data }: { data: unknown }) {
  return <pre style={codeBlockStyle}>{JSON.stringify(data, null, 2)}</pre>;
}

function RateTable({ rates }: { rates: Record<string, unknown> }) {
  const entries = Object.entries(rates);
  if (entries.length === 0) {
    return <p style={emptyStyle}>No rate limiter data available.</p>;
  }

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Key</th>
          <th style={thStyle}>Value</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([key, val]) => (
          <tr key={key}>
            <td style={tdStyle}>{key}</td>
            <td style={tdStyle}>
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
      <div style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Diagnostics</h1>
        </div>
        <div style={skeletonStyle} />
        <div style={skeletonStyle} />
        <div style={skeletonStyle} />
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Diagnostics</h1>
        <div style={headerActionsStyle}>
          <label style={autoRefreshLabelStyle}>
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            Auto-refresh (10s)
          </label>
          <button type="button" style={refreshBtnStyle} onClick={onRefresh}>
            Refresh
          </button>
        </div>
      </div>

      {/* Node/Cluster diagnostics */}
      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>Node / Cluster Diagnostics</div>
        {diagnostics ? (
          <JsonViewer data={diagnostics} />
        ) : (
          <p style={emptyStyle}>No diagnostics data available.</p>
        )}
      </section>

      {/* Rate limiter stats */}
      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>Rate Limiter Stats</div>
        {rates ? <RateTable rates={rates} /> : <p style={emptyStyle}>No rate data available.</p>}
      </section>

      {/* Dead Letter Queue */}
      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>Dead Letter Queue</div>
        {!dlq || dlq.length === 0 ? (
          <p style={emptyStyle}>Dead letter queue is empty.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Error</th>
                <th style={thStyle}>Failed At</th>
                <th style={thStyle}>Retries</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dlq.map((entry) => (
                <tr key={entry.id}>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 'var(--ui-fontSizeSm)' }}>
                    {entry.id.substring(0, 12)}...
                  </td>
                  <td style={tdStyle}>{entry.error}</td>
                  <td style={tdStyle}>{new Date(entry.failedAt).toLocaleString()}</td>
                  <td style={tdStyle}>{entry.retryCount}</td>
                  <td style={tdStyle}>
                    <button type="button" style={actionBtnStyle} onClick={() => handleRedrive(entry.id)}>
                      Redrive
                    </button>
                    <button type="button" style={dangerBtnStyle} onClick={() => handlePurge(entry.id)}>
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
