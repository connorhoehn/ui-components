import { A2AMessage, A2ASession, AgentDefinition } from '../../../types/agents';
interface UseA2ASessionOptions {
    baseUrl?: string;
    participants?: AgentDefinition[];
}
interface UseA2ASessionReturn {
    session: A2ASession | null;
    messages: A2AMessage[];
    isActive: boolean;
    startSession: (participants: AgentDefinition[]) => void;
    sendMessage: (from: string, to: string, content: string) => void;
    endSession: () => void;
}
export declare function useA2ASession({ baseUrl: _baseUrl, participants: initialParticipants, }?: UseA2ASessionOptions): UseA2ASessionReturn;
export {};
//# sourceMappingURL=useA2ASession.d.ts.map