// src/components/identity/auth/ErrorPage.tsx
//
// Generic error page with optional retry/back actions.

export interface ErrorPageProps {
  title?: string;
  message: string;
  error?: string;
  onRetry?: () => void;
  onBack?: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ErrorPage({
  title = 'Something went wrong',
  message,
  error,
  onRetry,
  onBack,
}: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-panel">
      <div className="w-full max-w-[420px] bg-surface rounded-md shadow-md p-6 text-center" role="main" aria-label="Error">
        <div
          className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4 text-2xl text-danger font-bold"
          aria-hidden="true"
        >
          !
        </div>
        <h1 className="text-lg font-semibold text-text-primary mb-2 mt-0">{title}</h1>
        <p className="text-sm text-text-secondary mb-2 mt-0 leading-relaxed">{message}</p>
        {error && (
          <code className="text-xs text-text-tertiary font-mono mb-4 px-3 py-1.5 bg-surface-panel rounded-sm inline-block">
            {error}
          </code>
        )}

        {(onRetry || onBack) && (
          <div className="flex gap-2 justify-center mt-4">
            {onBack && (
              <button
                type="button"
                className="px-6 py-3 text-sm font-medium bg-surface text-text-secondary border border-border rounded-sm cursor-pointer font-[inherit]"
                onClick={onBack}
              >
                Go Back
              </button>
            )}
            {onRetry && (
              <button
                type="button"
                className="px-6 py-3 text-sm font-semibold bg-primary text-white border-none rounded-sm cursor-pointer font-[inherit]"
                onClick={onRetry}
              >
                Try Again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;
