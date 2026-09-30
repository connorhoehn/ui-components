import { act, createRef } from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { OrgGraph, type OrgGraphHandle } from '../OrgGraph';
import { ORG_CONTROLS_SIZE, ORG_FIT_ALL_MIN_ZOOM, ORG_FIT_MIN_ZOOM, orgGraphBounds, orgNodeBoxes, toScreen } from '../fitTransform';
import type { GraphPerson, GraphRelationship } from '../types';
import { ORG_LEGEND_INSET } from '../OrgGraphLegend';
import { departments, people, relationships } from './fixtures';

afterEach(cleanup);

// Radial is static (no d3 timer), so node positions exist on first effect.
const base = { people, relationships, departments, layout: 'radial' as const };

// A whole org: 56 people on fixed radial rings (~1000px across) do not fit the
// default 800 × 600 test canvas at the readability floor.
const org: GraphPerson[] = Array.from({ length: 56 }, (_, i) => ({
  id: `o-${i}`, name: `Person${i} Doe`, title: 'Engineer', department: departments[i % 3]!.name,
  skills: [], influenceScore: ((i * 37) % 100) / 100,
}));
const orgRels: GraphRelationship[] = org.map((p, i) => ({
  source: p.id, target: org[(i + 1) % 56]!.id, type: 'collaborates' as const, strength: 0.5,
}));
const whole = { people: org, relationships: orgRels, departments, layout: 'radial' as const };
// The same whole org, focused on one person with every hop drawn — Radial
// with a focus keeps the readability floor (2.404.2: without one it fits all).
const wholeFocused = { ...whole, focusIds: ['o-0'], focusHops: 56 };

function viewTransform() {
  const group = document.querySelector('svg[aria-label="Org graph"] > g')!;
  const m = /translate\(([-\d.e]+), ([-\d.e]+)\) scale\(([-\d.e]+)\)/.exec(group.getAttribute('transform')!)!;
  return { x: Number(m[1]), y: Number(m[2]), scale: Number(m[3]) };
}

/** Screen box of every drawn node with its circle and label pill. */
function drawnScreenBox() {
  const t = viewTransform();
  const nodes = screen.getAllByRole('button', { name: /·/ }).map((el) => {
    const p = /translate\(([-\d.e]+), ([-\d.e]+)\)/.exec(el.getAttribute('transform')!)!;
    const r = Number(el.querySelector('circle.org-node-main')!.getAttribute('r'));
    return { id: el.getAttribute('aria-label')!, name: el.getAttribute('aria-label')!.split(' · ')[0]!, x: Number(p[1]), y: Number(p[2]), r };
  });
  const b = orgGraphBounds(nodes, id => nodes.find(n => n.id === id)!.r)!;
  return { left: b.minX * t.scale + t.x, right: b.maxX * t.scale + t.x, top: b.minY * t.scale + t.y, bottom: b.maxY * t.scale + t.y };
}

/** Screen box of each drawn node (circle + first-name pill; full name for `tall`). */
function nodeScreenBoxes(tall?: ReadonlySet<string>) {
  const t = viewTransform();
  const nodes = screen.getAllByRole('button', { name: /·/ }).map((el) => {
    const p = /translate\(([-\d.e]+), ([-\d.e]+)\)/.exec(el.getAttribute('transform')!)!;
    const r = Number(el.querySelector('circle.org-node-main')!.getAttribute('r'));
    const label = el.getAttribute('aria-label')!;
    return { id: label, name: label.split(' · ')[0]!, x: Number(p[1]), y: Number(p[2]), r };
  });
  return orgNodeBoxes(nodes, id => nodes.find(n => n.id === id)!.r, tall).map(b => ({ id: b.id, ...toScreen(b, t) }));
}

