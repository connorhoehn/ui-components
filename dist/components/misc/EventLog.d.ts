import type { GatewayMessage } from '../../types/gateway';
export interface LogEntry {
    id: string;
    direction: 'sent' | 'received';
    message: GatewayMessage | Record<string, unknown>;
    timestamp: string;
}
interface Props {
    entries: LogEntry[];
}
export declare function EventLog({ entries }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=EventLog.d.ts.map