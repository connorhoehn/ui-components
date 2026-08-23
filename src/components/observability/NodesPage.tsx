// frontend/src/components/observability/NodesPage.tsx
//
// Three-region /observability/nodes route (PIPELINES_PLAN.md §18.7):
//   left:   ChaosPanel (240px) — latency / partition / drop / kill-all / reset
//   center: NodeGrid — cards wrap; click to select and open drawer
//   right:  detail drawer (320px, only while a node is selected) — full
//           metrics, owned resources list (empty Phase 1), scoped chaos, and
//           a stub `[Transfer resource]` button
//
// Phase 1: node data is fabricated from the dashboard fixture. When the
// fixture doesn't ship per-node detail (today: it doesn't), we fabricate
// 3 sensible `node-0/1/2` entries.

import { useMemo, useState } from 'react';
import ChaosPanel from './components/ChaosPanel';
import NodeGrid from './components/NodeGrid';
import type { NodeSummary } from './components/NodeGridTile';
import dashboardFixture from './fixtures/dashboardFixture';

// ---------------------------------------------------------------------------
// Fixture -> NodeSummary shaping
// ---------------------------------------------------------------------------

function seededHistory(seed: number): number[] {
  const out: number[] = [];
  let v = seed;
  for (let i = 0; i < 24; i++) {
    v = (v * 9301 + 49297) % 233280;
    out.push(Math.abs(v % 40) + 5);
  }
  return out;
}

function fabricateNodes(): NodeSummary[] {
  return [
    {
      id: 'node-0', status: 'healthy', role: 'worker', region: 'us-east-1',
      cpu: 12, memoryMb: 340, connections: 12, activeRuns: 2, cpuHistory: seededHistory(1),
    },
    {
      id: 'node-1', status: 'healthy', role: 'worker', region: 'us-east-1',
      cpu: 8, memoryMb: 280, connections: 15, activeRuns: 1, cpuHistory: seededHistory(7),
    },
    {
      id: 'node-2', status: 'healthy', role: 'worker', region: 'us-east-1',
      cpu: 19, memoryMb: 395, connections: 9, activeRuns: 0, cpuHistory: seededHistory(13),
    },
  ];
}

