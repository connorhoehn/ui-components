// Stub for the optional `hls.js` peer dep, used only by Vitest.
//
// `vite.config.ts` externalizes `hls.js` for the library build (consumer
// apps install it themselves). Vitest, however, statically analyses
// dynamic imports and balks if the package isn't resolvable — even with
// `/* @vite-ignore */`. `vitest.config.ts` aliases `hls.js` to this file
// so test runs of `RecordingPlayer` (and anything else that defers to
// hls.js at runtime) load a no-op shim instead.
//
// Tests that exercise the Safari-native-HLS branch never reach the hls.js
// codepath at all; tests that need to exercise the hls.js branch can
// override module-level mocks on top of this stub.

class HlsStub {
  static isSupported(): boolean {
    return false;
  }
  static Events = {
    MEDIA_ATTACHED: 'media-attached',
    ERROR: 'error',
  } as const;

  attachMedia(_el: HTMLMediaElement): void {}
  loadSource(_url: string): void {}
  destroy(): void {}
  on(_event: string, _handler: (...args: unknown[]) => void): void {}
}

export default HlsStub;
