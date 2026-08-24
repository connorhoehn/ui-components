// frontend/src/components/shared/ShortcutsHelp.tsx
//
// Global keyboard-shortcut help overlay. Opens when the user presses `?`
// (shift+/) anywhere outside a text input.
//
// This list used to mirror the shortcut map in PIPELINES_PLAN.md §18.13 —
// i.e. the DESIGN, not the code — so it taught users dozens of shortcuts
// that were never wired. An audit (2026-08-23) found that of five sections,
// only Pipeline Editor was implemented: the Replay Viewer and Event Stream
// pages have no key handling at all, and the Pipelines List advertised four
// shortcuts it did not have while omitting the three it did.
//
// Rows that are not yet wired are now marked `planned: true` and rendered
// dimmed with a "planned" tag, so the panel documents intent without
// claiming it works. Wire a shortcut -> drop its flag.

import { cn } from '../../lib/cn';
import Modal from './Modal';

export interface ShortcutsHelpProps {
  open: boolean;
  onClose: () => void;
}

interface Shortcut {
  keys: string;
  action: string;
  /** Documented in the plan but not wired in this library yet. */
  planned?: boolean;
}

interface Section {
  title: string;
  rows: Shortcut[];
}

// Note: `⌘/Ctrl` shorthand follows the plan document — macOS users read the
// ⌘ side, Windows/Linux read the Ctrl side. We display the raw shorthand
// here; refining per platform is a follow-up.
const SECTIONS: Section[] = [
  {
    title: 'Global',
    rows: [
      { keys: '⌘/Ctrl + K', action: 'Command palette', planned: true },
      { keys: '?',          action: 'Show shortcut help' },
      { keys: 'g p',        action: 'Go to Pipelines', planned: true },
      { keys: 'g o',        action: 'Go to Observability dashboard', planned: true },
    ],
  },
  {
    title: 'List view (/pipelines)',
    rows: [
      { keys: 'Esc',              action: 'Clear selection' },
      { keys: '⌘/Ctrl + A',       action: 'Select all visible pipelines' },
      { keys: 'Delete / Backspace', action: 'Delete selected pipelines' },
      { keys: '⌘/Ctrl + N',       action: 'New pipeline', planned: true },
      { keys: '/',                action: 'Focus search', planned: true },
      { keys: 'Enter',            action: 'Open focused pipeline in editor', planned: true },
      { keys: 'R',                action: 'Run focused pipeline (if published)', planned: true },
    ],
  },
  {
    title: 'Editor (/pipelines/:id)',
    rows: [
      { keys: '⌘/Ctrl + S',              action: 'Save now' },
      { keys: '⌘/Ctrl + Enter',          action: 'Run (if published)' },
      { keys: '⌘/Ctrl + .',              action: 'Cancel running' },
      { keys: '⌘/Ctrl + Shift + P',      action: 'Publish' },
      { keys: '⌘/Ctrl + Z  /  ⌘/Ctrl + Shift + Z', action: 'Undo / Redo' },
      { keys: '⌘/Ctrl + C / X / V / D',  action: 'Copy / Cut / Paste / Duplicate' },
      { keys: '⌘/Ctrl + A',              action: 'Select all nodes' },
      { keys: '⌘/Ctrl + F',              action: 'Focus palette search' },
      { keys: 'Backspace / Delete',      action: 'Delete selection' },
      { keys: '1 – 8',                   action: 'Insert node type by palette order' },
      { keys: 'Arrow keys',              action: 'Nudge 4px' },
      { keys: 'Shift + Arrow',           action: 'Nudge 16px' },
      { keys: 'F',                       action: 'Fit view' },
      { keys: 'Shift + F',               action: 'Zoom to selection' },
      { keys: '⌘/Ctrl + 0',              action: 'Reset zoom to 1.0×' },
      { keys: 'M',                       action: 'Toggle minimap' },
      { keys: 'G',                       action: 'Toggle grid snap' },
      { keys: '⌘/Ctrl + /',              action: 'Toggle execution log' },
      { keys: 'Space + drag',            action: 'Pan canvas' },
      { keys: 'Esc',                     action: 'Deselect / close config panel / close modal' },
    ],
  },
  {
    title: 'Replay view',
    rows: [
      { keys: 'Space',            action: 'Play / pause', planned: true },
      { keys: 'j  /  ←',          action: 'Back 1 event', planned: true },
      { keys: 'k  /  →',          action: 'Forward 1 event', planned: true },
      { keys: 'Shift + J / ←',    action: 'Back 10 events', planned: true },
      { keys: 'Shift + K / →',    action: 'Forward 10 events', planned: true },
      { keys: 'Home',             action: 'Seek to start', planned: true },
      { keys: 'End',              action: 'Seek to end', planned: true },
      { keys: '0 – 9',            action: 'Seek to 0% / 10% / … / 90%', planned: true },
    ],
  },
  {
    title: 'Observability events view',
    rows: [
      { keys: '/',                action: 'Focus filter search', planned: true },
      { keys: 'L',                action: 'Toggle Live / Paused', planned: true },
      { keys: '⌘/Ctrl + E',       action: 'Export JSONL', planned: true },
      { keys: 'Arrow keys',       action: 'Navigate event list', planned: true },
      { keys: 'Enter',            action: 'Open in detail pane', planned: true },
    ],
  },
];

export default function ShortcutsHelp({ open, onClose }: ShortcutsHelpProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Keyboard shortcuts"
      maxWidth={560}
      cardStyle={{ maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
      rawChildren
    >
      <div className="text-base font-semibold text-text-primary mb-2.5">
        Keyboard shortcuts
      </div>
      <div className="overflow-y-auto pr-1">
        {SECTIONS.map((section, sectionIdx) => (
          <div key={section.title}>
            <div
              className={cn(
                'text-[12px] font-bold text-text-primary uppercase tracking-[0.05em] mb-1.5',
                sectionIdx === 0
                  ? 'mt-0 pt-0'
                  : 'mt-4 pt-1.5 border-t border-border-subtle',
              )}
            >
              {section.title}
            </div>
            <div>
              {section.rows.map((row, rowIdx) => (
                <div
                  key={`${section.title}-${rowIdx}`}
                  className={cn(
                    'flex items-baseline justify-between py-1 text-[13px] gap-4',
                    row.planned && 'opacity-60',
                  )}
                  data-planned={row.planned ? 'true' : undefined}
                >
                  <span
                    className={cn(
                      'font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0',
                      row.planned
                        ? 'text-text-tertiary bg-surface border-border-subtle line-through'
                        : 'text-text-primary bg-surface-hover border-border',
                    )}
                  >
                    {row.keys}
                  </span>
                  <span className="text-neutral text-right flex-1">
                    {row.action}
                    {row.planned && (
                      <span className="ml-1.5 text-[10px] uppercase tracking-wide text-text-tertiary">
                        planned
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-[18px]">
        <button
          onClick={onClose}
          className="py-1.5 px-3.5 text-[13px] font-semibold border border-border rounded-md bg-white text-text-primary cursor-pointer font-[inherit]"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
