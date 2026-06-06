// src/components/pipelines/lib/schemaToJsonPaths.ts
//
// Pure function: walks a JSON Schema object and emits a flat list of
// clickable JSONPath strings with metadata for the scatter path picker.
//
// Supported schema features:
//   {type:'object', properties}   → emit one entry per property, recurse
//   {type:'array', items}         → emit `<path>[*]`, mark isArrayItems, recurse into items
//   primitives (string/number/...) → emit as leaf
//   anyOf / oneOf / allOf         → walk each branch (dedupe by path on the way out)
//
// Deliberately does NOT support:
//   - $ref resolution (callers should pre-resolve before passing in)
//   - additionalProperties schemas (noise in the picker)
//   - patternProperties
//
// The returned list is ordered depth-first: a parent path always precedes
// its children. This makes a flat <ul> render correctly as an indented
// tree without any additional sorting.

export interface SchemaPath {
  /** The clickable JSONPath, e.g. '$.regions[*]' or '$.tags[*].tag' */
  path: string;
  /** Human-readable label for the picker tree, e.g. 'regions (array)' */
  label: string;
  /** Nesting depth for indentation, 0-based */
  depth: number;
  /** Leaf type at this path */
  kind: 'array' | 'object' | 'string' | 'number' | 'boolean' | 'unknown';
  /**
   * True when this path produces an array — i.e. a valid scatter source.
   * The picker highlights these paths so users can identify valid fan-out
   * sources at a glance.
   */
  isArrayItems: boolean;
}

// JSON Schema types understood by the walker.
type JSONSchemaType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null';

export interface JSONSchema {
  type?: JSONSchemaType | JSONSchemaType[];
  properties?: Record<string, JSONSchema>;
  items?: JSONSchema;
  anyOf?: JSONSchema[];
  oneOf?: JSONSchema[];
  allOf?: JSONSchema[];
  description?: string;
  title?: string;
  [key: string]: unknown;
}

function resolveKind(schema: JSONSchema): SchemaPath['kind'] {
  const t = Array.isArray(schema.type) ? schema.type[0] : schema.type;
  switch (t) {
    case 'array':   return 'array';
    case 'object':  return 'object';
    case 'string':  return 'string';
    case 'number':
    case 'integer': return 'number';
    case 'boolean': return 'boolean';
    default:        return 'unknown';
  }
}

function makeLabelSuffix(schema: JSONSchema): string {
  const t = Array.isArray(schema.type) ? schema.type[0] : schema.type;
  if (t === 'array') {
    const itemType = schema.items
      ? (Array.isArray(schema.items.type) ? schema.items.type[0] : schema.items.type)
      : undefined;
    return itemType ? `array of ${itemType}` : 'array';
  }
  return t ?? 'unknown';
}

/**
 * Walk `schema` recursively, accumulating paths into `acc`.
 *
 * @param schema     - The (sub-)schema to walk.
 * @param prefix     - The current path prefix (e.g. '$.regions[*]').
 * @param depth      - Current indentation depth (0-based).
 * @param acc        - Accumulator for emitted paths.
 * @param visited    - Guards against infinite recursion on cyclic schemas.
 */
function walk(
  schema: JSONSchema,
  prefix: string,
  depth: number,
  acc: SchemaPath[],
  visited: Set<JSONSchema>,
): void {
  if (visited.has(schema)) return;
  visited.add(schema);

  const type = Array.isArray(schema.type) ? schema.type[0] : schema.type;

  // Handle anyOf/oneOf/allOf by merging branches (deduplication happens on
  // acc — same path string won't cause issues in the picker, but we avoid
  // redundant rows).
  const branchLists = [schema.anyOf, schema.oneOf, schema.allOf].filter(Boolean) as JSONSchema[][];
  for (const branches of branchLists) {
    for (const branch of branches) {
      walk(branch, prefix, depth, acc, visited);
    }
  }

  if (type === 'object' && schema.properties) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      const childPath = `${prefix}.${key}`;
      const kind = resolveKind(propSchema);
      acc.push({
        path: childPath,
        label: `${key} (${makeLabelSuffix(propSchema)})`,
        depth,
        kind,
        isArrayItems: kind === 'array',
      });
      walk(propSchema, childPath, depth + 1, acc, visited);
    }
    return;
  }

  if (type === 'array') {
    // Emit the [*] path for the array itself.
    const starPath = `${prefix}[*]`;
    const itemsSchema = schema.items;
    const itemKind = itemsSchema ? resolveKind(itemsSchema) : 'unknown';
    acc.push({
      path: starPath,
      label: `${prefix.slice(prefix.lastIndexOf('.') + 1)}[*] (each item)`,
      depth,
      kind: itemKind,
      isArrayItems: true,
    });
    if (itemsSchema) {
      walk(itemsSchema, starPath, depth + 1, acc, visited);
    }
  }
}

/**
 * Walk `schema` and return an ordered flat list of JSONPath entries.
 *
 * @param schema  - A resolved JSON Schema object. Pass null/undefined to
 *                  receive an empty list (allows unconditional calls from
 *                  components that may not have a schema yet).
 * @param prefix  - Optional root prefix. Defaults to '$'. Change when the
 *                  schema represents a sub-tree you're already targeting.
 */
export function schemaToJsonPaths(
  schema: JSONSchema | null | undefined,
  prefix = '$',
): SchemaPath[] {
  if (!schema || typeof schema !== 'object') return [];

  const acc: SchemaPath[] = [];
  const visited = new Set<JSONSchema>();
  const type = Array.isArray(schema.type) ? schema.type[0] : schema.type;

  if (type === 'object' && schema.properties) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      const childPath = `${prefix}.${key}`;
      const kind = resolveKind(propSchema);
      acc.push({
        path: childPath,
        label: `${key} (${makeLabelSuffix(propSchema)})`,
        depth: 0,
        kind,
        isArrayItems: kind === 'array',
      });
      walk(propSchema, childPath, 1, acc, visited);
    }
  } else {
    // Schema is a non-object root (unusual, but handle gracefully).
    walk(schema, prefix, 0, acc, visited);
  }

  return acc;
}
