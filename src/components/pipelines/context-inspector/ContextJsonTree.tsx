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
      <span className={cn(valueClasses('null'), highlighted && 'bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5')}>
        null
      </span>
    );
  }

  if (data === undefined) {
    return (
      <span className={cn(valueClasses('null'), highlighted && 'bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5')}>
        undefined
      </span>
    );
  }

  if (typeof data === 'boolean') {
    return (
      <span className={cn(valueClasses('boolean'), highlighted && 'bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5')}>
        {String(data)}
      </span>
    );
  }

  if (typeof data === 'number') {
    return (
      <span className={cn(valueClasses('number'), highlighted && 'bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5')}>
        {String(data)}
      </span>
    );
  }

  if (typeof data === 'string') {
    const display = data.length > 120 ? data.slice(0, 120) + '...' : data;
    return (
      <span className={cn(valueClasses('string'), highlighted && 'bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5')}>
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
                    keyHighlighted && 'text-code-green font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5',
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
