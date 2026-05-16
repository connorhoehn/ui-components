// frontend/src/components/pipelines/canvas/NodePalette.tsx
//
// Left-rail palette per PIPELINES_PLAN.md §18.4.2. Categorized, searchable
// list of node types. Drag handoff uses the `application/reactflow` mime key
// so the canvas's onDrop can read back `{ nodeType }`.
//
// Selection-driven state is NOT read here (per §13.5 re-render discipline)
// — the palette stays stable across selection changes. `disabledTypes`
// covers cases like Trigger-already-placed.
import { useMemo, useState } from 'react';
import type { DragEvent } from 'react';
import { cn } from '../../../lib/cn';
import type { NodeType } from '../../../types/pipeline';

export interface NodePaletteProps {
  /** Types that already exist once and cannot be added again (e.g. Trigger). */
  disabledTypes?: NodeType[];
}

interface PaletteItem {
  type: NodeType;
  icon: string;
  name: string;
  description: string;
}

interface PaletteCategory {
  name: string;
  items: PaletteItem[];
}

// Per §18.4.2 — fixed grouping. Single source of truth for emoji + copy.
const CATEGORIES: PaletteCategory[] = [
  {
    name: 'Sources',
    items: [
      { type: 'trigger', icon: '⚡', name: 'Trigger', description: 'Starts the pipeline' },
    ],
  },
  {
    name: 'Language',
    items: [
      { type: 'llm', icon: '🧠', name: 'LLM', description: 'Call an LLM model' },
    ],
  },
  {
    name: 'Agents',
    items: [
      { type: 'agent', icon: '🤖', name: 'Agent', description: 'Invoke a Strands agent via A2A' },
      { type: 'mcp-tool', icon: '🔌', name: 'MCP Tool', description: 'Invoke an MCP Gateway tool' },
    ],
  },
  {
    name: 'Knowledge',
    items: [
      { type: 'knowledge-base', icon: '📚', name: 'Knowledge Base', description: 'RAG retrieval from Bedrock KB' },
      { type: 'graph-query', icon: '🕸️', name: 'Graph Query', description: 'Neptune openCypher query' },
      { type: 'memory', icon: '💾', name: 'Memory', description: 'AgentCore Memory read/write' },
    ],
  },
  {
    name: 'Safety',
    items: [
      { type: 'guardrail', icon: '🛡️', name: 'Guardrail', description: 'Bedrock Guardrails content filter' },
      { type: 'policy', icon: '📜', name: 'Policy', description: 'Cedar authorization policy' },
    ],
  },
  {
    name: 'Data',
    items: [
      { type: 'transform', icon: '🔧', name: 'Transform', description: 'Reshape the context' },
      { type: 'condition', icon: '🔀', name: 'Condition', description: 'Branch on an expression' },
    ],
  },
  {
    name: 'Flow',
    items: [
      { type: 'fork', icon: '🍴', name: 'Fork', description: 'Split into parallel branches' },
      { type: 'join', icon: '🔗', name: 'Join', description: 'Combine parallel branches' },
    ],
  },
  {
    name: 'Outputs',
    items: [
      { type: 'action', icon: '🎯', name: 'Action', description: 'Produce a side effect' },
      { type: 'ag-ui-output', icon: '📡', name: 'AG-UI Output', description: 'Stream to AG-UI frontend' },
    ],
  },
  {
    name: 'Human',
    items: [
      { type: 'approval', icon: '✅', name: 'Approval', description: 'Wait for a human decision' },
    ],
  },
];

/**
 * Flat ordered list of palette items in the same order they appear in the
 * sidebar. The 1-8 keyboard shortcut maps `digit (key - 1)` → this array.
 * Exported so PipelineCanvas can import it without re-flattening categories.
 */
export const PALETTE_ITEMS: ReadonlyArray<{ type: NodeType; name: string }> =
  CATEGORIES.flatMap((c) => c.items.map((i) => ({ type: i.type, name: i.name })));


