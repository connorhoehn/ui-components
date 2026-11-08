// CommandOutputPane — a finished or running command's captured output.
//
// The read-only sibling of a shell tab: a LogStream titled with the command,
// a running indicator while it runs, the exit code once it has finished, and
// an "Open shell" action for when the answer is to go and look yourself.

import type { ReactNode } from 'react';
import { LogStream, type LogLine } from '../../shared/LogStream';
import { Button } from '../../ui/Button';
import Chip from '../../shared/Chip';
import { T } from '../../shared/Text';
import { cn } from '../../../lib/cn';

export interface CommandOutputPaneProps {
  /** The command that produced the output; shown as the title. */
  command: string;
  lines: LogLine[];
  /** True while the command is still running. */
  running?: boolean;
  /** Exit code of a finished run. Non-zero reads as a failure. */
  exitCode?: number;
  /** Renders an "Open shell" action when provided. */
  onOpenShell?: () => void;
  /** Identifies the pane in test ids: `command-output-<id>`. */
  id?: string;
  className?: string;
  'data-testid'?: string;
}

export function CommandOutputPane({
  command, lines, running = false, exitCode, onOpenShell, id,
  className, 'data-testid': testId = id ? `command-output-${id}` : 'command-output',
}: CommandOutputPaneProps) {
  let status: ReactNode = null;
  if (running) {
    status = <Chip tone="info" size="sm" data-testid={`${testId}-running`}>running</Chip>;
  } else if (exitCode !== undefined) {
    status = (
      <Chip tone={exitCode === 0 ? 'success' : 'danger'} size="sm" data-testid={`${testId}-exit`}>
        exit {exitCode}
      </Chip>
    );
  }

  const header = (
    <div className="flex items-center gap-2">
      <T size="xs" tone="tertiary">{lines.length} {lines.length === 1 ? 'line' : 'lines'}</T>
      {status}
      {onOpenShell && (
        <Button size="sm" variant="ghost" onClick={onOpenShell} data-testid={`${testId}-open-shell`}>
          Open shell
        </Button>
      )}
    </div>
  );

  return (
    <LogStream
      lines={lines}
      title={`$ ${command}`}
      headerSlot={header}
      showLevel={false}
      showSource={false}
      showTimestamp={false}
      follow={running}
      emptyMessage={running ? 'Waiting for output…' : 'No output.'}
      className={cn('min-h-0', className)}
      data-testid={testId}
    />
  );
}

export default CommandOutputPane;
