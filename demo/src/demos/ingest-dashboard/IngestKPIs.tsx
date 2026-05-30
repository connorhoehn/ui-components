import { useState, useEffect } from 'react';
import { KPIGrid, StatCard } from '@/components/shared';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';

interface KPIData {
  itemsProcessed: number;
  conflicts: number;
  dlqItems: number;
  activeSyncs: number;
}

export function IngestKPIs() {
  const { onMessage } = useWebSocketContext();
  const [kpis, setKpis] = useState<KPIData>({
    itemsProcessed: 0,
    conflicts: 0,
    dlqItems: 0,
    activeSyncs: 0,
  });

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'ingest') return;
      const action = msg.action as string;

      setKpis((prev) => {
        switch (action) {
          case 'sync.started':
            return { ...prev, activeSyncs: prev.activeSyncs + 1 };
          case 'sync.progress':
            return {
              ...prev,
              itemsProcessed: msg.processedItems as number,
            };
          case 'conflict.detected':
            return { ...prev, conflicts: prev.conflicts + 1 };
          case 'dlq.item.added':
            return { ...prev, dlqItems: prev.dlqItems + 1 };
          case 'sync.completed':
            return {
              ...prev,
              activeSyncs: Math.max(0, prev.activeSyncs - 1),
              itemsProcessed: msg.processedItems as number,
            };
          default:
            return prev;
        }
      });
    });

    return unsubscribe;
  }, [onMessage]);

  return (
    <KPIGrid>
      <StatCard label="Active Syncs" value={kpis.activeSyncs.toLocaleString()} accent />
      <StatCard label="Items Processed" value={kpis.itemsProcessed.toLocaleString()} mono />
      <StatCard label="Conflicts" value={kpis.conflicts.toLocaleString()} />
      <StatCard label="DLQ Items" value={kpis.dlqItems.toLocaleString()} danger />
    </KPIGrid>
  );
}
