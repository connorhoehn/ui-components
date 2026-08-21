import { PageHeader, ExampleBlock } from '../../../shared';
import { ConsentPage } from '@connorhoehnslalom/ui-components/identity';

export default function ConsentDemo() {
  return (
    <div>
      <PageHeader
        title="Consent Page"
        description="OAuth/OIDC authorization consent screen. Displays requested scopes and allows the user to authorize or deny the application. Supports optional logo and redirect URI display."
        importPath="import { ConsentPage } from '@connorhoehnslalom/ui-components/identity'"
      />

      <ExampleBlock
        id="consent-default"
        title="Default"
        description="Standard consent page with multiple scopes and a redirect URI."
        code={`<ConsentPage
  clientName="Acme Dashboard"
  scopes={['openid', 'profile', 'email', 'offline_access']}
  redirectUri="https://app.acme.com/callback"
  onAuthorize={async () => { ... }}
  onDeny={async () => { ... }}
/>`}
      >
        <div className="border border-border rounded-lg overflow-hidden h-[520px]">
          <ConsentPage
            clientName="Acme Dashboard"
            scopes={['openid', 'profile', 'email', 'offline_access']}
            redirectUri="https://app.acme.com/callback"
            onAuthorize={async () => {
              await new Promise((r) => setTimeout(r, 800));
              console.log('[ConsentDemo] Authorized');
            }}
            onDeny={async () => {
              await new Promise((r) => setTimeout(r, 500));
              console.log('[ConsentDemo] Denied');
            }}
          />
        </div>
      </ExampleBlock>

      <ExampleBlock
        id="consent-minimal"
        title="Minimal Scopes"
        description="Single-scope consent with a logo and no redirect URI shown."
        code={`<ConsentPage
  clientName="Partner API"
  scopes={['openid']}
  logoUrl="/logo.png"
  onAuthorize={async () => { ... }}
  onDeny={async () => { ... }}
/>`}
      >
        <div className="border border-border rounded-lg overflow-hidden h-[420px]">
          <ConsentPage
            clientName="Partner API"
            scopes={['openid']}
            onAuthorize={async () => {
              await new Promise((r) => setTimeout(r, 800));
              console.log('[ConsentDemo] Authorized');
            }}
            onDeny={async () => {
              await new Promise((r) => setTimeout(r, 500));
              console.log('[ConsentDemo] Denied');
            }}
          />
        </div>
      </ExampleBlock>
    </div>
  );
}
