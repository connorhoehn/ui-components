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
import ScatterConfig from '../nodes/scatter/ScatterConfig';
import ResizeConfig from '../nodes/resize/ResizeConfig';
import TransformGeoConfig from '../nodes/transform-geo/TransformGeoConfig';
import FormatConvertConfig from '../nodes/format-convert/FormatConvertConfig';
import SharpenConfig from '../nodes/sharpen/SharpenConfig';
import WatermarkConfig from '../nodes/watermark/WatermarkConfig';
import CropConfig from '../nodes/crop/CropConfig';
import AdjustBwConfig from '../nodes/adjust-bw/AdjustBwConfig';
import AdjustLayerConfig from '../nodes/adjust-layer/AdjustLayerConfig';
import DimensionsConfig from '../nodes/dimensions/DimensionsConfig';
import UpscaleConfig from '../nodes/upscale/UpscaleConfig';
import VisionConfig from '../nodes/vision/VisionConfig';
import VisionClassifyConfig from '../nodes/vision-classify/VisionClassifyConfig';
import VisionDescribeConfig from '../nodes/vision-describe/VisionDescribeConfig';
import VisionTagConfig from '../nodes/vision-tag/VisionTagConfig';
import VisionExtractTextConfig from '../nodes/vision-extract-text/VisionExtractTextConfig';
import GenerateConfig from '../nodes/generate/GenerateConfig';
import VariationConfig from '../nodes/variation/VariationConfig';
import EditPromptConfig from '../nodes/edit-prompt/EditPromptConfig';
import docsContent from '../nodes/docsContent';
import VisionPromptBench from '../vision/VisionPromptBench';

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
  agent: {
    icon: '🤖',
    name: 'Agent',
    docs: 'Invoke a Strands agent via A2A protocol. Supports streaming output and configurable timeouts.',
  },
  'mcp-tool': {
    icon: '🔌',
    name: 'MCP Tool',
    docs: 'Invoke an external tool through MCP Gateway. Supports arbitrary tool inputs and configurable timeouts.',
  },
  'knowledge-base': {
    icon: '📚',
    name: 'Knowledge Base',
    docs: 'Query a Bedrock Knowledge Base for relevant document chunks via RAG retrieval.',
  },
  'graph-query': {
    icon: '🕸️',
    name: 'Graph Query',
    docs: 'Run an openCypher query against Neptune Analytics. Returns graph traversal results into pipeline context.',
  },
  memory: {
    icon: '💾',
    name: 'Memory',
    docs: 'Read from or write to AgentCore Memory. Supports session-scoped and long-term persistent storage.',
  },
  guardrail: {
    icon: '🛡️',
    name: 'Guardrail',
    docs: 'Apply Bedrock Guardrails content filtering. Routes to pass or block based on content policy evaluation.',
  },
  policy: {
    icon: '📜',
    name: 'Policy',
    docs: 'Evaluate a Cedar authorization policy. Routes to allow or deny based on principal/action/resource.',
  },
  'ag-ui-output': {
    icon: '📡',
    name: 'AG-UI Output',
    docs: 'Stream output to the AG-UI frontend. Terminal node — emits AG-UI protocol events for real-time display.',
  },
  'image-source': {
    icon: '🖼',
    name: 'Image Source',
    docs: 'Injects an existing image into the pipeline context. Provide an imageId or leave blank to receive the image from the trigger or a preceding step at runtime.',
  },
  'image:save': {
    icon: '⬇',
    name: 'Save Image',
    docs: 'Writes a produced image to a named file in the artifact store. Configure the source image path and output filename template.',
  },
  scatter: {
    icon: '🔀',
    name: 'Scatter',
    docs: 'Fans out over a collection — runs downstream nodes once per item in the scatter set.',
  },
  'image:resize': {
    icon: '⥂',
    name: 'Resize',
    docs: 'Resize an image to target dimensions using sharp.resize(). Supports fit modes: cover, contain, fill, inside, outside.',
  },
  'image:transform': {
    icon: '↻',
    name: 'Transform (Geo)',
    docs: 'Apply a chain of geometric operations — rotate, flip (vertical), flop (horizontal) — using sharp.',
  },
  'image:format-convert': {
    icon: '⇌',
    name: 'Format Convert',
    docs: 'Convert image format (JPEG, PNG, WebP, AVIF, TIFF, GIF). Configure quality or lossless for supported formats.',
  },
  'image:sharpen': {
    icon: '◈',
    name: 'Sharpen',
    docs: 'Sharpen an image using the unsharp mask algorithm. Configure sigma, m1, and m2 parameters.',
  },
  'image:watermark': {
    icon: '⊕',
    name: 'Watermark',
    docs: 'Composite a watermark / overlay image atop the source. Configure gravity, opacity, and offset.',
  },
  'image:crop': {
    icon: '✂',
    name: 'Crop',
    docs: 'Crop a region from the source image using a bounding box pulled from pipeline context via JSONPath.',
  },
  'image:adjust-bw': {
    icon: '◐',
    name: 'Adjust B/W',
    docs: 'Convert an image to greyscale. Choose algorithm (luminosity, average, lightness) and contrast multiplier.',
  },
  'image:adjust-layer': {
    icon: '𝍩',
    name: 'Adjust Layers',
    docs: 'Apply a composable stack of colour and filter adjustments — brightness, contrast, saturation, hue, blur.',
  },
  'image:dimensions': {
    icon: '📐',
    name: 'Dimensions',
    docs: "Read a source image's natural size and emit width/height/aspectRatio plus genWidth/genHeight scaled to fit maxEdge. Wire the derived dimensions into Generate.",
  },
  'image:upscale': {
    icon: '⤢',
    name: 'Upscale',
    docs: '4× super-resolution of a source image via a self-hosted upscaler. Outputs a new, higher-resolution image.',
  },
  'image:vision-analyze': {
    icon: '📷',
    name: 'Vision Analyze',
    docs: 'Analyze an image with a Claude vision model. Supports free-form caption mode and structured JSON extraction.',
  },
  'image:vision-classify': {
    icon: '🏷',
    name: 'Vision Classify',
    docs: 'Classify an image into one of a configured label set. Returns label + confidence score.',
  },
  'image:vision-describe': {
    icon: '💬',
    name: 'Vision Describe',
    docs: 'Generate a natural-language caption for an image via Claude Haiku. Supports custom system and user prompts.',
  },
  'image:vision-tag': {
    icon: '🔖',
    name: 'Vision Tag',
    docs: 'Extract ranked tags from an image. Supports open-vocabulary tagging or a guided candidate-tag list.',
  },
  'image:vision-extract-text': {
    icon: '📝',
    name: 'Vision Extract Text',
    docs: 'OCR / text extraction from an image via a Claude vision model. Returns extracted text lines.',
  },
  'image:generate': {
    icon: '✦',
    name: 'Generate Image',
    docs: 'Generate images from a text prompt using Bedrock Titan Image Generator. Configure dimensions and image count.',
  },
  'image:variation': {
    icon: '⊞',
    name: 'Variation',
    docs: 'Generate variations of a source image using Nova Canvas. Always fans out — each variation becomes a separate pipeline arm.',
  },
  'image:edit-prompt': {
    icon: '✎',
    name: 'Edit Prompt',
    docs: 'Inpaint or outpaint a region of an image using Nova Canvas. Provide an optional mask (white = edit, black = preserve).',
  },
};

