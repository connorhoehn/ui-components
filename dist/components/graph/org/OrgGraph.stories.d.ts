import type { StoryObj } from '@storybook/react-vite';
import { OrgGraph } from './OrgGraph';
import type { GraphDepartment, GraphPerson, GraphRelationship } from './types';
declare const meta: {
    title: string;
    component: typeof OrgGraph;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        people: GraphPerson[];
        relationships: GraphRelationship[];
        departments: GraphDepartment[];
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        people: GraphPerson[];
        relationships: GraphRelationship[];
        departments: GraphDepartment[];
        onPersonSelect?: (person: GraphPerson | null) => void;
        multiSelectIds?: Set<string>;
        onToggleMultiSelect?: (id: string) => void;
        spotlightIds?: Set<string>;
        layout?: import("./useForceLayout").LayoutMode;
        presenceFilter?: import("./presence").PresenceFilter | null;
        showInfluence?: boolean;
        legend?: boolean;
        controls?: boolean;
        className?: string;
        focusIds?: ReadonlySet<string> | readonly string[];
        focusHops?: number;
        pruneToFocus?: boolean;
        fitInset?: import("./fitTransform").FitInset;
        minFitZoom?: number;
        ref?: import("react").Ref<import("./OrgGraph").OrgGraphHandle>;
        'aria-label'?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Departments colour the nodes; the legend (top-left) keys departments and
 *  relationship line styles and filters on click. Hover a node for its card. */
export declare const Default: Story;
/** Fifty-six people — the whole org — in the search page's 1160 × 360 frame
 *  (the 2.403.2 regression): departments sit in a grid shaped to the strip
 *  and the pulls are aspect-weighted, so the drawing spans the width right of
 *  the legend; the fit stops at 110% so names stay 11px, and the rows that do
 *  not fit run off the bottom for the viewer to pan to. */
export declare const Default56: Story;
/** A host card overlaid on the right: `fitInset={{ right: 320 }}` keeps the
 *  focused drawing clear of it (the card here is a stand-in panel). */
export declare const WithCardInset: Story;
/** Radial rings, most influential in the centre. */
export declare const Radial: Story;
/** Multi-select owned by the host, with the page's search box and department
 *  chips driving the same selection — the People panel's shape. */
export declare const WithSelection: Story;
/** Presence filter on: nodes that are not remote dim, and the legend keys the dots. */
export declare const PresenceFilter: Story;
/** Focused on one person: Vera, the people she is directly connected to and
 *  the lines among them — the `/iq/search?selection=person:<id>` view. */
export declare const FocusedOnOnePerson: Story;
/** The smallest focused drawing: two people and the line between them. The
 *  fit stops at 125%, so they stay people-sized in a wide canvas. */
export declare const FocusedTwoPeople: Story;
//# sourceMappingURL=OrgGraph.stories.d.ts.map