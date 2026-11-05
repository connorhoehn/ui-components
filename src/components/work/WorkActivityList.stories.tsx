import type { Meta, StoryObj } from '@storybook/react-vite';
import { WorkActivityList } from './WorkActivityList';

const meta: Meta<typeof WorkActivityList> = { title: 'Work/WorkActivityList', component: WorkActivityList };
export default meta;

const NOW = Date.parse('2026-09-23T12:00:00Z');
const HOUR = 3_600_000;

export const Default: StoryObj<typeof WorkActivityList> = {
  args: {
    now: NOW,
    events: [
      { id: 'e1', kind: 'status', at: NOW - 50 * HOUR, text: 'Status changed from Open to In progress', actor: 'Layla Hassan' },
      { id: 'e2', kind: 'run', at: NOW - 30 * HOUR, text: 'Agent run finished without a captured change', detail: '$0.18', openLabel: 'Open run', onOpen: () => {} },
      { id: 'e3', kind: 'estimate', at: NOW - 49 * HOUR, text: 'Estimate recorded on Haiku: $0.03 – $0.30', actor: 'Eli Garcia' },
      { id: 'e4', kind: 'comment', at: NOW - 2 * HOUR, text: 'Commented', actor: 'Nora DaSilva' },
    ],
  },
};
export const Empty: StoryObj<typeof WorkActivityList> = { args: { events: [] } };
export const Failed: StoryObj<typeof WorkActivityList> = { args: { events: [], error: 'History could not be read' } };

/** A worker's recorded history: heartbeats hidden, progress pings collapsed, five rows then "Show N more". */
export const CompactWorkerHistory: StoryObj<typeof WorkActivityList> = {
  args: {
    now: NOW,
    title: 'Recorded events',
    isLowSignal: (e) => e.text.startsWith('Worker heartbeat'),
    events: [
      ...Array.from({ length: 12 }, (_, i) => ({ id: `hb${i}`, kind: 'system' as const, at: NOW - 26 * HOUR - i * 60_000, text: 'Worker heartbeat · definition recorded' })),
      ...Array.from({ length: 7 }, (_, i) => ({ id: `pg${i}`, kind: 'system' as const, at: NOW - 25 * HOUR - i * 60_000, text: 'Worker progress · definition recorded' })),
      { id: 'st', kind: 'status', at: NOW - 24 * HOUR, text: 'Worker started' },
      { id: 'cl', kind: 'run', at: NOW - 30 * HOUR, text: 'Job claimed' },
      { id: 'q', kind: 'system', at: NOW - 31 * HOUR, text: 'Definition saved' },
      { id: 'r1', kind: 'comment', at: NOW - 32 * HOUR, text: 'Revised constraints', actor: 'Connor' },
      { id: 'r2', kind: 'comment', at: NOW - 33 * HOUR, text: 'Added acceptance criteria', actor: 'Connor' },
      { id: 'cr', kind: 'system', at: NOW - 40 * HOUR, text: 'Definition created' },
    ],
  },
};
