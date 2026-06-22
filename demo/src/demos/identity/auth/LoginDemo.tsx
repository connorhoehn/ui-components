import { useState } from 'react';
import { PageHeader, ExampleBlock } from '../../../shared';
import { LoginPage } from '@connorhoehnslalom/ui-components/identity';

export default function LoginDemo() {
  const [showError, setShowError] = useState(false);

  return (
    <div>
      <PageHeader
        title="Login Page"
        description="Tabbed authentication page supporting sign in, registration, and forgot password flows. Props-driven with async handlers — no internal routing or API calls."
        importPath="import { LoginPage } from '@connorhoehnslalom/ui-components/identity'"
      />

      <ExampleBlock
        id="login-default"
        title="Default"
        description="Full login page with all tabs enabled. Toggle the error state to see inline validation."
        code={`<LoginPage
  uid="demo-uid-12345"
  interactionUrl="/interaction/demo-uid-12345"
  clientName="Acme Application"
  error={showError ? 'Invalid email or password' : null}
  registrationEnabled={true}
  forgotPasswordEnabled={true}
  onLogin={async (email, password) => { ... }}
  onRegister={async (data) => { ... }}
  onForgotPassword={async (email) => { ... }}
/>`}
      >
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            <input type="checkbox" checked={showError} onChange={(e) => setShowError(e.target.checked)} />
            Show error state
          </label>
          <div className="border border-[#e2e8f0] rounded-lg overflow-hidden h-[550px]">
            <LoginPage
              uid="demo-uid-12345"
              interactionUrl="/interaction/demo-uid-12345"
              clientName="Acme Application"
              error={showError ? 'Invalid email or password' : null}
              registrationEnabled={true}
              forgotPasswordEnabled={true}
              onLogin={async (email, password) => {
                await new Promise((r) => setTimeout(r, 1000));
                console.log('[LoginDemo] onLogin:', { email, password });
              }}
              onRegister={async (data) => {
                await new Promise((r) => setTimeout(r, 1000));
                console.log('[LoginDemo] onRegister:', data);
              }}
              onForgotPassword={async (email) => {
                await new Promise((r) => setTimeout(r, 1000));
                console.log('[LoginDemo] onForgotPassword:', email);
              }}
            />
          </div>
        </div>
      </ExampleBlock>

      <ExampleBlock
        id="login-minimal"
        title="Sign-In Only"
        description="With registration and forgot password disabled — only the sign-in tab is shown."
        code={`<LoginPage
  uid="demo-uid"
  interactionUrl="/interaction/demo-uid"
  clientName="Internal Portal"
  registrationEnabled={false}
  forgotPasswordEnabled={false}
  onLogin={async (email, password) => { ... }}
  onRegister={async () => {}}
  onForgotPassword={async () => {}}
/>`}
      >
        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden h-[400px]">
          <LoginPage
            uid="demo-uid"
            interactionUrl="/interaction/demo-uid"
            clientName="Internal Portal"
            registrationEnabled={false}
            forgotPasswordEnabled={false}
            onLogin={async (email, password) => {
              await new Promise((r) => setTimeout(r, 1000));
              console.log('[LoginDemo] onLogin:', { email, password });
            }}
            onRegister={async () => {}}
            onForgotPassword={async () => {}}
          />
        </div>
      </ExampleBlock>
    </div>
  );
}