describe('OrgGraph', () => {
  it('renders every person as a keyboard-reachable node, the legend, and the zoom cluster', () => {
    render(<OrgGraph {...base} />);
    for (const p of people) {
      expect(screen.getByRole('button', { name: `${p.name} · ${p.title} · ${p.department}` })).toBeInTheDocument();
    }
    const legend = screen.getByTestId('org-graph-legend');
    expect(within(legend).getByText('Departments')).toBeInTheDocument();
    for (const label of ['Collaborates', 'Mentors', 'Reports To', 'Shared Expertise']) {
      expect(within(legend).getByText(label)).toBeInTheDocument();
    }
    expect(screen.getByRole('toolbar', { name: 'Zoom' })).toBeInTheDocument();
    expect(document.querySelectorAll('line[data-relationship]')).toHaveLength(relationships.length);
    // reports_to carries the arrowhead marker; the marker id is instance-scoped.
    const reports = document.querySelector('line[data-relationship="reports_to"]')!;
    expect(reports.getAttribute('marker-end')).toMatch(/^url\(#org-arrow-/);
  });

  it('single-select toggles a person and reports it', () => {
    const onPersonSelect = vi.fn();
    render(<OrgGraph {...base} onPersonSelect={onPersonSelect} />);
    const vera = screen.getByRole('button', { name: /^Vera Green/ });
    fireEvent.click(vera);
    expect(onPersonSelect).toHaveBeenLastCalledWith(people[0]);
    expect(vera).toHaveAttribute('aria-pressed', 'true');
    fireEvent.keyDown(vera, { key: 'Enter' });
    expect(onPersonSelect).toHaveBeenLastCalledWith(null);
  });

  it('multi-select defers to the host set', () => {
    const onToggle = vi.fn();
    render(<OrgGraph {...base} multiSelectIds={new Set(['p-3'])} onToggleMultiSelect={onToggle} />);
    expect(screen.getByRole('button', { name: /^Hiro Tanaka/ })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: /^Aisha Bello/ }));
    expect(onToggle).toHaveBeenCalledWith('p-4');
  });

  it('filters to a department from the legend', () => {
    render(<OrgGraph {...base} />);
    fireEvent.click(within(screen.getByTestId('org-graph-legend')).getByRole('button', { name: 'Security' }));
    expect(screen.getAllByRole('button', { name: /·/ })).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Clear Filter' }));
    expect(screen.getAllByRole('button', { name: /·/ })).toHaveLength(people.length);
  });

  it('shows influence on the hover card only when allowed', () => {
    const { rerender } = render(<OrgGraph {...base} />);
    fireEvent.mouseEnter(screen.getByRole('button', { name: /^Vera Green/ }));
    expect(screen.getByTestId('org-graph-tooltip')).toHaveTextContent('Staff Engineer');
    expect(screen.queryByText('Influence')).not.toBeInTheDocument();
    rerender(<OrgGraph {...base} showInfluence />);
    expect(screen.getByText('Influence')).toBeInTheDocument();
    expect(screen.getByText('90/100')).toBeInTheDocument();
  });

  it('zooms from the cluster and resets with fit', () => {
    render(<OrgGraph {...base} />);
    // Four people fit well inside 800×600, so the fit stops at its 125% cap.
    expect(screen.getByLabelText('Zoom 125%')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(screen.getByLabelText('Zoom 150%')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
    expect(screen.getByLabelText('Zoom 125%')).toBeInTheDocument();
  });

  it('renders the animated force layout without throwing', () => {
    render(<OrgGraph people={people} relationships={relationships} departments={departments} legend={false} controls={false} />);
    expect(screen.getByRole('group', { name: 'Org graph' })).toBeInTheDocument();
    expect(screen.queryByTestId('org-graph-legend')).not.toBeInTheDocument();
  });

  it('focusIds draws the focus and its neighbours only, and spotlights the focus', () => {
    render(<OrgGraph {...base} focusIds={['p-4']} />);
    expect(screen.queryByRole('button', { name: /^Vera Green/ })).toBeNull();
    expect(screen.queryByRole('button', { name: /^Nora Chang/ })).toBeNull();
    expect(screen.getByRole('button', { name: /^Aisha Bello/ })).toHaveAttribute('opacity', '1');
    expect(screen.getByRole('button', { name: /^Hiro Tanaka/ })).toHaveAttribute('opacity', '0.3');
    expect(document.querySelectorAll('line[data-relationship]')).toHaveLength(1);
  });

  it('fits the viewport to a focused set: centred right of the legend, inside the canvas, zoom capped', () => {
    render(<OrgGraph {...base} focusIds={['p-1']} />);
    const group = document.querySelector('svg[aria-label="Org graph"] > g')!;
    const m = /translate\(([-\d.e]+), ([-\d.e]+)\) scale\(([-\d.e]+)\)/.exec(group.getAttribute('transform')!)!;
    const [tx, ty, k] = [Number(m[1]), Number(m[2]), Number(m[3])];
    expect(k).toBeGreaterThanOrEqual(ORG_FIT_MIN_ZOOM);
    expect(k).toBeLessThanOrEqual(1.25);
    expect(tx !== 0 || ty !== 0 || k !== 1).toBe(true);
    const drawn = screen.getAllByRole('button', { name: /·/ });
    expect(drawn).toHaveLength(3); // Vera + Nora + Hiro
    const screenPts = drawn.map((el) => {
      const p = /translate\(([-\d.e]+), ([-\d.e]+)\)/.exec(el.getAttribute('transform')!)!;
      return { x: Number(p[1]) * k + tx, y: Number(p[2]) * k + ty };
    });
    for (const pt of screenPts) {
      // Clear of the legend's column (ORG_LEGEND_INSET) plus the fit padding.
      expect(pt.x).toBeGreaterThan(ORG_LEGEND_INSET + 32);
      expect(pt.x).toBeLessThan(800 - 32);
      expect(pt.y).toBeGreaterThan(32);
      expect(pt.y).toBeLessThan(600 - 32);
    }
    // The drawing is centred in the clear area right of the legend.
    const xs = screenPts.map(p => p.x);
    expect((Math.min(...xs) + Math.max(...xs)) / 2).toBeCloseTo((ORG_LEGEND_INSET + 800) / 2, -1);
  });

  it('fitInset keeps the drawing clear of a host card on the right', () => {
    render(<OrgGraph {...base} legend={false} fitInset={{ right: 320 }} />);
    const group = document.querySelector('svg[aria-label="Org graph"] > g')!;
    const m = /translate\(([-\d.e]+), ([-\d.e]+)\) scale\(([-\d.e]+)\)/.exec(group.getAttribute('transform')!)!;
    const [tx, k] = [Number(m[1]), Number(m[3])];
    const xs = screen.getAllByRole('button', { name: /·/ }).map((el) => {
      const p = /translate\(([-\d.e]+), ([-\d.e]+)\)/.exec(el.getAttribute('transform')!)!;
      return Number(p[1]) * k + tx;
    });
    expect(xs).toHaveLength(4);
    for (const x of xs) {
      expect(x).toBeGreaterThan(32);
      expect(x).toBeLessThan(800 - 320 - 32);
    }
    expect((Math.min(...xs) + Math.max(...xs)) / 2).toBeCloseTo((800 - 320) / 2, -1);
  });

  it('draws the legend as an opaque, fixed-width surface panel — never translucent over nodes', () => {
    render(<OrgGraph {...base} />);
    const legend = screen.getByTestId('org-graph-legend');
    expect(legend.className).toMatch(/\bbg-surface\b/);
    expect(legend.className).toMatch(/\bborder-border\b/);
    expect(legend.className).toMatch(/\bw-44\b/);
    expect(legend.className).not.toMatch(/opacity-/);
    fireEvent.mouseEnter(legend);
    expect(legend.className).not.toMatch(/opacity-/);
  });

  it('does not draw the focus as the one big circle when sizing by connections', () => {
    render(<OrgGraph {...base} focusIds={['p-1']} />);
    const r = (name: RegExp) => Number(screen.getByRole('button', { name }).querySelector('circle.org-node-main')!.getAttribute('r'));
    // Vera touches all three lines; Nora, her best-connected neighbour, two.
    expect(r(/^Vera Green/)).toBe(r(/^Nora Chang/));
    // With influence sizing the host asked for, influence decides.
    cleanup();
    render(<OrgGraph {...base} focusIds={['p-1']} showInfluence />);
    expect(r(/^Vera Green/)).toBeGreaterThan(r(/^Nora Chang/));
  });

  it('draws each first name on a pill, and "Fit to view" re-fits after a pan', () => {
    render(<OrgGraph {...base} focusIds={['p-1']} />);
    const vera = screen.getByRole('button', { name: /^Vera Green/ });
    expect(vera.querySelector('[data-org-label] rect')).not.toBeNull();
    expect(vera.querySelector('[data-org-label] text')).toHaveTextContent('Vera');
    const group = document.querySelector('svg[aria-label="Org graph"] > g')!;
    const fitted = group.getAttribute('transform');
    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));
    expect(group.getAttribute('transform')).not.toBe(fitted);
    fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
    expect(group.getAttribute('transform')).toBe(fitted);
  });

  it('the automatic fit holds the readability floor; Fit to view ignores it and shows everyone', () => {
    render(<OrgGraph {...wholeFocused} />);
    expect(viewTransform().scale).toBe(ORG_FIT_MIN_ZOOM);
    let box = drawnScreenBox();
    expect(box.right > 800 || box.bottom > 600).toBe(true); // overflows at the floor
    fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
    const k = viewTransform().scale;
    expect(k).toBeLessThan(ORG_FIT_MIN_ZOOM);
    expect(k).toBeGreaterThanOrEqual(ORG_FIT_ALL_MIN_ZOOM);
    box = drawnScreenBox();
    expect(box.left).toBeGreaterThanOrEqual(0);
    expect(box.top).toBeGreaterThanOrEqual(0);
    expect(box.right).toBeLessThanOrEqual(800);
    expect(box.bottom).toBeLessThanOrEqual(600);
  });

  it('minFitZoom tunes the automatic floor', () => {
    render(<OrgGraph {...wholeFocused} minFitZoom={1.2} />);
    expect(viewTransform().scale).toBe(1.2);
  });

  it('ref.fitAll() fits the whole drawn set with no floor, like the control', () => {
    const ref = createRef<OrgGraphHandle>();
    render(<OrgGraph {...wholeFocused} ref={ref} controls={false} />);
    expect(viewTransform().scale).toBe(ORG_FIT_MIN_ZOOM);
    act(() => ref.current!.fitAll());
    const box = drawnScreenBox();
    expect(viewTransform().scale).toBeLessThan(ORG_FIT_MIN_ZOOM);
    expect(box.right).toBeLessThanOrEqual(800);
    expect(box.bottom).toBeLessThanOrEqual(600);
  });

  it('keeps the fitted drawing clear of the zoom controls', () => {
    const controlsRect = {
      left: 800 - ORG_CONTROLS_SIZE.width, top: 600 - ORG_CONTROLS_SIZE.height, right: 800, bottom: 600,
    };
    const intersects = (b: ReturnType<typeof drawnScreenBox>) =>
      b.left < controlsRect.right && b.right > controlsRect.left && b.top < controlsRect.bottom && b.bottom > controlsRect.top;
    render(<OrgGraph {...whole} />);
    fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
    expect(intersects(drawnScreenBox())).toBe(false);
    // Without the controls the same fit uses that corner.
    cleanup();
    const noControls = createRef<OrgGraphHandle>();
    cleanup();
    render(<OrgGraph {...whole} controls={false} ref={noControls} />);
    act(() => noControls.current!.fitAll());
    expect(intersects(drawnScreenBox())).toBe(true);
  });
});

