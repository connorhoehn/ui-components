/** Canonical display mode for any call surface. */
export type CallWidgetMode = 'mini' | 'window' | 'fullscreen';
/**
 * @deprecated Pre-2.106 spelling. 'docked' is now 'window'; everything
 * that accepts a mode still takes this union, but emits {@link CallWidgetMode}.
 */
export type LegacyCallWidgetMode = 'mini' | 'docked' | 'fullscreen';
export type AnyCallWidgetMode = CallWidgetMode | LegacyCallWidgetMode;
/** Normalize either dialect to the canonical vocabulary. */
export declare function toCanonicalMode(mode: AnyCallWidgetMode): CallWidgetMode;
/** Canonical → the pre-2.106 spelling, for back-compat surfaces. */
export declare function toLegacyMode(mode: CallWidgetMode): LegacyCallWidgetMode;
/**
 * Map the legacy `minimized` boolean onto the canonical vocabulary.
 *
 *   minimized === true   → 'mini'
 *   minimized === false  → 'window'
 *
 * There is no legacy boolean for 'fullscreen' — <CallWidget> never had
 * one, which is exactly why the new prop exists.
 */
export declare function modeFromMinimized(minimized: boolean): CallWidgetMode;
/**
 * Dev-only: complain once when a caller supplies BOTH the canonical mode
 * prop and its legacy counterpart. The canonical prop wins.
 */
export declare function warnModeConflictOnce(component: string, legacyPropName: string): void;
/** Test-only: forget which components have already warned. */
export declare function __resetCallWidgetModeWarnings(): void;
//# sourceMappingURL=callWidgetMode.d.ts.map