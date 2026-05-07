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
        onClick={onDisconnect}
        disabled={isDisconnected}
        className={cn(
          'px-3 py-1.5 border rounded font-mono text-sm',
          isDisconnected
            ? 'bg-[#f3f4f6] text-[#9ca3af] border-border-field cursor-not-allowed'
            : 'bg-[#fee2e2] text-[#dc2626] border-[#fca5a5] cursor-pointer'
        )}
      >
        Disconnect
      </button>

      <button
        onClick={onReconnect}
        disabled={isActiveOrConnecting}
        className={cn(
          'px-3 py-1.5 border rounded font-mono text-sm',
          isActiveOrConnecting
            ? 'bg-[#f3f4f6] text-[#9ca3af] border-border-field cursor-not-allowed'
            : 'bg-[#dcfce7] text-[#15803d] border-[#86efac] cursor-pointer'
        )}
      >
        Reconnect
      </button>

      <span className="text-[#6b7280] text-xs font-mono">
        state: <strong>{connectionState}</strong>
      </span>
    </div>
  );
}
