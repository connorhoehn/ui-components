// frontend/src/components/pipelines/canvas/edges/AnimatedEdge.tsx
//
// Custom React Flow edge supporting four visual states (default / active /
// traversed-success / traversed-failure) per PIPELINES_PLAN.md §7.2, and an
// optional branch label pill rendered near the source end (true/false/
// approved/rejected/branch-N/error).
//
// Stroke + animation is applied as a plain <path>; the dashoffset SMIL
// animation is what gives 'active' the flow effect.
import { EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';
import type { EdgeProps } from '@xyflow/react';
import { usePrefersReducedMotion } from '../../../../hooks/usePrefersReducedMotion';
import { cn } from '../../../../lib/cn';

export type EdgeState =
  | 'default'
  | 'active'
  | 'traversed-success'
  | 'traversed-failure';

export interface AnimatedEdgeData {
  state?: EdgeState;
  label?: string;
}

interface StrokeSpec {
  stroke: string;
  strokeWidth: number;
  strokeDasharray?: string;
  animate?: boolean;
}

function strokeFor(state: EdgeState | undefined): StrokeSpec {
  switch (state) {
    case 'active':
      return {
        stroke: '#2563eb',
        strokeWidth: 2,
        strokeDasharray: '6 4',
        animate: true,
      };
    case 'traversed-success':
      return { stroke: '#16a34a', strokeWidth: 2 };
    case 'traversed-failure':
      return { stroke: '#dc2626', strokeWidth: 2 };
    case 'default':
    default:
      return { stroke: '#cbd5e1', strokeWidth: 1.5 };
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
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });
  const spec = strokeFor(edgeData.state);
  // §18.12 reduced-motion: keep the active-edge color but drop the SMIL
  // sweep so the path reads as a solid colored line instead of flowing
  // dashes. The stroke width stays at 2 to preserve the visual weight
  // difference between `default` and `active`.
  const animateFlow = spec.animate && !reduceMotion;

  // When the edge is selected (clicked), show a highlight so the user knows
  // they can press Delete/Backspace to remove it.
  const strokeColor = selected ? '#646cff' : spec.stroke;
  const strokeWidth = selected ? 2.5 : spec.strokeWidth;

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
        strokeDasharray={animateFlow ? spec.strokeDasharray : undefined}
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
      {edgeData.label ? (
        <EdgeLabelRenderer>
          <div
            className={cn(
              'absolute pointer-events-auto px-2 py-0.5 rounded-full text-[10px] font-semibold leading-[1.4]',
              'bg-white text-[#475569] border border-[#e2e8f0] font-[inherit] whitespace-nowrap',
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
    </>
  );
}
