import type { Meta, StoryObj } from '@storybook/react-vite';
import MetricTimeSeriesPanel from './MetricTimeSeriesPanel';
import type { LineSeries } from '../../shared/Chart';
import { toneVar } from '../../shared/tones';

// ---------------------------------------------------------------------------
// Deterministic seed data — the panel is a pure presentation shell, so the
// story supplies exactly what MetricsPage supplies (seeded fixture series plus
// an optional live overlay).
// ---------------------------------------------------------------------------

const POINTS = 30;

function series(label: string, base: number, amp: number, phase: number, color: string): LineSeries {
  return {
    label,
    color,
    data: Array.from({ length: POINTS }, (_, i) => ({
      x: i,
      y: Math.max(0, base + Math.sin((i + phase) / 3.5) * amp),
    })),
  };
}

const seeds = {
  runsPerMinute: [series('runs', 18, 7, 0, toneVar('info'))],
  stepDuration: [
    series('p50', 120, 20, 0, toneVar('success')),
    series('p95', 460, 90, 2, toneVar('warning')),
    series('p99', 890, 180, 4, toneVar('danger')),
  ],
  llmTokens: [
    series('in', 2400, 600, 0, toneVar('info')),
    series('out', 900, 220, 3, toneVar('accent')),
  ],
  llmCost: [series('usd', 1.4, 0.5, 1, toneVar('caution'))],
  clusterCpu: [
    series('node-0', 34, 10, 0, toneVar('info')),
    series('node-1', 51, 14, 5, toneVar('warning')),
  ],
  clusterMemory: [series('rss', 720, 120, 2, toneVar('accent'))],
  eventRate: [series('events/s', 42, 12, 0, toneVar('info'))],
  activeRuns: [series('active', 6, 3, 0, toneVar('success'))],
  failureRate: [
    { x: 'HTTP_502', total: 14 },
    { x: 'TIMEOUT', total: 9 },
    { x: 'VALIDATION', total: 5 },
    { x: 'LLM_REFUSAL', total: 2 },
  ] as Array<Record<string, unknown>>,
  approvalLatency: [series('seconds', 240, 80, 1, toneVar('caution'))],
};

const meta = {
  title: 'Observability/MetricTimeSeriesPanel',
  component: MetricTimeSeriesPanel,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    seeds,
    liveSeries: null,
    cols: 2,
    isLiveData: false,
    failedColor: toneVar('danger'),
  },
  argTypes: { cols: { control: 'radio', options: [1, 2, 3] } },
  decorators: [
    (Story) => (
      <div className="h-[720px] flex flex-col border border-border rounded-md overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MetricTimeSeriesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Backend unreachable: seeded fixture series, and the header badge says
 * "fixture" so nobody mistakes the shape of the data for real traffic.
 */
export const FixtureData: Story = {};

/**
 * Live overlay — four of the ten panels swap to the streamed series and the
 * badge flips to "live". The other six stay on seeds because the bridge does
 * not expose them yet.
 */
export const LiveData: Story = {
  args: {
    isLiveData: true,
    liveSeries: {
      activeRuns: [series('active', 11, 4, 6, toneVar('success'))],
      llmTokens: [series('in', 3900, 800, 2, toneVar('info'))],
      llmCost: [series('usd', 2.6, 0.7, 4, toneVar('caution'))],
      runsPerMinute: [series('runs', 27, 9, 3, toneVar('info'))],
    },
  },
};

/** Narrow viewport / sidebar layout. */
export const SingleColumn: Story = { args: { cols: 1 } };

/** Both host-wired toolbar buttons present; they render only when passed. */
export const WithHostActions: Story = {
  args: { cols: 3, onResetZoom: () => {}, onExportCsv: () => {} },
};