function matches(item: PaletteItem, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    item.name.toLowerCase().includes(q) ||
    item.type.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  );
}

export default function NodePalette({ disabledTypes = [] }: NodePaletteProps) {
  const [query, setQuery] = useState('');
  const [hoveredType, setHoveredType] = useState<NodeType | null>(null);
  const disabledSet = useMemo(() => new Set(disabledTypes), [disabledTypes]);

  const filtered = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => matches(item, query)),
      })).filter((cat) => cat.items.length > 0),
    [query],
  );

  const onDragStart = (item: PaletteItem) => (e: DragEvent<HTMLDivElement>) => {
    if (disabledSet.has(item.type)) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType: item.type }),
    );
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-[220px] shrink-0 h-full border-r border-[#e2e8f0] bg-white flex flex-col" data-testid="node-palette">
      <div className="py-[10px] px-3 border-b border-[#e2e8f0] shrink-0">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search nodes…"
          className="w-full box-border border border-[#d1d5db] rounded-[6px] py-1.5 px-[10px] text-[13px] font-[inherit] bg-[#f9fafb] text-[#0f172a] outline-none"
        />
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {filtered.length === 0 ? (
          <div className="px-3.5 py-4 text-xs text-[#94a3b8]">
            No nodes match "{query}"
          </div>
        ) : (
          filtered.map((cat) => (
            <div key={cat.name}>
              <div className="pt-2 px-[14px] pb-1 text-[10px] font-bold tracking-[0.6px] uppercase text-[#94a3b8] font-[inherit]">{cat.name}</div>
              {cat.items.map((item) => {
                const isDisabled = disabledSet.has(item.type);
                const isHovered = hoveredType === item.type && !isDisabled;
                // Map back to the flat ordered list to compute the 1-8 shortcut
                // digit so the visible number always matches the keyboard.
                const flatIdx = PALETTE_ITEMS.findIndex((p) => p.type === item.type);
                const shortcutDigit = flatIdx >= 0 && flatIdx < 9 ? flatIdx + 1 : null;
                return (
                  <div
                    key={item.type}
                    draggable={!isDisabled}
                    onDragStart={onDragStart(item)}
                    onMouseEnter={() => setHoveredType(item.type)}
                    onMouseLeave={() => setHoveredType(null)}
                    className={cn(
                      'h-11 box-border my-0.5 mx-2 py-1.5 px-[10px] flex items-center gap-[10px] rounded-[6px] border border-transparent font-[inherit]',
                      isDisabled ? 'cursor-not-allowed opacity-[0.45]' : 'cursor-grab',
                      isHovered ? 'bg-[#f1f5f9]' : 'bg-transparent',
                    )}
                    title={
                      isDisabled
                        ? `${item.name} is already placed`
                        : shortcutDigit
                          ? `${item.description} — press ${shortcutDigit}`
                          : item.description
                    }
                    data-node-type={item.type}
                    data-disabled={isDisabled || undefined}
                  >
                    <span
                      className="text-[18px] leading-none w-[22px] text-center shrink-0"
                      aria-hidden
                    >
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={cn('text-[13px] font-semibold text-text-primary flex items-center gap-1.5', isDisabled && 'line-through')}>
                        <span>{item.name}</span>
                        {shortcutDigit !== null && (
                          <kbd
                            data-testid={`palette-shortcut-${item.type}`}
                            className={cn('text-[10px] font-semibold font-mono text-[#64748b] bg-[#f1f5f9] border border-[#e2e8f0] rounded px-[5px] leading-[14px] min-w-[14px] text-center', isDisabled ? 'opacity-50' : 'opacity-100')}
                          >
                            {shortcutDigit}
                          </kbd>
                        )}
                      </div>
                      <div className="text-[11px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis">
                        {isDisabled ? 'Placed' : item.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
      <div className="py-2 px-3 border-t border-[#e2e8f0] text-[10px] text-[#94a3b8] font-[inherit] shrink-0">Press 1–8 to insert at center</div>
    </div>
  );
}
