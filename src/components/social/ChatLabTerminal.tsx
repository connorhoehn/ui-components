// The Terminal tab of `ChatLabShell`, in its own chunk.
//
// `ShellTerminal` reads its transport from `ComputeContext`, because in the
// compute surface it is one pane of a fleet that shares a client. The lab has
// no fleet — it has exactly one box, and the host has already minted the
// presigned URL for it through its own `/shell-url` route. So this module
// stands up a provider whose client can answer precisely one question, with
// the network turned off so nothing polls a fleet API that isn't there.
//
// Split into its own file (and reached through `React.lazy`) so the compute
// provider, the pane registry and the compute fixtures stay out of the chat
// entry. xterm itself is an external peer and is never bundled either way.

import { useMemo } from 'react';
import { ComputeProvider } from '../compute/context/ComputeContext';
import { ShellTerminal } from '../compute/components/ShellTerminal';
import type { ComputeClient } from '../compute/lib/computeClient';

/**
 * A client that mints nothing and lists nothing.
 *
 * Every method but `getShellUrl` rejects rather than resolving empty: the lab
 * never calls them, and a silent empty answer would make a future caller's bug
 * look like an empty fleet instead of a wiring mistake.
 */
function labClient(shellUrl: string): ComputeClient {
  const unavailable = (what: string) => () =>
    Promise.reject(new Error(`${what} is not available from the chat lab`));
  return {
    getStatus: unavailable('Runtime status'),
    listComputers: unavailable('The fleet'),
    createComputer: unavailable('Creating a computer'),
    adoptComputer: unavailable('Adopting a computer'),
    renameComputer: unavailable('Renaming a computer'),
    removeComputer: unavailable('Removing a computer'),
    stopSession: unavailable('Stopping the session'),
    runTask: unavailable('Running a task'),
    runCommand: unavailable('Running a command'),
    getShellUrl: () => Promise.resolve({ url: shellUrl }),
    tail: () => ({ url: '', withCredentials: false, headers: {} }),
  };
}

export interface ChatLabTerminalProps {
  sessionId: string;
  /** Already minted by the host; the provider hands it straight to xterm. */
  shellUrl: string;
  className?: string;
  'data-testid'?: string;
}

export function ChatLabTerminal({
  sessionId,
  shellUrl,
  className,
  'data-testid': testId = 'chat-lab-terminal',
}: ChatLabTerminalProps) {
  // Memoised because `ComputeProvider` keys its effects on client identity: a
  // fresh object per render restarts them on every parent re-render, and the
  // lab's parent re-renders on every streamed event.
  const client = useMemo(() => labClient(shellUrl), [shellUrl]);
  return (
    <div data-testid={testId} className={className ?? 'flex min-h-0 flex-1 flex-col'}>
      <ComputeProvider client={client} enabled={false} useFixtures={false}>
        <ShellTerminal sessionId={sessionId} chrome={false} fillHeight autoConnect />
      </ComputeProvider>
    </div>
  );
}

export default ChatLabTerminal;
