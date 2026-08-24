import { cn } from '@/lib/cn';
import type { SimulationControls as SimulationControlsType } from './types';

interface SimulationControlsProps {
  controls: SimulationControlsType;
  eventDescription?: string;
}

const speeds = [0.5, 1, 2, 4];

const ROW_CLS = 'flex items-center gap-1.5';

// Translucent hairlines over the dark panel. `text-tertiary` is slate-400,
// the same value the old rgba(148,163,184,…) literals were spelling out by
// hand; going through the token means a consumer re-toning the scale re-tones
// this overlay too.
const PANEL_CLS = cn(
  'fixed bottom-4 right-4 z-[9999] min-w-60 rounded-[10px] px-4 py-3',
  'bg-surface-inverse/92 backdrop-blur-[8px]',
  'border border-text-tertiary/15 shadow-[0_4px_24px_rgba(0,0,0,0.3)]',
  'font-mono text-xs text-code-text',
);

const BTN_CLS = cn(
  'cursor-pointer rounded-[5px] border px-2 py-1 text-[11px] leading-none',
  'border-text-tertiary/25 bg-text-tertiary/15 text-code-text',
);

const BTN_ACTIVE_CLS = 'border-primary/60 bg-primary/40';

export function SimulationControlsPanel({ controls, eventDescription }: SimulationControlsProps) {
  const { state, speed, currentEventIndex, totalEvents, play, pause, reset, setSpeed, stepForward } = controls;

  const progressText = `${Math.min(currentEventIndex, totalEvents)}/${totalEvents}`;
  const stateLabel = state === 'playing' ? 'Playing' : state === 'paused' ? 'Paused' : 'Idle';

  return (
    <div className={PANEL_CLS}>
      {/* Header */}
      <div className="mb-2 flex justify-between items-center">
        <span className="font-semibold text-[11px] uppercase tracking-[0.05em] text-text-tertiary">
          Simulation
        </span>
        <span className="text-[10px] text-neutral">{stateLabel}</span>
      </div>

      {/* Controls row */}
      <div className={`${ROW_CLS} mb-2`}>
        {state === 'playing' ? (
          <button className={BTN_CLS} onClick={pause} title="Pause">
            &#9646;&#9646;
          </button>
        ) : (
          <button className={BTN_CLS} onClick={play} title="Play">
            &#9654;
          </button>
        )}
        <button className={BTN_CLS} onClick={reset} title="Reset">
          &#8634;
        </button>
        <button className={BTN_CLS} onClick={stepForward} title="Step Forward">
          &#9654;|
        </button>
        <span className="ml-auto text-text-tertiary text-[11px]">
          {progressText}
        </span>
      </div>

      {/* Speed selector */}
      <div className={`${ROW_CLS} ${eventDescription ? 'mb-2' : 'mb-0'}`}>
        <span className="text-neutral text-[10px] mr-1">Speed:</span>
        {speeds.map((s) => (
          <button
            key={s}
            className={cn(BTN_CLS, s === speed && BTN_ACTIVE_CLS)}
            onClick={() => setSpeed(s)}
          >
            {s}x
          </button>
        ))}
      </div>

      {/* Event description */}
      {eventDescription && (
        <div className="text-text-tertiary text-[10px] border-t border-text-tertiary/15 pt-[6px] mt-[2px]">
          {eventDescription}
        </div>
      )}
    </div>
  );
}
