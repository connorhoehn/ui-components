import React from 'react';
import {
  ExampleBlock,
  PropsTable,
  useRegisterToc,
} from '../shared';
import type { TocItem } from '../shared';
import {
  Drawer,
  CollapsibleSection,
  PageHeader,
  CardHeader,
  Button,
} from '@connorhoehn/ui-components/shared';

const tocItems: TocItem[] = [
  { id: 'page-header', label: 'PageHeader', level: 2 },
  { id: 'card-header', label: 'CardHeader', level: 2 },
  { id: 'drawer', label: 'Drawer', level: 2 },
  { id: 'collapsible-section', label: 'CollapsibleSection', level: 2 },
  { id: 'props', label: 'API Reference', level: 2 },
];

export default function PatternsPage() {
  useRegisterToc(tocItems);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <PageHeader
        title="Patterns"
        description="Layout-level components that compose primitives into recurring page patterns: page headers, card headers, side drawers, and collapsible sections."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => undefined}>
              Export
            </Button>
            <Button variant="primary" size="sm" onClick={() => undefined}>
              New
            </Button>
          </>
        }
      />

      {/* ─── PageHeader ───────────────────────────────────────────────── */}
      <ExampleBlock
        id="page-header"
        title="PageHeader"
        description="Page-level title + description + actions header. Replaces ad-hoc <h1>/<p>/<button> patterns. Supports a back link above the title and a badge to the right of it."
        code={`<PageHeader
  title="Active Pipelines"
  description="Currently running ingest and transform jobs."
/>

<PageHeader
  title="Pipeline Detail"
  description="View run history and step graph."
  back={{ label: 'All pipelines', to: '/pipelines' }}
/>

<PageHeader
  title="Settings"
  description="Manage workspace preferences."
  actions={
    <>
      <Button variant="secondary" size="sm">Cancel</Button>
      <Button variant="primary" size="sm">Save</Button>
    </>
  }
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Variant 1: title + description */}
          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '16px 20px',
              background: '#fff',
            }}
          >
            <PageHeader
              title="Active Pipelines"
              description="Currently running ingest and transform jobs."
            />
          </div>
          {/* Variant 2: with back link */}
          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '16px 20px',
              background: '#fff',
            }}
          >
            <PageHeader
              title="Pipeline Detail"
              description="View run history and step graph."
              back={{
                label: 'All pipelines',
                to: '#pipelines',
                onClick: (e) => e.preventDefault(),
              }}
            />
          </div>
          {/* Variant 3: with actions */}
          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '16px 20px',
              background: '#fff',
            }}
          >
            <PageHeader
              title="Settings"
              description="Manage workspace preferences."
              actions={
                <>
                  <Button variant="secondary" size="sm" onClick={() => undefined}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => undefined}>
                    Save
                  </Button>
                </>
              }
            />
          </div>
        </div>
      </ExampleBlock>

      {/* ─── CardHeader ───────────────────────────────────────────────── */}
      <ExampleBlock
        id="card-header"
        title="CardHeader"
        description="Reusable header bar for Card-style sections. Title + optional subtitle on the left, optional meta slot (badges/chips), and right-aligned action slot."
        code={`<Card>
  <CardHeader title="Active Runs" />
</Card>

<Card>
  <CardHeader
    title="Recent Activity"
    subtitle="Last 24 hours"
    action={<Button variant="ghost" size="sm">Refresh</Button>}
  />
</Card>

<Card>
  <CardHeader
    title="Failed Jobs"
    meta={<span style={{ ... }}>3</span>}
    action={<Button variant="ghost" size="sm">Retry all</Button>}
  />
</Card>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Card 1: title only */}
          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              background: '#fff',
              padding: 16,
            }}
          >
            <CardHeader title="Active Runs" />
          </div>
          {/* Card 2: title + subtitle + action */}
          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              background: '#fff',
              padding: 16,
            }}
          >
            <CardHeader
              title="Recent Activity"
              subtitle="Last 24 hours"
              action={
                <Button variant="ghost" size="sm" onClick={() => undefined}>
                  Refresh
                </Button>
              }
            />
          </div>
          {/* Card 3: title + meta badge + action */}
          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              background: '#fff',
              padding: 16,
            }}
          >
            <CardHeader
              title="Failed Jobs"
              meta={
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '1px 8px',
                    borderRadius: 999,
                    background: 'rgba(220,38,38,0.1)',
                    color: '#dc2626',
                  }}
                >
                  3
                </span>
              }
              action={
                <Button variant="ghost" size="sm" onClick={() => undefined}>
                  Retry all
                </Button>
              }
            />
          </div>
        </div>
      </ExampleBlock>

      {/* ─── Drawer ───────────────────────────────────────────────────── */}
      <ExampleBlock
        id="drawer"
        title="Drawer"
        description="Right-side slide-in panel rendered into document.body via portal. Closes on Escape or backdrop click. On open, focuses the first focusable element inside the panel. Use for detail views, edit forms, and side panels that shouldn't navigate the whole page."
        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Drawer</Button>

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Pipeline Detail"
  subtitle="ingest-orders · run #4521"
  width={460}
  footer={
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
      <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
        Close
      </Button>
      <Button variant="primary" size="sm">Replay</Button>
    </div>
  }
>
  <p>Detail content here…</p>
