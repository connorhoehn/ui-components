import type { Meta, StoryObj } from '@storybook/react-vite';
import BaseNode from './BaseNode';
import type { NodeExecutionState } from './BaseNode';
import type { NodeCategory } from './categories';

const meta = {
  title: 'Pipelines/Nodes/BaseNode',
  component: BaseNode,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof BaseNode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { icon: '✦', subtitle: 'Plain node', state: 'idle' },
};

export const WithCategory: Story = {
  args: { icon: '🧠', subtitle: 'LLM step', state: 'running', category: 'ai' },
};

const CATEGORIES: Array<{ category: NodeCategory; icon: string; label: string }> = [
  { category: 'source',    icon: '📷', label: 'Image source' },
  { category: 'transform', icon: '✂️', label: 'Crop' },
  { category: 'ai',        icon: '🧠', label: 'LLM' },
  { category: 'control',   icon: '⑂',  label: 'Condition' },
  { category: 'sink',      icon: '💾', label: 'Save' },
  { category: 'human',     icon: '🙋', label: 'Approval' },
];

const STATES: NodeExecutionState[] = ['idle', 'running', 'completed', 'failed'];

export const CategoryMatrix: StoryObj = {
  name: 'Category × state matrix',
  render: () => (
    <div className="grid grid-cols-[repeat(4,200px)] gap-4">
      {CATEGORIES.flatMap(({ category, icon, label }) =>
        STATES.map((state) => (
          <BaseNode
            key={`${category}-${state}`}
            icon={icon}
            subtitle={`${label} · ${state}`}
            state={state}
            category={category}
          />
        )),
      )}
    </div>
  ),
};

export const CategoryShapes: StoryObj = {
  name: 'Chip shapes (idle)',
  render: () => (
    <div className="flex flex-col gap-3">
      {CATEGORIES.map(({ category, icon, label }) => (
        <BaseNode
          key={category}
          icon={icon}
          subtitle={`${label} (${category})`}
          state="idle"
          category={category}
          body={<span>Chip shape encodes the category.</span>}
        />
      ))}
    </div>
  ),
};

export const BackCompatNoCategory: StoryObj = {
  name: 'No category (back-compat)',
  render: () => (
    <div className="flex flex-col gap-3">
      {STATES.map((state) => (
        <BaseNode key={state} icon="✦" subtitle={`Legacy · ${state}`} state={state} />
      ))}
    </div>
  ),
};
