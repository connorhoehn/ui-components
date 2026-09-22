// A real terminal into a computer.
//
// xterm.js speaking the AgentCore shell protocol directly to AWS over a
// presigned WebSocket. The host's backend only mints the URL; terminal frames
// never pass through it, which keeps a 250-frames-per-second stream off the
// application server and removes a hop from every keystroke.

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
// xterm's own stylesheet, imported HERE rather than left to the host.
//
// Without it xterm still runs — it just renders wrong, and wrong in ways that
// read as "this component is broken" rather than "a stylesheet is missing":
// the helper textarea it keeps for IME input becomes a visible box with a
// browser focus ring and a resize grabber, row positioning drifts, and the
// output is unpadded. Every one of those is invisible in a Storybook that
// imports the CSS at the preview level and appears the moment a real app
// mounts the component.
//
// vite.config externalises this specifier alongside the package, so the
// consumer's bundler resolves and injects it — the same arrangement
// Excalidraw's stylesheet uses.
import '@xterm/xterm/css/xterm.css';
import { cn } from '../../../lib/cn';
import RisingParticles from '../../shared/RisingParticles';
import { useCompute } from '../context/ComputeContext';
import { SHELL_STATUS, statusOf } from '../lib/status';
import {
  DETACH_BYTE,
  HEARTBEAT_MS,
  MAX_FRAME_BYTES,
  MAX_RETRIES,
  SHELL_CHANNEL,
  closeAdvice,
  encodeFrame,
  encodeResize,
  exhaustedAdvice,
  exitCodeOf,
  type ShellStatusFrame,
} from '../lib/shellProtocol';
import type { ShellStatus } from '../types';

