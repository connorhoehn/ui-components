# Compute — `@connorhoehnslalom/ui-components/compute`

Surface for **microVM developer boxes** and a **tmux-shaped multiplexer** for
working across a fleet of them.

A *computer* is one agent-runtime session: its own microVM with a persistent
workspace. One at a time, a computer is a page. Several at a time, it is a
multiplexer — and that is what `ComputerLab` is for.

---

## Why the computer lab exists

The single-computer view answers "what is this box doing". It cannot answer
"what is everything doing", because that costs a navigation per box and the
answer is stale before you finish reading it.

Computer Lab is for the other shape of work: ad-hoc, keyboard-driven, not a queue
of predefined tasks. Six boxes open, four of them being read, typing at
whichever one has stopped. Split panes, a leader key, one pane focused, and a
status line under every pane answering the questions you ask about a box you
are *not* looking at.

The one thing tmux does not have to invent is **broadcast** — one instruction
to every pane at once. `synchronize-panes` for shells is the same idea as
sending a prompt to five agents, and it is the reason to be in this mode.

---

## Quick start

```tsx
import { ComputeProvider, ComputerLab } from '@connorhoehnslalom/ui-components/compute';

function Fleet() {
  const [labOpen, setLabOpen] = useState(false);

  return (
    <ComputeProvider
      clientOptions={{ baseUrl: '/api/devbox' }}
      canManage={can('ManageDevbox')}
      models={MODELS}
      onNotify={(notice) => toast(notice.tone, notice.title, notice.detail)}
    >
      <button onClick={() => setLabOpen(true)}>Open the lab</button>
      <ComputerLab open={labOpen} onClose={() => setLabOpen(false)} />
    </ComputeProvider>
  );
}
```

`ComputeProvider` owns the fleet, polls it, and hands every child the same
`ComputeClient`. Nothing below it fetches on its own, so two panes cannot
disagree about whether a box exists.

---

## Keys

Every command is the leader (**⌃B** by default, `leaderKey` to change it) then
one key — tmux's default, and for tmux's reason: ⌃A is readline's
beginning-of-line, and taking it from every shell in the lab is a bad trade.

| Key | Does |
|-----|------|
| `\|` `%` | split right |
| `-` `"` | split down |
| `←↑↓→` / `hjkl` | move focus |
| `o` | next pane (`⇧` for previous) |
| `z` | zoom the focused pane |
| `x` | close the focused pane |
| `e` | toggle the pane between agent and terminal |
| `c` | new window |
| `n` / `p` | next / previous window |
| `1`–`9` | jump to a window |
| `w` `/` | fuzzy jump to a computer or pane |
| `s` | toggle broadcast to all panes |
| `:` | focus the command line |
| `?` | key reference |
| `d` | leave the computer lab |

Directional movement is computed from pane **geometry**, not tree structure —
"the pane to my right" is often a cousin several levels up, and a sibling-only
implementation gets that wrong.

---

## Pane kinds are a registry, not an enumeration

What a pane can be is open. Two kinds ship by default:

| Kind | Cost | Use |
|------|------|-----|
| `shell` | **one PTY slot of eight** | the default — a real terminal, which is the point |
| `tail` | free — an SSE stream | watch a run, including one started elsewhere |

A runtime allows ten concurrent shells; `MAX_SHELLS` stops at eight, and the
top bar meters the budget. Asking for a ninth is refused with a sentence
rather than failing later as an opaque WebSocket close code.

There is deliberately **no third thing that takes typed input**. An earlier
version had a pane with its own prompt box, which taught you that Enter means
newline and rebuilt a shell badly; input belongs in a terminal, and the tail
pane is read-only precisely so the distinction stays honest.

**Register your own.** A host with a run timeline, a workspace tree, a diff or
a metrics strip adds it as a first-class kind — same toggle order, same quota
accounting, same broadcast plumbing:

```tsx
import { DEFAULT_PANE_KINDS, type PaneKind } from '@connorhoehnslalom/ui-components/compute';

const timelineKind: PaneKind = {
  id: 'run-timeline',
  label: 'timeline',
  description: 'Tail the run this box is executing.',
  render: ({ computer }) => <RunTimeline boxId={computer.id} />,
};

<ComputeProvider paneKinds={[timelineKind, ...DEFAULT_PANE_KINDS]} …>
```

