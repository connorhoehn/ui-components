import type { DocumentTypePrerequisite } from './index';
interface ScaffoldResult {
    createdTypes: string[];
    errors: string[];
}
export declare function scaffoldPrerequisites(prerequisites: {
    documentTypes?: DocumentTypePrerequisite[];
} | undefined): Promise<ScaffoldResult>;
export {};
//# sourceMappingURL=scaffoldPrerequisites.d.ts.map