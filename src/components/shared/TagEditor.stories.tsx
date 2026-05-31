import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import TagEditor from './TagEditor';

const meta = {
  title: 'Shared/TagEditor',
  component: TagEditor,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TagEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

function Harness({ initial, suggestions, lowercase }: {
  initial: string[];
  suggestions?: string[];
  lowercase?: boolean;
}) {
  const [tags, setTags] = useState<string[]>(initial);
  return (
    <div className="max-w-md">
      <TagEditor value={tags} onChange={setTags} suggestions={suggestions} lowercase={lowercase} />
      <div className="mt-2 text-xs text-slate-500">value: [{tags.join(', ')}]</div>
    </div>
  );
}

export const Empty: Story = {
  args: { value: [], onChange: () => {} },
  render: () => <Harness initial={[]} />,
};

export const WithSeed: Story = {
  args: { value: ['etl', 'realtime'], onChange: () => {} },
  render: () => <Harness initial={['etl', 'realtime']} />,
};

export const WithSuggestions: Story = {
  args: { value: ['etl'], onChange: () => {}, suggestions: ['etl', 'batch', 'streaming', 'critical', 'archive'] },
  render: () => <Harness initial={['etl']} suggestions={['etl', 'batch', 'streaming', 'critical', 'archive']} />,
};

export const CaseSensitive: Story = {
  name: 'Case-sensitive (lowercase=false)',
  args: { value: ['ViewSalary'], onChange: () => {}, lowercase: false },
  render: () => <Harness initial={['ViewSalary']} lowercase={false} />,
};
