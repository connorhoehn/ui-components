// src/components/identity/auth/LogoutPage.tsx
//
// Simple logout confirmation page.

export interface LogoutPageProps {
  onConfirm: () => void;
  onCancel?: () => void;
  clientName?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function LogoutPage({ onConfirm, onCancel, clientName }: LogoutPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-panel">
      <div className="w-full max-w-[400px] bg-surface rounded-md shadow-md p-6 text-center" role="main" aria-label="Sign out confirmation">
        <h1 className="text-lg font-semibold text-text-primary mb-2 mt-0">Sign Out</h1>
        <p className="text-sm text-text-secondary mb-4 mt-0">
          Are you sure you want to sign out
          {clientName ? ` from ${clientName}` : ''}?
        </p>
        <div className="flex gap-2 justify-center">
          {onCancel && (
            <button
              type="button"
              className="px-6 py-3 text-sm font-medium bg-surface text-text-secondary border border-border rounded-sm cursor-pointer font-[inherit]"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            className="px-6 py-3 text-sm font-semibold bg-danger text-white border-none rounded-sm cursor-pointer font-[inherit]"
            onClick={onConfirm}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
