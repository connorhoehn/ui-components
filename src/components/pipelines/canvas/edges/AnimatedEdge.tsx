// frontend/src/components/pipelines/canvas/edges/AnimatedEdge.tsx
//
// Custom React Flow edge supporting four visual states (default / active /
// traversed-success / traversed-failure) per PIPELINES_PLAN.md §7.2, and an
// optional branch label pill rendered near the source end (true/false/
// approved/rejected/branch-N/error).
//
// Payload semantics (NODE-VISUALS-AUDIT §3.4): edges may additionally carry
// `payload` ('image' | 'text' | 'data' | 'control') and `volume` (fan-out
// multiplicity). Execution state stays the DOMINANT visual channel — payload
// only adjusts base width / idle tint / idle dash, and volume scales width
// (log2, capped 4px) plus a ×N pill at the path midpoint. With neither field
// set, rendering is identical to the pre-payload behavior.
//
// Stroke + animation is applied as a plain <path>; the dashoffset SMIL
// animation is what gives 'active' the flow effect. Active image edges also
// get a small "packet" circle traveling the path via <animateMotion>. All
// animation is gated behind prefers-reduced-motion.
import { EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';
import type { EdgeProps } from '@xyflow/react';
import { usePrefersReducedMotion } from '../../../../hooks/usePrefersReducedMotion';
import { cn } from '../../../../lib/cn';

export type EdgeState =
  | 'default'
  | 'active'
  | 'traversed-success'
  | 'traversed-failure';

export type EdgePayload = 'image' | 'text' | 'data' | 'control';

export interface AnimatedEdgeData {
  state?: EdgeState;
  label?: string;
  /** Payload type carried over this edge. 'text'/'data'/unset → no change. */
  payload?: EdgePayload;
  /** Fan-out multiplicity; >= 2 scales width and shows a ×N midpoint pill. */
  volume?: number;
}

interface StrokeSpec {
  stroke: string;
  strokeWidth: number;
  strokeDasharray?: string;
  animate?: boolean;
}

// Idle tint for image edges: violet-300 — same lightness band as the slate
// default so it stays subordinate to the execution-state colors.
const IMAGE_IDLE_STROKE = '#c4b5fd';

function strokeFor(state: EdgeState | undefined): StrokeSpec {
  switch (state) {
    case 'active':
      return {
        stroke: 'var(--color-info)',
        strokeWidth: 2,
        strokeDasharray: '6 4',
        animate: true,
      };
    case 'traversed-success':
      return { stroke: 'var(--color-success)', strokeWidth: 2 };
    case 'traversed-failure':
      return { stroke: 'var(--color-danger)', strokeWidth: 2 };
    case 'default':
    default:
      return { stroke: 'var(--color-border-emphasis)', strokeWidth: 1.5 };
  }
}

export default function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  selected,
}: EdgeProps) {
  const edgeData = (data ?? {}) as AnimatedEdgeData;
  const reduceMotion = usePrefersReducedMotion();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });
  const spec = strokeFor(edgeData.state);
  const isIdle = (edgeData.state ?? 'default') === 'default';
  const payload = edgeData.payload;
  // §18.12 reduced-motion: keep the active-edge color but drop the SMIL
  // sweep so the path reads as a solid colored line instead of flowing
  // dashes. The stroke width stays at 2 to preserve the visual weight
  // difference between `default` and `active`.
  const animateFlow = spec.animate && !reduceMotion;

  // ---- payload adjustments (state colors stay dominant) -------------------
  let baseStroke = spec.stroke;
  let baseWidth = spec.strokeWidth;
  let dasharray = animateFlow ? spec.strokeDasharray : undefined;
  if (payload === 'image') {
    baseWidth = 2.5;
    if (isIdle) baseStroke = IMAGE_IDLE_STROKE;
  } else if (payload === 'control') {
    baseWidth = 1.5;
    if (isIdle) dasharray = '2 4';
  }

  // ---- fan-out volume: width scales log2, capped at 4px -------------------
  const volume = edgeData.volume;
  const showVolume = typeof volume === 'number' && volume >= 2;
  if (showVolume) {
    baseWidth = Math.min(4, baseWidth + Math.log2(volume));
  }

  // When the edge is selected (clicked), show a highlight so the user knows
  // they can press Delete/Backspace to remove it.
  const strokeColor = selected ? 'var(--color-primary)' : baseStroke;
  const strokeWidth = selected ? Math.max(2.5, baseWidth) : baseWidth;

  // Active image edges get a traveling "packet" dot on top of the dash
  // scroll. Gated behind reduced-motion like every other animation here.
  const showPacket =
    payload === 'image' && edgeData.state === 'active' && !reduceMotion;

  return (
    <>
      {/* Invisible wider path for easier click/selection targeting */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={12}
        className="[pointer-events:stroke]"
      />
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={dasharray}
        markerEnd={markerEnd}
        className="pointer-events-none"
      >
        {animateFlow ? (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="1s"
            repeatCount="indefinite"
          />
        ) : null}
      </path>
      {showPacket ? (
        <circle r={3} fill={strokeColor} className="pointer-events-none">
          <animateMotion dur="1.2s" repeatCount="indefinite" path={edgePath} />
        </circle>
      ) : null}
      {edgeData.label ? (
        <EdgeLabelRenderer>
          <div
            className={cn(
              'absolute pointer-events-auto px-2 py-0.5 rounded-full text-[10px] font-semibold leading-[1.4]',
              'bg-white text-text-secondary border border-border font-[inherit] whitespace-nowrap',
              'shadow-[0_1px_2px_rgba(15,23,42,0.06)]',
            )}
            style={{
              // Pull the pill slightly downstream of the source handle so it
              // sits inside the edge route rather than on top of the node.
              transform: `translate(-50%, -50%) translate(${sourceX + 28}px, ${sourceY}px)`,
            }}
          >
            {edgeData.label}
          </div>
        </EdgeLabelRenderer>
      ) : null}
      {showVolume ? (
        <EdgeLabelRenderer>
          <div
            className={cn(
              'absolute pointer-events-none px-1.5 py-px rounded-full text-[9px] font-semibold leading-[1.4]',
              'bg-white text-text-secondary border border-border font-[inherit] whitespace-nowrap',
              'shadow-[0_1px_2px_rgba(15,23,42,0.06)]',
            )}
            style={{
              // Midpoint of the smooth-step path, as reported by
              // getSmoothStepPath's labelX/labelY.
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            }}
          >
            {`×${volume}`}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}
