import type { CSSProperties } from 'react';
import { ExampleBlock, PropsTable, PageHeader, useRegisterToc } from '../shared';
import type { TocItem } from '../shared';

const tocItems: TocItem[] = [
  { id: 'basic', label: 'Basic usage', level: 2 },
  { id: 'variants', label: 'Variants', level: 2 },
  { id: 'sizes', label: 'Sizes', level: 2 },
  { id: 'disabled', label: 'Disabled state', level: 2 },
  { id: 'full-width', label: 'Full width', level: 2 },
  { id: 'with-icons', label: 'With icons', level: 2 },
  { id: 'icon-button', label: 'IconButton', level: 2 },
  { id: 'button-group', label: 'Button group', level: 2 },
  { id: 'props', label: 'Props', level: 2 },
];

// Shared inline styles for demo buttons
const baseBtn: CSSProperties = {
  fontWeight: 600,
  borderRadius: 6,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'background 0.15s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
};

const primaryBtn: CSSProperties = {
  ...baseBtn,
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  fontSize: 14,
};

const secondaryBtn: CSSProperties = {
  ...baseBtn,
  background: '#f1f5f9',
  color: '#334155',
  border: '1px solid #e2e8f0',
  padding: '8px 16px',
  fontSize: 14,
};

const ghostBtn: CSSProperties = {
  ...baseBtn,
  background: 'transparent',
  color: '#334155',
  border: '1px solid #d1d5db',
  padding: '8px 16px',
  fontSize: 14,
};

const dangerBtn: CSSProperties = {
  ...baseBtn,
  background: '#dc2626',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  fontSize: 14,
};

const outlineBtn: CSSProperties = {
  ...baseBtn,
  background: 'transparent',
  color: '#2563eb',
  border: '1px solid #2563eb',
  padding: '8px 16px',
  fontSize: 14,
};

const smBtn: CSSProperties = { padding: '4px 10px', fontSize: 12 };
const mdBtn: CSSProperties = { padding: '8px 16px', fontSize: 14 };
const lgBtn: CSSProperties = { padding: '12px 24px', fontSize: 16 };

const rowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  alignItems: 'center',
};

const iconBtnBase: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  transition: 'background 0.15s ease',
};

