import { renderHook, act } from '@testing-library/react';
import { useIngestProgress } from '../useIngestProgress';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// WebSocketContext mock
// ---------------------------------------------------------------------------

let registeredHandler: ((msg: GatewayMessage) => void) | null = null;
let mockConnectionState: 'connected' | 'disconnected' = 'connected';
const mockSendMessage = vi.fn();

vi.mock('../../contexts/WebSocketContext', () => ({
  useWebSocketContext: () => ({
    get connectionState() { return mockConnectionState; },
    sendMessage: mockSendMessage,
    onMessage: (handler: (msg: GatewayMessage) => void) => {
      registeredHandler = handler;
      return () => { registeredHandler = null; };
    },
  }),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function emit(msg: Partial<GatewayMessage> & { type: string }) {
  registeredHandler?.(msg as GatewayMessage);
}

const STARTED_MSG = {
  type: 'sync.started',
  channel: 'ingest:progress',
  sourceId: 'src-1',
  sourceName: 'My Source',
  fileCount: 100,
  timestamp: '2024-01-01T00:00:00.000Z',
};

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------

beforeEach(() => {
  registeredHandler = null;
  mockConnectionState = 'connected';
  mockSendMessage.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('initial state', () => {
  it('starts with empty events and activeSyncs', () => {
    const { result } = renderHook(() => useIngestProgress());
    expect(result.current.events).toHaveLength(0);
    expect(result.current.activeSyncs.size).toBe(0);
  });
});

describe('subscription lifecycle', () => {
  it('sends subscribe message when connectionState is connected', () => {
    renderHook(() => useIngestProgress());
    expect(mockSendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'subscribe', channelId: 'ingest:progress' }),
    );
  });

  it('does not subscribe when disconnected', () => {
    mockConnectionState = 'disconnected';
    renderHook(() => useIngestProgress());
    expect(mockSendMessage).not.toHaveBeenCalled();
  });
});

describe('message filtering', () => {
  it('ignores messages from unrelated channels', () => {
    const { result } = renderHook(() => useIngestProgress());
    act(() => emit({ type: 'chat.message', channel: 'room:chat' }));
    expect(result.current.events).toHaveLength(0);
  });

  it('accepts messages with ingest:progress channel', () => {
    const { result } = renderHook(() => useIngestProgress());
    act(() => emit({ type: 'sync.started', channel: 'ingest:progress', sourceId: 'src-1' }));
    expect(result.current.events).toHaveLength(1);
  });

  it('accepts messages with sync.* type regardless of channel', () => {
    const { result } = renderHook(() => useIngestProgress());
    act(() => emit({ type: 'sync.started', channel: 'other', sourceId: 'src-1' }));
    expect(result.current.events).toHaveLength(1);
  });
});

describe('sync.started', () => {
  it('adds an entry to activeSyncs', () => {
    const { result } = renderHook(() => useIngestProgress());
    act(() => emit(STARTED_MSG));
    expect(result.current.activeSyncs.size).toBe(1);
    const sync = result.current.activeSyncs.get('src-1');
    expect(sync?.sourceName).toBe('My Source');
    expect(sync?.fileCount).toBe(100);
    expect(sync?.filesFetched).toBe(0);
  });
});

describe('sync.progress', () => {
  it('updates fileCount and filesFetched', () => {
    const { result } = renderHook(() => useIngestProgress());
    act(() => emit(STARTED_MSG));
    act(() => emit({ type: 'sync.progress', channel: 'ingest:progress', sourceId: 'src-1', fileCount: 100, filesFetched: 40 }));
    const sync = result.current.activeSyncs.get('src-1');
    expect(sync?.filesFetched).toBe(40);
  });
});

describe('sync.completed', () => {
  it('removes the entry from activeSyncs', () => {
    const { result } = renderHook(() => useIngestProgress());
    act(() => emit(STARTED_MSG));
    expect(result.current.activeSyncs.size).toBe(1);
    act(() => emit({ type: 'sync.completed', channel: 'ingest:progress', sourceId: 'src-1' }));
    expect(result.current.activeSyncs.size).toBe(0);
  });
});

describe('sync.failed', () => {
  it('removes the entry from activeSyncs', () => {
    const { result } = renderHook(() => useIngestProgress());
    act(() => emit(STARTED_MSG));
    act(() => emit({ type: 'sync.failed', channel: 'ingest:progress', sourceId: 'src-1' }));
    expect(result.current.activeSyncs.size).toBe(0);
  });
});

describe('item.mapped', () => {
  it('increments itemsMapped on the active sync', () => {
    const { result } = renderHook(() => useIngestProgress());
    act(() => emit(STARTED_MSG));
    act(() => emit({ type: 'item.mapped', channel: 'ingest:progress', sourceId: 'src-1' }));
    act(() => emit({ type: 'item.mapped', channel: 'ingest:progress', sourceId: 'src-1' }));
    expect(result.current.activeSyncs.get('src-1')?.itemsMapped).toBe(2);
  });
});

describe('item.materialized', () => {
  it('increments itemsMaterialized on the active sync', () => {
    const { result } = renderHook(() => useIngestProgress());
    act(() => emit(STARTED_MSG));
    act(() => emit({ type: 'item.materialized', channel: 'ingest:progress', sourceId: 'src-1' }));
    expect(result.current.activeSyncs.get('src-1')?.itemsMaterialized).toBe(1);
  });
});

describe('clearEvents', () => {
  it('empties the event buffer', () => {
    const { result } = renderHook(() => useIngestProgress());
    act(() => emit(STARTED_MSG));
    expect(result.current.events).toHaveLength(1);
    act(() => result.current.clearEvents());
    expect(result.current.events).toHaveLength(0);
  });
});
