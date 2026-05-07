// frontend/src/components/pipelines/canvas/ConfigPanel.tsx
//
// Right slide-over config panel per PIPELINES_PLAN.md §18.4.5 / §19.6.
//
// Opens when a node is selected; closes on Esc, click-outside, or the header
// close button. Body dispatches to per-type *Config components for the Config
// tab; Runs / Docs tabs are simple placeholders for now.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import type { NodeData, NodeType, PipelineNode } from '../../../types/pipeline';
import { cn } from '../../../lib/cn';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { usePipelineEditor } from '../context/PipelineEditorContext';
import TriggerConfig from '../nodes/trigger/TriggerConfig';
import LLMConfig from '../nodes/llm/LLMConfig';
import TransformConfig from '../nodes/transform/TransformConfig';
import ConditionConfig from '../nodes/condition/ConditionConfig';
import ActionConfig from '../nodes/action/ActionConfig';
import ForkConfig from '../nodes/fork/ForkConfig';
import JoinConfig from '../nodes/join/JoinConfig';
import ApprovalConfig from '../nodes/approval/ApprovalConfig';
import docsContent from '../nodes/docsContent';

// ---------------------------------------------------------------------------
// Per-type icon + display name (matches NodePalette).
// ---------------------------------------------------------------------------

const TYPE_META: Record<NodeType, { icon: string; name: string; docs: string }> = {
  trigger: {
    icon: '⚡',
    name: 'Trigger',
    docs: 'The entry point of the pipeline. Configure how the pipeline is started — manually, on a document event, on a schedule, or via webhook.',
  },
  llm: {
    icon: '🧠',
    name: 'LLM',
    docs: 'Calls an LLM model with a system + user prompt. Supports variable substitution from pipeline context (e.g. {{context.document.body}}).',
  },
  transform: {
    icon: '🔧',
    name: 'Transform',
    docs: 'Reshape or extract data from pipeline context using JSONPath, template strings, or sandboxed JavaScript.',
  },
  condition: {
    icon: '🔀',
    name: 'Condition',
    docs: 'Branch the pipeline on a boolean expression. The `true` output runs on match, the `false` output otherwise.',
  },
  action: {
    icon: '🎯',
    name: 'Action',
    docs: 'Produce a side effect — update a document, post a comment, notify a user, hit a webhook, or invoke an MCP tool.',
  },
  fork: {
    icon: '🍴',
    name: 'Fork',
    docs: 'Split execution into N parallel branches. Use with a Join to wait for all branches to complete.',
  },
  join: {
    icon: '🔗',
    name: 'Join',
    docs: 'Wait for multiple parallel branches to complete and merge their outputs. Supports all / any / n-of-m modes.',
  },
  approval: {
    icon: '✅',
    name: 'Approval',
    docs: 'Pause the pipeline and wait for a human to approve or reject. Supports n-of-m approvers and timeout fallbacks.',
  },
};

type Tab = 'config' | 'runs' | 'docs';

export interface ConfigPanelProps {
  /**
   * React Flow's current selected node IDs. If omitted or of length <= 1 the
   * panel falls back to `selectedNodeId` from the editor context.
   */
  selectedIds?: string[];
}

// ---------------------------------------------------------------------------
// Dispatch to per-type Config. Each *Config expects `{ data, onChange }`.
// ---------------------------------------------------------------------------

type AnyConfig = (props: {
  data: NodeData;
  onChange: (patch: Partial<NodeData>) => void;
}) => ReactElement;

const CONFIGS: Record<NodeType, AnyConfig> = {
  trigger: TriggerConfig as unknown as AnyConfig,
  llm: LLMConfig as unknown as AnyConfig,
  transform: TransformConfig as unknown as AnyConfig,
  condition: ConditionConfig as unknown as AnyConfig,
  action: ActionConfig as unknown as AnyConfig,
  fork: ForkConfig as unknown as AnyConfig,
  join: JoinConfig as unknown as AnyConfig,
  approval: ApprovalConfig as unknown as AnyConfig,
};

