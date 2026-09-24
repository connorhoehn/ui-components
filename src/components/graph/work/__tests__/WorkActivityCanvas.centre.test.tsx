// A node selected from outside the canvas (a deep link, the list, a
// citation) used to open the canvas at the top of the day, with the selected
// card somewhere below the fold. It now lands centred on that card.
import type { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { WorkActivityCanvas } from '../WorkActivityCanvas';
import {
  WORK_ACTIVITY_ALL_EFFORTS,
  WORK_ACTIVITY_DEFAULT_MAX_EFFORTS,
  WORK_CANVAS_FIT_MIN_ZOOM,
  WORK_CANVAS_MIN_ZOOM,
  WORK_CANVAS_OPEN_ZOOM,
} from '../effortLayout';
import type {
  WorkActivityPresentation,
  WorkGraphEdgeData,
  WorkGraphNodeData,
  WorkGraphProps,
  WorkGraphViewport,
} from '../types';

interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  style?: { width?: number; height?: number };
}

let captured: { nodes: FlowNode[]; minZoom: number } | null = null;

vi.mock('@xyflow/react', () => ({
  ReactFlow: (props: { nodes: FlowNode[]; minZoom: number; children?: ReactNode }) => {
    captured = { nodes: props.nodes, minZoom: props.minZoom };
    return <div data-testid="react-flow" />;
  },
  Handle: () => null,
  Background: () => null,
  Controls: () => null,
  EdgeLabelRenderer: ({ children }: { children: ReactNode }) => children,
  MarkerType: { ArrowClosed: 'arrow' },
  Position: { Top: 'top', Bottom: 'bottom', Left: 'left', Right: 'right' },
}));
vi.mock('../../../pipelines/canvas/edges/AnimatedEdge', () => ({ default: () => null }));

// The canvas falls back to 640×480 when nothing resizes it, which is what the
// stubbed ResizeObserver in test-setup guarantees.
const PANE = { width: 640, height: 480 };
const now = Date.parse('2026-09-22T12:00:00Z');
const EFFORT_COUNT = 9;

function scenario(effortCount: number) {
  const nodes: WorkGraphNodeData[] = [];
  const edges: WorkGraphEdgeData[] = [];
  const efforts = [];
  for (let i = 0; i < effortCount; i++) {
    const runId = `run-${i}`;
    const docId = `doc-${i}`;
    nodes.push({ id: runId, kind: 'run', title: `Generate report ${i}`, status: 'running', disclosure: 'details', capabilities: [], updatedAt: new Date(now).toISOString() });
    nodes.push({ id: docId, kind: 'document', title: `Report ${i}`, status: 'running', disclosure: 'details', capabilities: [], updatedAt: new Date(now).toISOString() });
    edges.push({ id: `edge-${i}`, fromId: runId, toId: docId, relation: 'produced', status: 'running', disclosure: 'details', capabilities: [], updatedAt: new Date(now).toISOString() });
    efforts.push({ id: `effort-${i}`, title: `Effort ${i}`, nodeIds: [runId, docId], edgeIds: [`edge-${i}`] });
  }
  return { nodes, edges, efforts };
}

function makeProps(effortCount: number, viewport: WorkGraphViewport, onViewportChange: (v: WorkGraphViewport) => void): WorkGraphProps & { activity: WorkActivityPresentation } {
  const { nodes, edges, efforts } = scenario(effortCount);
  return {
    nodes,
    edges,
    selection: null,
    viewport,
    onSelectionChange: vi.fn(),
    onViewportChange,
    background: 'plain',
    // These cases are about FITTING every effort the host has. The default cap
    // of two would leave nothing to fit, so they opt out of it explicitly.
    maxEfforts: WORK_ACTIVITY_ALL_EFFORTS,
    activity: {
      efforts,
      activeEdgeIds: [],
      mode: 'full',
      window: { start: now - 3_600_000, end: now, following: true },
      bounds: { start: now - 86_400_000, end: now },
      temporalMode: 'recent',
      // `false` so the mount-time auto-fit actually runs.
      view: { focusedEffortId: null, expandedSourceEfforts: [], canvasInitialized: false },
      onWindowChange: vi.fn(),
      onViewChange: vi.fn(),
    },
  };
}

beforeEach(() => { captured = null; });

type Props = ReturnType<typeof makeProps>;
function nodeCentre(props: Props, id: string, viewport: WorkGraphViewport) {
  const frames = new Map(captured!.nodes.filter((n) => n.type === 'effort').map((n) => [n.id, n]));
  const node = captured!.nodes.find((n) => n.id.includes(id) && n.type === 'activity') as FlowNode & { parentId?: string };
  const frame = frames.get(node.parentId!)!;
  const x = (frame.position.x + node.position.x) * viewport.zoom + viewport.x;
  const y = (frame.position.y + node.position.y) * viewport.zoom + viewport.y;
  return { x, y, props };
}

describe('WorkActivityCanvas centres the selection', () => {
  it('opens centred on a deep-linked node', () => {
    const onViewportChange = vi.fn();
    const props = { ...makeProps(EFFORT_COUNT, { x: 0, y: 0, zoom: 1 }, onViewportChange), selection: { kind: 'node' as const, id: 'doc-8' } };
    render(<WorkActivityCanvas {...props} />);
    const opened = onViewportChange.mock.calls.at(-1)![0] as WorkGraphViewport;
    expect(opened.zoom).toBeGreaterThanOrEqual(WORK_CANVAS_OPEN_ZOOM);
    const { x, y } = nodeCentre(props, 'doc-8', opened);
    // The card's top-left is left of and above the pane centre by about half a card.
    expect(x).toBeGreaterThan(0); expect(x).toBeLessThan(PANE.width / 2);
    expect(y).toBeGreaterThan(0); expect(y).toBeLessThan(PANE.height / 2);
  });

  it('pans when the selection changes to a node off screen, and not for a visible one', () => {
    const onViewportChange = vi.fn();
    const viewport = { x: 0, y: 0, zoom: 1 };
    const base = { ...makeProps(EFFORT_COUNT, viewport, onViewportChange), activity: { ...makeProps(EFFORT_COUNT, viewport, vi.fn()).activity, view: { focusedEffortId: null, expandedSourceEfforts: [], canvasInitialized: true } } };
    const { rerender } = render(<WorkActivityCanvas {...base} />);
    const before = onViewportChange.mock.calls.length;
    rerender(<WorkActivityCanvas {...base} selection={{ kind: 'node', id: 'doc-8' }} />);
    expect(onViewportChange.mock.calls.length).toBe(before + 1);
    const panned = onViewportChange.mock.calls.at(-1)![0] as WorkGraphViewport;
    const { x, y } = nodeCentre(base, 'doc-8', panned);
    expect(x).toBeGreaterThan(0); expect(x).toBeLessThan(PANE.width);
    expect(y).toBeGreaterThan(0); expect(y).toBeLessThan(PANE.height);
    // doc-0 sits at the top-left, already on screen at zoom 1: no move.
    rerender(<WorkActivityCanvas {...base} selection={{ kind: 'node', id: 'run-0' }} />);
    expect(onViewportChange.mock.calls.length).toBe(before + 1);
  });
});
