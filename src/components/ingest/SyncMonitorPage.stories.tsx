import { useEffect, useMemo, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import SyncMonitorPage from './SyncMonitorPage';
import { IdentityProvider } from '../../contexts/IdentityContext';
import { WebSocketProvider } from '../../contexts/WebSocketContext';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// This page's only data source is `useIngestProgress`, which subscribes to the
// gateway's `ingest:progress` channel. The stories provide a mocked
// WebSocketContext value whose `onMessage` is a real fan-out registry, then
// push the exact frames the gateway sends. No socket is opened — the page's
// aggregation logic is doing the work you see.
// ---------------------------------------------------------------------------

const IDENTITY = {
  userId: 'u-ops',
  displayName: 'Ops Operator',
  userEmail: 'ops@example.com',
  idToken: 'story-token',
  onSignOut: () => {},
};

function makeSocket() {
  const handlers = new Set<(msg: GatewayMessage) => void>();
  const value = {
    connectionState: 'connected' as const,
    sendMessage: () => {},
    onMessage: (handler: (msg: GatewayMessage) => void) => {
      handlers.add(handler);
      return () => {
        handlers.delete(handler);
      };
    },
    clientId: 'story-client',
    sessionToken: 'story-session',
    ws: {
      connectionState: 'connected' as const,
      lastError: null,
      sessionToken: 'story-session',
      clientId: 'story-client',
      currentChannel: 'ingest:progress',
      switchChannel: () => {},
      sendMessage: () => {},
      disconnect: () => {},
      reconnect: () => {},
    },
  };
  const emit = (msg: { type: string; [key: string]: unknown }) => {
    const frame: GatewayMessage = {
      channel: 'ingest:progress',
      timestamp: new Date().toISOString(),
      ...msg,
    };
    for (const handler of handlers) handler(frame);
  };
  return { value, emit };
}

type Emit = ReturnType<typeof makeSocket>['emit'];

function Feed({
  emit,
  script,
  intervalMs,
  children,
}: {
  emit: Emit;
  script: (emit: Emit, tick: number) => void;
  intervalMs?: number;
  children: ReactNode;
}) {
  useEffect(() => {
    let tick = 0;
    script(emit, tick);
    if (!intervalMs) return undefined;
    const timer = setInterval(() => {
      tick += 1;
      script(emit, tick);
    }, intervalMs);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={['/ingest/sync']}>
      <IdentityProvider value={IDENTITY}>{children}</IdentityProvider>
    </MemoryRouter>
  );
}

const meta = {
  title: 'Ingest/SyncMonitorPage',
  component: SyncMonitorPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SyncMonitorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function Story_({
  script,
  intervalMs,
}: {
  script: (emit: Emit, tick: number) => void;
  intervalMs?: number;
}) {
  const socket = useMemo(makeSocket, []);
  return (
    <Frame>
      <WebSocketProvider value={socket.value}>
        <Feed emit={socket.emit} script={script} intervalMs={intervalMs}>
          <div className="h-[680px] overflow-auto">
            <SyncMonitorPage />
          </div>
        </Feed>
      </WebSocketProvider>
    </Frame>
  );
}

/** Connected, subscribed, nothing syncing — the resting state. */
export const Idle: Story = {
  render: () => <Story_ script={() => {}} />,
};

/** Two syncs in flight with per-source progress counters. */
export const ActiveSyncs: Story = {
  render: () => (
    <Story_
      script={(emit, tick) => {
        if (tick > 0) return;
        emit({ type: 'sync.started', sourceId: 'src-drive', sourceName: 'Contracts (Google Drive)', fileCount: 412 });
        emit({ type: 'sync.started', sourceId: 'src-s3', sourceName: 'Invoice drop bucket', fileCount: 88 });
        emit({ type: 'sync.progress', sourceId: 'src-drive', fileCount: 412, filesFetched: 220 });
        emit({ type: 'sync.progress', sourceId: 'src-s3', fileCount: 88, filesFetched: 31 });
        for (let i = 0; i < 6; i++) emit({ type: 'item.mapped', sourceId: 'src-drive', itemId: `it-${i}` });
        for (let i = 0; i < 3; i++) emit({ type: 'item.materialized', sourceId: 'src-drive', itemId: `it-${i}` });
      }}
    />
  ),
};

/** A sync that ran and failed — the event log keeps the trail. */
export const FailedSync: Story = {
  render: () => (
    <Story_
      script={(emit, tick) => {
        if (tick > 0) return;
        emit({ type: 'sync.started', sourceId: 'src-s3', sourceName: 'Invoice drop bucket', fileCount: 88 });
        emit({ type: 'sync.progress', sourceId: 'src-s3', fileCount: 88, filesFetched: 12 });
        emit({ type: 'item.failed', sourceId: 'src-s3', itemId: 'it-9921', error: 'HTTP 502 from materializer' });
        emit({ type: 'sync.failed', sourceId: 'src-s3', error: 'AccessDenied: s3:GetObject' });
      }}
    />
  ),
};

/** Frames arriving every second so the log auto-follows; try Pause. */
export const Streaming: Story = {
  render: () => (
    <Story_
      intervalMs={1000}
      script={(emit, tick) => {
        if (tick === 0) {
          emit({ type: 'sync.started', sourceId: 'src-drive', sourceName: 'Contracts (Google Drive)', fileCount: 412 });
          return;
        }
        emit({ type: 'sync.progress', sourceId: 'src-drive', fileCount: 412, filesFetched: Math.min(412, tick * 37) });
        emit({ type: 'item.mapped', sourceId: 'src-drive', itemId: `it-${tick}` });
        if (tick % 4 === 0) {
          emit({ type: 'item.failed', sourceId: 'src-drive', itemId: `it-${tick}`, error: 'mapping confidence below threshold' });
        }
      }}
    />
  ),
};
