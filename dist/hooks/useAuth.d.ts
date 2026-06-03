export interface AuthState {
    status: 'loading' | 'unauthenticated' | 'authenticated';
    idToken: string | null;
    email: string | null;
    error: string | null;
}
export interface UseAuthReturn extends AuthState {
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => void;
}
export declare function useAuth(): UseAuthReturn;
//# sourceMappingURL=useAuth.d.ts.map