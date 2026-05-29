// ReconnectingBanner — shown when the call's connectionState is
// 'reconnecting' (publisher mid-debounce re-WHIP, or a WHEP PC went
// disconnected/failed and the auto-recovery is mid-retry).
//
// The parent gates on connectionState from useLVSHangout and toggles
// `show` — this component is pure presentation.
//
// Extracted from websocket-gateway's HangoutOverlay (~lines 1155-1164
// pre-extraction).

export interface ReconnectingBannerProps {
  show: boolean;
  /** Optional label override. Default: "Reconnecting…". */
  label?: string;
}

export function ReconnectingBanner({ show, label = 'Reconnecting…' }: ReconnectingBannerProps) {
  if (!show) return null;
  return (
    <div
      data-testid="hangout-reconnecting-banner"
      className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-amber-500/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap"
      role="status"
      aria-live="polite"
    >
      {label}
    </div>
  );
}
