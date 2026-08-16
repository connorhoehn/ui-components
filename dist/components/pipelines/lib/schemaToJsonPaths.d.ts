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
type JSONSchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'array' | 'null';
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
/**
 * Walk `schema` and return an ordered flat list of JSONPath entries.
 *
 * @param schema  - A resolved JSON Schema object. Pass null/undefined to
 *                  receive an empty list (allows unconditional calls from
 *                  components that may not have a schema yet).
 * @param prefix  - Optional root prefix. Defaults to '$'. Change when the
 *                  schema represents a sub-tree you're already targeting.
 */
export declare function schemaToJsonPaths(schema: JSONSchema | null | undefined, prefix?: string): SchemaPath[];
export {};
//# sourceMappingURL=schemaToJsonPaths.d.ts.map