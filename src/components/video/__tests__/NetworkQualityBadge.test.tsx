import { render, screen } from '@testing-library/react';
import { NetworkQualityBadge, type NetworkQuality } from '../NetworkQualityBadge';

const qualityLabels: Record<NetworkQuality, string> = {
  good: 'Good',
  medium: 'Fair',
  poor: 'Poor',
  dead: 'No Connection',
};

const qualityBars: Record<NetworkQuality, number> = {
  good: 4,
  medium: 3,
  poor: 2,
  dead: 1,
};

const qualityColors: Record<NetworkQuality, string> = {
  good: '#22c55e',
  medium: '#eab308',
  poor: '#f97316',
  dead: '#ef4444',
};

const qualityTextClasses: Record<NetworkQuality, string> = {
  good: 'text-success-fg',
  medium: 'text-warning-fg',
  poor: 'text-caution-fg',
  dead: 'text-danger-fg',
};

describe('NetworkQualityBadge', () => {
  it.each(Object.entries(qualityLabels) as Array<[NetworkQuality, string]>)(
    'renders the %s label',
    (quality, label) => {
      render(<NetworkQualityBadge quality={quality} />);
      expect(screen.getByText(label)).toBeInTheDocument();
    },
  );

  it.each(Object.entries(qualityBars) as Array<[NetworkQuality, number]>)(
    'fills %s bars colored for quality',
    (quality, bars) => {
      const { container } = render(<NetworkQualityBadge quality={quality} />);
      const rects = Array.from(container.querySelectorAll('rect'));
      expect(rects).toHaveLength(4);
      const filled = rects.filter(r => r.getAttribute('fill') === qualityColors[quality]);
      expect(filled).toHaveLength(bars);
    },
  );

  it.each(Object.entries(qualityTextClasses) as Array<[NetworkQuality, string]>)(
    'applies the %s text-color class',
    (quality, klass) => {
      render(<NetworkQualityBadge quality={quality} />);
      expect(screen.getByText(qualityLabels[quality])).toHaveClass(klass);
    },
  );
});