/** A stable sky per shell: the strip must not re-shuffle its stars on every frame. */
function seedOf(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

type Phase = 'idle' | 'connecting' | 'live' | 'detached' | 'closed' | 'error';

/**
 * Close a socket without letting it call back.
 *
 * A closing socket can still dispatch frames that were already in its queue,
 * so dropping the handlers first is what stops output arriving for a terminal
 * that has moved on — or, on unmount, been disposed.
 */
function detachSocket(ws: WebSocket | null): void {
  if (!ws) return;
  ws.onopen = null;
  ws.onmessage = null;
  ws.onclose = null;
  ws.onerror = null;
  ws.close();
}

export interface ShellTerminalHandle {
  /** Type into the PTY as if the operator had. Used by broadcast input. */
  send: (text: string) => boolean;
  /** Drop the socket, leave the shell running server-side. */
  detach: () => void;
  /** Kill the PTY. Permanent — it cannot be reattached after this. */
  kill: () => void;
  focus: () => void;
  /** Re-fit to the container. Call after a resize the component cannot see. */
  refit: () => void;
  connect: () => void;
}

export interface ShellTerminalProps {
  sessionId: string;
  /** Stable id so a reload reattaches to the same PTY. */
  shellId?: string;
  label?: string;
  /** Directory to land in once the PTY is live. */
  cwd?: string;
  onExit?: (code: number | null) => void;
  /** Fixed height in px. Ignored when `fillHeight`. */
  height?: number;
  /** Draw the built-in header. Off when the container labels the pane itself. */
  chrome?: boolean;
  /** Fill the parent rather than using a fixed height. */
  fillHeight?: boolean;
  /** Connect on mount rather than waiting for a click. */
  autoConnect?: boolean;
  /** `sawOutput` is true when bytes arriving triggered the call. */
  onStatus?: (status: ShellStatus, sawOutput?: boolean) => void;
  /**
   * Background for this terminal, overriding `--color-terminal-bg`.
   *
   * Any CSS colour. Set it for the one pane that should look different; to
   * restyle every terminal in an app, re-point the token instead.
   */
  background?: string;
  className?: string;
}

/**
 * Read the terminal palette out of the theme.
 *
 * xterm needs real colour values, not `var(--…)` — it paints to a canvas.
 * Resolving the tokens at mount is what keeps the PTY themed with the rest of
 * the application instead of being a fixed dark rectangle sitting in a light
 * page.
 */
/**
 * The PTY's colours, read from tokens so a host can restyle every terminal at
 * once by re-pointing them.
 *
 * The background comes from `--color-terminal-bg`, not `--color-code-bg`. The
 * two answer different questions: `code-bg` is the darkest step of the code
 * family and belongs behind chrome, and a near-black rectangle beside light app
 * chrome reads as a hole punched in the page rather than a terminal. The
 * terminal token defaults to the family's mid surface — dark enough to be a
 * terminal, grey enough to sit in a page.
 *
 * `override` is the per-instance escape hatch, for the one pane that needs to
 * look different from the rest.
 */
function themePalette(override?: string, from?: Element | null): Record<string, string> {
  // Night-side fallbacks: an environment with no computed styles (SSR, a
  // detached node) gets a readable dark terminal rather than white-on-white.
  const fallback = {
    background: '#1e1e2e',
    foreground: '#cdd6f4',
    cursor: '#a6e3a1',
    selectionBackground: '#45475a',
  };
  if (typeof globalThis.getComputedStyle !== 'function' || typeof document === 'undefined') {
    return override ? { ...fallback, background: override } : fallback;
  }
  // Read from the terminal's own host, not documentElement: a subtree can be
  // themed independently (<div data-theme="dark">), and a terminal inside one
  // must dress for the room it is actually in.
  const style = globalThis.getComputedStyle(from ?? document.documentElement);
  const token = (name: string, or: string) => style.getPropertyValue(name).trim() || or;
  return {
    background: override ?? token('--color-terminal-bg', fallback.background),
    foreground: token('--color-terminal-fg', fallback.foreground),
    cursor: token('--color-terminal-cursor', fallback.cursor),
    selectionBackground: token('--color-terminal-selection', fallback.selectionBackground),
  };
}

export const ShellTerminal = forwardRef<ShellTerminalHandle, ShellTerminalProps>(function ShellTerminal(
  {
    sessionId,
    shellId,
    label,
    cwd,
    onExit,
    height = 460,
    chrome = true,
    fillHeight = false,
    autoConnect = false,
    onStatus,
    background,
    className,
  },
  ref,
) {
  const { client, computers } = useCompute();

  const hostRef = useRef<HTMLDivElement>(null);

  // Day/night follows the app live. xterm takes its palette at construction,
  // so without this a theme toggle leaves every open terminal dressed for the
  // previous mode. The two signals that flip the ramp are the documentElement
  // data-theme attribute and the OS scheme; both re-read the computed tokens
  // from the host so a subtree theme also lands correctly.
  useEffect(() => {
    const term = () => termRef.current;
    const apply = () => {
      const t = term();
      if (t) t.options.theme = themePalette(background, hostRef.current);
    };
    const observer = typeof MutationObserver === 'function'
      ? new MutationObserver(apply)
      : null;
    observer?.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    const mq = typeof globalThis.matchMedia === 'function'
      ? globalThis.matchMedia('(prefers-color-scheme: dark)')
      : null;
    mq?.addEventListener?.('change', apply);
    return () => {
      observer?.disconnect();
      mq?.removeEventListener?.('change', apply);
    };
  }, [background]);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const shellIdRef = useRef<string | undefined>(shellId);

  // Callbacks through refs so an inline arrow in the parent does not rebuild
  // connect() — and with it tear down and remake the socket — every render.
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;
  const onStatusRef = useRef(onStatus);
  onStatusRef.current = onStatus;

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retriesRef = useRef(0);
  const detachedRef = useRef(false);
  // A pending reconnect must be cancellable. Without this, unmounting during
  // backoff still fires connect(): it mints a fresh URL and opens a socket
  // nobody is watching, silently consuming one of the ten shell slots per
  // runtime and setting state on a disposed terminal.
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const disposedRef = useRef(false);

  const [phase, setPhase] = useState<Phase>('idle');
  const [note, setNote] = useState('');

  const connect = useCallback(async () => {
    const term = termRef.current;
    if (!term || disposedRef.current) return;
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
    setPhase('connecting');
    setNote('');
    onStatusRef.current?.('connecting');

    let url: string;
    try {
      const minted = await client.getShellUrl(sessionId, shellIdRef.current);
      url = minted.url;
      if (minted.shellId) shellIdRef.current = minted.shellId;
    } catch (err) {
      setPhase('error');
      setNote(err instanceof Error ? err.message : 'could not mint a shell URL');
      onStatusRef.current?.('error');
      return;
    }
    if (disposedRef.current) return;

    // Whatever socket was here before must go before a new one opens.
    // `connect()` is reachable from four places — the header button, the
    // autoConnect effect, the imperative handle and the reconnect ladder —
    // and it awaits a URL mint in the middle, so two calls can be in flight
    // at once. Overwriting `wsRef` without this left the first socket OPEN
    // and unreferenced: still writing its output into the terminal the
    // second one now owns, and still holding one of the ten shell slots the
    // runtime allows, for as long as the pane lived.
    //
    // Detach the handlers before closing. `onclose` would otherwise run the
    // reconnect ladder for a socket we are deliberately discarding, which
    // would immediately race the connect that replaced it.
    detachSocket(wsRef.current);
    wsRef.current = null;

    const ws = new WebSocket(url);
    ws.binaryType = 'arraybuffer';
    wsRef.current = ws;

    ws.onopen = () => {
      retriesRef.current = 0;
      detachedRef.current = false;
      setPhase('live');
      onStatusRef.current?.('ready');
      // Tell the PTY how big it is, or output wraps at the server's default.
      const fit = fitRef.current;
      if (fit) {
        fit.fit();
        ws.send(encodeResize(term.cols, term.rows));
      }
      // Land where the shell was opened from. Sent as a normal line so the
      // shell records it and the prompt reflects the directory — a silent
      // chdir would leave the prompt lying about where you are.
      if (cwd) ws.send(encodeFrame(SHELL_CHANNEL.STDIN, new TextEncoder().encode(`cd ${cwd} 2>/dev/null || true\n`)));
      term.focus();
    };

    ws.onmessage = (ev) => {
      const bytes = new Uint8Array(ev.data as ArrayBuffer);
      if (bytes.length === 0) return;
      const channel = bytes[0];
      const payload = bytes.subarray(1);

      if (channel === SHELL_CHANNEL.STDOUT || channel === SHELL_CHANNEL.STDERR) {
        term.write(payload);
        onStatusRef.current?.('busy', true);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => onStatusRef.current?.('ready'), 700);
        return;
      }

      if (channel === SHELL_CHANNEL.STATUS) {
        try {
          const frame = JSON.parse(new TextDecoder().decode(payload)) as ShellStatusFrame;
          if (frame.metadata?.shellId) {
            shellIdRef.current = frame.metadata.shellId;
            const dropped = frame.metadata.bytesDropped;
            setNote(
              frame.metadata.reconnected
                ? `reattached${dropped ? ` · ${dropped} bytes lost while away` : ''}`
                : 'new shell',
            );
            return;
          }
          onExitRef.current?.(exitCodeOf(frame));
        } catch {
          /* a malformed status frame is not worth killing the terminal over */
        }
        return;
      }

      if (channel === SHELL_CHANNEL.CLOSE) ws.close();
    };

    ws.onclose = (ev) => {
      wsRef.current = null;
      if (detachedRef.current) {
        setPhase('detached');
        setNote('detached — shell still running');
        onStatusRef.current?.('detached');
        return;
      }

      const advice = closeAdvice(ev.code);
      setNote(advice.text);
      if (advice.retry && retriesRef.current < MAX_RETRIES && !disposedRef.current) {
        retriesRef.current += 1;
        setPhase('connecting');
        // Backoff, because 1008 can mean we are being rate limited and an
        // immediate retry would earn another one.
        retryTimerRef.current = setTimeout(
          () => void connect(),
          Math.min(500 * 2 ** retriesRef.current, 8_000),
        );
        return;
      }
      setPhase(ev.code === 1000 ? 'closed' : 'error');
      onStatusRef.current?.(ev.code === 1000 ? 'detached' : 'error');
      const exhausted = exhaustedAdvice(ev.code, retriesRef.current);
      if (exhausted) setNote(exhausted);
    };

    ws.onerror = () => {
      /* close carries the actionable code; error does not */
    };
  }, [client, sessionId, cwd]);

  // One terminal instance per mount.
  useEffect(() => {
    if (!hostRef.current) return;
    disposedRef.current = false;

    const term = new Terminal({
      convertEol: false,
      cursorBlink: true,
      fontSize: 12.5,
      fontFamily: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, monospace',
      theme: themePalette(background, hostRef.current),
      scrollback: 5_000,
    });
    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(hostRef.current);
    fit.fit();
    termRef.current = term;
    fitRef.current = fit;

    const onData = term.onData((data) => {
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) return;
      const bytes = new TextEncoder().encode(data);
      // Ctrl-] detaches rather than reaching the shell — matches the CLI, and
      // is NOT the 0xff close frame, which would kill the PTY outright.
      if (bytes.length === 1 && bytes[0] === DETACH_BYTE) {
        detachedRef.current = true;
        ws.close();
        return;
      }
      if (bytes.length > MAX_FRAME_BYTES) {
        term.write('\r\n\x1b[33m[paste too large — split into chunks under 64 KB]\x1b[0m\r\n');
        return;
      }
      ws.send(encodeFrame(SHELL_CHANNEL.STDIN, bytes));
    });

    const onResize = term.onResize(({ cols, rows }) => {
      const ws = wsRef.current;
      if (ws?.readyState === WebSocket.OPEN) ws.send(encodeResize(cols, rows));
    });

    const refit = () => fit.fit();
    globalThis.addEventListener('resize', refit);
    // Panes are resized by dragging a divider, which fires no window resize.
    // Without this the PTY keeps the columns it was born with and wraps in
    // the wrong place for the rest of its life.
    const observer =
      typeof ResizeObserver === 'function' ? new ResizeObserver(() => fit.fit()) : null;
    if (observer && hostRef.current) observer.observe(hostRef.current);

    const beat = setInterval(() => {
      const ws = wsRef.current;
      if (ws?.readyState === WebSocket.OPEN) ws.send(encodeFrame(SHELL_CHANNEL.HEARTBEAT));
    }, HEARTBEAT_MS);

    return () => {
      disposedRef.current = true;
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      clearInterval(beat);
      globalThis.removeEventListener('resize', refit);
      observer?.disconnect();
      onData.dispose();
      onResize.dispose();
      // Closing the socket detaches; deliberately no 0xff, so the shell
      // survives for the next attach. Handlers come off first — `term` is
      // about to be disposed and a queued frame would write into it.
      detachSocket(wsRef.current);
      wsRef.current = null;
      term.dispose();
      termRef.current = null;
    };
  }, []);

  useEffect(() => {
    // A pane the lab just opened should already be connecting. Guarded on
    // phase so a deliberate detach is not immediately undone.
    if (autoConnect && phase === 'idle') void connect();
  }, [autoConnect, phase, connect]);

  const detach = useCallback(() => {
    detachedRef.current = true;
    wsRef.current?.close();
  }, []);

  const kill = useCallback(() => {
    const ws = wsRef.current;
    if (ws?.readyState === WebSocket.OPEN) ws.send(encodeFrame(SHELL_CHANNEL.CLOSE));
  }, []);

  useImperativeHandle(
    ref,
    (): ShellTerminalHandle => ({
      send: (text) => {
        const ws = wsRef.current;
        if (!ws || ws.readyState !== WebSocket.OPEN) return false;
        const bytes = new TextEncoder().encode(text);
        if (bytes.length > MAX_FRAME_BYTES) return false;
        ws.send(encodeFrame(SHELL_CHANNEL.STDIN, bytes));
        return true;
      },
      detach,
      kill,
      focus: () => termRef.current?.focus(),
      refit: () => fitRef.current?.fit(),
      connect: () => void connect(),
    }),
    [connect, detach, kill],
  );

  const live = phase === 'live';
  // The box this shell is attached to, as the registry has it. Absent (a lab
  // provider that lists no fleet), nothing is claimed — no backdrop.
  const working = statusOf(computers.find((c) => c.sessionId === sessionId)) === 'running'
    && !!computers.find((c) => c.sessionId === sessionId);
  const meta = SHELL_STATUS[live ? 'ready' : phase === 'error' ? 'error' : phase === 'detached' || phase === 'closed' ? 'detached' : 'connecting'];

  return (
    <div
      // Matches the canvas, or a strip of a different dark shows around it.
      style={background ? { background } : undefined}
      className={cn(
        'flex flex-col',
        background ? '' : 'bg-terminal-bg',
        fillHeight ? 'h-full min-h-0' : 'rounded-lg overflow-hidden border border-code-border',
        className,
      )}
    >
      {chrome && (
        // The chrome strip carries the working state, not the canvas: xterm
        // paints an opaque ground of its own, so a backdrop behind it would be
        // invisible. Keyed on the REGISTRY status, so a box a cron bot is
        // driving still reads as working in a shell nobody is typing into.
        <RisingParticles
          active={working}
          intensity="low"
          seed={seedOf(sessionId)}
          className="flex items-center gap-2 px-3 py-2 border-b border-code-border shrink-0"
          data-testid="shell-terminal-particles"
        >
          <span className="text-[11px] font-semibold text-code-text">{label ?? 'terminal'}</span>
          <span
            className={cn(
              'text-[10px]',
              live ? 'text-code-green' : phase === 'error' ? 'text-code-red' : 'text-code-muted',
            )}
            title={meta.help}
          >
            {phase}
            {note ? ` · ${note}` : ''}
          </span>
          <span className="flex-1" />
          {shellIdRef.current && (
            <span className="text-[9.5px] text-code-muted font-mono hidden md:inline">{shellIdRef.current}</span>
          )}
          {live ? (
            <>
              <button
                type="button"
                onClick={detach}
                title="Leave the shell running (Ctrl-])"
                className="text-[10px] px-2 py-0.5 rounded border border-code-border text-code-muted hover:text-code-text cursor-pointer bg-transparent"
              >
                detach
              </button>
              <button
                type="button"
                onClick={kill}
                title="Kill the shell — it cannot be reattached"
                className="text-[10px] px-2 py-0.5 rounded border border-code-border text-code-muted hover:text-code-red cursor-pointer bg-transparent"
              >
                kill
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => void connect()}
              // Armed only when there is nothing in flight. The strip below
              // already hides itself while connecting; this header did not,
              // so the button stayed clickable through the URL mint.
              disabled={phase === 'connecting'}
              className="text-[10px] px-2 py-0.5 rounded border border-code-border text-code-green hover:bg-code-panel cursor-pointer bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
            >
              {phase === 'connecting' ? 'connecting' : phase === 'detached' || phase === 'closed' ? 'reattach' : 'connect'}
            </button>
          )}
        </RisingParticles>
      )}

      {/* With the header hidden the container still needs the connection
          state, so it surfaces as a thin strip rather than disappearing.

          This strip is the FIRST thing a lab pane shows — before the PTY
          attaches there is nothing else in the frame — and it was drawn in
          `code-muted`, which is 3:1 on the terminal surface. That is a fine
          weight for a label sitting beside output and the wrong one for the
          only line on screen. */}
      {!chrome && phase !== 'live' && (
        <div className="px-3 py-1 text-[10px] border-b border-code-border flex items-center gap-2 shrink-0">
          <span className={phase === 'error' ? 'text-code-red' : 'text-code-subtle'}>
            {phase}
            {note ? ` · ${note}` : ''}
          </span>
          {phase !== 'connecting' && (
            <button
              type="button"
              onClick={() => void connect()}
              className="text-code-green bg-transparent border-none cursor-pointer p-0 hover:underline"
            >
              {phase === 'idle' ? 'connect' : 'reattach'}
            </button>
          )}
        </div>
      )}

      <div
        ref={hostRef}
        style={fillHeight ? undefined : { height }}
        className={cn('px-2 py-1', fillHeight && 'flex-1 min-h-0')}
      />
    </div>
  );
});
