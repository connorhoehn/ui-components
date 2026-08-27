// A shell behind the terminal, with no runtime behind the shell.
//
// `ShellTerminal` is deliberately dumb: it mints a URL, opens a WebSocket and
// pushes bytes. That is the right shape for production and a dead pane
// everywhere else — with nothing to attach to, every terminal in the demo and
// in Storybook renders an error strip, so the most interesting surface in the
// module is the one nobody can look at.
//
// This is the missing half. It speaks the AgentCore shell protocol back at the
// component and simulates a devbox behind it: a PTY that echoes, a prompt, a
// `/mnt/workspace` tree, and an agent run that takes a beat to finish. It
// lives next to the fixtures because that is what it is — sample data with a
// wire protocol on top — and a host wiring up its own demo needs it too.
//
// The command set is deliberately small and deliberately NOT a Unix box: this
// product is an agent shell in a microVM workspace, so `claude` and `git` are
// first-class and `awk` is not there at all.

import { SHELL_CHANNEL } from '../lib/shellProtocol';

/** URLs with this scheme are simulated; everything else is dialled for real. */
export const MOCK_SHELL_SCHEME = 'mock-shell:';

const WORKSPACE = '/mnt/workspace';
const USER = 'bedrock_agentcore';

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  clear: '\x1b[2J\x1b[H',
} as const;

/** Trailing `/` marks a directory — the same shorthand `ls -F` uses. */
const DIRS: Record<string, readonly string[]> = {
  [WORKSPACE]: ['.git/', 'README.md', 'src/'],
  [`${WORKSPACE}/src`]: ['main.py'],
  [`${WORKSPACE}/.git`]: ['HEAD', 'config', 'objects/', 'refs/'],
};

const FILES: Record<string, string> = {
  [`${WORKSPACE}/README.md`]: [
    '# workspace',
    '',
    'One agent computer: a Firecracker microVM with this directory',
    'mounted persistently. Everything under /mnt/workspace survives a',
    'session stop; everything outside it does not.',
    '',
    'Treat it as a cache, not a durable store — a runtime version update',
    'wipes it.',
  ].join('\n'),
  [`${WORKSPACE}/src/main.py`]: [
    '"""Ingest entrypoint the agent has been editing."""',
    '',
    '',
    'def handler(event, context):',
    '    body = event.get("body") or {}',
    '    return {"statusCode": 200, "body": body}',
  ].join('\n'),
  [`${WORKSPACE}/.git/HEAD`]: 'ref: refs/heads/main',
  [`${WORKSPACE}/.git/config`]: [
    '[core]',
    '\trepositoryformatversion = 0',
    '[remote "origin"]',
    '\turl = git@github.com:acme/ingest.git',
  ].join('\n'),
};

/** One agent turn, as `claude` prints it: tool, then what the tool did. */
const AGENT_RUN: ReadonlyArray<readonly [string, string]> = [
  ['Read', 'src/main.py'],
  ['Grep', '"def handler" (1 file)'],
  ['Edit', 'src/main.py · +1 -1'],
  ['Bash', 'pytest -q → 4 passed in 0.62s'],
];

const HELP = [
  'This box understands:',
  '',
  '  help                  this list',
  '  ls [path]             list the workspace',
  '  pwd                   where you are',
  '  cd <path>             move',
  '  cat <file>            print a file',
  '  git status            what changed',
  '  git log --oneline     recent commits',
  '  claude "<prompt>"     run an agent turn here',
  '  clear                 clear the screen',
  '  exit                  end the shell',
];

/**
 * Per-shell state, keyed by shell id and outliving the socket.
 *
 * A real PTY survives a detach — that is the whole point of the reattach
 * button — so the simulation has to survive one too, or reconnecting would
 * silently drop you back in the home directory and the `reattached` note in
 * the pane header would be a lie.
 */
interface ShellSession {
  cwd: string;
  attached: boolean;
}
const SESSIONS = new Map<string, ShellSession>();

/**
 * Build the value a mock `getShellUrl` should resolve to.
 *
 * The shell id rides in the query because `ShellTerminal` puts it nowhere
 * else: it hands the id to the client and then opens whatever URL comes back,
 * so this is the only channel through which the simulator can learn which
 * shell it is meant to be.
 */
export function mockShellUrl(sessionId: string, shellId?: string): { url: string; shellId: string } {
  const id = shellId ?? `mock-${Math.random().toString(36).slice(2, 8)}`;
  return { url: `${MOCK_SHELL_SCHEME}//${sessionId}?shell=${encodeURIComponent(id)}`, shellId: id };
}

function tokenize(line: string): string[] {
  const out: string[] = [];
  const pattern = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let match = pattern.exec(line);
  while (match) {
    out.push(match[1] ?? match[2] ?? match[3] ?? '');
    match = pattern.exec(line);
  }
  return out;
}

