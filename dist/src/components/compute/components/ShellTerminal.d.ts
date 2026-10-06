import '@xterm/xterm/css/xterm.css';
import type { ShellStatus } from '../types';
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
export declare const ShellTerminal: import("react").ForwardRefExoticComponent<ShellTerminalProps & import("react").RefAttributes<ShellTerminalHandle>>;
//# sourceMappingURL=ShellTerminal.d.ts.map