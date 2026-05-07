import { useEffect, useState } from 'react';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';

interface NodeHealth {
  id: string;
  label: string;
  status: 'healthy' | 'degraded' | 'down';
  reason?: string;
}

const initialNodes: NodeHealth[] = [
  { id: 'api-gateway-1', label: 'API Gateway', status: 'healthy' },
  { id: 'worker-pool-1', label: 'Worker Pool 1', status: 'healthy' },
  { id: 'worker-pool-2', label: 'Worker Pool 2', status: 'healthy' },
  { id: 'worker-pool-3', label: 'Worker Pool 3', status: 'healthy' },
  { id: 'redis-primary', label: 'Redis Primary', status: 'healthy' },
  { id: 'postgres-main', label: 'Postgres', status: 'healthy' },
];

export function NodeHealthGrid() {
  const { onMessage } = useWebSocketContext();
  const [nodes, setNodes] = useState<NodeHealth[]>(initialNodes);

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'health' || msg.action !== 'status.changed') return;

      const nodeId = msg.nodeId as string;
      const currentStatus = msg.currentStatus as NodeHealth['status'];
      const reason = msg.reason as string | undefined;

      setNodes((prev) => prev.map((node) =>
        node.id === nodeId ? { ...node, status: currentStatus, reason } : node
      ));
    });
    return unsubscribe;
  }, [onMessage]);

  const statusConfig: Record<string, { color: string; bg: string; border: string; icon: string }> = {
    healthy: { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '●' },
    degraded: { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', icon: '◐' },
    down: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', icon: '○' },
  };

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 10,
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{ fontSize: 14 }}>🖥</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>Node Health</span>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        padding: 12,
      }}>
        {nodes.map((node) => {
          const config = statusConfig[node.status];
          return (
            <div
              key={node.id}
              style={{
                padding: '10px 12px',
                background: config.bg,
                border: `1px solid ${config.border}`,
                borderRadius: 8,
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ color: config.color, fontSize: 10 }}>{config.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>
                  {node.label}
                </span>
              </div>
              <div style={{ fontSize: 10, color: '#64748b' }}>
                {node.reason ?? node.status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
