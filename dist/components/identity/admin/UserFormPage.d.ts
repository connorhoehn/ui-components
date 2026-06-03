export interface UserFormPageProps {
    user?: {
        userId?: string;
        email: string;
        givenName?: string;
        familyName?: string;
        nickname?: string;
        picture?: string;
        website?: string;
        customAttributes?: Record<string, unknown>;
    };
    isEdit: boolean;
    poolId: string;
    customAttributeDefinitions?: Record<string, string>;
    onSubmit: (data: {
        email: string;
        givenName?: string;
        familyName?: string;
        nickname?: string;
        picture?: string;
        website?: string;
        customAttributes?: Record<string, unknown>;
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}
export declare function UserFormPage({ user, isEdit, customAttributeDefinitions, onSubmit, onCancel, error, }: UserFormPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=UserFormPage.d.ts.map