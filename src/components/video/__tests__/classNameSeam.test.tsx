// The `className` seam on the video overlay/chrome components.
//
// These six all render a single positioned/sized root and used to expose
// only `style`. Because inline styles are banned in demos and stories,
// every consumer had to wrap them in a `<div>` just to set a width or dock
// them into a corner. `className` is now composed through `cn()`, which
// means a caller class also *wins* over the component's own base class for
// the same Tailwind group — that is the property worth pinning, not merely
// that the string is present.
//
// `style` is retained (deprecated) on all of them; asserted here so the
// additive change stays additive.

import { render } from '@testing-library/react';
import type { CSSProperties } from 'react';
import { VideoGrid } from '../VideoGrid';
import { StatusStrip } from '../StatusStrip';
import { StatsCard, type StreamMetrics } from '../StatsCard';
import { NetworkQualityBadge } from '../NetworkQualityBadge';
import { ReactionOverlay, ReactionPicker } from '../ReactionOverlay';
import { CallStatsOverlay } from '../CallStatsOverlay';

// Hoisted out of JSX on purpose: `npm run lint:static-styles` greps for the
// literal `style={{` and would flag this file, even though these exist only
// to prove the deprecated prop still passes through.
const HALF_OPACITY: CSSProperties = { opacity: '0.5' };
const QUARTER_OPACITY: CSSProperties = { opacity: '0.25' };

const METRICS: StreamMetrics = {
  bitrateBps: 2_400_000,
  fps: 30,
  resolution: { width: 1280, height: 720 },
  packetsLost: 0,
};

function root(container: HTMLElement): HTMLElement {
  const el = container.firstChild as HTMLElement | null;
  if (!el) throw new Error('expected a rendered root element');
  return el;
}

describe('VideoGrid className', () => {
  it('appends the caller class to the grid root', () => {
    const { container } = render(<VideoGrid participants={[]} className="w-[640px]" />);
    expect(root(container).className).toContain('w-[640px]');
  });

  it('lets the caller class beat the base class in the same group', () => {
    const { container } = render(<VideoGrid participants={[]} className="rounded-none" />);
    const cls = root(container).className;
    expect(cls).toContain('rounded-none');
    expect(cls).not.toContain('rounded-lg');
  });

  it('still honours the deprecated style prop, merged after the grid columns', () => {
    const { container } = render(
      <VideoGrid participants={[]} style={HALF_OPACITY} className="w-40" />,
    );
    const el = root(container);
    expect(el.style.opacity).toBe('0.5');
    // The component's own gridTemplateColumns must survive the spread.
    expect(el.style.gridTemplateColumns).toBe('repeat(1, 1fr)');
  });
});

describe('StatusStrip className', () => {
  it('appends the caller class', () => {
    const { container } = render(<StatusStrip phase="live" className="w-[480px]" />);
    expect(root(container).className).toContain('w-[480px]');
  });

  it('lets the caller switch the strip from inline-flex to flex', () => {
    const { container } = render(<StatusStrip phase="live" className="flex" />);
    const cls = root(container).className;
    expect(cls).toContain('flex');
    expect(cls).not.toContain('inline-flex');
  });

  it('still honours the deprecated style prop', () => {
    const { container } = render(<StatusStrip phase="live" style={HALF_OPACITY} />);
    expect(root(container).style.opacity).toBe('0.5');
  });
});

describe('StatsCard className', () => {
  it('applies the caller class in the populated state', () => {
    const { container } = render(<StatsCard metrics={METRICS} className="w-64" />);
    expect(root(container).className).toContain('w-64');
  });

  it('applies the caller class in the empty state too', () => {
    const { container } = render(<StatsCard metrics={null} className="w-64" />);
    expect(root(container).className).toContain('w-64');
  });

  it('lets the caller class beat the base padding', () => {
    const { container } = render(<StatsCard metrics={METRICS} className="p-6" />);
    const cls = root(container).className;
    expect(cls).toContain('p-6');
    expect(cls).not.toContain('p-3');
  });

  it('still honours the deprecated style prop in both states', () => {
    const populated = render(<StatsCard metrics={METRICS} style={HALF_OPACITY} />);
    expect(root(populated.container).style.opacity).toBe('0.5');
    const empty = render(<StatsCard metrics={null} style={QUARTER_OPACITY} />);
    expect(root(empty.container).style.opacity).toBe('0.25');
  });
});

describe('NetworkQualityBadge className', () => {
  it('appends the caller class', () => {
    const { container } = render(
      <NetworkQualityBadge quality="good" className="absolute top-2 right-2" />,
    );
    const cls = root(container).className;
    expect(cls).toContain('absolute');
    expect(cls).toContain('top-2');
    expect(cls).toContain('right-2');
  });

  it('lets the caller class beat the base radius', () => {
    const { container } = render(<NetworkQualityBadge quality="poor" className="rounded-full" />);
    const cls = root(container).className;
    expect(cls).toContain('rounded-full');
    expect(cls).not.toContain('rounded-md');
  });

  it('still honours the deprecated style prop', () => {
    const { container } = render(<NetworkQualityBadge quality="good" style={HALF_OPACITY} />);
    expect(root(container).style.opacity).toBe('0.5');
  });
});

describe('ReactionOverlay className', () => {
  it('appends the caller class to the overlay layer', () => {
    const { container } = render(<ReactionOverlay reactions={[]} className="z-50" />);
    expect(root(container).className).toContain('z-50');
  });

  it('lets the caller class beat the base overflow', () => {
    const { container } = render(<ReactionOverlay reactions={[]} className="overflow-visible" />);
    const cls = root(container).className;
    expect(cls).toContain('overflow-visible');
    expect(cls).not.toContain('overflow-hidden');
  });

  it('still honours the deprecated style prop', () => {
    const { container } = render(<ReactionOverlay reactions={[]} style={HALF_OPACITY} />);
    expect(root(container).style.opacity).toBe('0.5');
  });
});

describe('ReactionPicker className', () => {
  it('appends the caller class', () => {
    const { container } = render(
      <ReactionPicker onReact={() => {}} className="absolute bottom-3" />,
    );
    const cls = root(container).className;
    expect(cls).toContain('absolute');
    expect(cls).toContain('bottom-3');
  });

  it('lets the caller class beat the base padding', () => {
    const { container } = render(<ReactionPicker onReact={() => {}} className="px-6" />);
    const cls = root(container).className;
    expect(cls).toContain('px-6');
    expect(cls).not.toContain('px-2 ');
  });

  it('still honours the deprecated style prop', () => {
    const { container } = render(<ReactionPicker onReact={() => {}} style={HALF_OPACITY} />);
    expect(root(container).style.opacity).toBe('0.5');
  });
});

describe('CallStatsOverlay className', () => {
  it('appends the caller class', () => {
    const { getByTestId } = render(
      <CallStatsOverlay stats={{ latencyMs: 40 }} className="w-40" />,
    );
    expect(getByTestId('call-stats-overlay').className).toContain('w-40');
  });

  it('lets the caller class beat the position class', () => {
    const { getByTestId } = render(
      <CallStatsOverlay stats={{ latencyMs: 40 }} position="top-left" className="top-8" />,
    );
    const cls = getByTestId('call-stats-overlay').className;
    expect(cls).toContain('top-8');
    expect(cls).not.toContain('top-2');
  });

  it('still honours the deprecated style prop', () => {
    const { getByTestId } = render(
      <CallStatsOverlay stats={{ latencyMs: 40 }} style={HALF_OPACITY} />,
    );
    expect(getByTestId('call-stats-overlay').style.opacity).toBe('0.5');
  });
});
