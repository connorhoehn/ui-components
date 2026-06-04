import type { PipelineRun, PipelineWireEvent } from '../../../types/pipeline';
export type ReplaySpeed = 0.5 | 1 | 2 | 4 | 'instant';
export interface ReplayState {
    playing: boolean;
    speedMultiplier: ReplaySpeed;
    /** Index of the next event to dispatch (0-based, events[cursor] is pending). */
    cursor: number;
    totalEvents: number;
}
export interface ReplayDriver {
    state: ReplayState;
    play: () => void;
    pause: () => void;
    stop: () => void;
    seek: (cursor: number) => void;
    setSpeed: (m: ReplaySpeed) => void;
    /** Materialized events so the scrubber can render ticks. */
    events: PipelineWireEvent[];
}
/**
 * Controls a scrubber-driven replay of a persisted pipeline run. Returns
 * transport controls (play/pause/stop/seek/setSpeed) and the live state
 * (playing, cursor, speed). Safe to call with `null` while the run is
 * loading — the hook returns a no-op driver in that case.
 */
export declare function useReplayDriver(run: PipelineRun | null): ReplayDriver;
//# sourceMappingURL=useReplayDriver.d.ts.map