// frontend/src/components/CursorModeSelector.tsx
//
// Four-button mode selector for switching between cursor panel views:
// Freeform / Table / Text / Canvas.
//
// Active mode button is highlighted in blue. Switching calls onModeChange,
// which triggers switchMode in useCursors (unsubscribe → clear → resubscribe).
//
// Part of Phase 07, Plan 07-04 (CURS-07).

import { cn } from '../../lib/cn';
import type { CursorMode } from '../../hooks/useCursors';

export type { CursorMode };

interface CursorModeSelectorProps {
  activeMode: CursorMode;
  onModeChange: (mode: CursorMode) => void;
}

const MODES: { mode: CursorMode; label: string }[] = [
  { mode: 'freeform', label: 'Freeform' },
  { mode: 'table', label: 'Table' },
  { mode: 'text', label: 'Text' },
  { mode: 'canvas', label: 'Canvas' },
];

export function CursorModeSelector({ activeMode, onModeChange }: CursorModeSelectorProps) {
  return (
    <div className="flex gap-2 mb-4">
      {MODES.map(({ mode, label }) => {
        const isActive = mode === activeMode;
        return (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={cn(
              'px-4 py-2 border-2 rounded-md cursor-pointer text-sm font-mono',
              isActive
                ? 'bg-[#007bff] text-white border-[#007bff]'
                : 'bg-white text-text-primary border-border-emphasis'
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