function resolvePath(cwd: string, raw: string): string {
  const expanded = raw === '~' ? WORKSPACE : raw.startsWith('~/') ? `${WORKSPACE}/${raw.slice(2)}` : raw;
  const base = expanded.startsWith('/') ? '' : cwd;
  const out: string[] = [];
  for (const part of `${base}/${expanded}`.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') {
      out.pop();
      continue;
    }
    out.push(part);
  }
  return `/${out.join('/')}`;
}

function colorEntry(entry: string): string {
  return entry.endsWith('/')
    ? `${ANSI.bold}${ANSI.blue}${entry.slice(0, -1)}${ANSI.reset}`
    : entry;
}

class SimulatedShellSocket extends EventTarget {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;

  readonly CONNECTING = 0;
  readonly OPEN = 1;
  readonly CLOSING = 2;
  readonly CLOSED = 3;

  readonly url: string;
  readonly protocol = '';
  readonly extensions = '';
  readonly bufferedAmount = 0;
  binaryType: 'blob' | 'arraybuffer' = 'blob';
  readyState = 0;

  onopen: ((ev: Event) => unknown) | null = null;
  onclose: ((ev: Event) => unknown) | null = null;
  onerror: ((ev: Event) => unknown) | null = null;
  onmessage: ((ev: MessageEvent) => unknown) | null = null;

  private readonly shellId: string;
  private readonly session: ShellSession;
  private readonly encoder = new TextEncoder();
  private readonly decoder = new TextDecoder();
  private readonly timers = new Set<ReturnType<typeof setTimeout>>();

  /** Characters typed since the last Enter. The PTY owns the line, not xterm. */
  private line = '';
  /** True while a command is running, so keystrokes land nowhere but Ctrl-C. */
  private busy = false;
  private cancelled = false;

  constructor(url: string) {
    super();
    this.url = url;
    const mark = url.indexOf('?');
    this.shellId = new URLSearchParams(mark < 0 ? '' : url.slice(mark + 1)).get('shell') ?? 'mock-shell';
    this.session = SESSIONS.get(this.shellId) ?? { cwd: WORKSPACE, attached: false };
    SESSIONS.set(this.shellId, this.session);

    // A real upgrade is never instant, and a socket that opens synchronously
    // would fire `onopen` before the caller has assigned it.
    this.later(() => this.handshake(), 60);
  }

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    if (this.readyState !== this.OPEN) return;
    const bytes = toBytes(data);
    if (!bytes || bytes.length === 0) return;

