import { useEffect, useState } from 'react';
import { HealthGrid, type HealthGridEntry, type HealthStatus } from '@/components/observability';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';

const KNOWN_STATUSES: HealthStatus[] = ['healthy', 'degraded', 'down', 'unknown'];

function coerceStatus(raw: string | undefined): HealthStatus {
  return raw && (KNOWN_STATUSES as string[]).includes(raw)
    ? (raw as HealthStatus)
    : 'unknown';
}

const initialNodes: HealthGridEntry[] = [
  { id: 'api-gateway-1', label: 'API Gateway', status: 'healthy' },
  { id: 'worker-pool-1', label: 'Worker Pool 1', status: 'healthy' },
  { id: 'worker-pool-2', label: 'Worker Pool 2', status: 'healthy' },
  { id: 'worker-pool-3', label: 'Worker Pool 3', status: 'healthy' },
  { id: 'redis-primary', label: 'Redis Primary', status: 'healthy' },
  { id: 'postgres-main', label: 'Postgres', status: 'healthy' },
];

export function NodeHealthGrid() {
  const { onMessage } = useWebSocketContext();
  const [nodes, setNodes] = useState<HealthGridEntry[]>(initialNodes);

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'health' || msg.action !== 'status.changed') return;

      const nodeId = msg.nodeId as string;
      const currentStatus = coerceStatus(msg.currentStatus as string | undefined);
      const reason = msg.reason as string | undefined;

      setNodes((prev) =>
        prev.map((node) =>
          node.id === nodeId ? { ...node, status: currentStatus, reason } : node,
        ),
      );
    });
    return unsubscribe;
  }, [onMessage]);

  return <HealthGrid title="Node Health" items={nodes} columns={3} />;
}
