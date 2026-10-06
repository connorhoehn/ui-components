// The two pane kinds that ship in the box.
//
// They are ordinary registry entries, not special cases — which is the point.
// A host that wants its own run timeline, a workspace tree or a diff view
// registers alongside these, or replaces the list entirely, and the lab
// treats every kind the same way: same toggle order, same quota accounting,
// same broadcast plumbing.
//
// Terminal is FIRST, and therefore the default for a new pane. This surface
// exists to run commands in a microVM — or to reach further, into a bastion
// or a cluster, from inside one — and a real PTY is the only honest way to
// offer that. The read-only tail is the thing a terminal genuinely cannot
// do: watch a run nobody in this browser started.

import { TailPane } from './TailPane';
import { AgentPane, LogsPane } from './WorkspacePanes';
import { BotIcon, DesktopIcon, DocumentIcon, ActivityIcon } from '../../ui/Icons';
import { isLocalComputer } from '../lib/fleetSummary';
import { ShellTerminal, type ShellTerminalHandle } from './ShellTerminal';
import { useEffect, useRef } from 'react';
import type { PaneKind, PaneKindContext } from '../lib/paneKinds';

/**
 * A real terminal. Costs one of the runtime's ten shell slots, which is why
 * the lab meters them and refuses the ninth.
 */
export const SHELL_PANE_KIND: PaneKind = {
  id: 'shell',
  label: 'shell',
  description: 'A real terminal on this computer.',
  quota: 'shell',
  // Without the newline the text sits at the prompt un-submitted, which looks
  // exactly like nothing happened. This is what makes broadcast work: one
  // instruction typed once, entered in every pane.
  inputSuffix: '\n',
  statusMode: 'pty',
  icon: <DesktopIcon size={14} />,
  title: 'Shell',
  // A paired laptop has no PTY to attach to — see `Computer.kind`.
  appliesTo: (computer) => !isLocalComputer(computer),
  render: (context) => <ShellPaneKind {...context} />,
};

/**
 * Read-only stream of whatever is running on the box. Free — it is an SSE
 * tail — so a window full of these costs nothing and watches everything.
 */
export const TAIL_PANE_KIND: PaneKind = {
  id: 'tail',
  label: 'tail',
  description: 'Watch what is running here, including runs started elsewhere. Costs no shell slot.',
  statusMode: 'read-only',
  icon: <ActivityIcon size={14} />,
  title: 'Activity',
  render: ({ computer, registerPane }) => <TailPane computer={computer} registerPane={registerPane} />,
};

/**
 * The box's output as timestamped log lines — follow or pause, filter by
 * source, search, live byte rate. Free: it reads the same tail stream.
 */
export const LOGS_PANE_KIND: PaneKind = {
  id: 'logs',
  label: 'logs',
  title: 'Bot logs',
  description: 'Follow this computer’s output as log lines. Pause, filter and search. Costs no shell slot.',
  statusMode: 'read-only',
  icon: <DocumentIcon size={14} />,
  render: ({ computer, registerPane }) => <LogsPane computer={computer} registerPane={registerPane} />,
};

/**
 * The agent's current run as a checklist — done, in flight, elapsed. Free:
 * it reads the same tail stream.
 */
export const AGENT_PANE_KIND: PaneKind = {
  id: 'agent',
  label: 'agent',
  title: 'Agent',
  description: 'Watch the agent’s current run step by step. Costs no shell slot.',
  statusMode: 'watching',
  icon: <BotIcon size={14} />,
  render: ({ computer, registerPane }) => <AgentPane computer={computer} registerPane={registerPane} />,
};

/**
 * Terminal first (the default for a new pane), then the classic activity tail,
 * then the workspace lab's two readings of the same stream. Appended rather
 * than reordered so a saved layout and the toggle's first step are unchanged.
 */
export const DEFAULT_PANE_KINDS: readonly PaneKind[] = [SHELL_PANE_KIND, TAIL_PANE_KIND, LOGS_PANE_KIND, AGENT_PANE_KIND];

function ShellPaneKind({ computer, paneId, registerPane }: PaneKindContext) {
  const ref = useRef<ShellTerminalHandle>(null);
  useEffect(() => {
    registerPane({
      send: (text) => ref.current?.send(text) ?? false,
      focus: () => ref.current?.focus(),
    });
    return () => registerPane(null);
  }, [registerPane]);
  return (
    <ShellTerminal
      ref={ref}
      sessionId={computer.sessionId}
      // The pane id doubles as the shell id so a reload reattaches to the
      // same PTY rather than spending another slot on a duplicate.
      shellId={paneId}
      label={computer.label}
      chrome={false}
      fillHeight
      autoConnect
    />
  );
}
