import { type ReactNode } from 'react';
import { type ChatCommand, type ChatCommandContext, type ChatCommandOutcome } from './chatCommands';
/** Later commands win by trigger (case-insensitive); the first occurrence keeps its position. */
export declare function mergeChatCommands(...layers: ReadonlyArray<readonly ChatCommand[] | undefined>): ChatCommand[];
export interface ChatCommandProviderProps {
    /** This layer's commands. Merged over any provider above; overrides by trigger. */
    commands?: readonly ChatCommand[];
    children: ReactNode;
}
export declare function ChatCommandProvider({ commands, children }: ChatCommandProviderProps): import("react").JSX.Element;
/** Every command in scope of the nearest provider; `[]` outside one. */
export declare function useChatCommands(): ChatCommand[];
/**
 * Adds `commands` to the nearest provider while the caller is mounted. Pass a
 * stable array (module-level or memoised): a new array each render is a
 * re-registration each render.
 */
export declare function useRegisterChatCommands(commands: readonly ChatCommand[] | undefined): void;
/** Everything `run` needs except the draft, which the runner parses. */
export type ChatCommandRunContext = Omit<ChatCommandContext, 'text' | 'argumentText'>;
/**
 * Runs the command a sent draft names. Resolves `null` when the draft is plain
 * text (send it as a message); throws when the command is out of scope or its
 * `run` rejects — the host toasts and keeps the draft.
 */
export declare function useRunChatCommand(): (text: string, ctx: ChatCommandRunContext) => Promise<ChatCommandOutcome | null>;
export default ChatCommandProvider;
//# sourceMappingURL=ChatCommandProvider.d.ts.map