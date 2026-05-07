// Identity MFA hook — user-facing MFA device management.

import { useState, useCallback } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import { apiFetch } from './identityApi';
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
  const { idToken } = useIdentityContext();
  const [devices, setDevices] = useState<MfaDevice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (poolId: string, userId: string) => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<MfaDevice[]>(
        `/api/pools/${poolId}/users/${userId}/mfa/devices`,
        idToken,
      );
      setDevices(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const setupDevice = useCallback(async (
    poolId: string,
    userId: string,
    deviceName: string,
  ): Promise<MfaSetupResult | null> => {
    if (!idToken) return null;
    setLoading(true);
    setError(null);
    try {
      const result = await apiFetch<MfaSetupResult>(
        `/api/pools/${poolId}/users/${userId}/mfa/setup`,
        idToken,
        {
          method: 'POST',
          body: JSON.stringify({ deviceName }),
        },
      );
      return result;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const verifySetup = useCallback(async (
    poolId: string,
    userId: string,
    deviceId: string,
    code: string,
  ): Promise<boolean> => {
    if (!idToken) return false;
    setError(null);
    try {
      await apiFetch<void>(
        `/api/pools/${poolId}/users/${userId}/mfa/verify`,
        idToken,
        {
          method: 'POST',
          body: JSON.stringify({ deviceId, code }),
        },
      );
      setDevices((prev) =>
        prev.map((d) => (d.deviceId === deviceId ? { ...d, isVerified: true } : d)),
      );
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    }
  }, [idToken]);

  const renameDevice = useCallback(async (
    poolId: string,
    userId: string,
    deviceId: string,
    newName: string,
  ): Promise<void> => {
    if (!idToken) return;
    setError(null);
    try {
      await apiFetch<void>(
        `/api/pools/${poolId}/users/${userId}/mfa/devices/${deviceId}`,
        idToken,
        {
          method: 'PUT',
          body: JSON.stringify({ deviceName: newName }),
        },
      );
      setDevices((prev) =>
        prev.map((d) => (d.deviceId === deviceId ? { ...d, deviceName: newName } : d)),
      );
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken]);

  const removeDevice = useCallback(async (
    poolId: string,
    userId: string,
    deviceId: string,
  ): Promise<void> => {
    if (!idToken) return;
    setError(null);
    try {
      await apiFetch<void>(
        `/api/pools/${poolId}/users/${userId}/mfa/devices/${deviceId}`,
        idToken,
        { method: 'DELETE' },
      );
      setDevices((prev) => prev.filter((d) => d.deviceId !== deviceId));
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken]);

  return { devices, loading, error, setupDevice, verifySetup, renameDevice, removeDevice, refresh };
}
