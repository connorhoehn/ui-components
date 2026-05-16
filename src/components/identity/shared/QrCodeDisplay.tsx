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
    <figure className="flex flex-col items-center gap-2 m-0 p-4 border border-slate-200 rounded-md bg-white">
      <img
        src={value}
        alt={label || 'QR Code'}
        width={size}
        height={size}
        className="block rounded-sm [image-rendering:pixelated]"
      />
      {label && (
        <figcaption className="text-sm text-slate-500 text-center">
          {label}
        </figcaption>
      )}
    </figure>
  );
}

export default QrCodeDisplay;
