import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecordingRow } from './RecordingRow';
import { Button } from '../ui/Button';

const meta = {
  title: 'Video/RecordingRow',
  component: RecordingRow,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RecordingRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  id: 'rec-1',
  startIso: '2026-05-30T15:30:00Z',
  endIso: '2026-05-30T15:48:00Z',
  durationSec: 1080,
  participantCount: 5,
  label: 'Team standup',
  thumbnailUrl:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"><rect width="16" height="9" fill="%2310b981"/></svg>',
  onClick: () => {},
};

export const Default: Story = { args: baseArgs };

export const Selected: Story = { args: { ...baseArgs, selected: true } };

export const NoThumbnail: Story = {
  args: { ...baseArgs, thumbnailUrl: undefined },
};

export const NoLabel: Story = { args: { ...baseArgs, label: undefined } };

export const Processing: Story = { args: { ...baseArgs, status: 'processing' } };

export const Failed: Story = { args: { ...baseArgs, status: 'failed' } };

export const WithActions: Story = {
  args: {
    ...baseArgs,
    actions: (
      <>
        <Button variant="secondary" size="sm">Download</Button>
        <Button variant="secondary" size="sm">Share</Button>
      </>
    ),
  },
};

export const NonInteractive: Story = {
  args: { ...baseArgs, onClick: undefined },
};
