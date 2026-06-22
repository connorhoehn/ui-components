export interface MemoryEntry {
    id: string;
    scope: 'session' | 'long-term';
    namespace?: string;
    key: string;
    value: string;
    createdAt: string;
    updatedAt?: string;
    ttl?: number;
}
interface MemoryInspectorProps {
    entries: MemoryEntry[];
    className?: string;
    onDelete?: (id: string) => void;
}
export declare function MemoryInspector({ entries, className, onDelete }: MemoryInspectorProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=MemoryInspector.d.ts.map