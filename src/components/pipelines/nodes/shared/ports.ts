// src/components/pipelines/nodes/shared/ports.ts
//
// Payload-typed port styling for @xyflow/react <Handle> elements
// (NODE-VISUALS-AUDIT §3.4). Class strings use !important-prefixed Tailwind
// utilities because React Flow ships its own handle CSS that these must
// override (same convention as the existing `!bg-surface-emphasis !w-2.5 !h-2.5`
// handle classNames across the node components).
//
// Convention summary (also documented in NODE_HANDLES.md):
//   image   → violet SQUARE      (image/pixel payloads)
//   text    → gray circle        (today's default handle look)
//   data    → slate-blue circle  (structured/JSON payloads)
//   control → amber circle, slightly smaller (branch/gate signals)
//   error   → red circle, slightly smaller   (error outputs; matches the
//             existing `!bg-danger` error handles on LLM/graph-query/memory)

export type PortPayload = 'image' | 'text' | 'data' | 'control' | 'error';

export const PORT_CLS: Record<PortPayload, string> = {
  image: '!w-2.5 !h-2.5 !rounded-sm !bg-accent !border-accent',
  text: '!w-2.5 !h-2.5 !bg-surface-emphasis',
  data: '!w-2.5 !h-2.5 !bg-neutral',
  control: '!w-2 !h-2 !bg-warning',
  error: '!w-2 !h-2 !bg-danger',
};

export function portCls(payload: PortPayload): string {
  return PORT_CLS[payload];
}
