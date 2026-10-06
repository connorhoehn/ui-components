import type { Meta, StoryObj } from '@storybook/react-vite';
import { PeopleGraph } from './PeopleGraph';
declare const meta: Meta<typeof PeopleGraph>;
export default meta;
type Story = StoryObj<typeof meta>;
/** The chat side pane: ~400px wide, so the list stacks under the graph. */
export declare const InSidePane: Story;
/** Wide enough for the container query to put the list beside the graph. */
export declare const FullWidth: Story;
export declare const Empty: Story;
//# sourceMappingURL=PeopleGraph.stories.d.ts.map