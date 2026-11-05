// frontend/src/components/DisconnectReconnect.tsx
//
// Developer control: drop and restore the WebSocket connection with a single
// click so the reconnection flow can be observed without touching the terminal.

import type { ConnectionState } from '../../types/gateway';
import { cn } from '../../lib/cn';

interface Props {
  connectionState: ConnectionState;
  onDisconnect: () => void;
  onReconnect: () => void;
}

export function DisconnectReconnect({ connectionState, onDisconnect, onReconnect }: Props) {
  const isDisconnected = connectionState === 'disconnected';
  const isActiveOrConnecting =
    connectionState === 'connected' ||
    connectionState === 'connecting' ||
    connectionState === 'reconnecting';

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        data-ui-part=""
        onClick={onDisconnect}
        disabled={isDisconnected}
        className={cn(
          'px-3 py-1.5 border rounded font-mono text-sm',
          isDisconnected
            ? 'bg-surface-hover text-text-tertiary border-border-field cursor-not-allowed'
            : 'bg-danger-bg text-danger-fg border-danger-border cursor-pointer'
        )}
      >
        Disconnect
      </button>

      <button
        data-ui-part=""
        onClick={onReconnect}
        disabled={isActiveOrConnecting}
        className={cn(
          'px-3 py-1.5 border rounded font-mono text-sm',
          isActiveOrConnecting
            ? 'bg-surface-hover text-text-tertiary border-border-field cursor-not-allowed'
            : 'bg-success-bg text-success-fg border-success-border cursor-pointer'
        )}
      >
        Reconnect
      </button>

      <span className="text-text-secondary text-xs font-mono">
        state: <strong>{connectionState}</strong>
      </span>
    </div>
  );
}
