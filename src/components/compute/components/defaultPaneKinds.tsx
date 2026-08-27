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
  render: ({ computer, registerPane }) => <TailPane computer={computer} registerPane={registerPane} />,
};

export const DEFAULT_PANE_KINDS: readonly PaneKind[] = [SHELL_PANE_KIND, TAIL_PANE_KIND];

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
