// src/components/pipelines/nodes/categories.ts
//
// Node-category taxonomy for the pipeline editor visual system
// (NODE-VISUALS-AUDIT §3.1). Each registered node type maps to one of
// six categories; BaseNode renders a category accent bar + shaped icon
// chip from this, and NodePalette can group/color by the same map.
//
// Category and execution state are orthogonal channels: state owns the
// card border/background (STATE_TOKENS in BaseNode); category owns the
// left accent bar + icon chip tint/shape.

export type NodeCategory =
  | 'source'
  | 'transform'
  | 'ai'
  | 'control'
  | 'sink'
  | 'human';

/**
 * Category assignment for every node type registered in `nodeTypes`
 * (see ./index.ts). Keys are the exact React Flow type strings.
 */
export const NODE_CATEGORIES: Record<string, NodeCategory> = {
  // -- source: where data enters the graph -----------------------------
  trigger:                     'source',
  'image-source':              'source',
  'knowledge-base':            'source',
  'graph-query':               'source',

  // -- transform: deterministic data/image manipulation ----------------
  transform:                   'transform',
  // memory reads/writes run-scoped context — it reshapes state rather
  // than originating or emitting data, so it sits with transforms.
  memory:                      'transform',
  'image:resize':              'transform',
  'image:transform':           'transform',
  'image:format-convert':      'transform',
  'image:sharpen':             'transform',
  'image:watermark':           'transform',
  'image:crop':                'transform',
  'image:adjust-bw':           'transform',
  'image:adjust-layer':        'transform',

  // -- ai: model-backed steps (LLM, agents, vision, generative) --------
  llm:                         'ai',
  agent:                       'ai',
  'mcp-tool':                  'ai',
  'image:vision-analyze':      'ai',
  'image:vision-classify':     'ai',
  'image:vision-describe':     'ai',
  'image:vision-tag':          'ai',
  'image:vision-extract-text': 'ai',
  'image:generate':            'ai',
  'image:variation':           'ai',
  'image:edit-prompt':         'ai',

  // -- control: branching / fan-out / gating ---------------------------
  condition:                   'control',
  fork:                        'control',
  join:                        'control',
  scatter:                     'control',
  guardrail:                   'control',
  policy:                      'control',

  // -- sink: where data leaves the graph -------------------------------
  action:                      'sink',
  'ag-ui-output':              'sink',
  'image:save':                'sink',

  // -- human: human-in-the-loop gates ----------------------------------
  approval:                    'human',
};

/** Look up the category for a node type; undefined for unknown types. */
export function categoryFor(nodeType: string): NodeCategory | undefined {
  return NODE_CATEGORIES[nodeType];
}
