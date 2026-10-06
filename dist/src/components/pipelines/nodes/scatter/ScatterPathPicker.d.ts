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
/** Exposed for test isolation — resets the module-level fetch cache. */
export declare function _resetOutputSchemasCache(): void;
export declare function ScatterPathPicker({ value, onChange, upstreamKind, upstreamSchema, }: ScatterPathPickerProps): import("react").JSX.Element;
export default ScatterPathPicker;
//# sourceMappingURL=ScatterPathPicker.d.ts.map