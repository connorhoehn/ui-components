// Depth 3 — three rails, a six-crumb trail, a toolbar and a status row.
//
// This is the shape the whole set exists for: a route nested under three
// layouts, where "what can I open" (three rails) and "where do I stand" (the
// trail) are genuinely different questions and the rails can only answer the
// first.
//
// Two behaviours to watch:
//   · The trail is six deep and does not wrap — `maxItems={4}` collapses the
//     middle into a MENU, so the levels you skipped are still one click away
//     instead of four presses of the back button.
//   · Collapse the "Advanced" group on the middle rail and reload: each rail
//     persists its own group state, because `NavRailStack` suffixes the
//     storage key with the rail id. Sharing one key is the bug this prevents —
//     collapsing a group in one rail silently collapsed the same-named group
//     in the other.

import { useState } from 'react';
import {
  Breadcrumbs,
  Button,
  NavRailStack,
  StatusPill,
  Toolbar,
  ToolbarGroup,
  ToolbarLabel,
  WorkArea,
} from '../../../../src/components/shared';
import { DEEP_TRAIL, HARNESS_ITEMS, HEALTH_ITEMS, PLATFORM_ITEMS } from './fixtures';
import { DemoIntro, RunsTable, ShellFrame, TopBar, makeRenderLink } from './chrome';

export default function DeepLayoutDemo() {
  const [active, setActive] = useState('/health/harness/compare');
  const renderLink = makeRenderLink(setActive);

  return (
    <div className="mx-auto max-w-[1200px]">
      <DemoIntro title="Deep — three rails and a collapsing trail">
        Three nav levels wrap this leaf page, the way a global shell, a section layout and a
        sub-section layout wrap a route three `&lt;Route&gt;` elements deep. The trail is six crumbs;
        the middle four collapse into a menu rather than wrapping onto a second line.
      </DemoIntro>

      <ShellFrame>
        <TopBar
          actions={
            <div className="flex items-center gap-2">
              <StatusPill state="success" label="Live" size="sm" />
              <Button size="sm" variant="ghost">Invite</Button>
            </div>
          }
        />
        <div className="min-h-0 flex-1">
          <NavRailStack
            rails={[
              { id: 'platform', title: 'Acme', items: PLATFORM_ITEMS, width: 'narrow' },
              { id: 'health', title: 'Health', items: HEALTH_ITEMS, width: 'narrow' },
              {
                id: 'harness',
                title: 'Harness',
                items: HARNESS_ITEMS,
                match: 'exact',
                width: 'narrow',
                footer: <ToolbarLabel>4 suites</ToolbarLabel>,
              },
            ]}
            activeHref={active}
            renderLink={renderLink}
            storageKey="demo-layout-deep"
          >
            <WorkArea
              breadcrumbs={
                <Breadcrumbs
                  separator="›"
                  maxItems={4}
                  overflow="menu"
                  minItems={3}
                  items={DEEP_TRAIL}
                />
              }
              toolbar={
                <Toolbar
                  aria-label="Comparison actions"
                  end={<Button size="sm" variant="ghost">Export CSV</Button>}
                >
                  <ToolbarGroup aria-label="Run">
                    <Button size="sm" variant="primary">Re-run both</Button>
                    <Button size="sm" variant="ghost">Promote baseline</Button>
                  </ToolbarGroup>
                  <ToolbarGroup divided>
                    <ToolbarLabel>nightly-08-24 vs nightly-08-23</ToolbarLabel>
                  </ToolbarGroup>
                </Toolbar>
              }
              status={
                <>
                  <span>2 runs · 1,204 spans</span>
                  <span>projected 2m ago</span>
                </>
              }
            >
              <div className="flex flex-col gap-4">
                <h2 className="m-0 text-lg font-semibold text-text-primary">Compare runs</h2>
                <p className="m-0 max-w-[70ch] text-sm text-text-secondary">
                  Scroll this table. The three rails, the trail, the toolbar and the status row all
                  stay — `WorkArea` gives the body the only `overflow-auto` in the column.
                </p>
                <RunsTable />
              </div>
            </WorkArea>
          </NavRailStack>
        </div>
      </ShellFrame>
    </div>
  );
}
