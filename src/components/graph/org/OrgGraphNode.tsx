// One person on the org graph: a department-coloured circle sized by
// influence (roles allowed to see it) or by degree (everyone else), a
// first-name label, and a presence dot. Internal to OrgGraph.

import type { KeyboardEvent } from 'react';
import type { GraphNode, GraphDepartment, PresenceStatus } from './types';
import { nodeRadius } from './graphInsights';
import { PRESENCE_DOT, passesPresenceFilter, type PresenceFilter } from './presence';

export interface OrgGraphNodeProps {
  node: GraphNode;
  departments: GraphDepartment[];
  isSelected: boolean;
  isHighlighted: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  /** When set, dim nodes that don't match the given presence filter. */
  presenceFilter?: PresenceFilter | null;
  /** Size by influence (true) or by connection count (false) — so a bigger
   *  circle can't leak a number the viewer is not allowed to see. */
  showInfluence: boolean;
  /** This node's degree in the currently-rendered graph. */
  degree: number;
  /** Largest degree in the currently-rendered graph. */
  maxDegree: number;
}

export function OrgGraphNode({
  node, departments, isSelected, isHighlighted, onSelect, onHover, presenceFilter,
  showInfluence, degree, maxDegree,
}: OrgGraphNodeProps) {
  const dept = departments.find(d => d.name === node.department);
  const color = dept?.color ?? 'var(--color-text-tertiary)';
  const radius = nodeRadius(showInfluence, node.influenceScore, degree, maxDegree);

  const pres: PresenceStatus = node.presence ?? 'unknown';
  const presInfo = PRESENCE_DOT[pres];
  const baseOpacity = isHighlighted || isSelected ? 1 : 0.3;
  const opacity = passesPresenceFilter(pres, presenceFilter) ? baseOpacity : 0.15;

  // Presence dot, bottom-right of the circle.
  const dotR = Math.max(2, radius * 0.14);
  const dotAngle = Math.PI * 0.25;
  const dotX = (radius - dotR * 0.4) * Math.cos(dotAngle);
  const dotY = (radius - dotR * 0.4) * Math.sin(dotAngle);

  function handleKeyDown(e: KeyboardEvent<SVGGElement>) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      onSelect(node.id);
    }
  }

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onClick={() => onSelect(node.id)}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${node.name} · ${node.title} · ${node.department}`}
      aria-pressed={isSelected}
      opacity={opacity}
      data-person-id={node.id}
      className="cursor-pointer outline-none [&:focus-visible>circle.org-node-main]:stroke-[3]"
    >
      {/* WFH: a dashed ring outside the circle */}
      {pres === 'wfh' && (
        <circle r={radius + 3} fill="none" stroke={PRESENCE_DOT.wfh.fill} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.5} />
      )}

      <circle
        className="org-node-main"
        r={radius}
        fill={color}
        fillOpacity={isSelected ? 1 : 0.125}
        stroke={color}
        strokeWidth={isSelected ? 3 : 2}
      />

      <text
        y={radius + 14}
        textAnchor="middle"
        fontSize={10}
        fill="var(--color-text-secondary)"
        className="pointer-events-none select-none"
      >
        {node.name.split(' ')[0]}
      </text>

      {isSelected && (
        <text
          y={-radius - 6}
          textAnchor="middle"
          fontSize={11}
          fontWeight={600}
          fill="var(--color-text-primary)"
          className="pointer-events-none"
        >
          {node.name}
        </text>
      )}

      {pres !== 'unknown' && (
        <g transform={`translate(${dotX}, ${dotY})`}>
          <circle r={dotR} fill={presInfo.stroke} />
          <circle r={dotR - 1} fill={presInfo.fill} />
        </g>
      )}
    </g>
  );
}
