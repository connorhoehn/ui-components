export interface UseIdentityResourceOptions {
    url: string | null;
    fetchOnMount?: boolean;
}
export interface UseIdentityResourceReturn<T> {
    data: T;
    loading: boolean;
    error: string | null;
    setData: React.Dispatch<React.SetStateAction<T>>;
    refresh: () => Promise<void>;
    mutate: <R>(url: string, options?: RequestInit) => Promise<R | null>;
}
export declare function useIdentityResource<T>(initialData: T, opts: UseIdentityResourceOptions): UseIdentityResourceReturn<T>;
//# sourceMappingURL=useIdentityResource.d.ts.map