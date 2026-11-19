import type { Meta, StoryObj } from '@storybook/react';
import { SpokenCaption } from './SpokenCaption';

const meta: Meta<typeof SpokenCaption> = {
  title: 'Video/SpokenCaption',
  component: SpokenCaption,
  args: { speaker: 'Hugo', text: 'Can we walk through the rollout plan?' },
};
export default meta;

type Story = StoryObj<typeof SpokenCaption>;

export const Said: Story = {};
export const Question: Story = { args: { kind: 'question', speaker: 'Milo', speaking: true } };
