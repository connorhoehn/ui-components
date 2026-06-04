export interface GroupFormPageProps {
    group?: {
        groupId?: string;
        groupName: string;
        description?: string;
        permissions: string[];
    };
    isEdit: boolean;
    poolId: string;
    members?: Array<{
        userId: string;
        email: string;
    }>;
    availableUsers?: Array<{
        userId: string;
        email: string;
    }>;
    onSubmit: (data: {
        groupName: string;
        description: string;
        permissions: string[];
    }) => Promise<void>;
    onAddMember?: (userId: string) => Promise<void>;
    onRemoveMember?: (userId: string) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}
export declare function GroupFormPage({ group, isEdit, members, availableUsers, onSubmit, onAddMember, onRemoveMember, onCancel, error, }: GroupFormPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=GroupFormPage.d.ts.map