// Stub for the optional `@xterm/*` peer deps, used only by Vitest.
//
// `vite.config.ts` externalises them for the library build and they are
// declared as optional peers — a consumer who never renders `ShellTerminal`
// should not have to install a terminal emulator. That means they are not in
// this repo's tree, and Vitest cannot resolve the static imports in
// `ShellTerminal`, which `HerdMode` pulls in transitively. `vitest.config.ts`
// aliases both packages here.
//
// Structural, not behavioural: enough of the surface for the component to
// mount, register handlers and be torn down. Nothing here paints. A test that
// wants to assert on terminal output should drive the handlers this records.

export interface StubDisposable {
  dispose(): void;
}

export class Terminal {
  cols = 80;
  rows = 24;
  /** Everything written to the terminal, for assertions. */
  written: Array<string | Uint8Array> = [];
  disposed = false;
  opened: HTMLElement | null = null;
  private dataHandlers: Array<(data: string) => void> = [];
  private resizeHandlers: Array<(size: { cols: number; rows: number }) => void> = [];

  constructor(public options: Record<string, unknown> = {}) {}

  open(parent: HTMLElement): void {
    this.opened = parent;
  }

  write(data: string | Uint8Array): void {
    this.written.push(data);
  }

  focus(): void {}

  dispose(): void {
    this.disposed = true;
  }

  loadAddon(addon: { activate(terminal: Terminal): void }): void {
    addon.activate(this);
  }

  onData(handler: (data: string) => void): StubDisposable {
    this.dataHandlers.push(handler);
    return { dispose: () => { this.dataHandlers = this.dataHandlers.filter((h) => h !== handler); } };
  }

  onResize(handler: (size: { cols: number; rows: number }) => void): StubDisposable {
    this.resizeHandlers.push(handler);
    return { dispose: () => { this.resizeHandlers = this.resizeHandlers.filter((h) => h !== handler); } };
  }

  /** Test helper: pretend the operator typed. */
  emitData(data: string): void {
    for (const handler of this.dataHandlers) handler(data);
  }

  /** Test helper: pretend the pane was resized. */
  emitResize(cols: number, rows: number): void {
    this.cols = cols;
    this.rows = rows;
    for (const handler of this.resizeHandlers) handler({ cols, rows });
  }
}

export class FitAddon {
  fits = 0;
  activate(): void {}
  dispose(): void {}
  fit(): void {
    this.fits += 1;
  }
}
