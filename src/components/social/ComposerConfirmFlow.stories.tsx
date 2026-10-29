import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ComposerConfirmFlow } from './ComposerConfirmFlow';

const meta: Meta<typeof ComposerConfirmFlow> = {
  title: 'Social/ComposerConfirmFlow',
  component: ComposerConfirmFlow,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="max-w-[720px] rounded-lg border border-border bg-surface px-3 py-2.5"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof ComposerConfirmFlow>;

const PATH = { steps: ['Choose', 'Draft request', 'Confirm', 'Done'], current: 1 };
const MESSAGE = 'Sienna, please grant Nora a sprint envelope for ORG-OBS-11 on Observability Platform. The estimated run cost is $0.03–$0.30.';

/**
 * The approved flow on its own: Enter reviews the edited message, Enter again
 * confirms, Done shows after the host resolves (600 ms here). Type "decline"
 * anywhere in the message to see the inline error keep the review.
 */
export const BudgetRequest: Story = {
  render: function BudgetRequestStory() {
    const [log, setLog] = useState<string[]>([]);
    return (
      <ComposerConfirmFlow
        key={log.length}
        title="Request more budget"
        recipient="To Sienna Garcia · ORG-OBS-11"
        defaultMessage={MESSAGE}
        reviewTitle="Confirm budget request"
        note="Story preview — nothing is sent."
        doneTitle="Request confirmed"
        doneActionLabel="Back to preparation"
        path={PATH}
        onConfirm={async (message) => {
          await new Promise((r) => setTimeout(r, 600));
          if (/decline/i.test(message)) return { error: 'Sienna cannot be reached right now.' };
          return { receipt: `Request sent to Sienna Garcia · ${message.length} characters` };
        }}
        onCancel={() => setLog((l) => [...l, 'cancelled'])}
        onDone={() => setLog((l) => [...l, 'done'])}
      />
    );
  },
};

/** No heading of its own: the frame around it already names the request. */
export const Headless: Story = {
  args: {
    recipient: 'To Sienna Garcia · ORG-OBS-11',
    defaultMessage: MESSAGE,
    onConfirm: () => ({ receipt: 'Sent.' }),
    autoFocus: false,
  },
};
