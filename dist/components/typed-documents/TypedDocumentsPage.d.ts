import { type JSX } from 'react';
interface Props {
    idToken: string | null;
    /**
     * Origin the document-type and typed-document endpoints live behind.
     *
     * Defaults to the build's env, but a host that names its API something
     * other than `VITE_SOCIAL_API_URL` had no way to say so and every request
     * went to the page's own origin — which is why one host kept a forked copy
     * of this whole page just to change one string.
     */
    baseUrl?: string;
}
export declare function TypedDocumentsPage({ idToken, baseUrl }: Props): JSX.Element;
export {};
//# sourceMappingURL=TypedDocumentsPage.d.ts.map