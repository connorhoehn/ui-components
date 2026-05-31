import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RecordingList, type RecordingListItem } from './RecordingList';
import { PageHeader } from '../shared/PageHeader';
import { Button } from '../ui/Button';

const meta = {
  title: 'Video/RecordingList',
  component: RecordingList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <PageHeader
          title="Recordings"
          description="Past calls in this room. Click a row to play back."
        />
        <div className="mt-4">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof RecordingList>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseRecordings: RecordingListItem[] = [
  {
    id: 'r1',
    label: 'Team standup',
    startIso: '2026-05-30T15:30:00Z',
    endIso: '2026-05-30T15:48:00Z',
    durationSec: 1080,
    participantCount: 5,
    thumbnailUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"><rect width="16" height="9" fill="%2310b981"/></svg>',
  },
  {
    id: 'r2',
    label: 'Customer review — ACME',
    startIso: '2026-05-29T20:00:00Z',
    endIso: '2026-05-29T20:52:00Z',
    durationSec: 3120,
    participantCount: 3,
  },
  {
    id: 'r3',
    startIso: '2026-05-28T11:00:00Z',
    endIso: '2026-05-28T11:03:30Z',
    durationSec: 210,
  },
];

export const Populated: Story = {
  args: {
    recordings: baseRecordings,
    onSelect: () => {},
  },
};

export const PopulatedWithSelection: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string | undefined>('r2');
    return (
      <RecordingList
        {...args}
        selectedId={selected}
        onSelect={(id) => setSelected(id)}
      />
    );
  },
  args: {
    recordings: baseRecordings,
    onSelect: () => {},
  },
};

export const WithRowActions: Story = {
  args: {
    recordings: baseRecordings,
    onSelect: () => {},
    renderActions: (item) => (
      <>
        <Button variant="secondary" size="sm" onClick={() => console.log('download', item.id)}>
          Download
        </Button>
        <Button variant="secondary" size="sm" onClick={() => console.log('share', item.id)}>
          Share
        </Button>
      </>
    ),
  },
};

export const ProcessingAndFailed: Story = {
  args: {
    recordings: [
      { ...baseRecordings[0]!, status: 'ready' },
      { ...baseRecordings[1]!, status: 'processing' },
      { ...baseRecordings[2]!, status: 'failed' },
    ],
    onSelect: () => {},
  },
};

export const Loading: Story = {
  args: {
    recordings: [],
    loading: true,
    onSelect: () => {},
  },
};

export const Empty: Story = {
  args: {
    recordings: [],
    onSelect: () => {},
  },
};

export const EmptyCustom: Story = {
  args: {
    recordings: [],
    onSelect: () => {},
    emptyState: (
      <div>
        <div className="text-sm text-[var(--color-text-primary)] font-medium mb-1">
          No recordings yet
        </div>
        <div className="text-xs text-[var(--color-text-secondary)]">
          Recordings of any call in this room will show up here.
        </div>
      </div>
    ),
  },
};
