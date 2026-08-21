import { CSSProperties } from 'react';

interface DocumentHeaderProps {
  title: string;
  status: string;
  lastEditedAgo: string;
  activeMode: string;
  onModeChange: (mode: string) => void;
}

const headerStyle: CSSProperties = {
  padding: '12px 24px',
  borderBottom: '1px solid #e2e8f0',
  background: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 10,
};

const row1Style: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 8,
};

const row2Style: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const backLinkStyle: CSSProperties = {
  fontSize: 13,
  color: 'var(--color-info)',
  cursor: 'pointer',
  textDecoration: 'none',
  fontWeight: 500,
};

const titleStyle: CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  color: 'var(--color-text-primary)',
  margin: 0,
};

const statusBadgeStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  padding: '2px 8px',
  borderRadius: 4,
  background: '#dcfce7',
  color: 'var(--color-success-fg)',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
};

const autoSavedStyle: CSSProperties = {
  fontSize: 12,
  color: 'var(--color-text-tertiary)',
  marginLeft: 8,
};

const modeTabContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 0,
  background: 'var(--color-surface-hover)',
  borderRadius: 16,
  padding: 2,
};

const actionButtonStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  padding: '6px 12px',
  borderRadius: 6,
  border: '1px solid #e2e8f0',
  background: '#fff',
  color: '#334155',
  cursor: 'pointer',
};

const finalizeButtonStyle: CSSProperties = {
  ...actionButtonStyle,
  background: 'var(--color-info)',
  color: '#fff',
  border: '1px solid #3b82f6',
};

export function DocumentHeader({
  title,
  status,
  lastEditedAgo,
  activeMode,
  onModeChange,
}: DocumentHeaderProps) {
  const modes = ['Editor', 'Review', 'Read'];

  return (
    <div style={headerStyle}>
      <div style={row1Style}>
        <span style={backLinkStyle}>&larr; Documents</span>
        <h1 style={titleStyle}>{title}</h1>
        <span style={statusBadgeStyle}>{status}</span>
        <span style={autoSavedStyle}>{lastEditedAgo}</span>
      </div>
      <div style={row2Style}>
        <div style={modeTabContainerStyle}>
          {modes.map((mode) => {
            const isActive = mode === activeMode;
            const tabStyle: CSSProperties = {
              fontSize: 12,
              fontWeight: 500,
              padding: '4px 14px',
              borderRadius: 16,
              border: 'none',
              background: isActive ? 'var(--color-info)' : 'transparent',
              color: isActive ? '#fff' : 'var(--color-neutral)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            };
            return (
              <button
                key={mode}
                style={tabStyle}
                onClick={() => onModeChange(mode)}
              >
                {mode}
              </button>
            );
          })}
        </div>
        <div className="flex-[1]" />
        <button style={actionButtonStyle}>My Items</button>
        <button style={actionButtonStyle}>Call</button>
        <button style={finalizeButtonStyle}>Finalize</button>
        <button style={actionButtonStyle}>&hellip;</button>
      </div>
    </div>
  );
}
