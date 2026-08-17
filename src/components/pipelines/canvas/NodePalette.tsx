// frontend/src/components/pipelines/canvas/NodePalette.tsx
//
// Left-rail palette per PIPELINES_PLAN.md §18.4.2. Sections are grouped by
// node category (NODE_CATEGORIES in ../nodes/categories — the same map that
// drives BaseNode's accent bar): Sources / Transform / AI / Control /
// Sinks / Human. Each section header and item carries a small
// category-colored accent dot (bg-cat-* theme tokens).
//
// Features:
//   - Search input at top (name + type + description, case-insensitive)
//   - Multi-select category filter chips (no chips = show all)
//   - Collapsible sections — chevron toggle, default expanded, persisted to
//     localStorage under `pipeline.palette.collapsed.<category>`
//   - Recently-used section pinned at top (localStorage ring buffer, max 5)
//     populated via the recordRecentType() export called by consumers after
//     addNode succeeds
//   - Empty state with "Clear filters" button when nothing matches
//   - Compact view toggle: card view vs. icon+name list view
//   - Drag handoff: `application/reactflow` MIME key { nodeType }
//   - 1-9 keyboard shortcuts: mapped to the visible flat order (recents first,
//     then categories in definition order) — PALETTE_ITEMS is re-exported so
//     QuickInsertLayer can import it without re-flattening
//
// Constraint: NO style={{...}} literals in new UI. Tailwind via cn().
// `disabledTypes` prop and `disabledSet` logic preserved verbatim.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { DragEvent } from 'react';
import { cn } from '../../../lib/cn';
import { FilterChip } from '../../shared/FilterChip';
import { categoryFor, type NodeCategory } from '../nodes/categories';
import type { NodeType } from '../../../types/pipeline';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NodePaletteProps {
  /** Types that already exist once and cannot be added again (e.g. Trigger). */
  disabledTypes?: NodeType[];
}

export interface PaletteItem {
  type: NodeType;
  icon: string;
  name: string;
  description: string;
  /** Category key, used for filter chip matching. */
  category: string;
  /** Node-category key from NODE_CATEGORIES (drives the accent color). */
  nodeCategory?: NodeCategory;
}

interface PaletteCategory {
  /** Node-category key (NODE_CATEGORIES) this section maps to. */
  key: NodeCategory;
  /** Human-readable category name (also the chip label). */
  name: string;
  items: PaletteItem[];
}

// ---------------------------------------------------------------------------
// Item definitions + category-derived grouping.
//
// Items are declared flat; sections are derived from NODE_CATEGORIES via
// categoryFor() so the palette grouping can never drift from the canvas
// accent bars. Within a section, items keep their declaration order below.
// ---------------------------------------------------------------------------

type PaletteItemDef = Omit<PaletteItem, 'category' | 'nodeCategory'>;