export default function ButtonsPage() {
  useRegisterToc(tocItems);

  return (
    <div>
      <PageHeader
        title="Buttons"
        description="Buttons trigger actions and events. Use different variants to communicate intent and hierarchy within a UI."
        importPath="import { Button } from '@connorhoehn/ui-components'"
      />

      {/* Basic usage */}
      <ExampleBlock
        id="basic"
        title="Basic usage"
        description="The simplest Button renders as a primary variant at medium size by default."
        code={`import { Button } from '@connorhoehn/ui-components';

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('clicked')}>
      Click me
    </Button>
  );
}`}
      >
        <div style={rowStyle}>
          <button type="button" style={primaryBtn}>
            Click me
          </button>
        </div>
      </ExampleBlock>

      {/* Variants */}
      <ExampleBlock
        id="variants"
        title="Variants"
        description="Buttons come in several variants to express different levels of emphasis and intent. Use primary for main actions, secondary for alternatives, ghost for subtle actions, danger for destructive operations, and outline for bordered buttons."
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="outline">Outline</Button>`}
      >
        <div style={rowStyle}>
          <button type="button" style={primaryBtn}>Primary</button>
          <button type="button" style={secondaryBtn}>Secondary</button>
          <button type="button" style={ghostBtn}>Ghost</button>
          <button type="button" style={dangerBtn}>Danger</button>
          <button type="button" style={outlineBtn}>Outline</button>
        </div>
      </ExampleBlock>

      {/* Sizes */}
      <ExampleBlock
        id="sizes"
        title="Sizes"
        description="Three size options let you match buttons to their context. Use sm for dense UIs, md as the default, and lg for prominent call-to-action areas."
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <div style={rowStyle}>
          <button type="button" style={{ ...primaryBtn, ...smBtn }}>Small</button>
          <button type="button" style={{ ...primaryBtn, ...mdBtn }}>Medium</button>
          <button type="button" style={{ ...primaryBtn, ...lgBtn }}>Large</button>
        </div>
      </ExampleBlock>

      {/* Disabled state */}
      <ExampleBlock
        id="disabled"
        title="Disabled state"
        description="Disabled buttons communicate that an action is unavailable. They reduce opacity and prevent interaction."
        code={`<Button variant="primary" disabled>Primary</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="ghost" disabled>Ghost</Button>
<Button variant="danger" disabled>Danger</Button>`}
      >
        <div style={rowStyle}>
          <button type="button" style={{ ...primaryBtn, opacity: 0.5, cursor: 'not-allowed' }} disabled>
            Primary
          </button>
          <button type="button" style={{ ...secondaryBtn, opacity: 0.5, cursor: 'not-allowed' }} disabled>
            Secondary
          </button>
          <button type="button" style={{ ...ghostBtn, opacity: 0.5, cursor: 'not-allowed' }} disabled>
            Ghost
          </button>
          <button type="button" style={{ ...dangerBtn, opacity: 0.5, cursor: 'not-allowed' }} disabled>
            Danger
          </button>
        </div>
      </ExampleBlock>

      {/* Full width */}
      <ExampleBlock
        id="full-width"
        title="Full width"
        description="Set fullWidth to make the button stretch to fill its container. Useful in forms, modals, and mobile layouts."
        code={`<Button variant="primary" fullWidth>
  Submit form
</Button>
<Button variant="ghost" fullWidth>
  Cancel
</Button>`}
      >
        <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button type="button" style={{ ...primaryBtn, width: '100%', justifyContent: 'center' }}>
            Submit form
          </button>
          <button type="button" style={{ ...ghostBtn, width: '100%', justifyContent: 'center' }}>
            Cancel
          </button>
        </div>
      </ExampleBlock>

      {/* With icons */}
      <ExampleBlock
        id="with-icons"
        title="With icons"
        description="Combine icons with text labels to improve scannability. Place the icon before or after the label."
        code={`<Button variant="primary">
  <PlusIcon /> Add item
</Button>
<Button variant="secondary">
  Download <DownloadIcon />
</Button>
<Button variant="danger">
  <TrashIcon /> Delete
</Button>`}
      >
        <div style={rowStyle}>
          <button type="button" style={primaryBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add item
          </button>
          <button type="button" style={secondaryBtn}>
            Download
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
          <button type="button" style={dangerBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
            Delete
          </button>
        </div>
      </ExampleBlock>

      {/* IconButton */}
      <ExampleBlock
        id="icon-button"
        title="IconButton"
        description="Icon-only buttons for compact controls. Always provide an aria-label for accessibility. Available in ghost, primary, and danger variants."
        code={`import { IconButton } from '@connorhoehn/ui-components';

<IconButton aria-label="Menu" icon={<MenuIcon />} variant="ghost" />
<IconButton aria-label="Confirm" icon={<CheckIcon />} variant="primary" />
<IconButton aria-label="Remove" icon={<XIcon />} variant="danger" />
<IconButton aria-label="Star" icon={<StarIcon />} variant="primary" size="lg" />`}
      >
        <div style={rowStyle}>
          <button
            type="button"
            aria-label="Menu"
            style={{ ...iconBtnBase, width: 32, height: 32, background: 'transparent', color: '#374151' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Confirm"
            style={{ ...iconBtnBase, width: 32, height: 32, background: '#2563eb', color: '#fff' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Remove"
            style={{ ...iconBtnBase, width: 32, height: 32, background: '#dc2626', color: '#fff' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Star"
            style={{ ...iconBtnBase, width: 40, height: 40, background: '#2563eb', color: '#fff', fontSize: 18 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
            </svg>
          </button>
        </div>
      </ExampleBlock>

      {/* Button group */}
      <ExampleBlock
        id="button-group"
        title="Button group"
        description="Group related buttons together by removing spacing and sharing border radii. This pattern works well for segmented controls, toolbars, and pagination."
        code={`<div style={{ display: 'inline-flex' }}>
  <Button variant="secondary" style={{ borderRadius: '6px 0 0 6px' }}>
    Left
  </Button>
  <Button variant="secondary" style={{ borderRadius: 0, borderLeft: 'none' }}>
    Center
  </Button>
  <Button variant="secondary" style={{ borderRadius: '0 6px 6px 0', borderLeft: 'none' }}>
    Right
  </Button>
</div>`}
      >
        <div style={rowStyle}>
          <div style={{ display: 'inline-flex' }}>
            <button
              type="button"
              style={{
                ...secondaryBtn,
                borderRadius: '6px 0 0 6px',
                borderRight: 'none',
              }}
            >
              Left
            </button>
            <button
              type="button"
              style={{
                ...secondaryBtn,
                borderRadius: 0,
              }}
            >
              Center
            </button>
            <button
              type="button"
              style={{
                ...secondaryBtn,
                borderRadius: '0 6px 6px 0',
                borderLeft: 'none',
              }}
            >
              Right
            </button>
          </div>

          <div style={{ display: 'inline-flex', marginLeft: 24 }}>
            <button
              type="button"
              style={{
                ...primaryBtn,
                borderRadius: '6px 0 0 6px',
              }}
            >
              Save
            </button>
            <button
              type="button"
              style={{
                ...primaryBtn,
                borderRadius: '0 6px 6px 0',
                borderLeft: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>
      </ExampleBlock>

      {/* Props table */}
      <div id="props" style={{ marginTop: 48 }}>
        <PropsTable
          componentName="Button"
          props={[
            {
              name: 'variant',
              type: "'primary' | 'secondary' | 'ghost' | 'danger'",
              default: "'primary'",
              description: 'Visual style of the button that communicates its intent.',
            },
            {
              name: 'size',
              type: "'sm' | 'md' | 'lg'",
              default: "'md'",
              description: 'Controls padding and font size of the button.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'When true, the button is non-interactive and visually dimmed.',
            },
            {
              name: 'fullWidth',
              type: 'boolean',
              default: 'false',
              description: 'When true, the button expands to fill the width of its container.',
            },
            {
              name: 'children',
              type: 'ReactNode',
              required: true,
              description: 'Content rendered inside the button (text, icons, or both).',
            },
            {
              name: 'onClick',
              type: '() => void',
              description: 'Callback fired when the button is clicked.',
            },
            {
              name: 'type',
              type: "'button' | 'submit' | 'reset'",
              default: "'button'",
              description: 'HTML button type attribute.',
            },
            {
              name: 'style',
              type: 'CSSProperties',
              description: 'Inline styles merged onto the button element.',
            },
            {
              name: 'className',
              type: 'string',
              description: 'CSS class name applied to the button element.',
            },
          ]}
        />

        <PropsTable
          componentName="IconButton"
          props={[
            {
              name: 'aria-label',
              type: 'string',
              required: true,
              description: 'Accessible label for screen readers (required for icon-only buttons).',
            },
            {
              name: 'icon',
              type: 'ReactNode',
              required: true,
              description: 'The icon element to render inside the button.',
            },
            {
              name: 'variant',
              type: "'ghost' | 'primary' | 'danger'",
              default: "'ghost'",
              description: 'Visual style of the icon button.',
            },
            {
              name: 'size',
              type: "'sm' | 'md' | 'lg'",
              default: "'md'",
              description: 'Controls the width/height of the button (24px, 32px, 40px).',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'When true, the button is non-interactive and visually dimmed.',
            },
            {
              name: 'onClick',
              type: '() => void',
              description: 'Callback fired when the button is clicked.',
            },
            {
              name: 'style',
              type: 'CSSProperties',
              description: 'Inline styles merged onto the button element.',
            },
            {
              name: 'className',
              type: 'string',
              description: 'CSS class name applied to the button element.',
            },
          ]}
        />
      </div>
    </div>
  );
}
