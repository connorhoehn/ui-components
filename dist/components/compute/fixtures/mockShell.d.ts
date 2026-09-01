/** URLs with this scheme are simulated; everything else is dialled for real. */
export declare const MOCK_SHELL_SCHEME = "mock-shell:";
/**
 * Build the value a mock `getShellUrl` should resolve to.
 *
 * The shell id rides in the query because `ShellTerminal` puts it nowhere
 * else: it hands the id to the client and then opens whatever URL comes back,
 * so this is the only channel through which the simulator can learn which
 * shell it is meant to be.
 */
export declare function mockShellUrl(sessionId: string, shellId?: string): {
    url: string;
    shellId: string;
};
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
export declare function installMockShellSocket(options?: MockShellOptions): () => void;
//# sourceMappingURL=mockShell.d.ts.map