// frontend/src/components/observability/components/AlertsPanel.tsx
//
// Vertical list of active alerts (§18.6 Alerts panel). Each item has a
// severity icon, colored left border, message, relative timestamp, and a
// dismiss button. Empty state: centered "No active alerts" in gray.

import { cn } from '../../../lib/cn';

export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface Alert {
  id: string;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  category?: string;
}

export interface AlertsPanelProps {
  alerts: Alert[];
  onDismiss?: (id: string) => void;
}

const SEVERITY_COLOR: Record<AlertSeverity, string> = {
  info: '#2563eb',
  warning: '#f59e0b',
  error: '#dc2626',
  critical: '#dc2626',
};

const SEVERITY_ICON: Record<AlertSeverity, string> = {
  info: 'ℹ',
  warning: '⚠',
  error: '✕',
  critical: '✕',
};

function relativeTimestamp(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return iso;
  const diffSec = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (diffSec < 60) return 'just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  const diffDays = Math.floor(diffSec / 86400);
  if (diffDays < 3) return `${diffDays}d ago`;
  try {
    return new Date(t).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

function AlertItem({
  alert,
  onDismiss,
}: {
  alert: Alert;
  onDismiss?: (id: string) => void;
}) {
  const color = SEVERITY_COLOR[alert.severity];
  const icon = SEVERITY_ICON[alert.severity];

  return (
    <div
      data-testid="alert-item"
      className={cn(
        'flex items-start gap-2.5 px-3 py-2.5',
        'bg-surface border border-border rounded-md font-[inherit]'
      )}
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <span
        aria-hidden="true"
        className="text-sm leading-5 shrink-0 w-4 text-center"
        style={{ color }}
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] text-text-primary leading-[1.4]">
          {alert.message}
        </div>
        <div className="text-[11px] text-text-tertiary mt-0.5">
          {alert.category ? `${alert.category} · ` : ''}
          {relativeTimestamp(alert.timestamp)}
        </div>
      </div>
      {onDismiss && (
        <button
          data-testid="alert-dismiss"
          aria-label="dismiss alert"
          onClick={() => onDismiss(alert.id)}
          className="bg-transparent border-none text-text-tertiary text-base leading-none cursor-pointer px-1.5 py-0.5 font-[inherit] shrink-0"
        >
          ×
        </button>
      )}
    </div>
  );
}

function AlertsPanel({ alerts, onDismiss }: AlertsPanelProps) {
  if (!alerts || alerts.length === 0) {
    return (
      <div
        data-testid="alerts-empty"
        className="p-6 text-center text-text-tertiary text-[13px] border border-border rounded-lg bg-surface font-[inherit]"
      >
        No active alerts
      </div>
    );
  }

  return (
    <div
      data-testid="alerts-panel"
      className="flex flex-col gap-2"
    >
      {alerts.map((a) => (
        <AlertItem key={a.id} alert={a} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

export default AlertsPanel;
