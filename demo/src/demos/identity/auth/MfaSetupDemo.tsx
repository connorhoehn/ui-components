import { MfaSetupPage } from '@connorhoehn/ui-components/identity';

export default function MfaSetupDemo() {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden h-[600px]">
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
  );
}
