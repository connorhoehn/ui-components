import type { PipelineDefinition } from '../../../types/pipeline';
export interface PipelineIndexEntry {
    id: string;
    name: string;
    status: 'draft' | 'published' | 'archived';
    updatedAt: string;
    icon?: string;
    tags?: string[];
}
export declare function listPipelines(): PipelineIndexEntry[];
export declare function loadPipeline(id: string): PipelineDefinition | null;
export declare function savePipeline(def: PipelineDefinition): void;
export declare function savePipelinePositionsOnly(def: PipelineDefinition): void;
/**
 * Write a definition into the local cache **verbatim** — no version bump, no
 * `updatedAt` re-stamp, no mutation of the argument — and refresh its index
 * entry.
 *
 * This is the write-through path for `pipelineStorageRemote`, where the server
 * owns `version` / `updatedAt`. That module used to reuse `savePipeline` for
 * its cache writes, which meant every *read* (and every publish) incremented
 * the cached version and stamped `updatedAt = now`: opening a pipeline you
 * never edited showed it one version ahead of the server and "just updated" in
 * the list, and a save advanced the version by two.
 */
export declare function cachePipeline(def: PipelineDefinition): void;
export declare function deletePipeline(id: string): void;
export declare function createPipeline(partial: Partial<PipelineDefinition> & {
    name: string;
    createdBy: string;
}): PipelineDefinition;
export declare function createDemoPipeline(createdBy: string): PipelineDefinition;
export declare function publishPipeline(id: string): PipelineDefinition | null;
/**
 * Archive a pipeline (soft-hide). If the pipeline is already archived this
 * acts as an "unarchive" — restoring `'draft'` status. Used by the bulk-action
 * toolbar on the pipelines list page.
 *
 * Distinct from `deletePipeline`: nothing is removed from storage. The caller
 * is responsible for any UI filtering (e.g. hiding archived rows by default).
 */
export declare function archivePipeline(id: string): PipelineDefinition | null;
export declare function duplicatePipeline(id: string, newName?: string): PipelineDefinition | null;
export declare function exportPipelineJSON(id: string): string | null;
export declare function importPipelineJSON(json: string): PipelineDefinition;
//# sourceMappingURL=pipelineStorage.d.ts.map