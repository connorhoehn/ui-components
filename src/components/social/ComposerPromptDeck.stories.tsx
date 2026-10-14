import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ComposerPromptDeck } from './ComposerPromptDeck';
import type { ComposerPrompt } from './composerPromptModel';

const meta: Meta<typeof ComposerPromptDeck> = {
  title: 'Social/ComposerPromptDeck',
  component: ComposerPromptDeck,
  decorators: [(Story) => <div className="max-w-[900px] bg-surface p-4"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof ComposerPromptDeck>;

const MODELS = [
  { id: 'haiku', label: 'Haiku 4.5', hint: '$0.10–$0.40' },
  { id: 'sonnet', label: 'Sonnet 4.5', hint: '$0.40–$1.10' },
  { id: 'nova', label: 'Nova Pro', hint: '$0.05–$0.20' },
];

/** A work item's job, derived with no form: one header card, one question; changing a value is its own prompt. */
export const PrepareJob: Story = {
  render: function PrepareJobStory() {
    const [model, setModel] = useState('sonnet');
    const [cap, setCap] = useState<number | null>(null);
    const [editing, setEditing] = useState<'model' | 'cap' | null>(null);
    const [rev, setRev] = useState(0);
    const label = MODELS.find((m) => m.id === model)!.label;
    const dispatch: ComposerPrompt = {
      id: `dispatch:${rev}`, eyebrow: 'Prepare job', title: 'Fix token refresh on idle sessions', kind: 'choice',
      fields: [
        { label: 'Item', value: 'AUTH-12', mono: true },
        { label: 'Codebase', value: 'orgiq/auth-service', mono: true },
        { label: 'Model', value: label },
        { label: 'Run cap', value: cap == null ? 'No cap' : `$${cap.toFixed(2)}` },
        { label: 'Forecast', value: '$0.40–$1.10 · 6–14 min' },
        { label: 'Envelope', value: '$28.00 left of $30.00', tone: 'success' },
      ],
      question: 'Dispatch with these settings?',
      options: [
        { id: 'dispatch', label: 'Dispatch', emphasis: 'primary' },
        { id: 'model', label: 'Change model' },
        { id: 'cap', label: 'Change cap' },
        { id: 'instruction', label: 'Edit instruction' },
      ],
      defaultOptionId: 'dispatch',
      onAnswer: (a) => {
        if (a.optionId === 'model' || a.optionId === 'cap') { setEditing(a.optionId); return; }
        return { receipt: `Dispatched on ${label}` };
      },
    };
    const modelPrompt: ComposerPrompt = {
      id: `model:${rev}`, eyebrow: 'Prepare job', title: 'Model', kind: 'choice', question: 'Which model runs this job?',
      options: MODELS, defaultOptionId: model,
      onAnswer: (a) => { setModel(a.optionId!); setEditing(null); setRev((r) => r + 1); return { receipt: `Model → ${MODELS.find((m) => m.id === a.optionId)!.label}` }; },
    };
    const capPrompt: ComposerPrompt = {
      id: `cap:${rev}`, eyebrow: 'Prepare job', title: 'Run cap', kind: 'number', min: 0, question: 'Cap this run at how many dollars? Type an amount, or pick one.',
      placeholder: 'A dollar amount, e.g. 2.50', options: [{ id: 'none', label: 'No cap' }, { id: 'high', label: 'Forecast high ($1.10)' }], defaultOptionId: 'none',
      onAnswer: (a) => {
        setCap(a.kind === 'number' ? a.value : a.optionId === 'high' ? 1.1 : null); setEditing(null); setRev((r) => r + 1);
      },
    };
    const queue = editing === 'model' ? [modelPrompt] : editing === 'cap' ? [capPrompt] : [dispatch];
    return <ComposerPromptDeck prompts={queue} />;
  },
};

/** A budget gate's follow-up: the gate's reason on the card and its own confirm flag. */
export const ApprovalConfirm: Story = {
  args: {
    prompts: [{
      id: 'gate:envelope', eyebrow: 'Budget gate · confirmOverEnvelope', title: 'Over your sprint envelope', kind: 'confirm',
      fields: [
        { label: 'Envelope', value: '$30.00 on Sprint 14' },
        { label: 'Spent by you', value: '$27.60' },
        { label: 'Left', value: '$2.40', tone: 'warning' },
        { label: 'Forecast', value: '$0.40–$3.10' },
      ],
      question: 'This run may spend past your envelope. Dispatch anyway?',
      options: [{ id: 'confirm', label: 'Dispatch anyway', emphasis: 'danger' }, { id: 'cancel', label: 'Back to the job' }],
      onAnswer: () => ({ receipt: 'Dispatched over the envelope' }),
    }],
  },
};

/** An agent asks; the reader answers in the composer, or pages to the next question. */
export const AgentQuestion: Story = {
  args: {
    prompts: [
      {
        id: 'q1', eyebrow: 'Agent question · Drafter', title: 'Which acceptance criterion is in scope?', kind: 'choice',
        fields: [{ label: 'Item', value: 'AUTH-12', mono: true }, { label: 'Run', value: 'job-8841', mono: true }],
        question: 'Two criteria conflict. Which one should this run satisfy?',
        options: [{ id: 'a', label: 'Refresh before expiry' }, { id: 'b', label: 'Re-auth on 401' }, { id: 'both', label: 'Both, behind a flag' }],
        onAnswer: () => undefined,
      },
      {
        id: 'q2', eyebrow: 'Agent question · Drafter', title: 'Anything else the reviewer should know?', kind: 'text',
        question: 'Type a note for the pull request description, or skip.', placeholder: 'A note for the reviewer…',
        options: [{ id: 'skip', label: 'Skip' }], defaultOptionId: 'skip', onAnswer: () => undefined,
      },
    ],
  },
};

/** A reader sees the setup and why they cannot decide. */
export const ReadOnly: Story = {
  args: {
    prompts: [{
      id: 'view', eyebrow: 'Job setup', title: 'Fix token refresh on idle sessions', kind: 'choice',
      fields: [{ label: 'Model', value: 'Sonnet 4.5' }, { label: 'Forecast', value: 'Needs dispatch rights' }],
      question: 'Dispatch with these settings?', options: [{ id: 'dispatch', label: 'Dispatch' }],
      readOnlyReason: 'An SME with a sprint grant here, or a release manager, authorizes jobs.',
      onAnswer: () => undefined,
    }],
  },
};
