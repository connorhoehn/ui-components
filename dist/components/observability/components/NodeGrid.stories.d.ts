import type { StoryObj } from '@storybook/react-vite';
import NodeGrid from './NodeGrid';
import type { NodeSummary } from './NodeGridTile';
declare const meta: {
    title: string;
    component: typeof NodeGrid;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        nodes: NodeSummary[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const AllHealthy: Story;
/** The status border is the whole point of the tile — one of each. */
export declare const MixedStatus: Story;
/** Selection is host-owned; NodeGrid only reports the clicked id. */
export declare const Selectable: Story;
/** Nothing has joined the cluster yet. */
export declare const NoNodes: Story;
//# sourceMappingURL=NodeGrid.stories.d.ts.map