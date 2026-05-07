import { useEffect, useState } from 'react';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';

interface Alert {
  id: string;
  severity: string;
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
}

export function AlertsPanel() {
  const { onMessage } = useWebSocketContext();
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'alert') return;

      const action = msg.action as string;
      const alertId = msg.alertId as string;

      if (action === 'fired') {
        const newAlert: Alert = {
          id: alertId,
          severity: msg.severity as string,
          title: msg.title as string,
          description: msg.description as string,
          timestamp: new Date().toLocaleTimeString(),
          resolved: false,
        };
        setAlerts((prev) => [newAlert, ...prev]);
      } else if (action === 'resolved') {
        setAlerts((prev) => prev.map((a) =>
          a.id === alertId ? { ...a, resolved: true, description: msg.description as string } : a
        ));
      }
    });
    return unsubscribe;
  }, [onMessage]);

  const severityStyles: Record<string, { icon: string; color: string; bg: string }> = {
    critical: { icon: '●', color: '#dc2626', bg: '#fef2f2' },
    warning: { icon: '●', color: '#f59e0b', bg: '#fffbeb' },
    info: { icon: '●', color: '#3b82f6', bg: '#eff6ff' },
  };

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 10,
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{ fontSize: 14 }}>🔔</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>Alerts</span>
        {alerts.filter((a) => !a.resolved).length > 0 && (
          <span style={{
            marginLeft: 'auto',
            background: '#fef2f2',
            color: '#dc2626',
            fontSize: 11,
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: 10,
          }}>
            {alerts.filter((a) => !a.resolved).length} active
          </span>
        )}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
        {alerts.length === 0 && (
          <div style={{ color: '#94a3b8', textAlign: 'center', padding: 32, fontSize: 13 }}>
            No alerts yet. Waiting for simulation...
          </div>
        )}
        {alerts.map((alert) => {
          const style = severityStyles[alert.severity] ?? severityStyles.info;
          return (
            <div
              key={`${alert.id}-${alert.resolved ? 'resolved' : 'active'}`}
              style={{
                padding: '10px 14px',
                background: alert.resolved ? '#f8fafc' : style.bg,
                borderRadius: 8,
                marginBottom: 6,
                borderLeft: `3px solid ${alert.resolved ? '#94a3b8' : style.color}`,
                opacity: alert.resolved ? 0.7 : 1,
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ color: alert.resolved ? '#94a3b8' : style.color, fontSize: 8 }}>
                  {style.icon}
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>
                  {alert.title}
                </span>
                {alert.resolved && (
                  <span style={{
                    fontSize: 10,
                    background: '#ecfdf5',
                    color: '#059669',
                    padding: '1px 6px',
                    borderRadius: 3,
                    fontWeight: 500,
                  }}>
                    Resolved
                  </span>
                )}
                <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 'auto' }}>
                  {alert.timestamp}
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.4 }}>
                {alert.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
