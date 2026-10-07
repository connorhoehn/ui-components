import type { Computer, ComputeStatus } from '../types';
/** Statuses a person reads as "an agent is in play here". */
export declare const AGENT_STATUSES: readonly ComputeStatus[];
/**
 * Is there an agent in play on this computer?
 *
 * A run in flight, a question pending, or a failure to read. Deliberately not
 * "has a `currentTask`": an idle box keeps the line of its last task, and a
 * paired laptop uses the field for its worker state ("Waiting for work"), so
 * counting it made every computer an agent and the count said nothing. With
 * this rule the Agents count is exactly needs-you + running + error — the
 * three pills beside it.
 */
export declare function hasAgent(computer: Computer): boolean;
export interface FleetSummary {
    computers: number;
    agents: number;
    needsYou: number;
    running: number;
    error: number;
}
export declare function summarizeFleet(computers: readonly Computer[]): FleetSummary;
/** Boxes that want attention first, then busy ones, then the rest. */
export declare const ATTENTION_ORDER: Record<ComputeStatus, number>;
export declare function byAttention(a: Computer, b: Computer): number;
/**
 * Does a computer match a free-text query?
 *
 * Matches the fields a person would type: the box's name, what it is charged
 * to, and what it is doing. Case-insensitive, every word must match somewhere
 * — "auth tests" finds the auth box running tests, not every box that says
 * either word.
 */
export declare function matchesQuery(computer: Computer, query: string): boolean;
/** A paired laptop rather than a provisioned microVM. */
export declare function isLocalComputer(computer: Computer): boolean;
//# sourceMappingURL=fleetSummary.d.ts.map