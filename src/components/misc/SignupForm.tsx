// frontend/src/components/SignupForm.tsx
import { useState } from 'react';
import { cn } from '../../lib/cn';

export interface SignupFormProps {
  status: 'loading' | 'unauthenticated' | 'authenticated';
  error: string | null;
  onSignUp: (email: string, password: string) => Promise<void>;
  onSwitchToLogin: () => void;
}

export function SignupForm({ status, error, onSignUp, onSwitchToLogin }: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const isLoading = status === 'loading';

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalError(null);
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    onSignUp(email, password);
  }

  const displayedError = localError ?? error;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-surface-panel font-sans">
      {/* Brand header */}
      <div className="mb-6 text-center">
        <div className="text-xl font-bold text-text-primary font-sans tracking-tight">
          WebSocket Gateway
        </div>
      </div>

      {/* Card */}
      <div className="bg-surface border border-[#e5e7eb] rounded-xl p-8 max-w-[400px] w-full shadow-sm">
        <h2 className="font-sans font-semibold mt-0 mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            disabled={isLoading}
            className="w-full p-2 border border-border-field rounded font-mono text-sm box-border"
          />

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            disabled={isLoading}
            className="w-full p-2 border border-border-field rounded font-mono text-sm box-border"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            disabled={isLoading}
            className="w-full p-2 border border-border-field rounded font-mono text-sm box-border"
          />

          {displayedError !== null && (
            <p className="text-danger text-sm m-0">{displayedError}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              'bg-[#2563eb] text-white px-4 py-2 rounded border-none w-full font-sans text-sm',
              isLoading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer opacity-100'
            )}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="bg-none border-none text-[#2563eb] cursor-pointer underline font-sans text-sm"
          >
            Already have an account?
          </button>
        </div>
      </div>
    </div>
  );
}
