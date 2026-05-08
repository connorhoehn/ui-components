import { PageHeader, ExampleBlock } from '../../../shared';
import { MfaSetupPage } from '@connorhoehn/ui-components/identity';

export default function MfaSetupDemo() {
  return (
    <div>
      <PageHeader
        title="MFA Setup Page"
        description="Multi-step wizard for setting up TOTP-based multi-factor authentication. Guides the user through naming their device, scanning a QR code, verifying, and saving backup codes."
        importPath="import { MfaSetupPage } from '@connorhoehn/ui-components/identity'"
      />

      <ExampleBlock
        id="mfa-setup-default"
        title="Full Setup Flow"
        description="Walk through all four steps: name device → scan QR → verify code → save backup codes."
        code={`<MfaSetupPage
  userEmail="alice@acme.com"
  onSetup={async (deviceName) => ({
    deviceId: 'dev-001',
    qrCode: 'data:image/png;base64,...',
    secret: 'JBSWY3DPEHPK3PXP',
    backupCodes: ['ABC12345', 'DEF67890', ...],
  })}
  onVerify={async (deviceId, code) => ({ success: true })}
  onComplete={() => { ... }}
/>`}
      >
        <div className="border border-border rounded-lg overflow-hidden h-[560px]">
          <MfaSetupPage
            userEmail="alice@acme.com"
            onSetup={async (deviceName) => {
              await new Promise((r) => setTimeout(r, 1000));
              console.log('[MfaSetupDemo] Setup device:', deviceName);
              return {
                deviceId: 'dev-mock-001',
                qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
                secret: 'JBSWY3DPEHPK3PXP',
                backupCodes: ['ABC12345', 'DEF67890', 'GHI11223', 'JKL44556'],
              };
            }}
            onVerify={async (deviceId, code) => {
              await new Promise((r) => setTimeout(r, 800));
              console.log('[MfaSetupDemo] Verify:', { deviceId, code });
              return { success: true, backupCodes: ['ABC12345', 'DEF67890', 'GHI11223', 'JKL44556'] };
            }}
            onComplete={() => {
              console.log('[MfaSetupDemo] Complete');
            }}
          />
        </div>
      </ExampleBlock>
    </div>
  );
}
