import { ReactNode } from 'react';
import { JudgmentApi } from './types';
export interface JudgmentApiProviderProps {
    value: JudgmentApi;
    children: ReactNode;
}
export declare function JudgmentApiProvider({ value, children }: JudgmentApiProviderProps): import("react").JSX.Element;
/**
 * Hook for components that REQUIRE the API to function (the trend chart
 * + hooks). Returns `null` when no provider is mounted; callers should
 * render an empty state in that case rather than throwing.
 */
export declare function useJudgmentApi(): JudgmentApi | null;
//# sourceMappingURL=JudgmentApiContext.d.ts.map