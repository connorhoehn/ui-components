import { Button } from '../../ui/Button';

export interface ErrorPageProps {
  title?: string;
  message: string;
  error?: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export function ErrorPage({
  title = 'Something went wrong',
  message,
  error,
  onRetry,
  onBack,
}: ErrorPageProps) {
  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-surface-panel">
      <div className="w-full max-w-[420px] bg-surface rounded-xl shadow-md p-8 text-center" role="main" aria-label="Error">
        <div className="w-14 h-14 rounded-full bg-danger-bg flex items-center justify-center mx-auto mb-5" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-text-primary mb-3 mt-0">{title}</h1>
        <p className="text-sm text-text-secondary mb-3 mt-0 leading-relaxed">{message}</p>
        {error && (
          <code className="text-[11px] text-text-tertiary font-mono mb-5 px-3.5 py-2 bg-surface-panel border border-border rounded-md inline-block max-w-full overflow-x-auto">
            {error}
          </code>
        )}

        {(onRetry || onBack) && (
          <div className="flex gap-3 justify-center mt-6">
            {onBack && (
              <Button variant="ghost" size="lg" onClick={onBack}>
                Go Back
              </Button>
            )}
            {onRetry && (
              <Button variant="primary" size="lg" onClick={onRetry}>
                Try Again
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;
