export interface UserListPageProps {
    users: Array<{
        userId: string;
        email: string;
        givenName?: string;
        familyName?: string;
        status: string;
        createdAt: string;
    }>;
    poolId: string;
    poolName: string;
    onCreateUser: () => void;
    onEditUser: (userId: string) => void;
    onDeleteUser: (userId: string) => Promise<void>;
    loading?: boolean;
}
export declare function UserListPage({ users, poolName, onCreateUser, onEditUser, onDeleteUser, loading, }: UserListPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=UserListPage.d.ts.map