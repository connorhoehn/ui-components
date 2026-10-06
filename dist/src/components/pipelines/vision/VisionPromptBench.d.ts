export interface VisionPromptBenchProps {
    /** Pre-populated from the node config; user can edit + try. */
    systemPrompt: string;
    userPrompt: string;
    outputSchema?: Record<string, unknown>;
    model?: string;
    /** Save bench-tested values back to node.data. */
    onSave: (values: {
        systemPrompt: string;
        userPrompt: string;
        outputSchema?: Record<string, unknown>;
    }) => void;
    /** Base URL for platform-api calls. Defaults to '' (same origin). */
    apiBase?: string;
}
export default function VisionPromptBench({ systemPrompt: initSystem, userPrompt: initUser, outputSchema: initSchema, model: initModel, onSave, apiBase, }: VisionPromptBenchProps): import("react").JSX.Element;
//# sourceMappingURL=VisionPromptBench.d.ts.map