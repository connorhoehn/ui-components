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
    // `bg-white` is DELIBERATE here and must not be swept to `bg-surface`:
    // the white padding is the QR code's quiet zone. Phone scanners expect
    // dark-on-light modules, so a dark card back would break scanning even
    // though it would look more at home in dark mode.
    <figure className="flex flex-col items-center gap-2 m-0 p-4 border border-border rounded-md bg-white">
      <img
        src={value}
        alt={label || 'QR Code'}
        width={size}
        height={size}
        className="block rounded-sm [image-rendering:pixelated]"
      />
      {label && (
        <figcaption className="text-sm text-neutral text-center">
          {label}
        </figcaption>
      )}
    </figure>
  );
}

export default QrCodeDisplay;
