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
  args: { open: true, kind: 'both', startedBy: 'Digisha Prakashchandra Jain', privacyHref: '#privacy', placement: 'inline', onDismiss: () => {} },
};
export const RecordingOnly: Story = {
  args: { open: true, kind: 'recording', placement: 'inline', onDismiss: () => {} },
};
