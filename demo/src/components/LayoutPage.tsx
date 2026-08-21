import { ExampleBlock, PropsTable, PageHeader, useRegisterToc } from '../shared';
import type { TocItem } from '../shared';

const tocItems: TocItem[] = [
  { id: 'panel-light', label: 'Panel (Light)', level: 2 },
  { id: 'panel-dark', label: 'Panel (Dark)', level: 2 },
  { id: 'sidebar-layout', label: 'Sidebar + Content', level: 2 },
  { id: 'header-body-footer', label: 'Header / Body / Footer', level: 2 },
  { id: 'card-grid', label: 'Card Grid', level: 2 },
  { id: 'props', label: 'API Reference', level: 2 },
];

const PANEL_FRAME_LIGHT =
  'border border-border rounded-lg overflow-hidden bg-white w-[320px] shadow';
const PANEL_FRAME_DARK =
  'border border-white/10 rounded-lg overflow-hidden bg-surface-inverse w-[320px] shadow';
const PANEL_HEAD_LIGHT =
  'flex items-center justify-between px-3.5 py-2.5 border-b border-border';
const PANEL_HEAD_DARK =
  'flex items-center justify-between px-3.5 py-2.5 border-b border-white/10';
const CODE_INLINE =
  'bg-surface-hover px-1 py-px rounded-sm text-xs';

