// src/components/pipelines/nodes/scatter/ScatterPathPicker.tsx
//
// Schema-aware itemsPath picker for the Scatter node config panel.
//
// When the upstream node kind is known, this component fetches the output
// schema for that node from GET /api/pipeline/output-schemas (platform-api)
// and renders a clickable tree of paths so users never have to type a raw
// JSONPath expression. Clicking a path sets it as the itemsPath value.
//
// Falls back to a plain <JsonPathInput> when:
//   - upstreamKind is absent (no upstream connected)
//   - the API returns null for that kind (dynamic schema, e.g. vision-classify)
//   - the fetch fails
//
// The upstreamSchema prop lets callers (e.g. ScatterConfig with a classify
// node) inject a dynamically-synthesised schema without an API round-trip.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../../../lib/cn';
import { JsonPathInput } from '../../../forms/JsonPathInput';
import { schemaToJsonPaths, type SchemaPath, type JSONSchema } from '../../lib/schemaToJsonPaths';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScatterPathPickerProps {
  /** The currently selected itemsPath string. */
  value: string;
  /** Called when the user picks or edits a path. */
  onChange: (path: string) => void;
  /**
   * The upstream node's kind, e.g. 'image:vision-analyze'. When provided the
   * picker fetches the corresponding output schema from the output-schemas API.
   */
  upstreamKind?: string;
  /**
   * Optional override: supply the schema directly (bypasses the API fetch).
   * Use this for node kinds whose schema is synthesised client-side from
   * node.data (e.g. image:vision-classify with labels: string[]).
   */
  upstreamSchema?: Record<string, unknown> | null;
}

// ---------------------------------------------------------------------------
// API helper
// ---------------------------------------------------------------------------

interface OutputSchemasResponse {
  schemas: Record<string, Record<string, unknown> | null>;
}

function schemasUrl(): string {
  const base =
    (typeof import.meta !== 'undefined' &&
      (import.meta as { env?: Record<string, string> }).env?.VITE_SOCIAL_API_URL) ??
    '';
  return `${base}/api/pipeline/output-schemas`;
}

// Simple module-level cache so multiple picker instances share one fetch.
let cachedSchemas: OutputSchemasResponse | null = null;
let fetchPromise: Promise<OutputSchemasResponse> | null = null;

/** Exposed for test isolation — resets the module-level fetch cache. */
export function _resetOutputSchemasCache(): void {
  cachedSchemas = null;
  fetchPromise = null;
}

async function fetchOutputSchemas(): Promise<OutputSchemasResponse> {
  if (cachedSchemas) return cachedSchemas;
  if (!fetchPromise) {
    fetchPromise = fetch(schemasUrl())
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<OutputSchemasResponse>;
      })
      .then((data) => {
        cachedSchemas = data;
        fetchPromise = null;
        return data;
      })
      .catch((err) => {
        fetchPromise = null;
        throw err;
      });
  }
  return fetchPromise;
}

// ---------------------------------------------------------------------------
// Kind chip
// ---------------------------------------------------------------------------

const KIND_CHIP_CLASSES: Record<SchemaPath['kind'], string> = {
  array:   'bg-primary-bg text-primary-fg border-primary-border',
  object:  'bg-surface-panel text-text-secondary border-border',
  string:  'bg-success-bg text-success-fg border-success-border',
  number:  'bg-warning-bg text-warning-fg border-warning-border',
  boolean: 'bg-pink-50 text-pink-700 border-pink-200',
  unknown: 'bg-surface-panel text-text-tertiary border-border',
};

function KindChip({ kind }: { kind: SchemaPath['kind'] }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4',
        KIND_CHIP_CLASSES[kind],
      )}
    >
      {kind}
    </span>
  );
}

// ---------------------------------------------------------------------------
// PathRow
// ---------------------------------------------------------------------------

interface PathRowProps {
  entry: SchemaPath;
  isSelected: boolean;
  onPick: (path: string) => void;
}

