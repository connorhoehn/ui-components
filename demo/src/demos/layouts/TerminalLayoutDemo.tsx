// The same chrome in the code family.
//
// Terminal surfaces cannot follow the host theme — a PTY's own escape codes do
// not flip when the user picks light mode — so every layout piece here takes
// `tone="code"` and paints in the permanently-dark Catppuccin family. Without
// it, a rail beside a terminal renders as a white column against a black hole,
// which is why these surfaces used to hand-roll their chrome instead of
// reaching for the library.
//
// Note the split: the outer shell stays in the `surface` family (it belongs to
// the app), and only the pane's own rail, toolbar and work area go `code`.

import { useState } from 'react';
import {
  Button,
  NavRailStack,
  Toolbar,
  ToolbarGroup,
  ToolbarLabel,
  WorkArea,
} from '../../../../src/components/shared';
import { FLEET_ITEMS, PLATFORM_ITEMS } from './fixtures';
import { DemoIntro, ShellFrame, TopBar, makeRenderLink } from './chrome';

const SESSION = [
  ['$', 'pytest -q'],
  ['', '..........................'],
  ['', '42 passed in 3.21s'],
  ['$', 'git status --short'],
  ['', ' M src/handlers/ingest.py'],
  ['$', 'claude "fix the flaky retry test"'],
] as const;

export default function TerminalLayoutDemo() {
  const [active, setActive] = useState('/box/4f2a');
  const renderLink = makeRenderLink(setActive);

  return (
    <div className="mx-auto max-w-[1100px]">
      <DemoIntro title="Code tone — the same chrome, terminal family">
        `NavRail`, `Toolbar` and `WorkArea` all take the `SurfaceTone` prop, so a rail beside a PTY
        paints in the code palette instead of the app&apos;s theme-following one. The outer shell
        stays in the app family — only the pane switches.
      </DemoIntro>

      <ShellFrame>
        <TopBar actions={<Button size="sm" variant="ghost">New computer</Button>} />
        <div className="min-h-0 flex-1">
          <NavRailStack
            rails={[
              { id: 'platform', title: 'Acme', items: PLATFORM_ITEMS, width: 'narrow' },
              {
                id: 'fleet',
                title: 'Fleet',
                items: FLEET_ITEMS,
                tone: 'code',
                match: 'exact',
                width: 'narrow',
                footer: <ToolbarLabel tone="code">3 boxes · $0.42/h</ToolbarLabel>,
              },
            ]}
            activeHref={active}
            renderLink={renderLink}
            storageKey="demo-layout-terminal"
          >
            <WorkArea
              tone="code"
              padded={false}
              bodyClassName="p-4"
              toolbar={
                <Toolbar
                  tone="code"
                  aria-label="Terminal actions"
                  end={<Button size="sm" variant="ghost" tone="code">Detach</Button>}
                >
                  <ToolbarGroup tone="code" aria-label="Panes">
                    <Button size="sm" variant="ghost" tone="code">Split</Button>
                    <Button size="sm" variant="ghost" tone="code">Broadcast</Button>
                  </ToolbarGroup>
                  <ToolbarGroup tone="code" divided>
                    <ToolbarLabel tone="code">{active.replace('/box/', 'box-')}</ToolbarLabel>
                  </ToolbarGroup>
                </Toolbar>
              }
              status={<span>connected · idle 0m · stops in 58m</span>}
            >
              <pre className="m-0 font-mono text-[12px] leading-relaxed text-code-text">
                {SESSION.map(([prompt, line], i) => (
                  <div key={i}>
                    {prompt && <span className="text-code-green">{prompt} </span>}
                    <span className={prompt ? 'text-code-text' : 'text-code-subtle'}>{line}</span>
                  </div>
                ))}
              </pre>
            </WorkArea>
          </NavRailStack>
        </div>
      </ShellFrame>
    </div>
  );
}