export default function LayoutPage() {
  useRegisterToc(tocItems);

  return (
    <div className="max-w-[960px] mx-auto">
      <PageHeader
        title="Layout"
        description="Structural components for building application shells, side panels, content areas, and responsive grids. These primitives compose together to form complete page layouts."
        importPath="import { Panel, PanelHeader, PanelBody } from '@your-org/ui-components'"
      />

      {/* ─── PANEL LIGHT ──────────────────────────────────────────────── */}
      <ExampleBlock
        id="panel-light"
        title="Panel (Light)"
        description="A white-background slide-out panel with a subtle border. Typically used for detail views, settings forms, or contextual information. Renders fixed to the viewport edge via a portal."
        code={`import { Panel, PanelHeader, PanelBody } from '@your-org/ui-components';

function DetailPanel({ onClose }) {
  return (
    <Panel variant="light" width={340}>
      <PanelHeader
        title="Item Details"
        onClose={onClose}
        variant="light"
      />
      <PanelBody>
        <p>Panel content goes here. The body area scrolls
           when content overflows.</p>
      </PanelBody>
    </Panel>
  );
}`}
      >
        <div className={PANEL_FRAME_LIGHT}>
          <div className={PANEL_HEAD_LIGHT}>
            <span className="text-sm font-semibold text-text-primary">Item Details</span>
            <span className="text-lg text-text-tertiary cursor-pointer leading-none">×</span>
          </div>
          <div className="p-3.5 text-[13px] text-text-secondary leading-relaxed">
            <p className="mb-2.5">
              This is a light-themed panel. It renders fixed to the right edge of the viewport via a React portal.
            </p>
            <p className="mb-2.5">
              The <code className={CODE_INLINE}>Panel</code> component accepts <code className={CODE_INLINE}>variant</code> and <code className={CODE_INLINE}>width</code> props.
            </p>
            <ul className="m-0 pl-[18px] text-xs text-neutral">
              <li className="mb-1">PanelHeader: title, close button, optional actions</li>
              <li className="mb-1">PanelBody: scrollable content area</li>
            </ul>
          </div>
        </div>
      </ExampleBlock>

      {/* ─── PANEL DARK ───────────────────────────────────────────────── */}
      <ExampleBlock
        id="panel-dark"
        title="Panel (Dark)"
        description="A dark-background panel suitable for developer tools, terminal output, log viewers, or command palettes. Uses a dark slate background (#1e293b) with light text for high contrast."
        background="#1e293b"
        code={`import { Panel, PanelHeader, PanelBody } from '@your-org/ui-components';

function TerminalPanel({ onClose }) {
  return (
    <Panel variant="dark" width={360}>
      <PanelHeader
        title="Terminal"
        onClose={onClose}
        variant="dark"
      />
      <PanelBody>
        <pre style={{ fontFamily: 'monospace', fontSize: 12, color: '#a5b4fc' }}>
          $ npm run build{'\n'}
          Building for production...{'\n'}
          Done in 3.2s
        </pre>
      </PanelBody>
    </Panel>
  );
}`}
      >
        <div className={PANEL_FRAME_DARK}>
          <div className={PANEL_HEAD_DARK}>
            <span className="text-sm font-semibold text-white">Terminal</span>
            <span className="text-lg text-neutral cursor-pointer leading-none">×</span>
          </div>
          <div className="p-3.5">
            <div className="bg-white/[0.04] border border-white/10 rounded-md p-3 font-mono text-[11px] text-primary-fg leading-loose">
              <div><span className="text-success-fg">$</span> npm run build</div>
              <div className="text-text-tertiary">Building for production...</div>
              <div className="text-text-tertiary">Bundling 42 modules...</div>
              <div className="text-success-fg">Done in 3.2s</div>
            </div>
          </div>
        </div>
      </ExampleBlock>

      {/* ─── SIDEBAR LAYOUT ───────────────────────────────────────────── */}
      <ExampleBlock
        id="sidebar-layout"
        title="Sidebar + Content"
        description="A classic application layout with a fixed-width sidebar (200px) for navigation and a flexible content area that fills the remaining space."
        code={`// Sidebar + Content layout pattern
<div style={{ display: 'flex', height: '100vh' }}>
  <aside style={{ width: 200, borderRight: '1px solid #e2e8f0', padding: 16 }}>
    <nav>
      <a href="/dashboard">Dashboard</a>
      <a href="/pipelines">Pipelines</a>
      <a href="/settings">Settings</a>
    </nav>
  </aside>
  <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
    {/* Page content */}
  </main>
</div>`}
      >
        <div className="flex border border-border rounded-lg overflow-hidden h-[300px] bg-white">
          <div className="w-[200px] bg-surface-panel border-r border-border p-3.5 flex flex-col">
            <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider mb-3">
              Navigation
            </div>
            {['Dashboard', 'Pipelines', 'Documents', 'Integrations', 'Settings'].map((item, i) => (
              <div
                key={item}
                className={`px-2.5 py-1.5 rounded mb-0.5 text-[13px] cursor-pointer ${
                  i === 0
                    ? 'text-info-fg bg-info-bg font-semibold'
                    : 'text-text-secondary bg-transparent'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="flex-1 p-5 flex flex-col">
            <div className="text-base font-semibold text-text-primary mb-2">Dashboard</div>
            <p className="text-[13px] text-neutral leading-normal mb-4">
              Main content area with flexible width. The sidebar remains fixed at 200px while this region adapts to the available space.
            </p>
            <div className="grid grid-cols-2 gap-2.5 flex-1">
              {['Requests', 'Latency', 'Errors', 'Throughput'].map((label) => (
                <div
                  key={label}
                  className="bg-surface-panel border border-border rounded-md p-3 flex flex-col justify-center"
                >
                  <div className="text-[11px] text-text-tertiary mb-1">{label}</div>
                  <div className="text-lg font-bold text-text-primary">--</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ExampleBlock>

      {/* ─── HEADER BODY FOOTER ───────────────────────────────────────── */}
      <ExampleBlock
        id="header-body-footer"
        title="Header / Body / Footer"
        description="A classic application chrome with a fixed header, a scrollable body that grows to fill available space, and a sticky footer with action buttons."
        code={`// Header / Body / Footer layout
<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  <header style={{ padding: '12px 20px', borderBottom: '1px solid #e2e8f0' }}>
    <h1>App Title</h1>
  </header>

  <main style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
    {/* Scrollable body content */}
  </main>

  <footer style={{ padding: '10px 20px', borderTop: '1px solid #e2e8f0' }}>
    <button>Cancel</button>
    <button>Save</button>
  </footer>
</div>`}
      >
        <div className="flex flex-col border border-border rounded-lg overflow-hidden h-[300px] bg-white">
          <div className="px-4 py-2.5 border-b border-border bg-surface-panel flex items-center justify-between flex-shrink-0">
            <span className="text-sm font-bold text-text-primary">Application Header</span>
            <div className="flex gap-3 text-xs text-neutral items-center">
              <span>Docs</span>
              <span>Settings</span>
              <span className="w-6 h-6 rounded-full bg-surface-emphasis inline-flex items-center justify-center text-[10px] font-semibold text-text-secondary">
                CH
              </span>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-[13px] text-neutral leading-relaxed">
            <p className="mb-2.5">
              This body area grows to fill all available vertical space between the header and footer. When content overflows, it scrolls independently.
            </p>
            <p className="mb-2.5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="mb-2.5">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="m-0">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          <div className="px-4 py-2.5 border-t border-border bg-surface-panel flex justify-end gap-2 flex-shrink-0">
            <button className="px-3 py-1.5 text-xs border border-border rounded bg-white text-text-secondary cursor-pointer font-[inherit]">
              Cancel
            </button>
            <button className="px-3 py-1.5 text-xs border-none rounded bg-info text-white cursor-pointer font-semibold font-[inherit]">
              Save Changes
            </button>
          </div>
        </div>
      </ExampleBlock>

      {/* ─── CARD GRID ────────────────────────────────────────────────── */}
      <ExampleBlock
        id="card-grid"
        title="Card Grid"
        description="A responsive grid layout using CSS Grid with auto-fill. Cards automatically reflow into available columns, maintaining consistent spacing and equal widths."
        code={`// Responsive card grid with auto-fill
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: 16,
}}>
  {items.map(item => (
    <div key={item.id} style={{
      border: '1px solid #e2e8f0',
      borderRadius: 8,
      padding: 16,
    }}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  ))}
</div>`}
      >
        <div className="grid grid-cols-3 gap-3">
          {[
            { title: 'Analytics', desc: 'Real-time metrics and dashboards for your application.', icon: '📊' },
            { title: 'Pipelines', desc: 'Automated data processing and ETL workflows.', icon: '🔄' },
            { title: 'Alerts', desc: 'Configurable notifications for anomalies and thresholds.', icon: '🔔' },
            { title: 'Integrations', desc: 'Connect with third-party services and APIs.', icon: '🔌' },
            { title: 'Security', desc: 'Access control, audit logs, and compliance tools.', icon: '🛡️' },
            { title: 'Settings', desc: 'Global configuration and environment management.', icon: '⚙️' },
          ].map((card) => (
            <div
              key={card.title}
              className="border border-border rounded-lg p-4 bg-white"
            >
              <div className="text-[22px] mb-2">{card.icon}</div>
              <div className="text-sm font-semibold text-text-primary mb-1">{card.title}</div>
              <p className="text-xs text-neutral m-0 leading-snug">{card.desc}</p>
            </div>
          ))}
        </div>
      </ExampleBlock>

      {/* ─── PROPS TABLE ──────────────────────────────────────────────── */}
      <div id="props" className="mt-12">
        <h2 className="text-[22px] font-bold text-text-primary mb-6">API Reference</h2>

        <PropsTable
          componentName="Panel"
          props={[
            { name: 'children', type: 'ReactNode', required: true, description: 'Panel content, typically PanelHeader + PanelBody.' },
            { name: 'variant', type: "'light' | 'dark'", default: "'light'", description: 'Visual theme. Dark uses #111827 background with light text.' },
            { name: 'width', type: 'number', default: '320', description: 'Width of the panel in pixels.' },
            { name: 'style', type: 'CSSProperties', description: 'Override or extend the panel container styles.' },
          ]}
        />

        <PropsTable
          componentName="PanelHeader"
          props={[
            { name: 'title', type: 'string', required: true, description: 'Text displayed in the header area.' },
            { name: 'onClose', type: '() => void', required: true, description: 'Callback invoked when the close button is clicked.' },
            { name: 'actions', type: 'ReactNode', description: 'Additional action elements rendered before the close button.' },
            { name: 'variant', type: "'light' | 'dark'", default: "'light'", description: 'Visual theme, should match the parent Panel variant.' },
          ]}
        />

        <PropsTable
          componentName="PanelBody"
          props={[
            { name: 'children', type: 'ReactNode', required: true, description: 'Scrollable content inside the panel.' },
            { name: 'padding', type: 'string', default: "'14px 12px'", description: 'CSS padding value for the body container.' },
          ]}
        />
      </div>
    </div>
  );
}
