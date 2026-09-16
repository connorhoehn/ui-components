import { describe, it, expect } from 'vitest';
import * as barrel from '../index';

/**
 * `src/components/shared/index.ts` is the barrel every build entry (the
 * `shared` bundle, and the root bundle via `src/index.ts`'s `export *`)
 * is built from. A symbol can be exported, documented and unit-tested
 * against its own component file and still never leave the package if the
 * barrel omits it — exactly what happened to `activeNavItemClassName` /
 * `inactiveNavItemClassName` in 2.275.0: both existed in `SubNavLayout.tsx`
 * and passed `SubNavLayout.test.tsx` (which imports the component file
 * directly), but the barrel re-exported only `{ SubNavLayout,
 * activeNavItemStyle }`, so neither reached a consumer's import.
 *
 * This test imports the barrel itself, the way `src/index.ts` and a real
 * consumer do, so a future symbol that ships in the component but not the
 * barrel fails here instead of shipping silently.
 */
describe('shared barrel export surface', () => {
  it('exports SubNavLayout and its style/className helpers', () => {
    expect(typeof barrel.SubNavLayout).toBe('function');
    expect(barrel.activeNavItemStyle).toBeTruthy();
    expect(typeof barrel.activeNavItemClassName).toBe('string');
    expect(typeof barrel.inactiveNavItemClassName).toBe('string');
    expect(barrel.activeNavItemClassName).not.toBe(barrel.inactiveNavItemClassName);
  });
});
