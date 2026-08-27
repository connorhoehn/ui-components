// Shared scaffolding for the four layout demos.
//
// These demos live INSIDE the docs shell, which already owns the viewport, so
// each one renders into a fixed-height framed box rather than `h-screen`. That
// is the only concession to the docs context — everything inside the frame is
// exactly what an app would render at the top level.
//
// Navigation is `useState`, not a router. The point on show is how the rails,
// the trail and the toolbar COMPOSE at depth; wiring react-router into a docs
// page would only add a second thing to read. `renderLink` is where a real app
// swaps the plain `<a>` for its own Link — the one line these demos skip.

import type { ReactNode } from 'react';
import {
  ChannelHeader,
  DataTable,
  StatusPill,
} from '../../../../src/components/shared';
import type { NavRailProps } from '../../../../src/components/shared';
import { ROWS } from './fixtures';

export function ShellFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border h-[560px]">
      {children}
    </div>
  );
}

export function DemoIntro({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <h1 className="m-0 text-xl font-semibold text-text-primary">{title}</h1>
      <p className="m-0 max-w-[70ch] text-sm text-text-secondary">{children}</p>
    </div>
  );
}

export function TopBar({ actions }: { actions?: ReactNode }) {
  return (
    <ChannelHeader
      name="Acme Platform"
      description="Live · us-east-1"
      online
      actions={actions}
    />
  );
}

/**
 * Intercepts the demo's fake hrefs so a click moves the selection instead of
 * reloading the docs site. A real app hands `renderLink` its router's Link and
 * deletes the preventDefault.
 */
export function makeRenderLink(onNavigate: (to: string) => void): NavRailProps['renderLink'] {
  return (item, props) => (
    <a
      {...props}
      href={`#${item.to ?? ''}`}
      onClick={(e) => {
        e.preventDefault();
        if (item.to) onNavigate(item.to);
      }}
    />
  );
}

const VERDICT_STATE = {
  regressed: 'error',
  improved: 'success',
  unchanged: 'neutral',
} as const;

/** Stand-in page body — long enough to prove the chrome does not scroll away. */
export function RunsTable() {
  return (
    <DataTable
      data={ROWS}
      keyField={(r) => r.id}
      columns={[
        { key: 'id', header: 'Run', sortable: true },
        { key: 'agent', header: 'Agent', sortable: true },
        { key: 'latency', header: 'p99', align: 'right' },
        {
          key: 'verdict',
          header: 'Verdict',
          render: (r) => (
            <StatusPill
              state={VERDICT_STATE[r.verdict as keyof typeof VERDICT_STATE]}
              label={r.verdict}
              size="sm"
            />
          ),
        },
      ]}
    />
  );
}
