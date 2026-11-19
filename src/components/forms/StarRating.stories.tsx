import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StarRating } from './StarRating';

const meta: Meta<typeof StarRating> = {
  title: 'Forms/StarRating',
  component: StarRating,
  args: { label: 'Overall', max: 4, value: 3 },
};
export default meta;

type Story = StoryObj<typeof StarRating>;

export const Interactive: Story = {
  render: (args) => {
    const [v, setV] = useState<number | null>(args.value);
    return <StarRating {...args} value={v} onChange={setV} />;
  },
};
/** A fractional average, spoken as "3.5 of 4 stars". */
export const ReadOnlyAverage: Story = { args: { value: 3.5, readOnly: true } };
export const NotRated: Story = { args: { value: null, readOnly: true } };