const ITEM_DEFS: PaletteItemDef[] = [
  { type: 'trigger',                   icon: '⚡', name: 'Trigger',             description: 'Starts the pipeline' },
  { type: 'image-source',              icon: '🖼',  name: 'Image Source',        description: 'Inject an image into the pipeline context' },
  { type: 'knowledge-base',            icon: '📚', name: 'Knowledge Base',      description: 'RAG retrieval from Bedrock KB' },
  { type: 'graph-query',               icon: '🕸️', name: 'Graph Query',         description: 'Neptune openCypher query' },
  { type: 'llm',                       icon: '🧠', name: 'LLM',                 description: 'Call an LLM model' },
  { type: 'agent',                     icon: '🤖', name: 'Agent',               description: 'Invoke a Strands agent via A2A' },
  { type: 'mcp-tool',                  icon: '🔌', name: 'MCP Tool',            description: 'Invoke an MCP Gateway tool' },
  { type: 'image:vision-analyze',      icon: '📷', name: 'Vision Analyze',      description: 'Analyze an image with a multimodal LLM' },
  { type: 'image:vision-classify',     icon: '🏷',  name: 'Vision Classify',     description: 'Classify image into a label set' },
  { type: 'image:vision-describe',     icon: '💬', name: 'Vision Describe',     description: 'Generate a natural-language caption of an image' },
  { type: 'image:vision-tag',          icon: '🔖', name: 'Vision Tag',          description: 'Extract ranked tags from an image' },
  { type: 'image:vision-extract-text', icon: '📝', name: 'Vision Extract Text', description: 'OCR / text extraction from an image' },
  { type: 'image:generate',            icon: '✦',  name: 'Generate',            description: 'Generate an image from a text prompt via Bedrock' },
  { type: 'image:variation',           icon: '⊞',  name: 'Variation',           description: 'Generate variations of a source image via Nova Canvas' },
  { type: 'image:edit-prompt',         icon: '✎',  name: 'Edit Prompt',         description: 'Inpaint or outpaint a region via Nova Canvas' },
  { type: 'transform',                 icon: '🔧', name: 'Transform',           description: 'Reshape the context' },
  { type: 'memory',                    icon: '💾', name: 'Memory',              description: 'AgentCore Memory read/write' },
  { type: 'image:crop',                icon: '✂',  name: 'Crop',                description: 'Crop a region from an image using a bbox' },
  { type: 'image:resize',              icon: '⤢',  name: 'Resize',              description: 'Resize an image to target dimensions' },
  { type: 'image:transform',           icon: '↻',  name: 'Transform Image',     description: 'Rotate, flip or flop an image' },
  { type: 'image:format-convert',      icon: '⇌',  name: 'Format Convert',      description: 'Convert image to JPEG, PNG, WebP or AVIF' },
  { type: 'image:sharpen',             icon: '◈',  name: 'Sharpen',             description: 'Apply unsharp-mask sharpening' },
  { type: 'image:watermark',           icon: '⊕',  name: 'Watermark',           description: 'Composite an overlay image onto the source' },
  { type: 'image:adjust-bw',           icon: '◐',  name: 'Adjust B/W',          description: 'Convert image to black and white' },
  { type: 'image:adjust-layer',        icon: '𝍩',  name: 'Adjust Layers',       description: 'Apply stacked colour/filter adjustments' },
  { type: 'image:dimensions',          icon: '📐', name: 'Dimensions',          description: "Read an image's size → feed generate" },
  { type: 'image:upscale',             icon: '⤢',  name: 'Upscale',             description: '4× super-resolution (self-hosted)' },
  { type: 'condition',                 icon: '🔀', name: 'Condition',           description: 'Branch on an expression' },
  { type: 'fork',                      icon: '🍴', name: 'Fork',                description: 'Split into parallel branches' },
  { type: 'join',                      icon: '🔗', name: 'Join',                description: 'Combine parallel branches' },
  { type: 'scatter',                   icon: '⑂',  name: 'Scatter',             description: 'Fan out over an array — one arm per item' },
  { type: 'guardrail',                 icon: '🛡️', name: 'Guardrail',           description: 'Bedrock Guardrails content filter' },
  { type: 'policy',                    icon: '📜', name: 'Policy',              description: 'Cedar authorization policy' },
  { type: 'action',                    icon: '🎯', name: 'Action',              description: 'Produce a side effect' },
  { type: 'ag-ui-output',              icon: '📡', name: 'AG-UI Output',        description: 'Stream to AG-UI frontend' },
  { type: 'image:save',                icon: '⬇',  name: 'Save Image',          description: 'Write produced image to artifact store' },
  { type: 'approval',                  icon: '✅', name: 'Approval',            description: 'Wait for a human decision' },
];

/** Section order + human-readable labels for the six node categories. */
const CATEGORY_SECTIONS: ReadonlyArray<{ key: NodeCategory; name: string }> = [
  { key: 'source',    name: 'Sources' },
  { key: 'transform', name: 'Transform' },
  { key: 'ai',        name: 'AI' },
  { key: 'control',   name: 'Control' },
  { key: 'sink',      name: 'Sinks' },
  { key: 'human',     name: 'Human' },
];

/** Category accent color tokens (static strings so Tailwind sees them). */
const CAT_ACCENT: Record<NodeCategory, string> = {
  source:    'bg-cat-source',
  transform: 'bg-cat-transform',
  ai:        'bg-cat-ai',
  control:   'bg-cat-control',
  sink:      'bg-cat-sink',
  human:     'bg-cat-human',
};

const CATEGORIES: PaletteCategory[] = CATEGORY_SECTIONS.map(({ key, name }) => ({
  key,
  name,
  items: ITEM_DEFS
    .filter((def) => categoryFor(def.type) === key)
    .map((def) => ({ ...def, category: name, nodeCategory: key })),
})).filter((cat) => cat.items.length > 0);

