// src/components/pipelines/context-inspector/ContextJsonTree.tsx
//
// Recursive JSON tree viewer with syntax highlighting and expand/collapse.
// Renders context data objects with color-coded types and highlights for new keys.

import { useState } from 'react';
import { cn } from '../../../lib/cn';
import { onActivationKey } from '../../../lib/activationKey';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ContextJsonTreeProps {
  data: unknown;
  depth?: number;
  highlightKeys?: Set<string>;
  keyName?: string;
  isHighlighted?: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_DEPTH = 12;

// ---------------------------------------------------------------------------
// Value type color classes
// ---------------------------------------------------------------------------

type ValueType = 'string' | 'number' | 'boolean' | 'null' | 'bracket';

function valueClasses(t: ValueType): string {
  const colorMap: Record<ValueType, string> = {
    string: 'text-code-green',
    number: 'text-code-peach',
    boolean: 'text-code-mauve',
    null: 'text-code-muted',
    bracket: 'text-code-comment',
  };
  return cn('text-xs', colorMap[t]);
}

// Inline highlight wash for a new/changed value or key: a low-opacity
// code-green tint layered OVER the existing syntax-highlighted text. This is
// deliberately NOT routed through CODE_TONE_SOFT (shared/tones.ts) — that map
// gives every tone one flat bg-code-surface, which is right for a badge but
// would erase this highlight rather than add one, since the surrounding tree
// is already sitting on bg-code-surface. Kept as a single literal here
// (rather than repeated inline) so the two opacities stay intentional.
const HIGHLIGHT_VALUE_BG = 'bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5';
const HIGHLIGHT_KEY_BG = 'text-code-green font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContextJsonTree({
  data,
  depth = 0,
  highlightKeys,
  keyName,
  isHighlighted = false,
}: ContextJsonTreeProps) {
  const [collapsed, setCollapsed] = useState(depth > 2);

  if (depth > MAX_DEPTH) {
    return <span className={valueClasses('string')}>{"[max depth]"}</span>;
  }

  const highlighted = isHighlighted || (keyName != null && highlightKeys?.has(keyName));

  if (data === null) {
    return (
      <span className={cn(valueClasses('null'), highlighted && HIGHLIGHT_VALUE_BG)}>
        null
      </span>
    );
  }

  if (data === undefined) {
    return (
      <span className={cn(valueClasses('null'), highlighted && HIGHLIGHT_VALUE_BG)}>
        undefined
      </span>
    );
  }

  if (typeof data === 'boolean') {
    return (
      <span className={cn(valueClasses('boolean'), highlighted && HIGHLIGHT_VALUE_BG)}>
        {String(data)}
      </span>
    );
  }

  if (typeof data === 'number') {
    return (
      <span className={cn(valueClasses('number'), highlighted && HIGHLIGHT_VALUE_BG)}>
        {String(data)}
      </span>
    );
  }

  if (typeof data === 'string') {
    const display = data.length > 120 ? data.slice(0, 120) + '...' : data;
    return (
      <span className={cn(valueClasses('string'), highlighted && HIGHLIGHT_VALUE_BG)}>
        &quot;{display}&quot;
      </span>
    );
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return <span className={valueClasses('bracket')}>[]</span>;
    }
    return (
      <span>
        <span
          className="cursor-pointer select-none text-[9px] mr-1 text-code-muted inline-block w-3 text-center"
          onClick={() => setCollapsed((c) => !c)}
          role="button"
          tabIndex={0}
          // Space must preventDefault or it also scrolls the inspector panel.
          onKeyDown={onActivationKey(() => setCollapsed((c) => !c))}
        >
          {collapsed ? '▶' : '▼'}
        </span>
        <span className={valueClasses('bracket')}>[</span>
        {collapsed ? (
          <span className="text-code-muted italic text-[11px] ml-1">{data.length} items</span>
        ) : (
          <div className="pl-4">
            {data.map((item, i) => (
              <div key={i} className="leading-relaxed whitespace-nowrap">
                <span className="text-code-muted text-[11px]">{i}: </span>
                <ContextJsonTree data={item} depth={depth + 1} highlightKeys={highlightKeys} />
                {i < data.length - 1 && <span className={valueClasses('bracket')}>,</span>}
              </div>
            ))}
          </div>
        )}
        <span className={valueClasses('bracket')}>]</span>
      </span>
    );
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data);
    if (entries.length === 0) {
      return <span className={valueClasses('bracket')}>{'{}'}</span>;
    }
    return (
      <span>
        <span
          className="cursor-pointer select-none text-[9px] mr-1 text-code-muted inline-block w-3 text-center"
          onClick={() => setCollapsed((c) => !c)}
          role="button"
          tabIndex={0}
          // Space must preventDefault or it also scrolls the inspector panel.
          onKeyDown={onActivationKey(() => setCollapsed((c) => !c))}
        >
          {collapsed ? '▶' : '▼'}
        </span>
        <span className={valueClasses('bracket')}>{'{'}</span>
        {collapsed ? (
          <span className="text-code-muted italic text-[11px] ml-1">{entries.length} keys</span>
        ) : (
          <div className="pl-4">
            {entries.map(([key, val], i) => {
              const keyHighlighted = highlightKeys?.has(key) || isHighlighted;
              return (
                <div key={key} className="leading-relaxed whitespace-nowrap">
                  <span className={cn(
                    'text-xs font-medium text-code-blue',
                    keyHighlighted && HIGHLIGHT_KEY_BG,
                  )}>
                    {key}
                  </span>
                  <span className={valueClasses('bracket')}>: </span>
                  <ContextJsonTree
                    data={val}
                    depth={depth + 1}
                    highlightKeys={depth === 0 ? highlightKeys : undefined}
                    keyName={key}
                    isHighlighted={keyHighlighted}
                  />
                  {i < entries.length - 1 && <span className={valueClasses('bracket')}>,</span>}
                </div>
              );
            })}
          </div>
        )}
        <span className={valueClasses('bracket')}>{'}'}</span>
      </span>
    );
  }

  return <span className={valueClasses('string')}>{String(data)}</span>;
}
