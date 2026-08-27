// One org's nav tree, shared by all four layout demos so the depth story is
// continuous: the shallow demo shows level 1, the deep demo shows the same
// tree three levels in. Modelled on a real SDLC/observability console rather
// than "Item 1 / Item 2" — the overflow and truncation behaviour only reads as
// a problem when the labels are long enough to actually collide.

import type { NavRailItem } from '../../../../src/components/shared';

export const PLATFORM_ITEMS: NavRailItem[] = [
  { to: '/work', label: 'Work', badge: 4, hint: 'What needs you', group: 'Build' },
  { to: '/initiatives', label: 'Initiatives', group: 'Build' },
  { to: '/codebases', label: 'Codebases', group: 'Build' },
  { to: '/computers', label: 'Computers', hint: 'microVM fleet', group: 'Build' },
  { to: '/health', label: 'Health', badge: 2, group: 'Operate' },
  { to: '/knowledge', label: 'Knowledge', group: 'Operate' },
  { to: '/capabilities', label: 'Capabilities', group: 'Operate' },
  { to: '/identity', label: 'Identity', group: 'System' },
  { to: '/settings', label: 'Settings', group: 'System' },
];

export const HEALTH_ITEMS: NavRailItem[] = [
  { to: '/health/summary', label: 'Summary', hint: 'What is on fire', group: 'Start here' },
  { to: '/health/runs', label: 'Runs', badge: 128, group: 'Start here' },
  { to: '/health/harness', label: 'Harness', hint: 'Offline eval suites', group: 'Start here' },
  { to: '/health/cost', label: 'Cost', group: 'Advanced' },
  { to: '/health/drift', label: 'Drift', group: 'Advanced' },
  { to: '/health/calibration', label: 'Calibration', group: 'Advanced' },
];

export const HARNESS_ITEMS: NavRailItem[] = [
  { to: '/health/harness', label: 'Overview' },
  { to: '/health/harness/runs', label: 'Runs' },
  { to: '/health/harness/compare', label: 'Compare runs' },
  { to: '/health/harness/rubrics', label: 'Rubrics' },
];

export const FLEET_ITEMS: NavRailItem[] = [
  { to: '/box/4f2a', label: 'box-4f2a', hint: 'pytest -q', group: 'Running' },
  { to: '/box/9c17', label: 'box-9c17', hint: 'claude review', group: 'Running' },
  { to: '/box/1b83', label: 'box-1b83', hint: 'idle 4m', group: 'Idle' },
];

/** Trail for the deepest route, long enough to need the overflow menu. */
export const DEEP_TRAIL = [
  { label: 'Operate' },
  { label: 'Health', href: '#/health' },
  { label: 'Harness', href: '#/health/harness' },
  { label: 'Runs', href: '#/health/harness/runs' },
  { label: 'nightly-2026-08-24', href: '#/health/harness/runs/nightly' },
  { label: 'Compare with nightly-2026-08-23' },
];

export const ROWS = Array.from({ length: 18 }, (_, i) => ({
  id: `run-${String(4200 + i)}`,
  agent: ['supervisor', 'search', 'scoring', 'advisor'][i % 4],
  latency: `${(0.4 + (i % 7) * 0.31).toFixed(2)}s`,
  verdict: i % 5 === 0 ? 'regressed' : i % 3 === 0 ? 'improved' : 'unchanged',
}));
