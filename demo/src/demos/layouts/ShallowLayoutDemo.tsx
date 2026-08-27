// Depth 1 — top bar + one rail.
//
// The shallow case exists in this set to make a point by omission: there is no
// breadcrumb row and no toolbar. One rail already answers "where am I", so a
// trail here would repeat the highlighted item back at you, and a toolbar with
// one button in it is a button. `Breadcrumbs minItems={3}` is how a shell that
// renders the trail on EVERY route gets this page for free — see the deep demo.

import { useState } from 'react';
import {
  Button,
  NavRailStack,
  WorkArea,
} from '../../../../src/components/shared';
import { PLATFORM_ITEMS } from './fixtures';
import { DemoIntro, RunsTable, ShellFrame, TopBar, makeRenderLink } from './chrome';

export default function ShallowLayoutDemo() {
  const [active, setActive] = useState('/health');
  const renderLink = makeRenderLink(setActive);

  return (
    <div className="mx-auto max-w-[1100px]">
      <DemoIntro title="Shallow — one rail">
        A single vertical nav and a content column. `NavRailStack` takes an array of rails, so
        this page and the three-rail page below are the same component with a different array —
        no second layout component, no `secondaryItems` prop that only stretches to two.
      </DemoIntro>

      <ShellFrame>
        <TopBar actions={<Button size="sm" variant="ghost">Invite</Button>} />
        <div className="min-h-0 flex-1">
          <NavRailStack
            rails={[
              {
                id: 'platform',
                title: 'Acme',
                items: PLATFORM_ITEMS,
                width: 'narrow',
                renderLink,
              },
            ]}
            activeHref={active}
            storageKey="demo-layout-shallow"
          >
            <WorkArea>
              <div className="flex flex-col gap-4">
                <h2 className="m-0 text-lg font-semibold text-text-primary">Health</h2>
                <p className="m-0 text-sm text-text-secondary">
                  Scroll: the top bar stays put because only the `WorkArea` body scrolls.
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
