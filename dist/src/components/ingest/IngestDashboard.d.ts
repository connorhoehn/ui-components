export interface IngestDashboardProps {
    /**
     * Bearer token for the dashboard's own requests (dev seed button) and
     * for `useIngestSources`/`useIngestItems`. Wins over this library's
     * `useIdentityContext().idToken`. Defaults to the context's `idToken`
     * (or `null` when no `<IdentityProvider>` is mounted) via the
     * non-throwing `useOptionalIdentityContext`.
     */
    idToken?: string | null;
    /** Origin for every ingest request. Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
    baseUrl?: string;
}
export default function IngestDashboard({ idToken: idTokenProp, baseUrl }?: IngestDashboardProps): import("react").JSX.Element;
//# sourceMappingURL=IngestDashboard.d.ts.map