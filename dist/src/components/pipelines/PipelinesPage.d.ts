import { type PipelineIndexEntry } from './persistence/pipelineStorage';
import type { TriggerBinding } from '../../types/pipeline';
export type StatusKey = 'draft' | 'published' | 'archived';
export declare const STATUS_KEYS: readonly StatusKey[];
/**
 * Parse the `?status=` param into a Set. Unknown values are dropped silently.
 * Empty or missing param -> `null`, signaling the caller should fall back to
 * `DEFAULT_STATUS_KEYS`.
 */
export declare function parseStatusParam(raw: string | null): Set<StatusKey> | null;
export interface PipelineRow extends PipelineIndexEntry {
    version: number;
    publishedVersion?: number;
    nodeCount: number;
    triggerBinding?: TriggerBinding;
    createdAt: string;
    icon: string;
    tags: string[];
}
export interface PipelinesPageProps {
    /**
     * Author id for pipelines created from this page (demo pipeline, template
     * picks). Wins over this library's `useIdentityContext().userId`.
     * Defaults to the context's `userId` (or `''` when no `<IdentityProvider>`
     * is mounted) via the non-throwing `useOptionalIdentityContext`.
     */
    userId?: string;
    /** Bearer token for the trigger-run request. Wins over this library's `useIdentityContext().idToken`. */
    idToken?: string | null;
    /** Origin for the trigger-run request. Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
    baseUrl?: string;
}
export default function PipelinesPage({ userId: userIdProp, idToken, baseUrl }?: PipelinesPageProps): import("react").JSX.Element;
//# sourceMappingURL=PipelinesPage.d.ts.map