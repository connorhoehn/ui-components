/**
 * Phase 12 identity utility — shared color and initials helpers.
 *
 * identityToColor: maps an identifier (email preferred for cross-session
 * stability, clientId as fallback) to a deterministic color from the palette.
 * Uses the same djb2 hash algorithm that was duplicated across all cursor
 * components so that colors remain consistent after the migration.
 *
 * identityToInitials: derives a two-character display abbreviation from a
 * displayName string. Parses "First Last" → "FL", single word → first two
 * chars, empty → "?".
 */
/**
 * Returns a deterministic color for an identifier (email or clientId).
 * Stable across sessions as long as the identifier is the same.
 */
export declare function identityToColor(identifier: string): string;
/**
 * Returns a two-character uppercase initials string from a display name.
 *
 * Rules:
 * - Empty string → "?"
 * - Name with space → first char of first word + first char of last word
 * - Single word → first two characters (or just first if only one char)
 * - Always uppercase, max 2 chars
 *
 * Examples: "Jane Doe" → "JD", "jane" → "JA", "j" → "J", "" → "?"
 */
export declare function identityToInitials(displayName: string): string;
//# sourceMappingURL=identity.d.ts.map