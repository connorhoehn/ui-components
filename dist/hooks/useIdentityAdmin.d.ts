export interface UseIdentityAdminReturn {
    authenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
}
export declare function useIdentityAdmin(): UseIdentityAdminReturn;
//# sourceMappingURL=useIdentityAdmin.d.ts.map