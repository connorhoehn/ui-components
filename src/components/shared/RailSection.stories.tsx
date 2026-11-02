import type { Meta, StoryObj } from '@storybook/react-vite';
import { RailSection } from './RailLayout';
import { Avatar } from './Avatar';
import { Inline } from '../ui/Stack';

const meta = { title: 'Shared/RailSection', component: RailSection, parameters: { layout: 'padded' } } satisfies Meta<typeof RailSection>;
export default meta;
type Story = StoryObj<typeof meta>;

/** A standalone section in the shell's information pane uses the pane's inset. */
export const InformationPane: Story = {
  args: { title: 'People', variant: 'plain', children: <Inline gap="sm"><Avatar name="Nora DaSilva" size={24} /><span>Nora DaSilva · Owner</span></Inline> },
  decorators: [Story => <aside className="w-80 max-w-full p-4 bg-surface"><Story /></aside>],
};
