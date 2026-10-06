interface Props {
    sourceId: string;
    /** Wins over this library's `useIdentityContext().idToken`. */
    idToken?: string | null;
    /** Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
    baseUrl?: string;
}
export default function SourceSloPanel({ sourceId, idToken, baseUrl }: Props): import("react").JSX.Element;
export {};
//# sourceMappingURL=SourceSloPanel.d.ts.map