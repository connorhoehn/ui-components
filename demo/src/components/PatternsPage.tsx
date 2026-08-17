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
} from '@connorhoehnslalom/ui-components/shared';

const tocItems: TocItem[] = [
  { id: 'page-header', label: 'PageHeader', level: 2 },
  { id: 'card-header', label: 'CardHeader', level: 2 },
  { id: 'drawer', label: 'Drawer', level: 2 },
  { id: 'collapsible-section', label: 'CollapsibleSection', level: 2 },
  { id: 'props', label: 'API Reference', level: 2 },
];

const CARD = 'border border-slate-200 rounded-lg bg-white';
const CARD_LG = `${CARD} px-5 py-4`;
const CARD_PAD = `${CARD} p-4`;
const PILL_DANGER =
  'inline-block text-[11px] font-semibold px-2 py-px rounded-full bg-danger/10 text-danger-fg';
const PILL_WARN =
  'inline-block text-[11px] font-semibold px-2 py-px rounded-full bg-warning/10 text-warning-fg';
const LABEL =
  'text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5';

export default function PatternsPage() {
  useRegisterToc(tocItems);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <div className="max-w-[960px] mx-auto">
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
        <div className="flex flex-col gap-6">
          <div className={CARD_LG}>
            <PageHeader
              title="Active Pipelines"
              description="Currently running ingest and transform jobs."
            />
          </div>
          <div className={CARD_LG}>
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
          <div className={CARD_LG}>
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
        <div className="flex flex-col gap-3.5">
          <div className={CARD_PAD}>
            <CardHeader title="Active Runs" />
          </div>
          <div className={CARD_PAD}>
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
          <div className={CARD_PAD}>
            <CardHeader
              title="Failed Jobs"
              meta={<span className={PILL_DANGER}>3</span>}
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
        <div className="flex flex-col gap-3 items-start">
          <Button variant="primary" size="md" onClick={() => setDrawerOpen(true)}>
            Open Drawer
          </Button>
          <span className="text-xs text-slate-500">
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
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setDrawerOpen(false)}>
                Close
              </Button>
              <Button variant="primary" size="sm" onClick={() => setDrawerOpen(false)}>
                Replay
              </Button>
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            <div>
              <div className={LABEL}>Status</div>
              <div className="text-sm text-slate-900">Completed in 2m 14s</div>
            </div>
            <div>
              <div className={LABEL}>Steps</div>
              <ol className="pl-[18px] m-0 text-[13px] text-slate-700 leading-relaxed">
                <li>Extract from source — 320 records</li>
                <li>Validate schema — 0 errors</li>
                <li>Transform — 320 records</li>
                <li>Load to warehouse — done</li>
              </ol>
            </div>
            <div>
              <div className={LABEL}>Logs</div>
              <pre className="bg-slate-900 text-slate-200 p-3 rounded-md text-[11px] font-mono m-0 overflow-x-auto">
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
        <div className="flex flex-col gap-2.5">
          <CollapsibleSection title="General" defaultOpen>
            <div className="p-4 text-[13px] text-slate-700 leading-normal">
              Workspace name, time zone, and other general preferences. Always open by default.
            </div>
          </CollapsibleSection>
          <CollapsibleSection title="Advanced" storageKey="demo.patterns.advanced.open">
            <div className="p-4 text-[13px] text-slate-700 leading-normal">
              Reload the page — this section's open/closed state will be remembered via localStorage
              (key <code>demo.patterns.advanced.open</code>).
            </div>
          </CollapsibleSection>
          <CollapsibleSection
            title="Warnings"
            badge={<span className={PILL_WARN}>2</span>}
          >
            <div className="p-4 text-[13px] text-slate-700 leading-normal">
              <ul className="m-0 pl-[18px]">
                <li>Storage usage above 80%</li>
                <li>2 API keys expiring within 7 days</li>
              </ul>
            </div>
          </CollapsibleSection>
        </div>
      </ExampleBlock>

      {/* ─── Props ────────────────────────────────────────────────────── */}
      <div id="props" className="mt-12">
        <h2 className="text-[22px] font-bold text-slate-900 mb-6">
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
