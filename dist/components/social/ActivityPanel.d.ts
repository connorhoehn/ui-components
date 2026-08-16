type ConnectionState = 'connected' | 'connecting' | 'disconnected';
type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;
interface GatewayMessage {
    type: string;
    channel?: string;
    payload?: unknown;
    [key: string]: unknown;
}
interface ActivityPanelProps {
    idToken: string | null;
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: OnMessageFn;
    connectionState: ConnectionState;
}
export declare function ActivityPanel({ idToken, sendMessage, onMessage, connectionState }: ActivityPanelProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ActivityPanel.d.ts.map