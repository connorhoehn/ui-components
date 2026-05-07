import { useState } from 'react';
import Modal from '@/components/shared/Modal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';

export function ModalDemo() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [footerOpen, setFooterOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <section style={{ marginBottom: 48 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Modal</h3>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>
        Accessible dialog with focus trap, backdrop dismiss, and Escape key support.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          onClick={() => setBasicOpen(true)}
          style={btnStyle}
        >
          Open Basic Modal
        </button>
        <button
          onClick={() => setFooterOpen(true)}
          style={btnStyle}
        >
          Modal with Footer
        </button>
        <button
          onClick={() => setConfirmOpen(true)}
          style={{ ...btnStyle, background: '#dc2626' }}
        >
          Confirm Dialog
        </button>
      </div>

      {confirmed && (
        <p style={{ marginTop: 8, fontSize: 13, color: '#16a34a' }}>
          Action confirmed!
        </p>
      )}

      <Modal
        open={basicOpen}
        onClose={() => setBasicOpen(false)}
        title="Basic Modal"
      >
        <p>This is a basic modal with a title and body content. Click the backdrop or press Escape to close.</p>
      </Modal>

      <Modal
        open={footerOpen}
        onClose={() => setFooterOpen(false)}
        title="Save Changes?"
        maxWidth={440}
        footer={
          <>
            <button onClick={() => setFooterOpen(false)} style={cancelBtnStyle}>
              Cancel
            </button>
            <button onClick={() => setFooterOpen(false)} style={primaryBtnStyle}>
              Save
            </button>
          </>
        }
      >
        <p>You have unsaved changes. Would you like to save them before leaving?</p>
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => { setConfirmed(true); setConfirmOpen(false); }}
        title="Delete Item?"
        body="This action cannot be undone. The item will be permanently removed."
        confirmLabel="Delete"
        cancelLabel="Keep"
        tone="destructive"
      />
    </section>
  );
}

const btnStyle: React.CSSProperties = {
  padding: '8px 16px',
  fontSize: 13,
  fontWeight: 500,
  border: 'none',
  borderRadius: 6,
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer',
};

const cancelBtnStyle: React.CSSProperties = {
  padding: '7px 16px',
  fontSize: 13,
  border: '1px solid #e2e8f0',
  background: '#fff',
  color: '#64748b',
  borderRadius: 6,
  cursor: 'pointer',
};

const primaryBtnStyle: React.CSSProperties = {
  padding: '7px 16px',
  fontSize: 13,
  fontWeight: 600,
  border: 'none',
  background: '#2563eb',
  color: '#fff',
  borderRadius: 6,
  cursor: 'pointer',
};
