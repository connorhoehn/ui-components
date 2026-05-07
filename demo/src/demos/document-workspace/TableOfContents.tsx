import { CSSProperties } from 'react';

interface TableOfContentsProps {
  sections: { id: string; title: string }[];
  activeSectionId: string | null;
}

const containerStyle: CSSProperties = {
  position: 'fixed',
  bottom: 24,
  right: 24,
  width: 220,
  background: '#fff',
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)',
  padding: '12px 16px',
  zIndex: 100,
  maxHeight: 360,
  overflowY: 'auto',
};

const headerStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: 1.2,
  marginBottom: 10,
};

const itemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '3px 0',
  cursor: 'pointer',
};

export function TableOfContents({ sections, activeSectionId }: TableOfContentsProps) {
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>CONTENTS</div>
      {sections.map((section) => {
        const isActive = section.id === activeSectionId;
        const dotStyle: CSSProperties = {
          width: isActive ? 8 : 6,
          height: isActive ? 8 : 6,
          borderRadius: '50%',
          background: isActive ? '#3b82f6' : '#cbd5e1',
          flexShrink: 0,
        };
        const textStyle: CSSProperties = {
          fontSize: 12,
          fontWeight: isActive ? 600 : 400,
          color: isActive ? '#1e293b' : '#64748b',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        };
        return (
          <div key={section.id} style={itemStyle}>
            <span style={dotStyle} />
            <span style={textStyle}>{section.title}</span>
          </div>
        );
      })}
    </div>
  );
}
