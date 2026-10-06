import { type RefObject } from 'react';
/** What a console surface paints behind itself. `none` keeps the ordinary surface. */
export type BackdropTone = 'auto' | 'night' | 'graphite' | 'none';
/** A tone after `auto` has been decided. */
export type ResolvedBackdropTone = Exclude<BackdropTone, 'auto'>;
/**
 * Resolve `tone` for a surface mounted at `el`. Pure apart from the DOM read and
 * the media query, so it is the thing the tests pin.
 */
export declare function resolveBackdropTone(tone: BackdropTone, el: Element | null, prefersDark?: boolean): ResolvedBackdropTone;
/**
 * `resolveBackdropTone`, kept current. Re-resolves when any `data-theme` /
 * `data-backdrop-tone` in the document changes and when the OS scheme flips.
 * Listens only while `enabled` — an idle composer (Chat mode) subscribes to
 * nothing, and resolves synchronously before paint when it lights up.
 */
export declare function useResolvedBackdropTone(ref: RefObject<Element | null>, tone: BackdropTone, enabled?: boolean): ResolvedBackdropTone;
/** Star colours for the graphite sky: zinc greys, so no blue cast sits on a white page. */
export declare const GRAPHITE_PARTICLE_COLORS: readonly ['#f4f4f5', '#d4d4d8', '#a1a1aa'];
/**
 * What an enclosing console surface (a `ChatColumnBackdrop` in Agent/Terminal)
 * is already painting. A composer inside one reads this and does NOT start a
 * second star field in the same region: it keeps its tint and border and lets
 * the column's field show through. `working` is the column's "a loop is
 * mid-turn" cue, so a composer can follow it without the host passing it twice.
 */
export interface ConsoleSurfaceState {
    /** True while the enclosing surface is painting its sky. */
    painting: boolean;
    /** True while the enclosing surface shows its working density. */
    working: boolean;
}
export declare const ConsoleSurfaceContext: import("react").Context<ConsoleSurfaceState | null>;
/** The nearest enclosing console surface, or `null` outside one. */
export declare function useEnclosingConsoleSurface(): ConsoleSurfaceState | null;
//# sourceMappingURL=backdropTone.d.ts.map