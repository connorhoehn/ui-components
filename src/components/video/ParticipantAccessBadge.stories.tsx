import type { Meta, StoryObj } from '@storybook/react-vite';
import { ParticipantAccessBadge } from './ParticipantAccessBadge';

const meta = {
  title: 'Video/ParticipantAccessBadge',
  component: ParticipantAccessBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ParticipantAccessBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A roster row's chip: the eye and "View only", the meaning as its tooltip. */
export const ViewOnly: Story = { args: { access: 'view-only' } };
export const Medium: Story = { args: { access: 'view-only', size: 'md' } };
/** On a video tile or dark call chrome. */
export const OnATile: Story = {
  args: { access: 'view-only', tone: 'overlay' },
  decorators: [(Story) => <div className="rounded bg-video-tile p-3"><Story /></div>],
};
/** The eye alone, as in a tile's name strip: "View only" is its accessible name. */
export const IconOnly: Story = {
  args: { access: 'view-only', tone: 'overlay', iconOnly: true },
  decorators: [(Story) => <div className="rounded bg-video-tile p-3"><Story /></div>],
};