function resolveNodes(): NodeSummary[] {
  // Phase 1 fixture has no per-node detail; fabricate a reasonable default.
  // Future: read from `dashboardFixture.regions[*].nodes`.
  const regions = dashboardFixture?.regions ?? {};
  const fromFixture: NodeSummary[] = [];
  for (const key of Object.keys(regions)) {
    const region = regions[key];
    if (region?.nodes && Array.isArray(region.nodes)) {
      for (const n of region.nodes) {
        fromFixture.push({
          id: n.id ?? `node-${fromFixture.length}`,
          status: n.status ?? 'healthy',
          role: n.role ?? 'worker',
          region: key,
          cpu: n.cpu ?? 0,
          memoryMb: n.memoryMb ?? 0,
          connections: n.connections ?? 0,
          activeRuns: n.activeRuns ?? 0,
          cpuHistory: n.cpuHistory ?? seededHistory(fromFixture.length + 1),
        });
      }
    }
  }
  return fromFixture.length > 0 ? fromFixture : fabricateNodes();
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function formatMem(mb: number): string {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)}G`;
  return `${Math.round(mb)}M`;
}

export interface NodesPageProps {
  /**
   * Node summaries to render. When omitted, falls back to the Phase-1
   * fixture-derived set so the demo route is never blank.
   */
  nodes?: NodeSummary[];
  /** Host-wired per-node chaos: add latency. Section hidden when absent. */
  onAddLatency?: (nodeId: string) => void;
  /** Host-wired per-node chaos: kill. Section hidden when absent. */
  onKillNode?: (nodeId: string) => void;
  /** Host-wired resource transfer. Section hidden when absent. */
  onTransferResource?: (nodeId: string) => void;
}

function NodesPage({
  nodes: nodesProp,
  onAddLatency,
  onKillNode,
  onTransferResource,
}: NodesPageProps) {
  const fixtureNodes = useMemo(resolveNodes, []);
  const nodes = nodesProp ?? fixtureNodes;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(
    () => nodes.find((n) => n.id === selectedId) ?? null,
    [nodes, selectedId],
  );

  return (
    <div
      data-testid="nodes-page"
      className="flex h-full min-h-0 font-[inherit] text-[13px] text-text-primary bg-surface"
    >
      {/* Chaos rail — wired to the shared `chaosState` module via ChaosPanel's
          default handlers. Real distributed-core injection lands in Phase 5. */}
      <div
        title="Stub: writes to local chaosState; real cluster injection ships in Phase 5"
        data-testid="chaos-rail-stub-wrapper"
      >
        <ChaosPanel
          availableNodes={nodes.map((n) => ({ id: n.id, label: n.id }))}
        />
      </div>

      <section className="flex-1 min-w-0 overflow-auto p-6">
        <NodeGrid
          nodes={nodes}
          selectedId={selectedId ?? undefined}
          onSelect={(id) => setSelectedId(id === selectedId ? null : id)}
        />
      </section>

      {selected && (
        <aside
          data-testid="nodes-detail-drawer"
          className="w-80 shrink-0 border-l border-border bg-surface flex flex-col overflow-y-auto"
        >
          <div className="px-3.5 py-3 border-b border-border flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-[13px] font-semibold">{selected.id}</div>
              <div className="text-[11px] text-text-tertiary">
                {[selected.role, selected.region].filter(Boolean).join(' · ') || 'worker'}
              </div>
            </div>
            <button
              data-testid="nodes-detail-close"
              onClick={() => setSelectedId(null)}
              aria-label="Close drawer"
              className="border-none bg-transparent text-text-tertiary cursor-pointer text-base p-0.5 font-[inherit]"
            >
              ×
            </button>
          </div>

          {/* Metrics table */}
          <div className="px-3.5 py-3 border-b border-border flex flex-col gap-2">
            <div className="text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase">
              Metrics
            </div>
            <table className="w-full text-xs border-collapse">
              <tbody>
                {[
                  ['Status', selected.status],
                  ['CPU', `${Math.round(selected.cpu)}%`],
                  ['Memory', formatMem(selected.memoryMb)],
                  ['Connections', String(selected.connections)],
                  ['Active runs', String(selected.activeRuns)],
                  ['Region', selected.region ?? '—'],
                  ['Role', selected.role ?? '—'],
                ].map(([k, v]) => (
                  <tr key={k as string}>
                    <td className="text-text-tertiary py-[3px] w-[45%]">
                      {k}
                    </td>
                    <td className="text-text-primary py-[3px]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Owned resources (empty in Phase 1) */}
          <div className="px-3.5 py-3 border-b border-border flex flex-col gap-2">
            <div className="text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase">
              Owned resources
            </div>
            <div className="text-xs text-text-tertiary">
              No resources owned (Phase 1 placeholder).
            </div>
          </div>

          {/* Chaos controls scoped to node — host-wired; hidden when the
              host provides no handlers, so no button is ever a no-op. */}
          {(onAddLatency || onKillNode) && (
            <div className="px-3.5 py-3 border-b border-border flex flex-col gap-2">
              <div className="text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase">
                Chaos (this node)
              </div>
              {onAddLatency && (
                <button
                  onClick={() => onAddLatency(selected.id)}
                  className="self-start px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0"
                >
                  Add latency
                </button>
              )}
              {onKillNode && (
                <button
                  onClick={() => onKillNode(selected.id)}
                  className="self-start px-3.5 py-1.5 text-[13px] font-semibold bg-state-failed text-white border-none rounded-md cursor-pointer font-[inherit]"
                >
                  Kill node
                </button>
              )}
            </div>
          )}

          {onTransferResource && (
            <div className="px-3.5 py-3 border-b border-border flex flex-col gap-2">
              <div className="text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase">
                Actions
              </div>
              <button
                onClick={() => onTransferResource(selected.id)}
                className="px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0"
              >
                Transfer resource
              </button>
            </div>
          )}
        </aside>
      )}
    </div>
  );
}

export default NodesPage;
