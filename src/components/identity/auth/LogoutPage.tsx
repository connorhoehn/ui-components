import { Button } from '../../ui/Button';

export interface LogoutPageProps {
  onConfirm: () => void;
  onCancel?: () => void;
  clientName?: string;
}

export function LogoutPage({ onConfirm, onCancel, clientName }: LogoutPageProps) {
  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center" role="main" aria-label="Sign out confirmation">
        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#fef2f2] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-800 mb-3 mt-0">Sign Out</h1>
        <p className="text-sm text-slate-500 mb-6 mt-0 leading-relaxed">
          Are you sure you want to sign out
          {clientName ? <> from <strong className="text-slate-800">{clientName}</strong></> : ''}?
          You will need to sign in again to access your account.
        </p>
        <div className="flex gap-3 justify-center">
          {onCancel && (
            <Button variant="ghost" size="lg" fullWidth onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button variant="danger-solid" size="lg" fullWidth onClick={onConfirm}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
