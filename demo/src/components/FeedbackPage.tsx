import { useState } from 'react';
import {
  Banner,
  Button,
  Modal,
  Toast,
  type BannerVariant,
  type ToastType,
} from '@connorhoehnslalom/ui-components/shared';
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

const TOAST_TONE: Record<string, { accent: string; iconColor: string; actionText: string }> = {
  info: { accent: 'border-l-info', iconColor: 'text-info-fg', actionText: 'text-info-fg' },
  success: { accent: 'border-l-success', iconColor: 'text-success-fg', actionText: 'text-success-fg' },
  warning: { accent: 'border-l-warning', iconColor: 'text-warning-fg', actionText: 'text-warning-fg' },
  error: { accent: 'border-l-danger', iconColor: 'text-danger-fg', actionText: 'text-danger-fg' },
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
  type: ToastType;
  message: string;
  actionLabel?: string;
}) {
  // The real component. This used to be a hand-rolled div that mimicked it,
  // which meant the showcase could drift from the thing it documents — and the
  // interaction tests had nothing real to drive.
  return (
    <div className="max-w-[380px]">
      <Toast
        id={`preview-${type}-${message}`}
        type={type}
        message={message}
        actionLabel={actionLabel}
        onAction={() => {}}
        onDismiss={() => {}}
      />
    </div>
  );
}

/* ─── Banner preview helper ─────────────────────────────────────────────── */

const BANNER_STYLES: Record<string, { wrapper: string; icon: string }> = {
  error: { wrapper: 'bg-danger-bg border-danger-border text-danger-fg', icon: '✕' },
  warning: { wrapper: 'bg-warning-bg border-warning-border text-warning-fg', icon: '⚠' },
  info: { wrapper: 'bg-info-bg border-info-border text-info-fg', icon: 'ℹ' },
  success: { wrapper: 'bg-success-bg border-success-border text-success-fg', icon: '✓' },
};

function BannerPreview({
  variant,
  message,
  title,
  dismissible = true,
}: {
  variant: BannerVariant;
  message: string;
  title?: string;
  dismissible?: boolean;
}) {
  const [shown, setShown] = useState(true);
  if (!shown) {
    return (
      <button
        type="button"
        onClick={() => setShown(true)}
        className="text-[12px] text-primary underline bg-transparent border-none cursor-pointer p-0 text-left"
      >
        Dismissed — restore this banner
      </button>
    );
  }
  return (
    <Banner
      variant={variant}
      title={title}
      onDismiss={dismissible ? () => setShown(false) : undefined}
    >
      {message}
    </Banner>
  );
}

/* ─── Modal preview helper ──────────────────────────────────────────────── */

function ModalPreview({
  title,
  body,
  footer,
}: {
  title: string;
  body: string;
  footer?: React.ReactNode;
}) {
  // A trigger + the real <Modal>, rather than a div dressed up to look like
  // one. A modal is an overlay; rendering a fake inline copy meant the page
  // documented markup the component does not produce, and nothing here could
  // actually be opened, focus-trapped or dismissed with Escape.
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        Open “{title}”
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title={title} footer={footer}>
        <p className="m-0 text-[13px] leading-normal text-neutral">{body}</p>
      </Modal>
    </>
  );
}

/* ─── ConfirmDialog preview helper ──────────────────────────────────────── */

const CONFIRM_BTN: Record<string, string> = {
  info: 'bg-info hover:bg-info',
  caution: 'bg-warning hover:bg-warning',
  destructive: 'bg-danger hover:bg-danger',
};

const MODAL_BTN_BASE =
  'px-4 py-1.5 text-[13px] rounded-md cursor-pointer font-[inherit] border-none';
const MODAL_BTN_CANCEL =
  'px-4 py-1.5 text-[13px] rounded-md cursor-pointer font-[inherit] border border-border bg-white text-neutral';

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
    <div className="relative bg-black/25 rounded-lg p-6 flex items-center justify-center min-h-[180px]">
      <div className="bg-white rounded-xl px-6 py-7 max-w-[420px] w-full shadow-lg">
        <div className="text-base font-semibold text-text-primary mb-2.5">
          {title}
        </div>
        <p className="text-[13px] text-neutral mb-5 leading-normal">
          {body}
        </p>
        <div className="flex gap-2 justify-end">
          <button type="button" className={MODAL_BTN_CANCEL}>
            Cancel
          </button>
          <button
            type="button"
            className={`${MODAL_BTN_BASE} font-semibold text-white ${CONFIRM_BTN[tone]}`}
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
    <div className="max-w-[900px] mx-auto">
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
        <div className="flex flex-col gap-3">
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
        <div className="flex flex-col gap-3">
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
        <div className="flex flex-col gap-2.5">
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
        <div className="flex flex-col gap-2.5">
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
                className="px-4 py-1.5 text-[13px] border border-border bg-surface-panel text-neutral rounded-md cursor-pointer font-[inherit]"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-1.5 text-[13px] font-semibold border-none bg-info text-white rounded-md cursor-pointer font-[inherit] hover:bg-info"
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
        <div className="flex gap-4 flex-wrap items-start">
          {[
            { label: 'Small (400px)', wClass: 'w-[180px]' },
            { label: 'Medium (560px)', wClass: 'w-[240px]' },
            { label: 'Large (720px)', wClass: 'w-[300px]' },
          ].map(({ label, wClass }) => (
            <div
              key={label}
              className={`border-2 border-dashed border-border-emphasis rounded-xl px-4 py-5 text-center bg-white ${wClass}`}
            >
              <div className="text-xs font-semibold text-text-primary mb-1.5">
                {label}
              </div>
              <div className="text-[11px] text-text-tertiary">Modal container</div>
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
        <div className="flex flex-col gap-4">
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
