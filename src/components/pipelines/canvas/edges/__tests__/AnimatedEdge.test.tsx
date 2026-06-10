// src/components/pipelines/canvas/edges/__tests__/AnimatedEdge.test.tsx
//
// Coverage for AnimatedEdge payload/volume semantics (NODE-VISUALS-AUDIT
// §3.4) plus the back-compat guarantee that edges without payload/volume
// render exactly as before. @xyflow/react is mocked the same way the node
// tests mock it: getSmoothStepPath returns a fixed path + midpoint, and
// EdgeLabelRenderer is a plain passthrough so pills land in the DOM.

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import AnimatedEdge from '../AnimatedEdge';
import type { AnimatedEdgeData } from '../AnimatedEdge';
import { PORT_CLS, portCls } from '../../../nodes/shared/ports';

vi.mock('@xyflow/react', () => ({
  EdgeLabelRenderer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="edge-label-renderer">{children}</div>
  ),
  getSmoothStepPath: () => ['M0,0 L100,100', 50, 50],
}));

// ---------------------------------------------------------------------------
// matchMedia control (same pattern as usePrefersReducedMotion.test.ts)
// ---------------------------------------------------------------------------

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: () => ({
      matches,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  });
}

// ---------------------------------------------------------------------------
// Harness
// ---------------------------------------------------------------------------

function renderEdge(data?: AnimatedEdgeData, selected = false) {
  const props = {
    id: 'edge-1',
    sourceX: 0,
    sourceY: 0,
    targetX: 100,
    targetY: 100,
    sourcePosition: 'right',
    targetPosition: 'left',
    data,
    selected,
  } as unknown as Parameters<typeof AnimatedEdge>[0];
  return render(
    <svg>
      <AnimatedEdge {...props} />
    </svg>,
  );
}

/** The visible (styled) path — the one carrying id={edgeId}. Attribute
 * selector (not #id) so jsdom's getElementById fast-path doesn't trip over
 * duplicate ids when a test mounts two edges. */
function visiblePath(container: HTMLElement): SVGPathElement {
  const path = container.querySelector('path[id="edge-1"]');
  expect(path).not.toBeNull();
  return path as SVGPathElement;
}

afterEach(() => {
  mockMatchMedia(false);
});

mockMatchMedia(false);

// ---------------------------------------------------------------------------
// Back-compat: no payload / volume → identical to legacy rendering
// ---------------------------------------------------------------------------

