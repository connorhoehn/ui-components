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
