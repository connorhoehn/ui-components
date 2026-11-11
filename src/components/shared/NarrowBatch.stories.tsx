// The narrow batch (2.518.0) at a phone's width: the scenes the Storybook
// check tests/storybook/narrow-batch.spec.ts measures at 390px.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatStrip } from './StatStrip';
import { DataTable, type DataTableColumn } from './DataTable';
import { Stack } from '../ui/Stack';
import { T } from './Text';
import { ContextComposer } from '../social/ContextComposer';
import { VoiceDock } from '../voice/VoiceDock';

const noop = () => {};

const meta = {
  title: 'Checks/Narrow batch',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

/** The initiative header's line: no wrapped line starts or ends with "•"; the bar wraps under its label. */
export const StatsLine: Story = {
  render: () => (
    <Stack gap="md" className="bg-surface p-4">
      <StatStrip
        variant="line"
        size="sm"
        aria-label="Initiative progress"
        data-testid="narrow-stats"
        items={[
          { label: '/ 31 points delivered', value: '16', progress: { value: 16, max: 31 } },
          { label: 'agent running', value: '1' },
          { label: 'of $75 spent', value: '$7.76' },
        ]}
      />
    </Stack>
  ),
};

const workflows = [
  { id: 'unblock', label: 'Unblock this item', description: 'Plan the next step from what it waits on' },
  { id: 'deck', label: 'Presentation deck', description: 'Draft a deck that cites this page' },
];

/** The work item's composer at rest at 390: Workflow is its own ⋯ on the idle row. */
export const ComposerIdle: Story = {
  render: () => (
    <Stack gap="none" className="min-h-screen justify-end bg-workspace p-4">
      <ContextComposer
        context={{ kind: 'work-item', id: 'w-1', title: 'Tenant-by-tenant cutover' }}
        workflows={workflows}
        onSend={() => true}
        composerTestId="narrow-composer"
      />
    </Stack>
  ),
};

/** A confirmation at phone width: a sheet above the footer, the page above still readable and scrollable. */
export const VoiceSheet: Story = {
  render: () => (
    <Stack gap="none" className="h-screen bg-surface">
      <Stack gap="sm" className="min-h-0 flex-1 overflow-y-auto p-4" data-testid="narrow-page">
        {Array.from({ length: 14 }, (_, i) => (
          <T key={i} size="sm" data-testid={`narrow-page-line-${i}`}>
            Decision {i + 1}: cutover order for legacy SSO tenants — riskiest two first, while the shim is warm.
          </T>
        ))}
      </Stack>
      <Stack as="footer" gap="none" className="shrink-0 border-t border-border bg-surface py-2" data-testid="narrow-footer">
        <T size="xs" tone="secondary" className="px-4">Social · 1 online</T>
        <VoiceDock
          size="footer"
          phase="confirming"
          level={0.2}
          outputLevel={0}
          elapsedSeconds={61}
          onStart={noop}
          onStop={noop}
          pending={{
            title: 'Resolve "Cutover order for legacy SSO tenants"',
            detail: 'It is escalated; Sienna Garcia decides. Option 2: Riskiest two tenants first.',
            noteLabel: 'Why (optional)',
            onConfirm: noop,
            onCancel: noop,
          }}
        />
      </Stack>
    </Stack>
  ),
};

interface DecisionRow { id: string; title: string; initiative: string }
const decisionRows: DecisionRow[] = [
  { id: 'd1', title: 'Cutover order for legacy SSO tenants, riskiest two first while the shim is still warm', initiative: 'Auth Migration' },
  { id: 'd2', title: 'Judge model for canary evaluation', initiative: 'LLM Application Platform' },
];
const decisionColumns: DataTableColumn<DecisionRow>[] = [
  { key: 'title', header: 'Decision', truncate: true, wrap: 'two-lines', getFilterText: (r) => r.title, render: (r) => <a href={`#${r.id}`}>{r.title}</a> },
  { key: 'initiative', header: 'Initiative', width: '9rem' },
];

/** Decision titles wrap to two lines, then clamp; focus or hover shows the whole title. */
export const TableTwoLines: Story = {
  render: () => (
    <Stack gap="none" className="bg-surface p-4">
      <DataTable data={decisionRows} columns={decisionColumns} keyField={(r) => r.id} staticRows="narrow-batch" data-testid="narrow-table" />
    </Stack>
  ),
};
