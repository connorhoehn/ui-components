// Fitting and zooming are different intents, and conflating them broke the
// canvas at the size the product actually runs at.
//
// The fit was clamped to the same 0.4 floor as a manual zoom-out. At nine
// parallel efforts — today's real seeded day — the graph does not go in a
// 640×480 pane at 0.4, so the top row of cards sat permanently outside the
// viewport and "Fit graph" appeared to do nothing at all. The only way to see
// the rest of the day's work was to guess that the canvas pans.

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

describe('WorkActivityCanvas fit', () => {
  it('asks for a 160 px floor, so a short panel is not pushed into scrolling the page', () => {
    render(<WorkActivityCanvas {...makeProps(1, { x: 0, y: 0, zoom: 1 }, vi.fn())} />);
    const canvas = screen.getByTestId('work-activity-canvas');
    expect(canvas.className).toContain('min-h-40');
    expect(canvas.className).not.toContain('min-h-80');
  });

  it('fits nine parallel efforts below the interactive floor', () => {
    const onViewportChange = vi.fn();
    render(<WorkActivityCanvas {...makeProps(EFFORT_COUNT, { x: 0, y: 0, zoom: 1 }, onViewportChange)} />);

    expect(onViewportChange).toHaveBeenCalled();
    const fitted = onViewportChange.mock.calls.at(-1)![0] as WorkGraphViewport;
    expect(fitted.zoom).toBeLessThan(WORK_CANVAS_MIN_ZOOM);
    expect(fitted.zoom).toBeGreaterThanOrEqual(WORK_CANVAS_FIT_MIN_ZOOM);
  });

  it('puts every effort frame inside the container at that fit', () => {
    const onViewportChange = vi.fn();
    render(<WorkActivityCanvas {...makeProps(EFFORT_COUNT, { x: 0, y: 0, zoom: 1 }, onViewportChange)} />);
    const fitted = onViewportChange.mock.calls.at(-1)![0] as WorkGraphViewport;

    const frames = captured!.nodes.filter((node) => node.type === 'effort');
    expect(frames).toHaveLength(EFFORT_COUNT);
    // Sub-pixel slack: the fit divides by the content box, so an exactly
    // flush edge can land a hair outside on the last frame.
    const slack = 1;
    for (const frame of frames) {
      const left = frame.position.x * fitted.zoom + fitted.x;
      const top = frame.position.y * fitted.zoom + fitted.y;
      const right = left + (frame.style?.width ?? 0) * fitted.zoom;
      const bottom = top + (frame.style?.height ?? 0) * fitted.zoom;
      expect(left).toBeGreaterThanOrEqual(-slack);
      expect(top).toBeGreaterThanOrEqual(-slack);
      expect(right).toBeLessThanOrEqual(PANE.width + slack);
      expect(bottom).toBeLessThanOrEqual(PANE.height + slack);
    }
  });

  it('keeps the bottom band clear for the zoom controls, and starts at the left edge when wider than the canvas (Loop 34)', () => {
    for (const count of [2, 3]) {
      captured = null;
      const onViewportChange = vi.fn();
      const { unmount } = render(<WorkActivityCanvas {...makeProps(count, { x: 0, y: 0, zoom: 1 }, onViewportChange)} />);
      fireEvent.click(screen.getByRole('button', { name: 'Fit graph' }));
      const fitted = onViewportChange.mock.calls.at(-1)![0] as WorkGraphViewport;
      for (const frame of captured!.nodes.filter((node) => node.type === 'effort')) {
        const bottom = (frame.position.y + (frame.style?.height ?? 0)) * fitted.zoom + fitted.y;
        const left = frame.position.x * fitted.zoom + fitted.x;
        expect(bottom).toBeLessThanOrEqual(PANE.height - 56 + 1);
        expect(left).toBeGreaterThanOrEqual(24 - 1);
      }
      unmount();
    }
  });

  it('"Fit graph" produces the same below-floor fit on demand', () => {
    const onViewportChange = vi.fn();
    render(<WorkActivityCanvas {...makeProps(EFFORT_COUNT, { x: 0, y: 0, zoom: 1 }, onViewportChange)} />);
    onViewportChange.mockClear();

    fireEvent.click(screen.getByRole('button', { name: 'Fit graph' }));

    const fitted = onViewportChange.mock.calls.at(-1)![0] as WorkGraphViewport;
    expect(fitted.zoom).toBeLessThan(WORK_CANVAS_MIN_ZOOM);
  });

  it('a small graph still fits above the floor — the fit floor is not a target', () => {
    const onViewportChange = vi.fn();
    render(<WorkActivityCanvas {...makeProps(1, { x: 0, y: 0, zoom: 1 }, onViewportChange)} />);
    const fitted = onViewportChange.mock.calls.at(-1)![0] as WorkGraphViewport;
    expect(fitted.zoom).toBeGreaterThanOrEqual(WORK_CANVAS_MIN_ZOOM);
  });
});

