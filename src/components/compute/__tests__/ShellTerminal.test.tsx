// ShellTerminal owns exactly one socket at a time — and that is the whole test.
//
// `connect()` is reachable from four places (header button, autoConnect
// effect, imperative handle, reconnect ladder) and awaits a URL mint in the
// middle, so two calls overlap easily. Before v2.118.0 the second one simply
// overwrote `wsRef`: the first socket stayed OPEN, unreferenced, still
// writing its output into the terminal the second one now owned, and still
// holding one of the ten shell slots the runtime allows. Nothing in the UI
// showed it — which is why it needs a test rather than a look.

import { render, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRef } from 'react';
// Import the stub directly rather than through '@xterm/xterm'. Vitest's alias
// resolves that specifier to this exact module, so it is the same class at
// runtime — but `tsc` follows the real package, whose Terminal has no
// `written`/`disposed` test hooks. Naming the stub keeps both honest.
import { Terminal } from '../../../test-stubs/xterm-stub';
import { ShellTerminal, type ShellTerminalHandle } from '../components/ShellTerminal';
import { ComputeProvider } from '../context/ComputeContext';
import type { ComputeClient } from '../lib/computeClient';

/** Every socket the component has ever opened, in order. */
let sockets: FakeSocket[] = [];

class FakeSocket {
  static readonly OPEN = 1;
  static readonly CLOSED = 3;
  readyState = 1;
  binaryType = '';
  sent: unknown[] = [];
  closed = false;
  onopen: (() => void) | null = null;
  onmessage: ((ev: { data: ArrayBuffer }) => void) | null = null;
  onclose: ((ev: { code: number }) => void) | null = null;
  onerror: (() => void) | null = null;

  constructor(public url: string) {
    sockets.push(this);
  }
  send(data: unknown) { this.sent.push(data); }
  close() {
    if (this.closed) return;
    this.closed = true;
    this.readyState = 3;
    this.onclose?.({ code: 1000 });
  }
  /** Test helper: deliver a stdout frame. */
  emitStdout(text: string) {
    const body = new TextEncoder().encode(text);
    const frame = new Uint8Array(body.length + 1);
    frame[0] = 1;
    frame.set(body, 1);
    this.onmessage?.({ data: frame.buffer });
  }
}

/** Resolvers for the in-flight `getShellUrl` promises, so tests can overlap them. */
let mints: Array<(url: string) => void> = [];

function makeClient(): ComputeClient {
  return {
    getStatus: async () => ({ ready: true }) as never,
    listComputers: async () => [],
    createComputer: async () => ({}) as never,
    adoptComputer: async () => {},
    renameComputer: async () => {},
    removeComputer: async () => {},
    stopSession: async () => {},
    runTask: async () => ({}) as never,
    runCommand: async () => ({}) as never,
    getShellUrl: () =>
      new Promise((resolve) => {
        mints.push((url) => resolve({ url, shellId: 'sh-1' }));
      }),
  } as unknown as ComputeClient;
}

/** The stub Terminal the component built, captured off `open()`. */
let terminals: Terminal[] = [];

beforeEach(() => {
  sockets = [];
  mints = [];
  terminals = [];
  vi.spyOn(Terminal.prototype, 'open').mockImplementation(function (this: Terminal) {
    terminals.push(this);
  });
  vi.stubGlobal('WebSocket', FakeSocket);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function renderTerminal() {
  const ref = createRef<ShellTerminalHandle>();
  const view = render(
    <ComputeProvider client={makeClient()}>
      <ShellTerminal ref={ref} sessionId="s-1" />
    </ComputeProvider>,
  );
  return { ref, view };
}

/**
 * The terminal the mounted component is actually driving.
 *
 * The suite runs under StrictMode, so the mount effect builds a terminal,
 * disposes it, and builds a second one. `terminals[0]` is the discarded
 * first — asserting against it would pass no matter what the code did.
 */
function liveTerm(): Terminal {
  return terminals[terminals.length - 1];
}

/** Settle one pending URL mint and let the socket be constructed. */
async function settleMint(url: string) {
  const next = mints.shift();
  expect(next, 'expected a getShellUrl call to be pending').toBeDefined();
  await act(async () => {
    next!(url);
    await Promise.resolve();
  });
}

describe('ShellTerminal socket ownership', () => {
  it('closes the previous socket when a second connect wins the race', async () => {
    const { ref } = renderTerminal();

    // Two connects in flight, the way a double-click on the header button
    // (or a click during autoConnect) produces them.
    act(() => { ref.current!.connect(); });
    act(() => { ref.current!.connect(); });
    await waitFor(() => expect(mints.length).toBe(2));

    await settleMint('wss://first');
    await settleMint('wss://second');

    expect(sockets.map((s) => s.url)).toEqual(['wss://first', 'wss://second']);
    // The regression: the first socket used to be left open forever.
    expect(sockets[0].closed).toBe(true);
    expect(sockets[1].closed).toBe(false);
  });

  it('a discarded socket can no longer write into the terminal', async () => {
    const { ref } = renderTerminal();
    act(() => { ref.current!.connect(); });
    act(() => { ref.current!.connect(); });
    await waitFor(() => expect(mints.length).toBe(2));
    await settleMint('wss://first');
    await settleMint('wss://second');

    const term = liveTerm();
    const before = term.written.length;
    // A frame already queued on the abandoned socket must go nowhere.
    act(() => { sockets[0].emitStdout('ghost output'); });
    expect(term.written.length).toBe(before);

    // The socket that won still reaches the terminal.
    act(() => { sockets[1].emitStdout('real output'); });
    expect(term.written.length).toBe(before + 1);
  });

  it('a discarded socket does not run the reconnect ladder', async () => {
    const { ref } = renderTerminal();
    act(() => { ref.current!.connect(); });
    act(() => { ref.current!.connect(); });
    await waitFor(() => expect(mints.length).toBe(2));
    await settleMint('wss://first');
    await settleMint('wss://second');

    // Replacing the first socket closed it. If its `onclose` were still
    // attached, that close would have been read as a dropped connection and
    // minted a third URL.
    await act(async () => { await Promise.resolve(); });
    expect(mints.length).toBe(0);
    expect(sockets.length).toBe(2);
  });

  it('disarms the header connect button while a mint is in flight', async () => {
    const { view } = renderTerminal();
    const button = () => view.getByRole('button', { name: /connect/i });

    expect(button()).toBeEnabled();
    await act(async () => { button().click(); });
    await waitFor(() => expect(mints.length).toBe(1));

    // The strip variant hides itself while connecting; the header did not,
    // so this button stayed clickable across the await inside connect() —
    // and every extra click opened another socket.
    expect(button()).toHaveTextContent('connecting');
    expect(button()).toBeDisabled();

    await settleMint('wss://only');
    expect(sockets.length).toBe(1);
  });

  it('unmounting closes the socket and stops it writing into a disposed terminal', async () => {
    const { ref, view } = renderTerminal();
    act(() => { ref.current!.connect(); });
    await waitFor(() => expect(mints.length).toBe(1));
    await settleMint('wss://only');

    const term = liveTerm();
    act(() => { view.unmount(); });

    expect(sockets[0].closed).toBe(true);
    expect(term.disposed).toBe(true);
    const before = term.written.length;
    act(() => { sockets[0].emitStdout('after unmount'); });
    expect(term.written.length).toBe(before);
  });
});
