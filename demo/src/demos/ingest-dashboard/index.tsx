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
    <div className="bg-surface border border-border rounded-lg overflow-hidden"
    >
      <div className="py-[10px] px-4 border-b border-border font-semibold text-[13px] text-[#1a1a2e]"
      >
        Sources
      </div>
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-border bg-[#f8f9fa]">
            <th className="py-2 px-4 text-left font-semibold text-[#64748b]">
              Source
            </th>
            <th className="py-2 px-4 text-left font-semibold text-[#64748b]">
              Status
            </th>
            <th className="py-2 px-4 text-left font-semibold text-[#64748b]">
              Progress
            </th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => {
            const style = statusColors[source.status];
            return (
              <tr className="border-b border-surface-hover" key={source.sourceId}>
                <td className="py-[10px] px-4 text-[#1a1a2e]">{source.sourceName}</td>
                <td className="py-[10px] px-4">
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
                <td className="py-[10px] px-4 text-[#64748b]">
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
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-[20px] font-semibold mb-2 text-[#1a1a2e]">
            Ingest Dashboard
          </h2>
          <p className="text-[#64748b] text-[14px]">
            Data ingestion monitoring with live sync progress, conflict detection, and DLQ tracking.
          </p>
        </div>

        <div className="flex flex-col gap-5">
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
