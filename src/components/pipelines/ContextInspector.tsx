// frontend/src/components/pipelines/ContextInspector.tsx
//
// Context Inspector — shows the accumulated pipeline context object at each
// step boundary during/after execution. Allows developers to inspect what
// data flowed into each step, what it produced, and how the context evolved.
//
// Data sources:
//   - pipeline.step.completed events (output per step)
//   - pipeline.llm.prompt events (resolved template)
//   - pipeline:run:checkpoint events (full context snapshot at boundaries)
//   - StepExecution.input / .output from the PipelineRun snapshot
//
// The component renders a collapsible JSON tree with syntax highlighting.
// New keys added by the active step are highlighted in green.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { PipelineRun, StepAttempt, StepExecution } from '../../types/pipeline';
import { useEventStream } from './context/EventStreamContext';
import type { WildcardEvent } from './context/EventStreamContext';
import { colors } from '../../constants/styles';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ContextInspectorProps {
  /** The run to inspect (from PipelineRunsContext). */
  run: PipelineRun | null;
  /** Currently selected step — controls which snapshot is shown. */
  activeStepId: string | null;
  /** Callback when the user clicks a step in the step list. */
  onStepSelect?: (stepId: string) => void;
  /**
   * hub#2226: when true AND the run is paused at `activeStepId`, the
   * inspector shows an "Edit" toggle on the input-context tab and exposes
   * the dirty edit buffer + per-row affordances. The Apply combo button
   * lives in the parent toolbar, but the inspector publishes its dirty
   * buffer + reset hook here so the toolbar can hand it to
   * `applyContextPatch`.
   */
  editable?: boolean;
  /**
   * hub#2226: notified whenever the user mutates the edit buffer for the
   * paused step. The parent uses this to enable the Apply combo button and
   * to read the buffer when the user clicks Apply.
   */
  onEditBufferChange?: (
    stepId: string,
    /** When `null`, the buffer was reset (Apply succeeded or user toggled off edit). */
    buffer: Record<string, unknown> | null,
  ) => void;
  /**
   * hub#2226: imperative ref consumers can call to drop the in-memory edit
   * buffer (e.g. after a successful Apply or after the run resumed past
   * pausedAtNodeId). Called by the parent via the `onEditBufferChange(_, null)`
   * round-trip is also acceptable, but a direct reset is simpler from the
   * toolbar callback.
   */
  resetEditBufferKey?: number;
}

// ---------------------------------------------------------------------------
// Internal types
// ---------------------------------------------------------------------------

interface StepContextSnapshot {
  stepId: string;
  /** Context as it was before this step executed (input). */
  inputContext: Record<string, unknown>;
  /** What this step produced / added. */
  output: unknown;
  /** Context after this step's output was merged. */
  outputContext: Record<string, unknown>;
  /** For LLM steps: the resolved prompt template. */
  resolvedPrompt?: string;
  /** Keys that were newly added to the context by this step. */
  newKeys: string[];
  /** Full StepExecution for metadata access (LLM, error, approvals, duration). */
  stepExecution: StepExecution;
}

// ---------------------------------------------------------------------------
// Context accumulation logic (mirrors PipelineExecutor's accumulateContext)
// ---------------------------------------------------------------------------

function accumulateContext(
  context: Record<string, unknown>,
  stepId: string,
  output: unknown,
): Record<string, unknown> {
  const next = { ...context };
  const steps = { ...((next.steps as Record<string, unknown>) ?? {}) };
  steps[stepId] = output;
  next.steps = steps;

  if (output && typeof output === 'object' && !Array.isArray(output)) {
    Object.assign(next, output as Record<string, unknown>);
  }

  return next;
}

function findNewKeys(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
): string[] {
  const newKeys: string[] = [];
  for (const key of Object.keys(after)) {
    if (!(key in before)) {
      newKeys.push(key);
    }
  }
  return newKeys;
}

// ---------------------------------------------------------------------------
// Build step snapshots from a PipelineRun
// ---------------------------------------------------------------------------

function buildSnapshots(run: PipelineRun): StepContextSnapshot[] {
  // Order steps by startedAt (chronological execution order).
  const orderedSteps = Object.values(run.steps)
    .filter((s): s is StepExecution => s != null)
    .sort((a, b) => {
      const aStart = a.startedAt ? Date.parse(a.startedAt) : 0;
      const bStart = b.startedAt ? Date.parse(b.startedAt) : 0;
      return aStart - bStart;
    });

  const snapshots: StepContextSnapshot[] = [];
  let currentContext: Record<string, unknown> = {};

  // Seed from trigger payload if present.
  if (run.triggeredBy?.payload && typeof run.triggeredBy.payload === 'object') {
    currentContext = { ...run.triggeredBy.payload };
  }

  for (const step of orderedSteps) {
    const inputContext = { ...currentContext };
    const output = step.output;
    const resolvedPrompt = step.llm?.prompt;

    // Accumulate context with this step's output.
    let outputContext: Record<string, unknown>;
    if (output !== undefined) {
      outputContext = accumulateContext(currentContext, step.nodeId, output);
    } else {
      outputContext = { ...currentContext };
      // Still record in steps map even if output is undefined.
      const steps = {
        ...((outputContext.steps as Record<string, unknown>) ?? {}),
      };
      steps[step.nodeId] = output;
      outputContext.steps = steps;
    }

    const newKeys = findNewKeys(inputContext, outputContext);

    snapshots.push({
      stepId: step.nodeId,
      inputContext,
      output,
      outputContext,
      resolvedPrompt: resolvedPrompt || undefined,
      newKeys,
      stepExecution: step,
    });

    currentContext = outputContext;
  }

  return snapshots;
}

