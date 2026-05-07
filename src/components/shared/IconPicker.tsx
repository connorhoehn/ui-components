// frontend/src/components/shared/IconPicker.tsx
//
// Small emoji picker used for choosing an icon on pipelines (and usable by
// other callers that want a lightweight curated-emoji chooser). Renders a
// trigger button showing the currently-selected emoji; clicking it opens a
// popover with an 8×6 grid of curated emojis and a custom-entry input.
//
// The popover closes on:
//   • selection from the grid
//   • pressing Enter in the custom input
//   • mousedown anywhere outside the popover / trigger

import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Curated default set — 48 emojis covering flow, tools, comms, docs, data,
// nature, and fun. Laid out 8 per row × 6 rows in the grid.
// ---------------------------------------------------------------------------

export const DEFAULT_PIPELINE_ICONS: string[] = [
  '🔀', '🔁', '🔄', '⚙️', '🛠', '🧰', '🔧', '⚡',
  '🧠', '💡', '📊', '📈', '📉', '📋', '📝', '📄',
  '✉️', '💬', '📨', '📤', '📥', '🔔', '📢', '📡',
  '🚀', '🎯', '🎨', '🧪', '🔬', '🔭', '🧭', '🗺',
  '🗂', '📁', '🗃', '🗄', '💾', '🔒', '🔑', '🛡',
  '🌐', '🔗', '🔀', '⏩', '⏱', '🔍', '📌', '🏷',
];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface IconPickerProps {
  value: string;
  onChange: (emoji: string) => void;
  curated?: string[];
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Grid cell (needs hover state per-cell)
// ---------------------------------------------------------------------------

function IconCell({
  emoji,
  active,
  onPick,
}: {
  emoji: string;
  active: boolean;
  onPick: (e: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPick(emoji)}
      className={cn(
        'w-7 h-7 inline-flex items-center justify-center p-0 text-base leading-none rounded cursor-pointer font-[inherit] hover:bg-[#f1f5f9]',
        active ? 'border border-primary' : 'border border-transparent',
      )}
      aria-label={`Select ${emoji}`}
      aria-pressed={active}
    >
      {emoji}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function IconPicker({
  value,
  onChange,
  curated,
}: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [triggerHovered, setTriggerHovered] = useState(false);
  const [customDraft, setCustomDraft] = useState('');

  const rootRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const icons = curated ?? DEFAULT_PIPELINE_ICONS;

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (rootRef.current && rootRef.current.contains(t)) return;
      if (popoverRef.current && popoverRef.current.contains(t)) return;
      setOpen(false);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [open]);

  const handlePick = (emoji: string) => {
    onChange(emoji);
    setOpen(false);
  };

  const handleCustomCommit = () => {
    const next = customDraft.trim();
    if (next.length === 0) return;
    onChange(next);
    setCustomDraft('');
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((x) => !x)}
        className="w-[34px] h-[34px] inline-flex items-center justify-center p-0 text-[22px] leading-none border border-border rounded-md cursor-pointer font-[inherit] shrink-0 hover:bg-[#f1f5f9] hover:border-[#cbd5e1]"
        aria-label="Choose icon"
        aria-haspopup="dialog"
        aria-expanded={open}
        data-testid="icon-picker-trigger"
      >
        <span aria-hidden>{value}</span>
      </button>

      {open ? (
        <div ref={popoverRef} className="absolute top-full left-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] p-2.5 z-30 min-w-[272px]" data-testid="icon-picker-popover">
          <div className="grid grid-cols-[repeat(8,28px)] gap-1">
            {icons.map((emoji, idx) => (
              <IconCell
                key={`${emoji}-${idx}`}
                emoji={emoji}
                active={emoji === value}
                onPick={handlePick}
              />
            ))}
          </div>
          <div className="flex gap-1.5 mt-2.5 pt-2.5 border-t border-border">
            <input
              type="text"
              value={customDraft}
              onChange={(e) => setCustomDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCustomCommit();
                } else if (e.key === 'Escape') {
                  setOpen(false);
                }
              }}
              placeholder="Paste any emoji…"
              className="flex-1 min-w-0 border border-border-field rounded-md px-2 py-1 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none"
              data-testid="icon-picker-custom-input"
              aria-label="Custom emoji"
            />
            <button
              type="button"
              onClick={handleCustomCommit}
              disabled={customDraft.trim().length === 0}
              className="px-2.5 py-1 text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              Set
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
