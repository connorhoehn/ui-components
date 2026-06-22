import { ChatMessage } from '../../hooks/useChat';
interface ChatPanelProps {
    messages: ChatMessage[];
    onSend: (content: string) => void;
    disabled?: boolean;
    onTyping?: (isTyping: boolean) => void;
    typingUsers?: string[];
}
export declare function ChatPanel({ messages, onSend, disabled, onTyping, typingUsers }: ChatPanelProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ChatPanel.d.ts.map