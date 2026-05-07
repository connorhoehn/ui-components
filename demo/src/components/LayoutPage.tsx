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

export default function LayoutPage() {
  useRegisterToc(tocItems);

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <PageHeader
        title="Layout"
        description="Structural components for building application shells, side panels, content areas, and responsive grids. These primitives compose together to form complete page layouts."
        importPath="import { Panel, PanelHeader, PanelBody } from '@your-org/ui-components'"
      />

      {/* ------------------------------------------------------------------ */}
      {/*  PANEL LIGHT                                                       */}
      {/* ------------------------------------------------------------------ */}

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
        <div
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            overflow: 'hidden',
            background: '#fff',
            width: 320,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderBottom: '1px solid #e2e8f0',
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Item Details</span>
            <span style={{ fontSize: 18, color: '#94a3b8', cursor: 'pointer', lineHeight: 1 }}>×</span>
          </div>
          {/* Body */}
          <div style={{ padding: '14px 14px', fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
            <p style={{ margin: '0 0 10px 0' }}>
              This is a light-themed panel. It renders fixed to the right edge of the viewport via a React portal.
            </p>
            <p style={{ margin: '0 0 10px 0' }}>
              The <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 12 }}>Panel</code> component accepts <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 12 }}>variant</code> and <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 12 }}>width</code> props.
            </p>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: '#64748b' }}>
              <li style={{ marginBottom: 4 }}>PanelHeader: title, close button, optional actions</li>
              <li style={{ marginBottom: 4 }}>PanelBody: scrollable content area</li>
            </ul>
          </div>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/*  PANEL DARK                                                        */}
      {/* ------------------------------------------------------------------ */}

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
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            overflow: 'hidden',
            background: '#111827',
            width: 320,
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Terminal</span>
            <span style={{ fontSize: 18, color: '#6b7280', cursor: 'pointer', lineHeight: 1 }}>×</span>
          </div>
          {/* Body */}
          <div style={{ padding: '14px 14px' }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 6,
                padding: 12,
                fontFamily: 'monospace',
                fontSize: 11,
                color: '#a5b4fc',
                lineHeight: 1.7,
              }}
            >
              <div><span style={{ color: '#6ee7b7' }}>$</span> npm run build</div>
              <div style={{ color: '#94a3b8' }}>Building for production...</div>
              <div style={{ color: '#94a3b8' }}>Bundling 42 modules...</div>
              <div style={{ color: '#6ee7b7' }}>Done in 3.2s</div>
            </div>
          </div>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/*  SIDEBAR LAYOUT                                                    */}
      {/* ------------------------------------------------------------------ */}

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
        <div
          style={{
            display: 'flex',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            overflow: 'hidden',
            height: 300,
            background: '#fff',
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              width: 200,
              background: '#f8fafc',
              borderRight: '1px solid #e2e8f0',
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
              Navigation
            </div>
            {['Dashboard', 'Pipelines', 'Documents', 'Integrations', 'Settings'].map((item, i) => (
              <div
                key={item}
                style={{
                  padding: '7px 10px',
                  borderRadius: 5,
                  fontSize: 13,
                  color: i === 0 ? '#2563eb' : '#475569',
                  background: i === 0 ? '#eff6ff' : 'transparent',
                  fontWeight: i === 0 ? 600 : 400,
                  marginBottom: 2,
                  cursor: 'pointer',
                }}
              >
                {item}
              </div>
            ))}
          </div>
          {/* Content */}
          <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>Dashboard</div>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              Main content area with flexible width. The sidebar remains fixed at 200px while this region adapts to the available space.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1 }}>
              {['Requests', 'Latency', 'Errors', 'Throughput'].map((label) => (
                <div key={label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>--</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/*  HEADER BODY FOOTER                                                */}
      {/* ------------------------------------------------------------------ */}

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            overflow: 'hidden',
            height: 300,
            background: '#fff',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '10px 16px',
              borderBottom: '1px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Application Header</span>
            <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#64748b' }}>
              <span>Docs</span>
              <span>Settings</span>
              <span style={{ width: 24, height: 24, borderRadius: 12, background: '#e2e8f0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#475569' }}>CH</span>
            </div>
          </div>
          {/* Body */}
          <div style={{ flex: 1, padding: 16, overflowY: 'auto', fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
            <p style={{ margin: '0 0 10px 0' }}>
              This body area grows to fill all available vertical space between the header and footer. When content overflows, it scrolls independently.
            </p>
            <p style={{ margin: '0 0 10px 0' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p style={{ margin: '0 0 10px 0' }}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p style={{ margin: 0 }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          {/* Footer */}
          <div
            style={{
              padding: '10px 16px',
              borderTop: '1px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 8,
              flexShrink: 0,
            }}
          >
            <button style={{ padding: '5px 12px', fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 5, background: '#fff', color: '#475569', cursor: 'pointer', fontFamily: 'inherit' }}>
              Cancel
            </button>
            <button style={{ padding: '5px 12px', fontSize: 12, border: 'none', borderRadius: 5, background: '#3b82f6', color: '#fff', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' }}>
              Save Changes
            </button>
          </div>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/*  CARD GRID                                                         */}
      {/* ------------------------------------------------------------------ */}

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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
          }}
        >
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
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                padding: 16,
                background: '#fff',
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{card.title}</div>
              <p style={{ fontSize: 12, color: '#64748b', margin: 0, lineHeight: 1.4 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/*  PROPS TABLE                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div id="props" style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>API Reference</h2>

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