describe('AnimatedEdge back-compat (no payload/volume)', () => {
  it('renders default state with slate stroke at 1.5px and no dash', () => {
    const { container } = renderEdge(undefined);
    const path = visiblePath(container);
    expect(path.getAttribute('stroke')).toBe('#cbd5e1');
    expect(path.getAttribute('stroke-width')).toBe('1.5');
    expect(path.getAttribute('stroke-dasharray')).toBeNull();
    expect(container.querySelector('animate')).toBeNull();
    expect(container.querySelector('animateMotion')).toBeNull();
  });

  it('renders active state with blue animated dashes at 2px', () => {
    const { container } = renderEdge({ state: 'active' });
    const path = visiblePath(container);
    expect(path.getAttribute('stroke')).toBe('#2563eb');
    expect(path.getAttribute('stroke-width')).toBe('2');
    expect(path.getAttribute('stroke-dasharray')).toBe('6 4');
    expect(container.querySelector('animate')).not.toBeNull();
    // No packet circle without an image payload.
    expect(container.querySelector('animateMotion')).toBeNull();
  });

  it('renders traversed-success / traversed-failure with state colors', () => {
    const success = renderEdge({ state: 'traversed-success' });
    expect(visiblePath(success.container).getAttribute('stroke')).toBe('#16a34a');
    const failure = renderEdge({ state: 'traversed-failure' });
    expect(visiblePath(failure.container).getAttribute('stroke')).toBe('#dc2626');
  });

  it('keeps the invisible 12px hit-target path', () => {
    const { container } = renderEdge(undefined);
    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(2);
    expect(paths[0].getAttribute('stroke')).toBe('transparent');
    expect(paths[0].getAttribute('stroke-width')).toBe('12');
  });

  it('highlights selected edges with #646cff at 2.5px', () => {
    const { container } = renderEdge({ state: 'default' }, true);
    const path = visiblePath(container);
    expect(path.getAttribute('stroke')).toBe('#646cff');
    expect(path.getAttribute('stroke-width')).toBe('2.5');
  });

  it('still renders the branch label pill near the source', () => {
    const { getByText } = renderEdge({ label: 'true' });
    expect(getByText('true')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// payload: 'image'
// ---------------------------------------------------------------------------

describe('AnimatedEdge image payload', () => {
  it('uses 2.5px base width and a violet idle tint when idle', () => {
    const { container } = renderEdge({ payload: 'image' });
    const path = visiblePath(container);
    expect(path.getAttribute('stroke-width')).toBe('2.5');
    expect(path.getAttribute('stroke')).toBe('#c4b5fd');
  });

  it('keeps state colors dominant when not idle', () => {
    const { container } = renderEdge({ payload: 'image', state: 'traversed-success' });
    const path = visiblePath(container);
    expect(path.getAttribute('stroke')).toBe('#16a34a');
    expect(path.getAttribute('stroke-width')).toBe('2.5');
  });

  it('animates a packet circle along the path when active', () => {
    const { container } = renderEdge({ payload: 'image', state: 'active' });
    // Existing dash scroll still present...
    expect(container.querySelector('animate')).not.toBeNull();
    // ...plus the animateMotion packet.
    const circle = container.querySelector('circle');
    expect(circle).not.toBeNull();
    expect(circle!.getAttribute('r')).toBe('3');
    expect(circle!.getAttribute('fill')).toBe('#2563eb');
    const motion = container.querySelector('animateMotion');
    expect(motion).not.toBeNull();
    expect(motion!.getAttribute('dur')).toBe('1.2s');
    expect(motion!.getAttribute('repeatCount')).toBe('indefinite');
    expect(motion!.getAttribute('path')).toBe('M0,0 L100,100');
  });

  it('does not render a packet when idle', () => {
    const { container } = renderEdge({ payload: 'image' });
    expect(container.querySelector('animateMotion')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// payload: 'control' / 'text' / 'data'
// ---------------------------------------------------------------------------

describe('AnimatedEdge control/text/data payloads', () => {
  it('control: 1.5px dotted "2 4" when idle', () => {
    const { container } = renderEdge({ payload: 'control' });
    const path = visiblePath(container);
    expect(path.getAttribute('stroke-width')).toBe('1.5');
    expect(path.getAttribute('stroke-dasharray')).toBe('2 4');
    // The dotted idle look is static — no SMIL animation.
    expect(container.querySelector('animate')).toBeNull();
  });

  it('control: active state overrides the dotted dash with the flow dash', () => {
    const { container } = renderEdge({ payload: 'control', state: 'active' });
    const path = visiblePath(container);
    expect(path.getAttribute('stroke')).toBe('#2563eb');
    expect(path.getAttribute('stroke-dasharray')).toBe('6 4');
  });

  it('text/data payloads render exactly like unset', () => {
    for (const payload of ['text', 'data'] as const) {
      const { container } = renderEdge({ payload });
      const path = visiblePath(container);
      expect(path.getAttribute('stroke')).toBe('#cbd5e1');
      expect(path.getAttribute('stroke-width')).toBe('1.5');
      expect(path.getAttribute('stroke-dasharray')).toBeNull();
    }
  });
});

// ---------------------------------------------------------------------------
// volume
// ---------------------------------------------------------------------------

describe('AnimatedEdge volume', () => {
  it('renders a ×N pill at the path midpoint when volume >= 2', () => {
    const { getByText } = renderEdge({ volume: 4 });
    const pill = getByText('×4');
    expect(pill).toBeInTheDocument();
    expect(pill.style.transform).toContain('translate(50px, 50px)');
  });

  it('does not render a pill for volume 1 or unset', () => {
    const { queryByText } = renderEdge({ volume: 1 });
    expect(queryByText(/^×/)).toBeNull();
    const none = renderEdge(undefined);
    expect(none.queryByText(/^×/)).toBeNull();
  });

  it('scales width by log2(volume): 1.5 + log2(4) = 3.5', () => {
    const { container } = renderEdge({ volume: 4 });
    expect(visiblePath(container).getAttribute('stroke-width')).toBe('3.5');
  });

  it('caps width at 4px for large fan-outs', () => {
    const { container } = renderEdge({ volume: 64 });
    expect(visiblePath(container).getAttribute('stroke-width')).toBe('4');
  });

  it('caps width at 4px when combined with image base 2.5', () => {
    const { container } = renderEdge({ payload: 'image', volume: 8 });
    // 2.5 + log2(8) = 5.5 → capped 4
    expect(visiblePath(container).getAttribute('stroke-width')).toBe('4');
  });
});

// ---------------------------------------------------------------------------
// reduced motion
// ---------------------------------------------------------------------------

describe('AnimatedEdge reduced motion', () => {
  it('disables both the dash scroll and the animateMotion packet', () => {
    mockMatchMedia(true);
    const { container } = renderEdge({ payload: 'image', state: 'active' });
    expect(container.querySelector('animate')).toBeNull();
    expect(container.querySelector('animateMotion')).toBeNull();
    expect(container.querySelector('circle')).toBeNull();
    // Color + width still convey state.
    const path = visiblePath(container);
    expect(path.getAttribute('stroke')).toBe('#2563eb');
    expect(path.getAttribute('stroke-width')).toBe('2.5');
    // No flowing dash when motion is reduced.
    expect(path.getAttribute('stroke-dasharray')).toBeNull();
  });

  it('keeps the static control dotted dash (not an animation)', () => {
    mockMatchMedia(true);
    const { container } = renderEdge({ payload: 'control' });
    expect(visiblePath(container).getAttribute('stroke-dasharray')).toBe('2 4');
  });
});

// ---------------------------------------------------------------------------
// ports.ts payload → handle class mapping
// ---------------------------------------------------------------------------

describe('ports.ts PORT_CLS mapping', () => {
  it('image is a violet square', () => {
    expect(PORT_CLS.image).toContain('!rounded-sm');
    expect(PORT_CLS.image).toContain('!bg-[#7c3aed]');
    expect(PORT_CLS.image).toContain('!w-2.5');
  });

  it('text keeps the current gray circle default', () => {
    expect(PORT_CLS.text).toBe('!w-2.5 !h-2.5 !bg-slate-300');
  });

  it('data is the slate-blue tinted circle', () => {
    expect(PORT_CLS.data).toContain('!bg-[#94a3b8]');
    expect(PORT_CLS.data).not.toContain('!rounded-sm');
  });

  it('control and error are slightly smaller circles (amber / red)', () => {
    expect(PORT_CLS.control).toContain('!w-2 ');
    expect(PORT_CLS.control).toContain('!bg-amber-500');
    expect(PORT_CLS.error).toContain('!w-2 ');
    expect(PORT_CLS.error).toContain('!bg-red-600');
  });

  it('portCls() returns the mapped class string for every payload', () => {
    for (const payload of ['image', 'text', 'data', 'control', 'error'] as const) {
      expect(portCls(payload)).toBe(PORT_CLS[payload]);
    }
  });
});
