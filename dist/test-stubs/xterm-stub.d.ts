export interface StubDisposable {
    dispose(): void;
}
export declare class Terminal {
    options: Record<string, unknown>;
    cols: number;
    rows: number;
    /** Everything written to the terminal, for assertions. */
    written: Array<string | Uint8Array>;
    disposed: boolean;
    opened: HTMLElement | null;
    private dataHandlers;
    private resizeHandlers;
    constructor(options?: Record<string, unknown>);
    open(parent: HTMLElement): void;
    write(data: string | Uint8Array): void;
    focus(): void;
    dispose(): void;
    loadAddon(addon: {
        activate(terminal: Terminal): void;
    }): void;
    onData(handler: (data: string) => void): StubDisposable;
    onResize(handler: (size: {
        cols: number;
        rows: number;
    }) => void): StubDisposable;
    /** Test helper: pretend the operator typed. */
    emitData(data: string): void;
    /** Test helper: pretend the pane was resized. */
    emitResize(cols: number, rows: number): void;
}
export declare class FitAddon {
    fits: number;
    activate(): void;
    dispose(): void;
    fit(): void;
}
//# sourceMappingURL=xterm-stub.d.ts.map