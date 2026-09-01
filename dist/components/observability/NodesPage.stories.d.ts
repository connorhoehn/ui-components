import type { StoryObj } from '@storybook/react-vite';
import NodesPage, { type NodesPageProps } from './NodesPage';
import type { NodeSummary } from './components/NodeGridTile';
declare const meta: {
    title: string;
    component: typeof NodesPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        nodes?: NodeSummary[] | undefined;
        onAddLatency?: ((nodeId: string) => void) | undefined;
        onKillNode?: ((nodeId: string) => void) | undefined;
        onTransferResource?: ((nodeId: string) => void) | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<NodesPageProps>;
/**
 * No `nodes` prop: the page falls back to its own fixture so the route is
 * never blank. The chaos rail on the left writes to the shared local
 * `chaosState` module — nothing leaves the browser.
 */
export declare const FixtureFallback: Story;
/** Host-supplied cluster with one of every status. */
export declare const MixedStatus: Story;
/**
 * With the three host handlers wired, the detail drawer grows its per-node
 * chaos + transfer sections. Click a tile to open it.
 */
export declare const WithHostActions: Story;
/** Every node reporting healthy — the boring, correct state. */
export declare const AllHealthy: Story;
/** Cluster fully down. */
export declare const NoNodes: Story;
//# sourceMappingURL=NodesPage.stories.d.ts.map