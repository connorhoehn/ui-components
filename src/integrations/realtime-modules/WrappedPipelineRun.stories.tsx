// src/integrations/realtime-modules/WrappedPipelineRun.stories.tsx
//
// WrappedPipelineRun fed a mocked usePipelineRunStatus() lookup result: the
// running state of concepts §5, a finished run, and the compact one-liner.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { WrappedPipelineRun } from './WrappedPipelineRun';
import type { RMPipelineRunStatus } from './types';
import { SubjectHero } from '../../components/shared/SubjectFrame';
import { Button } from '../../components/ui/Button';

const meta = {
  title: 'Integrations/WrappedPipelineRun',
  component: WrappedPipelineRun,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(S) => <div className="max-w-[720px]"><S /></div>],
} satisfies Meta<typeof WrappedPipelineRun>;

export default meta;
type Story = StoryObj<typeof meta>;

const steps = (current: number): RMPipelineRunStatus['details'] => ({
  startedAt: new Date(Date.now() - 222_000).toISOString(),
  steps: ['Approved', 'Submitted to Meshy', 'Processing', 'Ready for review'].map((label, i) => ({
    id: ['approve', 'submit', 'process', 'review'][i],
    label,
    status: i < current ? 'completed' : i === current ? 'running' : 'pending',
  })),
});

const running: RMPipelineRunStatus = { phase: 'running', stepLabel: 'Generating 3D mesh', details: steps(2) };

/** Concepts §5: the run card while Meshy works. */
export const Running: Story = {
  args: {
    status: running,
    title: 'Mesh generation (Meshy)',
    subtitle: 'Toby · v1.2',
    headerAction: <Button variant="primary" size="sm">Open in Meshy ↗</Button>,
    facts: [
      { label: 'Job ID', value: 'msh_01HF3Q', mono: true },
      { label: 'Model', value: 'meshy-5' },
      { label: 'Preset', value: 'Stylized' },
      { label: 'Topology', value: 'Quad' },
      { label: 'Created', value: '9:03 AM' },
    ],
    stepTimes: { approve: '9:02', submit: '9:03' },
    progress: 68,
    remainingMs: 105_000,
    progressDescription: 'Meshy is generating a stylized mesh from the approved concept. You can continue working while this runs.',
    onRefresh: () => {},
    onCancel: () => new Promise((r) => setTimeout(r, 1000)),
  },
};

/** With the subject's picture beside the steps. */
export const WithPicture: Story = {
  args: {
    ...(Running.args as object),
    picture: <SubjectHero content={{ kind: 'image', src: 'https://picsum.photos/seed/toby-approved/900/1200', label: 'Approved concept · v2' }} aspect="portrait" />,
  } as Story['args'],
};

export const ReadyForReview: Story = {
  args: {
    status: { phase: 'awaiting_approval', detail: 'The mesh is ready. Open it to approve or ask for another.', details: steps(3) },
    title: 'Mesh generation (Meshy)',
    headerAction: <Button variant="primary" size="sm">Open run</Button>,
  },
};

export const Failed: Story = {
  args: { status: { phase: 'failed', detail: 'Meshy refused the image: it is under 512 px.' }, title: 'Mesh generation (Meshy)' },
};

/** A narrow inspector: one line, Cancel in place, Open run. */
export const Compact: Story = {
  args: { status: running, title: 'Mesh generation', subject: 'Drawing Mina', compact: true, onCancel: () => {}, onOpenRun: () => {} },
  decorators: [(S) => <div className="max-w-[360px]"><S /></div>],
};
