// OrgGraphLegend — the org graph's key, pinned top-left: departments (click
// one to filter the graph to it), relationship line styles, and — while a
// presence filter is on — the presence dots. It rests translucent so it does
// not hide nodes, and opens fully on hover or keyboard focus.

import { useState } from 'react';
import { cn } from '../../../lib/cn';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { Inline, Stack } from '../../ui/Stack';
import { StatusDot } from '../../shared/StatusDot';
import type { GraphDepartment } from './types';
import { PRESENCE_DOT, RELATIONSHIP_STYLES, type PresenceFilter } from './presence';

export interface OrgGraphLegendProps {
  departments: GraphDepartment[];
  /** The department the graph is filtered to, or null. */
  filter: string | null;
  onFilter: (dept: string | null) => void;
  /** Shows the presence key while a presence filter is active. */
  presenceFilter?: PresenceFilter | null;
  /** Keep the legend fully opaque instead of resting translucent. */
  pinned?: boolean;
  className?: string;
  'data-testid'?: string;
}

const PRESENCE_KEYS = ['office', 'wfh', 'travel', 'pto', 'vacation', 'sick'] as const;

export function OrgGraphLegend({
  departments, filter, onFilter, presenceFilter, pinned = false, className,
  'data-testid': testId = 'org-graph-legend',
}: OrgGraphLegendProps) {
  const [hovered, setHovered] = useState(false);
  const open = pinned || hovered;

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid={testId}
      aria-label="Graph legend"
      role="group"
      className={cn(
        'absolute left-3 top-3 overflow-hidden px-4 py-3 text-[11px] text-text-secondary shadow-sm',
        'transition-[opacity,max-height] duration-300 ease-out focus-within:max-h-[800px] focus-within:opacity-100',
        open ? 'max-h-[800px] opacity-100' : 'max-h-40 opacity-20',
        className,
      )}
    >
      <Inline as="div" gap="none" className="mb-2 text-xs font-semibold text-text-primary">Departments</Inline>
      <Stack as="ul" gap="none" className="m-0 list-none p-0">
        {departments.map(dept => {
          const active = filter === dept.name;
          return (
            <li key={dept.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onFilter(active ? null : dept.name)}
                className={cn(
                  'mb-1 flex cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 text-left text-[11px] text-text-secondary',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  filter && !active && 'opacity-40',
                )}
              >
                <StatusDot color={dept.color} size="sm" />
                <span>{dept.name}</span>
              </button>
            </li>
          );
        })}
      </Stack>

      <Stack gap="none" className="mt-2 border-t border-border pt-2">
        <Inline as="div" gap="none" className="mb-1.5 text-xs font-semibold text-text-primary">Relationships</Inline>
        {Object.entries(RELATIONSHIP_STYLES).map(([type, style]) => (
          <Inline key={type} gap="xs" wrap={false} className="mb-[3px]" data-legend-relationship={type}>
            {/* a real line sample, so the legend shows the stroke it names */}
            <svg width={20} height={8} aria-hidden="true">
              <line x1={0} y1={4} x2={20} y2={4} stroke={style.color} strokeWidth={2} strokeDasharray={style.dash ? '4 2' : undefined} />
            </svg>
            <span>{style.label}</span>
          </Inline>
        ))}
      </Stack>

      {filter && (
        <Button variant="secondary" size="sm" fullWidth className="mt-2" onClick={() => onFilter(null)}>
          Clear Filter
        </Button>
      )}

      {presenceFilter && (
        <Stack gap="none" className="mt-2 border-t border-border pt-2">
          <Inline as="div" gap="none" className="mb-[5px] text-xs font-semibold text-text-primary">Presence today</Inline>
          {PRESENCE_KEYS.map((key) => (
            <Inline key={key} gap="xs" wrap={false} className="mb-[3px]">
              <StatusDot color={PRESENCE_DOT[key].fill} size="xs" />
              <span>{PRESENCE_DOT[key].label}</span>
            </Inline>
          ))}
          <Inline gap="xs" wrap={false} className="mb-0.5">
            {/* the WFH ring is a dot PLUS a dashed outline */}
            <span aria-hidden="true" className="box-border h-2 w-2 shrink-0 rounded-full bg-info outline-2 outline-offset-[3px] outline-dashed outline-info" />
            <span className="text-text-tertiary">WFH ring</span>
          </Inline>
        </Stack>
      )}
    </Card>
  );
}
