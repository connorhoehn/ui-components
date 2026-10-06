export interface MappingReviewPageProps {
    /**
     * Bearer token for the review-queue and document-types requests. Wins
     * over this library's `useIdentityContext().idToken`. Defaults to the
     * context's `idToken` (or `null` when no `<IdentityProvider>` is mounted)
     * via the non-throwing `useOptionalIdentityContext`.
     */
    idToken?: string | null;
    /**
     * Origin for `/api/ingest/mapping/review` and `/api/document-types`. Wins
     * over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`.
     */
    baseUrl?: string;
}
export default function MappingReviewPage({ idToken: idTokenProp, baseUrl }?: MappingReviewPageProps): import("react").JSX.Element;
//# sourceMappingURL=MappingReviewPage.d.ts.map