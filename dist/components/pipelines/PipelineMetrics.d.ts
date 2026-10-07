export interface PipelineMetricsProps {
    /**
     * Bearer token for `/api/pipelines/metrics`. Wins over this library's
     * `useIdentityContext().idToken`. Defaults to the context's `idToken`
     * (or `null` when no `<IdentityProvider>` is mounted) via the
     * non-throwing `useOptionalIdentityContext`.
     */
    idToken?: string | null;
    /** Origin for `/api/pipelines/metrics`. Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
    baseUrl?: string;
}
export default function PipelineMetrics({ idToken: idTokenProp, baseUrl: baseUrlProp }?: PipelineMetricsProps): import("react").JSX.Element;
//# sourceMappingURL=PipelineMetrics.d.ts.map