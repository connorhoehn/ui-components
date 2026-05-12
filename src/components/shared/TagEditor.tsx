// frontend/src/components/shared/TagEditor.tsx
//
// Reusable tag input: a small text field plus a chip strip. Enter adds the
// current draft as a tag (trimmed, lowercased, duplicates dropped); clicking
// the x on a chip removes it. An optional `suggestions` prop renders a
// popover below the input showing the currently-unused suggestions that match
// the draft — click one to add it.

import {
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TagEditorProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  /**
   * Lowercase tags before insertion. Defaults to true to preserve historical
   * behavior. Set false when you need case-sensitive identifiers (e.g. Cedar
   * action names like `ViewSalary`).
   */
  lowercase?: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalize(raw: string, lowercase: boolean): string {
  const trimmed = raw.trim();
  return lowercase ? trimmed.toLowerCase() : trimmed;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TagEditor({
  value,
  onChange,
  placeholder = 'add tag...',
  suggestions,
  lowercase = true,
}: TagEditorProps) {
  const [draft, setDraft] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addTag = (raw: string) => {
    const normalized = normalize(raw, lowercase);
    if (!normalized) return;
    if (value.includes(normalized)) {
      setDraft('');
      return;
    }
    onChange([...value, normalized]);
    setDraft('');
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(draft);
      return;
    }
    if (e.key === 'Backspace' && draft === '' && value.length > 0) {
      // Convenience: remove last tag when backspacing an empty input.
      e.preventDefault();
      removeTag(value[value.length - 1]);
    }
  };

  // Unused suggestions matching the current draft (case-insensitive substring).
  const shownSuggestions = useMemo(() => {
    if (!suggestions || suggestions.length === 0) return [];
    const q = draft.trim().toLowerCase();
    const used = new Set(value.map((t) => t.toLowerCase()));
    return suggestions
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length > 0 && !used.has(s))
      .filter((s) => (q ? s.includes(q) : true))
      .slice(0, 12);
  }, [suggestions, value, draft]);

  const showPopover = focused && shownSuggestions.length > 0;

  return (
    <div className="relative flex flex-wrap items-center gap-1.5" data-testid="tag-editor">
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-600"
          data-testid={`tag-chip-${tag}`}
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove tag ${tag}`}
            onClick={() => removeTag(tag)}
            className="ml-1 bg-transparent border-none text-inherit cursor-pointer text-xs leading-none p-0 font-[inherit]"
          >
            &times;
          </button>
        </span>
      ))}
      <div className="relative">
        <input
          ref={inputRef}
          data-testid="tag-editor-input"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            // Small delay so suggestion clicks register before the popover hides.
            setTimeout(() => setFocused(false), 120);
          }}
          placeholder={placeholder}
          className="border border-gray-300 rounded-md px-2.5 py-1.5 text-xs bg-gray-50 w-[140px] min-w-[120px] outline-none font-[inherit] text-slate-900"
        />
        {showPopover ? (
          <div
            className="absolute top-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-1.5 flex flex-wrap gap-1 max-w-xs z-30"
            data-testid="tag-suggestions"
          >
            {shownSuggestions.map((s) => (
              <button
                key={s}
                type="button"
                onMouseDown={(e) => {
                  // Prevent the blur from firing before we handle the click.
                  e.preventDefault();
                }}
                onClick={() => addTag(s)}
                className="inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-600 cursor-pointer border border-dashed border-gray-300"
              >
                + {s}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
