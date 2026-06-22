import { PipelineRun, PipelineWireEvent } from '../../../types/pipeline';
/**
 * Reconstructs the event sequence for a (typically completed) pipeline run by
 * walking its stored `steps` map. The output is ordered by event timestamp,
 * with `seq` numbers assigned monotonically from 0 and `sourceNodeId` set to
 * `'replay'`. See module header for invariants and Phase-5 migration notes.
 */
export declare function deriveEventsFromRun(run: PipelineRun): PipelineWireEvent[];
//# sourceMappingURL=deriveEvents.d.ts.map