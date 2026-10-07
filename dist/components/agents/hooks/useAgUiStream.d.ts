import type { AgUiEvent, AgUiMessage, AgUiToolCall } from '../../../types/agents';
export interface UseAgUiStreamOptions {
    url: string;
    threadId?: string;
    headers?: Record<string, string>;
    /** Extra fields merged into the POST body alongside `message` and `threadId`. */
    extraBody?: Record<string, unknown>;
    onEvent?: (event: AgUiEvent) => void;
}
export interface UseAgUiStreamReturn {
    messages: AgUiMessage[];
    streamingText: string;
    activeToolCalls: AgUiToolCall[];
    state: unknown;
    threadId: string | null;
    runId: string | null;
    isStreaming: boolean;
    error: string | null;
    sendMessage: (content: string, opts?: {
        extraBody?: Record<string, unknown>;
    }) => void;
    cancelStream: () => void;
    reset: () => void;
    loadHistory: (threadId: string, messages: AgUiMessage[]) => void;
}
export declare function useAgUiStream({ url, threadId: initialThreadId, headers, extraBody: hookExtraBody, onEvent, }: UseAgUiStreamOptions): UseAgUiStreamReturn;
//# sourceMappingURL=useAgUiStream.d.ts.map