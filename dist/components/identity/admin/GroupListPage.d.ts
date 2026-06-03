export interface GroupListPageProps {
    groups: Array<{
        groupId: string;
        groupName: string;
        description?: string;
        permissions: string[];
    }>;
    poolId: string;
    poolName: string;
    onCreateGroup: () => void;
    onEditGroup: (groupId: string) => void;
    onDeleteGroup: (groupId: string) => Promise<void>;
    loading?: boolean;
}
export declare function GroupListPage({ groups, poolName, onCreateGroup, onEditGroup, onDeleteGroup, loading, }: GroupListPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=GroupListPage.d.ts.map