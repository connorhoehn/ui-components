import {
  ExampleBlock,
  PropsTable,
  PageHeader,
  useRegisterToc,
} from '../shared';
import type { TocItem } from '../shared';

const tocItems: TocItem[] = [
  { id: 'toast-basic', label: 'Toast notifications', level: 2 },
  { id: 'toast-actions', label: 'Toast with actions', level: 2 },
  { id: 'banner-variants', label: 'Banner variants', level: 2 },
  { id: 'banner-titled', label: 'Banner with title', level: 2 },
  { id: 'modal-basic', label: 'Modal', level: 2 },
  { id: 'modal-sizes', label: 'Modal sizes', level: 2 },
  { id: 'confirm-dialog', label: 'ConfirmDialog', level: 2 },
  { id: 'props-toast', label: 'Toast props', level: 2 },
  { id: 'props-banner', label: 'Banner props', level: 2 },
  { id: 'props-modal', label: 'Modal props', level: 2 },
  { id: 'props-confirm', label: 'ConfirmDialog props', level: 2 },
];

/* ─── Toast preview helpers ─────────────────────────────────────────────── */

const TOAST_COLORS: Record<string, string> = {
  info: '#2563eb',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

const TOAST_ICONS: Record<string, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

function ToastPreview({
  type,
  message,
  actionLabel,
}: {
  type: string;
  message: string;
  actionLabel?: string;
}) {
  const color = TOAST_COLORS[type];
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderLeft: `4px solid ${color}`,
        borderRadius: 8,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        maxWidth: 380,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <span style={{ fontSize: 16, color, flexShrink: 0 }}>
        {TOAST_ICONS[type]}
      </span>
      <span style={{ fontSize: 14, color: '#374151', flex: 1, lineHeight: 1.4 }}>
        {message}
      </span>
      {actionLabel && (
        <button
          type="button"
          style={{
            background: 'none',
            border: 'none',
            color,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            padding: '2px 6px',
            fontFamily: 'inherit',
          }}
        >
          {actionLabel}
        </button>
      )}
      <button
        type="button"
        style={{
          fontSize: 18,
          color: '#94a3b8',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0 4px',
          lineHeight: 1,
        }}
      >
        &times;
      </button>
    </div>
  );
}

/* ─── Banner preview helper ─────────────────────────────────────────────── */

const BANNER_STYLES: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  error: { bg: '#fef2f2', border: '#fecaca', text: '#991b1b', icon: '✕' },
  warning: { bg: '#fffbeb', border: '#fde68a', text: '#92400e', icon: '⚠' },
  info: { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af', icon: 'ℹ' },
  success: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534', icon: '✓' },
};

