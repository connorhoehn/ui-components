// Computer Lab against a fake fleet.
//
// A "computer" is one agent-runtime session — its own microVM with a
// persistent workspace. Computer Lab multiplexes a fleet of them the way tmux
// multiplexes terminals, for the shape of work the single-box view cannot
// express: ad-hoc and keyboard-driven, several boxes open, typing at whichever
// one has stopped.
//
// The client below is the whole backend. It behaves like a real one — tasks
// stream tool calls, boxes flip to `running` while they work and settle with a
// cost, and the idle deadline ticks down — so the status lines and the meters
// have something true to show without an account, a runtime or a network.
//
// Terminal panes are covered by `mockShell`, which stands in for the PTY at
// the WebSocket layer rather than at the client: the pane opens a real socket,
// speaks the real frame format and runs a real xterm. Only the box answering
// is invented.

import { useEffect, useMemo, useState } from 'react';
import {
  ComputeProvider,
  ComputerLab,
  fixtureComputers,
  fixtureModels,
  fixtureRuntimeStatus,
  type ComputeClient,
  type Computer,
  type StreamEvent,
} from '../../../../src/components/compute';
import { installMockShellSocket, mockShellUrl } from './mockShell';

/** Tool calls the fake agent walks through, in order, one per beat. */
const SCRIPT: Array<[string, Record<string, unknown>]> = [
  ['Read', { file_path: 'src/main.py' }],
  ['Grep', { pattern: 'def handler' }],
  ['Edit', { file_path: 'src/main.py' }],
  ['Bash', { command: 'pytest -q' }],
  ['Bash', { command: 'git commit -am "wire up the handler"' }],
];

function createDemoClient(): ComputeClient {
  let fleet: Computer[] = fixtureComputers.map((c) => ({ ...c }));
  let minted = 0;

  const patch = (sessionId: string, next: Partial<Computer>) => {
    fleet = fleet.map((c) => (c.sessionId === sessionId ? { ...c, ...next } : c));
  };
  const beat = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

  return {
    getStatus: async () => fixtureRuntimeStatus,

    listComputers: async () => {
      // Drain the deadline a little on every poll so the expiry meters move
      // while you watch. This is the one number that changes on its own.
      fleet = fleet.map((c) =>
        c.stopsInMs != null ? { ...c, stopsInMs: Math.max(0, c.stopsInMs - 5_000) } : c,
      );
      return fleet;
    },

    // `createComputer` takes an input object, not a bare label — the runtime
    // needs a project to charge the box to. Carry `projectId` through even
    // though this demo has no project rail: a fixture that drops a field is
    // how the surface stops matching the client it is standing in for.
    createComputer: async (input) => {
      minted += 1;
      const box: Computer = {
        id: `demo-new-${minted}`,
        label: input?.label ?? `demo-new-${minted}`,
        projectId: input?.projectId,
        // Sessions are ≥33 chars for real; the fixtures match so short-id
        // bugs cannot hide behind demo data.
        sessionId: `demo-session-new-${minted}-000000000000000000`.slice(0, 40),
        createdAt: new Date().toISOString(),
        status: 'idle',
        stopsInMs: 60 * 60_000,
      };
      fleet = [...fleet, box];
      return box;
    },

    adoptComputer: async () => {},

    renameComputer: async (id, label) => {
      fleet = fleet.map((c) => (c.id === id ? { ...c, label } : c));
    },

    removeComputer: async (id) => {
      fleet = fleet.filter((c) => c.id !== id);
    },

    stopSession: async (sessionId) => patch(sessionId, { status: 'stopped' }),

    runTask: async (sessionId, body, onEvent) => {
      const emit = (event: StreamEvent) => onEvent(event);
      patch(sessionId, { status: 'running', currentTask: body.prompt.slice(0, 60) });

      emit({ type: 'assistant', message: { content: [{ type: 'text', text: 'Reading the workspace…' }] } });
      for (const [name, input] of SCRIPT) {
        await beat(650);
        emit({ type: 'assistant', message: { content: [{ type: 'tool_use', name, input }] } });
      }
      await beat(450);
      emit({
        type: 'assistant',
        message: { content: [{ type: 'text', text: 'Tests pass and the change is committed.' }] },
      });

      const result = { subtype: 'success', turns: 7, durationMs: 4_400, costUsd: 0.0231 };
      emit({
        type: 'result',
        subtype: result.subtype,
        num_turns: result.turns,
        duration_ms: result.durationMs,
        total_cost_usd: result.costUsd,
      });
      patch(sessionId, { status: 'idle', currentTask: undefined, lastResult: result });
    },

    runCommand: async (_sessionId, body, onEvent) => {
      onEvent({ type: 'stdout', text: `$ ${body.command}\n(demo client — nothing really ran)\n` });
    },

    // A `mock-shell:` URL, which the installed socket simulates instead of
    // dialling. The terminal is a real xterm speaking the real frame format;
    // only the box on the other end is invented.
    getShellUrl: async (sessionId, shellId) => mockShellUrl(sessionId, shellId),

    tail: (id: string) => ({ url: `/demo/${id}/tail`, withCredentials: true, headers: {} }),
  };
}

