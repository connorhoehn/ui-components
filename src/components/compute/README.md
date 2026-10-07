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
whichever one has stopped. Split panes, one focused, plain keyboard chords, and
a status line under every pane answering the questions you ask about a box you
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

Plain chords, no prefix — a leader is only worth learning if you already know
tmux, so it is opt-in rather than the default. `keymap` overrides any binding.

**⌘T, ⌘N and ⌘W are unavailable at any price**: the browser keeps those for its
own tabs and windows and never forwards them to a page. The defaults are chosen
from what actually reaches us.

| Chord | Does | With a leader |
|-------|------|---------------|
| `⌘⇧←` `⌘⇧→` `⌘⇧↑` `⌘⇧↓` | move focus between panes | `h` `l` `k` `j` |
| `⌘⏎` | new pane beside this one | `\|` |
| `⌘⇧⏎` | new pane below this one | `-` |
| `⌘⌫` | close the focused pane | `x` |
| `⌘⇧F` | zoom the focused pane | `z` |
| `⌘⇧E` | next pane kind (shell, tail, …) | `e` |
| `⌘K` | fuzzy jump to a computer or pane | `w` |
| `⌘⇧L` | jump to the prompt bar | `:` |
| `⇧esc` | leave the focused pane for the prompt bar — the keyboard way out of a terminal, which eats Tab and Escape | `q` |
| `⌘⇧B` | broadcast the prompt to every pane | `s` |
| `⌘/` | show these shortcuts | `?` |
| `esc` | leave the lab | `d` |

### The optional leader

A tmux-style prefix is genuinely good *once you know tmux*: one modifier
instead of three, no collision with anything the browser or the shell wants,
and it scales past the number of free chords. It is only bad as a default,
because nothing about it is guessable.

So both models exist and neither is privileged. Pass `leader={TMUX_LEADER}`
(or your own `LeaderConfig`) and the right-hand column above becomes live
*alongside* the chords — turning it on takes nothing away. The shortcut sheet
is generated from the live keymap, so it always shows what the keys actually
do rather than what a hand-written table once claimed.

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

A kind publishes a `PaneHandle` through `registerPane`, in an effect, and
withdraws it on cleanup:

```tsx
render: ({ computer, registerPane }) => {
  const ref = useRef<MyPaneHandle>(null);
  useEffect(() => {
    registerPane({ send: (t) => ref.current?.type(t) ?? false, focus: () => ref.current?.focus() });
    return () => registerPane(null);
  }, [registerPane]);
  return <MyPane ref={ref} computer={computer} />;
}
```

Both fields are optional. `send` makes the pane a broadcast target; a
read-only pane omits it. **`focus` is what moves the keyboard when the active
pane changes** — without it the border repaints and the cursor stays put, so
every keyboard move has to be finished with a mouse click.

Kind ids are persisted in the saved layout; an id the current registry no
longer knows falls back to the first kind rather than rendering a blank pane.

---

## The workspace appearance

`<ComputerLab appearance="workspace" />` is the same multiplexer — keyboard,
saved layout, pane kinds, quota — under host-themed chrome:

- **Header**: optional `title`, "18 computers · 12 agents", the fleet's own
  status pills (needs you / running / error — counted by `summarizeFleet`,
  and each one filters the rail), **+ Computer** (provision; only with
  `canManage`) and **Keys** (the shortcut sheet). `headerActions` appends.
- **Rail** (`LabFleetRail`): Computers / Agents tabs, a search, a status
  filter, project groups headed "6 computers · $0.46 / $95 · 5 bots"
  (`groupQuickLine`), numbered rows whose number is stable across tabs, and a
  laptop glyph for `Computer.kind === 'local'`. ⌘/Ctrl-click selects a row
  as an instruction target.
- **Panes** (`WorkspacePane`): a kind menu, the computer and a status badge,
  one meta line (`PaneStatusLine variant="meta"`), expand / ⋯ / close. The
  toolbar (`LabPaneToolbar`) has "N panes ▾", +, "1 / 8 shells", arrange as a
  list or a split (`arrangePanes`), and expand.
