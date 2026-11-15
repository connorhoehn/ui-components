import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecordingConsentNotice } from './RecordingConsentNotice';

const meta = {
  title: 'Video/RecordingConsentNotice',
  component: RecordingConsentNotice,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof RecordingConsentNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RecordingAndTranscription: Story = {
  args: { open: true, kind: 'both', startedBy: 'Rowan Ellery-Castellanos', privacyHref: '#privacy', placement: 'inline', onDismiss: () => {} },
};
export const RecordingOnly: Story = {
  args: { open: true, kind: 'recording', placement: 'inline', onDismiss: () => {} },
};
/** The banner's default form, floating over the stage, unchanged. */
export const Overlay: Story = {
  args: { open: true, kind: 'recording', onDismiss: () => {} },
  render: (args) => <div className="relative h-40 w-[36rem] rounded-lg bg-video-stage"><RecordingConsentNotice {...args} /></div>,
};
/** 2.529.0: no line of its own — a red dot for a call's meta line; focus or hover it for the sentence. */
export const Indicator: Story = {
  args: { open: true, kind: 'recording', placement: 'indicator' },
  render: (args) => (
    <span className="inline-flex items-center gap-1.5 text-sm tabular-nums text-text-tertiary">3 people · 00:53 <RecordingConsentNotice {...args} /></span>
  ),
};

