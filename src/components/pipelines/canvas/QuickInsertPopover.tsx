// frontend/src/components/pipelines/canvas/QuickInsertPopover.tsx
//
// Quick-insert palette per PIPELINES_PLAN.md §18.4.3 / §18.11 — appears when
// the user double-clicks blank canvas. Presents a small searchable list of
// node types; Enter inserts the top (highlighted) match at the captured flow
// position, Escape / outside-click closes without inserting.

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import type { NodeType } from '../../../types/pipeline';
import { cn } from '../../../lib/cn';
import { useClickOutside } from '../hooks/useClickOutside';

// Only one quick-insert popover can be open at a time (it is rendered by the
// canvas, singleton), so a fixed id pair is safe and keeps the option ids
// derivable from the node type.
const LISTBOX_ID = 'quick-insert-listbox';
const optionId = (type: string | undefined): string | undefined =>
  type ? `quick-insert-option-${type}` : undefined;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface QuickInsertPopoverProps {
  /** Screen coordinates where the popover anchors. */
  anchor: { x: number; y: number } | null;
  /** Flow-space position where the new node will be placed. */
  flowPosition: { x: number; y: number } | null;
  /** Types to hide (e.g. ['trigger'] if one is already placed). */
  disabledTypes?: NodeType[];
  onClose: () => void;
  onInsert: (type: NodeType, position: { x: number; y: number }) => void;
}

// ---------------------------------------------------------------------------
// Node catalog
// ---------------------------------------------------------------------------

interface QuickInsertItem {
  type: NodeType;
  icon: string;
  name: string;
  description: string;
}

const ITEMS: QuickInsertItem[] = [
  { type: 'trigger',        icon: '⚡', name: 'Trigger',        description: 'Starts the pipeline' },
  { type: 'llm',            icon: '🧠', name: 'LLM',            description: 'Call an LLM model' },
  { type: 'agent',          icon: '🤖', name: 'Agent',          description: 'Invoke a Strands agent via A2A' },
  { type: 'mcp-tool',       icon: '🔌', name: 'MCP Tool',       description: 'Invoke an MCP Gateway tool' },
  { type: 'knowledge-base', icon: '📚', name: 'Knowledge Base', description: 'RAG retrieval from Bedrock KB' },
  { type: 'graph-query',    icon: '🕸️', name: 'Graph Query',    description: 'Neptune openCypher query' },
  { type: 'memory',         icon: '💾', name: 'Memory',         description: 'AgentCore Memory read/write' },
  { type: 'guardrail',      icon: '🛡️', name: 'Guardrail',      description: 'Bedrock Guardrails content filter' },
  { type: 'policy',         icon: '📜', name: 'Policy',         description: 'Cedar authorization policy' },
  { type: 'transform',      icon: '🔧', name: 'Transform',      description: 'Reshape the context' },
  { type: 'condition',      icon: '🔀', name: 'Condition',      description: 'Branch on an expression' },
  { type: 'fork',           icon: '🍴', name: 'Fork',           description: 'Split into parallel branches' },
  { type: 'join',           icon: '🔗', name: 'Join',           description: 'Combine parallel branches' },
  { type: 'action',         icon: '🎯', name: 'Action',         description: 'Produce a side effect' },
  { type: 'ag-ui-output',   icon: '📡', name: 'AG-UI Output',   description: 'Stream to AG-UI frontend' },
  { type: 'approval',       icon: '✅', name: 'Approval',       description: 'Wait for a human decision' },
];

function matches(item: QuickInsertItem, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    item.type.toLowerCase().includes(q) ||
    item.name.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function QuickInsertPopover({
  anchor,
  flowPosition,
  disabledTypes = [],
  onClose,
  onInsert,
}: QuickInsertPopoverProps) {
  const [query, setQuery] = useState('');
  const [highlightIdx, setHighlightIdx] = useState(0);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const disabledSet = useMemo(() => new Set(disabledTypes), [disabledTypes]);

  const filtered = useMemo(
    () => ITEMS.filter((item) => !disabledSet.has(item.type) && matches(item, query)),
    [disabledSet, query],
  );

  // Reset highlight whenever the filter result set changes
  useEffect(() => {
    setHighlightIdx((idx) => (idx >= filtered.length ? 0 : idx));
  }, [filtered.length]);

  // Auto-focus the search input when the popover opens.
  useEffect(() => {
    if (anchor) {
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [anchor]);

  useClickOutside(popoverRef, onClose, !!anchor);

  if (!anchor) return null;

  const commit = (idx: number) => {
    const item = filtered[idx];
    if (!item || !flowPosition) return;
    onInsert(item.type, flowPosition);
    onClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filtered.length === 0) return;
      setHighlightIdx((idx) => (idx + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filtered.length === 0) return;
      setHighlightIdx((idx) => (idx - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      commit(highlightIdx);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      ref={popoverRef}
      className="fixed w-[260px] bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] z-50 flex flex-col overflow-hidden font-inherit"
      style={{ top: anchor.y, left: anchor.x }}
      role="dialog"
      aria-label="Quick insert node"
      data-testid="quick-insert-popover"
    >
      <div className="p-2 border-b border-border">
        {/* Combobox wiring: ArrowUp/Down move `highlightIdx` but focus stays
            in this input, so without aria-activedescendant a screen reader
            announced nothing at all while the user arrowed the list. */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search nodes…"
          className="w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-[13px] font-inherit bg-surface-inset text-text-primary outline-none"
          aria-label="Search node types"
          role="combobox"
          aria-expanded
          aria-autocomplete="list"
          aria-controls={LISTBOX_ID}
          aria-activedescendant={
            filtered.length > 0 ? optionId(filtered[highlightIdx]?.type) : undefined
          }
          data-testid="quick-insert-search"
        />
      </div>
      <div
        id={LISTBOX_ID}
        className="max-h-[260px] overflow-y-auto py-1"
        role="listbox"
        aria-label="Node types"
      >
        {filtered.length === 0 ? (
          <div className="px-3 py-3.5 text-xs text-text-tertiary font-inherit">
            No nodes match "{query}"
          </div>
        ) : (
          filtered.map((item, idx) => {
            const highlighted = idx === highlightIdx;
            return (
              <div
                key={item.type}
                id={optionId(item.type)}
                role="option"
                aria-selected={highlighted}
                onMouseEnter={() => setHighlightIdx(idx)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(idx);
                }}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit',
                  highlighted ? 'bg-surface-hover' : 'bg-transparent',
                )}
                data-node-type={item.type}
                data-testid={`quick-insert-row-${item.type}`}
              >
                <span className="text-lg leading-none w-[22px] text-center shrink-0" aria-hidden>
                  {item.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-text-primary">{item.name}</div>
                  <div className="text-[11px] text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.description}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