- **Instruction bar**: Nudge (an instruction for each computer's agent) or
  Type (keystrokes into the panes open on them), aimed at the focused pane,
  the selection, or all computers. Nudge goes through `onInstruct` when the
  host gives one, else as a resumed `runTask` on each targeted microVM.

Two more built-in kinds read the same tail stream: `LOGS_PANE_KIND` ("Bot
logs" — follow/pause, source filter, search, live byte rate) and
`AGENT_PANE_KIND` (the current run as a checklist). The Agent pane draws the
latest `TodoWrite` as the run's plan above its steps (a later one replaces
it), a `gate_refused` frame as "Held at the <gate> gate" with the flag that
clears it, and a `delivery` frame as "Change posted for review" with the
short sha and a PR link. On a `waiting` box it shows the agent's question
with an inline reply that takes the Nudge route (`onInstruct`, scope
`focused`, inside a lab; a resumed `runTask` otherwise — `LabInstructContext`).
The `provisioning` status (minted, microVM not up) sorts between running and
idle, is counted in `summarizeFleet().provisioning` and gets a header pill
while above zero. Unknown frame types are ignored. A kind may declare
`appliesTo(computer)`; `SHELL_PANE_KIND` refuses laptops, so a new pane on one
lands on the first kind that applies (`defaultKindFor`), and the kind menu
and toggle skip it.

```tsx
import { ComputerLab } from '@connorhoehnslalom/ui-components/compute';

<ComputerLab open variant="inline" appearance="workspace" title={null} onClose={() => {}} />
```

## Exports

### Components

| Export | Description |
|--------|-------------|
| `ComputerLab` | The multiplexer: rail, windows, split panes, broadcast, keyboard |
| `LabRail` | The two-section fleet rail (`computers` over `agents`) |
| `LabChooser` | Fuzzy jump across on-screen panes and the rest of the fleet |
| `PaneTreeView` | Renders a `PaneNode` tree with draggable, keyboard-nudgeable dividers |
| `PaneStatusLine` | Per-pane status line: model, cost, turns, expiry meter, mode |
| `ShellTerminal` | xterm.js over a presigned WebSocket, speaking the runtime shell protocol |
| `TailPane` | Read-only stream of what is running on a box. Costs no shell slot |
| `MachinePresenceMenu` | Top-nav chip + panel for the user's own machines: live local sessions, model provider, context, memory-sync state. Renders null with no machines |

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

### Mounting the provider in an app shell

`ComputeProvider` polls the fleet on a timer. A deployment is very likely to
gate the whole compute API on one capability — the reference backend gates
every route on `ManageDevbox` — so a provider mounted high in an app shell
generates a 403 every few seconds for every user who lacks it, plus one status
call per mount. That is invisible in development, where you are always
authorized, and obvious in production.

Pass `enabled` to close it:

```tsx
<ComputeProvider enabled={canManage} canManage={canManage} …>
```

Disabled, it fetches nothing and reports an empty fleet, so the surface still
mounts and renders its own empty state rather than throwing.

### Projects as cost centres

A computer created without a project is an anonymous charge against the
account, which is what cost-centre tracking exists to avoid. So
`createComputer` takes `{ label?, projectId? }`, and a client may implement
`listProjects()`:

```tsx
<ComputeProvider projects={projects} …>   // or let the client fetch them
```

`useCompute().projects` returns `ProjectRollup[]` — each project joined to its
live boxes, with `activeCount`, `soonestExpiryMs`, `liveSpendUsd` and
`liveTokens`. `ProjectSummary` renders that as one line: spend against budget,
tokens, bots, how many boxes are running, and when the first one reaps itself.

Three deliberate choices:

- **The budget lives on the project, not the box.** Computers are provisioned
  and reaped constantly; a budget that died with the box would be useless.
- **Dollars and tokens sit side by side** because they answer different
  questions. Dollars are the budget. Tokens are what runs out inside a single
  long run, and a project can be well under budget while a box is about to hit
  a ceiling.
- **Unassigned boxes get their own bucket** rather than being hidden. A box
  with no cost centre still costs money, and hiding it is how a fleet grows an
  untracked tail.

`maintenanceUsd` is the recurring floor an allocation must clear before any new
work fits inside it. The meter notes it as a share, because "90% spent" reads
very differently when most of it is upkeep nobody chose this month.

`listProjects` is optional. A deployment without it gets `projectsAbsent`, and
surfaces should group by computer rather than render an empty rail.

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
