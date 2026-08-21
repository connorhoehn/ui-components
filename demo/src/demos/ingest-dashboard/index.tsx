import { useState, useEffect } from 'react';
import { Chip } from '@connorhoehnslalom/ui-components/shared';
import type { ChipTone } from '@connorhoehnslalom/ui-components/shared';
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

  // Ingest states map onto the library tone scale — no local palette.
  const statusTone: Record<string, ChipTone> = {
    idle: 'neutral',
    syncing: 'accent',
    completed: 'success',
    error: 'danger',
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden"
    >
      <div className="py-[10px] px-4 border-b border-border font-semibold text-[13px] text-text-primary"
      >
        Sources
      </div>
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-border bg-surface-panel">
            <th className="py-2 px-4 text-left font-semibold text-neutral">
              Source
            </th>
            <th className="py-2 px-4 text-left font-semibold text-neutral">
              Status
            </th>
            <th className="py-2 px-4 text-left font-semibold text-neutral">
              Progress
            </th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => {
            return (
              <tr className="border-b border-surface-hover" key={source.sourceId}>
                <td className="py-[10px] px-4 text-text-primary">{source.sourceName}</td>
                <td className="py-[10px] px-4">
                  <Chip tone={statusTone[source.status] ?? 'neutral'}>
                    {source.status}
                  </Chip>
                </td>
                <td className="py-[10px] px-4 text-neutral">
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
          <h2 className="text-[20px] font-semibold mb-2 text-text-primary">
            Ingest Dashboard
          </h2>
          <p className="text-neutral text-[14px]">
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
