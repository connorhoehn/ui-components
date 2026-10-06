import '@xyflow/react/dist/style.css';
import { type Ref } from 'react';
import { type RecordGraphEdge, type RecordGraphLayout, type RecordGraphRecord, type RecordGraphType } from './recordGraphLayout';
export interface RecordGraphProps {
    records: RecordGraphRecord[];
    /** `source`/`target` are `type:id` keys (`recordGraphKey`). */
    edges: RecordGraphEdge[];
    /** Selected `type:id` keys — shared with the host's results and answer views. */
    selectedKeys: string[];
    onSelectionChange: (keys: string[]) => void;
    /**
     * "Ask about selection →". Disabled while nothing is selected. Optional
     * since 2.405.2: omitted, the button is not drawn (a graph embedded where
     * asking is not offered — `RecordGraphCard` without `onAskSelection`).
     */
    onAskSelection?: () => void;
    /** Draws "Open record ↗" while exactly one record is selected. */
    onOpenRecord?: (record: RecordGraphRecord) => void;
    /** Controlled layout. Omit to let the graph hold it (default `force`). */
    layout?: RecordGraphLayout;
    onLayoutChange?: (layout: RecordGraphLayout) => void;
    /** Controlled type filter. Omit to let the graph hold it (default `all`). */
    typeFilter?: RecordGraphType | 'all';
    onTypeFilterChange?: (type: RecordGraphType | 'all') => void;
    /** Plural labels for the type filter and legend ("People", "Agent library"…). */
    typeLabels?: Partial<Record<RecordGraphType, string>>;
    className?: string;
    'data-testid'?: string;
    /** The canvas's accessible name. Default "Record connections". */
    'aria-label'?: string;
    /**
     * Said instead of the canvas when the (type-filtered) records have no
     * connections among them — a cloud of unconnected records reads as a graph
     * that means nothing. Default "No recorded connections — search, or select
     * related records". Since 2.403.0.
     */
    emptyLabel?: string;
    /** Draw records that have no connections anyway (the pre-2.403 behaviour). Default false. Since 2.403.0. */
    showIsolated?: boolean;
    /**
     * `type:id` keys to frame first — usually the host's `selectedKeys`. The
     * view fits these records plus their direct neighbours (never below
     * `RECORD_GRAPH_MIN_FIT_ZOOM`); the rest of the graph is a pan away, and
     * "Fit" frames the whole graph. The view re-fits when the drawing changes
     * (records, edges, layout, canvas size) — not on a selection click alone,
     * so passing `selectedKeys` straight through does not move the view under
     * the pointer. Omit, or name nothing drawn, to fit the whole graph.
     * Since 2.403.2. When the neighbourhood cannot fit at the floor, the fit
     * centres on these records so they are never clipped while they fit, and
     * "Fit" re-centres on them (a second press frames the whole graph) — 2.403.4;
     * since 2.403.8 "Fit" always frames the whole graph.
     * Since 2.403.7 the automatic fit first shows the whole graph when it fits
     * at `RECORD_GRAPH_READABLE_ZOOM` (0.7); the focus framing is its fallback.
     * Since 2.403.8 the fallback is a ladder — these records + neighbours at
     * ≥ `RECORD_GRAPH_NEIGHBOURHOOD_ZOOM` (0.6), else these records alone, zoomed
     * out as far as `RECORD_GRAPH_FOCUS_MIN_ZOOM` (0.4) so they are never clipped.
     */
    focusKeys?: readonly string[];
    /**
     * Imperative fit handle (`RecordGraphHandle`) for a host whose own layout
     * moves the canvas in a way the graph cannot see. Since 2.403.4.
     */
    ref?: Ref<RecordGraphHandle>;
}
/**
 * `ref` handle on `RecordGraph`. The graph already re-fits on its own when the
 * drawing or the canvas size changes; call these after a host-side change it
 * cannot observe, or to drive a host "Show selection" / "Show all" button.
 * Both are no-ops while the canvas is not drawn. Since 2.403.4.
 */
export interface RecordGraphHandle {
    /**
     * Frame `focusKeys` + their neighbours; at the zoom floor, centre on them so
     * the focus is fully in view. Frames the whole graph when there is no focus.
     * Since 2.403.8 a focus too tall or wide for the canvas at the floor zooms
     * out (down to `RECORD_GRAPH_FOCUS_MIN_ZOOM`, 0.4) until its boxes are whole.
     */
    fitToFocus: () => void;
    /**
     * Frame the whole graph: centred when it fits, top-left aligned (pan for
     * the rest) when not. Since 2.403.5 it may zoom below the readability floor,
     * down to `RECORD_GRAPH_FIT_ALL_MIN_ZOOM` (0.4 in 2.403.8, 0.25 since
     * 2.403.9), exactly as "Fit to view" does; a drawing that fits is centred
     * (2.403.9), and only where it still overflows does it centre on the focus
     * so the selection stays whole (2.403.8).
     */
    fitAll: () => void;
}
export declare function RecordGraph({ records, edges, selectedKeys, onSelectionChange, onAskSelection, onOpenRecord, layout: controlledLayout, onLayoutChange, typeFilter: controlledType, onTypeFilterChange, typeLabels, className, 'data-testid': testId, 'aria-label': ariaLabel, emptyLabel, showIsolated, focusKeys, ref, }: RecordGraphProps): import("react").JSX.Element;
export default RecordGraph;
//# sourceMappingURL=RecordGraph.d.ts.map