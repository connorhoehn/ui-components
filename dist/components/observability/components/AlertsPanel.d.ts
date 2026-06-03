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
declare function AlertsPanel({ alerts, onDismiss }: AlertsPanelProps): import("react/jsx-runtime").JSX.Element;
export default AlertsPanel;
//# sourceMappingURL=AlertsPanel.d.ts.map