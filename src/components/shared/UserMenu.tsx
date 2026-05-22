// UserMenu — avatar button + dropdown menu for the signed-in user.
//
// Renders an Avatar trigger; opens a dropdown with custom menu items.

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Avatar } from './Avatar';
import { cn } from '../../lib/cn';

export interface UserMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  /** Render a divider above this item */
  separator?: boolean;
  /** Style this item as destructive */
  danger?: boolean;
}

export interface UserMenuUser {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface UserMenuProps {
  user: UserMenuUser;
  items: UserMenuItem[];
  className?: string;
  'data-testid'?: string;
}

export function UserMenu({ user, items, className, 'data-testid': testId }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, close]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  return (
    <div
      ref={containerRef}
      data-testid={testId}
      className={cn('relative inline-block', className)}
    >
      {/* Trigger */}
      <button
        type="button"
        aria-label={`User menu for ${user.name}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(v => !v)}
        className={cn(
          'flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg',
          'hover:bg-[var(--color-surface-hover)] transition-colors duration-100',
          open && 'bg-[var(--color-surface-hover)]',
        )}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <Avatar name={user.name} size={32} />
        )}
        <div className="flex flex-col items-start text-left min-w-0 hidden sm:flex">
          <span className="text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]">
            {user.name}
          </span>
          <span className="text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]">
            {user.email}
          </span>
        </div>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={cn(
            'text-[var(--color-text-tertiary)] transition-transform duration-150',
            open ? 'rotate-180' : 'rotate-0',
          )}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          aria-label="User menu"
          className={cn(
            'absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]',
            'bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden',
          )}
        >
          {/* User identity header */}
          <div className="px-3 py-2.5 border-b border-[var(--color-border)]">
            <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{user.name}</p>
            <p className="text-xs text-[var(--color-text-tertiary)] truncate">{user.email}</p>
          </div>

          {/* Items */}
          <div className="py-1">
            {items.map((item, idx) => (
              <div key={idx}>
                {item.separator && idx > 0 && (
                  <div className="my-1 border-t border-[var(--color-border)]" />
                )}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    item.onClick();
                    close();
                  }}
                  className={cn(
                    'flex items-center gap-2.5 w-full text-left px-3 py-2',
                    'text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100',
                    item.danger
                      ? 'text-[#dc2626] bg-transparent hover:bg-[#fef2f2]'
                      : 'text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]',
                  )}
                >
                  {item.icon && (
                    <span className="shrink-0 text-base leading-none" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
