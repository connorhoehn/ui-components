import { JSX } from 'react';
import { MouseEvent as MouseEvent_2 } from 'react';
import { ReactNode } from 'react';
import { Viewport } from '@xyflow/react';

export declare interface AtRiskSkill {
    skill: string;
    /** A holder who sits in the department being inspected. */
    holder: OrgGraphPerson;
    /** How many people hold it ORG-WIDE, not just in this department. */
    holderCount: number;
}

export declare function CanvasZoomControls({ zoom, onZoomIn, onZoomOut, onFit, minZoom, maxZoom, className, 'aria-label': ariaLabel, 'data-testid': testId, }: CanvasZoomControlsProps): JSX.Element;

export declare interface CanvasZoomControlsProps {
    /** Current zoom, 1 = 100%. Omit to hide the readout. */
    zoom?: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    /** Fit the whole drawing. Omit to hide the button. */
    onFit?: () => void;
    /** Disable "zoom out" at or below this zoom. */
    minZoom?: number;
    /** Disable "zoom in" at or above this zoom. */
    maxZoom?: number;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

declare interface ChatSidePanelApi {
    close: () => void;
    /** Present when the host gave the panel a full-page destination. */
    openFullPage?: () => void;
    /** Replaces the frame's title once the body knows the real one (the live document title). */
    setTitle: (title: string | null) => void;
}

/**
 * Something open BESIDE the conversation — a document, a search-result graph,
 * a run's trace. `kind` selects a renderer (see ChatSidePanelRegistry); `id`
 * is what that renderer opens. The library reserves `kind: 'document'` for the
 * `?doc=` URL form; every other kind is the host's.
 */
declare interface ChatSidePanelRef {
    kind: string;
    id: string;
    /** A first guess at the header; a renderer may replace it once it knows more. */
    title?: string;
    /** Extra state the renderer needs — a query, a tab. Round-trips through the URL. */
    params?: Record<string, string>;
}

declare type ChatSidePanelRenderer = (panel: ChatSidePanelRef, api: ChatSidePanelApi) => ReactNode;

export declare const CONNECTION_TYPE_LABELS: Record<string, string>;

export declare function ConnectionPathStrip({ path, onHighlightPath }: ConnectionPathStripProps): JSX.Element;

export declare interface ConnectionPathStripProps {
    path: PathHop[];
    /** Select every person on the path so the graph shows the corridor. */
    onHighlightPath: (ids: string[]) => void;
}

/** One line for an embedder: `renderers={{ graph: createGraphPanelRenderer({ load }) }}`. */
export declare function createGraphPanelRenderer(options: CreateGraphPanelRendererOptions): ChatSidePanelRenderer;

export declare interface CreateGraphPanelRendererOptions {
    /** Fetches what the panel shows. Called once per panel (kind + id); a throw becomes the error state. */
    load: (panel: ChatSidePanelRef) => Promise<GraphPanelData>;
    onOpenPerson?: (id: string, ctx: {
        panel: ChatSidePanelRef;
        api: ChatSidePanelApi;
    }) => void;
    onMessagePerson?: (id: string, ctx: {
        panel: ChatSidePanelRef;
        api: ChatSidePanelApi;
    }) => void;
    /** Node picked in a raw nodes/edges graph. */
    onSelectNode?: (node: GraphNode, ctx: {
        panel: ChatSidePanelRef;
        api: ChatSidePanelApi;
    }) => void;
    /** Pixel height of the graph area. */
    graphHeight?: number;
    'data-testid'?: string;
}

/** id → degree (count of links touching that id), from a flat list of
 *  {source, target} pairs. Self-loops (shouldn't occur in this graph) count
 *  once, not twice. */
export declare function degreeMap(links: Array<{
    source: string;
    target: string;
}>): Map<string, number>;

export declare function DepartmentChips({ departments, people, activeDepartment, onToggle, className }: DepartmentChipsProps): JSX.Element;

export declare interface DepartmentChipsProps {
    departments: GraphDepartment[];
    people: OrgGraphPerson[];
    activeDepartment: string | null;
    /** `name` is null when the active chip is toggled off. */
    onToggle: (name: string | null, memberIds: string[]) => void;
    className?: string;
}

export declare interface DepartmentInsight {
    members: OrgGraphPerson[];
    /** [skill, headcount within the department], most common first. */
    topSkills: [string, number][];
    atRisk: AtRiskSkill[];
}

/** Headcount, the department's most common skills, and the skills it depends
 *  on that almost nobody in the org holds. */
export declare function departmentInsight(people: OrgGraphPerson[], department: string): DepartmentInsight;

export declare function DepartmentInsightStrip({ department, people, onFocusPerson, busFactorFindings, busFactorFindingsUnavailable, findingHref, onNavigate, }: DepartmentInsightStripProps): JSX.Element;

export declare interface DepartmentInsightStripProps {
    /** null renders the org-wide rare-skills view instead of one department. */
    department: string | null;
    people: OrgGraphPerson[];
    /** Click an at-risk holder → focus them (select + detail). */
    onFocusPerson: (id: string) => void;
    /**
     * skill name → the host's open bus-factor finding for it, built by
     * `indexBusFactorFindings`. `null` means the read has not resolved (loading
     * or failed) — the strip then shows the unconditional "finding →" link
     * rather than asserting "not on the sweep yet" for something unchecked.
     */
    busFactorFindings: Map<string, FindingLike> | null;
    /** True only when the findings read genuinely failed (not while loading). */
    busFactorFindingsUnavailable?: boolean;
    /** Where "finding →" points. Default `rareSkillFindingsUrl(skill, findingId)`. */
    findingHref?: (skill: string, findingId?: string | null) => string;
    /** Route a plain click on "finding →" (modified clicks stay native). */
    onNavigate?: (href: string, event: MouseEvent_2<HTMLAnchorElement>) => void;
}

/** Deduplicate real records and discard dangling edges after filtering. */
export declare function filterRecordGraph<R extends RecordGraphRecord, E extends RecordGraphEdge>(records: R[], edges: E[], type: RecordGraphType | 'all'): {
    records: R[];
    edges: E[];
};

/**
 * Shortest path between two people over the full (unfiltered) edge set —
 * paths are allowed to cross relationship types the current view hides,
 * because "how are these two connected at all?" is the actual question.
 */
export declare function findConnectionPath(people: OrgGraphPerson[], edges: GraphRelationship[], fromId: string, toId: string): PathHop[] | null;

/** Look up the server's bus-factor finding for a skill name, case-insensitive. */
export declare function findingForSkill(index: Map<string, FindingLike>, skill: string): FindingLike | null;

export declare interface FindingLike {
    id: string;
    sweep: string;
    status: string;
    entityType: string | null;
    title: string;
}

export declare function firstName(full: string): string;

/**
 * The node the radial layout puts in the middle: the one whose `group` is
 * `'center'`, else the node with the strictly highest weight, else none.
 * "Strictly" matters: a graph with no weights has no centre rather than an
 * arbitrary one.
 */
export declare function graphCenterNode(nodes: GraphNode[]): GraphNode | null;

export declare interface GraphDepartment {
    id: string;
    name: string;
    color: string;
}

export declare interface GraphEdge {
    from: string;
    to: string;
    label?: string;
    /** Scales the stroke width. */
    weight?: number;
}

/** The token classes for a group, by its legend position. Exported so PeopleGraph's list can match the graph. */
export declare function graphGroupPalette(group: string | undefined, groups: string[]): {
    fill: string;
    bg: string;
};

/** Groups in first-appearance order, the centre bucket excluded; undefined groups collapse to ''. */
export declare function graphGroups(nodes: GraphNode[]): string[];

export declare type GraphLayout = 'radial' | 'grid' | 'force';

export declare interface GraphLayoutSize {
    width: number;
    height: number;
    /** Space kept clear of the edges so a node's circle and label fit. */
    padding?: number;
}

export declare interface GraphNode {
    id: string;
    label: string;
    /** Shown on hover (`<title>`) and, for the centre node, under the label. */
    sublabel?: string;
    /**
     * Colour / legend bucket. `'center'` is special: the radial layout puts that
     * node in the middle and the legend leaves it out.
     */
    group?: string;
    /** Relative importance; scales the node radius and picks the radial centre when no node is `'center'`. */
    weight?: number;
    avatarUrl?: string;
    /** Overrides the group colour with any CSS colour. */
    color?: string;
}

declare interface GraphNode_2 extends OrgGraphPerson {
    x: number;
    y: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
}

export declare function GraphPanelBody({ panel, api, options }: GraphPanelBodyProps): ReactNode;

declare interface GraphPanelBodyProps {
    panel: ChatSidePanelRef;
    api: ChatSidePanelApi;
    options: CreateGraphPanelRendererOptions;
}

export declare type GraphPanelData = GraphPanelNodesData | GraphPanelPeopleData;

export declare interface GraphPanelNodesData {
    title?: string;
    nodes: GraphNode[];
    edges: GraphEdge[];
    layout?: GraphLayout;
}

export declare interface GraphPanelPeopleData {
    title?: string;
    people: GraphPerson[];
    query?: string;
}

export declare interface GraphPerson {
    id: string;
    name: string;
    title?: string;
    avatarUrl?: string;
    tags?: string[];
    /** Relevance to the query; scales the node. */
    score?: number;
}

export declare interface GraphPoint {
    x: number;
    y: number;
}

export declare type GraphPositions = Map<string, GraphPoint>;

export declare interface GraphRelationship {
    source: string;
    target: string;
    type: 'collaborates' | 'mentors' | 'reports_to' | 'expert_in_common';
    strength: number;
}

export declare function GraphSearchBox({ people, onPickPerson, onPickSkill, placeholder, className, }: GraphSearchBoxProps): JSX.Element;

export declare interface GraphSearchBoxProps {
    people: OrgGraphPerson[];
    /** Single-person pick — select + focus + open detail. */
    onPickPerson: (id: string) => void;
    /** Skill pick — select everyone holding the skill. */
    onPickSkill: (skill: string, personIds: string[]) => void;
    placeholder?: string;
    className?: string;
}

export declare interface GraphSearchResult {
    personMatches: OrgGraphPerson[];
    skillMatches: SkillMatch[];
}

/** skill name (lowercased) → the bus-factor finding for it. Later findings
 *  for a name already seen are ignored — `sweepBusFactor` upserts by
 *  fingerprint, so the caller's list should carry at most one open finding
 *  per skill; if it ever carries more, the first (most-recently-fetched
 *  order) wins over silently picking one at random on every render. */
export declare function indexBusFactorFindings(findings: FindingLike[]): Map<string, FindingLike>;

export declare function isPeopleGraphData(data: GraphPanelData): data is GraphPanelPeopleData;

export declare function layoutGraph(nodes: GraphNode[], edges: GraphEdge[], layout: GraphLayout, size: GraphLayoutSize): GraphPositions;

export declare type LayoutMode = 'force' | 'radial';

/** Rendering positions only: never infer an edge from a shared title or type. */
export declare function layoutRecordGraph(records: Pick<RecordGraphRecord, 'id' | 'type'>[], edges: Pick<RecordGraphEdge, 'source' | 'target'>[], layout: RecordGraphLayout): Map<string, {
    x: number;
    y: number;
}>;

/** Node positions for a layout. Exported for tests and hosts that draw their own minimap. */
export declare function layoutTypedNodes(nodes: TypedCanvasNode[], edges: Pick<TypedCanvasEdge, 'from' | 'to'>[], options?: {
    layout?: 'ltr' | 'manual';
    nodeWidth?: number;
    nodeHeight?: number;
    columnGap?: number;
    rowGap?: number;
}): Map<string, {
    x: number;
    y: number;
}>;

export declare interface LimitEffortsOptions {
    /**
     * How many efforts may be drawn. Defaults to
     * `WORK_ACTIVITY_DEFAULT_MAX_EFFORTS` (2). `WORK_ACTIVITY_ALL_EFFORTS` (0),
     * a negative number, or a non-finite one means no cap at all.
     */
    max?: number;
    /**
     * An effort that must survive the cap whatever its age — the one the current
     * focus or selection is inside. Hiding the work someone is looking at is the
     * one thing a display filter must never do, so this effort takes the place of
     * the oldest effort that would otherwise have been shown.
     */
    keepEffortId?: string | null;
    /**
     * Keep the newest effort that holds something the person MADE (a document —
     * a deck, a page) in view even when newer run-only efforts outnumber the cap.
     * A deck saved a minute ago sat behind two probe runs and was a click away
     * rather than drawn (realtime-examples NFR #221 follow-up). Default true;
     * the selection's `keepEffortId` still wins over it.
     */
    keepLatestMade?: boolean;
}

/**
 * The newest `max` efforts, in the order the host gave them — except that,
 * unless `keepLatestMade` is false, the newest effort holding a document takes
 * the last place when none of the newest does.
 *
 * Recency is the latest `updatedAt`/`startedAt` across an effort's own nodes,
 * which is the same "newest work first" rule the panel footer already claims;
 * hosts that already sort newest-first therefore get exactly their own first N.
 * The RESULT keeps source order rather than recency order, because the canvas
 * treats effort order as stable — a heartbeat must not make two lanes swap
 * places.
 */
export declare function limitWorkEfforts(efforts: readonly WorkActivityEffort[], nodes: readonly WorkGraphNodeData[], options?: LimitEffortsOptions): WorkActivityEffort[];

/**
 * The tag that explains why this person is here: the first tag the query
 * mentions (or that mentions the query), else the person's first tag.
 */
export declare function matchingTag(person: GraphPerson, query: string | undefined): string | undefined;

/** Largest value in a degree map, or 0 for an empty graph. */
export declare function maxDegree(map: Map<string, number>): number;

/** department name → the ids of everyone in it. */
export declare function membersByDepartment(people: OrgGraphPerson[]): Map<string, string[]>;

/** The logical drawing width; the SVG scales it to whatever width it is given. */
export declare const NODE_GRAPH_VIEW_WIDTH = 480;

export declare function NodeGraph({ nodes, edges, layout, selectedId, onSelect, height, className, 'data-testid': testId, }: NodeGraphProps): JSX.Element;

export declare interface NodeGraphProps {
    nodes: GraphNode[];
    edges: GraphEdge[];
    layout?: GraphLayout;
    selectedId?: string | null;
    onSelect?: (node: GraphNode) => void;
    /** Pixel height of the drawing; the width follows the container. */
    height?: number;
    className?: string;
    'data-testid'?: string;
}

/**
 * `showInfluence` true → size by `influenceScore` (0..1), the original rule.
 * `showInfluence` false → size by `degree` relative to `maxDegree` in the
 * currently-rendered graph (0 when there are no edges at all, so an edgeless
 * graph draws every node at the minimum radius rather than one arbitrary node
 * reading as "biggest").
 */
export declare function nodeRadius(showInfluence: boolean, influenceScore: number, degree: number, maxDegree: number): number;

export declare function OrgGraph({ people, relationships, departments, onPersonSelect, multiSelectIds, onToggleMultiSelect, spotlightIds, layout, presenceFilter, showInfluence, legend, controls, className, 'aria-label': ariaLabel, 'data-testid': testId, }: OrgGraphProps): JSX.Element;

export declare function OrgGraphLegend({ departments, filter, onFilter, presenceFilter, pinned, className, 'data-testid': testId, }: OrgGraphLegendProps): JSX.Element;

export declare interface OrgGraphLegendProps {
    departments: GraphDepartment[];
    /** The department the graph is filtered to, or null. */
    filter: string | null;
    onFilter: (dept: string | null) => void;
    /** Shows the presence key while a presence filter is active. */
    presenceFilter?: PresenceFilter | null;
    /** Keep the legend fully opaque instead of resting translucent. */
    pinned?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare interface OrgGraphPerson {
    id: string;
    name: string;
    title: string;
    department: string;
    skills: string[];
    influenceScore: number;
    /** Today's presence status. Absent means the API did not return one (treat as unknown). */
    presence?: PresenceStatus;
}

export declare interface OrgGraphProps {
    people: OrgGraphPerson[];
    relationships: GraphRelationship[];
    departments: GraphDepartment[];
    onPersonSelect?: (person: OrgGraphPerson | null) => void;
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
    'aria-label'?: string;
    'data-testid'?: string;
}

/** Same bus-factor rule as `departmentInsight`'s `atRisk`, but with no
 *  department to pick "the" holder from — every holder of a rare skill gets
 *  its own entry (same `AtRiskSkill` shape, so callers that already render
 *  `atRisk` need no branching), sorted rarest-first. */
export declare function orgInsight(people: OrgGraphPerson[]): {
    atRisk: AtRiskSkill[];
};

/** Parse a `?focus=` query param into individual ids. Accepts a single id
 *  (related-people cards on /search) or a comma-joined list ("Open in Ask →"
 *  / "Show all N in Explore" round-trip) alike; trims whitespace and drops
 *  empties so a trailing comma or stray space never adds a blank selection. */
export declare function parseFocusIds(focus: string | null): string[];

export declare function passesPresenceFilter(status: PresenceStatus, filter: PresenceFilter | null | undefined): boolean;

export declare const PATH_TYPE_LABELS: Record<string, string>;

export declare interface PathHop {
    person: OrgGraphPerson;
    /** Edge type connecting this person to the PREVIOUS hop (empty for hop 0). */
    viaType: string;
}

export declare const PEOPLE_GRAPH_QUERY_NODE_ID = "__query__";

export declare function PeopleGraph({ people, query, onOpenPerson, onMessagePerson, graphHeight, className, 'data-testid': testId, }: PeopleGraphProps): JSX.Element;

export declare interface PeopleGraphProps {
    people: GraphPerson[];
    /** What the people were found for; becomes the centre node. */
    query?: string;
    onOpenPerson?: (id: string) => void;
    onMessagePerson?: (id: string) => void;
    /** Pixel height of the graph area. */
    graphHeight?: number;
    className?: string;
    'data-testid'?: string;
}

/** The nodes and edges PeopleGraph draws; exported so a host can test or reuse the mapping. */
export declare function peopleToGraph(people: GraphPerson[], query: string | undefined): {
    nodes: GraphNode[];
    edges: GraphEdge[];
};

export declare interface PersonConnection {
    type: string;
    strength: number;
    otherPerson: {
        id: string;
        name: string;
        title: string;
    } | null;
}

/** The person read — the portal's `GET /api/graph/people/:id` shape. */
export declare interface PersonDetail {
    id: string;
    name: string;
    title: string;
    department: string;
    skills: string[];
    influenceScore: number;
    scoredAt: string | null;
    connections: PersonConnection[];
}

export declare function PersonDetailCard({ person, evidence, loading, error, onClose, onFocusPerson, onAsk, showInfluence, formatTime, askLabel, className, 'data-testid': testId, }: PersonDetailCardProps): JSX.Element;

export declare interface PersonDetailCardProps {
    /** The person, once read. */
    person: PersonDetail | null | undefined;
    /** Documents that evidence them. */
    evidence?: PersonEvidenceDocument[];
    loading?: boolean;
    /** A failed read: the message to show. */
    error?: string | null;
    onClose: () => void;
    /** Click a connection → add that person to the graph selection. */
    onFocusPerson: (id: string) => void;
    /** "Ask agent" → open the chat pre-seeded with this person. */
    onAsk: (id: string) => void;
    /** Show influence and scored-at (leadership analytics roles only). */
    showInfluence?: boolean;
    /** Evidence timestamps. Default: a short "3h ago" / date. */
    formatTime?: (iso: string) => string;
    /** The ask button's label. Default "Ask agent about <first name> →". */
    askLabel?: (person: PersonDetail) => string;
    /** Default: floats top-right over the graph (`absolute right-3 top-3`). */
    className?: string;
    'data-testid'?: string;
}

/** One evidence document — the portal's `/evidence` shape. */
export declare interface PersonEvidenceDocument {
    id: string;
    title: string;
    source: string;
    sourceUri: string | null;
    ingestedAt: string | null;
    mentionCount: number;
}

export declare const PRESENCE_DOT: Record<PresenceStatus, {
    fill: string;
    stroke: string;
    label: string;
}>;

/** The presence filter the graph dims against. */
export declare type PresenceFilter = 'office' | 'remote' | 'away';

export declare type PresenceStatus = 'office' | 'wfh' | 'travel' | 'pto' | 'vacation' | 'sick' | 'unknown';

/** Longest-path rank from the roots; cycles fall back to column 0. Exported for tests. */
export declare function rankTypedNodes(nodes: Pick<TypedCanvasNode, 'id' | 'rank'>[], edges: Pick<TypedCanvasEdge, 'from' | 'to'>[]): Map<string, number>;

/** The findings route the portal serves. A default, not a contract: pass your
 *  own `basePath` (or give `DepartmentInsightStrip` a `findingHref`). */
export declare const RARE_SKILL_FINDINGS_PATH = "/iq/work/findings";

/** Sweep id the org-sweep scheduler files bus-factor findings under
 *  (`schema`/work findings — see `findingsFilter.ts`'s `SWEEP_TITLES`). */
export declare const RARE_SKILL_SWEEP = "bus_factor";

/** A skill held org-wide by this many people or fewer is a bus-factor risk. */
export declare const RARE_THRESHOLD = 2;

/** Where the rare-skill pill sends you: a findings view filtered to the
 *  bus-factor sweep and this skill, or (once we know a specific finding exists
 *  for it) straight to that finding. The target reads `?sweep=`/`?q=`/`?finding=`. */
export declare function rareSkillFindingsUrl(skill: string, findingId?: string | null, basePath?: string): string;

export declare const RECORD_GRAPH_NODE_HEIGHT = 116;

export declare const RECORD_GRAPH_NODE_WIDTH = 180;

/** Plural labels, in legend/select order. */
export declare const RECORD_GRAPH_TYPES: {
    value: RecordGraphType;
    label: string;
}[];

export declare function RecordGraph({ records, edges, selectedKeys, onSelectionChange, onAskSelection, onOpenRecord, layout: controlledLayout, onLayoutChange, typeFilter: controlledType, onTypeFilterChange, typeLabels, className, 'data-testid': testId, 'aria-label': ariaLabel, }: RecordGraphProps): JSX.Element;

/** A directed, labelled relationship. `source`/`target` are `type:id` keys. */
export declare interface RecordGraphEdge {
    id: string;
    source: string;
    target: string;
    label: string;
}

/** The key a node and a selection hold: `${type}:${id}`. */
export declare function recordGraphKey(record: Pick<RecordGraphRecord, 'id' | 'type'>): string;

export declare type RecordGraphLayout = 'force' | 'radial' | 'hierarchy';

export declare interface RecordGraphProps {
    records: RecordGraphRecord[];
    /** `source`/`target` are `type:id` keys (`recordGraphKey`). */
    edges: RecordGraphEdge[];
    /** Selected `type:id` keys — shared with the host's results and answer views. */
    selectedKeys: string[];
    onSelectionChange: (keys: string[]) => void;
    /** "Ask about selection →". Disabled while nothing is selected. */
    onAskSelection: () => void;
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
}

/** One typed org record — the same shape a search read model returns. */
export declare interface RecordGraphRecord {
    id: string;
    type: RecordGraphType;
    title: string;
    description?: string;
    subtitle?: string;
    /** Raw status ("in_progress", "blocked"). */
    status?: string;
    href: string;
    avatarUrl?: string;
}

export declare type RecordGraphType = 'person' | 'initiative' | 'work' | 'decision' | 'knowledge' | 'asset';

/** Relationship line styles — the edges and the legend draw from this one map. */
export declare const RELATIONSHIP_STYLES: Record<string, {
    color: string;
    label: string;
    dash?: string;
}>;

/** Name/title/department matches first, then skills ordered by how many people
 *  hold them — a skill five people share is a more useful jump than one only
 *  one person has. */
export declare function searchGraph(people: OrgGraphPerson[], query: string): GraphSearchResult;

export declare interface SkillMatch {
    skill: string;
    personIds: string[];
}

declare type Tone = (typeof TONES)[number];

declare const TONES: readonly ["neutral", "success", "warning", "danger", "info", "caution", "accent"];

export declare interface TypedCanvasEdge {
    id: string;
    from: string;
    to: string;
    /** Short word over the line — "Compact", "Publish". */
    label?: string;
    /** A quiet line under it — "13 notes → 4 patterns · 3h ago". */
    detail?: ReactNode;
    /** Line colour. Default: the brand colour. */
    tone?: Tone;
    /** A dot rides the line. Only for work CONFIRMED running; never under reduced motion. */
    animated?: boolean;
    marker?: TypedCanvasEdgeMarker | null;
}

/** A job marker on an edge — a dot on the line the reader can select. */
export declare interface TypedCanvasEdgeMarker {
    /** Accessible name — "Compaction L0 → L1, running". */
    label: string;
    tone?: Tone;
}

export declare interface TypedCanvasNode<K extends string = string, D = unknown> {
    id: string;
    /** What the node is — `tier`, `library`, `note`, `cluster`… The host's `renderNode` switches on it. */
    kind: K;
    data: D;
    /** Column in the `ltr` layout. Absent: derived from the edges (longest path from a root). */
    rank?: number;
    /** Explicit position. Required-ish for `manual`; in `ltr` it overrides the computed spot. */
    x?: number;
    y?: number;
    /** Accessible name, and the list view's text when there is no `renderListItem`. Default: `id`. */
    label?: string;
}

export declare function TypedNodeCanvas<N extends TypedCanvasNode = TypedCanvasNode>({ nodes, edges, renderNode, layout, onSelectNode, onSelectEdge, selectedId, listFallback, renderListItem, nodeWidth, nodeHeight, columnGap, rowGap, controls, caption, minZoom, maxZoom, onViewportChange, emptyLabel, className, 'aria-label': ariaLabel, 'data-testid': testId, }: TypedNodeCanvasProps<N>): JSX.Element;

export declare interface TypedNodeCanvasProps<N extends TypedCanvasNode = TypedCanvasNode> {
    nodes: N[];
    edges: TypedCanvasEdge[];
    renderNode: (node: N, state: {
        selected: boolean;
    }) => ReactNode;
    /** `ltr` (default): rank columns left to right. `manual`: every node at its own `x`/`y`. */
    layout?: 'ltr' | 'manual';
    onSelectNode?: (id: string) => void;
    /** Called from an edge's marker or its line. */
    onSelectEdge?: (id: string) => void;
    /** The selected node OR edge id. */
    selectedId?: string | null;
    /** Draw the list equivalent instead of the canvas. */
    listFallback?: boolean;
    /** The list view's row body. Default: the node's `label` and `kind`. */
    renderListItem?: (node: N) => ReactNode;
    /** Layout box for a node, px. Defaults 224 × 168. */
    nodeWidth?: number;
    nodeHeight?: number;
    /** Space between rank columns, px. Default 144 (room for an edge label). */
    columnGap?: number;
    /** Space between nodes in one column, px. Default 32. */
    rowGap?: number;
    /** Draw `CanvasZoomControls` in the bottom-left corner. Default `true`. */
    controls?: boolean;
    /** A quiet line in the bottom band beside the controls — the legend in words. */
    caption?: ReactNode;
    minZoom?: number;
    maxZoom?: number;
    onViewportChange?: (viewport: Viewport) => void;
    /** Shown when `nodes` is empty. */
    emptyLabel?: string;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

export declare function useForceLayout({ people, relationships, departments, width, height, layout }: UseForceLayoutProps): UseForceLayoutReturn;

export declare interface UseForceLayoutProps {
    people: OrgGraphPerson[];
    relationships: GraphRelationship[];
    departments: GraphDepartment[];
    width: number;
    height: number;
    layout?: LayoutMode;
}

export declare interface UseForceLayoutReturn {
    nodes: GraphNode_2[];
    links: Array<{
        source: GraphNode_2;
        target: GraphNode_2;
        type: string;
        strength: number;
    }>;
    isDone: boolean;
}

/**
 * The "no cap" value for `maxEfforts` — draw every effort, however small that
 * makes them.
 *
 * ZERO is the sentinel, and it is the ONLY one: `undefined` means "the caller
 * did not choose", which takes the default of two, and a non-finite value
 * (`Infinity`) is accepted as a synonym for this because it means the same
 * thing and a host computing a cap arithmetically can land on it honestly.
 * "Show none of the work" is not a state this component has, so zero was free.
 */
export declare const WORK_ACTIVITY_ALL_EFFORTS = 0;

/**
 * How many parallel efforts the activity canvas draws at once by default.
 *
 * Two, because the canvas fits everything it is given into one pane: a real
 * nine-effort day fits at roughly 0.12 zoom, which is a map of the work rather
 * than something anyone can read. Two lanes stay legible, and the rest are one
 * menu choice away.
 */
export declare const WORK_ACTIVITY_DEFAULT_MAX_EFFORTS = 2;

/**
 * Asking a transcript a question. The graph renders the exchange and nothing
 * else: the host owns the model call, the grounding and the refusal.
 */
export declare interface WorkActivityAsk {
    enabled: boolean;
    placeholder?: string;
    /** Rendered when `enabled` is false. Never invent an answer in its place. */
    unavailableLabel?: string;
    /** Host-owned. Resolve with a grounded answer or reject to show the error. */
    onAsk: (question: string) => Promise<WorkActivityAskAnswer> | WorkActivityAskAnswer;
}

export declare interface WorkActivityAskAnswer {
    text: string;
    citations?: WorkActivityAskCitation[];
    /** Provenance footnote. Say where the answer came from; never imply more. */
    note?: string;
}

export declare interface WorkActivityAskCitation {
    id: string;
    label: string;
    selection?: Exclude<WorkGraphSelection, null>;
}

/** The one-line state a detail pane opens with. Host-authored, viewer-safe. */
export declare interface WorkActivityBanner {
    tone: WorkActivityBannerTone;
    title: string;
    description?: string;
}

export declare type WorkActivityBannerTone = 'info' | 'success' | 'error';

/**
 * What the activity canvas paints UNDER the graph.
 *
 * `ripple-grid` is the default and the intended look: a pale grey lattice on
 * the near-white surface, rippling slowly outward from the centre and bending
 * toward the pointer. It REPLACES React Flow's dot background rather than
 * layering over it — two grids at once is noise, and the dots were only ever
 * standing in for a surface texture.
 *
 * `plain` is the escape hatch: no canvas, no WebGL context, React Flow's own
 * dots. For a host embedding several graphs on one page, or a test that would
 * rather not stub a GL context.
 */
export declare type WorkActivityCanvasBackground = 'ripple-grid' | 'plain';

/** Source-backed membership, already filtered for this viewer by the host. */
export declare interface WorkActivityEffort {
    id: string;
    title: string;
    /** A second clause under the frame title — "v3 generating · v2 available". */
    subtitle?: string;
    nodeIds: string[];
    edgeIds: string[];
    /** Older context that may be folded. Never a count of inaccessible sources. */
    contextNodeIds?: string[];
}

/**
 * The one header row an activity panel gets: who and what on the left, the
 * three ways out on the right. Hosts that already sit inside
 * `ChatSidePanelFrame` get the same chrome from the frame and should not
 * render this as well — it exists so a host outside that frame (a standalone
 * route, a popped-out window) has no hand-rolled markup to write.
 *
 * A host that can show a second body — the person's Computer Lab beside their
 * activity graph — wires `onViewChange` and gets a segmented switch on its own
 * row beneath the title, with a quiet clause saying what the body holds. The
 * row is a SECOND row rather than another control in the title row because it
 * chooses what the panel is, while everything on the title row chooses where
 * the panel is; mixing the two put a body switch next to the close button.
 * Without `onViewChange` nothing about this header changes.
 */
export declare function WorkActivityHeader({ title, subtitle, expanded, onExpand, onPopOut, onClose, actions, view, onViewChange, viewNote, effortCount, maxEfforts, onMaxEffortsChange, className, 'data-testid': testId, }: WorkActivityHeaderProps): JSX.Element;

export declare interface WorkActivityHeaderProps {
    title: string;
    /** A second clause under the title — "Working now · Sharing with you". */
    subtitle?: string;
    /** Whether the panel currently occupies the conversation area. */
    expanded?: boolean;
    onExpand?: () => void;
    onPopOut?: () => void;
    onClose?: () => void;
    /** Extra controls between the title and the close button. */
    actions?: ReactNode;
    /**
     * Which body the panel is showing: the activity graph, or the person's
     * Computer Lab. The switch itself only appears when `onViewChange` is wired
     * — a host with one body renders exactly the header it rendered before.
     */
    view?: WorkActivityPanelView;
    onViewChange?: (view: WorkActivityPanelView) => void;
    /**
     * The quiet clause beside the switch — "Shared work · newest first",
     * "2 working · 4 dispatched from this chat". Host-authored, because only the
     * host knows what the body it is about to render actually contains.
     */
    viewNote?: ReactNode;
    /**
     * Total parallel efforts the panel has, INCLUDING the ones the cap is
     * hiding. It is the denominator of "Show 2 of 9 activities", so it must be
     * the real count or the sentence lies about what is being withheld.
     */
    effortCount?: number;
    /**
     * How many of them the canvas is drawing. `WORK_ACTIVITY_ALL_EFFORTS` (0),
     * or any value at or above `effortCount`, reads as "All N activities".
     */
    maxEfforts?: number;
    /**
     * The opt-in for the "Show N activities" control, exactly as `onViewChange`
     * is the opt-in for the body switch: without it the header renders no such
     * control, because a picker nothing listens to is a lie. Fires with the
     * chosen number, or `WORK_ACTIVITY_ALL_EFFORTS` (0) for "All".
     */
    onMaxEffortsChange?: (maxEfforts: number) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface WorkActivityNodeDetail {
    emphasis?: 'earlier' | 'input' | 'current';
    /** Fresh process evidence, independent from presence and lifecycle. */
    fresh?: boolean;
    tools?: string[];
    attentionLabel?: string;
    feedbackCount?: number;
    /**
     * Secondary lines under the node title — "Planning sync · 08:30–09:00",
     * "2 speakers · 1 action item". Host-authored and already viewer-safe; when
     * omitted the card falls back to the node's own status wording.
     */
    lines?: string[];
    /** Short state word beside the first secondary line — "Ready", "Tests running". */
    badge?: string;
    /**
     * Why a `waiting` run is waiting — realtime-modules `detail.pause` passed
     * through. The card says "Needs approval" / "Paused at write" instead of a
     * bare "Waiting" (see `workPauseLabel`); ignored unless the node is waiting.
     */
    pause?: WorkActivityPause;
    /** A short verbatim quotation from the source, already viewer-authorized. */
    excerpt?: string;
    /** Who was there. Shown as an avatar row; the host resolves the images. */
    participants?: Array<{
        id: string;
        label: string;
        avatarUrl?: string;
    }>;
    /** Trailing line: what this is on the left, its sharing clause on the right. */
    footer?: {
        label: string;
        note?: string;
    };
    /** Detail-pane subtitle — "Meeting transcript · Shared with you". */
    subtitle?: string;
    /** The state line every detail pane opens with. */
    banner?: WorkActivityBanner;
    sections?: WorkActivityPaneSections;
    /** Transcript rows and the host-owned Ask exchange. */
    transcript?: {
        segments: WorkActivityTranscriptSegment[];
        ask?: WorkActivityAsk;
    };
    /**
     * A closing caveat — what this pane does NOT show, and why. Use it to be
     * honest about a capability the viewer does not hold.
     */
    note?: string;
    /** Buttons under the body — "Inspect available v2", "Inspect run". */
    actions?: WorkActivityPaneAction[];
    /**
     * The compute session this node IS — an agent loop in a cloud box.
     *
     * Present, the pane's body becomes the session: gauges, live tail, shell and
     * plan, in place of the per-kind bodies above. The chrome, the banner and the
     * "Reference in chat" footer are unchanged, and every other field on this
     * detail still renders around it, so a run node that also has sources keeps
     * them.
     */
    compute?: WorkComputeDetail;
    artifact?: {
        revisions: WorkArtifactRevision[];
        pending?: {
            id: string;
            label: string;
            status: 'generating' | 'failed';
            message?: string;
        };
        /** Opens the revision (optionally at one page) at full size. Host-owned. */
        onOpenPreview?: (revisionId: string, anchorId?: string) => void;
    };
}

/** The held-back group's state. The host owns the paged fetch. */
export declare interface WorkActivityOmitted {
    /** How many nodes the snapshot held back. */
    count: number;
    expanded: boolean;
    /** Paged in so far, newest first. */
    items: WorkGraphNodeData[];
    loading?: boolean;
    error?: string;
    /** Another page exists. */
    hasMore: boolean;
    /** The size of one page, for the "Load N more" label. Defaults to 25. */
    pageSize?: number;
    onExpand: () => void;
    onCollapse: () => void;
    onLoadMore: () => void;
}

export declare interface WorkActivityPaneAction {
    id: string;
    label: string;
    /** Selecting this action moves the graph selection; the host owns navigation. */
    selection?: Exclude<WorkGraphSelection, null>;
    onSelect?: () => void;
}

/** The two bodies an activity panel can hold. */
export declare type WorkActivityPanelView = 'activity' | 'lab';

export declare interface WorkActivityPaneSections {
    /**
     * What the run was given — "Planning sync transcript", "Release plan · rev 6".
     * Pass references rather than bare strings when two inputs can share a label:
     * the id is what keeps them apart, and what lets the row open its source.
     */
    inputs?: Array<string | WorkActivityReference>;
    /** Tools the run is authorized to use in this attempt. */
    tools?: string[];
    sources?: WorkActivityReference[];
    workItem?: WorkActivityReference;
    /** A prose paragraph under the banner. */
    description?: string;
}

/** Why a waiting run waits: an approval gate, or a breakpoint on `step`. */
export declare interface WorkActivityPause {
    reason: 'awaiting_approval' | 'paused_at_breakpoint';
    /** The step's display label ("write"), when the source named one. */
    step?: string;
}

export declare interface WorkActivityPresentation {
    efforts: WorkActivityEffort[];
    details?: Record<string, WorkActivityNodeDetail>;
    /** Only fresh, running operations in a live query; never inferred from a neighbor. */
    activeEdgeIds: string[];
    /** Operations whose latest attempt failed. Drawn in the danger tone with a label. */
    failedEdgeIds?: string[];
    /** Pill wording per canonical edge id — "generating", "failed". Overrides `label`. */
    edgeLabels?: Record<string, string>;
    /** Canonical edges retain identity even when their visual input arrow reverses. */
    reversedEdgeIds?: string[];
    mode: 'split' | 'full';
    window: WorkActivityWindow;
    bounds: {
        start: number;
        end: number;
    };
    /** v1 latest-state data must be described as recent work, not historical replay. */
    temporalMode: 'recent' | 'as-of';
    events?: Array<{
        at: number;
        count: number;
    }>;
    /**
     * The wall clock, in UTC epoch milliseconds. The ruler stops here rather
     * than at the day's end, so "Now" lands where now actually is. Omit and the
     * strip follows the live window, or the browser clock when it is not.
     */
    now?: number;
    view: WorkActivityView;
    /**
     * Where the selected node's detail pane goes.
     * `column` (the default) makes it a sibling column of the canvas — the host's
     * fourth pane, laid out by this component so the activity header spans both.
     * `overlay` lays it over the canvas, which is right only when the pane is too
     * narrow to split. `auto` picks between them from the measured width.
     * `none` renders no pane here: the host places `WorkNodePane` in its own grid.
     */
    detailsPlacement?: 'auto' | 'column' | 'overlay' | 'none';
    /** Panel title. When supplied the renderer draws its own header row. */
    title?: string;
    /** A second clause under the title — "Working now · Sharing with you". */
    subtitle?: string;
    /** Whether the panel currently occupies the conversation area. */
    expanded?: boolean;
    /** Offers the expand/restore control. The host owns the layout change. */
    onExpand?: () => void;
    /** Offers the pop-out control. The host owns the standalone route. */
    onPopOut?: () => void;
    /** Offers the close control. The host owns dismissal. */
    onClose?: () => void;
    /**
     * "← Earlier work". The host shifts the window earlier; without it the
     * renderer steps the current window back by its own duration.
     */
    onEarlier?: () => void;
    /**
     * Work the snapshot held back under its node cap (realtime-examples NFR
     * #221). Drawn as a collapsed "N more earlier" group on the canvas; the host
     * pages the items in when the viewer expands it.
     */
    omitted?: WorkActivityOmitted;
    onWindowChange: (window: WorkActivityWindow) => void;
    onViewChange: (view: WorkActivityView) => void;
    onFeedback?: (selection: Exclude<WorkGraphSelection, null>) => void;
}

/** A row that points at another authorized item — a source, a work item. */
export declare interface WorkActivityReference {
    id: string;
    title: string;
    meta?: string;
    /** Canonical target. Omitted when the viewer may see the row but not open it. */
    selection?: Exclude<WorkGraphSelection, null>;
}

export declare interface WorkActivityTranscriptSegment {
    id: string;
    /** Already formatted in the host's timezone — the pane does no clock maths. */
    at: string;
    speaker: string;
    text: string;
    anchorId?: string;
}

export declare interface WorkActivityView {
    focusedEffortId: string | null;
    expandedSourceEfforts: string[];
    overviewViewport?: WorkGraphViewport;
    canvasInitialized?: boolean;
}

export declare interface WorkActivityWindow {
    start: number;
    end: number;
    following: boolean;
}

/**
 * The artifact body of a detail pane: which revisions exist, what the selected
 * one looks like, and which pages it has. A pending attempt is never a
 * revision — it cannot be selected, opened or referenced.
 */
export declare function WorkArtifactInspector({ node, artifact, selection, onSelectionChange, onOpen, onReference, quiet }: {
    node: WorkGraphNodeData;
    artifact: NonNullable<WorkActivityNodeDetail['artifact']>;
    selection: Extract<WorkGraphSelection, {
        kind: 'node';
    }>;
    onSelectionChange: (selection: WorkGraphSelection) => void;
    onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
    onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
    /** Suppress the pending-attempt line when the pane's banner already says it. */
    quiet?: boolean;
}): JSX.Element;

export declare interface WorkArtifactRevision {
    id: string;
    label: string;
    createdAt: string;
    /** The host resolves protected preview content; the graph does not fetch URLs. */
    preview?: ReactNode;
    anchorId?: string;
    anchorLabel?: string;
    /** Navigable pages of this revision. Omit when the artifact has no pages. */
    slides?: WorkArtifactSlide[];
}

export declare interface WorkArtifactSlide {
    id: string;
    /** 1-based position the host prints as "Slide 4 of 12". */
    index: number;
    title: string;
    /** The host resolves protected preview content; the graph does not fetch URLs. */
    preview?: ReactNode;
}

/** A file the session produced, already authorized for this viewer. */
export declare interface WorkComputeArtifact {
    id: string;
    name: string;
    sizeBytes?: number;
    /** Already formatted by the host — the pane does no clock maths. */
    updatedAt?: string;
    /** Host-owned download through its own authorized route. */
    onDownload?: () => void;
}

/**
 * The compute session behind a work-graph node — an agent loop in a cloud box.
 *
 * Every field is host-resolved from `GET /api/agent-loops/:runId`. Nothing here
 * is fetched, polled or inferred by the pane: it renders the gauges, the tail
 * and the plan it is given, and says so honestly when a field is absent.
 */
export declare interface WorkComputeDetail {
    /** The box's operator-facing name — `auth-migration-3`. */
    label: string;
    runtime: 'agentcore-microvm' | 'local';
    /** The initiative this box is charged to. Shown in the breadcrumb. */
    project?: string;
    status: WorkComputeStatus;
    owner: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    /** True when the viewer is not the owner — "Shared with you" vs "Yours". */
    shared: boolean;
    task: {
        title: string;
        description?: string;
        /** Already formatted in the host's timezone — "09:15". */
        startedAt?: string;
        elapsedMs?: number;
        /** What the work runs as — `devbox:task`. */
        environment: string;
    };
    metrics: {
        model: string;
        costUsd?: number;
        contextTokens: number;
        contextBudgetTokens?: number;
    };
    /** The last few tail lines, for the pre-shell digest. */
    terminalPreview: {
        lines: WorkComputeTerminalLine[];
        running: boolean;
    };
    /** The plan, as the planner produced it. */
    progress: WorkComputeStep[];
    artifacts: WorkComputeArtifact[];
    workItem?: {
        key: string;
        status: string;
        title: string;
        tags: string[];
        onOpen?: () => void;
    };
    events: WorkComputeEvent[];
    /**
     * The box behind the loop. Present = a Shell tab exists. `shellUrl` is minted
     * on demand by the host, so its absence is a button, not an error.
     */
    shell?: {
        sessionId: string;
        shellUrl?: string;
    };
    /** Milliseconds until the reaper stops this box, when the host knows. */
    stopsInMs?: number;
    /** Denominator for the expiry meter. Defaults to the compute surface's hour. */
    idleWindowMs?: number;
    /** Honest state — "Mock runtime", "Planner unavailable · single step". */
    notice?: string;
    /** Primary action. Mints the shell URL; the pane switches to the Shell tab. */
    onOpenShell?: () => void;
    /** Pops the live tail out of the pane. */
    onOpenInNew?: () => void;
    /** Hands the whole session to the Computer Lab surface. */
    onOpenLab?: () => void;
    /** Rows of the `…` overflow menu beside the primary action. */
    moreActions?: WorkActivityPaneAction[];
}

/** One frame off the session tail. Twin of `LabEvent`. */
export declare interface WorkComputeEvent {
    id: string;
    at: string;
    kind: 'command' | 'text' | 'tool' | 'result' | 'error' | 'status' | 'iteration';
    text: string;
    /** Long form — a tool's arguments and output. Collapsed behind a disclosure. */
    detail?: string;
    /** True when the runtime that produced this frame was a mock. Always shown. */
    mock?: boolean;
}

export declare function WorkComputePane({ compute, banner, className, 'data-testid': testId, }: WorkComputePaneProps): JSX.Element;

export declare interface WorkComputePaneProps {
    compute: WorkComputeDetail;
    /**
     * The banner the host authored, if any. Absent, the pane derives the session
     * card from the compute data — the state line every detail pane opens with,
     * said in the words this kind of node has.
     */
    banner?: WorkActivityBanner;
    className?: string;
    'data-testid'?: string;
}

/**
 * Where a compute session is.
 *
 * Deliberately a structural TWIN of `LabStatus` in `social/ChatLabShell`
 * rather than an import of it: the same host value must satisfy both, but the
 * graph entry taking a type dependency on the chat entry would drag the chat
 * module graph into `dist/graph.d.ts` for a union of eight strings. Identical
 * unions are mutually assignable, so a host passes one value to both with no
 * cast; keep the two lists in step.
 */
export declare type WorkComputeStatus = 'planning' | 'starting' | 'running' | 'waiting' | 'done' | 'failed' | 'stopped' | 'budget';

/** One planned step of the loop. Twin of `LabStep`, plus a duration. */
export declare interface WorkComputeStep {
    id: string;
    title: string;
    kind: string;
    status: 'pending' | 'running' | 'done' | 'failed' | 'skipped';
    iterations?: number;
    contextTokens?: number;
    /** Wall clock this step has taken, or took. Rendered as "2m 14s". */
    elapsedMs?: number;
}

/**
 * One line of the terminal digest.
 *
 * The glyph is a KIND, not a character, so the pane owns the alphabet: a host
 * that sent `▶` directly would be drawing the terminal rather than describing
 * what is in it, and could not be restyled.
 */
export declare interface WorkComputeTerminalLine {
    glyph: 'prompt' | 'step' | 'done' | 'pending' | 'text';
    text: string;
}

/**
 * Presentation-only selectable edge. All labels and disclosure decisions must
 * already be viewer-safe when they reach this component.
 */
export declare function WorkEdge({ edge, selected, reducedMotion, fromLabel, toLabel, onSelect, }: WorkEdgeProps): JSX.Element;

export declare interface WorkEdgeProps {
    edge: WorkGraphEdgeData;
    selected?: boolean;
    reducedMotion?: boolean;
    fromLabel: string;
    toLabel: string;
    onSelect?: (id: string) => void;
}

export declare function WorkEntityList({ nodes, edges, selection, onSelectionChange, heading, groups, footer, statusLabelOf }: WorkEntityListProps): JSX.Element;

/** One activity's items in the accessible list, in the canvas's order. */
export declare interface WorkEntityListGroup {
    id: string;
    title: string;
    subtitle?: string;
    nodeIds: string[];
}

export declare interface WorkEntityListProps extends WorkInspectorProps {
    heading?: ReactNode;
    /**
     * When given, the list shows only these groups' items, under their titles,
     * in this order — the activities the canvas is showing. Omitted: every node.
     */
    groups?: WorkEntityListGroup[];
    /** Rendered under the items, e.g. "Show all N activities". */
    footer?: ReactNode;
    /**
     * A status word for a node in place of its raw status — "Paused at write"
     * for a waiting run (NFR #126, `workPauseLabel`). Undefined keeps the status.
     */
    statusLabelOf?: (node: WorkGraphNodeData) => string | undefined;
}

export declare function WorkGraph(props: WorkGraphProps): JSX.Element;

export declare type WorkGraphCapability = 'message' | 'view-document' | 'edit-document' | 'join-conversation' | 'join-meeting' | 'observe-terminal' | 'control-terminal' | 'view-transcript' | 'view-run' | 'dispatch-run';

/** Frozen import names for the component implementation wave. */
export declare type WorkGraphComponentName = 'WorkGraph' | 'WorkNode' | 'WorkEdge' | 'WorkStatus' | 'WorkInspector' | 'WorkEntityList' | 'WorkSharingControls' | 'WorkReferenceCard';

export declare type WorkGraphDisclosure = 'existence' | 'summary' | 'details';

export declare interface WorkGraphEdgeData {
    id: string;
    fromId: string;
    toId: string;
    relation: WorkGraphRelation;
    label?: string;
    status: WorkGraphStatus;
    disclosure: WorkGraphDisclosure;
    startedAt?: string;
    updatedAt: string;
    endedAt?: string;
    capabilities: WorkGraphCapability[];
}

export declare interface WorkGraphNodeData {
    id: string;
    kind: WorkGraphNodeKind;
    title: string;
    description?: string;
    status: WorkGraphStatus;
    disclosure: WorkGraphDisclosure;
    startedAt?: string;
    updatedAt: string;
    endedAt?: string;
    capabilities: WorkGraphCapability[];
    avatarUrl?: string;
    locked?: boolean;
}

/** Presentation-only work graph contracts. Hosts pass viewer-sanitized data. */
export declare type WorkGraphNodeKind = 'project' | 'terminal' | 'agent' | 'run' | 'document' | 'change' | 'conversation' | 'meeting' | 'transcript' | 'task';

export declare interface WorkGraphProps {
    nodes: WorkGraphNodeData[];
    edges: WorkGraphEdgeData[];
    selection: WorkGraphSelection;
    viewport: WorkGraphViewport;
    /** Calendar day shown by the host, in YYYY-MM-DD form. */
    day?: string;
    /** IANA timezone used to place activity within that day. */
    timezone?: string;
    sources?: WorkGraphSourceState[];
    state?: 'loading' | 'ready' | 'empty' | 'partial' | 'error';
    errorMessage?: string;
    className?: string;
    /** Authorized effort/revision presentation. Omit for the existing v1 view. */
    activity?: WorkActivityPresentation;
    /** Activity-canvas backdrop. Defaults to `'ripple-grid'`. */
    background?: WorkActivityCanvasBackground;
    /**
     * How many activity graphs the canvas may draw at once. Defaults to
     * `WORK_ACTIVITY_DEFAULT_MAX_EFFORTS` (2); `WORK_ACTIVITY_ALL_EFFORTS` (0) or
     * a non-finite value means no cap. The newest efforts win, the effort holding
     * the current selection is never dropped, and the ones that are dropped are
     * still counted in the header and footer.
     */
    maxEfforts?: number;
    /**
     * Makes the cap the host's to own. Without it the panel keeps the value in
     * its own state and `maxEfforts` is only the starting point, so a host gets
     * the control working by passing nothing at all.
     */
    onMaxEffortsChange?: (maxEfforts: number) => void;
    onSelectionChange: (selection: WorkGraphSelection) => void;
    onViewportChange: (viewport: WorkGraphViewport) => void;
    onRetry?: () => void;
    onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
    onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
    onRequestCollaboration?: (selection: Exclude<WorkGraphSelection, null>, capability: WorkGraphCapability) => void;
}

export declare type WorkGraphRelation = 'works-on' | 'runs-in' | 'operates-on' | 'produced' | 'edited' | 'attended' | 'discussed' | 'derived-from';

export declare type WorkGraphSelection = {
    kind: 'node';
    id: string;
    revisionId?: string;
    anchorId?: string;
} | {
    kind: 'edge';
    id: string;
} | null;

export declare interface WorkGraphSourceState {
    source: 'cloud-compute' | 'local-compute' | 'document' | 'pipeline' | 'conversation' | 'meeting';
    health: 'available' | 'delayed' | 'disconnected' | 'authorization-unavailable';
    checkedAt: string;
    message?: string;
}

export declare type WorkGraphStatus = 'idle' | 'running' | 'waiting' | 'completed' | 'error' | 'stopped' | 'stale';

export declare interface WorkGraphViewport {
    x: number;
    y: number;
    zoom: number;
}

export declare function WorkInspector({ nodes, edges, selection, onSelectionChange, onOpen, onReference, onRequestCollaboration }: WorkInspectorProps): JSX.Element;

export declare interface WorkInspectorProps {
    nodes: WorkGraphNodeData[];
    edges: WorkGraphEdgeData[];
    selection: WorkGraphSelection;
    onSelectionChange: (selection: WorkGraphSelection) => void;
    onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
    onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
    onRequestCollaboration?: (selection: Exclude<WorkGraphSelection, null>, capability: WorkGraphCapability) => void;
}

export declare function WorkNode({ node, selected, sharingFresh, onSelect, onOpen }: WorkNodeProps): JSX.Element;

/**
 * The detail pane for one selected node: chrome, a state banner, whichever
 * bodies the host supplied data for, and one way to carry the thing back into
 * the conversation. Composition rather than a kind switch — a node that has an
 * artifact AND sources gets both, and a node the viewer may only see the
 * existence of gets chrome and an honest empty body.
 */
export declare function WorkNodePane({ node, detail, selection, onSelectionChange, onClose, onOpen, onReference, live, headerAccessory, className, 'data-testid': testId, }: WorkNodePaneProps): JSX.Element;

export declare interface WorkNodePaneProps {
    node: WorkGraphNodeData;
    detail?: WorkActivityNodeDetail;
    selection: Extract<WorkGraphSelection, {
        kind: 'node';
    }>;
    onSelectionChange: (selection: WorkGraphSelection) => void;
    onClose: () => void;
    onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
    onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
    /**
     * The canvas's own liveness (`activity.window.following`). With it, a
     * running node whose source lease has lapsed says "updates delayed" here
     * exactly as its card does — the card's accessible name said it while the
     * pane, the place that is supposed to say MORE, said only "Running".
     */
    live?: boolean;
    /**
     * Beside the close button in the pane's header — who else has this node
     * open (`<PresenceAvatars>`), for instance. Never shrinks the title away:
     * the title truncates first.
     */
    headerAccessory?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare interface WorkNodeProps {
    node: WorkGraphNodeData;
    selected?: boolean;
    /** Sharing heartbeat freshness; independent from the node's work status. */
    sharingFresh?: boolean;
    onSelect?: (id: string) => void;
    onOpen?: (id: string) => void;
}

/**
 * The work a capped snapshot held back (realtime-examples NFR #221): collapsed
 * it is one card, "N more earlier"; expanded it lists what the host has paged
 * in so far, newest first, with a control for the next page. The host owns the
 * fetch — this renders the count, the items and the paging state it is given.
 */
export declare function WorkOmittedGroup({ omitted, timezone, className }: WorkOmittedGroupProps): JSX.Element;

export declare interface WorkOmittedGroupProps {
    omitted: WorkActivityOmitted;
    /** The graph's timezone, for the item times. */
    timezone?: string;
    className?: string;
}

/** The state line a detail pane opens with. One dot, one claim, one qualifier. */
export declare function WorkPaneBanner({ banner }: {
    banner: WorkActivityBanner;
}): JSX.Element;

/**
 * The words for WHY a run is waiting — the same vocabulary the run cards use
 * (`AgentRunCard` / `RunSummaryPanel`: "Needs approval"; the editor's
 * breakpoint overlay: "Paused at <step>"). Undefined unless the status is
 * `waiting` and a reason was given, so a caller can fall back to "Waiting".
 */
export declare function workPauseLabel(status: WorkGraphStatus, pause?: WorkActivityPause): string | undefined;

export declare function WorkReferenceCard({ target, state, node, edge, unavailableLabel, onSelect, onOpen }: WorkReferenceCardProps): JSX.Element;

export declare interface WorkReferenceCardProps {
    target: WorkGraphSelection;
    state: 'loading' | 'available' | 'unavailable';
    node?: WorkGraphNodeData;
    edge?: WorkGraphEdgeData;
    unavailableLabel?: string;
    onSelect?: (selection: Exclude<WorkGraphSelection, null>) => void;
    onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
}

export declare type WorkSharingAudience = {
    kind: 'people';
    personIds: string[];
} | {
    kind: 'conversation';
    conversationIds: string[];
} | {
    kind: 'organization';
};

export declare function WorkSharingControls({ state, value, availableNodes, availableEdges, saving, error, conflict, onChange, onStart, onPause, onResume, onStop, }: WorkSharingControlsProps): JSX.Element;

export declare interface WorkSharingControlsProps {
    state: 'off' | 'active' | 'paused' | 'stopped' | 'expired';
    value: WorkSharingFormValue;
    availableNodes: WorkGraphNodeData[];
    availableEdges: WorkGraphEdgeData[];
    saving?: boolean;
    error?: string;
    conflict?: boolean;
    onChange: (value: WorkSharingFormValue) => void;
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onStop: () => void;
}

export declare interface WorkSharingFormValue {
    audience: WorkSharingAudience;
    selectedNodeIds: string[];
    selectedEdgeIds: string[];
    disclosure: WorkGraphDisclosure;
    expiresAt: string;
    history?: {
        dayFrom: string;
        dayThrough: string;
        expiresAt: string;
    };
}

/**
 * Compact, text-labelled status indicator for work graph nodes and edges.
 *
 * The animated marker is deliberately restricted to fresh, currently
 * running work. The status word and glyph remain present so state is never
 * conveyed by colour or motion alone.
 */
export declare function WorkStatus({ status, sharingFresh, label, className, }: WorkStatusProps): JSX.Element;

export declare interface WorkStatusProps {
    status: WorkGraphStatus;
    sharingFresh?: boolean;
    label?: string;
    className?: string;
}

/** Transcript rows and the host-owned Ask exchange. Never invents an answer. */
export declare function WorkTranscriptPanel({ transcript, onSelect }: {
    transcript: NonNullable<WorkActivityNodeDetail['transcript']>;
    onSelect?: (selection: Exclude<WorkGraphSelection, null>) => void;
}): JSX.Element;

export { }


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasListStyle: {
            /**
             * Make the caret's block a list of the style's kind (if it is not one
             * already) and set its marker.
             */
            setListStyle: (style: ListStyle) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare global {
    interface Window {
        /** Dev-only imperative canvas bridge — see `DevEditorBridge` above. */
        __pipelineEditor?: unknown;
    }
}
