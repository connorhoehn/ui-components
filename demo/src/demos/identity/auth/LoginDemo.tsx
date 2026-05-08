import { useState } from 'react';
import { LoginPage } from '@connorhoehn/ui-components/identity';

export default function LoginDemo() {
  const [showError, setShowError] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 p-3 bg-white border border-gray-200 rounded-md">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={showError} onChange={(e) => setShowError(e.target.checked)} />
          Show error state
        </label>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden h-[650px]">
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
  );
}
