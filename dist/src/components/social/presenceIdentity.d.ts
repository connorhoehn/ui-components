/**
 * The identifier a person's avatar colour MUST be hashed from.
 *
 * Presence rows arrive keyed by a per-WebSocket-session `clientId` that is a
 * fresh id on every tab, reload and reconnect. Hashing the colour off that
 * made ONE human render in a different colour in every row they appeared in
 * (UX audit 2026-08-25: "one human, five colours"). `metadata.email` has the
 * same failure in reverse — it is absent on most rosters, so the code fell
 * through to clientId in practice.
 *
 * Precedence: the stable authed user id, then the display name (two tabs of
 * one person at least agree), and only then clientId, for genuinely anonymous
 * sessions where nothing else exists.
 */
export declare function presenceColorKey(userId?: string | null, displayName?: string | null, clientId?: string | null): string;
//# sourceMappingURL=presenceIdentity.d.ts.map