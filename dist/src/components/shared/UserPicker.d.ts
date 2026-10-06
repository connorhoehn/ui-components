import type { PresenceUser } from '../../hooks/usePresence';
export interface UserPickerProps {
    value: string[];
    onChange: (userIds: string[]) => void;
    placeholder?: string;
    maxSelect?: number;
    /**
     * Presence-sourced candidates. Wins over this library's
     * `usePresenceContext()`, so a host running its own presence provider can
     * hand its list in directly instead of mounting this library's
     * `<PresenceProvider>` just for `UserPicker`. Defaults to the context's
     * `presenceUsers` (or `[]` when no provider is mounted).
     */
    presenceUsers?: PresenceUser[];
    /**
     * Bearer token for the default `GET /api/profiles` search request. Wins
     * over `useIdentityContext().idToken`. Pass `null` explicitly to disable
     * the default search request while still showing presence candidates.
     * Ignored when `searchUsers` is given. Defaults to the context's `idToken`
     * (or `null` when no provider is mounted).
     */
    idToken?: string | null;
    /**
     * Full replacement for the default profile-search request, for a host that
     * already owns an authorized client (signed requests, a proxy, a mock in
     * tests) or whose search endpoint isn't `GET {baseUrl}/api/profiles?q=`.
     * Wins over `baseUrl` and does not require `idToken`. Called (debounced
     * 250ms) with the trimmed query and an `AbortSignal` tied to the request's
     * lifetime — abort on unmount/requery the way the default `fetch` does.
     */
    searchUsers?: (query: string, signal: AbortSignal) => Promise<ProfileSummary[]>;
    /**
     * Origin for the default `GET /api/profiles` request. Wins over the
     * build-time `VITE_SOCIAL_API_URL`, which is baked into THIS library's own
     * build and cannot be influenced by a consumer's `.env` — see the note on
     * `VITE_SOCIAL_API_URL` above. Ignored when `searchUsers` is given.
     */
    baseUrl?: string;
}
export interface ProfileSummary {
    userId: string;
    displayName: string;
    email?: string;
    avatarUrl?: string;
}
declare function UserPicker({ value, onChange, placeholder, maxSelect, presenceUsers: presenceUsersProp, idToken: idTokenProp, searchUsers, baseUrl, }: UserPickerProps): import("react").JSX.Element;
export default UserPicker;
//# sourceMappingURL=UserPicker.d.ts.map