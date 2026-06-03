import type { DiagnosticsInfo, RateInfo, DlqEntry } from '../types/identity';
export interface UseIdentityDiagnosticsReturn {
    diagnostics: DiagnosticsInfo | null;
    rates: RateInfo | null;
    dlq: DlqEntry[];
    loading: boolean;
    error: string | null;
    redriveDlq: (id: string) => Promise<void>;
    purgeDlq: (id: string) => Promise<void>;
    refresh: () => Promise<void>;
}
export declare function useIdentityDiagnostics(): UseIdentityDiagnosticsReturn;
//# sourceMappingURL=useIdentityDiagnostics.d.ts.map