import { useState, useEffect } from 'react';
import { SimulatedProvider } from '../../engine/SimulatedProvider';
import { ingestActivityTimeline } from './simulation';
import { IngestActivityLog } from './IngestActivityLog';
import { IngestKPIs } from './IngestKPIs';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';

interface SourceRow {
  sourceId: string;
  sourceName: string;
  status: 'idle' | 'syncing' | 'completed' | 'error';
  progress?: string;
}

function SourceTable() {
  const { onMessage } = useWebSocketContext();
  const [sources, setSources] = useState<SourceRow[]>([
    { sourceId: 'src-sharepoint-01', sourceName: 'SharePoint - Legal Docs', status: 'idle' },
    { sourceId: 'src-gdrive-02', sourceName: 'Google Drive - Engineering', status: 'idle' },
    { sourceId: 'src-confluence-03', sourceName: 'Confluence - Product Wiki', status: 'idle' },
  ]);

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'ingest') return;
      const action = msg.action as string;
      const sourceId = msg.sourceId as string;

      setSources((prev) =>
        prev.map((s) => {
          if (s.sourceId !== sourceId) return s;
          switch (action) {
            case 'sync.started':
              return {
                ...s,
                sourceName: (msg.sourceName as string) || s.sourceName,
                status: 'syncing' as const,
                progress: `0/${msg.totalItems}`,
              };
            case 'sync.progress':
              return {
                ...s,
                status: 'syncing' as const,
                progress: `${msg.processedItems}/${msg.totalItems}`,
              };
            case 'sync.completed':
              return { ...s, status: 'completed' as const, progress: undefined };
            default:
              return s;
          }
        })
      );
    });

    return unsubscribe;
  }, [onMessage]);

  const statusColors: Record<string, { bg: string; text: string }> = {
    idle: { bg: '#f1f5f9', text: '#64748b' },
    syncing: { bg: '#ede9fe', text: '#6366f1' },
    completed: { bg: '#d1fae5', text: '#059669' },
    error: { bg: '#fee2e2', text: '#dc2626' },
  };

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid #e2e8f0',
          fontWeight: 600,
          fontSize: 13,
          color: '#1a1a2e',
        }}
      >
        Sources
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8f9fa' }}>
            <th style={{ padding: '8px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>
              Source
            </th>
            <th style={{ padding: '8px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>
              Status
            </th>
            <th style={{ padding: '8px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>
              Progress
            </th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => {
            const style = statusColors[source.status];
            return (
              <tr key={source.sourceId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 16px', color: '#1a1a2e' }}>{source.sourceName}</td>
                <td style={{ padding: '10px 16px' }}>
                  <span
                    style={{
                      padding: '3px 8px',
                      borderRadius: 10,
                      fontSize: 11,
                      fontWeight: 600,
                      background: style.bg,
                      color: style.text,
                    }}
                  >
                    {source.status}
                  </span>
                </td>
                <td style={{ padding: '10px 16px', color: '#64748b' }}>
                  {source.progress || '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function IngestDashboardDemo() {
  return (
    <SimulatedProvider timeline={ingestActivityTimeline} autoPlay>
      <div style={{ padding: 24 }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: '#1a1a2e' }}>
            Ingest Dashboard
          </h2>
          <p style={{ color: '#64748b', fontSize: 14 }}>
            Data ingestion monitoring with live sync progress, conflict detection, and DLQ tracking.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* KPI cards */}
          <IngestKPIs />

          {/* Activity log */}
          <IngestActivityLog />

          {/* Source table */}
          <SourceTable />
        </div>
      </div>
    </SimulatedProvider>
  );
}
