// Graph — a dependency-free SVG node graph, the people composite over it, and
// the ready-made chat side-panel body for kind `graph`.
export { NodeGraph, graphGroupPalette, NODE_GRAPH_VIEW_WIDTH } from './NodeGraph';
export type { NodeGraphProps } from './NodeGraph';
export { PeopleGraph, peopleToGraph, matchingTag, PEOPLE_GRAPH_QUERY_NODE_ID } from './PeopleGraph';
export type { PeopleGraphProps, GraphPerson } from './PeopleGraph';
export { createGraphPanelRenderer, GraphPanelBody, isPeopleGraphData } from './graphPanelRenderer';
export type {
  CreateGraphPanelRendererOptions,
  GraphPanelData,
  GraphPanelNodesData,
  GraphPanelPeopleData,
} from './graphPanelRenderer';
export { layoutGraph, graphCenterNode, graphGroups } from './layout';
export type { GraphLayoutSize, GraphPositions } from './layout';
export type { GraphNode, GraphEdge, GraphLayout, GraphPoint } from './types';
