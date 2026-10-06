export interface ChatLabTerminalProps {
    sessionId: string;
    /** Already minted by the host; the provider hands it straight to xterm. */
    shellUrl: string;
    className?: string;
    'data-testid'?: string;
}
export declare function ChatLabTerminal({ sessionId, shellUrl, className, 'data-testid': testId, }: ChatLabTerminalProps): import("react").JSX.Element;
export default ChatLabTerminal;
//# sourceMappingURL=ChatLabTerminal.d.ts.map