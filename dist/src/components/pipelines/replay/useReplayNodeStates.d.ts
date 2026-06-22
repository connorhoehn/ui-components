import { PipelineWireEvent } from '../../../types/pipeline';
import { NodeExecutionState } from '../nodes/BaseNode';
import { EdgeState } from '../canvas/edges/AnimatedEdge';
import { ReplayDriver } from './useReplayDriver';
export interface ReplayNodeStates {
    /** Map from node id to visual execution state at the current cursor. */
    nodeStates: Record<string, NodeExecutionState>;
    /** Map from edge id to visual edge state at the current cursor. */
    edgeStates: Record<string, EdgeState>;
    /** The step id currently active (running) at cursor position, if any. */
    activeStepId: string | null;
}
/**
 * Walk events[0..cursor) and compute per-node states at that point in time.
 */
export declare function deriveNodeStatesAtCursor(events: PipelineWireEvent[], cursor: number, edges?: Array<{
    id: string;
    source: string;
    target: string;
}>): ReplayNodeStates;
/**
 * React hook that derives node/edge animation states from the replay driver's
 * current cursor position. Recomputes when cursor or events change.
 */
export declare function useReplayNodeStates(replay: ReplayDriver, edges?: Array<{
    id: string;
    source: string;
    target: string;
}>): ReplayNodeStates;
//# sourceMappingURL=useReplayNodeStates.d.ts.map