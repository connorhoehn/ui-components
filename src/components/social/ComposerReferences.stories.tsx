import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ComposerReferences } from './ComposerReferences';

const meta: Meta<typeof ComposerReferences> = {
  title: 'Social/ComposerReferences',
  component: ComposerReferences,
  decorators: [(Story) => <div className="max-w-[640px] bg-surface p-4"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof ComposerReferences>;

export const Removable: Story = {
  args: {
    references: [{ id: 'deck', label: 'Sprint review · v2 · Slide 4' }, { id: 'notes', label: 'Planning sync · 08:42' }],
    onRemove: () => {},
  },
};

/** 2.389.0 — the chip is a menu trigger ("This guide ▾"); "No context" replaces the ×. */
export const WithMenu: Story = {
  render: function WithMenuStory() {
    const [ctx, setCtx] = useState('This guide');
    const options = ['This guide', 'This guide + sources', 'No context'];
    return (
      <ComposerReferences
        size="md"
        references={[{
          id: 'guide',
          label: ctx,
          menu: [{ items: options.map((o) => ({ label: o, active: o === ctx, onSelect: () => setCtx(o) })) }],
        }]}
      />
    );
  },
};
