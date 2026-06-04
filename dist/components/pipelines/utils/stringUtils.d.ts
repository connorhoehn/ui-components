/**
 * Convert a display name to a URL-safe slug.
 * - Lowercase
 * - Replace spaces/underscores with hyphens
 * - Remove non-alphanumeric characters except hyphens
 * - Collapse multiple hyphens
 * - Trim leading/trailing hyphens
 */
export declare function slugify(name: string): string;
/**
 * Truncate a string to a maximum length, appending ellipsis if truncated.
 */
export declare function truncate(str: string, maxLength: number): string;
//# sourceMappingURL=stringUtils.d.ts.map