    const channel = bytes[0];
    if (channel === SHELL_CHANNEL.CLOSE) {
      this.exit(0);
      return;
    }
    // RESIZE and HEARTBEAT are accepted and ignored: nothing here reflows, and
    // dropping them silently is exactly what a healthy server looks like.
    if (channel !== SHELL_CHANNEL.STDIN) return;
    this.feed(this.decoder.decode(bytes.subarray(1)));
  }

  close(code = 1000, reason = ''): void {
    if (this.readyState === this.CLOSED) return;
    this.readyState = this.CLOSED;
    for (const timer of this.timers) clearTimeout(timer);
    this.timers.clear();
    this.cancelled = true;
    // Asynchronously, because a real socket never calls `onclose` from inside
    // `close()` and callers unwind assuming that.
    setTimeout(() => {
      const event = new CloseEvent('close', { code, reason, wasClean: true });
      this.onclose?.(event);
      this.dispatchEvent(event);
    }, 0);
  }

  // ── wire ────────────────────────────────────────────────────────────────

  private handshake(): void {
    this.readyState = this.OPEN;
    // Status, banner and prompt go out BEFORE the open event so that anything
    // the caller writes from `onopen` — a `cd` to land in the workspace — is
    // echoed after the prompt rather than above the banner.
    this.frame(SHELL_CHANNEL.STATUS, JSON.stringify({
      metadata: { shellId: this.shellId, reconnected: this.session.attached },
    }));
    this.write(
      this.session.attached
        ? `${ANSI.dim}reattached to ${this.shellId}${ANSI.reset}\r\n`
        : [
            `${ANSI.green}AgentCore devbox${ANSI.reset} ${ANSI.dim}· simulated shell, no runtime attached${ANSI.reset}`,
            `${ANSI.dim}Type ${ANSI.reset}help${ANSI.dim} for what this box understands.${ANSI.reset}`,
            '',
          ].join('\r\n'),
    );
    this.session.attached = true;
    this.prompt();

    const event = new Event('open');
    this.onopen?.(event);
    this.dispatchEvent(event);
  }

  private frame(channel: number, text: string): void {
    if (this.readyState !== this.OPEN) return;
    const body = this.encoder.encode(text);
    const payload = new Uint8Array(body.length + 1);
    payload[0] = channel;
    payload.set(body, 1);
    const event = new MessageEvent('message', { data: payload.buffer });
    this.onmessage?.(event);
    this.dispatchEvent(event);
  }

  private write(text: string): void {
    this.frame(SHELL_CHANNEL.STDOUT, text);
  }

  private fail(text: string): void {
    this.frame(SHELL_CHANNEL.STDERR, `${ANSI.red}${text}${ANSI.reset}\r\n`);
  }

  private prompt(): void {
    this.write(`${ANSI.green}${USER}${ANSI.reset}:${ANSI.bold}${ANSI.blue}${this.session.cwd}${ANSI.reset}$ `);
  }

  private later(run: () => void, ms: number): void {
    const timer = setTimeout(() => {
      this.timers.delete(timer);
      run();
    }, ms);
    this.timers.add(timer);
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => this.later(resolve, ms));
  }

  private exit(code: number): void {
    this.frame(SHELL_CHANNEL.STATUS, JSON.stringify({
      details: { causes: [{ reason: 'ExitCode', message: String(code) }] },
    }));
    SESSIONS.delete(this.shellId);
    this.close(1000, 'shell exited');
  }

  // ── line discipline ─────────────────────────────────────────────────────

  private feed(input: string): void {
    for (let i = 0; i < input.length; i += 1) {
      const char = input[i];
      // Arrow keys and the rest of the escape soup arrive as several bytes and
      // would print as mojibake. Swallow the whole sequence, not just the ESC;
      // history editing is not what this simulation is for.
      if (char === '\x1b') {
        while (i + 1 < input.length && !/[a-zA-Z~]/.test(input[i + 1])) i += 1;
        i += 1;
        continue;
      }
      if (char === '\x03') {
        this.write('^C\r\n');
        this.cancelled = true;
        this.line = '';
        if (!this.busy) this.prompt();
        continue;
      }
      if (this.busy) continue;

      if (char === '\r' || char === '\n') {
        this.write('\r\n');
        const line = this.line;
        this.line = '';
        void this.run(line);
        continue;
      }
      if (char === '\x7f') {
        // Backspace only means "erase" if the shell says so — xterm just draws
        // the byte it is given, so the erase is three characters, not one.
        if (this.line.length > 0) {
          this.line = this.line.slice(0, -1);
          this.write('\b \b');
        }
        continue;
      }
      if (char === '\x0c') {
        this.write(ANSI.clear);
        this.prompt();
        this.write(this.line);
        continue;
      }
      if (char < ' ') continue;

      this.line += char;
      this.write(char);
    }
  }

  private async run(raw: string): Promise<void> {
    const line = raw.trim();
    if (line === '') {
      this.prompt();
      return;
    }
    this.busy = true;
    this.cancelled = false;
    try {
      await this.dispatch(tokenize(line));
    } finally {
      this.busy = false;
      if (this.readyState === this.OPEN) this.prompt();
    }
  }

  private async dispatch(argv: string[]): Promise<void> {
    const [command, ...args] = argv;
    switch (command) {
      case 'help':
        this.write(`${HELP.join('\r\n')}\r\n`);
        return;
      case 'clear':
        this.write(ANSI.clear);
        return;
      case 'pwd':
        this.write(`${this.session.cwd}\r\n`);
        return;
      case 'ls':
        this.list(args);
        return;
      case 'cd':
        this.chdir(args);
        return;
      case 'cat':
        this.cat(args);
        return;
      case 'git':
        this.git(args);
        return;
      case 'claude':
        await this.claude(args);
        return;
      case 'exit':
      case 'logout':
        this.write('logout\r\n');
        this.exit(0);
        return;
      default:
        // 127 is the shell's own "no such command", and printing it is the
        // difference between a simulation and a toy.
        this.fail(`bash: ${command}: command not found`);
        this.write(`${ANSI.dim}exit 127${ANSI.reset}\r\n`);
    }
  }

  private list(args: string[]): void {
    const target = resolvePath(this.session.cwd, args.find((a) => !a.startsWith('-')) ?? '.');
    const entries = DIRS[target];
    if (!entries) {
      if (FILES[target] !== undefined) {
        this.write(`${target}\r\n`);
        return;
      }
      this.fail(`ls: cannot access '${target}': No such file or directory`);
      return;
    }
    const visible = args.some((a) => a.startsWith('-') && a.includes('a'))
      ? entries
      : entries.filter((entry) => !entry.startsWith('.'));
    this.write(`${visible.map(colorEntry).join('  ')}\r\n`);
  }

  private chdir(args: string[]): void {
    const target = resolvePath(this.session.cwd, args[0] ?? '~');
    if (!DIRS[target]) {
      this.fail(`cd: ${args[0] ?? target}: No such file or directory`);
      return;
    }
    this.session.cwd = target;
  }

  private cat(args: string[]): void {
    if (args.length === 0) {
      this.fail('cat: missing operand');
      return;
    }
    for (const arg of args) {
      const target = resolvePath(this.session.cwd, arg);
      const body = FILES[target];
      if (body === undefined) {
        this.fail(
          DIRS[target] ? `cat: ${arg}: Is a directory` : `cat: ${arg}: No such file or directory`,
        );
        continue;
      }
      this.write(`${body.replace(/\n/g, '\r\n')}\r\n`);
    }
  }

  private git(args: string[]): void {
    if (args[0] === 'status') {
      this.write(
        [
          'On branch main',
          "Your branch is up to date with 'origin/main'.",
          '',
          'Changes not staged for commit:',
          `  ${ANSI.dim}(use "git add <file>..." to update what will be committed)${ANSI.reset}`,
          `\t${ANSI.red}modified:   src/main.py${ANSI.reset}`,
          '',
          'no changes added to commit',
          '',
        ].join('\r\n'),
      );
      return;
    }
    if (args[0] === 'log') {
      this.write(
        [
          `${ANSI.yellow}9f2c1ab${ANSI.reset} wire up the ingest handler`,
          `${ANSI.yellow}3ad77e0${ANSI.reset} cover the empty-body case`,
          `${ANSI.yellow}b41e902${ANSI.reset} scaffold the service`,
          '',
        ].join('\r\n'),
      );
      return;
    }
    this.fail(`git: '${args[0] ?? ''}' is not simulated here — try status or log --oneline`);
  }

  private async claude(args: string[]): Promise<void> {
    const prompt = args.find((a) => !a.startsWith('-'));
    if (!prompt) {
      this.fail('claude: expected a prompt, e.g. claude "fix the handler"');
      return;
    }
    this.write(`${ANSI.magenta}✻${ANSI.reset} ${ANSI.dim}${prompt}${ANSI.reset}\r\n`);
    for (const [tool, detail] of AGENT_RUN) {
      await this.wait(520);
      if (this.cancelled || this.readyState !== this.OPEN) return;
      this.write(`  ${ANSI.cyan}⏺${ANSI.reset} ${ANSI.bold}${tool}${ANSI.reset}(${detail})\r\n`);
    }
    await this.wait(420);
    if (this.cancelled || this.readyState !== this.OPEN) return;
    this.write(
      `${ANSI.green}✓${ANSI.reset} done · ${AGENT_RUN.length + 1} turns · 6.4s · ${ANSI.yellow}$0.0184${ANSI.reset}\r\n`,
    );
  }
}

