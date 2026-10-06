import type { StoryObj } from '@storybook/react-vite';
import { type RunDraftPanelProps } from './RunDraftPanel';
/** Stateful harness so the selects and the budget input actually change. */
declare function Harness(props: Partial<RunDraftPanelProps>): import("react").JSX.Element;
declare const meta: {
    title: string;
    component: typeof Harness;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The mockup's pane 4, with honest data: the range is backed by 2 runs. */
export declare const Mockup: Story;
/** A pipeline that has never completed a run shows no numbers at all. */
export declare const NoPriorRuns: Story;
/** After dispatch the live run replaces the form. */
export declare const Running: Story;
/** A 403 from the dispatch route, shown verbatim. */
export declare const DispatchRefused: Story;
export declare const Collapsed: Story;
export declare const Dark: Story;
/** A stated per-tier prior with no runs yet, and a dollar cap the host enforces. */
export declare const PriorBracketUsdBudget: Story;
/** A multi-source run: the documents it will read, one of them restricted to this viewer. */
export declare const WithSources: Story;
//# sourceMappingURL=RunDraftPanel.stories.d.ts.map