// ---------------------------------------------------------------------------
// JSON Tree component (recursive, collapsible, syntax highlighted)
// ---------------------------------------------------------------------------

interface JsonTreeProps {
  data: unknown;
  depth?: number;
  highlightKeys?: Set<string>;
  keyName?: string;
  isHighlighted?: boolean;
}

const INDENT_PX = 16;
const MAX_DEPTH = 12;

function JsonTree({
  data,
  depth = 0,
  highlightKeys,
  keyName,
  isHighlighted = false,
}: JsonTreeProps) {
  const [collapsed, setCollapsed] = useState(depth > 2);

  if (depth > MAX_DEPTH) {
    return <span style={valueStyle('string')}>{"[max depth]"}</span>;
  }

  const highlighted = isHighlighted || (keyName != null && highlightKeys?.has(keyName));

  if (data === null) {
    return (
      <span style={{ ...valueStyle('null'), ...(highlighted ? highlightedValueStyle : {}) }}>
        null
      </span>
    );
  }

  if (data === undefined) {
    return (
      <span style={{ ...valueStyle('null'), ...(highlighted ? highlightedValueStyle : {}) }}>
        undefined
      </span>
    );
  }

  if (typeof data === 'boolean') {
    return (
      <span style={{ ...valueStyle('boolean'), ...(highlighted ? highlightedValueStyle : {}) }}>
        {String(data)}
      </span>
    );
  }

  if (typeof data === 'number') {
    return (
      <span style={{ ...valueStyle('number'), ...(highlighted ? highlightedValueStyle : {}) }}>
        {String(data)}
      </span>
    );
  }

  if (typeof data === 'string') {
    const display = data.length > 120 ? data.slice(0, 120) + '...' : data;
    return (
      <span style={{ ...valueStyle('string'), ...(highlighted ? highlightedValueStyle : {}) }}>
        "{display}"
      </span>
    );
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return <span style={valueStyle('bracket')}>[]</span>;
    }
    return (
      <span>
        <span
          style={toggleStyle}
          onClick={() => setCollapsed((c) => !c)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setCollapsed((c) => !c); }}
        >
          {collapsed ? '▶' : '▼'}
        </span>
        <span style={valueStyle('bracket')}>[</span>
        {collapsed ? (
          <span style={collapsedHint}>{data.length} items</span>
        ) : (
          <div style={{ paddingLeft: INDENT_PX }}>
            {data.map((item, i) => (
              <div key={i} style={entryRowStyle}>
                <span style={indexStyle}>{i}: </span>
                <JsonTree data={item} depth={depth + 1} highlightKeys={highlightKeys} />
                {i < data.length - 1 && <span style={valueStyle('bracket')}>,</span>}
              </div>
            ))}
          </div>
        )}
        <span style={valueStyle('bracket')}>]</span>
      </span>
    );
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data);
    if (entries.length === 0) {
      return <span style={valueStyle('bracket')}>{'{}'}</span>;
    }
    return (
      <span>
        <span
          style={toggleStyle}
          onClick={() => setCollapsed((c) => !c)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setCollapsed((c) => !c); }}
        >
          {collapsed ? '▶' : '▼'}
        </span>
        <span style={valueStyle('bracket')}>{'{'}</span>
        {collapsed ? (
          <span style={collapsedHint}>{entries.length} keys</span>
        ) : (
          <div style={{ paddingLeft: INDENT_PX }}>
            {entries.map(([key, val], i) => {
              const keyHighlighted = highlightKeys?.has(key) || isHighlighted;
              return (
                <div key={key} style={entryRowStyle}>
                  <span style={{
                    ...keyStyle,
                    ...(keyHighlighted ? highlightedKeyStyle : {}),
                  }}>
                    {key}
                  </span>
                  <span style={valueStyle('bracket')}>: </span>
                  <JsonTree
                    data={val}
                    depth={depth + 1}
                    highlightKeys={depth === 0 ? highlightKeys : undefined}
                    keyName={key}
                    isHighlighted={keyHighlighted}
                  />
                  {i < entries.length - 1 && <span style={valueStyle('bracket')}>,</span>}
                </div>
              );
            })}
          </div>
        )}
        <span style={valueStyle('bracket')}>{'}'}</span>
      </span>
    );
  }

  return <span style={valueStyle('string')}>{String(data)}</span>;
}

// ---------------------------------------------------------------------------
// Styles for the JSON tree
// ---------------------------------------------------------------------------

const toggleStyle: CSSProperties = {
  cursor: 'pointer',
  userSelect: 'none',
  fontSize: 9,
  marginRight: 4,
  color: '#6c7086',
  display: 'inline-block',
  width: 12,
  textAlign: 'center',
};

