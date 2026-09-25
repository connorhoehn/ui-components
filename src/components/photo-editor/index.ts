// @connorhoehn/ui-components/photo-editor
//
// The photo editor over the media catalog (realtime-examples
// docs/design/media-photo-editor/PLAN.md). Lanes append their own export
// blocks: E1 the model, renderer and frame; E2 the right panel (./panel);
// E3 the assistant composer (./composer).

// ── E1: model, renderer, frame ─────────────────────────────────────────────
export {
  NEUTRAL_KELVIN, NEUTRAL_PARAMS, opIdentity, setOpIn, removeOpIn, isNeutralOp, effectiveOps, paramsFromOps, adjustRgb, hueRotateMatrix,
} from './model';
export type { PhotoAdjustOp, PhotoAdjustKind, PhotoEditOp, PhotoMask, PhotoEditVersion, PhotoPick, AdjustParams } from './model';
export { createAdjustRenderer, cssFilterFor } from './adjustRenderer';
export type { AdjustRenderer } from './adjustRenderer';
export { AdjustedImageCanvas } from './AdjustedImageCanvas';
export type { AdjustedImageCanvasProps } from './AdjustedImageCanvas';
export { PhotoCompareCanvas } from './PhotoCompareCanvas';
export type { PhotoCompareCanvasProps, PhotoZoom, PhotoCompareLayout } from './PhotoCompareCanvas';
export { PhotoEditorTopBar } from './PhotoEditorTopBar';
export type { PhotoEditorTopBarProps } from './PhotoEditorTopBar';
export { PhotoFilmstrip } from './PhotoFilmstrip';
export type { PhotoFilmstripProps, PhotoFilmstripItem } from './PhotoFilmstrip';
export { PhotoEditorShell, PhotoEditorStatusBar } from './PhotoEditorShell';
export type { PhotoEditorShellProps, PhotoEditorStatusBarProps } from './PhotoEditorShell';
export { SidebarToggleIcon, FlagIcon, HeartIcon, CompareLayoutIcon, EditStackIcon } from './icons';
export type { PhotoGlyphProps } from './icons';
// ── E1 end ─────────────────────────────────────────────────────────────────
