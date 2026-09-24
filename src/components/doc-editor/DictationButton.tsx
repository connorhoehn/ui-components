// ui-components/src/components/doc-editor/DictationButton.tsx
//
// Push-to-talk microphone for a text field: hold (pointer, or Space/Enter while
// focused) to record, release to transcribe. A click without a hold toggles, so
// a keyboard or a trackpad tap still works. Presentational — the host passes
// the dictation hook's state and its start/stop.
//
// The listening look binds to `micActive` (a live track), never to `state`, so
// the button can never claim to be off while the OS mic indicator is on.

import { useRef } from 'react';
import { MicIcon } from '../video/MediaIcons';
import { cn } from '../../lib/cn';

export type DictationButtonState = 'unsupported' | 'idle' | 'starting' | 'listening' | 'transcribing' | 'error';

export interface DictationButtonProps {
  state: DictationButtonState;
  micActive: boolean;
  /** Why pressing will not record; the button stays visible and says so. */
  unavailableReason?: string;
  onStart: () => void;
  onStop: () => void;
  className?: string;
  'data-testid'?: string;
}

/** A press shorter than this is a click: it toggles instead of stopping on release. */
export const DICTATION_HOLD_MS = 250;

export function dictationButtonLabel(state: DictationButtonState, micActive: boolean, unavailableReason?: string): string {
  if (unavailableReason) return unavailableReason;
  if (state === 'unsupported') return 'Dictation needs a microphone and a secure page';
  if (micActive) return 'Listening — release to insert';
  if (state === 'transcribing') return 'Transcribing…';
  if (state === 'starting') return 'Starting the microphone…';
  return 'Hold to dictate';
}

export function DictationButton({
  state,
  micActive,
  unavailableReason,
  onStart,
  onStop,
  className,
  'data-testid': testId = 'dictation-button',
}: DictationButtonProps) {
  const pressedAt = useRef<number | null>(null);
  const label = dictationButtonLabel(state, micActive, unavailableReason);
  const busy = state === 'transcribing' || state === 'starting';

  const press = () => {
    if (micActive) { onStop(); pressedAt.current = null; return; }
    pressedAt.current = Date.now();
    onStart();
  };
  const release = () => {
    const at = pressedAt.current;
    if (at === null) return;
    // A tap toggles: recording keeps going until the next press (which sees
    // `micActive` and stops it).
    pressedAt.current = null;
    if (Date.now() - at < DICTATION_HOLD_MS) return;
    onStop();
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={micActive}
      data-state={micActive ? 'listening' : state}
      data-testid={testId}
      onPointerDown={(e) => { if (e.button === 0) { e.preventDefault(); press(); } }}
      onPointerUp={release}
      onPointerLeave={release}
      onKeyDown={(e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); press(); } }}
      onKeyUp={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); release(); } }}
      className={cn(
        'grid h-7 w-7 shrink-0 place-items-center rounded-md border-0 p-0 transition-colors',
        micActive
          ? 'bg-danger text-white'
          : 'bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary',
        busy && 'animate-pulse',
        (unavailableReason || state === 'unsupported') && 'opacity-60',
        className,
      )}
    >
      <MicIcon size={15} aria-hidden="true" />
    </button>
  );
}

export default DictationButton;
