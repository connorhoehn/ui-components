// Compile the consuming app's exact native SDK, not a hand-restated call.
// A weak media overlap used to collapse generic inference to CallBlockCall,
// losing the SDK's invite/device fields even though runtime was unchanged.
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const require = createRequire(import.meta.url);
const sdk = process.env.UI_CONSUMER_VIDEO_MODULE ?? require.resolve('@connorhoehn/realtime-modules/client/video');
const host = process.env.UI_CONSUMER_HOST_MODULE ?? resolve(root, 'src/integrations/realtime/CallBlockHost');

describe('CallBlockHost exact native consumer declaration', () => {
  it('preserves the native device and invitation result through the generic host', () => {
    const dir = mkdtempSync(resolve(tmpdir(), 'call-block-consumer-types-'));
    try {
      writeFileSync(resolve(dir, 'consumer.ts'), `
        import * as video from ${JSON.stringify(sdk)};
        import { createCallBlockHost } from ${JSON.stringify(host)};
        const calls = createCallBlockHost(video);
        type Call = NonNullable<ReturnType<typeof calls.useCallHost>>['call'];
        export function check(call: Call) {
          const error: string | null = call.media.error;
          const kind: MediaDeviceKind | undefined = call.devices.list.microphones[0]?.kind;
          const invitation = call.inviteUsers([{ userId: 'other-user' }]);
          const requests = call.invitationRequests;
          const invitationError: string | null = call.invitationError;
          const nativeCall: Parameters<typeof video.conversationCallDockProps>[0] = call;
          return { error, kind, invitation, requests, invitationError, nativeCall };
        }
      `);
      // Files are absolute: imports resolve through the installed SDK and host,
      // while compiler type roots are explicitly the library's installed roots.
      writeFileSync(resolve(dir, 'tsconfig.json'), JSON.stringify({
        extends: resolve(root, 'tsconfig.json'),
        compilerOptions: { typeRoots: [resolve(require.resolve('@types/react/package.json'), '..', '..')], types: [], noEmit: true, paths: { react: [resolve(require.resolve('@types/react/package.json'), '..', 'index.d.ts')], 'react/jsx-runtime': [resolve(require.resolve('@types/react/package.json'), '..', 'jsx-runtime.d.ts')] } },
        include: [], files: [resolve(dir, 'consumer.ts')],
      }));
      const result = spawnSync(process.execPath, [resolve(root, 'scripts/tsc.mjs'), '--project', resolve(dir, 'tsconfig.json')], { cwd: root, encoding: 'utf8', timeout: 45_000 });
      expect(result.error, result.error?.message).toBeUndefined();
      expect(result.status, result.stdout + result.stderr).toBe(0);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  }, 50_000);
});
