// callWidgetMode — ONE display-mode vocabulary for every call surface.
//
// Before 2.106 the call chrome spoke three overlapping dialects for the
// same three states: <CallWidget> had a `minimized` boolean (and an
// `onExpand`/`onMinimize` pair), <ExpandableCallWidget> had
// 'mini' | 'docked' | 'fullscreen', and the hosting app tracked a
// `widgetExpanded` flag on top of both. "Expanded" meant the opposite
// thing in each: expanded-from-minimized (a 320px widget) vs
// expanded-to-docked (a 960px window).
//
// Canonical vocabulary, used by every forward API:
//
//   'mini'        the compact pill / corner tile
//   'window'      the normal floating widget (formerly 'docked')
//   'fullscreen'  viewport-filling stage
//
// The legacy spellings keep working. `toCanonicalMode` accepts either
// dialect; `toLegacyMode` converts back for the wire/DOM compat
// attributes and the persisted payload, so a downgrade still reads the
// state it wrote.

/** Canonical display mode for any call surface. */
export type CallWidgetMode = 'mini' | 'window' | 'fullscreen';

/**
 * @deprecated Pre-2.106 spelling. 'docked' is now 'window'; everything
 * that accepts a mode still takes this union, but emits {@link CallWidgetMode}.
 */
export type LegacyCallWidgetMode = 'mini' | 'docked' | 'fullscreen';

export type AnyCallWidgetMode = CallWidgetMode | LegacyCallWidgetMode;

/** Normalize either dialect to the canonical vocabulary. */
export function toCanonicalMode(mode: AnyCallWidgetMode): CallWidgetMode {
  return mode === 'docked' ? 'window' : mode;
}

/** Canonical → the pre-2.106 spelling, for back-compat surfaces. */
export function toLegacyMode(mode: CallWidgetMode): LegacyCallWidgetMode {
  return mode === 'window' ? 'docked' : mode;
}

/**
 * Map the legacy `minimized` boolean onto the canonical vocabulary.
 *
 *   minimized === true   → 'mini'
 *   minimized === false  → 'window'
 *
 * There is no legacy boolean for 'fullscreen' — <CallWidget> never had
 * one, which is exactly why the new prop exists.
 */
export function modeFromMinimized(minimized: boolean): CallWidgetMode {
  return minimized ? 'mini' : 'window';
}

// One dev-time warning per conflicting call site, not per render. Keyed by
// component so <CallWidget> and <ExpandableCallWidget> each get to speak.
const warned = new Set<string>();

/**
 * Dev-only: complain once when a caller supplies BOTH the canonical mode
 * prop and its legacy counterpart. The canonical prop wins.
 */
export function warnModeConflictOnce(component: string, legacyPropName: string): void {
  if (process.env.NODE_ENV === 'production') return;
  if (warned.has(component)) return;
  warned.add(component);
  // eslint-disable-next-line no-console
  console.warn(
    `[${component}] both \`${legacyPropName}\` and the canonical mode prop were supplied. ` +
    `The mode prop wins; \`${legacyPropName}\` is deprecated ` +
    `(${legacyPropName} === true → 'mini', false → 'window'). Drop the legacy prop.`,
  );
}

/** Test-only: forget which components have already warned. */
export function __resetCallWidgetModeWarnings(): void {
  warned.clear();
}
