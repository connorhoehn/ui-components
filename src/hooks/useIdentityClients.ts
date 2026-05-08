import { useCallback } from 'react';
import { useIdentityResource } from './useIdentityResource';
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
  const { data: clients, loading, error, setData: setClients, refresh, mutate } =
    useIdentityResource<IdentityClient[]>([], { url: '/api/clients' });

  const createClient = useCallback(async (input: CreateClientInput): Promise<IdentityClient | null> => {
    const client = await mutate<IdentityClient>('/api/clients', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    if (client) setClients((prev) => [...prev, client]);
    return client;
  }, [mutate, setClients]);

  const updateClient = useCallback(async (clientId: string, input: UpdateClientInput): Promise<IdentityClient | null> => {
    const client = await mutate<IdentityClient>(`/api/clients/${clientId}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });
    if (client) setClients((prev) => prev.map((c) => (c.clientId === clientId ? client : c)));
    return client;
  }, [mutate, setClients]);

  const deleteClient = useCallback(async (clientId: string): Promise<void> => {
    const result = await mutate<void>(`/api/clients/${clientId}`, { method: 'DELETE' });
    if (result !== null) setClients((prev) => prev.filter((c) => c.clientId !== clientId));
  }, [mutate, setClients]);

  const createWithPool = useCallback(async (input: CreateClientWithPoolInput): Promise<IdentityClient | null> => {
    const client = await mutate<IdentityClient>('/api/clients/with-pool', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    if (client) setClients((prev) => [...prev, client]);
    return client;
  }, [mutate, setClients]);

  return { clients, loading, error, createClient, updateClient, deleteClient, createWithPool, refresh };
}
