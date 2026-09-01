// A simulated bot run, delivered over a simulated EventSource.
//
// The sibling of `mockShell.ts`. That one makes a terminal pane typeable with
// no backend; this one makes a TAIL pane watchable with no backend — the other
// half of the lab, and the half that had nothing to show.
//
// The scenario it exists for: a cron bot or a job dispatcher claims an idle
// computer and runs `claude -p "…"` on it, and someone opens the lab to watch
// rather than to drive. Every piece of that shipped working — the per-box
// event ring, the tail SSE, `TailPane`, the rail's activity list — and none of
// it could be seen in Storybook or a demo, because a story has no server
// putting events in a ring. A pane that is permanently empty reads as unbuilt,
// so nobody could review the one thing this surface is for.
//
// The event vocabulary matches what the reference backend tees into a box's
// ring, so a story exercises the same parsing a deployment does.

/** URLs beginning with this are answered by the simulator. */
export const MOCK_TAIL_SCHEME = 'mock-tail:';

/** One scripted frame. `afterMs` is relative to the previous frame. */
interface Frame {
  afterMs: number;
  data: Record<string, unknown>;
}

/**
 * The agent CLI's own shape for a spoken line and a tool call.
 *
 * Written through helpers rather than by hand because the shape is nested and
 * easy to approximate: an `assistant` event carries `message.content[]`, and a
 * flatter `{ type: 'assistant', text }` — which is what this fixture had
 * first — parses to NOTHING. The pane stays blank, the fixture looks fine on
 * its own, and the story silently shows a bot that says nothing.
 */
const says = (text: string): Record<string, unknown> => ({
  type: 'assistant', message: { content: [{ type: 'text', text }] },
});
const uses = (name: string, input: Record<string, unknown>): Record<string, unknown> => ({
  type: 'assistant', message: { content: [{ type: 'tool_use', name, input }] },
});

/**
 * A run with a shape worth watching: it starts, thinks, uses tools, and lands
 * somewhere — including one that ends by asking a question, because `waiting`
 * is a real status the rail sorts to the top and it needs to be reachable.
 */
export interface MockTailScript {
  id: string;
  label: string;
  frames: Frame[];
}

const AUDIT: MockTailScript = {
  id: 'nightly-dependency-audit',
  label: 'nightly-dependency-audit',
  frames: [
    { afterMs: 400, data: { type: 'job_started', title: 'nightly-dependency-audit', kind: 'devbox:task' } },
    { afterMs: 200, data: { type: 'task_started', prompt: 'Audit dependencies for advisories and open a change request for anything critical.' } },
    { afterMs: 900, data: says('Reading the lockfile and resolving the dependency graph.') },
    { afterMs: 1300, data: uses('Bash', { command: 'npm audit --json' }) },
    { afterMs: 2100, data: says('3 advisories: 1 high, 2 moderate. Checking whether the high one is reachable.') },
    { afterMs: 1700, data: uses('Grep', { pattern: 'serialize-javascript' }) },
    { afterMs: 2400, data: says('Reachable from the report renderer only. Bumping it and pinning the transitive.') },
    { afterMs: 1400, data: uses('Edit', { file: 'package.json' }) },
    { afterMs: 2200, data: { type: 'result', subtype: 'success', num_turns: 6, duration_ms: 12800, total_cost_usd: 0.0412, result: 'Bumped serialize-javascript to 6.0.2; the two moderates are dev-only and left alone.' } },
    { afterMs: 300, data: { type: 'devbox_end' } },
    // The dispatcher's own close, after the container's — distinct events,
    // and this is the one that closes the `job_started` banner's arc.
    { afterMs: 200, data: { type: 'job_finished', ok: true } },
  ],
};

const TRIAGE: MockTailScript = {
  id: 'flaky-test-triage',
  label: 'flaky-test-triage',
  frames: [
    { afterMs: 400, data: { type: 'job_started', title: 'flaky-test-triage', kind: 'devbox:task' } },
    { afterMs: 200, data: { type: 'task_started', prompt: 'Find tests that failed intermittently this week and say why.' } },
    { afterMs: 800, data: says('Pulling the last 40 CI runs.') },
    { afterMs: 1500, data: uses('Bash', { command: 'gh run list --limit 40' }) },
    { afterMs: 2300, data: says('Two suites flap: session-epoch and the canary rollup. Both look time-dependent.') },
    { afterMs: 1900, data: uses('Read', { file: 'src/lib/__tests__/session-epoch.test.ts' }) },
    // Ends on a question, which is what puts a box in `waiting` rather than
    // `idle` — the status the activity list sorts to the top.
    { afterMs: 2600, data: { type: 'result', subtype: 'success', num_turns: 5, duration_ms: 11200, total_cost_usd: 0.0298, result: 'Both flakes are clock-boundary, not ordering. Want me to pin the clock in the fixtures?' } },
    { afterMs: 300, data: { type: 'devbox_end' } },
    { afterMs: 200, data: { type: 'job_finished', ok: true } },
  ],
};

const DRIFT: MockTailScript = {
  id: 'schema-drift-check',
  label: 'schema-drift-check',
  frames: [
    { afterMs: 400, data: { type: 'job_started', title: 'schema-drift-check', kind: 'devbox:task' } },
    { afterMs: 200, data: { type: 'task_started', prompt: 'Compare the deployed schema against schema/*.sql and report drift.' } },
    { afterMs: 900, data: says('Dumping the live schema.') },
    { afterMs: 1600, data: uses('Bash', { command: 'psql -c "\\d+ public.*"' }) },
    { afterMs: 2400, data: says('One table differs: environments has a column the checked-in DDL does not.') },
    // A run that fails, so the error path is reviewable too.
    { afterMs: 2000, data: { type: 'devbox_error', error: 'connection reset while reading pg_catalog — the cluster scaled down mid-query' } },
    // The dispatcher's own failed close — `ok: false` is the only field it
    // carries, so the banner's tone is the entire signal.
    { afterMs: 200, data: { type: 'job_finished', ok: false } },
  ],
};

