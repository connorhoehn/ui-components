import { afterEach, describe, expect, it } from 'vitest';
import { waitFor } from '@testing-library/react';
import { installMockShellSocket, mockShellUrl } from '../fixtures/mockShell';
import { SHELL_CHANNEL } from '../lib/shellProtocol';

// The demo session the workspace lab opens on: `ls`, `ls logs`, and
// `tail -n 5 logs/agent.log` have to answer like a box an agent worked in.

let uninstall: (() => void) | null = null;
afterEach(() => { uninstall?.(); uninstall = null; });

function open() {
  uninstall = installMockShellSocket();
  const socket = new WebSocket(mockShellUrl('sess-demo', `t-${Math.random()}`).url);
  socket.binaryType = 'arraybuffer';
  let out = '';
  const decoder = new TextDecoder();
  socket.onmessage = (e: MessageEvent) => {
    const bytes = new Uint8Array(e.data as ArrayBuffer);
    if (bytes[0] === SHELL_CHANNEL.STDOUT || bytes[0] === SHELL_CHANNEL.STDERR) {
      out += decoder.decode(bytes.subarray(1)).replace(/\x1b\[[0-9;]*m/g, '');
    }
  };
  const type = (line: string) => {
    const body = new TextEncoder().encode(`${line}\r`);
    const frame = new Uint8Array(body.length + 1);
    frame[0] = SHELL_CHANNEL.STDIN;
    frame.set(body, 1);
    socket.send(frame);
  };
  return { socket, type, output: () => out };
}

describe('mock shell — the agent workspace', () => {
  it('lists logs and tests beside the source', async () => {
    const shell = open();
    await waitFor(() => expect(shell.socket.readyState).toBe(1));
    shell.type('ls');
    await waitFor(() => expect(shell.output()).toMatch(/README\.md\s+src\s+tests\s+logs/));
    shell.type('ls logs');
    await waitFor(() => expect(shell.output()).toContain('agent.log  tools.log  runtime.log'));
  });

  it('tails the agent log', async () => {
    const shell = open();
    await waitFor(() => expect(shell.socket.readyState).toBe(1));
    shell.type('tail -n 2 logs/agent.log');
    await waitFor(() => expect(shell.output()).toContain('run_tests pytest -q'));
    expect(shell.output()).toContain('turn complete');
    expect(shell.output()).not.toContain('session resumed');
    shell.type('head -1 logs/runtime.log');
    await waitFor(() => expect(shell.output()).toContain('microVM up'));
    shell.type('tail logs');
    await waitFor(() => expect(shell.output()).toContain('Is a directory'));
  });
});
