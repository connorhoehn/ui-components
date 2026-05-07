import type { CSSProperties } from 'react';

export interface ViewerCountProps {
  count: number;
  style?: CSSProperties;
}

export function ViewerCount({ count, style }: ViewerCountProps) {
  const formatted = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : `${count}`;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 8px',
      background: 'rgba(0,0,0,0.7)',
      borderRadius: 4,
      color: '#fff',
      fontSize: 12,
      fontWeight: 500,
      ...style,
    }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span>{formatted} watching</span>
    </div>
  );
}
