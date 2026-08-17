// MuteWhileTalkingToast — passive nag toast surfaced when
// useMuteWhileTalking detects the local user has been speaking for
// >1.5s while their mic is muted. Pair with the existing
// useMuteWhileTalking hook (also exported from this subpath).
//
// Extracted from websocket-gateway's HangoutOverlay (~lines 1138-1145
// pre-extraction). The hook lived in ui-components already; this UI
// shipped per-consumer until now.

export interface MuteWhileTalkingToastProps {
  show: boolean;
  /** Optional label override. */
  label?: string;
}

export function MuteWhileTalkingToast({
  show,
  label = "You're muted — tap mic to unmute",
}: MuteWhileTalkingToastProps) {
  if (!show) return null;
  return (
    <div
      data-testid="mute-while-talking-toast"
      className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-danger/95 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg"
      role="alert"
    >
      {label}
    </div>
  );
}
