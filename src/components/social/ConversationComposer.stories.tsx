import type { Meta, StoryObj } from '@storybook/react-vite';
import { createConversationComposer } from './ConversationComposer';
import type { ComposerPrompt } from './composerPromptModel';

// A local Storybook conversation: answers only update the preview, never a service.
const ConversationComposer = createConversationComposer({ useFileUpload: () => ({ upload: async () => ({ status: 'failed' as const }) }) });
const meta: Meta<typeof ConversationComposer> = {
  title: 'Social/ConversationComposer', component: ConversationComposer,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="w-full max-w-[900px] bg-workspace p-4"><Story /></div>],
  args: {
    context: { kind: 'work-item', id: 'ORG-OBS-11', title: 'Stop duplicate alerts during a dependency outage' },
    capabilities: { maySend: true, agent: { allowed: true } },
    defaultMode: 'agent', defaultDraft: { html: '<p>My unsent discussion draft</p>', files: [] },
    onAgent: () => false,
  },
};
export default meta;
type Story = StoryObj<typeof ConversationComposer>;
export const ModeSelection: Story = { args: { prompts: [], channel: 'storybook:discussion', chat: { sendMessage: () => undefined } } };
const manual: ComposerPrompt = {
  id: 'instruction', title: 'Instruction', eyebrow: 'Prepare job', kind: 'text',
  question: 'What should the agent know?', placeholder: 'Add an instruction…',
  onAnswer: () => ({ receipt: 'Instruction saved in this preview' }),
};
const amount: ComposerPrompt = {
  id: 'amount', title: 'Custom run cap', eyebrow: 'Prepare job', kind: 'number', min: 0,
  question: 'How many dollars can this run spend?', placeholder: 'A dollar amount, e.g. 2.50',
  onAnswer: () => ({ receipt: 'Run cap saved in this preview' }),
};
const cap: ComposerPrompt = {
  id: 'cap', title: 'Run cap', eyebrow: 'Prepare job', kind: 'choice', question: 'Choose a cap for this run.',
  options: [{ id: 'none', label: 'No cap' }, { id: 'high', label: 'Forecast high ($0.30)' }, { id: 'custom', label: 'Custom amount' }],
  onAnswer: a => a.optionId === 'custom' ? { next: amount } : { receipt: 'Run cap selected in this preview' },
};
/** Only numbered answers. Hide restores the unsent draft; the panel has no message toolbar. */
export const ModelChoice: Story = { args: { prompts: [{
  id: 'model', title: 'Model', eyebrow: 'Prepare job', kind: 'choice',
  fields: [{ label: 'Model', value: 'Haiku' }, { label: 'Forecast', value: '$0.03–$0.30 · 1–6 min' }],
  question: 'Which model runs this work item?', defaultOptionId: 'haiku',
  options: [{ id: 'haiku', label: 'Haiku' }, { id: 'sonnet', label: 'Sonnet' }, { id: 'opus', label: 'Opus' }],
  onAnswer: () => ({ receipt: 'Model selected in this preview' }),
}] } };
/** Press 3 to reveal the numeric field; 2 immediately chooses the forecast cap. */
export const CapWithManualFollowUp: Story = { args: { prompts: [cap] } };
export const ManualInstruction: Story = { args: { prompts: [manual] } };
export const ConfirmOnly: Story = { args: { prompts: [{
  id: 'confirm', title: 'Save this estimate?', kind: 'confirm', question: 'Keep these settings for later?',
  onAnswer: () => ({ receipt: 'Estimate saved in this preview' }),
}] } };
