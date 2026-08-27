// Depth 2 — the section layout: global rail + section rail + toolbar.
//
// This is where the second rail and the toolbar earn their rows. The global
// rail stays lit on `/health` while you move around inside it (`match="prefix"`,
// the default); the section rail matches exactly, because `/health/harness` and
// `/health/harness/runs` would otherwise both light.
//
// The toolbar carries the verbs you apply to this page repeatedly — the window,
// the refresh — which is exactly the set that must NOT scroll away with the
// table.

import { useState } from 'react';
import {
  Breadcrumbs,
  Button,
  NavRailStack,
  Toolbar,
  ToolbarGroup,
  ToolbarLabel,
  WorkArea,
} from '../../../../src/components/shared';
import { HEALTH_ITEMS, PLATFORM_ITEMS } from './fixtures';
import { DemoIntro, RunsTable, ShellFrame, TopBar, makeRenderLink } from './chrome';

const WINDOWS = ['1h', '24h', '7d'] as const;

export default function SectionLayoutDemo() {
  const [active, setActive] = useState('/health/runs');
  const [window, setWindow] = useState<(typeof WINDOWS)[number]>('24h');
  const renderLink = makeRenderLink(setActive);

  const leaf = HEALTH_ITEMS.find((i) => i.to === active);

  return (
    <div className="mx-auto max-w-[1100px]">
      <DemoIntro title="Medium — two rails, a trail and a toolbar">
        The global rail keeps its section lit while you move inside it; the section rail matches
        exactly so sibling routes do not both highlight. The trail crosses three levels, which is
        the threshold at which it stops repeating the rails.
      </DemoIntro>

      <ShellFrame>
        <TopBar actions={<Button size="sm" variant="ghost">Invite</Button>} />
        <div className="min-h-0 flex-1">
          <NavRailStack
            rails={[
              { id: 'platform', title: 'Acme', items: PLATFORM_ITEMS, width: 'narrow' },
              {
                id: 'health',
                title: 'Health',
                items: HEALTH_ITEMS,
                match: 'exact',
                width: 'narrow',
              },
            ]}
            activeHref={active}
            renderLink={renderLink}
            storageKey="demo-layout-section"
          >
            <WorkArea
              breadcrumbs={
                <Breadcrumbs
                  separator="›"
                  minItems={3}
                  items={[
                    { label: 'Operate' },
                    { label: 'Health', href: '#/health' },
                    { label: String(leaf?.label ?? 'Runs') },
                  ]}
                />
              }
              toolbar={
                <Toolbar
                  aria-label="Run actions"
                  end={<Button size="sm" variant="ghost">Refresh</Button>}
                >
                  <ToolbarGroup aria-label="Bulk actions">
                    <Button size="sm" variant="primary">Replay</Button>
                    <Button size="sm" variant="ghost">Export</Button>
                  </ToolbarGroup>
                  <ToolbarGroup divided aria-label="Time window">
                    {WINDOWS.map((w) => (
                      <Button
                        key={w}
                        size="sm"
                        variant={w === window ? 'secondary' : 'ghost'}
                        aria-pressed={w === window}
                        onClick={() => setWindow(w)}
                      >
                        {w}
                      </Button>
                    ))}
                  </ToolbarGroup>
                  <ToolbarGroup divided>
                    <ToolbarLabel>128 runs</ToolbarLabel>
                  </ToolbarGroup>
                </Toolbar>
              }
            >
              <div className="flex flex-col gap-4">
                <h2 className="m-0 text-lg font-semibold text-text-primary">
                  {leaf?.label ?? 'Runs'} · last {window}
                </h2>
                <RunsTable />
              </div>
            </WorkArea>
          </NavRailStack>
        </div>
      </ShellFrame>
    </div>
  );
}
