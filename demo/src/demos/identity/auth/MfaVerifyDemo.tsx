import { PageHeader, ExampleBlock } from '../../../shared';
import { MfaVerifyPage } from '@connorhoehnslalom/ui-components/identity';

export default function MfaVerifyDemo() {
  return (
    <div>
      <PageHeader
        title="MFA Verify Page"
        description="Multi-factor authentication verification page. Supports both TOTP (authenticator app) code entry and backup code fallback with mode switching."
        importPath="import { MfaVerifyPage } from '@connorhoehnslalom/ui-components/identity'"
      />

      <ExampleBlock
        id="mfa-verify-default"
        title="TOTP Verification"
        description="The default view presents a 6-digit code input that auto-submits on completion."
        code={`<MfaVerifyPage
  error={null}
  onVerify={async (code) => { ... }}
  onVerifyBackup={async (code) => { ... }}
/>`}
      >
        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden h-[480px]">
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
      </ExampleBlock>

      <ExampleBlock
        id="mfa-verify-error"
        title="With Error"
        description="Error state shown when verification fails."
        code={`<MfaVerifyPage
  error="Invalid verification code. Please try again."
  onVerify={async (code) => { ... }}
  onVerifyBackup={async (code) => { ... }}
/>`}
      >
        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden h-[520px]">
          <MfaVerifyPage
            error="Invalid verification code. Please try again."
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
      </ExampleBlock>
    </div>
  );
}
