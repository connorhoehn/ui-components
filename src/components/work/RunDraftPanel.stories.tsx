import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RunDraftPanel, type RunDraftPanelProps } from './RunDraftPanel';
import { AgentTaskCard } from '../layout/AgentTaskCard';
import { Button } from '../ui/Button';
import { BranchIcon } from '../ui/Icons';
import { Checkbox } from '../forms/Checkbox';
import { FileKindMark } from '../shared/FileKindMark';

const AGENTS = [
  { value: 'implementation', label: 'Implementation agent' },
  { value: 'review', label: 'Review agent' },
];
const MODELS = [
  { value: 'haiku', label: 'Haiku' },
  { value: 'sonnet', label: 'Sonnet' },
  { value: 'opus', label: 'Opus' },
];
// Illustrative list price per million tokens for the story's derived line.
const PRICE: Record<string, number> = { haiku: 1, sonnet: 3, opus: 15 };

/** Stateful harness so the selects and the budget input actually change. */
function Harness(props: Partial<RunDraftPanelProps>) {
  const [agent, setAgent] = useState('implementation');
  const [model, setModel] = useState('haiku');
  const [tokens, setTokens] = useState<number | null>(300_000);
  const [approve, setApprove] = useState(true);
  const modelLabel = MODELS.find((m) => m.value === model)?.label;
  return (
    <div className="w-[390px] border border-border">
      <RunDraftPanel
        status="no-draft"
        target={{ mark: <BranchIcon size={22} />, title: 'Migration plan', subtitle: 'For this work item' }}
        fields={[
          { id: 'agent', label: 'Agent', value: agent, options: AGENTS, onChange: setAgent },
          { id: 'model', label: 'Model', value: model, options: MODELS, onChange: setModel },
        ]}
        cost={{ kind: 'range', low: 0.03, high: 0.3, unit: 'usd' }}
        duration={{ kind: 'range', low: 60_000, high: 360_000, unit: 'ms' }}
        confidence={{ sampleSize: 2 }}
        budget={{ tokens, onChange: setTokens, usdPerMillionTokens: PRICE[model], priceLabel: modelLabel }}
        advanced={
          <label className="flex items-center gap-2 text-[13px] text-text-secondary">
            <Checkbox checked={approve} onChange={setApprove} />
            Ask me to approve before edits land
          </label>
        }
        access={{
          tone: 'warning',
          title: 'Edit access required',
          body: 'You can view this item but not dispatch work on it.',
          action: { label: 'Request access', onClick: () => {} },
        }}
        onSave={() => {}}
        onDispatch={() => {}}
        dispatchDisabledReason="Save the draft first"
        {...props}
      />
    </div>
  );
}

const meta = {
  title: 'Work/RunDraftPanel',
  component: Harness,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Harness>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The mockup's pane 4, with honest data: the range is backed by 2 runs. */
export const Mockup: Story = {};

/** A pipeline that has never completed a run shows no numbers at all. */
export const NoPriorRuns: Story = {
  args: {
    status: 'saved',
    cost: { kind: 'none', reason: 'No prior runs' },
    duration: { kind: 'none', reason: 'No prior runs' },
    confidence: { sampleSize: 0 },
    access: null,
    dispatchDisabledReason: undefined,
  },
};

/** After dispatch the live run replaces the form. */
export const Running: Story = {
  args: {
    status: 'running',
    live: (
      <AgentTaskCard
        title="Migration plan"
        status="running"
        phase="Migrating service 2 of 6"
        percent={35}
        startedLabel="Started 2 min ago"
        actions={
          <>
            <Button size="sm" variant="secondary">Stop</Button>
            <Button size="sm" variant="ghost">Open run</Button>
          </>
        }
      />
    ),
  },
};

/** A 403 from the dispatch route, shown verbatim. */
export const DispatchRefused: Story = {
  args: {
    status: 'saved',
    dispatchDisabledReason: undefined,
    error: 'Forbidden: edit access is required to dispatch on this document.',
  },
};

export const Collapsed: Story = { args: { collapsed: true } };

export const Dark: Story = {
  render: (args) => (
    <div data-theme="dark" className="bg-surface p-4">
      <Harness {...args} />
    </div>
  ),
};

/** A stated per-tier prior with no runs yet, and a dollar cap the host enforces. */
export const PriorBracketUsdBudget: Story = {
  args: {
    status: 'no-draft',
    confidence: { sampleSize: 0, basis: 'prior' },
    budget: { unit: 'usd', usd: 0.3, onChange: () => {}, hint: 'Not started if forecast above this' },
  },
};

/** A multi-source run: the documents it will read, one of them restricted to this viewer. */
export const WithSources: Story = {
  args: {
    sources: [
      { id: 'd1', title: 'Release plan', mark: <FileKindMark kind="page" size="sm" />, onOpen: () => {} },
      { id: 'd2', title: 'Q3 planning call — a much longer title that truncates', mark: <FileKindMark kind="page" size="sm" />, onOpen: () => {} },
      { id: 'd3', title: 'Restricted item', restricted: true },
    ],
  },
};
