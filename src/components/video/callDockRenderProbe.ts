// ui-components/src/components/video/callDockRenderProbe.ts
//
// Test-only render counter for the call dock's memo boundaries: the header
// meta ("4 people · 09:41") and each dock tile call `noteCallDockRender` as
// they render. A null check when no probe is set. Not exported from the
// barrel — the dock's render-budget test sets it.

export type CallDockRenderPart = 'meta' | 'tile';
type Probe = (part: CallDockRenderPart, id?: string) => void;

let probe: Probe | null = null;

export function setCallDockRenderProbe(next: Probe | null): void {
  probe = next;
}

export function noteCallDockRender(part: CallDockRenderPart, id?: string): void {
  probe?.(part, id);
}
