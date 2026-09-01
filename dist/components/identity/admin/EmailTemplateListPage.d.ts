export interface EmailTemplateListPageProps {
    templates: Array<{
        templateId: string;
        name: string;
        subject: string;
    }>;
    onCreateTemplate: () => void;
    onEditTemplate: (templateId: string) => void;
    onDeleteTemplate: (templateId: string) => Promise<void>;
    onTestSend: (templateId: string, email: string) => Promise<void>;
    loading?: boolean;
}
export declare function EmailTemplateListPage({ templates, onCreateTemplate, onEditTemplate, onDeleteTemplate, onTestSend, loading, }: EmailTemplateListPageProps): import("react").JSX.Element;
//# sourceMappingURL=EmailTemplateListPage.d.ts.map