export const MOCK_TAIL_SCRIPTS: MockTailScript[] = [AUDIT, TRIAGE, DRIFT];

/** The URL a mock client should hand back from `tail(boxId)`. */
export function mockTailUrl(boxId: string, scriptId?: string): string {
  const script = scriptId ? `?script=${encodeURIComponent(scriptId)}` : '';
  return `${MOCK_TAIL_SCHEME}//${boxId}${script}`;
}

function scriptFor(url: string): MockTailScript {
  const requested = /script=([^&]+)/.exec(url)?.[1];
  if (requested) {
    const found = MOCK_TAIL_SCRIPTS.find((s) => s.id === decodeURIComponent(requested));
    if (found) return found;
  }
  // Deterministic per box, so two panes on different boxes show different runs
  // and the same box shows the same one across a remount.
  const boxId = url.slice(MOCK_TAIL_SCHEME.length).replace(/^\/+/, '').split('?')[0] ?? '';
  let hash = 0;
  for (const ch of boxId) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return MOCK_TAIL_SCRIPTS[hash % MOCK_TAIL_SCRIPTS.length]!;
}

type Listener = (event: MessageEvent) => void;

/**
 * Minimal EventSource that plays a script.
 *
 * Only the surface `useComputeTail` uses: `onmessage`, `onerror`,
 * `addEventListener('message'|'error')`, `close()`, `readyState`. Anything
 * else would be scaffolding nothing calls.
 */
// Deliberately NOT `implements Partial<EventSource>`: the DOM type's
// add/removeEventListener are heavily overloaded generics, and satisfying them
// would mean scaffolding no consumer calls. The shape below is what
// useComputeTail actually uses, and the cast at the construction site is where
// that claim is made once, visibly.
class MockTailSource {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSED = 2;

  readonly url: string;
  readonly withCredentials: boolean;
  readyState = 0;
  onmessage: Listener | null = null;
  onerror: ((event: Event) => void) | null = null;
  onopen: ((event: Event) => void) | null = null;

  private listeners = new Map<string, Set<(event: Event) => void>>();
  private timers: ReturnType<typeof setTimeout>[] = [];
  private closed = false;

  constructor(url: string, init?: { withCredentials?: boolean }) {
    this.url = url;
    this.withCredentials = !!init?.withCredentials;
    const script = scriptFor(url);

    // Open on a macrotask, not synchronously: a real EventSource never calls
    // back before the caller has attached handlers, and a simulator that does
    // teaches the consumer a lie it will only discover in production.
    let at = 0;
    this.schedule(0, () => {
      this.readyState = 1;
      this.emit('open', new Event('open'));
    });
    for (const frame of script.frames) {
      at += frame.afterMs;
      this.schedule(at, () => this.deliver(frame.data));
    }
  }

  private schedule(delay: number, fn: () => void): void {
    this.timers.push(setTimeout(() => { if (!this.closed) fn(); }, delay));
  }

  private deliver(data: Record<string, unknown>): void {
    const event = new MessageEvent('message', {
      data: JSON.stringify({ ...data, ts: new Date().toISOString() }),
    });
    this.onmessage?.(event);
    this.emit('message', event);
  }

  private emit(type: string, event: Event): void {
    for (const fn of this.listeners.get(type) ?? []) {
      try { fn(event); } catch { /* one bad listener must not stop the rest */ }
    }
  }

  addEventListener(type: string, fn: (event: Event) => void): void {
    const set = this.listeners.get(type) ?? new Set();
    set.add(fn);
    this.listeners.set(type, set);
  }

  removeEventListener(type: string, fn: (event: Event) => void): void {
    this.listeners.get(type)?.delete(fn);
  }

  close(): void {
    this.closed = true;
    this.readyState = 2;
    for (const t of this.timers) clearTimeout(t);
    this.timers = [];
  }
}

let installed: { native: typeof EventSource | undefined; count: number } | null = null;

export interface MockTailOptions {
  /** URL prefix routed to the simulator. Default `mock-tail:`. */
  scheme?: string;
}

/**
 * Route `mock-tail:` URLs to the simulator and leave every other URL alone.
 *
 * Returns the uninstall, refcounted so nested consumers do not fight. Call it
 * on unmount: a story that swaps the global EventSource and never puts it back
 * breaks every other live surface on the page, which is a worse bug than an
 * empty pane.
 */
export function installMockTailSource(options: MockTailOptions = {}): () => void {
  const scheme = options.scheme ?? MOCK_TAIL_SCHEME;
  const Native = globalThis.EventSource;

  if (installed) {
    installed.count += 1;
  } else {
    installed = { native: Native, count: 1 };
    const Patched = function (this: unknown, url: string, init?: { withCredentials?: boolean }) {
      if (typeof url === 'string' && url.startsWith(scheme)) {
        return new MockTailSource(url, init) as unknown as EventSource;
      }
      if (typeof Native !== 'function') {
        throw new TypeError('EventSource is not available in this environment');
      }
      return new Native(url, init);
    } as unknown as typeof EventSource;
    // Carry the constants across; consumers compare against them.
    Object.assign(Patched, { CONNECTING: 0, OPEN: 1, CLOSED: 2 });
    globalThis.EventSource = Patched;
  }

  return () => {
    if (!installed) return;
    installed.count -= 1;
    if (installed.count > 0) return;
    if (installed.native) globalThis.EventSource = installed.native;
    else delete (globalThis as { EventSource?: unknown }).EventSource;
    installed = null;
  };
}
