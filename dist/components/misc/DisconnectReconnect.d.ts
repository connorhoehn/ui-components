import type { ConnectionState } from '../../types/gateway';
interface Props {
    connectionState: ConnectionState;
    onDisconnect: () => void;
    onReconnect: () => void;
}
export declare function DisconnectReconnect({ connectionState, onDisconnect, onReconnect }: Props): import("react").JSX.Element;
export {};
//# sourceMappingURL=DisconnectReconnect.d.ts.map