import { AgUiMessage, AgUiToolCall } from '../../../types/agents';
interface StreamingChatPanelProps {
    messages: AgUiMessage[];
    isStreaming: boolean;
    streamingText?: string;
    activeToolCalls?: AgUiToolCall[];
    error: string | null;
    onSend: (content: string) => void;
    onCancel?: () => void;
    placeholder?: string;
    className?: string;
}
export declare function StreamingChatPanel({ messages, isStreaming, streamingText, activeToolCalls, error, onSend, onCancel, placeholder, className, }: StreamingChatPanelProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=StreamingChatPanel.d.ts.map