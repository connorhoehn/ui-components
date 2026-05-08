import { MfaVerifyPage } from '@connorhoehn/ui-components/identity';

export default function MfaVerifyDemo() {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden h-[500px]">
      <MfaVerifyPage
        error={null}
        onVerify={async (code) => {
          await new Promise((r) => setTimeout(r, 800));
          console.log('[MfaVerifyDemo] Code entered:', code);
        }}
        onVerifyBackup={async (code) => {
          await new Promise((r) => setTimeout(r, 800));
          console.log('[MfaVerifyDemo] Backup code:', code);
        }}
      />
    </div>
  );
}
