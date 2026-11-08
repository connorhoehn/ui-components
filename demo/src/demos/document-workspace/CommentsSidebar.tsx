import { useState } from 'react';
import { ChatComposer, EmptyState, IconButton } from '@connorhoehn/ui-components/shared';

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
    <aside className="flex h-full w-105 min-w-105 flex-col overflow-hidden border-l border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 pb-3 pt-4">
        <span className="text-[14px] font-semibold text-text-primary">{sectionTitle}</span>
        <IconButton aria-label="Close comments" size="sm" onClick={onClose}>
          &times;
        </IconButton>
      </div>
      <div className="flex items-center gap-1.5 px-4 pb-2 pt-3 text-[13px] font-medium text-text-secondary">
        <span>&#9660;</span> Comments
      </div>
      <ChatComposer
        multiline
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handlePost}
        placeholder="Add a comment..."
        submitLabel="Post"
        aria-label="Add a comment"
      />
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {comments.length === 0 ? (
          <EmptyState title="No comments yet" body="Start the discussion!" />
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-border-subtle py-2.5">
              <div className="mb-1 text-[12px] font-semibold text-text-secondary">
                {comment.displayName}
              </div>
              <div className="text-[13px] leading-[1.4] text-text-secondary">{comment.text}</div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
