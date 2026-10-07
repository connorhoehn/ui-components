// The lab's one instruction route, shared by the Nudge bar and the panes.
//
// The Agent pane answers a pending question inline. That reply has to go
// where a Nudge aimed at the same box would go — the host's `onInstruct`
// when it gave one (a governed dispatch, a queue), the resumed agent task
// otherwise — or the two controls would disagree about what "answer it"
// means. `ComputerLab` provides the route; a pane rendered outside a lab
// falls back to the default task path through the provider's client.

import { createContext, useContext } from 'react';
import type { ComputeClient } from '../lib/computeClient';
import { isLocalComputer } from '../lib/fleetSummary';
import type { Computer } from '../types';

/** The host's answer: how many computers took the instruction, and why the rest did not. */
export interface LabInstructionOutcome {
  delivered: number;
  /** One line on the ones that did not — "2 refused · 1 laptop skipped". */
  detail?: string;
}

/** Deliver one instruction to these computers. Rejects on a refusal the caller should report. */
export type LabInstructRoute = (text: string, computers: readonly Computer[]) => Promise<LabInstructionOutcome | void>;

/**
 * The default Nudge route: a resumed agent task on each targeted microVM.
 *
 * A task stream lasts as long as the run, so this does not wait for it to
 * finish — only long enough to hear an immediate refusal (a 403, a missing
 * session). A run still going after that counts as delivered. Laptops are
 * skipped: they have no runtime session to resume.
 */
export async function runInstructionAsTasks(
  client: ComputeClient,
  text: string,
  targetComputers: readonly Computer[],
  graceMs = 1_500,
): Promise<LabInstructionOutcome> {
  const boxes = targetComputers.filter((c) => !isLocalComputer(c));
  const skipped = targetComputers.length - boxes.length;
  const verdicts = await Promise.all(boxes.map((box) => {
    const run = client.runTask(box.sessionId, { prompt: text, resume: true }, () => {});
    return Promise.race([
      run.then(() => true, () => false),
      new Promise<boolean>((resolve) => { setTimeout(() => resolve(true), graceMs); }),
    ]);
  }));
  const delivered = verdicts.filter(Boolean).length;
  const notes: string[] = [];
  if (delivered < boxes.length) notes.push(`${boxes.length - delivered} refused`);
  if (skipped > 0) notes.push(`${skipped} ${skipped === 1 ? 'laptop' : 'laptops'} skipped — no runtime session`);
  return { delivered, ...(notes.length ? { detail: notes.join(' · ') } : {}) };
}

export const LabInstructContext = createContext<LabInstructRoute | null>(null);

/** The enclosing lab's instruction route, or null outside a lab. */
export function useLabInstruct(): LabInstructRoute | null {
  return useContext(LabInstructContext);
}
