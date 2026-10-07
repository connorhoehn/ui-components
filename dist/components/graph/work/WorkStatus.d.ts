import type { WorkActivityPause, WorkGraphStatus, WorkStatusProps } from './types';
/**
 * The words for WHY a run is waiting — the same vocabulary the run cards use
 * (`AgentRunCard` / `RunSummaryPanel`: "Needs approval"; the editor's
 * breakpoint overlay: "Paused at <step>"). Undefined unless the status is
 * `waiting` and a reason was given, so a caller can fall back to "Waiting".
 */
export declare function workPauseLabel(status: WorkGraphStatus, pause?: WorkActivityPause): string | undefined;
/**
 * Compact, text-labelled status indicator for work graph nodes and edges.
 *
 * The animated marker is deliberately restricted to fresh, currently
 * running work. The status word and glyph remain present so state is never
 * conveyed by colour or motion alone.
 */
export declare function WorkStatus({ status, sharingFresh, label, className, }: WorkStatusProps): import("react").JSX.Element;
export default WorkStatus;
//# sourceMappingURL=WorkStatus.d.ts.map