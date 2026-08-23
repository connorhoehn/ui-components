import type { Meta, StoryObj } from '@storybook/react-vite';
import DashboardKPIStrip from './DashboardKPIStrip';

// The strip is deliberately dumb: the dashboard passes either a number or the
// em-dash string for every KPI, because a bridge-sourced `null` must never be
// rendered as a zero. Both shapes get a story.
const EM_DASH = '—';

const meta = {
  title: 'Observability/DashboardKPIStrip',
  component: DashboardKPIStrip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    runsToday: 1284,
    runsSparkline: [4, 9, 6, 12, 8, 15, 11, 18],
    activeNow: 7,
    pendingApprovals: 2,
    failed24h: 13,
    avgFirstTokenLatency: '412 ms',
    onScrollToActive: () => {},
    onGoToPipelines: () => {},
    onGoToFailedEvents: () => {},
  },
} satisfies Meta<typeof DashboardKPIStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Bridge is wired and reporting every field. */
export const LiveNumbers: Story = {};

/**
 * Bridge reachable but the fields aren't exposed yet — every KPI collapses to
 * an em-dash and the deltas suppress themselves rather than showing a stale
 * "▲ 12%" beside a dash.
 */
export const NoDataFromBridge: Story = {
  args: {
    runsToday: EM_DASH,
    runsSparkline: [],
    activeNow: EM_DASH,
    pendingApprovals: EM_DASH,
    failed24h: EM_DASH,
    avgFirstTokenLatency: EM_DASH,
  },
};

/** A genuinely idle cluster: real zeroes, not unknowns. */
export const IdleCluster: Story = {
  args: {
    runsToday: 0,
    runsSparkline: [0, 0, 0, 0, 0, 0, 0, 0],
    activeNow: 0,
    pendingApprovals: 0,
    failed24h: 0,
    avgFirstTokenLatency: EM_DASH,
  },
};

/** Mixed: run counters live, latency still unavailable. */
export const PartialBridge: Story = {
  args: {
    runsToday: 342,
    activeNow: 3,
    pendingApprovals: EM_DASH,
    failed24h: 0,
    avgFirstTokenLatency: EM_DASH,
  },
};
