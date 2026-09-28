// One relationship line on the org graph. `reports_to` carries an arrowhead
// (the marker OrgGraph defines) and stops at the target's perimeter;
// `mentors` is dashed. Internal to OrgGraph.

import type { GraphNode } from './types';
import { RELATIONSHIP_STYLES } from './presence';

export interface OrgGraphEdgeProps {
  source: GraphNode;
  target: GraphNode;
  type: string;
  strength: number;
  isHighlighted: boolean;
  /** Radius of the target circle, so an arrowhead lands on its edge. */
  targetRadius?: number;
  /** Id of the `<marker>` the owning graph defined for `reports_to`. */
  arrowMarkerId: string;
}

export function OrgGraphEdge({ source, target, type, strength, isHighlighted, targetRadius, arrowMarkerId }: OrgGraphEdgeProps) {
  const style = RELATIONSHIP_STYLES[type];
  const color = style?.color ?? 'var(--color-border-emphasis)';
  const opacity = isHighlighted ? 0.8 : 0.2;
  const strokeWidth = type === 'reports_to' ? 1.5 : 1 + strength * 1.5;

  let x2 = target.x ?? 0;
  let y2 = target.y ?? 0;

  if (type === 'reports_to') {
    // Shorten the line so the arrowhead tip lands at the target's perimeter.
    const radius = targetRadius ?? 12 + (target.influenceScore ?? 0) * 18;
    const offset = radius + 15 + 2;
    const dx = (target.x ?? 0) - (source.x ?? 0);
    const dy = (target.y ?? 0) - (source.y ?? 0);
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > offset) {
      x2 = (target.x ?? 0) - (dx / dist) * offset;
      y2 = (target.y ?? 0) - (dy / dist) * offset;
    }
  }

  return (
    <line
      x1={source.x}
      y1={source.y}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={style?.dash}
      opacity={opacity}
      markerEnd={type === 'reports_to' ? `url(#${arrowMarkerId})` : undefined}
      data-relationship={type}
      className="pointer-events-none"
    />
  );
}
