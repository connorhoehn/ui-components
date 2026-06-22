import { PipelineDefinition } from '../../../types/pipeline';
export interface DocumentTypePrerequisite {
    name: string;
    icon: string;
    fields: Array<{
        name: string;
        fieldType: 'text' | 'long_text' | 'number' | 'date' | 'boolean' | 'enum';
        required?: boolean;
        options?: string[];
    }>;
}
export interface PipelineTemplate {
    id: string;
    name: string;
    description: string;
    icon: string;
    tags: string[];
    build(createdBy: string): PipelineDefinition;
    prerequisites?: {
        documentTypes?: DocumentTypePrerequisite[];
    };
}
export declare const pipelineTemplates: PipelineTemplate[];
//# sourceMappingURL=index.d.ts.map