function PathRow({ entry, isSelected, onPick }: PathRowProps) {
  return (
    <button
      type="button"
      onClick={() => onPick(entry.path)}
      aria-pressed={isSelected}
      data-testid={`path-row-${entry.path}`}
      className={cn(
        'w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors duration-100',
        'hover:bg-surface-panel focus:outline-none focus:ring-2 focus:ring-primary/50',
        isSelected && 'bg-primary-bg ring-1 ring-inset ring-primary',
        entry.isArrayItems && !isSelected && 'hover:bg-primary-bg',
      )}
      style={{ paddingLeft: `${8 + entry.depth * 12}px` }}
    >
      <span
        className={cn(
          'flex-1 font-mono text-[12px] leading-5 truncate',
          entry.isArrayItems ? 'text-primary-fg font-semibold' : 'text-text-primary',
        )}
      >
        {entry.path}
      </span>
      <KindChip kind={entry.kind} />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

type FetchState = 'idle' | 'loading' | 'done' | 'error';

export function ScatterPathPicker({
  value,
  onChange,
  upstreamKind,
  upstreamSchema,
}: ScatterPathPickerProps) {
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [fetchedSchema, setFetchedSchema] = useState<Record<string, unknown> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // When upstreamSchema is provided directly, skip the fetch entirely.
  const effectiveSchema: Record<string, unknown> | null = useMemo(() => {
    if (upstreamSchema !== undefined) return upstreamSchema;
    return fetchedSchema;
  }, [upstreamSchema, fetchedSchema]);

  // Fetch schemas from API when upstreamKind is present and upstreamSchema
  // override is not supplied.
  useEffect(() => {
    if (!upstreamKind || upstreamSchema !== undefined) return;

    setFetchState('loading');
    fetchOutputSchemas()
      .then((data) => {
        if (!mountedRef.current) return;
        const schema = data.schemas[upstreamKind] ?? null;
        setFetchedSchema(schema);
        setFetchState('done');
      })
      .catch(() => {
        if (!mountedRef.current) return;
        setFetchState('error');
      });
  }, [upstreamKind, upstreamSchema]);

  const paths = useMemo(
    () => schemaToJsonPaths(effectiveSchema as JSONSchema | null),
    [effectiveSchema],
  );

  const hasSchema = effectiveSchema !== null && paths.length > 0;

  const handlePick = useCallback(
    (path: string) => { onChange(path); },
    [onChange],
  );

  // No upstream kind at all → plain input only.
  if (!upstreamKind && upstreamSchema === undefined) {
    return (
      <JsonPathInput
        value={value}
        onChange={onChange}
        enforcePrefix
        data-testid="scatter-path-plain-input"
      />
    );
  }

  // We have a kind but no schema (either loading, errored, or API returned null).
  if (!hasSchema) {
    return (
      <div className="flex flex-col gap-1.5">
        {fetchState === 'loading' && (
          <p className="text-[11px] text-text-tertiary leading-4">
            Loading schema for {upstreamKind}…
          </p>
        )}
        {fetchState === 'error' && (
          <p className="text-[11px] text-warning-fg leading-4">
            Could not load schema — enter path manually.
          </p>
        )}
        {(fetchState === 'done' || upstreamSchema === null) && (
          <p className="text-[11px] text-text-tertiary leading-4">
            Schema unavailable for <span className="font-mono">{upstreamKind}</span> — enter path manually.
          </p>
        )}
        <JsonPathInput
          value={value}
          onChange={onChange}
          enforcePrefix
          data-testid="scatter-path-fallback-input"
        />
      </div>
    );
  }

  // We have paths — render the tree picker with the input below it.
  const arrayPaths = paths.filter((p) => p.isArrayItems);
  const hasMixedPaths = arrayPaths.length < paths.length;

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] text-neutral leading-4">
        Click a path to set itemsPath.
        {hasMixedPaths && (
          <>
            {' '}
            <span className="text-primary-fg font-semibold">Indigo</span>
            {' '}paths are arrays — valid scatter sources.
          </>
        )}
      </p>

      {/* Was role="listbox" with plain <button> children — ARIA requires
          `option` children, so screen readers reported an empty list box and
          the promised arrow-key navigation did not exist. These really are
          buttons, so the honest shape is a labelled group whose members
          expose their selected state. */}
      <div
        className="flex flex-col gap-px border border-border rounded-md bg-white max-h-48 overflow-y-auto"
        data-testid="scatter-path-tree"
        role="group"
        aria-label="Available output paths"
      >
        {paths.map((entry) => (
          <PathRow
            key={entry.path}
            entry={entry}
            isSelected={value === entry.path}
            onPick={handlePick}
          />
        ))}
      </div>

      <JsonPathInput
        value={value}
        onChange={onChange}
        enforcePrefix
        data-testid="scatter-path-input"
        placeholder="$.path selected above or type manually"
      />
    </div>
  );
}

export default ScatterPathPicker;
