import { type PipelineIndexEntry } from './persistence/pipelineStorage';
import type { TriggerBinding } from '../../types/pipeline';
export type StatusKey = 'draft' | 'published' | 'archived';
export declare const STATUS_KEYS: readonly StatusKey[];
/**
 * Parse the `?status=` param into a Set. Unknown values are dropped silently.
 * Empty or missing param -> `null`, signaling the caller should fall back to
 * `DEFAULT_STATUS_KEYS`.
 */
export declare function parseStatusParam(raw: string | null): Set<StatusKey> | null;
export interface PipelineRow extends PipelineIndexEntry {
    version: number;
    publishedVersion?: number;
    nodeCount: number;
    triggerBinding?: TriggerBinding;
    createdAt: string;
    icon: string;
    tags: string[];
}
export default function PipelinesPage(): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PipelinesPage.d.ts.map