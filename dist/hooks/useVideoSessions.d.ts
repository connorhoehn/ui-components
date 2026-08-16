export interface VideoSessionParticipant {
    userId: string;
    displayName: string;
    joinedAt: string;
}
export interface VideoSession {
    documentId: string;
    sessionId: string;
    vnlSessionId: string;
    status: 'active' | 'ended';
    startedAt: string;
    endedAt?: string;
    startedBy: string;
    participants: VideoSessionParticipant[];
    transcriptStatus?: 'pending' | 'processing' | 'available' | 'failed';
    transcript?: string;
    aiSummary?: string;
}
export declare function useVideoSessions(documentId: string, idToken: string | null): {
    sessions: VideoSession[];
    loading: boolean;
    fetchSessions: () => Promise<void>;
};
//# sourceMappingURL=useVideoSessions.d.ts.map