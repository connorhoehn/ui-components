import { ReplayDriver } from './useReplayDriver';
/**
 * Attaches a `keydown` listener that drives the supplied `ReplayDriver`.
 * The listener is mounted on `window` and torn down on unmount or whenever
 * `enabled` flips false (e.g. while the page is showing a modal that should
 * own the keys).
 */
export declare function useReplayKeyboard(driver: ReplayDriver, enabled?: boolean): void;
//# sourceMappingURL=useReplayKeyboard.d.ts.map