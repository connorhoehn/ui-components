import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { GenerativeImagePreview } from './GenerativeImagePreview';

const RESULT_SRC = 'https://picsum.photos/seed/genpreview/600/400';

const meta = {
  title: 'Image/GenerativeImagePreview',
  component: GenerativeImagePreview,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    status: { control: 'radio', options: ['synthesizing', 'done'] },
  },
} satisfies Meta<typeof GenerativeImagePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Synthesizing: Story = {
  args: {
    status: 'synthesizing',
    className: 'w-48 h-32',
  },
};

export const SynthesizingWithElapsed: Story = {
  args: {
    status: 'synthesizing',
    startedAt: Date.now() - 12_000,
    className: 'w-48 h-32',
  },
};

export const Done: Story = {
  args: {
    status: 'done',
    src: RESULT_SRC,
    alt: 'Generated result',
    className: 'w-48 h-32',
  },
};

// Toggling demo: synthesizing for a few seconds, then the artifact "lands"
// and the blur-up reveal plays. Restart with the button.
function TogglingDemo() {
  const [runId, setRunId] = useState(0);
  const [status, setStatus] = useState<'synthesizing' | 'done'>('synthesizing');
  const [startedAt, setStartedAt] = useState(() => Date.now());

  useEffect(() => {
    setStatus('synthesizing');
    setStartedAt(Date.now());
    const id = setTimeout(() => setStatus('done'), 4000);
    return () => clearTimeout(id);
  }, [runId]);

  return (
    <div className="flex flex-col items-center gap-3">
      <GenerativeImagePreview
        status={status}
        src={`https://picsum.photos/seed/genpreview-${runId}/600/400`}
        alt="Generated result"
        startedAt={startedAt}
        className="w-48 h-32"
      />
      <button
        type="button"
        className="rounded-md border border-border-emphasis px-3 py-1.5 text-sm cursor-pointer"
        onClick={() => setRunId((n) => n + 1)}
      >
        {status === 'synthesizing' ? 'Synthesizing… (lands in 4s)' : 'Run again'}
      </button>
    </div>
  );
}

export const SynthesizingToDone: StoryObj = {
  render: () => <TogglingDemo />,
};

export const NodeBodySize: Story = {
  args: {
    status: 'synthesizing',
    startedAt: Date.now() - 3_000,
    // GenerateNode body footprint (200px card)
    className: 'w-24 h-16',
  },
};
