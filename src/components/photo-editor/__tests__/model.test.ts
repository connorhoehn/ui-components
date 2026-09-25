import { describe, expect, it } from 'vitest';
import { adjustRgb, effectiveOps, isNeutralOp, NEUTRAL_PARAMS, paramsFromOps, removeOpIn, setOpIn, type PhotoEditOp } from '../model';
import { cssFilterFor } from '../adjustRenderer';

const MID: [number, number, number] = [0.5, 0.4, 0.3];

describe('photo edit ops', () => {
  it('setOpIn replaces an op of the same kind and mask in place, and appends a new one', () => {
    const ops: PhotoEditOp[] = [{ kind: 'exposure', stops: 0.1 }, { kind: 'shadows', amount: 10 }];
    expect(setOpIn(ops, { kind: 'exposure', stops: 0.3 })).toEqual([{ kind: 'exposure', stops: 0.3 }, { kind: 'shadows', amount: 10 }]);
    expect(setOpIn(ops, { kind: 'shadows', amount: 18, maskId: 'people' })).toHaveLength(3);
    expect(removeOpIn(ops, 'shadows')).toEqual([{ kind: 'exposure', stops: 0.1 }]);
  });

  it('knows a neutral op from one that changes something', () => {
    expect(isNeutralOp({ kind: 'contrast', value: 1 })).toBe(true);
    expect(isNeutralOp({ kind: 'temperature', kelvin: 5500 })).toBe(true);
    expect(isNeutralOp({ kind: 'highlights', amount: -12 })).toBe(false);
    expect(effectiveOps([{ kind: 'tint', amount: 0 }, { kind: 'tint', amount: 2, maskId: 'm' }])).toHaveLength(1);
  });

  it('folds ops into shader params, skipping masked ones', () => {
    const p = paramsFromOps([{ kind: 'exposure', stops: 0.15 }, { kind: 'shadows', amount: 18 }, { kind: 'shadows', amount: 90, maskId: 'people' }, { kind: 'temperature', kelvin: 5200 }]);
    expect(p.exposureStops).toBe(0.15);
    expect(p.shadows).toBeCloseTo(0.18);
    expect(p.warmth).toBeLessThan(0);
  });
});

describe('adjustRgb (the reference the shader mirrors)', () => {
  it('leaves a pixel alone under neutral params', () => {
    const out = adjustRgb(MID, NEUTRAL_PARAMS);
    out.forEach((v, i) => expect(v).toBeCloseTo(MID[i], 6));
  });

  it('moves each control the way its label says', () => {
    const lum = (c: number[]) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    expect(lum(adjustRgb(MID, { ...NEUTRAL_PARAMS, exposureStops: 1 }))).toBeGreaterThan(lum(MID));
    expect(lum(adjustRgb([0.1, 0.1, 0.1], { ...NEUTRAL_PARAMS, shadows: 1 }))).toBeGreaterThan(0.1);
    expect(lum(adjustRgb([0.95, 0.95, 0.95], { ...NEUTRAL_PARAMS, highlights: -1 }))).toBeLessThan(0.95);
    const warm = adjustRgb(MID, { ...NEUTRAL_PARAMS, warmth: 1 });
    expect(warm[0]).toBeGreaterThan(MID[0]);
    expect(warm[2]).toBeLessThan(MID[2]);
    const grey = adjustRgb(MID, { ...NEUTRAL_PARAMS, saturation: 0 });
    expect(grey[0]).toBeCloseTo(grey[2], 6);
  });

  it('matches sharp linear() for contrast, the pipeline kind', () => {
    // sharp: out = in * c - (c - 1) * 128 on 0..255, i.e. (in - 0.5) * c + 0.5 on 0..1.
    const out = adjustRgb([0.8, 0.8, 0.8], { ...NEUTRAL_PARAMS, contrast: 1.2 });
    expect(out[0]).toBeCloseTo((0.8 * 255 * 1.2 - 0.2 * 128) / 255, 2);
  });

  it('has a CSS fallback that is "none" when nothing changes', () => {
    expect(cssFilterFor(NEUTRAL_PARAMS)).toBe('none');
    expect(cssFilterFor({ ...NEUTRAL_PARAMS, contrast: 1.2, blurPx: 2 })).toBe('contrast(1.200) blur(2px)');
  });
});
