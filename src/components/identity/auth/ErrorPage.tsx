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
// Styles
// ---------------------------------------------------------------------------

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--ui-spacingLg)',
    background: 'var(--ui-surfaceAlt)',
  } as React.CSSProperties,
  card: {
    width: '100%',
    maxWidth: 420,
    background: 'var(--ui-surface)',
    borderRadius: 'var(--ui-radiusMd)',
    boxShadow: 'var(--ui-shadowMd)',
    padding: 'var(--ui-spacingLg)',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  indicator: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: 'color-mix(in srgb, var(--ui-danger) 12%, transparent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto var(--ui-spacingMd)',
    fontSize: 24,
    color: 'var(--ui-danger)',
    fontWeight: 700,
  } as React.CSSProperties,
  heading: {
    fontSize: 'var(--ui-fontSizeLg)',
    fontWeight: 600,
    color: 'var(--ui-textPrimary)',
    margin: '0 0 var(--ui-spacingSm)',
  } as React.CSSProperties,
  message: {
    fontSize: 'var(--ui-fontSizeMd)',
    color: 'var(--ui-textSecondary)',
    margin: '0 0 var(--ui-spacingSm)',
    lineHeight: 1.5,
  } as React.CSSProperties,
  errorCode: {
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textMuted)',
    fontFamily: 'monospace',
    margin: '0 0 var(--ui-spacingMd)',
    padding: '6px 12px',
    background: 'var(--ui-surfaceAlt)',
    borderRadius: 'var(--ui-radiusSm)',
    display: 'inline-block',
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    gap: 'var(--ui-spacingSm)',
    justifyContent: 'center',
    marginTop: 'var(--ui-spacingMd)',
  } as React.CSSProperties,
  primaryButton: {
    padding: '12px 24px',
    fontSize: 'var(--ui-fontSizeMd)',
    fontWeight: 600,
    background: 'var(--ui-primary)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--ui-radiusSm)',
    cursor: 'pointer',
    fontFamily: 'inherit',
  } as React.CSSProperties,
  secondaryButton: {
    padding: '12px 24px',
    fontSize: 'var(--ui-fontSizeMd)',
    fontWeight: 500,
    background: 'var(--ui-surface)',
    color: 'var(--ui-textSecondary)',
    border: '1px solid var(--ui-border)',
    borderRadius: 'var(--ui-radiusSm)',
    cursor: 'pointer',
    fontFamily: 'inherit',
  } as React.CSSProperties,
};

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
    <div style={styles.page}>
      <div style={styles.card} role="main" aria-label="Error">
        <div style={styles.indicator} aria-hidden="true">!</div>
        <h1 style={styles.heading}>{title}</h1>
        <p style={styles.message}>{message}</p>
        {error && <code style={styles.errorCode}>{error}</code>}

        {(onRetry || onBack) && (
          <div style={styles.actions}>
            {onBack && (
              <button type="button" style={styles.secondaryButton} onClick={onBack}>
                Go Back
              </button>
            )}
            {onRetry && (
              <button type="button" style={styles.primaryButton} onClick={onRetry}>
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
