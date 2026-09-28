// DepartmentChips — focus the org graph on one department. Each chip carries
// the department's own colour so the filter row and the nodes agree about what
// "Engineering" looks like, plus its headcount. A department with nobody in
// the current roster is not drawn.

import { useMemo } from 'react';
import { FilterChip } from '../../shared/FilterChip';
import { Inline } from '../../ui/Stack';
import { membersByDepartment } from './graphInsights';
import type { GraphDepartment, GraphPerson } from './types';

export interface DepartmentChipsProps {
  departments: GraphDepartment[];
  people: GraphPerson[];
  activeDepartment: string | null;
  /** `name` is null when the active chip is toggled off. */
  onToggle: (name: string | null, memberIds: string[]) => void;
  className?: string;
}

export function DepartmentChips({ departments, people, activeDepartment, onToggle, className }: DepartmentChipsProps) {
  const counts = useMemo(() => membersByDepartment(people), [people]);

  return (
    <Inline gap="xs" align="center" wrap as="span" className={className} data-testid="department-chips">
      {departments.map((d) => {
        const members = counts.get(d.name) ?? [];
        if (members.length === 0) return null;
        const active = activeDepartment === d.name;
        return (
          <FilterChip
            key={d.id}
            active={active}
            color={d.color}
            dot
            size="sm"
            onClick={() => onToggle(active ? null : d.name, members)}
          >
            {d.name}
            <span className="ml-1 text-[10px] tabular-nums text-text-tertiary">{members.length}</span>
          </FilterChip>
        );
      })}
    </Inline>
  );
}
