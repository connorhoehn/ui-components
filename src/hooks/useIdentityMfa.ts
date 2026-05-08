import { useCallback } from 'react';
import { useIdentityResource } from './useIdentityResource';
import type { MfaDevice, MfaSetupResult } from '../types/identity';

export interface UseIdentityMfaReturn {
  devices: MfaDevice[];
  loading: boolean;
  error: string | null;
  setupDevice: (poolId: string, userId: string, deviceName: string) => Promise<MfaSetupResult | null>;
  verifySetup: (poolId: string, userId: string, deviceId: string, code: string) => Promise<boolean>;
  renameDevice: (poolId: string, userId: string, deviceId: string, newName: string) => Promise<void>;
  removeDevice: (poolId: string, userId: string, deviceId: string) => Promise<void>;
  refresh: (poolId: string, userId: string) => Promise<void>;
}

export function useIdentityMfa(): UseIdentityMfaReturn {
  const { data: devices, loading, error, setData: setDevices, mutate } =
    useIdentityResource<MfaDevice[]>([], { url: null, fetchOnMount: false });

  const refresh = useCallback(async (poolId: string, userId: string) => {
    const result = await mutate<MfaDevice[]>(`/api/pools/${poolId}/users/${userId}/mfa/devices`, {
      method: 'GET',
    });
    if (result) setDevices(result);
  }, [mutate, setDevices]);

  const setupDevice = useCallback(async (
    poolId: string,
    userId: string,
    deviceName: string,
  ): Promise<MfaSetupResult | null> => {
    return await mutate<MfaSetupResult>(
      `/api/pools/${poolId}/users/${userId}/mfa/setup`,
      { method: 'POST', body: JSON.stringify({ deviceName }) },
    );
  }, [mutate]);

  const verifySetup = useCallback(async (
    poolId: string,
    userId: string,
    deviceId: string,
    code: string,
  ): Promise<boolean> => {
    const result = await mutate<void>(
      `/api/pools/${poolId}/users/${userId}/mfa/verify`,
      { method: 'POST', body: JSON.stringify({ deviceId, code }) },
    );
    if (result !== null) {
      setDevices((prev) =>
        prev.map((d) => (d.deviceId === deviceId ? { ...d, isVerified: true } : d)),
      );
      return true;
    }
    return false;
  }, [mutate, setDevices]);

  const renameDevice = useCallback(async (
    poolId: string,
    userId: string,
    deviceId: string,
    newName: string,
  ): Promise<void> => {
    const result = await mutate<void>(
      `/api/pools/${poolId}/users/${userId}/mfa/devices/${deviceId}`,
      { method: 'PUT', body: JSON.stringify({ deviceName: newName }) },
    );
    if (result !== null) {
      setDevices((prev) =>
        prev.map((d) => (d.deviceId === deviceId ? { ...d, deviceName: newName } : d)),
      );
    }
  }, [mutate, setDevices]);

  const removeDevice = useCallback(async (
    poolId: string,
    userId: string,
    deviceId: string,
  ): Promise<void> => {
    const result = await mutate<void>(
      `/api/pools/${poolId}/users/${userId}/mfa/devices/${deviceId}`,
      { method: 'DELETE' },
    );
    if (result !== null) {
      setDevices((prev) => prev.filter((d) => d.deviceId !== deviceId));
    }
  }, [mutate, setDevices]);

  return { devices, loading, error, setupDevice, verifySetup, renameDevice, removeDevice, refresh };
}