Order is the toggle order and the first entry is the default kind for a new
pane. A kind declaring `quota: 'shell'` is metered and refused like the
built-in terminal. `inputSuffix` is how broadcast reaches it correctly — a PTY
needs the trailing newline, an agent prompt must not have one.

Kind ids are persisted in the saved layout; an id the current registry no
longer knows falls back to the first kind rather than rendering a blank pane.

---

## Exports

### Components

| Export | Description |
|--------|-------------|
| `ComputerLab` | The multiplexer: rail, windows, split panes, broadcast, leader key |
| `LabRail` | The two-section fleet rail (`computers` over `agents`) |
| `LabChooser` | Fuzzy jump across on-screen panes and the rest of the fleet |
| `PaneTreeView` | Renders a `PaneNode` tree with draggable, keyboard-nudgeable dividers |
| `PaneStatusLine` | Per-pane status line: model, cost, turns, expiry meter, mode |
| `ShellTerminal` | xterm.js over a presigned WebSocket, speaking the runtime shell protocol |
| `AgentPane` | Streaming agent view with its own instruction composer |

### Provider and client

| Export | Description |
|--------|-------------|
| `ComputeProvider` / `useCompute` | Fleet, runtime status, models, capability, pane kinds, notifications |
| `createComputeClient` | Reference `ComputeClient` over the devbox routes |

Bring your own transport by passing `client` instead of `clientOptions` — the
`ComputeClient` interface is the only thing the components depend on.

Two things about that interface are worth knowing before you implement it:

- **`tail(boxId)` returns a target, not a URL.** `EventSource` cannot send
  headers, so a host authenticating with `headers` would get a 401 on tail
  while every other route worked. The returned `withCredentials` and `headers`
  say which mode is actually available.
- **`runCommand` takes `mode: 'safe' | 'full'`.** Safe mode runs only
  allowlisted commands with no shell metacharacters — which means
  `WORKSPACE_FIND_COMMAND` and `WORKSPACE_GIT_COMMAND` both require `'full'`,
  and a deployment can disable full mode entirely. Handle the 400.

### Storage

`COMPUTE_STORAGE_KEYS` enumerates every `localStorage` key this module owns,
and `clearComputeStorage()` clears them. Use these for a tenant or account
switch rather than hardcoding the strings, which drift the moment a key is
renamed here.

### Hooks

| Export | Description |
|--------|-------------|
| `useComputeFleet` | Server-owned fleet with a localStorage mirror and re-adoption |
| `useComputeTask` | Runs a task, reduces the raw stream to renderable steps |
| `useLabLayout` | Windows and pane trees, persisted |

### Pane tree

`makeLeaf` · `splitPane` · `closePane` · `setRatio` · `updateLeaf` ·
`listLeaves` · `layoutRects` · `neighborPane` · `cyclePane` ·
`enclosingSplit` — pure functions over `PaneNode`, all tested.

### Shell protocol

`SHELL_CHANNEL` · `encodeFrame` · `encodeResize` · `closeAdvice` ·
`exhaustedAdvice` · `exitCodeOf` — the browser-side implementation of the
runtime's `v5.channel.k8s.io` framing.

### Dock store

`subscribeDock` · `getDock` · `openShell` · `closeShell` · `focusShell` ·
`reportShellStatus` · `reconcileDock` — a `useSyncExternalStore` store for a
persistent terminal dock that survives navigation.

---

## Peer dependencies

`@xterm/xterm` and `@xterm/addon-fit` are **optional** peers. They are needed
only by `ShellTerminal` (and so by any `shell` pane). Everything else — the
lab with tail panes, the rail, the chooser, the pane tree — works without them
installed.

---

## Fixtures

`fixtureComputers` · `fixtureRuntimeStatus` · `fixtureModels` ·
`fixtureWorkspace`. Labelled `demo-*` on purpose: a screenshot of sample data
must never be mistakable for a live fleet. `ComputeProvider` reports
`source === 'fixture'` whenever the data on screen is synthetic — surface it.
