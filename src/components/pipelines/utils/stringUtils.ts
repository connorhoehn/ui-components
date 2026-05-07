// frontend/src/components/pipelines/utils/stringUtils.ts
//
// String manipulation utilities for pipeline names and identifiers.

/**
 * Convert a display name to a URL-safe slug.
 * - Lowercase
 * - Replace spaces/underscores with hyphens
 * - Remove non-alphanumeric characters except hyphens
 * - Collapse multiple hyphens
 * - Trim leading/trailing hyphens
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Truncate a string to a maximum length, appending ellipsis if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}
