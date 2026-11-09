import type { Meta, StoryObj } from '@storybook/react-vite';
import { CaptionedAvatar } from './CaptionedAvatar';
import { StatusPill } from './StatusPill';
import { Inline } from '../ui/Stack';

const meta = {
  title: 'Shared/CaptionedAvatar',
  component: CaptionedAvatar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CaptionedAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { name: 'Mina', role: 'Lead', src: 'https://picsum.photos/seed/mina/200/200' } };

/** Concepts §1: the Cast card's row. Each card opens its subject. */
export const CastRow: Story = {
  args: { name: 'Mina' },
  render: () => (
    <Inline gap="sm" wrap>
      <CaptionedAvatar name="Mina" role="Lead" src="https://picsum.photos/seed/mina/200/200" onClick={() => {}} selected />
      <CaptionedAvatar name="Toby" role="Candidate" onClick={() => {}} meta={<StatusPill size="sm" state="warning" label="In review" />} />
      <CaptionedAvatar name="Grandpa Ledger" role="Supporting" href="#/assets/characters/ledger" />
      <CaptionedAvatar name="Pip" role="Extra" onClick={() => {}} />
    </Inline>
  ),
};