function toBytes(data: string | ArrayBufferLike | Blob | ArrayBufferView): Uint8Array | null {
  if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  return null;
}

/**
 * Nesting is refcounted rather than nested-restore, because two panes (or a
 * demo inside a story) each installing and then uninstalling in the wrong
 * order would otherwise leave the page holding a mock as its real WebSocket.
 */
let installed: { native: typeof WebSocket; count: number } | null = null;

export interface MockShellOptions {
  /** URL prefix routed to the simulator. Default `mock-shell:`. */
  scheme?: string;
}

/**
 * Route `mock-shell:` URLs to the simulator and leave every other URL alone.
 *
 * Returns the uninstall. Call it on unmount: a demo that swaps the global
 * WebSocket and never puts it back breaks every other live surface on the
 * page, which is a far worse bug than a dead terminal.
 */
export function installMockShellSocket(options: MockShellOptions = {}): () => void {
  const scheme = options.scheme ?? MOCK_SHELL_SCHEME;
  const Native = globalThis.WebSocket;
  if (typeof Native !== 'function') return () => {};

  if (installed) {
    installed.count += 1;
  } else {
    class MockCapableWebSocket extends Native {
      constructor(url: string | URL, protocols?: string | string[]) {
        const href = typeof url === 'string' ? url : url.href;
        // A derived constructor that returns an object never runs `super()` —
        // which is the only way to hand back something that has not dialled
        // anything while `new WebSocket(url)` stays the call site.
        if (href.startsWith(scheme)) {
          return new SimulatedShellSocket(href) as unknown as MockCapableWebSocket;
        }
        super(url, protocols);
      }
    }
    globalThis.WebSocket = MockCapableWebSocket as unknown as typeof WebSocket;
    installed = { native: Native, count: 1 };
  }

  let released = false;
  return () => {
    if (released || !installed) return;
    released = true;
    installed.count -= 1;
    if (installed.count > 0) return;
    globalThis.WebSocket = installed.native;
    installed = null;
    SESSIONS.clear();
  };
}
