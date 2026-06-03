import { createContext, useContext, type ReactNode } from 'react';
import type { JudgmentApi } from './types';

/**
 * Context that carries the judge data-fetcher contract. Consumers wrap
 * their app (or a relevant subtree) in `<JudgmentApiProvider value={…}>`
 * and the judge composites + hooks read from this context.
 *
 * Without a provider, hooks return `null`-ish states (loading=false,
 * aggregates=[], etc.) and the JudgmentResultViewer's "Show raw" toggle
 * falls back to the inline rawModelText body when present.
 *
 * Design: kept deliberately small. We only ship the methods consumers
 * actually need. URL conventions, auth headers, retry, and any other
 * transport concerns live in the consumer's impl — none of them belong
 * in this library.
 */
const JudgmentApiContext = createContext<JudgmentApi | null>(null);

export interface JudgmentApiProviderProps {
  value: JudgmentApi;
  children: ReactNode;
}

export function JudgmentApiProvider({ value, children }: JudgmentApiProviderProps) {
  return (
    <JudgmentApiContext.Provider value={value}>
      {children}
    </JudgmentApiContext.Provider>
  );
}

/**
 * Hook for components that REQUIRE the API to function (the trend chart
 * + hooks). Returns `null` when no provider is mounted; callers should
 * render an empty state in that case rather than throwing.
 */
export function useJudgmentApi(): JudgmentApi | null {
  return useContext(JudgmentApiContext);
}
