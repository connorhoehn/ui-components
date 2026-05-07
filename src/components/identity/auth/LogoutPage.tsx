// src/components/identity/auth/LogoutPage.tsx
//
// Simple logout confirmation page.

export interface LogoutPageProps {
  onConfirm: () => void;
  onCancel?: () => void;
  clientName?: string;
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
    maxWidth: 400,
    background: 'var(--ui-surface)',
    borderRadius: 'var(--ui-radiusMd)',
    boxShadow: 'var(--ui-shadowMd)',
    padding: 'var(--ui-spacingLg)',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  heading: {
    fontSize: 'var(--ui-fontSizeLg)',
    fontWeight: 600,
    color: 'var(--ui-textPrimary)',
    margin: '0 0 var(--ui-spacingSm)',
  } as React.CSSProperties,
  description: {
    fontSize: 'var(--ui-fontSizeSm)',
    color: 'var(--ui-textSecondary)',
    margin: '0 0 var(--ui-spacingMd)',
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    gap: 'var(--ui-spacingSm)',
    justifyContent: 'center',
  } as React.CSSProperties,
  primaryButton: {
    padding: '12px 24px',
    fontSize: 'var(--ui-fontSizeMd)',
    fontWeight: 600,
    background: 'var(--ui-danger)',
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

export function LogoutPage({ onConfirm, onCancel, clientName }: LogoutPageProps) {
  return (
    <div style={styles.page}>
      <div style={styles.card} role="main" aria-label="Sign out confirmation">
        <h1 style={styles.heading}>Sign Out</h1>
        <p style={styles.description}>
          Are you sure you want to sign out
          {clientName ? ` from ${clientName}` : ''}?
        </p>
        <div style={styles.actions}>
          {onCancel && (
            <button type="button" style={styles.secondaryButton} onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="button" style={styles.primaryButton} onClick={onConfirm}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