type Tab = 'config' | 'runs' | 'docs' | 'bench';

const VISION_NODE_TYPES = new Set<NodeType>([
  'image:vision-analyze',
  'image:vision-classify',
  'image:vision-describe',
  'image:vision-tag',
  'image:vision-extract-text',
]);

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

const PlaceholderConfig: AnyConfig = ({ data }) => (
  <div className="p-3 text-[13px] text-[#64748b]">
    Configuration for <strong>{data.type}</strong> — coming in Phase C.
  </div>
);

const CONFIGS: Record<NodeType, AnyConfig> = {
  trigger: TriggerConfig as unknown as AnyConfig,
  llm: LLMConfig as unknown as AnyConfig,
  transform: TransformConfig as unknown as AnyConfig,
  condition: ConditionConfig as unknown as AnyConfig,
  action: ActionConfig as unknown as AnyConfig,
  fork: ForkConfig as unknown as AnyConfig,
  join: JoinConfig as unknown as AnyConfig,
  approval: ApprovalConfig as unknown as AnyConfig,
  agent: PlaceholderConfig,
  'mcp-tool': PlaceholderConfig,
  'knowledge-base': PlaceholderConfig,
  'graph-query': PlaceholderConfig,
  memory: PlaceholderConfig,
  guardrail: PlaceholderConfig,
  policy: PlaceholderConfig,
  'ag-ui-output': PlaceholderConfig,
  'image-source': PlaceholderConfig,
  'image:save': PlaceholderConfig,
  scatter: ScatterConfig as unknown as AnyConfig,
  'image:resize': ResizeConfig as unknown as AnyConfig,
  'image:transform': TransformGeoConfig as unknown as AnyConfig,
  'image:format-convert': FormatConvertConfig as unknown as AnyConfig,
  'image:sharpen': SharpenConfig as unknown as AnyConfig,
  'image:watermark': WatermarkConfig as unknown as AnyConfig,
  'image:crop': CropConfig as unknown as AnyConfig,
  'image:adjust-bw': AdjustBwConfig as unknown as AnyConfig,
  'image:adjust-layer': AdjustLayerConfig as unknown as AnyConfig,
  'image:dimensions': DimensionsConfig as unknown as AnyConfig,
  'image:upscale': UpscaleConfig as unknown as AnyConfig,
  'image:vision-analyze': VisionConfig as unknown as AnyConfig,
  'image:vision-classify': VisionClassifyConfig as unknown as AnyConfig,
  'image:vision-describe': VisionDescribeConfig as unknown as AnyConfig,
  'image:vision-tag': VisionTagConfig as unknown as AnyConfig,
  'image:vision-extract-text': VisionExtractTextConfig as unknown as AnyConfig,
  'image:generate': GenerateConfig as unknown as AnyConfig,
  'image:variation': VariationConfig as unknown as AnyConfig,
  'image:edit-prompt': EditPromptConfig as unknown as AnyConfig,
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
              const showBench = selectedNode && VISION_NODE_TYPES.has(selectedNode.type);
              const order: Tab[] = showBench
                ? ['config', 'runs', 'docs', 'bench']
                : ['config', 'runs', 'docs'];
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
            {((): Tab[] => {
              const showBench = selectedNode && VISION_NODE_TYPES.has(selectedNode.type);
              return showBench
                ? ['config', 'runs', 'docs', 'bench']
                : ['config', 'runs', 'docs'];
            })().map((key) => {
              const active = tab === key;
              const label =
                key === 'config' ? 'Config'
                : key === 'runs' ? 'Runs'
                : key === 'docs' ? 'Docs'
                : 'Bench';
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
                {docsContent[selectedNode.type] ?? (
                  <p className="text-text-secondary">
                    No docs available for this node type.
                  </p>
                )}
              </div>
            )}
            {tab === 'bench' && VISION_NODE_TYPES.has(selectedNode.type) && (() => {
              // Extract current node data for vision prompts.
              const vd = selectedNode.data as unknown as {
                systemPrompt?: string;
                userPrompt?: string;
                outputSchema?: Record<string, unknown>;
                model?: string;
              };
              return (
                <VisionPromptBench
                  systemPrompt={vd.systemPrompt ?? ''}
                  userPrompt={vd.userPrompt ?? ''}
                  outputSchema={vd.outputSchema}
                  model={vd.model}
                  onSave={(values) => {
                    onChange(values as Partial<NodeData>);
                  }}
                />
              );
            })()}
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