// Flat ordered list — the stable base for keyboard shortcuts (before recents
// float to the top). Exported so QuickInsertLayer can import without re-work.
export const PALETTE_ITEMS: ReadonlyArray<{ type: NodeType; name: string }> =
  CATEGORIES.flatMap((c) => c.items.map((i) => ({ type: i.type, name: i.name })));

// Category names (for chip labels)
const CATEGORY_NAMES: readonly string[] = CATEGORIES.map((c) => c.name);

// ---------------------------------------------------------------------------
// Recently-used ring buffer (localStorage, max 5)
// ---------------------------------------------------------------------------

const RECENTS_KEY = 'pipeline.palette.recents';
const RECENTS_LIMIT = 5;
const COMPACT_KEY = 'pipeline.palette.compact';

function readRecents(): NodeType[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(RECENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as NodeType[]) : [];
  } catch {
    return [];
  }
}

function writeRecents(types: NodeType[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(RECENTS_KEY, JSON.stringify(types));
  } catch {
    // non-fatal
  }
}

/**
 * Record that a node of `type` was added. Prepends to the ring buffer (max 5,
 * MRU order, no duplicates). Call this from the consumer's addNode handler.
 */
export function recordRecentType(type: NodeType): void {
  const prev = readRecents().filter((t) => t !== type);
  const next = [type, ...prev].slice(0, RECENTS_LIMIT);
  writeRecents(next);
}

// ---------------------------------------------------------------------------
// Collapsed-section state (localStorage per category)
// ---------------------------------------------------------------------------

const COLLAPSED_PREFIX = 'pipeline.palette.collapsed.';

function readCollapsed(name: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(COLLAPSED_PREFIX + name);
    return raw === 'true';
  } catch {
    return false;
  }
}

function writeCollapsed(name: string, collapsed: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(COLLAPSED_PREFIX + name, String(collapsed));
  } catch {
    // non-fatal
  }
}

// ---------------------------------------------------------------------------
// Search matcher
// ---------------------------------------------------------------------------

function matchesQuery(item: PaletteItem, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    item.name.toLowerCase().includes(q) ||
    item.type.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  );
}

