import type { StoryObj } from '@storybook/react-vite';
import { RecordGraph, type RecordGraphHandle } from './RecordGraph';
import type { RecordGraphEdge, RecordGraphLayout, RecordGraphRecord, RecordGraphType } from './recordGraphLayout';
declare const meta: {
    title: string;
    component: typeof RecordGraph;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        records: RecordGraphRecord[];
        edges: RecordGraphEdge[];
        selectedKeys: never[];
        onSelectionChange: () => void;
        onAskSelection: () => void;
        onOpenRecord: () => void;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        records: RecordGraphRecord[];
        edges: RecordGraphEdge[];
        selectedKeys: string[];
        onSelectionChange: (keys: string[]) => void;
        onAskSelection?: () => void;
        onOpenRecord?: (record: RecordGraphRecord) => void;
        layout?: RecordGraphLayout;
        onLayoutChange?: (layout: RecordGraphLayout) => void;
        typeFilter?: RecordGraphType | 'all';
        onTypeFilterChange?: (type: RecordGraphType | 'all') => void;
        typeLabels?: Partial<Record<RecordGraphType, string>>;
        className?: string;
        'data-testid'?: string;
        'aria-label'?: string;
        emptyLabel?: string;
        showIsolated?: boolean;
        focusKeys?: readonly string[];
        ref?: import("react").Ref<RecordGraphHandle>;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Force layout with three people selected, as in the mockup. Selection,
 *  layout and type filter are held by the story as a host would hold them. */
export declare const Default: Story;
/** Breadth-first ranks left to right: owners and SMEs, then the initiative, then its work. */
export declare const Hierarchy: Story;
/** Radial rings around the most-connected record. */
export declare const Radial: Story;
/**
 * Twenty-five records and 56 connections in the search page's 1160 × 418
 * canvas, with the three people selected and passed as `focusKeys`. Since
 * 2.403.7 the view opens on all 25 (they fit at 70% or more); Fit frames the
 * selection at the 80% floor, and pressed again everything. Switch to
 * Hierarchy for longest-path columns wrapped to the canvas height.
 */
export declare const ManyRecords: Story;
/**
 * The portal's journey defect (2.403.4): the host's answer strip opens under
 * the canvas and takes 50px from it. The graph re-fits on the canvas resize
 * and, at the 80% floor, keeps the three selected people fully in view. Fit
 * re-centres on the selection; pressed again it frames the whole graph from
 * the top-left. The host buttons drive the `RecordGraphHandle` ref.
 */
export declare const StripOpens: Story;
/**
 * The two journey walkers' disagreement, settled (2.403.7): the same 25
 * records and three selected people in each layout, each in a 1160px frame
 * whose canvas is ~418px tall under the toolbar. The automatic fit opens on
 * every record at 70% or more in all three — Radial's rings and Hierarchy's
 * column gaps are sized to that canvas — rather than centring on the
 * selection at 80% with records cut off.
 */
export declare const AllLayouts25: Story;
/** Nothing to draw — no records, or a type filter that leaves none. */
export declare const Empty: Story;
/** Records with no connections among them (a lone person): the empty label, not a cloud of nodes. */
export declare const Unconnected: Story;
/** `showIsolated`: draw unconnected records anyway. */
export declare const ShowIsolated: Story;
export declare const Dark: Story;
//# sourceMappingURL=RecordGraph.stories.d.ts.map