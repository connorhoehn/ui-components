import type { Meta, StoryObj } from '@storybook/react-vite';
import { PeopleGraph, type GraphPerson } from './PeopleGraph';

// No external avatar URLs — the initials fallback carries the look.
const PEOPLE: GraphPerson[] = [
  { id: 'grace', name: 'Grace Hopper', title: 'Staff engineer', tags: ['kubernetes', 'go'], score: 0.92 },
  { id: 'bob', name: 'Bob Martinez', title: 'SRE', tags: ['kubernetes', 'terraform'], score: 0.81 },
  { id: 'nora', name: 'Nora DaSilva', title: 'Platform', tags: ['helm', 'kubernetes'], score: 0.66 },
  { id: 'hank', name: 'Hank Anderson', title: 'Backend', tags: ['helm'], score: 0.41 },
  { id: 'ada', name: 'Ada Lovelace', title: 'Networking', tags: ['istio', 'envoy'], score: 0.55 },
];

const meta: Meta<typeof PeopleGraph> = {
  title: 'Graph/PeopleGraph',
  component: PeopleGraph,
  tags: ['autodocs'],
  args: {
    people: PEOPLE,
    query: 'kubernetes experts',
    onOpenPerson: (id) => console.log('open', id),
    onMessagePerson: (id) => console.log('message', id),
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** The chat side pane: ~400px wide, so the list stacks under the graph. */
export const InSidePane: Story = {
  decorators: [(Story) => <div className="h-[640px] w-[400px] overflow-auto border border-border"><Story /></div>],
};

/** Wide enough for the container query to put the list beside the graph. */
export const FullWidth: Story = {
  decorators: [(Story) => <div className="w-[900px]"><Story /></div>],
};

export const Empty: Story = { args: { people: [] } };
