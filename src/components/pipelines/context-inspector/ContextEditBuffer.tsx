// src/components/pipelines/context-inspector/ContextEditBuffer.tsx
//
// Edit mode UI for modifying context values inline. Renders a per-key table
// with type-aware inputs (string, number, boolean, object/JSON textarea).
// Includes add-field row and per-row revert affordances.

import { useMemo, useState } from 'react';
import { cn } from '../../../lib/cn';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ContextEditBufferProps {
  inputContext: Record<string, unknown>;
  buffer: Record<string, unknown>;
  parseErrors: Record<string, string>;
  newKeyDraft: { key: string; value: string };
  setNewKeyDraft: (d: { key: string; value: string }) => void;
  onCommitNewKey: () => void;
  onBeginEditKey: (key: string, currentValue: unknown) => void;
  onSetValue: (key: string, value: unknown) => void;
  onRemoveKey: (key: string) => void;
  onParseError: (key: string, msg: string) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function classifyValue(v: unknown): 'string' | 'number' | 'boolean' | 'object' {
  if (typeof v === 'string') return 'string';
  if (typeof v === 'number') return 'number';
  if (typeof v === 'boolean') return 'boolean';
  return 'object';
}

// ---------------------------------------------------------------------------
// ObjectEditor — textarea for JSON values
// ---------------------------------------------------------------------------

interface ObjectEditorProps {
  k: string;
  initial: unknown;
  onCommit: (v: unknown) => void;
  onError: (msg: string) => void;
  onFocus: () => void;
}

function ObjectEditor({ k, initial, onCommit, onError, onFocus }: ObjectEditorProps) {
  const [text, setText] = useState<string>(() => {
    try {
      return JSON.stringify(initial, null, 2);
    } catch {
      return '';
    }
  });
  return (
    <textarea
      data-testid={`context-edit-input-${k}`}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onFocus={onFocus}
      onBlur={() => {
        try {
          const parsed = JSON.parse(text);
          onCommit(parsed);
        } catch (err) {
          onError(`Invalid JSON: ${err instanceof Error ? err.message : String(err)}`);
        }
      }}
      className="w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono min-h-[60px] resize-y"
    />
  );
}

// ---------------------------------------------------------------------------
// ContextEditBuffer component
// ---------------------------------------------------------------------------

export function ContextEditBuffer({
  inputContext,
  buffer,
  parseErrors,
  newKeyDraft,
  setNewKeyDraft,
  onCommitNewKey,
  onBeginEditKey,
  onSetValue,
  onRemoveKey,
  onParseError,
}: ContextEditBufferProps) {
  // Union of input-context keys + buffer keys (so newly-added fields render too).
  const keys = useMemo(() => {
    const set = new Set<string>([
      ...Object.keys(inputContext),
      ...Object.keys(buffer),
    ]);
    return Array.from(set);
  }, [inputContext, buffer]);

  const inputClasses = 'w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono';

  return (
    <div data-testid="context-edit-table">
      {keys.map((key) => {
        const inBuffer = key in buffer;
        const baseValue = inBuffer ? buffer[key] : inputContext[key];
        const kind = classifyValue(baseValue);
        const dirty = inBuffer;

        return (
          <div
            key={key}
            className="grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 border-b border-[#313244]"
            data-testid={`context-edit-row-${key}`}
          >
            <span
              className={cn(
                'text-xs font-medium text-[#89b4fa] pt-1 overflow-hidden text-ellipsis whitespace-nowrap',
                dirty && 'text-[#a6e3a1] font-bold',
              )}
              title={key}
            >
              {key}
              {dirty && (
                <span className="ml-1 text-[9px]">●</span>
              )}
            </span>
            <div className="min-w-0">
              {kind === 'boolean' ? (
                <select
                  data-testid={`context-edit-input-${key}`}
                  value={String(baseValue as boolean)}
                  onChange={(e) => onSetValue(key, e.target.value === 'true')}
                  onFocus={() => onBeginEditKey(key, baseValue)}
                  className={inputClasses}
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              ) : kind === 'number' ? (
                <input
                  data-testid={`context-edit-input-${key}`}
                  type="number"
                  value={String(baseValue as number)}
                  onChange={(e) => {
                    const n = e.target.value === '' ? 0 : Number(e.target.value);
                    onSetValue(key, Number.isNaN(n) ? 0 : n);
                  }}
                  onFocus={() => onBeginEditKey(key, baseValue)}
                  className={inputClasses}
                />
              ) : kind === 'string' ? (
                <input
                  data-testid={`context-edit-input-${key}`}
                  type="text"
                  value={(baseValue as string) ?? ''}
                  onChange={(e) => onSetValue(key, e.target.value)}
                  onFocus={() => onBeginEditKey(key, baseValue)}
                  className={inputClasses}
                />
              ) : (
                <ObjectEditor
                  k={key}
                  initial={baseValue}
                  onCommit={(v) => onSetValue(key, v)}
                  onError={(msg) => onParseError(key, msg)}
                  onFocus={() => onBeginEditKey(key, baseValue)}
                />
              )}
              {parseErrors[key] && (
                <div
                  data-testid={`context-edit-parse-error-${key}`}
                  className="text-[#f38ba8] text-[11px] mt-1"
                >
                  {parseErrors[key]}
                </div>
              )}
            </div>
            <div className="flex gap-1">
              {dirty && (
                <button
                  type="button"
                  data-testid={`context-edit-revert-${key}`}
                  onClick={() => onRemoveKey(key)}
                  title="Drop change"
                  className="px-1.5 py-0.5 text-[10px] bg-transparent text-[#9399b2] border border-[#313244] rounded-sm cursor-pointer font-mono"
                >
                  ↺
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Add field row */}
      <div
        className="grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 mt-2"
        data-testid="context-edit-add-row"
      >
        <input
          data-testid="context-edit-new-key"
          type="text"
          placeholder="key"
          value={newKeyDraft.key}
          onChange={(e) => setNewKeyDraft({ ...newKeyDraft, key: e.target.value })}
          className={inputClasses}
        />
        <input
          data-testid="context-edit-new-value"
          type="text"
          placeholder="value (string or JSON)"
          value={newKeyDraft.value}
          onChange={(e) => setNewKeyDraft({ ...newKeyDraft, value: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onCommitNewKey();
            }
          }}
          className={inputClasses}
        />
        <button
          type="button"
          data-testid="context-edit-add-btn"
          onClick={onCommitNewKey}
          disabled={!newKeyDraft.key.trim()}
          className={cn(
            'px-2.5 py-0.5 text-[11px] font-semibold border rounded-sm cursor-pointer font-mono',
            newKeyDraft.key.trim()
              ? 'bg-[#a6e3a1] text-[#1e1e2e] border-[#a6e3a1]'
              : 'bg-transparent text-[#45475a] border-[#313244] cursor-not-allowed',
          )}
        >
          + Add field
        </button>
      </div>
    </div>
  );
}