function renderConfig(
  node: PipelineNode,
  onChange: (patch: Partial<NodeData>) => void,
): ReactElement {
  const Config = CONFIGS[node.type];
  return <Config data={node.data} onChange={onChange} />;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ConfigPanel({ selectedIds }: ConfigPanelProps) {
  const {
    definition,
    selectedNodeId,
    setSelectedNodeId,
    updateNodeData,
    removeNode,
    duplicateNodes,
  } = usePipelineEditor();

  const [tab, setTab] = useState<Tab>('config');
  const panelRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const _reduceMotion = usePrefersReducedMotion();

  // Effective selection: multi-select wins when passed; else single from ctx.
  const effectiveIds = useMemo(() => {
    if (selectedIds && selectedIds.length > 1) return selectedIds;
    if (selectedNodeId) return [selectedNodeId];
    return [];
  }, [selectedIds, selectedNodeId]);

  const isMulti = effectiveIds.length > 1;
  const open = effectiveIds.length > 0;

  const selectedNode = useMemo<PipelineNode | null>(() => {
    if (isMulti || effectiveIds.length === 0 || !definition) return null;
    return definition.nodes.find((n) => n.id === effectiveIds[0]) ?? null;
  }, [definition, effectiveIds, isMulti]);

  const close = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  // Reset tab to 'config' when selection changes to a different node.
  useEffect(() => {
    setTab('config');
  }, [effectiveIds.join(',')]);

  // Escape to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Click-outside to close
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      const el = panelRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      if (!(e.target instanceof Element)) return;
      if (e.target.closest('[data-node-type]')) return;
      close();
    };
    window.addEventListener('mousedown', onPointerDown);
    return () => window.removeEventListener('mousedown', onPointerDown);
  }, [open, close]);

  const meta = selectedNode ? TYPE_META[selectedNode.type] : null;

  const handleDelete = () => {
    if (isMulti) {
      for (const id of effectiveIds) removeNode(id);
    } else if (selectedNode) {
      removeNode(selectedNode.id);
    }
  };

  const handleDuplicate = () => {
    if (effectiveIds.length === 0) return;
    duplicateNodes(effectiveIds);
  };

  const onChange = (patch: Partial<NodeData>) => {
    if (!selectedNode) return;
    updateNodeData(selectedNode.id, patch);
  };

  return (
    <div ref={panelRef} className="flex flex-col flex-1 min-h-0 bg-white" data-testid="config-panel">
      {isMulti ? (
        // ---------------------------------------------------------------
        // Multi-select pane
        // ---------------------------------------------------------------
        <>
          <div className="h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0">
            <span className="text-base" aria-hidden>{'⧉'}</span>
            <div className="flex-1 text-[13px] font-semibold text-[#0f172a]">
              {effectiveIds.length} nodes selected
            </div>
            <button
              type="button"
              onClick={close}
              className="w-7 h-7 p-0 bg-transparent border-none text-[#64748b] text-lg leading-none cursor-pointer rounded font-inherit"
              aria-label="Close"
            >
              {'×'}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            <div className="text-xs text-[#64748b] leading-normal">
              Bulk actions apply to every selected node. Individual node
              configuration is only shown for single selections.
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDelete}
                className="px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-[#fecaca] rounded-md cursor-pointer font-inherit"
              >
                Delete all
              </button>
              <button
                type="button"
                onClick={handleDuplicate}
                className="px-2.5 py-1.5 text-xs font-semibold bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0] rounded-md cursor-pointer font-inherit"
              >
                Duplicate all
              </button>
            </div>
          </div>
        </>
      ) : selectedNode && meta ? (
        // ---------------------------------------------------------------
        // Single-node pane
        // ---------------------------------------------------------------
        <>
          <div className="h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0">
            <span className="text-lg leading-none" aria-hidden>{meta.icon}</span>
            <div className="flex-1 text-[13px] font-semibold text-[#0f172a]">
              {meta.name}
            </div>
            <button
              type="button"
              onClick={close}
              className="w-7 h-7 p-0 bg-transparent border-none text-[#64748b] text-lg leading-none cursor-pointer rounded font-inherit"
              aria-label="Close"
            >
              {'×'}
            </button>
          </div>
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Node configuration tabs"
            className="h-9 flex border-b border-[#e2e8f0] shrink-0"
            onKeyDown={(e) => {
              const order: Tab[] = ['config', 'runs', 'docs'];
              const idx = order.indexOf(tab);
              let next: Tab | null = null;
              if (e.key === 'ArrowRight') next = order[(idx + 1) % order.length];
              else if (e.key === 'ArrowLeft') next = order[(idx - 1 + order.length) % order.length];
              else if (e.key === 'Home') next = order[0];
              else if (e.key === 'End') next = order[order.length - 1];
              if (next) {
                e.preventDefault();
                setTab(next);
                const btn = tabsRef.current?.querySelector<HTMLButtonElement>(
                  `[data-tab="${next}"]`,
                );
                btn?.focus();
              }
            }}
          >
            {(['config', 'runs', 'docs'] as Tab[]).map((key) => {
              const active = tab === key;
              const label = key === 'config' ? 'Config' : key === 'runs' ? 'Runs' : 'Docs';
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  data-tab={key}
                  className={cn(
                    'flex-1 border-none bg-transparent text-xs font-semibold cursor-pointer font-inherit',
                    active
                      ? 'text-[#0f172a] border-b-2 border-b-[#646cff]'
                      : 'text-[#64748b] border-b-2 border-b-transparent',
                  )}
                  onClick={() => setTab(key)}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="flex-1 overflow-y-auto">
            {tab === 'config' && renderConfig(selectedNode, onChange)}
            {tab === 'runs' && (
              <div className="p-6 text-xs text-[#64748b]">
                No runs yet.
              </div>
            )}
            {tab === 'docs' && (
              <div className="pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug">
                {/* Scoped prose styles */}
                <style>{`
                  .pipeline-docs-pane h4 {
                    font-size: 14px;
                    font-weight: 600;
                    color: #0f172a;
                    margin: 16px 0 8px;
                    padding-bottom: 4px;
                    border-bottom: 1px solid #e2e8f0;
                  }
                  .pipeline-docs-pane h4:first-child {
                    margin-top: 0;
                  }
                  .pipeline-docs-pane p {
                    margin: 0 0 8px;
                  }
                  .pipeline-docs-pane ul {
                    margin: 0 0 8px;
                    padding-left: 18px;
                  }
                  .pipeline-docs-pane li {
                    margin-bottom: 4px;
                  }
                  .pipeline-docs-pane code {
                    font-size: 12px;
                    color: #475569;
                    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
                  }
                `}</style>
                {docsContent[selectedNode.type] ?? (
                  <p className="text-text-secondary">
                    No docs available for this node type.
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="h-10 px-3 flex items-center justify-between gap-2 border-t border-[#e2e8f0] shrink-0">
            <button
              type="button"
              onClick={handleDelete}
              className="px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-transparent rounded-md cursor-pointer font-inherit"
            >
              🗑 Delete node
            </button>
            <button
              type="button"
              onClick={handleDuplicate}
              className="px-2.5 py-1.5 text-xs font-semibold bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0] rounded-md cursor-pointer font-inherit"
            >
              {'⧉'} Duplicate
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
