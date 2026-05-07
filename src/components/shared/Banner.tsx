import type { ReactNode, CSSProperties } from 'react';

export type BannerVariant = 'error' | 'warning' | 'info' | 'success';

const VARIANT_STYLE: Record<BannerVariant, { background: string; border: string; color: string }> = {
  error:   { background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b' },
  warning: { background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e' },
  info:    { background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af' },
  success: { background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534' },
};

export interface BannerProps {
  variant?: BannerVariant;
  /** Bold prefix label shown before children. */
  title?: string;
  onDismiss?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
}

export default function Banner({
  variant = 'error', title, onDismiss, children, style,
}: BannerProps) {
  const vs = VARIANT_STYLE[variant];
  return (
    <div
      role="alert"
      style={{
        padding: '10px 14px',
        borderRadius: 8,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        ...vs,
        ...style,
      }}
    >
      {title && <strong>{title}</strong>}
      <span style={{ flex: 1 }}>{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            background: 'none', border: 'none',
            color: vs.color, cursor: 'pointer',
            fontSize: 16, padding: 0, lineHeight: 1,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
