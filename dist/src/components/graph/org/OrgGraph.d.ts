import { type Ref } from 'react';
import { type LayoutMode } from './useForceLayout';
import type { GraphPerson, GraphRelationship, GraphDepartment } from './types';
import type { PresenceFilter } from './presence';
import { type FitInset } from './fitTransform';
export interface OrgGraphProps {
    people: GraphPerson[];
    relationships: GraphRelationship[];
    departments: GraphDepartment[];
    onPersonSelect?: (person: GraphPerson | null) => void;
    /** Optional multi-select mode. When provided, clicking toggles IDs in this set. */
    multiSelectIds?: Set<string>;
    onToggleMultiSelect?: (id: string) => void;
    /** Optional ID set to apply a "spotlight" visual highlight (e.g. agent-cited nodes). */
    spotlightIds?: Set<string>;
    /** Layout algorithm to use. Defaults to 'force'. */
    layout?: LayoutMode;
    /** Presence filter — dims nodes that don't match. null/undefined = no filter. */
    presenceFilter?: PresenceFilter | null;
    /** True only for roles allowed to see influence — sizes nodes by influence
     *  and shows it on the hover card. Everyone else gets sizing by connection
     *  count, so a bigger circle can't leak a number the card hides. */
    showInfluence?: boolean;
    /** Draw the department/relationship legend. Default true. */
    legend?: boolean;
    /** Draw the zoom cluster (bottom-right). Default true. */
    controls?: boolean;
    className?: string;
    /**
     * Narrows the drawn people to these ids plus their direct neighbours over
     * `relationships` (see `focusOrgGraph`), and spotlights them — "Focused on
     * Vera" draws Vera, the people she is connected to and the lines among
     * them. Empty, or naming no one in `people`, draws the whole graph. Since 2.403.0.
     */
    focusIds?: ReadonlySet<string> | readonly string[];
    /** How far out `focusIds` reaches. Default 1 (direct neighbours). Since 2.403.0. */
    focusHops?: number;
    /**
     * Whether `focusIds` trims the drawing to the focus neighbourhood (default
     * `true`, the 2.403.0 behaviour). `false` (since 2.407.31) draws every
     * person in `people` and uses `focusIds` only to centre the automatic fit
     * and to keep the focus whole — for a host that has already chosen the
     * drawn set itself (OrgIQ's Search people view builds its own neighbourhood
     * and counts it; with pruning on, the library trimmed 3 of 11 people the
     * counter and the person card still named).
     */
    pruneToFocus?: boolean;
    /**
     * Screen px along each edge the drawing keeps clear of — pass the width of
     * a card the host overlays (`{ right: 320 }`) so no person or line sits
     * under it. The layout is sized to, and the fit centred in, what is left.
     * `left` defaults to the legend's width (`ORG_LEGEND_INSET`) while `legend`
     * is on, 0 otherwise; the rest default to 0. Since 2.403.2.
     *
     * While `controls` is on, the zoom cluster's bottom-right corner
     * (`ORG_CONTROLS_SIZE`) is kept clear too — along the bottom or the right
     * edge, whichever costs less — unless these insets already cover it.
     * Since 2.403.4.
     */
    fitInset?: FitInset;
    /**
     * Floor of the automatic fit (screen zoom). A set that does not fit at it
     * overflows and the viewer pans; "Fit to view" / `fitAll()` ignore it.
     * The layout is also spread for the clear area at this zoom. Default
     * `ORG_FIT_MIN_ZOOM` (0.9). Since 2.403.4.
     *
     * Since 2.404.2 the `radial` layout with no `focusIds` does not use it:
     * its automatic fit frames every ring whole (down to `ORG_FIT_ALL_MIN_ZOOM`).
     * Where the floor does hold and the drawing overflows, the view is shifted
     * so no node sits under the legend, the zoom cluster or a `fitInset` card.
     */
    minFitZoom?: number;
    /** Imperative fit handle (`OrgGraphHandle`). Since 2.403.4. */
    ref?: Ref<OrgGraphHandle>;
    'aria-label'?: string;
    'data-testid'?: string;
}
/**
 * `ref` handle on `OrgGraph`. The graph already fits on its own when the drawn
 * set or canvas changes; call this to drive a host "Show everyone" button.
 * A no-op before the layout has positions. Since 2.403.4.
 */
export interface OrgGraphHandle {
    /**
     * Fit the whole drawn set with no readability floor (down to
     * `ORG_FIT_ALL_MIN_ZOOM`, 0.3), exactly as the "Fit to view" control does. The
     * view stays in this mode — re-fitting on a resize — until the viewer pans
     * or zooms or the drawn set changes.
     */
    fitAll: () => void;
}
export declare function OrgGraph({ people, relationships, departments, onPersonSelect, multiSelectIds, onToggleMultiSelect, spotlightIds, layout, presenceFilter, showInfluence, legend, controls, focusIds, focusHops, pruneToFocus, fitInset, minFitZoom, ref, className, 'aria-label': ariaLabel, 'data-testid': testId, }: OrgGraphProps): import("react").JSX.Element;
export default OrgGraph;
//# sourceMappingURL=OrgGraph.d.ts.map