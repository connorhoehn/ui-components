import { LogoutPage } from '@connorhoehn/ui-components/identity';

export default function LogoutDemo() {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden h-[400px]">
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
  );
}
