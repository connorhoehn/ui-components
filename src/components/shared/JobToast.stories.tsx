import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast } from './ToastProvider';
import { JobToast } from './JobToast';
import { Button } from '../ui/Button';

function Demo({ fail }: { fail?: boolean }) {
  const { toastJob } = useToast();
  const [step, setStep] = useState(0);
  const base = { id: 'sweep-1', title: 'Nightly sweep' };
  const next = () => {
    const n = step + 1;
    setStep(n);
    if (n === 1) toastJob({ ...base, state: 'queued', detail: 'Waiting for a worker' });
    else if (n === 2) toastJob({ ...base, state: 'running', progress: 45, detail: '45 of 100 repos' });
    else if (fail) toastJob({ ...base, state: 'failed', detail: 'Worker lost contact' });
    else toastJob({ ...base, state: 'done', href: '#run', hrefLabel: 'Open run', detail: '100 repos scanned' });
    if (n >= 3) setStep(0);
  };
  return (
    <div className="p-8">
      <Button size="sm" onClick={next}>Advance job ({['queue', 'run', fail ? 'fail' : 'finish'][step]})</Button>
    </div>
  );
}

const meta = {
  title: 'Shared/JobToast',
  component: JobToast,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof JobToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const QueuedRunningDoneWithLink: Story = {
  args: { id: 'sweep-1', title: 'Nightly sweep', state: 'running', onDismiss: () => {} },
  render: () => <ToastProvider><Demo /></ToastProvider>,
};

export const Failed: Story = {
  args: { id: 'sweep-1', title: 'Nightly sweep', state: 'running', onDismiss: () => {} },
  render: () => <ToastProvider><Demo fail /></ToastProvider>,
};
