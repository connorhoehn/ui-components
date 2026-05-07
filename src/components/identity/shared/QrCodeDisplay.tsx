// src/components/identity/shared/QrCodeDisplay.tsx
//
// Displays a QR code image from a data URL. Designed to work with
// the identity-server MFA setup endpoint which returns a base64 data URL.

export interface QrCodeDisplayProps {
  value: string;
  size?: number;
  label?: string;
}

export function QrCodeDisplay({ value, size = 200, label }: QrCodeDisplayProps) {
  return (
    <figure
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--ui-spacingSm)',
        margin: 0,
        padding: 'var(--ui-spacingMd)',
        border: '1px solid var(--ui-border)',
        borderRadius: 'var(--ui-radiusMd)',
        background: 'var(--ui-surface)',
      }}
    >
      <img
        src={value}
        alt={label || 'QR Code'}
        width={size}
        height={size}
        style={{
          display: 'block',
          borderRadius: 'var(--ui-radiusSm)',
          imageRendering: 'pixelated',
        }}
      />
      {label && (
        <figcaption
          style={{
            fontSize: 'var(--ui-fontSizeSm)',
            color: 'var(--ui-textSecondary)',
            textAlign: 'center',
          }}
        >
          {label}
        </figcaption>
      )}
    </figure>
  );
}

export default QrCodeDisplay;
