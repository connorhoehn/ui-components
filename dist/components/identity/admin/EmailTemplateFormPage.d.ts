export interface EmailTemplateFormPageProps {
    template?: {
        templateId?: string;
        name: string;
        subject: string;
        htmlBody: string;
        textBody: string;
        variables: string[];
    };
    isEdit: boolean;
    onSubmit: (data: {
        name: string;
        subject: string;
        htmlBody: string;
        textBody: string;
        variables: string[];
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}
export declare function EmailTemplateFormPage({ template, isEdit, onSubmit, onCancel, error, }: EmailTemplateFormPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EmailTemplateFormPage.d.ts.map