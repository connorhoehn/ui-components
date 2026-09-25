// src/components/photo-editor/model.ts
//
// A photo's edit is an ordered list of ops. An op is the pipeline's
// `image:adjust-layer` layer (brightness / contrast / saturation / hue / blur,
// same fields and neutral values) widened with the Light and Color kinds a
// photo panel needs. The host keeps the kept list and a proposed list (the
// "suggested changes" preview); nothing here stores anything.
//
// The per-pixel math lives in `adjustRgb` and is mirrored line for line by the
// WebGL shader in `adjustRenderer.ts` and by platform-api's saved render, so a
// preview and a saved result agree. See realtime-examples
// docs/design/media-photo-editor/PLAN.md §2 and §5.

export type PhotoAdjustOp =
  | { kind: 'brightness'; value: number }
  | { kind: 'contrast'; value: number }
  | { kind: 'saturation'; value: number }
  | { kind: 'hue'; degrees: number }
  | { kind: 'blur'; radiusPx: number }
  | { kind: 'exposure'; stops: number }
  | { kind: 'highlights'; amount: number }
  | { kind: 'shadows'; amount: number }
  | { kind: 'whites'; amount: number }
  | { kind: 'blacks'; amount: number }
  | { kind: 'vibrance'; amount: number }
  | { kind: 'temperature'; kelvin: number }
  | { kind: 'tint'; amount: number };

export type PhotoAdjustKind = PhotoAdjustOp['kind'];

/** An op, optionally confined to a mask. No `maskId` = the whole photo. */
export type PhotoEditOp = PhotoAdjustOp & { maskId?: string };

export interface PhotoMask {
  maskId: string;
  label: string;
  kind: 'people' | 'subject' | 'sky' | 'brush';
  /** "2 subjects" — how many things the mask covers, when it is a detection. */
  subjects?: number;
}

export interface PhotoEditVersion {
  version: number;
  parentVersion: number | null;
  ops: PhotoEditOp[];
  summary: string;
  source: 'user' | 'assistant';
  runId?: string;
  renderedImageId?: string;
  createdBy: string;
  createdAt: string;
}

export type PhotoPick = 'pick' | 'reject' | null;

/** Neutral temperature: the photo as shot. */
export const NEUTRAL_KELVIN = 5500;

/** An op's identity: one op per kind per mask. */
export function opIdentity(op: Pick<PhotoEditOp, 'kind' | 'maskId'>): string {
  return `${op.kind}:${op.maskId ?? ''}`;
}

/** Replace the op with the same identity in place, or append it. */
export function setOpIn(ops: readonly PhotoEditOp[], op: PhotoEditOp): PhotoEditOp[] {
  const id = opIdentity(op);
  const i = ops.findIndex((o) => opIdentity(o) === id);
  if (i < 0) return [...ops, op];
  const next = ops.slice();
  next[i] = op;
  return next;
}

/** Remove the op with this kind (and mask). */
export function removeOpIn(ops: readonly PhotoEditOp[], kind: PhotoAdjustKind, maskId?: string): PhotoEditOp[] {
  const id = opIdentity({ kind, maskId });
  return ops.filter((o) => opIdentity(o) !== id);
}

/** True when the op changes nothing — a slider at its neutral value. */
export function isNeutralOp(op: PhotoAdjustOp): boolean {
  switch (op.kind) {
    case 'brightness': case 'contrast': case 'saturation': return op.value === 1;
    case 'hue': return op.degrees === 0;
    case 'blur': return op.radiusPx <= 0;
    case 'exposure': return op.stops === 0;
    case 'temperature': return op.kelvin === NEUTRAL_KELVIN;
    default: return op.amount === 0;
  }
}

/** The ops that actually change something. */
export function effectiveOps(ops: readonly PhotoEditOp[]): PhotoEditOp[] {
  return ops.filter((o) => !isNeutralOp(o));
}

/**
 * Every whole-photo op folded into one parameter set — what the shader takes
 * as uniforms. A kind given twice: the later one wins (list order).
 */
export interface AdjustParams {
  exposureStops: number;
  /** -1..1, warm positive. */
  warmth: number;
  /** -1..1, magenta positive. */
  tint: number;
  contrast: number;
  highlights: number;
  shadows: number;
  whites: number;
  blacks: number;
  saturation: number;
  vibrance: number;
  hueDegrees: number;
  brightness: number;
  blurPx: number;
}

