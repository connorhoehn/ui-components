import type { SimulationControls as SimulationControlsType } from './types';

interface SimulationControlsProps {
  controls: SimulationControlsType;
  eventDescription?: string;
}

const speeds = [0.5, 1, 2, 4];

const panelStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 9999,
  background: 'rgba(15, 23, 42, 0.92)',
  color: 'var(--color-border)',
  borderRadius: 10,
  padding: '12px 16px',
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
  fontSize: 12,
  minWidth: 240,
  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(148, 163, 184, 0.15)',
};

const ROW_CLS = 'flex items-center gap-1.5';

const btnStyle: React.CSSProperties = {
  background: 'rgba(148, 163, 184, 0.15)',
  border: '1px solid rgba(148, 163, 184, 0.25)',
  color: 'var(--color-border)',
  borderRadius: 5,
  padding: '4px 8px',
  cursor: 'pointer',
  fontSize: 11,
  lineHeight: 1,
};

const btnActiveStyle: React.CSSProperties = {
  ...btnStyle,
  background: 'rgba(99, 102, 241, 0.4)',
  borderColor: 'rgba(99, 102, 241, 0.6)',
};

export function SimulationControlsPanel({ controls, eventDescription }: SimulationControlsProps) {
  const { state, speed, currentEventIndex, totalEvents, play, pause, reset, setSpeed, stepForward } = controls;

  const progressText = `${Math.min(currentEventIndex, totalEvents)}/${totalEvents}`;
  const stateLabel = state === 'playing' ? 'Playing' : state === 'paused' ? 'Paused' : 'Idle';

  return (
    <div style={panelStyle}>
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
          <button style={btnStyle} onClick={pause} title="Pause">
            &#9646;&#9646;
          </button>
        ) : (
          <button style={btnStyle} onClick={play} title="Play">
            &#9654;
          </button>
        )}
        <button style={btnStyle} onClick={reset} title="Reset">
          &#8634;
        </button>
        <button style={btnStyle} onClick={stepForward} title="Step Forward">
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
            style={s === speed ? btnActiveStyle : btnStyle}
            onClick={() => setSpeed(s)}
          >
            {s}x
          </button>
        ))}
      </div>

      {/* Event description */}
      {eventDescription && (
        <div className="text-text-tertiary text-[10px] border-t border-[rgba(148,163,184,0.15)] pt-[6px] mt-[2px]">
          {eventDescription}
        </div>
      )}
    </div>
  );
}
