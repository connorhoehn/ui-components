/** URLs beginning with this are answered by the simulator. */
export declare const MOCK_TAIL_SCHEME = "mock-tail:";
/** One scripted frame. `afterMs` is relative to the previous frame. */
interface Frame {
    afterMs: number;
    data: Record<string, unknown>;
}
/**
 * A run with a shape worth watching: it starts, thinks, uses tools, and lands
 * somewhere — including one that ends by asking a question, because `waiting`
 * is a real status the rail sorts to the top and it needs to be reachable.
 */
export interface MockTailScript {
    id: string;
    label: string;
    frames: Frame[];
}
export declare const MOCK_TAIL_SCRIPTS: MockTailScript[];
/** The URL a mock client should hand back from `tail(boxId)`. */
export declare function mockTailUrl(boxId: string, scriptId?: string): string;
export interface MockTailOptions {
    /** URL prefix routed to the simulator. Default `mock-tail:`. */
    scheme?: string;
}
/**
 * Route `mock-tail:` URLs to the simulator and leave every other URL alone.
 *
 * Returns the uninstall, refcounted so nested consumers do not fight. Call it
 * on unmount: a story that swaps the global EventSource and never puts it back
 * breaks every other live surface on the page, which is a worse bug than an
 * empty pane.
 */
export declare function installMockTailSource(options?: MockTailOptions): () => void;
export {};
//# sourceMappingURL=mockTail.d.ts.map