// ---------------------------------------------------------------------------
// Chevron icon (inline, no emoji dependency)
// ---------------------------------------------------------------------------

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={cn('shrink-0 transition-transform duration-150', expanded ? 'rotate-90' : 'rotate-0')}
    >
      <path
        d="M4 2.5l3.5 3.5L4 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function NodePalette({ disabledTypes = [] }: NodePaletteProps) {
  const [query, setQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const [hoveredType, setHoveredType] = useState<NodeType | null>(null);
  const [recents, setRecents] = useState<NodeType[]>(() => readRecents());
  const [compact, setCompact] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try { return window.localStorage.getItem(COMPACT_KEY) === 'true'; } catch { return false; }
  });

  // Collapsed state per category — initialise from localStorage
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const cat of CATEGORIES) {
      init[cat.name] = readCollapsed(cat.name);
    }
    // Recents section starts expanded always
    return init;
  });

  const disabledSet = useMemo(() => new Set(disabledTypes), [disabledTypes]);

  // Listen for storage events so multi-tab usage stays consistent.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === RECENTS_KEY) {
        setRecents(readRecents());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Persist compact preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try { window.localStorage.setItem(COMPACT_KEY, String(compact)); } catch { /* non-fatal */ }
  }, [compact]);

  const toggleCategory = useCallback((name: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setQuery('');
    setActiveCategories(new Set());
  }, []);

  const toggleCollapsed = useCallback((name: string) => {
    setCollapsed((prev) => {
      const next = { ...prev, [name]: !prev[name] };
      writeCollapsed(name, next[name]);
      return next;
    });
  }, []);

  // Build all-items flat lookup (by type)
  const allItemsByType = useMemo<Map<NodeType, PaletteItem>>(() => {
    const m = new Map<NodeType, PaletteItem>();
    for (const cat of CATEGORIES) {
      for (const item of cat.items) m.set(item.type, item);
    }
    return m;
  }, []);

  // Recently-used items resolved to full PaletteItem
  const recentItems = useMemo<PaletteItem[]>(
    () => recents.map((t) => allItemsByType.get(t)).filter(Boolean) as PaletteItem[],
    [recents, allItemsByType],
  );

  // Filtered categories
  const filteredCategories = useMemo<PaletteCategory[]>(() => {
    return CATEGORIES.map((cat) => {
      const catFiltered = activeCategories.size > 0 && !activeCategories.has(cat.name)
        ? []
        : cat.items.filter((item) => matchesQuery(item, query));
      return { ...cat, items: catFiltered };
    }).filter((cat) => cat.items.length > 0);
  }, [query, activeCategories]);

  // Flat visible ordered list (recents first, then categories) used to compute
  // 1-9 keyboard shortcut indices. Re-exported as a mutable ref so
  // QuickInsertLayer, which also reads PALETTE_ITEMS, stays consistent.
  const visibleFlat = useMemo<PaletteItem[]>(() => {
    const seen = new Set<NodeType>();
    const out: PaletteItem[] = [];
    // Recents are only shown when no search/filter is active
    if (!query && activeCategories.size === 0) {
      for (const item of recentItems) {
        out.push(item);
        seen.add(item.type);
      }
    }
    for (const cat of filteredCategories) {
      for (const item of cat.items) {
        if (!seen.has(item.type)) {
          out.push(item);
          seen.add(item.type);
        }
      }
    }
    return out;
  }, [recentItems, filteredCategories, query, activeCategories]);

  // Keep a stable ref so QuickInsertLayer can read it synchronously
  const visibleFlatRef = useRef(visibleFlat);
  useEffect(() => { visibleFlatRef.current = visibleFlat; }, [visibleFlat]);

  const isEmpty = filteredCategories.length === 0 && (
    query !== '' || activeCategories.size > 0
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

  const renderItem = (item: PaletteItem, shortcutIdx: number | null) => {
    const isDisabled = disabledSet.has(item.type);
    const isHovered = hoveredType === item.type && !isDisabled;
    const shortcutDigit = shortcutIdx !== null && shortcutIdx < 9 ? shortcutIdx + 1 : null;

    if (compact) {
      return (
        <div
          key={item.type}
          draggable={!isDisabled}
          onDragStart={onDragStart(item)}
          onMouseEnter={() => setHoveredType(item.type)}
          onMouseLeave={() => setHoveredType(null)}
          className={cn(
            'h-8 box-border my-px mx-2 px-2 flex items-center gap-2 rounded font-[inherit]',
            isDisabled ? 'cursor-not-allowed opacity-45' : 'cursor-grab',
            isHovered ? 'bg-slate-100' : 'bg-transparent',
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
          data-testid={`palette-item-${item.type}`}
        >
          <span
            aria-hidden
            data-testid={`palette-accent-${item.type}`}
            className={cn('w-1.5 h-1.5 rounded-full shrink-0', item.nodeCategory && CAT_ACCENT[item.nodeCategory])}
          />
          <span className="text-base leading-none w-5 text-center shrink-0" aria-hidden>
            {item.icon}
          </span>
          <span className={cn('text-[12px] font-medium text-slate-800 truncate', isDisabled && 'line-through')}>
            {item.name}
          </span>
          {shortcutDigit !== null && (
            <kbd
              data-testid={`palette-shortcut-${item.type}`}
              className={cn(
                'ml-auto text-[10px] font-semibold font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0',
                isDisabled && 'opacity-50',
              )}
            >
              {shortcutDigit}
            </kbd>
          )}
        </div>
      );
    }

    return (
      <div
        key={item.type}
        draggable={!isDisabled}
        onDragStart={onDragStart(item)}
        onMouseEnter={() => setHoveredType(item.type)}
        onMouseLeave={() => setHoveredType(null)}
        className={cn(
          'h-11 box-border my-0.5 mx-2 py-1.5 px-2.5 flex items-center gap-2.5 rounded-md border border-transparent font-[inherit]',
          isDisabled ? 'cursor-not-allowed opacity-45' : 'cursor-grab',
          isHovered ? 'bg-slate-50' : 'bg-transparent',
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
        data-testid={`palette-item-${item.type}`}
      >
        <span
          aria-hidden
          data-testid={`palette-accent-${item.type}`}
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', item.nodeCategory && CAT_ACCENT[item.nodeCategory])}
        />
        <span className="text-lg leading-none w-[22px] text-center shrink-0" aria-hidden>
          {item.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className={cn('text-[13px] font-semibold text-slate-900 flex items-center gap-1.5', isDisabled && 'line-through')}>
            <span className="truncate">{item.name}</span>
            {shortcutDigit !== null && (
              <kbd
                data-testid={`palette-shortcut-${item.type}`}
                className={cn(
                  'text-[10px] font-semibold font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0',
                  isDisabled && 'opacity-50',
                )}
              >
                {shortcutDigit}
              </kbd>
            )}
          </div>
          <div className="text-[11px] text-slate-500 truncate">
            {isDisabled ? 'Placed' : item.description}
          </div>
        </div>
      </div>
    );
  };

  const showRecents = recentItems.length > 0 && !query && activeCategories.size === 0;
  // Running shortcut counter across recents + categories
  let shortcutCounter = 0;

  return (
    <div
      className="w-[220px] shrink-0 h-full border-r border-slate-200 bg-white flex flex-col"
      data-testid="node-palette"
    >
      {/* Header */}
      <div className="shrink-0 border-b border-slate-200">
        {/* Search + compact toggle */}
        <div className="flex items-center gap-1.5 py-2.5 px-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search nodes..."
            aria-label="Search nodes"
            data-testid="palette-search"
            className="flex-1 min-w-0 border border-slate-300 rounded-md py-1.5 px-2.5 text-[13px] font-[inherit] bg-slate-50 text-slate-900 outline-none focus:border-info focus:ring-1 focus:ring-info placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={() => setCompact((v) => !v)}
            title={compact ? 'Switch to card view' : 'Switch to compact view'}
            data-testid="palette-compact-toggle"
            aria-pressed={compact}
            className={cn(
              'shrink-0 w-7 h-7 flex items-center justify-center rounded border text-[11px] transition-colors',
              compact
                ? 'bg-info border-info text-white'
                : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50',
            )}
          >
            {compact ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1" y="2" width="12" height="2" rx="1" fill="currentColor" />
                <rect x="1" y="6" width="12" height="2" rx="1" fill="currentColor" />
                <rect x="1" y="10" width="12" height="2" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" />
                <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" />
                <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" />
                <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>

        {/* Category filter chips */}
        <div
          className="flex flex-wrap gap-1 px-3 pb-2.5"
          data-testid="palette-category-chips"
        >
          {CATEGORY_NAMES.map((name) => (
            <FilterChip
              key={name}
              size="xs"
              active={activeCategories.has(name)}
              onClick={() => toggleCategory(name)}
              data-testid={`palette-chip-${name}`}
            >
              {name}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto py-1" data-testid="palette-scroll">
        {/* Recently used */}
        {showRecents && (
          <div data-testid="palette-recents">
            <button
              type="button"
              onClick={() => toggleCollapsed('__recents__')}
              className="w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-slate-400 hover:text-slate-600 transition-colors font-[inherit]"
              aria-expanded={!collapsed['__recents__']}
            >
              <Chevron expanded={!collapsed['__recents__']} />
              Recently used
            </button>
            {!collapsed['__recents__'] && (
              <div>
                {recentItems.map((item) => {
                  const idx = shortcutCounter++;
                  return renderItem(item, idx);
                })}
              </div>
            )}
          </div>
        )}

        {/* Category sections */}
        {isEmpty ? (
          <div
            className="flex flex-col items-center gap-3 px-4 py-8 text-center"
            data-testid="palette-empty"
          >
            <span className="text-xs text-slate-400">No nodes match</span>
            <button
              type="button"
              onClick={clearFilters}
              data-testid="palette-clear-filters"
              className="text-[11px] font-semibold text-info-fg hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredCategories.map((cat) => {
            const isCollapsed = !!collapsed[cat.name];
            return (
              <div key={cat.name} data-testid={`palette-category-${cat.name}`}>
                <button
                  type="button"
                  onClick={() => toggleCollapsed(cat.name)}
                  className="w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-slate-400 hover:text-slate-600 transition-colors font-[inherit]"
                  aria-expanded={!isCollapsed}
                >
                  <Chevron expanded={!isCollapsed} />
                  <span
                    aria-hidden
                    data-testid={`palette-section-accent-${cat.key}`}
                    className={cn('w-1.5 h-1.5 rounded-full shrink-0', CAT_ACCENT[cat.key])}
                  />
                  {cat.name}
                </button>
                {!isCollapsed && (
                  <div>
                    {cat.items.map((item) => {
                      const idx = shortcutCounter++;
                      return renderItem(item, idx);
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="py-2 px-3 border-t border-slate-200 text-[10px] text-slate-400 font-[inherit] shrink-0">
        Press 1–9 to insert at center
      </div>
    </div>
  );
}