export const NEUTRAL_PARAMS: AdjustParams = {
  exposureStops: 0, warmth: 0, tint: 0, contrast: 1, highlights: 0, shadows: 0, whites: 0, blacks: 0,
  saturation: 1, vibrance: 0, hueDegrees: 0, brightness: 1, blurPx: 0,
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function paramsFromOps(ops: readonly PhotoEditOp[]): AdjustParams {
  const p = { ...NEUTRAL_PARAMS };
  for (const op of ops) {
    if (op.maskId) continue; // masked ops render once the mask has pixels
    switch (op.kind) {
      case 'brightness': p.brightness = op.value; break;
      case 'contrast': p.contrast = op.value; break;
      case 'saturation': p.saturation = op.value; break;
      case 'hue': p.hueDegrees = op.degrees; break;
      case 'blur': p.blurPx = Math.max(0, op.radiusPx); break;
      case 'exposure': p.exposureStops = clamp(op.stops, -5, 5); break;
      case 'highlights': p.highlights = clamp(op.amount, -100, 100) / 100; break;
      case 'shadows': p.shadows = clamp(op.amount, -100, 100) / 100; break;
      case 'whites': p.whites = clamp(op.amount, -100, 100) / 100; break;
      case 'blacks': p.blacks = clamp(op.amount, -100, 100) / 100; break;
      case 'vibrance': p.vibrance = clamp(op.amount, -100, 100) / 100; break;
      case 'temperature': {
        const k = clamp(op.kelvin, 2000, 12000);
        p.warmth = k >= NEUTRAL_KELVIN ? (k - NEUTRAL_KELVIN) / 6500 : (k - NEUTRAL_KELVIN) / 3500;
        break;
      }
      case 'tint': p.tint = clamp(op.amount, -150, 150) / 150; break;
    }
  }
  return p;
}

const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * One pixel, sRGB 0..1 in and out. The reference the shader mirrors:
 * exposure → white balance → contrast → tone (highlights / shadows / whites /
 * blacks) → saturation / vibrance → hue → brightness.
 */
export function adjustRgb(rgb: readonly [number, number, number], p: AdjustParams): [number, number, number] {
  let [r, g, b] = rgb;
  const e = Math.pow(2, p.exposureStops);
  r *= e; g *= e; b *= e;
  r *= 1 + 0.2 * p.warmth; b *= 1 - 0.2 * p.warmth;
  g *= 1 - 0.15 * p.tint;
  r = (r - 0.5) * p.contrast + 0.5; g = (g - 0.5) * p.contrast + 0.5; b = (b - 0.5) * p.contrast + 0.5;
  let l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const d = p.highlights * 0.25 * smoothstep(0.5, 1, l)
    + p.shadows * 0.25 * (1 - smoothstep(0, 0.5, l))
    + p.whites * 0.15 * smoothstep(0.6, 1, l)
    + p.blacks * 0.15 * (1 - smoothstep(0, 0.4, l));
  r += d; g += d; b += d;
  l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  const s = p.saturation * (1 + p.vibrance * (1 - clamp(sat, 0, 1)));
  r = l + (r - l) * s; g = l + (g - l) * s; b = l + (b - l) * s;
  if (p.hueDegrees !== 0) [r, g, b] = hueRotate([r, g, b], p.hueDegrees);
  r *= p.brightness; g *= p.brightness; b *= p.brightness;
  return [clamp(r, 0, 1), clamp(g, 0, 1), clamp(b, 0, 1)];
}

/** The CSS `hue-rotate()` matrix (Filter Effects §feColorMatrix). */
export function hueRotateMatrix(degrees: number): number[] {
  const a = (degrees * Math.PI) / 180;
  const c = Math.cos(a), s = Math.sin(a);
  return [
    0.213 + c * 0.787 - s * 0.213, 0.715 - c * 0.715 - s * 0.715, 0.072 - c * 0.072 + s * 0.928,
    0.213 - c * 0.213 + s * 0.143, 0.715 + c * 0.285 + s * 0.140, 0.072 - c * 0.072 - s * 0.283,
    0.213 - c * 0.213 - s * 0.787, 0.715 - c * 0.715 + s * 0.715, 0.072 + c * 0.928 + s * 0.072,
  ];
}

function hueRotate([r, g, b]: [number, number, number], degrees: number): [number, number, number] {
  const m = hueRotateMatrix(degrees);
  return [m[0] * r + m[1] * g + m[2] * b, m[3] * r + m[4] * g + m[5] * b, m[6] * r + m[7] * g + m[8] * b];
}
