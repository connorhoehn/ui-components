// The hover card beside an org-graph node: name, title, department, top
// skills, and — only for viewers allowed to see it — influence. Internal to
// OrgGraph. `left`/`top` are the one inline style: computed from the node's
// on-screen position.

import { Card } from '../../ui/Card';
import { Inline } from '../../ui/Stack';
import Chip from '../../shared/Chip';
import { StatusDot } from '../../shared/StatusDot';
import type { GraphNode, GraphDepartment } from './types';

export interface OrgGraphTooltipProps {
  node: GraphNode;
  departments: GraphDepartment[];
  /** Node position in container pixels (after pan/zoom). */
  x: number;
  y: number;
  containerWidth: number;
  /** Influence is leadership analytics — shown only when the host says so. */
  showInfluence: boolean;
}

const WIDTH = 220;

export function OrgGraphTooltip({ node, departments, x, y, containerWidth, showInfluence }: OrgGraphTooltipProps) {
  const dept = departments.find(d => d.name === node.department);
  const left = Math.max(8, Math.min(x + 20, containerWidth - WIDTH - 20));
  const top = Math.max(y - 40, 10);

  return (
    <Card
      role="tooltip"
      className="pointer-events-none absolute z-[100] w-[220px] px-4 py-3 shadow-md"
      style={{ left, top }}
      data-testid="org-graph-tooltip"
    >
      <Inline as="div" gap="none" className="mb-0.5 text-sm font-semibold text-text-primary">{node.name}</Inline>
      <Inline as="div" gap="none" className="text-xs text-text-secondary">{node.title}</Inline>
      <Inline as="div" gap="none" className="mt-1 text-[11px] font-medium text-text-secondary">
        <StatusDot color={dept?.color} size="xs" label={node.department} />
      </Inline>
      {node.skills.length > 0 && (
        <Inline gap="xs" wrap className="mt-2">
          {node.skills.slice(0, 4).map(skill => (
            <Chip key={skill} tone="neutral" size="xs">{skill}</Chip>
          ))}
        </Inline>
      )}
      {showInfluence && (
        <Inline gap="sm" justify="between" wrap={false} className="mt-2 text-[11px]">
          <Inline as="span" gap="none" className="text-text-tertiary">Influence</Inline>
          <Inline as="span" gap="none" className="font-semibold">{Math.round(node.influenceScore * 100)}/100</Inline>
        </Inline>
      )}
    </Card>
  );
}
