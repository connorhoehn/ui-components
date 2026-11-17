// callNoun (since 2.537.0): the word the call components use for the call
// ("huddle" by default; an app says "call" or "interview"). Each component
// still takes its own `callNoun` prop, which wins; without one it reads the
// nearest `CallNounProvider`, so an app sets the word once — and
// `CallHostProvider callNoun` provides it to everything under the host,
// including a device check a page renders itself.
import { createContext, useContext, type ReactNode } from 'react';

/** The default word for the call. */
export const DEFAULT_CALL_NOUN = 'huddle';

const CallNounContext = createContext<string | null>(null);

export interface CallNounProviderProps {
  /** Lower case ("call", "interview"); components capitalise it where it starts a phrase. */
  noun: string;
  children: ReactNode;
}

/** Sets the word for the call for every call component inside it (`HuddleBar`, `AudioVideoSettingsForm`'s pre-join form, `PreJoinDeviceSetup`). */
export function CallNounProvider({ noun, children }: CallNounProviderProps) {
  return <CallNounContext.Provider value={noun || null}>{children}</CallNounContext.Provider>;
}

/** The word for the call: `override` when given, else the nearest `CallNounProvider`'s, else "huddle". */
export function useCallNoun(override?: string): string {
  const provided = useContext(CallNounContext);
  return override || provided || DEFAULT_CALL_NOUN;
}
