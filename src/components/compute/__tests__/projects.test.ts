import { describe, expect, it } from 'vitest';
import { formatTokens, rollUpProjects, UNASSIGNED_PROJECT_ID } from '../hooks/useComputeProjects';
import type { Computer, ComputeProject } from '../types';

const box = (id: string, over: Partial<Computer> = {}): Computer => ({
  id,
  label: id,
  sessionId: `session-${id}-000000000000000000000000`,
  createdAt: '2026-08-26T00:00:00.000Z',
  ...over,
});

const projects: ComputeProject[] = [
  { id: 'p1', name: 'Auth', budgetUsd: 100, spentUsd: 40 },
  { id: 'p2', name: 'Search' },
];

describe('rollUpProjects', () => {
  it('groups computers under the project they are charged to', () => {
    const rollups = rollUpProjects(projects, [
      box('a', { projectId: 'p1' }),
      box('b', { projectId: 'p1' }),
      box('c', { projectId: 'p2' }),
    ]);
    expect(rollups.find((r) => r.id === 'p1')!.computers.map((c) => c.id)).toEqual(['a', 'b']);
    expect(rollups.find((r) => r.id === 'p2')!.computers).toHaveLength(1);
  });

  it('keeps a project with no computers, rather than dropping it', () => {
    // A project you have not started anything on is exactly the one you want
    // the chooser to offer, so it can create the first box there.
    const rollups = rollUpProjects(projects, []);
    expect(rollups).toHaveLength(2);
    expect(rollups.every((r) => r.computers.length === 0)).toBe(true);
  });

  it('buckets unassigned computers instead of hiding them', () => {
    // A box with no cost centre still costs money. Hiding it is how a fleet
    // grows an untracked tail.
    const rollups = rollUpProjects(projects, [box('orphan')]);
    const bucket = rollups.find((r) => r.id === UNASSIGNED_PROJECT_ID);
    expect(bucket).toBeTruthy();
    expect(bucket!.computers.map((c) => c.id)).toEqual(['orphan']);
  });

  it('adds no bucket when every computer is assigned', () => {
    const rollups = rollUpProjects(projects, [box('a', { projectId: 'p1' })]);
    expect(rollups.some((r) => r.id === UNASSIGNED_PROJECT_ID)).toBe(false);
  });

  it('counts only boxes actually doing something as active', () => {
    const rollups = rollUpProjects(projects, [
      box('a', { projectId: 'p1', status: 'running' }),
      box('b', { projectId: 'p1', status: 'waiting' }),
      box('c', { projectId: 'p1', status: 'idle' }),
      box('d', { projectId: 'p1', status: 'stopped' }),
    ]);
    // `waiting` counts: the box is idle but the work is not finished.
    expect(rollups.find((r) => r.id === 'p1')!.activeCount).toBe(2);
  });

  it('reports the soonest expiry across the project', () => {
    const rollups = rollUpProjects(projects, [
      box('a', { projectId: 'p1', stopsInMs: 40 * 60_000 }),
      box('b', { projectId: 'p1', stopsInMs: 4 * 60_000 }),
    ]);
    expect(rollups.find((r) => r.id === 'p1')!.soonestExpiryMs).toBe(4 * 60_000);
  });

  it('is null when nothing reports a deadline, not zero', () => {
    // Zero would render as "expires now", which is the opposite of unknown.
    const rollups = rollUpProjects(projects, [box('a', { projectId: 'p1' })]);
    expect(rollups.find((r) => r.id === 'p1')!.soonestExpiryMs).toBeNull();
  });

  it('sums live spend and tokens across the project', () => {
    const rollups = rollUpProjects(projects, [
      box('a', { projectId: 'p1', spendUsd: 12.5, tokensUsed: 1_000 }),
      box('b', { projectId: 'p1', spendUsd: 7.5, tokensUsed: 2_500 }),
      box('c', { projectId: 'p1' }),
    ]);
    const p1 = rollups.find((r) => r.id === 'p1')!;
    expect(p1.liveSpendUsd).toBe(20);
    expect(p1.liveTokens).toBe(3_500);
  });
});

describe('formatTokens', () => {
  it('reads as scale rather than an exact figure', () => {
    expect(formatTokens(842)).toBe('842');
    expect(formatTokens(8_420)).toBe('8.4k');
    expect(formatTokens(84_200)).toBe('84k');
    expect(formatTokens(1_240_000)).toBe('1.2M');
  });

  it('refuses to invent a number', () => {
    expect(formatTokens(Number.NaN)).toBe('—');
    expect(formatTokens(-5)).toBe('—');
  });
});
