import type { PipelineDefinition } from '../../../types/pipeline';
import { type PipelineIndexEntry } from './pipelineStorage';
export declare function listPipelinesRemote(): Promise<PipelineIndexEntry[]>;
export declare function loadPipelineRemote(id: string): Promise<PipelineDefinition | null>;
export declare function savePipelineRemote(def: PipelineDefinition): Promise<PipelineDefinition>;
export declare function deletePipelineRemote(id: string): Promise<void>;
export declare function publishPipelineRemote(id: string): Promise<PipelineDefinition | null>;
export declare function listPipelines(): Promise<PipelineIndexEntry[]>;
export declare function loadPipeline(id: string): Promise<PipelineDefinition | null>;
export declare function savePipeline(def: PipelineDefinition): Promise<PipelineDefinition>;
export declare function deletePipeline(id: string): Promise<void>;
export declare function publishPipeline(id: string): Promise<PipelineDefinition | null>;
export declare function createPipeline(partial: Partial<PipelineDefinition> & {
    name: string;
    createdBy: string;
}): Promise<PipelineDefinition>;
//# sourceMappingURL=pipelineStorageRemote.d.ts.map