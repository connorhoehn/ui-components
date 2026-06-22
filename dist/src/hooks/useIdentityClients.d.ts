import { IdentityClient, CreateClientInput, UpdateClientInput, CreateClientWithPoolInput } from '../types/identity';
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
export declare function useIdentityClients(): UseIdentityClientsReturn;
//# sourceMappingURL=useIdentityClients.d.ts.map