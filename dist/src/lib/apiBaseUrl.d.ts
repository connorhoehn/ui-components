/**
 * Point every request that uses this resolver at `url`. Call once during
 * app start-up, before the first request. Pass `null` to fall back to the
 * runtime-env / build-time-env chain again (also how a test suite resets
 * it).
 */
export declare function setApiBaseUrl(url: string | null): void;
/** The origin requests currently resolve to — see the resolution order above. */
export declare function getApiBaseUrl(): string;
/**
 * @deprecated Alias for `setApiBaseUrl`, kept for existing callers. The
 * document-type adapter was the first surface to get an override setter
 * (2.352.0); every other surface reading `VITE_SOCIAL_API_URL` shares the
 * same resolver as of 2.357.0, so the name no longer implies anything
 * document-type-specific. New code should call `setApiBaseUrl`.
 */
export declare const setDocumentTypeApiBaseUrl: typeof setApiBaseUrl;
/** @deprecated Alias for `getApiBaseUrl` — see `setDocumentTypeApiBaseUrl`. */
export declare const getDocumentTypeApiBaseUrl: typeof getApiBaseUrl;
//# sourceMappingURL=apiBaseUrl.d.ts.map