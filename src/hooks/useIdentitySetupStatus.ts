import { useIdentityResource } from './useIdentityResource';
import type { SetupStatus } from '../types/identity';

export interface UseIdentitySetupStatusReturn {
  status: SetupStatus | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useIdentitySetupStatus(): UseIdentitySetupStatusReturn {
  const { data: status, loading, error, refresh } =
    useIdentityResource<SetupStatus | null>(null, { url: '/api/admin/setup-status' });

  return { status, loading, error, refresh };
}
