// The Google Docs mode pill — Editing / Suggesting / Viewing — for a document
// that already has its own view modes.
//
// ## Why this is not a fourth mode
//
// This app's documents already carry a `ViewMode` of Editor | Review | Read,
// and the obvious mistake is to bolt "Suggesting" on as a fourth value. It is
// not one. In Google Docs the three are a single question — "what does my
// typing do?" — and the answers are: change the text, propose a change, or
// nothing at all. Two of those are already expressible here:
//
//     Editing    = Editor mode, suggestion mode OFF
//     Suggesting = Editor mode, suggestion mode ON
//     Viewing    = Read mode  (the document is not editable at all)
//
// So the control writes to TWO existing pieces of state rather than replacing
// either. `Suggesting` is a sub-state of Editor mode, which is also why picking
// it while the document is in Read mode has to switch back to Editor first —
// otherwise the pill would read "Suggesting" over a read-only surface and mean
// nothing. Review mode is deliberately absent: it is a per-section sign-off
// workflow, not an answer to "what does my typing do", and it has its own
// control.
//
// Presentational and stateless on purpose. It knows nothing about ProseMirror.

import { SegmentedControl } from '../shared/SegmentedControl';
import { cn } from '../../lib/cn';

/** What the reader's typing currently does. */
export type SuggestionAuthoringMode = 'editing' | 'suggesting' | 'viewing';

export const SUGGESTION_AUTHORING_MODES: {
  value: SuggestionAuthoringMode;
  label: string;
  /** Shown as the control's title — the whole point is that people can tell them apart. */
  hint: string;
}[] = [
  { value: 'editing', label: 'Editing', hint: 'Your changes go straight into the document.' },
  {
    value: 'suggesting',
    label: 'Suggesting',
    hint: 'Your changes become proposals other people accept or reject.',
  },
  { value: 'viewing', label: 'Viewing', hint: 'Read the document without changing it.' },
];

export interface SuggestionModeControlProps {
  mode: SuggestionAuthoringMode;
  onModeChange: (mode: SuggestionAuthoringMode) => void;
  /**
   * Hide the Viewing segment.
   *
   * For a host that has no read-only surface to switch to. Offering a segment
   * that cannot be honoured is the exact failure this component exists to
   * avoid, so it is opt-out rather than silently no-op.
   */
  showViewing?: boolean;
  /**
   * Suggestions currently open, shown beside the pill.
   *
   * Null (the default) renders no count at all — which is NOT the same as zero.
   * A document whose suggestions have not been read yet must not claim there
   * are none.
   */
  openCount?: number | null;
  /** Read-only documents, finalized documents, a reader without permission. */
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function SuggestionModeControl({
  mode,
  onModeChange,
  showViewing = true,
  openCount = null,
  disabled = false,
  className,
  'data-testid': testId = 'suggestion-mode-control',
}: SuggestionModeControlProps) {
  const options = SUGGESTION_AUTHORING_MODES.filter(
    (m) => showViewing || m.value !== 'viewing',
  ).map((m) => ({ label: m.label, value: m.value }));

  const active = SUGGESTION_AUTHORING_MODES.find((m) => m.value === mode);

  return (
    <div
      data-testid={testId}
      data-mode={mode}
      title={active?.hint}
      className={cn('inline-flex items-center gap-2', disabled && 'pointer-events-none opacity-50', className)}
    >
      <SegmentedControl
        options={options}
        value={mode}
        size="sm"
        // Measured on a live document: the three segments announced as
        // "Editing, toggle button, pressed" inside an unnamed group, so a
        // reader was told what they had pressed and never that the three are
        // one question. The name is the question the control answers — it is
        // the same one the header comment argues this component exists to ask.
        aria-label="What your typing does"
        onChange={(next) => {
          // The cast is safe: `options` is derived from the union above, so the
          // control can only ever hand back one of its own values.
          const chosen = next as SuggestionAuthoringMode;
          if (chosen !== mode) onModeChange(chosen);
        }}
      />
      {openCount !== null && openCount > 0 && (
        <span
          data-testid={`${testId}-count`}
          className="rounded-full bg-surface-inset px-2 py-0.5 text-xs tabular-nums text-text-secondary"
        >
          {openCount === 1 ? '1 suggestion' : `${openCount} suggestions`}
        </span>
      )}
    </div>
  );
}

export default SuggestionModeControl;
