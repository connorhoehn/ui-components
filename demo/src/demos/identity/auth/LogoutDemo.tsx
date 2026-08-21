import { PageHeader, ExampleBlock } from '../../../shared';
import { LogoutPage } from '@connorhoehnslalom/ui-components/identity';

export default function LogoutDemo() {
  return (
    <div>
      <PageHeader
        title="Logout Page"
        description="Sign out confirmation page. Asks the user to confirm before ending their session. Supports optional cancel action and client name display."
        importPath="import { LogoutPage } from '@connorhoehnslalom/ui-components/identity'"
      />

      <ExampleBlock
        id="logout-default"
        title="With Cancel"
        description="Standard logout confirmation with both Cancel and Sign Out actions."
        code={`<LogoutPage
  clientName="Acme Application"
  onConfirm={() => { ... }}
  onCancel={() => { ... }}
/>`}
      >
        <div className="border border-border rounded-lg overflow-hidden h-[380px]">
          <LogoutPage
            clientName="Acme Application"
            onConfirm={() => {
              console.log('[LogoutDemo] Logged out');
            }}
            onCancel={() => {
              console.log('[LogoutDemo] Cancelled');
            }}
          />
        </div>
      </ExampleBlock>

      <ExampleBlock
        id="logout-no-cancel"
        title="Without Cancel"
        description="When no onCancel is provided, only the Sign Out button is shown (e.g. forced logout)."
        code={`<LogoutPage
  onConfirm={() => { ... }}
/>`}
      >
        <div className="border border-border rounded-lg overflow-hidden h-[380px]">
          <LogoutPage
            onConfirm={() => {
              console.log('[LogoutDemo] Logged out');
            }}
          />
        </div>
      </ExampleBlock>
    </div>
  );
}
