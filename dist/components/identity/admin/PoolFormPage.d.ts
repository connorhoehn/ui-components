import type { PoolSettings } from '../../../types/identity';
export interface PoolFormPageProps {
    pool?: {
        poolId?: string;
        poolName: string;
        customAttributes: Record<string, string>;
        settings: PoolSettings;
    };
    isEdit: boolean;
    onSubmit: (data: {
        poolName: string;
        customAttributes: Record<string, string>;
        settings: PoolSettings;
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}
export declare function PoolFormPage({ pool, isEdit, onSubmit, onCancel, error }: PoolFormPageProps): import("react").JSX.Element;
//# sourceMappingURL=PoolFormPage.d.ts.map