function BannerPreview({
  variant,
  message,
  title,
  dismissible = true,
}: {
  variant: string;
  message: string;
  title?: string;
  dismissible?: boolean;
}) {
  const s = BANNER_STYLES[variant];
  return (
    <div
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 8,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        fontSize: 13,
        color: s.text,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
      <div style={{ flex: 1 }}>
        {title && <strong style={{ display: 'block', marginBottom: 2 }}>{title}</strong>}
        <span>{message}</span>
      </div>
      {dismissible && (
        <button
          type="button"
          style={{
            background: 'none',
            border: 'none',
            color: s.text,
            cursor: 'pointer',
            fontSize: 16,
            padding: 0,
            lineHeight: 1,
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
}

/* ─── Modal preview helper ──────────────────────────────────────────────── */

function ModalPreview({
  title,
  body,
  footer,
  maxWidth = 380,
}: {
  title: string;
  body: string;
  footer?: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'rgba(0,0,0,0.25)',
        borderRadius: 8,
        padding: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: '28px 24px',
          maxWidth,
          width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 10 }}>
          {title}
        </div>
        <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{body}</div>
        {footer && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 22 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ConfirmDialog preview helper ──────────────────────────────────────── */

const CONFIRM_COLORS: Record<string, string> = {
  info: '#3b82f6',
  caution: '#d97706',
  destructive: '#dc2626',
};

function ConfirmPreview({
  title,
  body,
  tone,
  confirmLabel,
}: {
  title: string;
  body: string;
  tone: string;
  confirmLabel: string;
}) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'rgba(0,0,0,0.25)',
        borderRadius: 8,
        padding: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 180,
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: '28px 24px',
          maxWidth: 420,
          width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 10 }}>
          {title}
        </div>
        <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 22px', lineHeight: 1.5 }}>
          {body}
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button
            type="button"
            style={{
              padding: '7px 16px',
              fontSize: 13,
              border: '1px solid #e2e8f0',
              background: '#fff',
              color: '#64748b',
              borderRadius: 6,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            style={{
              padding: '7px 16px',
              fontSize: 13,
              fontWeight: 600,
              border: 'none',
              background: CONFIRM_COLORS[tone],
              color: '#fff',
              borderRadius: 6,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────────── */

export default function FeedbackPage() {
  useRegisterToc(tocItems);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <PageHeader
        title="Feedback"
        description="Components for communicating system state and user actions: toast notifications, inline banners, modals, and confirmation dialogs."
        importPath="import { Toast, Banner, Modal, ConfirmDialog } from '@acme/ui-components'"
      />

      {/* ─── Toast Basic ─────────────────────────────────────────────── */}
      <ExampleBlock
        id="toast-basic"
        title="Toast notifications"
        description="Ephemeral notifications that appear in the corner of the viewport. Available types: info, success, warning, and error, each with a distinct accent color."
        code={`import { useToast } from '@acme/ui-components';

function MyComponent() {
  const { toast } = useToast();

  return (
    <>
      <button onClick={() => toast('File uploaded.', { type: 'success' })}>
        Success
      </button>
      <button onClick={() => toast('Connection lost.', { type: 'error' })}>
        Error
      </button>
    </>
  );
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ToastPreview type="info" message="A new version is available." />
          <ToastPreview type="success" message="Changes saved successfully." />
          <ToastPreview type="warning" message="Your session will expire in 5 minutes." />
          <ToastPreview type="error" message="Failed to connect to the server." />
        </div>
      </ExampleBlock>

      {/* ─── Toast Actions ───────────────────────────────────────────── */}
      <ExampleBlock
        id="toast-actions"
        title="Toast with actions"
        description="Toasts can include an action button that allows the user to take immediate follow-up action, such as undoing or viewing a result."
        code={`const { toast } = useToast();

toast('Message archived.', {
  type: 'info',
  actionLabel: 'Undo',
  onAction: () => restoreMessage(),
});

toast('Deployment complete.', {
  type: 'success',
  actionLabel: 'View',
  onAction: () => navigate('/deployments'),
});`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ToastPreview type="info" message="Message archived." actionLabel="Undo" />
          <ToastPreview type="success" message="Deployment complete." actionLabel="View" />
        </div>
      </ExampleBlock>

      {/* ─── Banner Variants ─────────────────────────────────────────── */}
      <ExampleBlock
        id="banner-variants"
        title="Banner variants"
        description="Full-width inline banners for persistent status messages. Available variants: error, warning, info, and success."
        code={`<Banner variant="error" onDismiss={handleDismiss}>
  Payment method declined. Please update your billing info.
</Banner>

<Banner variant="warning" onDismiss={handleDismiss}>
  Storage usage is above 90%.
</Banner>

<Banner variant="info" onDismiss={handleDismiss}>
  Scheduled maintenance tonight at 11 PM UTC.
</Banner>

<Banner variant="success" onDismiss={handleDismiss}>
  All systems operational.
</Banner>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <BannerPreview variant="error" message="Payment method declined. Please update your billing info." />
          <BannerPreview variant="warning" message="Storage usage is above 90%." />
          <BannerPreview variant="info" message="Scheduled maintenance tonight at 11 PM UTC." />
          <BannerPreview variant="success" message="All systems operational." />
        </div>
      </ExampleBlock>

      {/* ─── Banner with Title ───────────────────────────────────────── */}
      <ExampleBlock
        id="banner-titled"
        title="Banner with title"
        description="Banners support an optional bold title line above the message for added emphasis."
        code={`<Banner variant="error" title="Sync Failed">
  Unable to sync changes. Check your network and retry.
</Banner>

<Banner variant="warning" title="Deprecation Notice">
  API v1 will be retired on March 1, 2027.
</Banner>

<Banner variant="info" title="New Feature" dismissible={false}>
  Try our new keyboard shortcuts for faster navigation.
</Banner>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <BannerPreview
            variant="error"
            title="Sync Failed"
            message="Unable to sync changes. Check your network and retry."
          />
          <BannerPreview
            variant="warning"
            title="Deprecation Notice"
            message="API v1 will be retired on March 1, 2027."
          />
          <BannerPreview
            variant="info"
            title="New Feature"
            message="Try our new keyboard shortcuts for faster navigation."
            dismissible={false}
          />
        </div>
      </ExampleBlock>

      {/* ─── Modal Basic ─────────────────────────────────────────────── */}
      <ExampleBlock
        id="modal-basic"
        title="Modal"
        description="A portal-based modal with focus trap, Escape to close, and backdrop click dismissal. Supports title, body content, and optional footer actions."
        code={`const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Edit Profile"
  footer={
    <>
      <button onClick={() => setOpen(false)}>Cancel</button>
      <button onClick={handleSave}>Save Changes</button>
    </>
  }
>
  <p>Update your profile information below.</p>
  <input placeholder="Display name" />
</Modal>`}
      >
        <ModalPreview
          title="Edit Profile"
          body="Update your profile information below. Changes will be visible to other team members immediately."
          footer={
            <>
              <button
                type="button"
                style={{
                  padding: '7px 16px',
                  fontSize: 13,
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  color: '#64748b',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                style={{
                  padding: '7px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  border: 'none',
                  background: '#3b82f6',
                  color: '#fff',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Save Changes
              </button>
            </>
          }
        />
      </ExampleBlock>

      {/* ─── Modal Sizes ─────────────────────────────────────────────── */}
      <ExampleBlock
        id="modal-sizes"
        title="Modal sizes"
        description="Control modal width with the maxWidth prop. Common sizes: small (400px), medium (560px), and large (720px)."
        code={`<Modal open={open} onClose={close} title="Small" maxWidth={400}>
  <p>Compact dialogs for simple confirmations.</p>
</Modal>

<Modal open={open} onClose={close} title="Medium" maxWidth={560}>
  <p>Default size for forms and content.</p>
</Modal>

<Modal open={open} onClose={close} title="Large" maxWidth={720}>
  <p>Wide layout for complex content or tables.</p>
</Modal>`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {[
            { label: 'Small (400px)', width: 180 },
            { label: 'Medium (560px)', width: 240 },
            { label: 'Large (720px)', width: 300 },
          ].map(({ label, width }) => (
            <div
              key={label}
              style={{
                width,
                border: '2px dashed #cbd5e1',
                borderRadius: 12,
                padding: '20px 16px',
                textAlign: 'center',
                background: '#fff',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>
                {label}
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>Modal container</div>
            </div>
          ))}
        </div>
      </ExampleBlock>

      {/* ─── ConfirmDialog ───────────────────────────────────────────── */}
      <ExampleBlock
        id="confirm-dialog"
        title="ConfirmDialog"
        description="A specialized modal for confirming user actions. Supports three tones: info (primary blue), caution (amber), and destructive (red) to indicate severity."
        code={`<ConfirmDialog
  open={open}
  onConfirm={handleDelete}
  onCancel={() => setOpen(false)}
  title="Delete Project"
  body="This will permanently remove the project and all its data."
  confirmLabel="Delete"
  tone="destructive"
/>

<ConfirmDialog
  open={open}
  onConfirm={handleArchive}
  onCancel={() => setOpen(false)}
  title="Archive Channel"
  body="Members will no longer be able to post messages."
  confirmLabel="Archive"
  tone="caution"
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ConfirmPreview
            title="Publish Changes"
            body="This will deploy your changes to production immediately."
            tone="info"
            confirmLabel="Publish"
          />
          <ConfirmPreview
            title="Archive Channel"
            body="Members will no longer be able to post messages in this channel."
            tone="caution"
            confirmLabel="Archive"
          />
          <ConfirmPreview
            title="Delete Project"
            body="This will permanently remove the project and all associated data. This action cannot be undone."
            tone="destructive"
            confirmLabel="Delete"
          />
        </div>
      </ExampleBlock>

      {/* ─── Props Tables ────────────────────────────────────────────── */}
      <div id="props-toast">
        <PropsTable
          componentName="Toast"
          props={[
            { name: 'type', type: "'info' | 'success' | 'warning' | 'error'", required: true, description: 'Visual style and accent color of the toast' },
            { name: 'message', type: 'string', required: true, description: 'Text content displayed in the toast' },
            { name: 'actionLabel', type: 'string', description: 'Label for an optional action button' },
            { name: 'onAction', type: '() => void', description: 'Callback when the action button is clicked' },
            { name: 'onDismiss', type: '(id: string) => void', required: true, description: 'Callback when the toast is dismissed' },
            { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss delay in milliseconds' },
            { name: 'position', type: "'top-right' | 'bottom-right'", default: "'top-right'", description: 'Screen corner where the toast appears' },
          ]}
        />
      </div>

      <div id="props-banner">
        <PropsTable
          componentName="Banner"
          props={[
            { name: 'variant', type: "'error' | 'warning' | 'info' | 'success'", default: "'error'", description: 'Visual style and color scheme of the banner' },
            { name: 'title', type: 'string', description: 'Bold prefix label shown before the message' },
            { name: 'children', type: 'ReactNode', description: 'Banner body content (message text)' },
            { name: 'onDismiss', type: '() => void', description: 'Callback when dismiss button is clicked. Omit to hide the dismiss button.' },
            { name: 'style', type: 'CSSProperties', description: 'Additional inline styles for the banner container' },
          ]}
        />
      </div>

      <div id="props-modal">
        <PropsTable
          componentName="Modal"
          props={[
            { name: 'open', type: 'boolean', required: true, description: 'Whether the modal is visible' },
            { name: 'onClose', type: '() => void', required: true, description: 'Called on backdrop click, Escape key, or close action' },
            { name: 'title', type: 'string', description: 'Header text displayed at the top of the modal' },
            { name: 'maxWidth', type: 'number', default: '380', description: 'Maximum width of the modal card in pixels' },
            { name: 'children', type: 'ReactNode', required: true, description: 'Body content of the modal' },
            { name: 'footer', type: 'ReactNode', description: 'Footer content, typically action buttons, aligned to the right' },
          ]}
        />
      </div>

      <div id="props-confirm">
        <PropsTable
          componentName="ConfirmDialog"
          props={[
            { name: 'open', type: 'boolean', required: true, description: 'Whether the dialog is visible' },
            { name: 'onConfirm', type: '() => void', required: true, description: 'Called when the confirm button is clicked' },
            { name: 'onCancel', type: '() => void', required: true, description: 'Called when cancel is clicked or dialog is dismissed' },
            { name: 'title', type: 'string', description: 'Header text for the confirmation dialog' },
            { name: 'body', type: 'string', description: 'Descriptive message explaining the action' },
            { name: 'tone', type: "'destructive' | 'caution' | 'info'", default: "'info'", description: 'Visual tone of the confirm button' },
            { name: 'confirmLabel', type: 'string', default: "'Confirm'", description: 'Label text for the confirm button' },
          ]}
        />
      </div>
    </div>
  );
}