const entryRowStyle: CSSProperties = {
  lineHeight: 1.6,
  whiteSpace: 'nowrap',
};

const indexStyle: CSSProperties = {
  color: '#6c7086',
  fontSize: 11,
};

const keyStyle: CSSProperties = {
  color: '#89b4fa',
  fontSize: 12,
  fontWeight: 500,
};

const highlightedKeyStyle: CSSProperties = {
  color: '#a6e3a1',
  fontWeight: 700,
  background: 'rgba(166, 227, 161, 0.1)',
  borderRadius: 2,
  padding: '0 2px',
};

const highlightedValueStyle: CSSProperties = {
  background: 'rgba(166, 227, 161, 0.08)',
  borderRadius: 2,
  padding: '0 2px',
};

const collapsedHint: CSSProperties = {
  color: '#6c7086',
  fontStyle: 'italic',
  fontSize: 11,
  marginLeft: 4,
};

type ValueType = 'string' | 'number' | 'boolean' | 'null' | 'bracket';

function valueStyle(t: ValueType): CSSProperties {
  const colorMap: Record<ValueType, string> = {
    string: '#a6e3a1',
    number: '#fab387',
    boolean: '#cba6f7',
    null: '#6c7086',
    bracket: '#9399b2',
  };
  return {
    fontSize: 12,
    color: colorMap[t],
  };
}

// ---------------------------------------------------------------------------
// Main component styles
// ---------------------------------------------------------------------------

const panelStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: '100%',
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 14px',
  borderBottom: `1px solid ${colors.border}`,
  flexShrink: 0,
};

const headerTitleStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: colors.textPrimary,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const bodyStyle: CSSProperties = {
  display: 'flex',
  flex: 1,
  minHeight: 0,
  overflow: 'hidden',
};

const stepListStyle: CSSProperties = {
  width: 140,
  flexShrink: 0,
  borderRight: `1px solid ${colors.border}`,
  overflowY: 'auto',
};

const stepItemStyle = (active: boolean): CSSProperties => ({
  padding: '6px 10px',
  fontSize: 11,
  fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
  color: active ? colors.textPrimary : colors.textTertiary,
  background: active ? colors.surfaceInset : 'transparent',
  cursor: 'pointer',
  borderBottom: `1px solid ${colors.border}`,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontWeight: active ? 600 : 400,
});

const contentAreaStyle: CSSProperties = {
  flex: 1,
  overflow: 'auto',
  padding: '10px 14px',
  fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
  fontSize: 12,
};

const tabBarStyle: CSSProperties = {
  display: 'flex',
  gap: 0,
  borderBottom: `1px solid ${colors.border}`,
  flexShrink: 0,
};

const tabStyle = (active: boolean): CSSProperties => ({
  padding: '6px 14px',
  fontSize: 11,
  fontWeight: 600,
  color: active ? colors.primary : colors.textTertiary,
  background: 'transparent',
  border: 'none',
  borderBottom: active ? `2px solid ${colors.primary}` : '2px solid transparent',
  cursor: 'pointer',
  fontFamily: 'inherit',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
});

const promptBoxStyle: CSSProperties = {
  padding: '10px 12px',
  background: colors.surfaceInset,
  border: `1px solid ${colors.border}`,
  borderRadius: 6,
  fontSize: 12,
  color: colors.textPrimary,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  lineHeight: 1.6,
  maxHeight: 240,
  overflowY: 'auto',
};

const emptyStateStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  color: colors.textTertiary,
  fontSize: 12,
  fontStyle: 'italic',
};

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

type TabId = 'input' | 'output' | 'prompt' | 'details' | 'attempts';

// ---------------------------------------------------------------------------
// AttemptCard — one column in the side-by-side attempt diff
// ---------------------------------------------------------------------------

