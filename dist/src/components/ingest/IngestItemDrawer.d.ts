import type { IngestItem } from '../../types/ingest';
export interface IngestItemDrawerProps {
    item: IngestItem | null;
    sourceName?: string;
    onClose: () => void;
    onRetry: (itemId: string) => Promise<boolean | void>;
    onSkip: (itemId: string) => Promise<boolean | void>;
    /**
     * Bearer token for the drawer's own "Re-map" request. Wins over this
     * library's `useIdentityContext().idToken`. Defaults to the context's
     * `idToken` (or `null` when no `<IdentityProvider>` is mounted) via the
     * non-throwing `useOptionalIdentityContext`.
     */
    idToken?: string | null;
    /** Origin for the "Re-map" request. Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
    baseUrl?: string;
}
export default function IngestItemDrawer({ item, sourceName, onClose, onRetry, onSkip, idToken: idTokenProp, baseUrl, }: IngestItemDrawerProps): import("react").JSX.Element | null;
//# sourceMappingURL=IngestItemDrawer.d.ts.map