// frontend/src/components/shared/ShortcutsHelp.tsx
//
// Global keyboard-shortcut help overlay. Opens when the user presses `?`
// (shift+/) anywhere outside a text input. Sections mirror the shortcut map
// in PIPELINES_PLAN.md §18.13.

import { cn } from '../../lib/cn';
import Modal from './Modal';

export interface ShortcutsHelpProps {
  open: boolean;
  onClose: () => void;
}

interface Shortcut {
  keys: string;
  action: string;
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
      { keys: '⌘/Ctrl + K', action: 'Command palette (placeholder)' },
      { keys: '?',          action: 'Show shortcut help' },
      { keys: 'g p',        action: 'Go to Pipelines' },
      { keys: 'g o',        action: 'Go to Observability dashboard' },
    ],
  },
  {
    title: 'List view (/pipelines)',
    rows: [
      { keys: '⌘/Ctrl + N',       action: 'New pipeline' },
      { keys: '/',                action: 'Focus search' },
      { keys: 'Enter',            action: 'Open focused pipeline in editor' },
      { keys: 'R',                action: 'Run focused pipeline (if published)' },
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
      { keys: 'Space',            action: 'Play / pause' },
      { keys: 'j  /  ←',          action: 'Back 1 event' },
      { keys: 'k  /  →',          action: 'Forward 1 event' },
      { keys: 'Shift + J / ←',    action: 'Back 10 events' },
      { keys: 'Shift + K / →',    action: 'Forward 10 events' },
      { keys: 'Home',             action: 'Seek to start' },
      { keys: 'End',              action: 'Seek to end' },
      { keys: '0 – 9',            action: 'Seek to 0% / 10% / … / 90%' },
    ],
  },
  {
    title: 'Observability events view',
    rows: [
      { keys: '/',                action: 'Focus filter search' },
      { keys: 'L',                action: 'Toggle Live / Paused' },
      { keys: '⌘/Ctrl + E',       action: 'Export JSONL' },
      { keys: 'Arrow keys',       action: 'Navigate event list' },
      { keys: 'Enter',            action: 'Open in detail pane' },
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
      <div className="text-base font-semibold text-[#0f172a] mb-2.5">
        Keyboard shortcuts
      </div>
      <div className="overflow-y-auto pr-1">
        {SECTIONS.map((section, sectionIdx) => (
          <div key={section.title}>
            <div
              className={cn(
                'text-[12px] font-bold text-[#0f172a] uppercase tracking-[0.05em] mb-1.5',
                sectionIdx === 0
                  ? 'mt-0 pt-0'
                  : 'mt-4 pt-1.5 border-t border-[#f1f5f9]',
              )}
            >
              {section.title}
            </div>
            <div>
              {section.rows.map((row, rowIdx) => (
                <div
                  key={`${section.title}-${rowIdx}`}
                  className="flex items-baseline justify-between py-1 text-[13px] gap-4"
                >
                  <span className="font-mono text-[12px] text-[#0f172a] bg-[#f1f5f9] border border-[#e2e8f0] rounded px-1.5 py-px whitespace-nowrap shrink-0">
                    {row.keys}
                  </span>
                  <span className="text-[#64748b] text-right flex-1">
                    {row.action}
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
          className="py-1.5 px-3.5 text-[13px] font-semibold border border-[#e2e8f0] rounded-md bg-white text-[#374151] cursor-pointer font-[inherit]"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
