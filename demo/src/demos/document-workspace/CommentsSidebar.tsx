import { CSSProperties, useState } from 'react';

interface Comment {
  id: string;
  userId: string;
  displayName: string;
  text: string;
  timestamp: number;
}

interface CommentsSidebarProps {
  sectionTitle: string;
  comments: Comment[];
  onClose: () => void;
  onPost: (text: string) => void;
}

const sidebarStyle: CSSProperties = {
  width: 420,
  minWidth: 420,
  borderLeft: '1px solid #e2e8f0',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 16px 12px 16px',
  borderBottom: '1px solid #e2e8f0',
};

const headerTitleStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: '#1e293b',
};

const closeBtnStyle: CSSProperties = {
  fontSize: 18,
  color: '#94a3b8',
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  padding: '2px 6px',
  borderRadius: 4,
  lineHeight: 1,
};

const sectionLabelStyle: CSSProperties = {
  padding: '12px 16px 8px 16px',
  fontSize: 13,
  fontWeight: 500,
  color: '#475569',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
};

const inputAreaStyle: CSSProperties = {
  padding: '12px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

const textareaStyle: CSSProperties = {
  width: '100%',
  minHeight: 60,
  padding: '8px 10px',
  fontSize: 13,
  border: '1px solid #e2e8f0',
  borderRadius: 6,
  resize: 'vertical',
  outline: 'none',
  fontFamily: 'inherit',
};

const postBtnStyle: CSSProperties = {
  alignSelf: 'flex-end',
  padding: '6px 16px',
  fontSize: 13,
  fontWeight: 500,
  borderRadius: 6,
  border: 'none',
  background: '#3b82f6',
  color: '#fff',
  cursor: 'pointer',
};

const emptyStateStyle: CSSProperties = {
  padding: '24px 16px',
  fontSize: 13,
  color: '#94a3b8',
  textAlign: 'center',
  fontStyle: 'italic',
};

const commentThreadStyle: CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  padding: '8px 16px',
};

const commentItemStyle: CSSProperties = {
  padding: '10px 0',
  borderBottom: '1px solid #f1f5f9',
};

const commentAuthorStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: '#334155',
  marginBottom: 4,
};

const commentTextStyle: CSSProperties = {
  fontSize: 13,
  color: '#475569',
  lineHeight: 1.4,
};

export function CommentsSidebar({
  sectionTitle,
  comments,
  onClose,
  onPost,
}: CommentsSidebarProps) {
  const [inputValue, setInputValue] = useState('');

  const handlePost = () => {
    if (inputValue.trim()) {
      onPost(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div style={sidebarStyle}>
      <div style={headerStyle}>
        <span style={headerTitleStyle}>{sectionTitle}</span>
        <button style={closeBtnStyle} onClick={onClose}>&times;</button>
      </div>
      <div style={sectionLabelStyle}>
        <span>&#9660;</span> Comments
      </div>
      <div style={inputAreaStyle}>
        <textarea
          style={textareaStyle}
          placeholder="Add a comment..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button style={postBtnStyle} onClick={handlePost}>Post</button>
      </div>
      <div style={commentThreadStyle}>
        {comments.length === 0 ? (
          <div style={emptyStateStyle}>
            No comments yet. Start the discussion!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} style={commentItemStyle}>
              <div style={commentAuthorStyle}>{comment.displayName}</div>
              <div style={commentTextStyle}>{comment.text}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
