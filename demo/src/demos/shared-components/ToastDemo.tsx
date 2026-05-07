import { ToastProvider, useToast } from '@/components/shared/ToastProvider';

function ToastButtons() {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button
        onClick={() => toast('File saved successfully.', { type: 'success' })}
        style={{ ...btnStyle, background: '#16a34a' }}
      >
        Success Toast
      </button>
      <button
        onClick={() => toast('Something went wrong. Please try again.', { type: 'error' })}
        style={{ ...btnStyle, background: '#dc2626' }}
      >
        Error Toast
      </button>
      <button
        onClick={() => toast('Your session will expire in 5 minutes.', { type: 'warning' })}
        style={{ ...btnStyle, background: '#d97706' }}
      >
        Warning Toast
      </button>
      <button
        onClick={() => toast('A new version is available.', { type: 'info' })}
        style={{ ...btnStyle, background: '#2563eb' }}
      >
        Info Toast
      </button>
      <button
        onClick={() => toast('Item moved to trash.', {
          type: 'info',
          actionLabel: 'Undo',
          onAction: () => alert('Undo clicked!'),
        })}
        style={{ ...btnStyle, background: '#64748b' }}
      >
        Toast with Action
      </button>
    </div>
  );
}

export function ToastDemo() {
  return (
    <section style={{ marginBottom: 48 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Toast Notifications</h3>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>
        Auto-dismissing notifications with slide-in animation. Supports success, error, warning, and info types.
      </p>

      <ToastProvider>
        <ToastButtons />
      </ToastProvider>
    </section>
  );
}

const btnStyle: React.CSSProperties = {
  padding: '8px 16px',
  fontSize: 13,
  fontWeight: 500,
  border: 'none',
  borderRadius: 6,
  color: '#fff',
  cursor: 'pointer',
};