export default function ComputerLabDemo() {
  // One client for the life of the page: it holds the fleet, so rebuilding it
  // on every render would reset every box mid-task.
  const client = useMemo(createDemoClient, []);
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  // Scoped to this page: the global WebSocket goes back the moment you
  // navigate away, so the collaboration and video demos keep their real one.
  useEffect(() => installMockShellSocket(), []);

  return (
    <ComputeProvider
      client={client}
      models={fixtureModels}
      canManage
      useFixtures={false}
      onNotify={(notice) =>
        setLog((prev) => [`${notice.title}${notice.detail ? ` — ${notice.detail}` : ''}`, ...prev].slice(0, 5))
      }
    >
      <div className="p-6 overflow-auto flex-[1] flex flex-col gap-5 max-w-3xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-text-primary m-0">Computer Lab</h1>
          <p className="text-[13px] text-text-secondary leading-relaxed m-0">
            A terminal multiplexer over a fleet of microVM developer boxes. Windows hold a
            tree of split panes, one pane has focus, and every pane carries a status line
            answering the questions you ask about a box you are <i>not</i> looking at —
            model, last cost, turns, and how long before it stops.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="self-start px-4 py-2 rounded-md bg-primary text-text-inverse text-[13px] font-semibold border-none cursor-pointer hover:opacity-90"
        >
          Open the computer lab
        </button>

        <div className="flex flex-col gap-2">
          <h2 className="text-[13px] font-semibold text-text-primary m-0">Keys</h2>
          <p className="text-[13px] text-text-secondary leading-relaxed m-0">
            Every command is the leader — <Key>⌃B</Key> — then one key. That is tmux&apos;s
            default, and for tmux&apos;s reason: <Key>⌃A</Key> is readline&apos;s
            beginning-of-line, and taking it from every shell in the lab is a bad trade.
          </p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 m-0 text-[13px]">
            <Row k="| or %" v="split right" />
            <Row k="- or &quot;" v="split down" />
            <Row k="← ↑ ↓ → / hjkl" v="move focus — computed from pane geometry, so it crosses split boundaries" />
            <Row k="z" v="zoom the focused pane" />
            <Row k="x" v="close the focused pane" />
            <Row k="e" v="next pane kind — kinds are a registry, so a host can add its own" />
            <Row k="c · n · p · 1–9" v="new window · next · previous · jump" />
            <Row k="w or /" v="fuzzy jump across on-screen panes and the rest of the fleet" />
            <Row k="s" v="broadcast — one instruction to every pane at once" />
            <Row k="? · d" v="key reference · leave" />
          </dl>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-[13px] font-semibold text-text-primary m-0">Pane kinds are a registry</h2>
          <p className="text-[13px] text-text-secondary leading-relaxed m-0">
            Two ship by default. A <b>shell</b> pane is a real terminal and is what a
            new pane opens as, because running commands is the point of the surface.
            It holds one of the runtime&apos;s ten shell slots, which is the meter in the
            top bar. A <b>tail</b> pane is read-only and free — it streams whatever is
            running on the box, including runs nobody in this browser started, which is
            the one thing a terminal cannot do. A host registers its own kinds alongside
            these — a run timeline, a workspace tree, a diff — and they get the same
            toggle order, quota accounting and broadcast plumbing. The terminals here are
            live: they attach to a simulated devbox rather than a real runtime, and
            everything above the wire is real.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-[13px] font-semibold text-text-primary m-0">Try the terminal</h2>
          <p className="text-[13px] text-text-secondary leading-relaxed m-0">
            Open the lab and type into a pane. There is no runtime behind it — a mock
            WebSocket answers the shell protocol — but the terminal itself is real: it
            echoes, it takes backspace, and it understands{' '}
            <code className="font-mono text-[12px]">help</code>,{' '}
            <code className="font-mono text-[12px]">ls</code>,{' '}
            <code className="font-mono text-[12px]">cat README.md</code>,{' '}
            <code className="font-mono text-[12px]">git status</code> and{' '}
            <code className="font-mono text-[12px]">claude &quot;fix the handler&quot;</code>.
          </p>
        </div>

        {log.length > 0 && (
          <div className="flex flex-col gap-1">
            <h2 className="text-[13px] font-semibold text-text-primary m-0">Notifications</h2>
            <ul className="list-none p-0 m-0 flex flex-col gap-1">
              {log.map((line, i) => (
                <li key={i} className="text-[12px] text-text-tertiary">· {line}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ComputerLab open={open} onClose={() => setOpen(false)} />
    </ComputeProvider>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface-panel font-mono text-[12px] text-text-primary">
      {children}
    </kbd>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt className="m-0 font-mono text-[12px] text-text-primary whitespace-nowrap">{k}</dt>
      <dd className="m-0 text-text-secondary">{v}</dd>
    </>
  );
}
