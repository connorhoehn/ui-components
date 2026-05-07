import { useState } from 'react';
import Banner from '@/components/shared/Banner';

export function BannerDemo() {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const reset = () => setDismissed([]);

  return (
    <section style={{ marginBottom: 48 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Banner</h3>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>
        Alert banners for inline messaging. Four variants with optional dismiss button.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {!dismissed.includes('error') && (
          <Banner
            variant="error"
            title="Error:"
            onDismiss={() => setDismissed(d => [...d, 'error'])}
          >
            Payment failed. Please check your card details and try again.
          </Banner>
        )}

        {!dismissed.includes('warning') && (
          <Banner
            variant="warning"
            title="Warning:"
            onDismiss={() => setDismissed(d => [...d, 'warning'])}
          >
            Your storage is almost full. Consider upgrading your plan.
          </Banner>
        )}

        {!dismissed.includes('info') && (
          <Banner
            variant="info"
            title="Info:"
            onDismiss={() => setDismissed(d => [...d, 'info'])}
          >
            Scheduled maintenance will occur on Saturday at 2:00 AM UTC.
          </Banner>
        )}

        {!dismissed.includes('success') && (
          <Banner
            variant="success"
            title="Success:"
            onDismiss={() => setDismissed(d => [...d, 'success'])}
          >
            Your changes have been saved and deployed.
          </Banner>
        )}
      </div>

      {dismissed.length > 0 && (
        <button onClick={reset} style={resetBtnStyle}>
          Reset Banners
        </button>
      )}
    </section>
  );
}

const resetBtnStyle: React.CSSProperties = {
  marginTop: 12,
  padding: '6px 12px',
  fontSize: 12,
  border: '1px solid #e2e8f0',
  borderRadius: 6,
  background: '#fff',
  color: '#64748b',
  cursor: 'pointer',
};
