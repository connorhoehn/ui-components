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
  color: '#e2e8f0',
  borderRadius: 10,
  padding: '12px 16px',
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
  fontSize: 12,
  minWidth: 240,
  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(148, 163, 184, 0.15)',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
};

const btnStyle: React.CSSProperties = {
  background: 'rgba(148, 163, 184, 0.15)',
  border: '1px solid rgba(148, 163, 184, 0.25)',
  color: '#e2e8f0',
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
      <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
          Simulation
        </span>
        <span style={{ fontSize: 10, color: '#64748b' }}>{stateLabel}</span>
      </div>

      {/* Controls row */}
      <div style={{ ...rowStyle, marginBottom: 8 }}>
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
        <span style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: 11 }}>
          {progressText}
        </span>
      </div>

      {/* Speed selector */}
      <div style={{ ...rowStyle, marginBottom: eventDescription ? 8 : 0 }}>
        <span style={{ color: '#64748b', fontSize: 10, marginRight: 4 }}>Speed:</span>
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
        <div style={{ color: '#94a3b8', fontSize: 10, borderTop: '1px solid rgba(148,163,184,0.15)', paddingTop: 6, marginTop: 2 }}>
          {eventDescription}
        </div>
      )}
    </div>
  );
}
