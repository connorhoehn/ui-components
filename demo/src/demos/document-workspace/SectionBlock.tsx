import { CSSProperties, useState } from 'react';
import { toolbarButtons, typeBadgeColors } from './MockDocuments';

interface SectionBlockProps {
  id: string;
  title: string;
  type: string;
  collapsed: boolean;
  content: string;
  onToggleCollapse: (id: string) => void;
  onCommentClick: (id: string) => void;
  remoteText?: string;
}

const cardStyle: CSSProperties = {
  border: '1px dashed #e2e8f0',
  borderRadius: 8,
  overflow: 'hidden',
  marginBottom: 12,
  background: '#fff',
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 12px',
  background: '#f8fafc',
  borderBottom: '1px solid #e2e8f0',
  cursor: 'pointer',
  userSelect: 'none',
};

const chevronStyle: CSSProperties = {
  fontSize: 12,
  color: '#64748b',
  width: 16,
  textAlign: 'center',
};

const sectionTitleStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: '#1e293b',
  flex: 1,
};

const commentIconStyle: CSSProperties = {
  fontSize: 14,
  cursor: 'pointer',
  padding: '2px 6px',
  borderRadius: 4,
  border: 'none',
  background: 'transparent',
  color: '#94a3b8',
};

const toolbarStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  padding: '6px 12px',
  borderBottom: '1px solid #f1f5f9',
  flexWrap: 'wrap',
};

const toolbarBtnStyle: CSSProperties = {
  padding: '4px 8px',
  fontSize: 12,
  border: '1px solid #cbd5e1',
  borderRadius: 4,
  background: '#fff',
  color: '#475569',
  cursor: 'pointer',
  fontFamily: 'monospace',
  lineHeight: 1,
};

const contentAreaStyle: CSSProperties = {
  padding: '12px 12px 8px 12px',
  minHeight: 60,
  fontSize: 14,
  color: '#334155',
  outline: 'none',
  lineHeight: 1.6,
};

const placeholderStyle: CSSProperties = {
  color: '#94a3b8',
  fontStyle: 'italic',
};

const tasksStyle: CSSProperties = {
  padding: '4px 12px 8px 12px',
  fontSize: 13,
  color: '#94a3b8',
  fontStyle: 'italic',
};

const addItemStyle: CSSProperties = {
  margin: '4px 12px 12px 12px',
  padding: '8px 16px',
  border: '1px dashed #cbd5e1',
  borderRadius: 6,
  background: 'transparent',
  color: '#64748b',
  fontSize: 13,
  cursor: 'pointer',
  width: 'calc(100% - 24px)',
  textAlign: 'center',
};

export function SectionBlock({
  id,
  title,
  type,
  collapsed,
  content,
  onToggleCollapse,
  onCommentClick,
  remoteText,
}: SectionBlockProps) {
  const [localContent, setLocalContent] = useState(content);

  const displayContent = remoteText !== undefined
    ? localContent + remoteText
    : localContent;

  const badgeBg = type === 'notes' ? '#f3f4f6' : '#e0e7ff';
  const badgeColor = typeBadgeColors[type] || '#6b7280';

  const typeBadgeStyle: CSSProperties = {
    fontSize: 11,
    fontWeight: 500,
    padding: '2px 8px',
    borderRadius: 10,
    background: badgeBg,
    color: badgeColor,
    textTransform: 'capitalize',
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle} onClick={() => onToggleCollapse(id)}>
        <span style={chevronStyle}>{collapsed ? '▸' : '▾'}</span>
        <span style={sectionTitleStyle}>{title}</span>
        <span style={typeBadgeStyle}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
        <button
          style={commentIconStyle}
          onClick={(e) => {
            e.stopPropagation();
            onCommentClick(id);
          }}
          title="Comments"
        >
          &#x1F4AC;
        </button>
      </div>
      {!collapsed && (
        <div>
          <div style={toolbarStyle}>
            {toolbarButtons.map((btn) => (
              <button key={btn.title} style={toolbarBtnStyle} title={btn.title}>
                {btn.label}
              </button>
            ))}
          </div>
          <div
            style={contentAreaStyle}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setLocalContent((e.target as HTMLDivElement).textContent || '')}
          >
            {displayContent || <span style={placeholderStyle}>Write notes content...</span>}
          </div>
          <div style={tasksStyle}>No tasks yet.</div>
          <button style={addItemStyle}>+ Add item</button>
        </div>
      )}
    </div>
  );
}
