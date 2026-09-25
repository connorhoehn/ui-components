// src/components/photo-editor/PhotoEditorShell.tsx
//
// The photo editor's frame, and its status bar.
//
//   ┌ topBar ─────────────────────────────────────────────┐
//   │ canvas (fills)                        │ rightPanel  │
//   │ composer (docked under the canvas)    │  (E2 slot)  │
//   ├ filmstrip ──────────────────────────────────────────┤
//   └ statusBar ──────────────────────────────────────────┘
//
// Slots only: the shell owns the layout and the gutters, nothing else. The
// right panel is 320px from 1280px wide and drops under 1024px.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface PhotoEditorShellProps {
  topBar: ReactNode;
  canvas: ReactNode;
  rightPanel?: ReactNode;
  composer?: ReactNode;
  filmstrip?: ReactNode;
  statusBar?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function PhotoEditorShell({ topBar, canvas, rightPanel, composer, filmstrip, statusBar, className, 'data-testid': testId = 'photo-editor-shell' }: PhotoEditorShellProps) {
  return (
    <div data-testid={testId} className={cn('flex h-full min-h-0 w-full flex-col overflow-hidden bg-surface-panel text-text-primary', className)}>
      {topBar}
      <div className="flex min-h-0 flex-1 gap-2 p-2">
        <main className="flex min-h-0 min-w-0 flex-1 flex-col gap-2" data-testid={`${testId}-main`}>
          <div className="relative flex min-h-0 flex-1 flex-col">{canvas}</div>
          {composer && <div className="shrink-0" data-testid={`${testId}-composer`}>{composer}</div>}
        </main>
        {rightPanel && (
          <aside className="hidden min-h-0 w-[320px] shrink-0 flex-col overflow-y-auto rounded-md border border-solid border-border bg-surface lg:flex" data-testid={`${testId}-panel`}>
            {rightPanel}
          </aside>
        )}
      </div>
      {filmstrip}
      {statusBar}
    </div>
  );
}

export interface PhotoEditorStatusBarProps {
  /** A proposed list is being previewed and has not been kept. */
  previewing: boolean;
  saving?: boolean;
  /** The kept version has edits (right side reads "Applied"); none reads "No edits". */
  applied?: boolean;
  /** Left text override. Default "Previewing changes · Original preserved" / "Original preserved". */
  message?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function PhotoEditorStatusBar({ previewing, saving = false, applied = false, message, className, 'data-testid': testId = 'photo-editor-status' }: PhotoEditorStatusBarProps) {
  const state = saving ? 'Saving…' : previewing ? 'Not applied' : applied ? 'Applied' : 'No edits';
  return (
    <footer
      data-testid={testId}
      data-state={saving ? 'saving' : previewing ? 'previewing' : 'clean'}
      className={cn('flex h-8 shrink-0 items-center justify-between gap-4 border-t border-solid border-border bg-surface-panel px-6 text-[12.5px] text-text-secondary', className)}
    >
      <span className="truncate">{message ?? (previewing ? 'Previewing changes · Original preserved' : 'Original preserved')}</span>
      <span className="inline-flex shrink-0 items-center gap-2" data-testid={`${testId}-state`}>
        <span aria-hidden className={cn('h-2 w-2 rounded-full', saving ? 'bg-info' : previewing ? 'bg-warning' : applied ? 'bg-success' : 'bg-text-tertiary')} />
        {state}
      </span>
    </footer>
  );
}
