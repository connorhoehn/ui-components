import { type ReactNode } from 'react';
import type { ChatSidePanelRef } from '../social/chatCommands';
import type { ChatSidePanelApi, ChatSidePanelRenderer } from '../social/ChatSidePanelRegistry';
import { type GraphPerson } from './PeopleGraph';
import type { GraphEdge, GraphLayout, GraphNode } from './types';
export interface GraphPanelNodesData {
    title?: string;
    nodes: GraphNode[];
    edges: GraphEdge[];
    layout?: GraphLayout;
}
export interface GraphPanelPeopleData {
    title?: string;
    people: GraphPerson[];
    query?: string;
}
export type GraphPanelData = GraphPanelNodesData | GraphPanelPeopleData;
export declare function isPeopleGraphData(data: GraphPanelData): data is GraphPanelPeopleData;
export interface CreateGraphPanelRendererOptions {
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
/** One line for an embedder: `renderers={{ graph: createGraphPanelRenderer({ load }) }}`. */
export declare function createGraphPanelRenderer(options: CreateGraphPanelRendererOptions): ChatSidePanelRenderer;
interface GraphPanelBodyProps {
    panel: ChatSidePanelRef;
    api: ChatSidePanelApi;
    options: CreateGraphPanelRendererOptions;
}
export declare function GraphPanelBody({ panel, api, options }: GraphPanelBodyProps): ReactNode;
export {};
//# sourceMappingURL=graphPanelRenderer.d.ts.map