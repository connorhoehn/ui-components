# WebSocket Provider

The library does **not** own or manage the WebSocket connection. Your application creates the connection (or uses the provided `useWebSocket` hook) and passes the resulting context value into `<WebSocketProvider>`. This design keeps the library transport-agnostic — you control reconnection, auth token rotation, and URL construction.

## Prerequisites

- A WebSocket endpoint (your own gateway, or any WS server)
- React 19+

## The WebSocketContextValue Interface

```tsx
import type { ConnectionState, GatewayMessage } from '@connorhoehn/ui-components/types';

interface WebSocketContextValue {
  connectionState: ConnectionState;
  sendMessage: (msg: Record<string, unknown>) => void;
  onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
  ws: UseWebSocketReturn;
  clientId: string | null;
  sessionToken: string | null;
}
```

Where `ConnectionState` is one of: `'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected'`.

## Basic Setup with useWebSocket

The library ships a `useWebSocket` hook that handles connection lifecycle, exponential backoff, and session negotiation:

```tsx
import { useWebSocket } from '@connorhoehn/ui-components/hooks';
import { WebSocketProvider } from '@connorhoehn/ui-components';

function AppShell({ children }: { children: React.ReactNode }) {
  const ws = useWebSocket({
    config: {
      wsUrl: 'wss://gateway.example.com/ws',
      idToken: user.idToken,
    },
  });

  const wsContextValue: WebSocketContextValue = {
    connectionState: ws.connectionState,
    sendMessage: ws.sendMessage,
    onMessage: /* your subscription registry */,
    ws,
    clientId: ws.clientId,
    sessionToken: ws.sessionToken,
  };

  return (
    <WebSocketProvider value={wsContextValue}>
      {children}
    </WebSocketProvider>
  );
}
```

## How onMessage Subscription Works

The `onMessage` function follows a subscribe/unsubscribe pattern. Consumers register a handler and receive an unsubscribe function:

```tsx
import { useEffect } from 'react';
import { useWebSocketContext } from '@connorhoehn/ui-components';

function ChatListener() {
  const { onMessage } = useWebSocketContext();

  useEffect(() => {
    const unsubscribe = onMessage((msg) => {
      if (msg.type === 'chat' && msg.action === 'sent') {
        // Handle incoming chat message
        console.log('New message:', msg);
      }
    });

    // Cleanup on unmount
    return unsubscribe;
  }, [onMessage]);

  return null;
}
```

This pattern allows multiple independent subscribers without interference. Each call to `onMessage` adds a new handler to the set; the returned function removes it.

## How sendMessage Works

`sendMessage` serializes a plain object and sends it over the WebSocket:

```tsx
import { useWebSocketContext } from '@connorhoehn/ui-components';

function SendButton() {
  const { sendMessage, connectionState } = useWebSocketContext();

  const handleClick = () => {
    sendMessage({
      type: 'chat',
      action: 'send',
      channel: 'general',
      content: 'Hello, world!',
    });
  };

  return (
    <button onClick={handleClick} disabled={connectionState !== 'connected'}>
      Send
    </button>
  );
}
```

## Connection State Handling

Components can react to connection state changes for UI feedback:

```tsx
import { useWebSocketContext } from '@connorhoehn/ui-components';

function ConnectionBanner() {
  const { connectionState } = useWebSocketContext();

  if (connectionState === 'connected') return null;

  const messages: Record<string, string> = {
    idle: 'Not connected',
    connecting: 'Connecting...',
    reconnecting: 'Connection lost. Reconnecting...',
    disconnected: 'Disconnected. Please refresh.',
  };

  return (
    <div role="alert" className="connection-banner">
      {messages[connectionState]}
    </div>
  );
}
```

## Custom Connection with Reconnection Logic

If you need full control over the WebSocket (e.g., custom protocols, token refresh), build the context value yourself:

```tsx
import { useState, useRef, useCallback, useEffect } from 'react';
import { WebSocketProvider } from '@connorhoehn/ui-components';
import type { WebSocketContextValue } from '@connorhoehn/ui-components';
import type { GatewayMessage } from '@connorhoehn/ui-components/types';

function CustomWebSocketShell({ children }: { children: React.ReactNode }) {
  const [connectionState, setConnectionState] = useState<ConnectionState>('idle');
  const wsRef = useRef<WebSocket | null>(null);
  const subscribersRef = useRef<Set<(msg: GatewayMessage) => void>>(new Set());
  const retryCountRef = useRef(0);

  const connect = useCallback(() => {
    setConnectionState('connecting');
    const socket = new WebSocket('wss://gateway.example.com/ws');

    socket.onopen = () => {
      setConnectionState('connected');
      retryCountRef.current = 0;
    };

    socket.onmessage = (event) => {
      const msg: GatewayMessage = JSON.parse(event.data);
      subscribersRef.current.forEach((handler) => handler(msg));
    };

    socket.onclose = () => {
      setConnectionState('reconnecting');
      // Exponential backoff
      const delay = Math.min(1000 * 2 ** retryCountRef.current, 30000);
      retryCountRef.current += 1;
      setTimeout(connect, delay);
    };

    wsRef.current = socket;
  }, []);

  useEffect(() => {
    connect();
    return () => wsRef.current?.close();
  }, [connect]);

  const sendMessage = useCallback((msg: Record<string, unknown>) => {
    wsRef.current?.send(JSON.stringify(msg));
  }, []);

  const onMessage = useCallback((handler: (msg: GatewayMessage) => void) => {
    subscribersRef.current.add(handler);
    return () => { subscribersRef.current.delete(handler); };
  }, []);

  const value: WebSocketContextValue = {
    connectionState,
    sendMessage,
    onMessage,
    ws: { /* fill UseWebSocketReturn fields */ } as any,
    clientId: null,
    sessionToken: null,
  };

  return (
    <WebSocketProvider value={value}>
      {children}
    </WebSocketProvider>
  );
}
```

## GatewayMessage Shape

All messages flowing through the WebSocket conform to this interface:

```tsx
interface GatewayMessage {
  type: string;       // e.g. 'session', 'chat', 'presence', 'cursor', 'reaction', 'error'
  action?: string;    // e.g. 'joined', 'sent', 'message'
  channel?: string;
  error?: GatewayError;
  [key: string]: unknown;
}
```

Components filter on `type` and `action` to handle only the messages they care about.