describe('WorkActivityCanvas user zoom', () => {
  it('stops a manual zoom-out at the interactive floor', () => {
    const onViewportChange = vi.fn();
    render(<WorkActivityCanvas {...makeProps(1, { x: 0, y: 0, zoom: 0.45 }, onViewportChange)} />);
    onViewportChange.mockClear();

    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));

    expect((onViewportChange.mock.calls.at(-1)![0] as WorkGraphViewport).zoom).toBe(WORK_CANVAS_MIN_ZOOM);
  });

  it('reports the interactive floor to the pane at a normal zoom', () => {
    render(<WorkActivityCanvas {...makeProps(1, { x: 0, y: 0, zoom: 1 }, vi.fn())} />);
    expect(captured!.minZoom).toBe(WORK_CANVAS_MIN_ZOOM);
  });

  it('does not zoom IN when zooming out from a below-floor fit', () => {
    const onViewportChange = vi.fn();
    render(<WorkActivityCanvas {...makeProps(EFFORT_COUNT, { x: 0, y: 0, zoom: 0.18 }, onViewportChange)} />);
    onViewportChange.mockClear();

    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));

    const next = onViewportChange.mock.calls.at(-1)![0] as WorkGraphViewport;
    expect(next.zoom).toBeLessThanOrEqual(0.18);
    // The pane must accept the fitted zoom, or React Flow clamps it straight
    // back up and the fit is undone on the next frame.
    expect(captured!.minZoom).toBeLessThanOrEqual(0.18);
  });
});

describe('WorkActivityCanvas readability hint', () => {
  it('says the graph is unreadable and offers the list below the readable zoom', () => {
    const onViewAsList = vi.fn();
    render(
      <WorkActivityCanvas
        {...makeProps(EFFORT_COUNT, { x: 0, y: 0, zoom: 0.18 }, vi.fn())}
        onViewAsList={onViewAsList}
      />,
    );
    expect(screen.getByTestId('work-activity-zoom-hint')).toHaveTextContent('too small to read');
    fireEvent.click(screen.getByTestId('work-activity-zoom-hint-list'));
    expect(onViewAsList).toHaveBeenCalledTimes(1);
  });

  it('stays out of the way at a readable zoom', () => {
    render(<WorkActivityCanvas {...makeProps(1, { x: 0, y: 0, zoom: 1 }, vi.fn())} onViewAsList={vi.fn()} />);
    expect(screen.queryByTestId('work-activity-zoom-hint')).not.toBeInTheDocument();
  });

  it('still explains itself when the host offers no list', () => {
    render(<WorkActivityCanvas {...makeProps(EFFORT_COUNT, { x: 0, y: 0, zoom: 0.18 }, vi.fn())} />);
    expect(screen.getByTestId('work-activity-zoom-hint')).toBeInTheDocument();
    expect(screen.queryByTestId('work-activity-zoom-hint-list')).not.toBeInTheDocument();
  });
});

describe('WorkActivityCanvas opening view (capped efforts)', () => {
  // Two tall efforts in a short pane: the whole-graph fit is ~0.4 and the
  // cards are unreadable (realtime-examples Loop 26, 1640×960).
  function tall(onViewportChange: (v: WorkGraphViewport) => void) {
    const props = makeProps(WORK_ACTIVITY_DEFAULT_MAX_EFFORTS, { x: 0, y: 0, zoom: 1 }, onViewportChange);
    const chain = Array.from({ length: 8 }, (_, i) => ({ ...props.nodes[0]!, id: `step-${i}`, title: `Step ${i}` }));
    const links = chain.slice(1).map((node, i) => ({ ...props.edges[0]!, id: `link-${i}`, fromId: chain[i]!.id, toId: node.id }));
    return {
      ...props,
      maxEfforts: WORK_ACTIVITY_DEFAULT_MAX_EFFORTS,
      nodes: [...props.nodes, ...chain],
      edges: [...props.edges, ...links],
      activity: { ...props.activity, efforts: [{ ...props.activity.efforts[0]!, nodeIds: [...props.activity.efforts[0]!.nodeIds, ...chain.map((n) => n.id)], edgeIds: [...props.activity.efforts[0]!.edgeIds, ...links.map((e) => e.id)] }, props.activity.efforts[1]!] },
    };
  }

  it('opens readable and anchored at the top when the whole graph would fit only smaller', () => {
    const onViewportChange = vi.fn();
    render(<WorkActivityCanvas {...tall(onViewportChange)} />);
    const opened = onViewportChange.mock.calls.at(-1)![0] as WorkGraphViewport;
    expect(opened.zoom).toBeGreaterThan(WORK_CANVAS_MIN_ZOOM);
    expect(opened.zoom).toBeLessThanOrEqual(WORK_CANVAS_OPEN_ZOOM);
    const frames = captured!.nodes.filter((node) => node.type === 'effort');
    const topmost = Math.min(...frames.map((frame) => frame.position.y * opened.zoom + opened.y));
    expect(topmost).toBeGreaterThanOrEqual(0);
    expect(topmost).toBeLessThan(48);

    // "Fit graph" still shows all of it.
    onViewportChange.mockClear();
    fireEvent.click(screen.getByRole('button', { name: 'Fit graph' }));
    const whole = onViewportChange.mock.calls.at(-1)![0] as WorkGraphViewport;
    expect(whole.zoom).toBeLessThan(opened.zoom);
    for (const frame of captured!.nodes.filter((node) => node.type === 'effort')) {
      expect(frame.position.y * whole.zoom + whole.y + (frame.style?.height ?? 0) * whole.zoom).toBeLessThanOrEqual(PANE.height + 1);
    }
  });
});
