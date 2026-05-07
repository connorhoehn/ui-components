import type { CSSProperties } from 'react';

export type NetworkQuality = 'good' | 'medium' | 'poor' | 'dead';

export interface NetworkQualityBadgeProps {
  quality: NetworkQuality;
  style?: CSSProperties;
}

const colors: Record<NetworkQuality, string> = {
  good: '#22c55e',
  medium: '#eab308',
  poor: '#f97316',
  dead: '#ef4444',
};

const labels: Record<NetworkQuality, string> = {
  good: 'Good',
  medium: 'Fair',
  poor: 'Poor',
  dead: 'No Connection',
};

export function NetworkQualityBadge({ quality, style }: NetworkQualityBadgeProps) {
  const color = colors[quality];
  const bars = quality === 'good' ? 4 : quality === 'medium' ? 3 : quality === 'poor' ? 2 : 1;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 8px',
      borderRadius: 4,
      background: 'rgba(0,0,0,0.6)',
      color: '#fff',
      fontSize: 11,
      fontWeight: 500,
      ...style,
    }}>
      <svg width="14" height="12" viewBox="0 0 14 12">
        {[0, 1, 2, 3].map(i => (
          <rect
            key={i}
            x={i * 4}
            y={12 - (i + 1) * 3}
            width="3"
            height={(i + 1) * 3}
            rx="0.5"
            fill={i < bars ? color : 'rgba(255,255,255,0.2)'}
          />
        ))}
      </svg>
      <span style={{ color }}>{labels[quality]}</span>
    </div>
  );
}
