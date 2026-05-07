// Identity clients hook — CRUD OAuth clients.

import { useState, useEffect, useCallback } from 'react';
import { useIdentityContext } from '../contexts/IdentityContext';
import { apiFetch } from './identityApi';
import type {
  IdentityClient,
  CreateClientInput,
  UpdateClientInput,
  CreateClientWithPoolInput,
} from '../types/identity';

export interface UseIdentityClientsReturn {
  clients: IdentityClient[];
  loading: boolean;
  error: string | null;
  createClient: (input: CreateClientInput) => Promise<IdentityClient | null>;
  updateClient: (clientId: string, input: UpdateClientInput) => Promise<IdentityClient | null>;
  deleteClient: (clientId: string) => Promise<void>;
  createWithPool: (input: CreateClientWithPoolInput) => Promise<IdentityClient | null>;
  refresh: () => Promise<void>;
}

export function useIdentityClients(): UseIdentityClientsReturn {
  const { idToken } = useIdentityContext();
  const [clients, setClients] = useState<IdentityClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<IdentityClient[]>('/api/clients', idToken);
      setClients(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const createClient = useCallback(async (input: CreateClientInput): Promise<IdentityClient | null> => {
    if (!idToken) return null;
    setLoading(true);
    setError(null);
    try {
      const client = await apiFetch<IdentityClient>('/api/clients', idToken, {
        method: 'POST',
        body: JSON.stringify(input),
      });
      setClients((prev) => [...prev, client]);
      return client;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const updateClient = useCallback(async (clientId: string, input: UpdateClientInput): Promise<IdentityClient | null> => {
    if (!idToken) return null;
    setLoading(true);
    setError(null);
    try {
      const client = await apiFetch<IdentityClient>(`/api/clients/${clientId}`, idToken, {
        method: 'PUT',
        body: JSON.stringify(input),
      });
      setClients((prev) => prev.map((c) => (c.clientId === clientId ? client : c)));
      return client;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const deleteClient = useCallback(async (clientId: string): Promise<void> => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      await apiFetch<void>(`/api/clients/${clientId}`, idToken, { method: 'DELETE' });
      setClients((prev) => prev.filter((c) => c.clientId !== clientId));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  const createWithPool = useCallback(async (input: CreateClientWithPoolInput): Promise<IdentityClient | null> => {
    if (!idToken) return null;
    setLoading(true);
    setError(null);
    try {
      const client = await apiFetch<IdentityClient>('/api/clients/with-pool', idToken, {
        method: 'POST',
        body: JSON.stringify(input),
      });
      setClients((prev) => [...prev, client]);
      return client;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  return { clients, loading, error, createClient, updateClient, deleteClient, createWithPool, refresh: fetchClients };
}
