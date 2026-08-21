// frontend/src/components/observability/components/ChaosPanel.tsx
//
// Left rail of /observability/nodes. Wired to the `chaosState` module,
// which the executor reads on every sleep/failure-roll. A future revision
// will replace the module-scoped state with the real distributed-core
// `ChaosInjector` (PIPELINES_PLAN.md §18.7).

import { useEffect, useMemo, useState } from 'react';
import Modal from '../../shared/Modal';
import { cn } from '../../../lib/cn';
import { Input } from '../../forms/Input';
import { Checkbox } from '../../forms/Checkbox';
import {
  getChaosState,
  resetChaosState,
  setChaosState,
  subscribeChaosState,
  type ChaosState,
} from '../../pipelines/chaos/chaosState';

export interface ChaosPanelNode {
  id: string;
  label?: string;
}

export interface ChaosPanelProps {
  onInjectLatency?: (ms: number) => void;
  onInjectPartition?: (nodeIds: string[]) => void;
  onDropMessages?: (percent: number) => void;
  onKillAll?: () => void;
  onReset?: () => void;
  availableNodes?: ChaosPanelNode[];
}

const defaultNodes: ChaosPanelNode[] = [
  { id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' },
];

function ChaosPanel(props: ChaosPanelProps) {
  // Default handlers mutate the shared `chaosState` module that the
  // executor reads. NodesPage can still override with its own richer
  // handlers (e.g. to layer additional observability behavior).
  const {
    onInjectLatency = (ms) => setChaosState({ injectedLatencyMs: Math.max(0, ms) }),
    onInjectPartition = (ids) =>
      // No partition semantics exist locally — map to pause so something
      // visibly happens when you click Inject.
      setChaosState({ paused: ids.length > 0 }),
    onDropMessages = (pct) =>
      // Interpret drop % as bonus failure-rate so the executor produces
      // roughly that many extra failed steps. Clamp 0..100.
      setChaosState({
        injectedFailureRate: Math.min(1, Math.max(0, pct / 100)),
      }),
    onKillAll = () => setChaosState({ paused: true }),
    onReset = () => resetChaosState(),
    availableNodes = defaultNodes,
  } = props;

  const [latencyMs, setLatencyMs] = useState('0');
  const [dropPercent, setDropPercent] = useState('0');
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [confirmKill, setConfirmKill] = useState(false);

  // Live chaos state — re-rendered when `setChaosState` fires.
  const [chaos, setChaos] = useState<ChaosState>(() => getChaosState());
  useEffect(() => subscribeChaosState((s) => setChaos(s)), []);

  const toggleNode = (id: string) => {
    setSelectedNodes((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id],
    );
  };

  const applyLatency = () => {
    const n = Number.parseInt(latencyMs, 10);
    if (Number.isFinite(n)) onInjectLatency(n);
  };

  const applyDrop = () => {
    const n = Number.parseInt(dropPercent, 10);
    if (Number.isFinite(n)) onDropMessages(n);
  };

  const injectPartition = () => {
    onInjectPartition(selectedNodes);
  };

  const confirmKillAll = () => {
    onKillAll();
    setConfirmKill(false);
  };

  const togglePause = () => {
    setChaosState({ paused: !chaos.paused });
  };

  const nodeOptions = useMemo(() => availableNodes, [availableNodes]);

  const chaosActive =
    chaos.injectedLatencyMs > 0 ||
    chaos.injectedFailureRate > 0 ||
    chaos.paused;

  return (
    <div
      data-testid="chaos-panel"
      className="w-60 shrink-0 p-4 bg-surface-panel border-r border-border font-[inherit] text-[13px] text-text-primary overflow-y-auto"
    >
      <div className="text-[11px] font-bold text-text-secondary tracking-[0.4px] mb-3">
        CHAOS
      </div>

      {/* Live state readout */}
      <div
        data-testid="chaos-state-readout"
        className={cn(
          'flex flex-col gap-1.5 pb-3 mb-3 border-b border-border',
          chaosActive && 'bg-warning-bg p-2 rounded-md border border-warning-border'
        )}
      >
        <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]">
          Current state
        </div>
        <div className="text-xs text-text-primary leading-relaxed">
          <div>
            <span className="text-text-tertiary">Latency:</span>{' '}
            <strong data-testid="chaos-state-latency">{chaos.injectedLatencyMs}</strong> ms
          </div>
          <div>
            <span className="text-text-tertiary">Failure rate:</span>{' '}
            <strong data-testid="chaos-state-failure">
              {Math.round(chaos.injectedFailureRate * 100)}
            </strong>
            %
          </div>
          <div>
            <span className="text-text-tertiary">Paused:</span>{' '}
            <strong data-testid="chaos-state-paused">{chaos.paused ? 'yes' : 'no'}</strong>
          </div>
        </div>
        <button
          data-testid="chaos-pause-toggle"
          onClick={togglePause}
          className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0"
        >
          {chaos.paused ? 'Resume' : 'Pause'}
        </button>
      </div>

      {/* Latency */}
      <div className="flex flex-col gap-1.5 pb-3 mb-3 border-b border-border">
        <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]">
          Latency
        </div>
        <div className="flex gap-1.5">
          <Input
            data-testid="chaos-latency-input"
            type="number"
            min={0}
            value={latencyMs}
            onChange={(e) => setLatencyMs(e.target.value)}
            className="flex-1 min-w-[60px]"
            aria-label="Latency in milliseconds"
          />
          <span className="text-[11px] text-text-tertiary self-center">ms</span>
        </div>
        <button
          data-testid="chaos-latency-apply"
          onClick={applyLatency}
          className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0"
        >
          Apply
        </button>
      </div>

      {/* Partition */}
      <div className="flex flex-col gap-1.5 pb-3 mb-3 border-b border-border">
        <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]">
          Partition nodes
        </div>
        <div className="flex flex-col gap-1">
          {nodeOptions.map((n) => (
            <label
              key={n.id}
              className="flex items-center gap-1.5 text-xs text-text-primary cursor-pointer"
            >
              <Checkbox
                checked={selectedNodes.includes(n.id)}
                onChange={() => toggleNode(n.id)}
              />
              {n.label ?? n.id}
            </label>
          ))}
        </div>
        <button
          data-testid="chaos-partition-inject"
          onClick={injectPartition}
          className={cn(
            'px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0',
            selectedNodes.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          )}
          disabled={selectedNodes.length === 0}
        >
          Inject
        </button>
      </div>

      {/* Drop messages */}
      <div className="flex flex-col gap-1.5 pb-3 mb-3 border-b border-border">
        <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]">
          Drop messages
        </div>
        <div className="flex gap-1.5">
          <Input
            data-testid="chaos-drop-input"
            type="number"
            min={0}
            max={100}
            value={dropPercent}
            onChange={(e) => setDropPercent(e.target.value)}
            className="flex-1 min-w-[60px]"
            aria-label="Drop percent"
          />
          <span className="text-[11px] text-text-tertiary self-center">%</span>
        </div>
        <button
          data-testid="chaos-drop-apply"
          onClick={applyDrop}
          className="px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0"
        >
          Apply
        </button>
      </div>

      {/* Kill all + Reset */}
      <div className="flex flex-col gap-2">
        <button
          data-testid="chaos-kill-all"
          onClick={() => setConfirmKill(true)}
          className="px-3.5 py-1.5 text-[13px] font-semibold bg-state-failed text-white border-none rounded-md cursor-pointer font-[inherit]"
        >
          Kill all
        </button>
        <button
          data-testid="chaos-reset"
          onClick={onReset}
          className="px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0"
        >
          Reset
        </button>
      </div>

      <Modal
        open={confirmKill}
        onClose={() => setConfirmKill(false)}
        title="Kill all nodes?"
        footer={
          <>
            <button
              data-testid="chaos-kill-cancel"
              onClick={() => setConfirmKill(false)}
              className="px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0"
            >
              Cancel
            </button>
            <button
              data-testid="chaos-kill-confirm"
              onClick={confirmKillAll}
              className="px-3.5 py-1.5 text-[13px] font-semibold bg-state-failed text-white border-none rounded-md cursor-pointer font-[inherit]"
            >
              Kill all
            </button>
          </>
        }
      >
        This will terminate every node in the cluster. This action is destructive
        and cannot be undone.
      </Modal>
    </div>
  );
}

export default ChaosPanel;
