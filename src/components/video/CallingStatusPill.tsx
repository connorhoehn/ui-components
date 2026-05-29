// CallingStatusPill — "Calling Alice…" overlay shown above a HangoutLayout
// while a targeted call is ringing and no callee has joined yet.
//
// Pure presentation: parent decides when to show it (typically:
// targeted call AND no realRemoteParticipants AND not yet accepted).
//
// Extracted from websocket-gateway's HangoutOverlay (~lines 1106-1114
// pre-extraction).

export interface CallingStatusPillProps {
  /** Show/hide gate — the parent decides ringing semantics. */
  show: boolean;
  /** Label for the callee(s). E.g. "Alice", "Alice & Bob", "3 people". */
  label: string;
}

export function CallingStatusPill({ show, label }: CallingStatusPillProps) {
  if (!show) return null;
  return (
    <div
      data-testid="calling-pill"
      data-call-status="calling"
      className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/65 px-3 py-1.5 text-[13px] font-medium text-white"
    >
      Calling {label || 'user'}…
    </div>
  );
}
