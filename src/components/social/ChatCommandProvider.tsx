// ChatCommandProvider — the slash-command registry as React context.
//
// Commands arrive in layers. The app's shell provides `/doc`; a page nested
// inside it provides `/search`; a plugin mounted deeper still registers `/graph`
// while it is on screen. Nested providers MERGE with their parent — later
// layers override earlier ones by trigger — so every embedder adds to the
// vocabulary rather than replacing it, and a composer anywhere below reads the
// whole set with `useChatCommands()`.
//
// Tiptap-free: the composer that offers these commands is a separate subpath.

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  type ChatCommand,
  type ChatCommandContext,
  type ChatCommandOutcome,
  chatCommandScopeHint,
  isChatCommandInScope,
  parseChatCommand,
} from './chatCommands';

interface ChatCommandRegistry {
  /** Every command visible here, parent layers first, overrides applied. */
  commands: ChatCommand[];
  /** Adds commands to THIS layer until the returned function is called. */
  register: (commands: readonly ChatCommand[]) => () => void;
}

const ChatCommandRegistryContext = createContext<ChatCommandRegistry | null>(null);

/** Later commands win by trigger (case-insensitive); the first occurrence keeps its position. */
export function mergeChatCommands(...layers: ReadonlyArray<readonly ChatCommand[] | undefined>): ChatCommand[] {
  const byTrigger = new Map<string, ChatCommand>();
  for (const layer of layers) {
    for (const command of layer ?? []) byTrigger.set(command.trigger.toLowerCase(), command);
  }
  return [...byTrigger.values()];
}

export interface ChatCommandProviderProps {
  /** This layer's commands. Merged over any provider above; overrides by trigger. */
  commands?: readonly ChatCommand[];
  children: ReactNode;
}

export function ChatCommandProvider({ commands, children }: ChatCommandProviderProps) {
  const parent = useContext(ChatCommandRegistryContext);
  // Plugins registered through useRegisterChatCommands, in registration order.
  const [plugins, setPlugins] = useState<ReadonlyArray<readonly ChatCommand[]>>([]);

  const register = useCallback((added: readonly ChatCommand[]) => {
    setPlugins((prev) => [...prev, added]);
    return () => setPlugins((prev) => prev.filter((layer) => layer !== added));
  }, []);

  const value = useMemo<ChatCommandRegistry>(
    () => ({ commands: mergeChatCommands(parent?.commands, commands, ...plugins), register }),
    [parent?.commands, commands, plugins, register],
  );

  return <ChatCommandRegistryContext.Provider value={value}>{children}</ChatCommandRegistryContext.Provider>;
}

/** Every command in scope of the nearest provider; `[]` outside one. */
export function useChatCommands(): ChatCommand[] {
  return useContext(ChatCommandRegistryContext)?.commands ?? EMPTY;
}
const EMPTY: ChatCommand[] = [];

/**
 * Adds `commands` to the nearest provider while the caller is mounted. Pass a
 * stable array (module-level or memoised): a new array each render is a
 * re-registration each render.
 */
export function useRegisterChatCommands(commands: readonly ChatCommand[] | undefined): void {
  const registry = useContext(ChatCommandRegistryContext);
  if (!registry) throw new Error('useRegisterChatCommands needs a <ChatCommandProvider> above it');
  const { register } = registry;
  useEffect(() => {
    if (!commands || commands.length === 0) return;
    return register(commands);
  }, [register, commands]);
}

/** Everything `run` needs except the draft, which the runner parses. */
export type ChatCommandRunContext = Omit<ChatCommandContext, 'text' | 'argumentText'>;

/**
 * Runs the command a sent draft names. Resolves `null` when the draft is plain
 * text (send it as a message); throws when the command is out of scope or its
 * `run` rejects — the host toasts and keeps the draft.
 */
export function useRunChatCommand(): (text: string, ctx: ChatCommandRunContext) => Promise<ChatCommandOutcome | null> {
  const commands = useChatCommands();
  return useCallback(
    async (text, ctx) => {
      const parsed = parseChatCommand(text, commands);
      if (!parsed) return null;
      const { command, argumentText } = parsed;
      if (!isChatCommandInScope(command, ctx)) throw new Error(`${command.trigger}: ${chatCommandScopeHint(command)}`);
      return command.run({ ...ctx, text, argumentText });
    },
    [commands],
  );
}

export default ChatCommandProvider;