function AttemptCard({ attempt, label }: { attempt: StepAttempt; label: string }) {
  const succeeded = !attempt.error;
  return (
    <div style={{ background: '#11111b', borderRadius: 6, border: '1px solid #313244', padding: 10, overflow: 'auto' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#cdd6f4', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center' }}>
        <span style={{
          fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 3,
          background: succeeded ? 'rgba(166,227,161,0.15)' : 'rgba(243,139,168,0.15)',
          color: succeeded ? '#a6e3a1' : '#f38ba8',
        }}>
          {succeeded ? 'OK' : 'FAIL'}
        </span>
        {attempt.durationMs != null && (
          <span style={{ fontSize: 10, color: '#6c7086' }}>{attempt.durationMs}ms</span>
        )}
      </div>
      {attempt.error && (
        <div style={{
          fontSize: 11, color: '#f38ba8', fontFamily: 'inherit', marginBottom: 6,
          padding: '6px 8px', background: '#1a0f14', borderRadius: 4,
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        }}>
          {attempt.error}
        </div>
      )}
      {attempt.output !== undefined && (
        <div>
          <div style={{ fontSize: 10, color: '#6c7086', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>
            Output
          </div>
          <JsonTree data={attempt.output} depth={0} />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// hub#2226 — ContextEditTable: per-key edit affordances for the paused step's
// input context. Renders one row per top-level key in `inputContext`, plus a
// "+ Add field" affordance at the bottom. Mutations route through the
// callbacks supplied by the parent so the dirty buffer stays in sync.
// ---------------------------------------------------------------------------

interface ContextEditTableProps {
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

function classifyValue(v: unknown): 'string' | 'number' | 'boolean' | 'object' {
  if (typeof v === 'string') return 'string';
  if (typeof v === 'number') return 'number';
  if (typeof v === 'boolean') return 'boolean';
  return 'object';
}

const editRowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '120px 1fr auto',
  gap: 8,
  alignItems: 'flex-start',
  padding: '6px 0',
  borderBottom: '1px solid #313244',
};

const editKeyLabelStyle: CSSProperties = {
  fontSize: 12,
  color: '#89b4fa',
  fontWeight: 500,
  paddingTop: 4,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const editInputStyle: CSSProperties = {
  width: '100%',
  padding: '4px 6px',
  fontSize: 12,
  background: '#11111b',
  color: '#cdd6f4',
  border: '1px solid #313244',
  borderRadius: 3,
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

const editTextareaStyle: CSSProperties = {
  ...editInputStyle,
  minHeight: 60,
  resize: 'vertical',
  fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
};

function ContextEditTable({
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
}: ContextEditTableProps) {
  // Union of input-context keys + buffer keys (so newly-added fields render too).
  const keys = useMemo(() => {
    const set = new Set<string>([
      ...Object.keys(inputContext),
      ...Object.keys(buffer),
    ]);
    return Array.from(set);
  }, [inputContext, buffer]);

  return (
    <div data-testid="context-edit-table">
      {keys.map((key) => {
        const inBuffer = key in buffer;
        const baseValue = inBuffer ? buffer[key] : inputContext[key];
        const kind = classifyValue(baseValue);
        const dirty = inBuffer;

        return (
          <div key={key} style={editRowStyle} data-testid={`context-edit-row-${key}`}>
            <span style={{
              ...editKeyLabelStyle,
              ...(dirty ? { color: '#a6e3a1', fontWeight: 700 } : {}),
            }} title={key}>
              {key}
              {dirty && (
                <span style={{ marginLeft: 4, fontSize: 9 }}>●</span>
              )}
            </span>
            <div style={{ minWidth: 0 }}>
              {kind === 'boolean' ? (
                <select
                  data-testid={`context-edit-input-${key}`}
                  value={String(baseValue as boolean)}
                  onChange={(e) => onSetValue(key, e.target.value === 'true')}
                  onFocus={() => onBeginEditKey(key, baseValue)}
                  style={editInputStyle}
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
                  style={editInputStyle}
                />
              ) : kind === 'string' ? (
                <input
                  data-testid={`context-edit-input-${key}`}
                  type="text"
                  value={(baseValue as string) ?? ''}
                  onChange={(e) => onSetValue(key, e.target.value)}
                  onFocus={() => onBeginEditKey(key, baseValue)}
                  style={editInputStyle}
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
                  style={{ color: '#f38ba8', fontSize: 11, marginTop: 4 }}
                >
                  {parseErrors[key]}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {dirty && (
                <button
                  type="button"
                  data-testid={`context-edit-revert-${key}`}
                  onClick={() => onRemoveKey(key)}
                  title="Drop change"
                  style={{
                    padding: '2px 6px',
                    fontSize: 10,
                    background: 'transparent',
                    color: '#9399b2',
                    border: '1px solid #313244',
                    borderRadius: 3,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
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
        style={{ ...editRowStyle, borderBottom: 'none', marginTop: 8 }}
        data-testid="context-edit-add-row"
      >
        <input
          data-testid="context-edit-new-key"
          type="text"
          placeholder="key"
          value={newKeyDraft.key}
          onChange={(e) => setNewKeyDraft({ ...newKeyDraft, key: e.target.value })}
          style={editInputStyle}
        />
        <input
          data-testid="context-edit-new-value"
          type="text"
          placeholder='value (string or JSON)'
          value={newKeyDraft.value}
          onChange={(e) => setNewKeyDraft({ ...newKeyDraft, value: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onCommitNewKey();
            }
          }}
          style={editInputStyle}
        />
        <button
          type="button"
          data-testid="context-edit-add-btn"
          onClick={onCommitNewKey}
          disabled={!newKeyDraft.key.trim()}
          style={{
            padding: '2px 10px',
            fontSize: 11,
            fontWeight: 600,
            background: newKeyDraft.key.trim() ? '#a6e3a1' : 'transparent',
            color: newKeyDraft.key.trim() ? '#1e1e2e' : '#45475a',
            border: `1px solid ${newKeyDraft.key.trim() ? '#a6e3a1' : '#313244'}`,
            borderRadius: 3,
            cursor: newKeyDraft.key.trim() ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
          }}
        >
          + Add field
        </button>
      </div>
    </div>
  );
}

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
      style={editTextareaStyle}
    />
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContextInspector({
  run,
  activeStepId,
  onStepSelect,
  editable = false,
  onEditBufferChange,
  resetEditBufferKey,
}: ContextInspectorProps) {
  const [activeTab, setActiveTab] = useState<TabId>('input');
  const [compareIdx, setCompareIdx] = useState(0);
  // hub#2226: edit-mode state. Buffer is a flat key→value map (the merge
  // values that will become `{ mode: 'merge', values: editBuffer }`). It is
  // seeded empty when the user toggles edit on; mutations stay local until
  // the parent's Apply combo button runs `applyPatch`.
  const [editMode, setEditMode] = useState(false);
  const [editBuffer, setEditBuffer] = useState<Record<string, unknown>>({});
  const [editBufferStepId, setEditBufferStepId] = useState<string | null>(null);
  // Per-row JSON parse errors for object/array values (textarea blur).
  const [editParseErrors, setEditParseErrors] = useState<Record<string, string>>({});
  // Track in-flight new-key drafts (key name + raw value) before commit.
  const [newKeyDraft, setNewKeyDraft] = useState<{ key: string; value: string }>({
    key: '',
    value: '',
  });
  const [livePrompts, setLivePrompts] = useState<Map<string, string>>(new Map());
  const [liveCheckpoints, setLiveCheckpoints] = useState<Map<string, Record<string, unknown>>>(
    new Map(),
  );
  const prevRunIdRef = useRef<string | null>(null);

  // Reset live state when runId changes.
  useEffect(() => {
    const runId = run?.id ?? null;
    if (runId !== prevRunIdRef.current) {
      prevRunIdRef.current = runId;
      setLivePrompts(new Map());
      setLiveCheckpoints(new Map());
    }
  }, [run?.id]);

  // Subscribe to wildcard events for live checkpoint + prompt updates.
  const handler = useCallback(
    (envelope: unknown) => {
      if (!envelope || typeof envelope !== 'object') return;
      const { eventType, payload } = envelope as WildcardEvent;
      if (!payload || typeof payload !== 'object') return;

      const p = payload as Record<string, unknown>;
      const eventRunId = p.runId as string | undefined;
      if (!run?.id || eventRunId !== run.id) return;

      // Capture resolved prompts from LLM steps.
      if (eventType === 'pipeline.llm.prompt') {
        const stepId = p.stepId as string | undefined;
        const prompt = p.prompt as string | undefined;
        if (stepId && prompt) {
          setLivePrompts((prev) => {
            const next = new Map(prev);
            next.set(stepId, prompt);
            return next;
          });
        }
      }

      // Capture checkpoint events (full context snapshots at step boundaries).
      if (
        eventType === 'pipeline.run.checkpoint' ||
        eventType === 'pipeline.run.checkpointed' ||
        eventType === 'pipeline:run:checkpoint' ||
        eventType === 'pipeline:run:checkpointed'
      ) {
        const context = p.context as Record<string, unknown> | undefined;
        const stepId = p.stepId as string | undefined;
        if (context && stepId) {
          setLiveCheckpoints((prev) => {
            const next = new Map(prev);
            next.set(stepId, context);
            return next;
          });
        }
      }
    },
    [run?.id],
  );

  useEventStream('*', handler);

  // Build snapshots from the run's step data.
  const snapshots = useMemo(() => {
    if (!run) return [];
    return buildSnapshots(run);
  }, [run]);

  // Enhance snapshots with live data.
  const enrichedSnapshots = useMemo(() => {
    return snapshots.map((snapshot) => {
      const livePrompt = livePrompts.get(snapshot.stepId);
      const liveContext = liveCheckpoints.get(snapshot.stepId);
      return {
        ...snapshot,
        resolvedPrompt: snapshot.resolvedPrompt || livePrompt,
        outputContext: liveContext ?? snapshot.outputContext,
      };
    });
  }, [snapshots, livePrompts, liveCheckpoints]);

  // Determine which snapshot to show.
  const activeSnapshot = useMemo(() => {
    if (!activeStepId) return enrichedSnapshots[enrichedSnapshots.length - 1] ?? null;
    return enrichedSnapshots.find((s) => s.stepId === activeStepId) ?? null;
  }, [enrichedSnapshots, activeStepId]);

  // Tab visibility — only show "Resolved Prompt" tab when applicable.
  const showPromptTab = activeSnapshot?.resolvedPrompt != null;
  const stepAttempts = activeSnapshot?.stepExecution.attempts;
  const showAttemptsTab = (stepAttempts?.length ?? 0) >= 2;

  // Reset to 'input' tab if current tab becomes invalid.
  useEffect(() => {
    if (activeTab === 'prompt' && !showPromptTab) setActiveTab('input');
    if (activeTab === 'attempts' && !showAttemptsTab) setActiveTab('input');
  }, [activeTab, showPromptTab, showAttemptsTab]);

  // Reset attempt comparison cursor when the active step changes.
  useEffect(() => {
    setCompareIdx(0);
  }, [activeStepId]);

  // Highlight keys that were added by the active step.
  const newKeysSet = useMemo(() => {
    if (!activeSnapshot) return new Set<string>();
    return new Set(activeSnapshot.newKeys);
  }, [activeSnapshot]);

  // ── hub#2226 edit-mode: gating + buffer wiring ─────────────────────────
  const isPausedAtActive = !!(
    run &&
    run.status === 'paused_at_breakpoint' &&
    activeStepId &&
    (run.currentStepIds?.includes(activeStepId) ||
      // Some snapshots don't keep currentStepIds in sync; fall back to the
      // step's own status.
      activeSnapshot?.stepExecution.status === 'running' ||
      activeSnapshot?.stepExecution.status === 'awaiting' ||
      activeSnapshot?.stepExecution.status === 'pending')
  );
  const editingAllowed = !!editable && !!isPausedAtActive;

  // Reset buffer when the active step changes or the run resumes past it.
  useEffect(() => {
    if (!editingAllowed) {
      if (editMode) setEditMode(false);
      if (Object.keys(editBuffer).length > 0) setEditBuffer({});
      if (editBufferStepId) setEditBufferStepId(null);
      if (Object.keys(editParseErrors).length > 0) setEditParseErrors({});
    } else if (editBufferStepId && editBufferStepId !== activeStepId) {
      setEditBuffer({});
      setEditBufferStepId(null);
      setEditParseErrors({});
    }
    // We deliberately depend on the gating + active-step inputs only; the
    // setters are stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingAllowed, activeStepId]);

  // Imperative reset hook for the parent (e.g. after a successful Apply).
  useEffect(() => {
    if (resetEditBufferKey === undefined) return;
    setEditBuffer({});
    setEditBufferStepId(null);
    setEditParseErrors({});
    setNewKeyDraft({ key: '', value: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetEditBufferKey]);

  // Notify parent on every buffer change so it can drive the Apply button.
  useEffect(() => {
    if (!editingAllowed || !activeStepId) return;
    if (!onEditBufferChange) return;
    if (Object.keys(editBuffer).length === 0) {
      onEditBufferChange(activeStepId, null);
    } else {
      onEditBufferChange(activeStepId, editBuffer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editBuffer, editingAllowed, activeStepId]);

  const beginEditingKey = useCallback(
    (key: string, currentValue: unknown) => {
      setEditBufferStepId(activeStepId);
      setEditBuffer((prev) => {
        if (key in prev) return prev;
        return { ...prev, [key]: currentValue };
      });
    },
    [activeStepId],
  );

  const setBufferValue = useCallback(
    (key: string, value: unknown) => {
      setEditBufferStepId(activeStepId);
      setEditBuffer((prev) => ({ ...prev, [key]: value }));
      setEditParseErrors((prev) => {
        if (!(key in prev)) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    [activeStepId],
  );

  const removeBufferKey = useCallback((key: string) => {
    setEditBuffer((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setEditParseErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const setParseError = useCallback((key: string, msg: string) => {
    setEditParseErrors((prev) => ({ ...prev, [key]: msg }));
  }, []);

  const discardChanges = useCallback(() => {
    setEditBuffer({});
    setEditBufferStepId(null);
    setEditParseErrors({});
    setNewKeyDraft({ key: '', value: '' });
  }, []);

  const commitNewKey = useCallback(() => {
    const key = newKeyDraft.key.trim();
    if (!key) return;
    // Parse the value text — try JSON first, fall back to string. Empty string
    // becomes empty string (not undefined) so the user can intentionally set "".
    let parsed: unknown = newKeyDraft.value;
    const v = newKeyDraft.value;
    if (v.trim().length > 0) {
      try {
        parsed = JSON.parse(v);
      } catch {
        parsed = v;
      }
    }
    setBufferValue(key, parsed);
    setNewKeyDraft({ key: '', value: '' });
  }, [newKeyDraft, setBufferValue]);

  if (!run || enrichedSnapshots.length === 0) {
    return (
      <div style={panelStyle} data-testid="context-inspector">
        <div style={headerStyle}>
          <span style={headerTitleStyle}>Context Inspector</span>
        </div>
        <div style={{ ...contentAreaStyle, ...emptyStateStyle, flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 13, color: '#6c7086' }}>
            {!run ? 'Run a pipeline to inspect context flow' : 'Waiting for step execution data...'}
          </span>
          <span style={{ fontSize: 11, color: '#45475a' }}>
            {!run
              ? 'Trigger a run to see inputs, outputs, and context at each step.'
              : 'Context data will appear as steps complete.'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={panelStyle} data-testid="context-inspector">
      {/* Header */}
      <div style={headerStyle}>
        <span style={headerTitleStyle}>Context Inspector</span>
        {activeSnapshot && activeSnapshot.stepId && (
          <span style={{ fontSize: 10, color: '#6c7086' }}>
            Step: {activeSnapshot.stepId.slice(0, 8)}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div style={tabBarStyle}>
        <button
          type="button"
          style={tabStyle(activeTab === 'input')}
          onClick={() => setActiveTab('input')}
        >
          Input Context
        </button>
        <button
          type="button"
          style={tabStyle(activeTab === 'output')}
          onClick={() => setActiveTab('output')}
        >
          Output
        </button>
        {showPromptTab && (
          <button
            type="button"
            style={tabStyle(activeTab === 'prompt')}
            onClick={() => setActiveTab('prompt')}
          >
            Resolved Prompt
          </button>
        )}
        <button
          type="button"
          style={tabStyle(activeTab === 'details')}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        {showAttemptsTab && (
          <button
            type="button"
            data-testid="attempts-tab"
            style={tabStyle(activeTab === 'attempts')}
            onClick={() => setActiveTab('attempts')}
          >
            Attempts ({stepAttempts?.length})
          </button>
        )}
      </div>

      {/* Body */}
      <div style={bodyStyle}>
        {/* Step list sidebar */}
        <div style={stepListStyle}>
          {enrichedSnapshots.map((snapshot, idx) => (
            <div
              key={snapshot.stepId || idx}
              style={stepItemStyle(snapshot.stepId === (activeStepId ?? activeSnapshot?.stepId))}
              onClick={() => onStepSelect?.(snapshot.stepId)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onStepSelect?.(snapshot.stepId);
              }}
              title={snapshot.stepId}
            >
              {snapshot.newKeys.length > 0 && (
                <span style={{ color: '#a6e3a1', marginRight: 4, fontSize: 9 }}>+</span>
              )}
              <span style={{ fontSize: 10, color: '#9399b2', marginRight: 4 }}>{idx + 1}.</span>
              {snapshot.stepId ? snapshot.stepId.slice(0, 8) : `step-${idx + 1}`}
            </div>
          ))}
        </div>

        {/* Content area */}
        <div style={contentAreaStyle}>
          {!activeSnapshot ? (
            <div style={emptyStateStyle}>Select a step to inspect</div>
          ) : activeTab === 'input' ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontSize: 10, color: '#6c7086', fontWeight: 600, textTransform: 'uppercase' }}>
                  Input context{activeSnapshot.stepId ? ` — step ${activeSnapshot.stepId.slice(0, 8)}` : ''}
                </div>
                {editingAllowed && (
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {editMode && Object.keys(editBuffer).length > 0 && (
                      <button
                        type="button"
                        onClick={discardChanges}
                        data-testid="context-inspector-discard"
                        style={{
                          padding: '2px 8px',
                          fontSize: 10,
                          fontWeight: 600,
                          background: 'transparent',
                          color: '#f38ba8',
                          border: '1px solid #313244',
                          borderRadius: 3,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                      >
                        Discard changes
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const next = !editMode;
                        setEditMode(next);
                        if (!next) discardChanges();
                      }}
                      data-testid="context-inspector-edit-toggle"
                      style={{
                        padding: '2px 8px',
                        fontSize: 10,
                        fontWeight: 600,
                        background: editMode ? '#d97706' : 'transparent',
                        color: editMode ? '#ffffff' : '#d97706',
                        border: '1px solid #d97706',
                        borderRadius: 3,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {editMode ? 'Editing' : 'Edit'}
                    </button>
                  </div>
                )}
              </div>
              {Object.keys(activeSnapshot.inputContext).length === 0 && !(editingAllowed && editMode) ? (
                <div style={{ color: '#6c7086', fontSize: 12, fontStyle: 'italic' }}>
                  No input context (first step or no upstream output)
                </div>
              ) : editingAllowed && editMode ? (
                <ContextEditTable
                  inputContext={activeSnapshot.inputContext}
                  buffer={editBuffer}
                  parseErrors={editParseErrors}
                  newKeyDraft={newKeyDraft}
                  setNewKeyDraft={setNewKeyDraft}
                  onCommitNewKey={commitNewKey}
                  onBeginEditKey={beginEditingKey}
                  onSetValue={setBufferValue}
                  onRemoveKey={removeBufferKey}
                  onParseError={setParseError}
                />
              ) : (
                <JsonTree
                  data={activeSnapshot.inputContext}
                  highlightKeys={newKeysSet}
                />
              )}
            </div>
          ) : activeTab === 'output' ? (
            <div>
              <div style={{ marginBottom: 8, fontSize: 10, color: '#6c7086', fontWeight: 600, textTransform: 'uppercase' }}>
                Output{activeSnapshot.stepId ? ` — step ${activeSnapshot.stepId.slice(0, 8)}` : ''}
              </div>
              <JsonTree data={activeSnapshot.output} />
              {activeSnapshot.newKeys.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <div style={{
                    fontSize: 10,
                    color: '#a6e3a1',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}>
                    New context keys added
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {activeSnapshot.newKeys.map((key) => (
                      <span
                        key={key}
                        style={{
                          padding: '2px 6px',
                          background: 'rgba(166, 227, 161, 0.15)',
                          color: '#a6e3a1',
                          borderRadius: 3,
                          fontSize: 11,
                          fontWeight: 600,
                          fontFamily: 'inherit',
                        }}
                      >
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === 'prompt' ? (
            <div>
              <div style={{ marginBottom: 8, fontSize: 10, color: '#6c7086', fontWeight: 600, textTransform: 'uppercase' }}>
                Resolved prompt template
              </div>
              <div style={promptBoxStyle}>
                {activeSnapshot.resolvedPrompt}
              </div>
            </div>
          ) : activeTab === 'details' ? (
            <div>
              <div style={{ marginBottom: 8, fontSize: 10, color: '#6c7086', fontWeight: 600, textTransform: 'uppercase' }}>
                Step execution details
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Duration */}
                {activeSnapshot.stepExecution.startedAt && (
                  <div>
                    <div style={{ fontSize: 11, color: '#89b4fa', fontWeight: 600, marginBottom: 4 }}>
                      Duration
                    </div>
                    <div style={{ fontSize: 11, color: '#cdd6f4' }}>
                      Started: {activeSnapshot.stepExecution.startedAt}
                      {activeSnapshot.stepExecution.completedAt && (
                        <>
                          <br />
                          Completed: {activeSnapshot.stepExecution.completedAt}
                          {activeSnapshot.stepExecution.durationMs != null && (
                            <>
                              <br />
                              Duration: {activeSnapshot.stepExecution.durationMs}ms
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* LLM details */}
                {activeSnapshot.stepExecution.llm && (
                  <div>
                    <div style={{ fontSize: 11, color: '#89b4fa', fontWeight: 600, marginBottom: 4 }}>
                      LLM Metrics
                    </div>
                    <div style={{ fontSize: 11, color: '#cdd6f4' }}>
                      Tokens in: {activeSnapshot.stepExecution.llm.tokensIn}
                      <br />
                      Tokens out: {activeSnapshot.stepExecution.llm.tokensOut}
                      {activeSnapshot.stepExecution.llm.firstTokenLatencyMs != null && (
                        <>
                          <br />
                          First token latency: {activeSnapshot.stepExecution.llm.firstTokenLatencyMs}ms
                        </>
                      )}
                    </div>
                    {activeSnapshot.stepExecution.llm.response && (
                      <>
                        <div style={{ fontSize: 11, color: '#89b4fa', fontWeight: 600, marginTop: 8, marginBottom: 4 }}>
                          Response Text
                        </div>
                        <div style={promptBoxStyle}>
                          {activeSnapshot.stepExecution.llm.response}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Error details */}
                {activeSnapshot.stepExecution.error && (
                  <div>
                    <div style={{ fontSize: 11, color: '#f38ba8', fontWeight: 600, marginBottom: 4 }}>
                      Error
                    </div>
                    <div style={{ ...promptBoxStyle, borderColor: '#f38ba8', background: '#1a0f14' }}>
                      <div style={{ color: '#f38ba8', fontWeight: 600, marginBottom: 4 }}>
                        {activeSnapshot.stepExecution.error}
                      </div>
                    </div>
                  </div>
                )}

                {/* Approval records */}
                {activeSnapshot.stepExecution.approvals && activeSnapshot.stepExecution.approvals.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, color: '#89b4fa', fontWeight: 600, marginBottom: 4 }}>
                      Approvals ({activeSnapshot.stepExecution.approvals.length})
                    </div>
                    {activeSnapshot.stepExecution.approvals.map((approval, idx) => (
                      <div key={idx} style={{ ...promptBoxStyle, marginBottom: 8 }}>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: 3,
                            fontSize: 10,
                            fontWeight: 600,
                            background: approval.decision === 'approve' ? 'rgba(166, 227, 161, 0.15)' : 'rgba(243, 139, 168, 0.15)',
                            color: approval.decision === 'approve' ? '#a6e3a1' : '#f38ba8'
                          }}>
                            {approval.decision.toUpperCase()}
                          </span>
                          <span style={{ fontSize: 11, color: '#cdd6f4' }}>{approval.userId}</span>
                        </div>
                        {approval.comment && (
                          <div style={{ fontSize: 11, color: '#9399b2', fontStyle: 'italic' }}>
                            "{approval.comment}"
                          </div>
                        )}
                        <div style={{ fontSize: 10, color: '#6c7086', marginTop: 4 }}>
                          {approval.at}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Status */}
                <div>
                  <div style={{ fontSize: 11, color: '#89b4fa', fontWeight: 600, marginBottom: 4 }}>
                    Status
                  </div>
                  <div style={{ fontSize: 11, color: '#cdd6f4' }}>
                    {activeSnapshot.stepExecution.status}
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'attempts' && stepAttempts && stepAttempts.length >= 2 ? (
            <div>
              {/* Pair selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <button
                  type="button"
                  data-testid="attempts-prev"
                  disabled={compareIdx === 0}
                  onClick={() => setCompareIdx((c) => c - 1)}
                  style={{
                    padding: '2px 8px', fontSize: 11, background: 'transparent',
                    border: '1px solid #313244', borderRadius: 3, color: compareIdx === 0 ? '#45475a' : '#cdd6f4',
                    cursor: compareIdx === 0 ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                  }}
                >
                  ←
                </button>
                <span
                  data-testid="attempts-label"
                  style={{ fontSize: 11, color: '#9399b2', flex: 1, textAlign: 'center' }}
                >
                  Attempt {compareIdx + 1} vs {compareIdx + 2} of {stepAttempts.length}
                </span>
                <button
                  type="button"
                  data-testid="attempts-next"
                  disabled={compareIdx >= stepAttempts.length - 2}
                  onClick={() => setCompareIdx((c) => c + 1)}
                  style={{
                    padding: '2px 8px', fontSize: 11, background: 'transparent',
                    border: '1px solid #313244', borderRadius: 3,
                    color: compareIdx >= stepAttempts.length - 2 ? '#45475a' : '#cdd6f4',
                    cursor: compareIdx >= stepAttempts.length - 2 ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  →
                </button>
              </div>
              {/* Two-column diff */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <AttemptCard attempt={stepAttempts[compareIdx]} label={`Attempt ${compareIdx + 1}`} />
                <AttemptCard attempt={stepAttempts[compareIdx + 1]} label={`Attempt ${compareIdx + 2}`} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
