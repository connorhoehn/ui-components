import React, { useState, useEffect, useCallback, useRef, useImperativeHandle, forwardRef } from 'react';
import ReactDOM from 'react-dom';
import type { MentionUser } from '../../hooks/useMentionUsers';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MentionDropdownProps {
  query: string;
  users: MentionUser[];
  position: { top: number; left: number };
  onSelect: (user: MentionUser) => void;
  onDismiss: () => void;
}

export interface MentionDropdownHandle {
  /** Forward a keydown event from the parent input. Returns true if the dropdown consumed it. */
  handleKeyDown: (e: React.KeyboardEvent | KeyboardEvent) => boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const MentionDropdown = forwardRef<MentionDropdownHandle, MentionDropdownProps>(
  function MentionDropdown({ query, users, position, onSelect, onDismiss }, ref) {
    const [activeIndex, setActiveIndex] = useState(0);
    const listRef = useRef<HTMLDivElement>(null);

    // Filter users by query (case-insensitive)
    const filtered = users.filter(u =>
      u.displayName.toLowerCase().includes(query.toLowerCase()),
    ).slice(0, 6);

    // Reset active index when query or filtered list changes
    useEffect(() => {
      setActiveIndex(0);
    }, [query]);

    // Scroll the active row into view
    useEffect(() => {
      const container = listRef.current;
      if (!container) return;
      const row = container.children[activeIndex] as HTMLElement | undefined;
      if (row) {
        row.scrollIntoView({ block: 'nearest' });
      }
    }, [activeIndex]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent | KeyboardEvent): boolean => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex(prev => (prev + 1) % Math.max(filtered.length, 1));
          return true;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex(prev => (prev - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
          return true;
        }
        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
          if (filtered.length > 0) {
            onSelect(filtered[activeIndex]);
          }
          return true;
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          onDismiss();
          return true;
        }
        return false;
      },
      [filtered, activeIndex, onSelect, onDismiss],
    );

    // Expose handleKeyDown to parent via ref
    useImperativeHandle(ref, () => ({ handleKeyDown }), [handleKeyDown]);

    return ReactDOM.createPortal(
      <div
        ref={listRef}
        role="listbox"
        className={cn('fixed z-[1000] bg-white border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] max-h-60 overflow-y-auto min-w-[200px]')}
        style={{ top: position.top, left: position.left }}
      >
        {filtered.length === 0 ? (
          <div className={cn('px-4 py-3 text-[13px] text-text-tertiary text-center')}>No users found</div>
        ) : (
          filtered.map((user, i) => (
            <div
              key={user.userId}
              role="option"
              aria-selected={i === activeIndex}
              className={cn(
                'flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors duration-100',
                i === activeIndex ? 'bg-info-bg' : 'bg-transparent',
              )}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect(user);
              }}
            >
              <div
                className={cn('w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-semibold text-white leading-none')}
                style={{ background: user.color }}
              >
                {user.type === 'group' ? '#' : getInitials(user.displayName)}
              </div>
              <div className={cn('flex items-center gap-1.5 flex-1 min-w-0')}>
                <span className={cn('text-[13px] font-medium text-[#1e293b] overflow-hidden text-ellipsis whitespace-nowrap')}>
                  {user.type === 'group' ? `@${user.displayName.toLowerCase()}` : user.displayName}
                </span>
                {user.type === 'user' && <span className={cn('w-2 h-2 rounded-full shrink-0', user.online ? 'bg-success' : 'bg-text-disabled')} />}
                {user.type === 'user' && user.mode && <span className={cn('text-[11px] text-text-tertiary shrink-0')}>{user.mode}</span>}
                {user.type === 'group' && user.memberCount != null && (
                  <span className={cn('text-[11px] text-text-tertiary shrink-0')}>{user.memberCount} members</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>,
      document.body,
    );
  },
);

export type { MentionUser };
