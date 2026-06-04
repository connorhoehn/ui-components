/** The configured social API base URL. Empty string = same-origin (use proxy). */
export declare const SOCIAL_API_URL: string;
/** Whether the social API is available (always true — empty URL uses same-origin proxy). */
export declare const isSocialApiConfigured = true;
/**
 * Probe the social API once. Returns true if reachable, false otherwise.
 * Result is cached for the lifetime of the page.
 */
export declare function checkSocialApiReachable(): Promise<boolean>;
/**
 * Wrapper for fetch that silently returns null when the social API is unreachable.
 * Use instead of raw fetch() in social hooks.
 */
export declare function socialFetch(path: string, options?: RequestInit): Promise<Response | null>;
//# sourceMappingURL=socialApi.d.ts.map