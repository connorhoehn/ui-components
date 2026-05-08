import { ConsentPage } from '@connorhoehn/ui-components/identity';

export default function ConsentDemo() {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden h-[600px]">
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
  );
}
