import { useEffect, useState } from 'react';
import { AlertList, type AlertListEntry, type AlertSeverity } from '@/components/observability';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';

const KNOWN_SEVERITIES: AlertSeverity[] = ['critical', 'warning', 'info'];

function coerceSeverity(raw: string): AlertSeverity {
  return (KNOWN_SEVERITIES as string[]).includes(raw) ? (raw as AlertSeverity) : 'info';
}

export function AlertsPanel() {
  const { onMessage } = useWebSocketContext();
  const [alerts, setAlerts] = useState<AlertListEntry[]>([]);

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'alert') return;

      const action = msg.action as string;
      const alertId = msg.alertId as string;

      if (action === 'fired') {
        const newAlert: AlertListEntry = {
          id: alertId,
          severity: coerceSeverity(msg.severity as string),
          title: msg.title as string,
          description: msg.description as string,
          timestamp: new Date().toLocaleTimeString(),
          resolved: false,
        };
        setAlerts((prev) => [newAlert, ...prev]);
      } else if (action === 'resolved') {
        setAlerts((prev) =>
          prev.map((a) =>
            a.id === alertId
              ? { ...a, resolved: true, description: msg.description as string }
              : a,
          ),
        );
      }
    });
    return unsubscribe;
  }, [onMessage]);

  return (
    <AlertList
      items={alerts}
      empty={
        <div className="text-center text-[12px] text-[var(--color-text-tertiary)] py-8">
          No alerts yet. Waiting for simulation…
        </div>
      }
      className="h-full"
    />
  );
}
