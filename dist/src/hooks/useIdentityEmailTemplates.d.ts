import { EmailTemplate, CreateEmailTemplateInput, UpdateEmailTemplateInput } from '../types/identity';
export interface UseIdentityEmailTemplatesReturn {
    templates: EmailTemplate[];
    loading: boolean;
    error: string | null;
    createTemplate: (input: CreateEmailTemplateInput) => Promise<EmailTemplate | null>;
    updateTemplate: (templateId: string, input: UpdateEmailTemplateInput) => Promise<EmailTemplate | null>;
    deleteTemplate: (templateId: string) => Promise<void>;
    testSend: (templateId: string, recipientEmail: string) => Promise<void>;
    refresh: () => Promise<void>;
}
export declare function useIdentityEmailTemplates(): UseIdentityEmailTemplatesReturn;
//# sourceMappingURL=useIdentityEmailTemplates.d.ts.map