export interface SourceDetailPageProps {
    /**
     * Bearer token for every request this page makes. Wins over this
     * library's `useIdentityContext().idToken`. Defaults to the context's
     * `idToken` (or `null` when no `<IdentityProvider>` is mounted) via the
     * non-throwing `useOptionalIdentityContext`.
     */
    idToken?: string | null;
    /** Origin for every ingest/pipeline-def/document-type request. Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
    baseUrl?: string;
}
export default function SourceDetailPage({ idToken: idTokenProp, baseUrl }?: SourceDetailPageProps): import("react").JSX.Element | null;
//# sourceMappingURL=SourceDetailPage.d.ts.map