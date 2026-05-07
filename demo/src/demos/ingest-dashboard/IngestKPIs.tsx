import { useState, useEffect } from 'react';
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

  const cards: { label: string; value: number; color: string }[] = [
    { label: 'Active Syncs', value: kpis.activeSyncs, color: '#6366f1' },
    { label: 'Items Processed', value: kpis.itemsProcessed, color: '#10b981' },
    { label: 'Conflicts', value: kpis.conflicts, color: '#f59e0b' },
    { label: 'DLQ Items', value: kpis.dlqItems, color: '#ef4444' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{card.label}</span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: card.color,
              lineHeight: 1.2,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {card.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
