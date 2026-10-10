export interface ActivityTickerPreferences {
  hidden: boolean; dimmed: boolean; paused: boolean; quiet: boolean;
  speed: 'slow' | 'fast'; categories: string[];
}
function defaults(categoryIds: readonly string[]): ActivityTickerPreferences { return {
  hidden: false, dimmed: false, paused: false, quiet: false, speed: 'slow', categories: [...categoryIds],
}; }
export function readActivityTickerPreferences(raw: string | null, categoryIds: readonly string[]): ActivityTickerPreferences {
  try {
    const value: unknown = raw ? JSON.parse(raw) : null;
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid preference');
    const row = value as Record<string, unknown>;
    const categories = row.categories;
    return {
      hidden: row.hidden === true, dimmed: row.dimmed === true, paused: row.paused === true, quiet: row.quiet === true,
      speed: row.speed === 'fast' ? 'fast' : 'slow',
      categories: Array.isArray(categories) ? categoryIds.filter(category => categories.includes(category)) : [...categoryIds],
    };
  } catch { return defaults(categoryIds); }
}
export function activityTickerRotationAllowed(options: { paused: boolean; quiet: boolean; engaged: boolean; reducedMotion: boolean; pageVisible: boolean; activeCall: boolean; count: number }): boolean {
  return options.count > 1 && !options.paused && !options.quiet && !options.engaged && !options.reducedMotion && options.pageVisible && !options.activeCall;
}
