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

const BTN_BASE =
  'font-semibold rounded-md cursor-pointer inline-flex items-center gap-1.5 transition-colors';
const BTN_PRIMARY = `${BTN_BASE} bg-blue-600 text-white border-none px-4 py-2 text-sm hover:bg-blue-700`;
const BTN_SECONDARY = `${BTN_BASE} bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 text-sm hover:bg-slate-200`;
const BTN_GHOST = `${BTN_BASE} bg-transparent text-slate-700 border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100`;
const BTN_DANGER = `${BTN_BASE} bg-red-600 text-white border-none px-4 py-2 text-sm hover:bg-red-700`;
const BTN_OUTLINE = `${BTN_BASE} bg-transparent text-blue-600 border border-blue-600 px-4 py-2 text-sm hover:bg-blue-50`;

const BTN_SM = 'px-2.5 py-1 text-xs';
const BTN_MD = 'px-4 py-2 text-sm';
const BTN_LG = 'px-6 py-3 text-base';

const ROW = 'flex flex-wrap gap-3 items-center';

const ICON_BTN_BASE =
  'inline-flex items-center justify-center border-none rounded-md cursor-pointer transition-colors';

export default function ButtonsPage() {
  useRegisterToc(tocItems);

  return (
    <div>
      <PageHeader
        title="Buttons"
        description="Buttons trigger actions and events. Use different variants to communicate intent and hierarchy within a UI."
        importPath="import { Button } from '@connorhoehnslalom/ui-components'"
      />

      <ExampleBlock
        id="basic"
        title="Basic usage"
        description="The simplest Button renders as a primary variant at medium size by default."
        code={`import { Button } from '@connorhoehnslalom/ui-components';

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('clicked')}>
      Click me
    </Button>
  );
}`}
      >
        <div className={ROW}>
          <button type="button" className={BTN_PRIMARY}>Click me</button>
        </div>
      </ExampleBlock>

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
        <div className={ROW}>
          <button type="button" className={BTN_PRIMARY}>Primary</button>
          <button type="button" className={BTN_SECONDARY}>Secondary</button>
          <button type="button" className={BTN_GHOST}>Ghost</button>
          <button type="button" className={BTN_DANGER}>Danger</button>
          <button type="button" className={BTN_OUTLINE}>Outline</button>
        </div>
      </ExampleBlock>

      <ExampleBlock
        id="sizes"
        title="Sizes"
        description="Three size options let you match buttons to their context. Use sm for dense UIs, md as the default, and lg for prominent call-to-action areas."
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <div className={ROW}>
          <button type="button" className={`${BTN_PRIMARY} ${BTN_SM}`}>Small</button>
          <button type="button" className={`${BTN_PRIMARY} ${BTN_MD}`}>Medium</button>
          <button type="button" className={`${BTN_PRIMARY} ${BTN_LG}`}>Large</button>
        </div>
      </ExampleBlock>

      <ExampleBlock
        id="disabled"
        title="Disabled state"
        description="Disabled buttons communicate that an action is unavailable. They reduce opacity and prevent interaction."
        code={`<Button variant="primary" disabled>Primary</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="ghost" disabled>Ghost</Button>
<Button variant="danger" disabled>Danger</Button>`}
      >
        <div className={ROW}>
          <button type="button" className={`${BTN_PRIMARY} opacity-50 cursor-not-allowed`} disabled>
            Primary
          </button>
          <button type="button" className={`${BTN_SECONDARY} opacity-50 cursor-not-allowed`} disabled>
            Secondary
          </button>
          <button type="button" className={`${BTN_GHOST} opacity-50 cursor-not-allowed`} disabled>
            Ghost
          </button>
          <button type="button" className={`${BTN_DANGER} opacity-50 cursor-not-allowed`} disabled>
            Danger
          </button>
        </div>
      </ExampleBlock>

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
        <div className="max-w-[400px] flex flex-col gap-2">
          <button type="button" className={`${BTN_PRIMARY} w-full justify-center`}>
            Submit form
          </button>
          <button type="button" className={`${BTN_GHOST} w-full justify-center`}>
            Cancel
          </button>
        </div>
      </ExampleBlock>

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
        <div className={ROW}>
          <button type="button" className={BTN_PRIMARY}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add item
          </button>
          <button type="button" className={BTN_SECONDARY}>
            Download
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
          <button type="button" className={BTN_DANGER}>
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

      <ExampleBlock
        id="icon-button"
        title="IconButton"
        description="Icon-only buttons for compact controls. Always provide an aria-label for accessibility. Available in ghost, primary, and danger variants."
        code={`import { IconButton } from '@connorhoehnslalom/ui-components';

<IconButton aria-label="Menu" icon={<MenuIcon />} variant="ghost" />
<IconButton aria-label="Confirm" icon={<CheckIcon />} variant="primary" />
<IconButton aria-label="Remove" icon={<XIcon />} variant="danger" />
<IconButton aria-label="Star" icon={<StarIcon />} variant="primary" size="lg" />`}
      >
        <div className={ROW}>
          <button
            type="button"
            aria-label="Menu"
            className={`${ICON_BTN_BASE} w-8 h-8 bg-transparent text-slate-700 hover:bg-slate-100`}
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
            className={`${ICON_BTN_BASE} w-8 h-8 bg-blue-600 text-white hover:bg-blue-700`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Remove"
            className={`${ICON_BTN_BASE} w-8 h-8 bg-red-600 text-white hover:bg-red-700`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Star"
            className={`${ICON_BTN_BASE} w-10 h-10 bg-blue-600 text-white text-lg hover:bg-blue-700`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
            </svg>
          </button>
        </div>
      </ExampleBlock>

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
        <div className={ROW}>
          <div className="inline-flex">
            <button
              type="button"
              className={`${BTN_SECONDARY} rounded-r-none border-r-0`}
            >
              Left
            </button>
            <button type="button" className={`${BTN_SECONDARY} rounded-none`}>
              Center
            </button>
            <button
              type="button"
              className={`${BTN_SECONDARY} rounded-l-none border-l-0`}
            >
              Right
            </button>
          </div>

          <div className="inline-flex ml-6">
            <button type="button" className={`${BTN_PRIMARY} rounded-r-none`}>
              Save
            </button>
            <button
              type="button"
              className={`${BTN_PRIMARY} rounded-l-none border-l border-white/30`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>
      </ExampleBlock>

      <div id="props" className="mt-12">
        <PropsTable
          componentName="Button"
          props={[
            { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: 'Visual style of the button that communicates its intent.' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls padding and font size of the button.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'When true, the button is non-interactive and visually dimmed.' },
            { name: 'fullWidth', type: 'boolean', default: 'false', description: 'When true, the button expands to fill the width of its container.' },
            { name: 'children', type: 'ReactNode', required: true, description: 'Content rendered inside the button (text, icons, or both).' },
            { name: 'onClick', type: '() => void', description: 'Callback fired when the button is clicked.' },
            { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'HTML button type attribute.' },
            { name: 'style', type: 'CSSProperties', description: 'Inline styles merged onto the button element.' },
            { name: 'className', type: 'string', description: 'CSS class name applied to the button element.' },
          ]}
        />

        <PropsTable
          componentName="IconButton"
          props={[
            { name: 'aria-label', type: 'string', required: true, description: 'Accessible label for screen readers (required for icon-only buttons).' },
            { name: 'icon', type: 'ReactNode', required: true, description: 'The icon element to render inside the button.' },
            { name: 'variant', type: "'ghost' | 'primary' | 'danger'", default: "'ghost'", description: 'Visual style of the icon button.' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls the width/height of the button (24px, 32px, 40px).' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'When true, the button is non-interactive and visually dimmed.' },
            { name: 'onClick', type: '() => void', description: 'Callback fired when the button is clicked.' },
            { name: 'style', type: 'CSSProperties', description: 'Inline styles merged onto the button element.' },
            { name: 'className', type: 'string', description: 'CSS class name applied to the button element.' },
          ]}
        />
      </div>
    </div>
  );
}
