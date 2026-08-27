// The two pane kinds that ship in the box.
//
// They are ordinary registry entries, not special cases — which is the point.
// A host that wants its own run timeline, a workspace tree or a diff view
// registers alongside these, or replaces the list entirely, and the
// multiplexer treats every kind the same way: same toggle order, same quota
// accounting, same broadcast plumbing.

import { useEffect, useRef } from 'react';
import { AgentPane, type AgentPaneHandle } from './AgentPane';
import { ShellTerminal, type ShellTerminalHandle } from './ShellTerminal';
import type { PaneKind, PaneKindContext } from '../lib/paneKinds';

/**
 * Agent pane: an SSE stream and a prompt. Free to keep open, which is why it
 * is first and therefore the default kind for a new pane.
 */
export const AGENT_PANE_KIND: PaneKind = {
  id: 'agent',
  label: 'agent',
  description: 'Stream the agent and type instructions. Costs no shell slot.',
  statusMode: 'resume on',
  render: (context) => <AgentPaneKind {...context} />,
};

/**
 * Terminal pane: a real PTY, and one of the runtime's ten shell slots. The
 * `quota` tag is what makes the multiplexer meter it and refuse the ninth.
 */
export const SHELL_PANE_KIND: PaneKind = {
  id: 'shell',
  label: 'pty',
  description: 'Open a real terminal. Holds one of the runtime’s shell slots.',
  quota: 'shell',
  // Without the newline the text sits at the prompt un-submitted, which looks
  // exactly like nothing happened.
  inputSuffix: '\n',
  statusMode: 'pty',
  render: (context) => <ShellPaneKind {...context} />,
};

export const DEFAULT_PANE_KINDS: readonly PaneKind[] = [AGENT_PANE_KIND, SHELL_PANE_KIND];

function AgentPaneKind({ computer, registerInput, onSettled }: PaneKindContext) {
  const ref = useRef<AgentPaneHandle>(null);
  useEffect(() => {
    registerInput((text) => ref.current?.send(text) ?? false);
    return () => registerInput(null);
  }, [registerInput]);
  return <AgentPane ref={ref} computer={computer} onSettled={onSettled} />;
}

function ShellPaneKind({ computer, paneId, registerInput }: PaneKindContext) {
  const ref = useRef<ShellTerminalHandle>(null);
  useEffect(() => {
    registerInput((text) => ref.current?.send(text) ?? false);
    return () => registerInput(null);
  }, [registerInput]);
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