describe('OrgGraph — Radial whole org (2.403.5)', () => {
  /** Report a `width` × `height` canvas to the graph's ResizeObserver. */
  function canvas(width: number, height: number) {
    vi.stubGlobal('ResizeObserver', class {
      constructor(private cb: ResizeObserverCallback) {}
      observe(el: Element) { this.cb([{ target: el, contentRect: { width, height } } as unknown as ResizeObserverEntry], this as unknown as ResizeObserver); }
      unobserve() {}
      disconnect() {}
    });
  }
  afterEach(() => vi.unstubAllGlobals());

  it('56 people on 1160 × 400: Fit to view shows every one of them (was 39 of 56 at 50%)', () => {
    canvas(1160, 400);
    const ref = createRef<OrgGraphHandle>();
    render(<OrgGraph {...whole} ref={ref} />);
    fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
    const inside = () => {
      const box = drawnScreenBox();
      expect(box.left).toBeGreaterThanOrEqual(0);
      expect(box.top).toBeGreaterThanOrEqual(0);
      expect(box.right).toBeLessThanOrEqual(1160);
      expect(box.bottom).toBeLessThanOrEqual(400);
    };
    inside();
    expect(viewTransform().scale).toBeGreaterThanOrEqual(ORG_FIT_ALL_MIN_ZOOM);
    // The rings are shaped to the canvas, so the whole org fits at a zoom
    // near Force's (≈ 0.6), not at the hard minimum.
    expect(viewTransform().scale).toBeGreaterThan(0.5);
    act(() => ref.current!.fitAll());
    inside();
  });

  it('the rings are ellipses wider than tall on a wide canvas', () => {
    canvas(1160, 400);
    render(<OrgGraph {...whole} />);
    const pts = screen.getAllByRole('button', { name: /·/ }).map((el) => {
      const p = /translate\(([-\d.e]+), ([-\d.e]+)\)/.exec(el.getAttribute('transform')!)!;
      return { x: Number(p[1]), y: Number(p[2]) };
    });
    const w = Math.max(...pts.map((p) => p.x)) - Math.min(...pts.map((p) => p.x));
    const h = Math.max(...pts.map((p) => p.y)) - Math.min(...pts.map((p) => p.y));
    expect(w / h).toBeGreaterThan(2.5);
  });

  // The member journey (2.404.2): whole org, Radial, no focus, 1160 × ~400
  // opened at the 0.9 floor with 29 of 56 inside and the zoom cluster over
  // two people. Rings are meant to be seen whole.
  const W = 1160, H = 400;
  const legendRect = { left: 0, top: 0, right: ORG_LEGEND_INSET, bottom: H };
  const controlsRect = { left: W - ORG_CONTROLS_SIZE.width, top: H - ORG_CONTROLS_SIZE.height, right: W, bottom: H };
  type Box = { left: number; top: number; right: number; bottom: number };
  const hit = (a: Box, b: Box) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

  it('56 people, Radial, no focus on 1160 × 400: the opening view shows every node, none under the legend or controls', () => {
    canvas(W, H);
    render(<OrgGraph {...whole} />);
    const k = viewTransform().scale;
    expect(k).toBeGreaterThanOrEqual(ORG_FIT_ALL_MIN_ZOOM);
    expect(k).toBeLessThan(ORG_FIT_MIN_ZOOM);
    const boxes = nodeScreenBoxes();
    expect(boxes).toHaveLength(56);
    for (const b of boxes) {
      expect(b.left).toBeGreaterThanOrEqual(0);
      expect(b.top).toBeGreaterThanOrEqual(0);
      expect(b.right).toBeLessThanOrEqual(W);
      expect(b.bottom).toBeLessThanOrEqual(H);
      expect(hit(b, legendRect), `${b.id} under the legend`).toBe(false);
      expect(hit(b, controlsRect), `${b.id} under the zoom cluster`).toBe(false);
    }
    // Fit to view lands on the same whole-org view.
    const opening = viewTransform();
    fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
    expect(viewTransform()).toEqual(opening);
  });

  it('a focused Radial keeps the readability floor, with the focus whole and clear of the overlays', () => {
    canvas(W, H);
    render(<OrgGraph {...wholeFocused} />);
    expect(viewTransform().scale).toBe(ORG_FIT_MIN_ZOOM);
    const boxes = nodeScreenBoxes(new Set());
    // The drawing still overflows at the floor. Every ring of a whole org
    // passes through the zoom cluster's corner at 0.9, so no pan clears every
    // node here (Fit to view does); the pan keeps the fewest under an overlay.
    expect(boxes.some(b => b.left < 0 || b.top < 0 || b.right > W || b.bottom > H)).toBe(true);
    // The focus person is whole inside the canvas and clear of both overlays.
    const focus = nodeScreenBoxes(new Set([screen.getByRole('button', { name: /^Person0 Doe/ }).getAttribute('aria-label')!]))
      .find(b => b.id.startsWith('Person0 Doe'))!;
    expect(focus.left).toBeGreaterThanOrEqual(0);
    expect(focus.top).toBeGreaterThanOrEqual(0);
    expect(focus.right).toBeLessThanOrEqual(W);
    expect(focus.bottom).toBeLessThanOrEqual(H);
    expect(hit(focus, legendRect) || hit(focus, controlsRect)).toBe(false);

    // A one-person focus (plus neighbours) fits, at or above the floor.
    cleanup();
    render(<OrgGraph {...whole} focusIds={['o-0']} />);
    expect(viewTransform().scale).toBeGreaterThanOrEqual(ORG_FIT_MIN_ZOOM);
  });
});

describe('OrgGraph pruneToFocus (2.407.31)', () => {
  // Radial: static positions on first effect, like `base`. The fixtures'
  // people; the focus is one of them with a one-hop neighbourhood smaller
  // than the whole set.
  const focus = people[0]!.id;
  it('pruneToFocus={false} draws every person passed while focusIds still names the focus', () => {
    render(<OrgGraph {...base} focusIds={[focus]} pruneToFocus={false} />);
    expect(screen.getAllByRole('button', { name: /·/ })).toHaveLength(people.length);
  });
  it('the default still trims to the focus neighbourhood', () => {
    render(<OrgGraph {...base} focusIds={[focus]} />);
    expect(screen.getAllByRole('button', { name: /·/ }).length).toBeLessThan(people.length);
  });
});