</Drawer>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <Button variant="primary" size="md" onClick={() => setDrawerOpen(true)}>
            Open Drawer
          </Button>
          <span style={{ fontSize: 12, color: '#64748b' }}>
            Drawer is portal-rendered to document.body, so it sits above the docs layout.
          </span>
        </div>

        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Pipeline Detail"
          subtitle="ingest-orders · run #4521"
          width={460}
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button variant="secondary" size="sm" onClick={() => setDrawerOpen(false)}>
                Close
              </Button>
              <Button variant="primary" size="sm" onClick={() => setDrawerOpen(false)}>
                Replay
              </Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: 6,
                }}
              >
                Status
              </div>
              <div style={{ fontSize: 14, color: '#0f172a' }}>Completed in 2m 14s</div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: 6,
                }}
              >
                Steps
              </div>
              <ol style={{ paddingLeft: 18, margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.6 }}>
                <li>Extract from source — 320 records</li>
                <li>Validate schema — 0 errors</li>
                <li>Transform — 320 records</li>
                <li>Load to warehouse — done</li>
              </ol>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: 6,
                }}
              >
                Logs
              </div>
              <pre
                style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: 12,
                  borderRadius: 6,
                  fontSize: 11,
                  fontFamily: 'monospace',
                  margin: 0,
                  overflowX: 'auto',
                }}
              >
{`[09:14:22] starting run #4521
[09:14:23] extract: 320 records
[09:14:55] transform: ok
[09:16:36] load: done`}
              </pre>
            </div>
          </div>
        </Drawer>
      </ExampleBlock>

      {/* ─── CollapsibleSection ───────────────────────────────────────── */}
      <ExampleBlock
        id="collapsible-section"
        title="CollapsibleSection"
        description="Bordered accordion section with a header button. When a storageKey is provided, the open/closed state is persisted to localStorage so it survives reloads. The optional badge slot renders next to the chevron."
        code={`<CollapsibleSection title="General" defaultOpen>
  <div style={{ padding: 16 }}>Settings here…</div>
</CollapsibleSection>

<CollapsibleSection
  title="Advanced"
  storageKey="settings.advanced.open"
>
  <div style={{ padding: 16 }}>Persisted to localStorage.</div>
</CollapsibleSection>

<CollapsibleSection
  title="Warnings"
  badge={<span style={{ ... }}>2</span>}
>
  <div style={{ padding: 16 }}>2 warnings to review.</div>
</CollapsibleSection>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <CollapsibleSection title="General" defaultOpen>
            <div
              style={{
                padding: 16,
                fontSize: 13,
                color: '#334155',
                lineHeight: 1.5,
              }}
            >
              Workspace name, time zone, and other general preferences. Always open by default.
            </div>
          </CollapsibleSection>
          <CollapsibleSection title="Advanced" storageKey="demo.patterns.advanced.open">
            <div
              style={{
                padding: 16,
                fontSize: 13,
                color: '#334155',
                lineHeight: 1.5,
              }}
            >
              Reload the page — this section's open/closed state will be remembered via localStorage
              (key <code>demo.patterns.advanced.open</code>).
            </div>
          </CollapsibleSection>
          <CollapsibleSection
            title="Warnings"
            badge={
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '1px 8px',
                  borderRadius: 999,
                  background: 'rgba(217,119,6,0.1)',
                  color: '#d97706',
                }}
              >
                2
              </span>
            }
          >
            <div
              style={{
                padding: 16,
                fontSize: 13,
                color: '#334155',
                lineHeight: 1.5,
              }}
            >
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li>Storage usage above 80%</li>
                <li>2 API keys expiring within 7 days</li>
              </ul>
            </div>
          </CollapsibleSection>
        </div>
      </ExampleBlock>

      {/* ─── Props ────────────────────────────────────────────────────── */}
      <div id="props" style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>
          API Reference
        </h2>

        <PropsTable
          componentName="PageHeader"
          props={[
            { name: 'title', type: 'string', required: true, description: 'Page title.' },
            { name: 'description', type: 'string', description: 'Subtitle/description text below the title.' },
            { name: 'actions', type: 'ReactNode', description: 'Right-aligned action slot (buttons, menus).' },
            { name: 'back', type: '{ label: string; to: string; onClick?: (e) => void }', description: 'Optional back link rendered above the title.' },
            { name: 'badge', type: 'ReactNode', description: 'Badge or status pill rendered to the right of the title.' },
          ]}
        />

        <PropsTable
          componentName="CardHeader"
          props={[
            { name: 'title', type: 'string', required: true, description: 'Header title text.' },
            { name: 'subtitle', type: 'string', description: 'Small text below the title.' },
            { name: 'meta', type: 'ReactNode', description: 'Content rendered immediately to the right of the title (badges, chips).' },
            { name: 'action', type: 'ReactNode', description: 'Right-aligned action slot (buttons, menus).' },
          ]}
        />

        <PropsTable
          componentName="Drawer"
          props={[
            { name: 'open', type: 'boolean', required: true, description: 'Whether the drawer is visible.' },
            { name: 'onClose', type: '() => void', required: true, description: 'Called on Escape, backdrop click, or close button.' },
            { name: 'title', type: 'string', description: 'Header title text.' },
            { name: 'subtitle', type: 'string', description: 'Header subtitle text below the title.' },
            { name: 'width', type: 'number', default: '460', description: 'Panel width in pixels.' },
            { name: 'children', type: 'ReactNode', required: true, description: 'Body content rendered inside the scrollable area.' },
            { name: 'footer', type: 'ReactNode', description: 'Optional footer slot pinned to the bottom of the panel.' },
          ]}
        />

        <PropsTable
          componentName="CollapsibleSection"
          props={[
            { name: 'title', type: 'string', required: true, description: 'Section title shown in the header.' },
            { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Whether the section starts expanded.' },
            { name: 'badge', type: 'ReactNode', description: 'Optional badge slot in the header (e.g. a count chip).' },
            { name: 'children', type: 'ReactNode', required: true, description: 'Body content rendered when expanded.' },
            { name: 'storageKey', type: 'string', description: 'If provided, persists open/closed state to localStorage.' },
          ]}
        />
      </div>
    </div>
  );
}
