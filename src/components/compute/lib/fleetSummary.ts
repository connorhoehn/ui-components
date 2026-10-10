// What the fleet is doing, counted once.
//
// The workspace lab's top bar says "3 need you · 5 running · 1 error" and its
// Agents tab says "12". Both are counts of the same list read four ways, and
// the classic rail already derived one of them inline (`active`). Counting in
// one place keeps the pills, the tab and the rail filter from disagreeing —
// which is the only property a status count has to have.

import { statusOf } from './status';
import type { Computer, ComputeStatus } from '../types';

/** Statuses a person reads as "an agent is in play here". */
export const AGENT_STATUSES: readonly ComputeStatus[] = ['running', 'waiting', 'error'];

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
export function hasAgent(computer: Computer): boolean {
  return AGENT_STATUSES.includes(statusOf(computer));
}

export interface FleetSummary {
  computers: number;
  agents: number;
  needsYou: number;
  running: number;
  error: number;
  /** Boxes minted whose microVM is not up yet. Not counted as agents: nothing is running. */
  provisioning: number;
}

export function summarizeFleet(computers: readonly Computer[]): FleetSummary {
  let agents = 0;
  let needsYou = 0;
  let running = 0;
  let error = 0;
  let provisioning = 0;
  for (const computer of computers) {
    const status = statusOf(computer);
    if (hasAgent(computer)) agents += 1;
    if (status === 'waiting') needsYou += 1;
    else if (status === 'running') running += 1;
    else if (status === 'error') error += 1;
    else if (status === 'provisioning') provisioning += 1;
  }
  return { computers: computers.length, agents, needsYou, running, error, provisioning };
}

/** Boxes that want attention first, then busy ones, then the rest. */
export const ATTENTION_ORDER: Record<ComputeStatus, number> = {
  waiting: 0,
  error: 1,
  running: 2,
  // Coming up: worth seeing before the quiet boxes, never above live work.
  provisioning: 3,
  idle: 4,
  stopped: 5,
};

export function byAttention(a: Computer, b: Computer): number {
  return ATTENTION_ORDER[statusOf(a)] - ATTENTION_ORDER[statusOf(b)];
}

/**
 * Does a computer match a free-text query?
 *
 * Matches the fields a person would type: the box's name, what it is charged
 * to, and what it is doing. Case-insensitive, every word must match somewhere
 * — "auth tests" finds the auth box running tests, not every box that says
 * either word.
 */
export function matchesQuery(computer: Computer, query: string): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const haystack = [computer.label, computer.project, computer.currentTask, computer.id]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return words.every((word) => haystack.includes(word));
}

/** A paired laptop rather than a provisioned microVM. */
export function isLocalComputer(computer: Computer): boolean {
  return computer.kind === 'local';
}
