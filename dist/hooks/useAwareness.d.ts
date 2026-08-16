import type { GatewayProvider } from '../providers/GatewayProvider';
import type { AwarenessUpdaters } from './useAwarenessState';
import type { Participant, ViewMode } from '../types/document';
export interface UseAwarenessOptions {
    userId: string;
    displayName: string;
    color: string;
    mode: ViewMode;
}
export interface UseAwarenessReturn {
    awareness: AwarenessUpdaters;
    participants: Participant[];
}
export declare function useAwareness(provider: GatewayProvider | null, opts: UseAwarenessOptions): UseAwarenessReturn;
//# sourceMappingURL=useAwareness.d.ts.map