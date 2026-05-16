import { renderHook, act, waitFor } from '@testing-library/react';
import { useAwareness } from '../useAwareness';
import { useAwarenessState } from '../useAwarenessState';

// Mock useIdleDetector to remove the 2-minute idle timer that would cause
// async act() to hang waiting for the pending setTimeout to resolve.
vi.mock('../useIdleDetector', () => ({
  useIdleDetector: () => ({ isIdle: false }),
}));

// ---------------------------------------------------------------------------
// Mock helpers
// ---------------------------------------------------------------------------

type AwarenessMock = {
  clientID: number;
  getStates: ReturnType<typeof vi.fn>;
  on: ReturnType<typeof vi.fn>;
  off: ReturnType<typeof vi.fn>;
  setLocalStateField: ReturnType<typeof vi.fn>;
};

function makeAwareness(clientID = 42): AwarenessMock {
  return {
    clientID,
    getStates: vi.fn(() => new Map()),
    on: vi.fn(),
    off: vi.fn(),
    setLocalStateField: vi.fn(),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeProvider(awareness: AwarenessMock): any {
  return { awareness };
}

const INITIAL = {
  userId: 'user-1',
  displayName: 'Alice',
  color: '#3b82f6',
  mode: 'editor' as const,
  currentSectionId: null,
};

// ---------------------------------------------------------------------------
// useAwarenessState
// ---------------------------------------------------------------------------

describe('useAwarenessState', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('returns updaters when provider is null and does not crash', () => {
    const { result } = renderHook(() => useAwarenessState(null, INITIAL));
    expect(result.current.updateSection).toBeTypeOf('function');
    expect(result.current.updateMode).toBeTypeOf('function');
    expect(result.current.updateIdle).toBeTypeOf('function');
    expect(result.current.updateCursorInfo).toBeTypeOf('function');
  });

  it('does not call setLocalStateField when provider is null', () => {
    const awareness = makeAwareness();
    renderHook(() => useAwarenessState(null, INITIAL));
    expect(awareness.setLocalStateField).not.toHaveBeenCalled();
  });

  it('flushes initial state to awareness on mount', () => {
    const awareness = makeAwareness();
    const provider = makeProvider(awareness);
    renderHook(() => useAwarenessState(provider, INITIAL));
    expect(awareness.setLocalStateField).toHaveBeenCalledWith(
      'user',
      expect.objectContaining({
        userId: 'user-1',
        displayName: 'Alice',
        color: '#3b82f6',
        mode: 'editor',
        idle: false,
      }),
    );
  });

  it('updateSection merges currentSectionId without clobbering other fields', () => {
    const awareness = makeAwareness();
    const provider = makeProvider(awareness);
    const { result } = renderHook(() => useAwarenessState(provider, INITIAL));
    awareness.setLocalStateField.mockClear();

    act(() => { result.current.updateSection('sec-abc'); });

    expect(awareness.setLocalStateField).toHaveBeenCalledWith(
      'user',
      expect.objectContaining({ currentSectionId: 'sec-abc', userId: 'user-1' }),
    );
  });

  it('updateMode merges mode and flushes', () => {
    const awareness = makeAwareness();
    const provider = makeProvider(awareness);
    const { result } = renderHook(() => useAwarenessState(provider, INITIAL));
    awareness.setLocalStateField.mockClear();

    act(() => { result.current.updateMode('reviewer'); });

    expect(awareness.setLocalStateField).toHaveBeenCalledWith(
      'user',
      expect.objectContaining({ mode: 'reviewer', userId: 'user-1' }),
    );
  });

  it('updateIdle sets idle field and flushes', () => {
    const awareness = makeAwareness();
    const provider = makeProvider(awareness);
    const { result } = renderHook(() => useAwarenessState(provider, INITIAL));
    awareness.setLocalStateField.mockClear();

    act(() => { result.current.updateIdle(true); });

    expect(awareness.setLocalStateField).toHaveBeenCalledWith(
      'user',
      expect.objectContaining({ idle: true }),
    );
  });

  it('updateCursorInfo sets name and color and flushes', () => {
    const awareness = makeAwareness();
    const provider = makeProvider(awareness);
    const { result } = renderHook(() => useAwarenessState(provider, INITIAL));
    awareness.setLocalStateField.mockClear();

    act(() => { result.current.updateCursorInfo('Bob', '#f59e0b'); });

    expect(awareness.setLocalStateField).toHaveBeenCalledWith(
      'user',
      expect.objectContaining({ name: 'Bob', color: '#f59e0b' }),
    );
  });

  it('sequential updaters merge without clobbering prior fields', () => {
    const awareness = makeAwareness();
    const provider = makeProvider(awareness);
    const { result } = renderHook(() => useAwarenessState(provider, INITIAL));

    act(() => { result.current.updateSection('sec-1'); });
    awareness.setLocalStateField.mockClear();
    act(() => { result.current.updateMode('reader'); });

    const lastArg = awareness.setLocalStateField.mock.lastCall?.[1];
    expect(lastArg).toMatchObject({ currentSectionId: 'sec-1', mode: 'reader' });
  });
});

// ---------------------------------------------------------------------------
// useAwareness
// ---------------------------------------------------------------------------

describe('useAwareness', () => {
  const OPTS = {
    userId: 'user-1',
    displayName: 'Alice',
    color: '#3b82f6',
    mode: 'editor' as const,
  };

  afterEach(() => { vi.restoreAllMocks(); });

  it('returns empty participants when provider is null', () => {
    const { result } = renderHook(() => useAwareness(null, OPTS));
    expect(result.current.participants).toEqual([]);
  });

  it('exposes awareness updaters', () => {
    const awareness = makeAwareness();
    const { result } = renderHook(() => useAwareness(makeProvider(awareness), OPTS));
    expect(result.current.awareness.updateSection).toBeTypeOf('function');
    expect(result.current.awareness.updateMode).toBeTypeOf('function');
    expect(result.current.awareness.updateIdle).toBeTypeOf('function');
    expect(result.current.awareness.updateCursorInfo).toBeTypeOf('function');
  });

  it('excludes own clientID from participants list', async () => {
    const awareness = makeAwareness(10);
    awareness.getStates.mockReturnValue(new Map([
      [10, { user: { userId: 'self', displayName: 'Me', color: '#f00', mode: 'editor', lastSeen: 1000, idle: false, currentSectionId: null } }],
      [20, { user: { userId: 'other', displayName: 'Bob', color: '#00f', mode: 'editor', lastSeen: 1000, idle: false, currentSectionId: null } }],
    ]));

    const { result } = renderHook(() => useAwareness(makeProvider(awareness), OPTS));
    await waitFor(() => expect(result.current.participants).toHaveLength(1));
    expect(result.current.participants[0].userId).toBe('other');
  });

  it('maps state fields to Participant shape correctly', async () => {
    const awareness = makeAwareness(1);
    awareness.getStates.mockReturnValue(new Map([
      [2, { user: { userId: 'u2', displayName: 'Carol', color: '#abc', mode: 'reader', lastSeen: 9000, idle: true, currentSectionId: 'sec-x' } }],
    ]));

    const { result } = renderHook(() => useAwareness(makeProvider(awareness), OPTS));
    await waitFor(() => expect(result.current.participants).toHaveLength(1));

    const p = result.current.participants[0];
    expect(p.userId).toBe('u2');
    expect(p.displayName).toBe('Carol');
    expect(p.color).toBe('#abc');
    expect(p.currentSectionId).toBe('sec-x');
    expect(p.idle).toBe(true);
  });

  it('deduplicates by userId keeping most-recent lastSeen', async () => {
    const awareness = makeAwareness(1);
    awareness.getStates.mockReturnValue(new Map([
      [2, { user: { userId: 'shared', displayName: 'Alice-old', color: '#aaa', mode: 'editor', lastSeen: 100, idle: false, currentSectionId: null } }],
      [3, { user: { userId: 'shared', displayName: 'Alice-new', color: '#bbb', mode: 'editor', lastSeen: 200, idle: false, currentSectionId: null } }],
    ]));

    const { result } = renderHook(() => useAwareness(makeProvider(awareness), OPTS));
    await waitFor(() => expect(result.current.participants).toHaveLength(1));
    expect(result.current.participants[0].displayName).toBe('Alice-new');
  });

  it('updates participants when change event fires', async () => {
    const awareness = makeAwareness(1);
    awareness.getStates.mockReturnValue(new Map());

    const { result } = renderHook(() => useAwareness(makeProvider(awareness), OPTS));

    awareness.getStates.mockReturnValue(new Map([
      [2, { user: { userId: 'remote', displayName: 'Dave', color: '#0f0', mode: 'editor', lastSeen: 1, idle: false, currentSectionId: null } }],
    ]));

    const changeHandler = awareness.on.mock.calls.find(
      (c: unknown[]) => c[0] === 'change',
    )?.[1] as (() => void) | undefined;

    act(() => { changeHandler?.(); });

    await waitFor(() => expect(result.current.participants).toHaveLength(1));
    expect(result.current.participants[0].userId).toBe('remote');
  });

  it('removes awareness listener on unmount', () => {
    const awareness = makeAwareness();
    const { unmount } = renderHook(() => useAwareness(makeProvider(awareness), OPTS));
    unmount();
    expect(awareness.off).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
