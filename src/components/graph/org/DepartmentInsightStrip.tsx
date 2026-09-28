// DepartmentInsightStrip — shown while a department is focused: headcount,
// the department's top skills, and its bus-factor risk (skills only a couple
// of people hold org-wide, where at least one holder sits in this department).
//
// `department: null` renders the org-wide variant (a "Rare skills" toggle):
// no headcount/top-skills header, and every holder of a rare skill gets its
// own pill, since there is no department to pick "the" holder from.
//
// Each rare-skill pill focuses its holder; beside it, a link to the
// bus-factor finding for that skill — but only when the host's sweep filed
// one (see `indexBusFactorFindings`). The link is a real `<a href>`; pass
// `onNavigate` to route a plain click client-side.

import { useMemo, type MouseEvent } from 'react';
import { Button } from '../../ui/Button';
import { Inline } from '../../ui/Stack';
import { Link } from '../../shared/Link';
import { MetaLine } from '../../shared/MetaLine';
import { ContextStrip, OverlineLabel } from './graphOverlay';
import {
  departmentInsight, orgInsight, rareSkillFindingsUrl, findingForSkill, firstName,
  type AtRiskSkill, type FindingLike,
} from './graphInsights';
import type { GraphPerson } from './types';

export interface DepartmentInsightStripProps {
  /** null renders the org-wide rare-skills view instead of one department. */
  department: string | null;
  people: GraphPerson[];
  /** Click an at-risk holder → focus them (select + detail). */
  onFocusPerson: (id: string) => void;
  /**
   * skill name → the host's open bus-factor finding for it, built by
   * `indexBusFactorFindings`. `null` means the read has not resolved (loading
   * or failed) — the strip then shows the unconditional "finding →" link
   * rather than asserting "not on the sweep yet" for something unchecked.
   */
  busFactorFindings: Map<string, FindingLike> | null;
  /** True only when the findings read genuinely failed (not while loading). */
  busFactorFindingsUnavailable?: boolean;
  /** Where "finding →" points. Default `rareSkillFindingsUrl(skill, findingId)`. */
  findingHref?: (skill: string, findingId?: string | null) => string;
  /** Route a plain click on "finding →" (modified clicks stay native). */
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
}

export function DepartmentInsightStrip({
  department,
  people,
  onFocusPerson,
  busFactorFindings,
  busFactorFindingsUnavailable,
  findingHref = rareSkillFindingsUrl,
  onNavigate,
}: DepartmentInsightStripProps) {
  const { members, topSkills, atRisk } = useMemo((): {
    members: GraphPerson[];
    topSkills: [string, number][];
    atRisk: AtRiskSkill[];
  } => department
    ? departmentInsight(people, department)
    : { members: people, topSkills: [], ...orgInsight(people) },
  [department, people]);

  const follow = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(href, event);
  };

  return (
    <ContextStrip aria-label={department ? `${department} insight` : 'Org-wide rare skills'} data-testid="department-insight-strip">
      <span className="whitespace-nowrap font-bold">
        {department ? <>{department} · {members.length} people</> : 'Rare skills · org-wide'}
      </span>

      {topSkills.length > 0 && (
        <Inline gap="xs" align="center" wrap as="span" className="text-text-secondary">
          <OverlineLabel>Top skills</OverlineLabel>
          {topSkills.map(([skill, n]) => (
            <span key={skill} className="whitespace-nowrap">
              {skill}{' '}
              <span className="text-[10px] tabular-nums text-text-tertiary">({n})</span>
            </span>
          ))}
        </Inline>
      )}

      {atRisk.length > 0 && (
        <Inline gap="xs" align="center" wrap as="span">
          <OverlineLabel tone="warning">⚠ rare skills</OverlineLabel>
          {atRisk.map(({ skill, holder, holderCount }) => {
            const finding = busFactorFindings ? findingForSkill(busFactorFindings, skill) : undefined;
            // null = checked and absent → no link; undefined (unknown) or found → link.
            const showFindingLink = finding !== null;
            const href = showFindingLink ? findingHref(skill, finding?.id) : '';
            return (
              <Inline key={`${skill}-${holder.id}`} gap="none" align="center" as="span" className="whitespace-nowrap">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-warning"
                  title={`${skill} — only ${holderCount} ${holderCount === 1 ? 'person' : 'people'} org-wide. Click to focus ${holder.name}.`}
                  onClick={() => onFocusPerson(holder.id)}
                >
                  {skill} · {firstName(holder.name)}
                </Button>
                {showFindingLink ? (
                  <Link
                    href={href}
                    onClick={follow(href)}
                    title={finding
                      ? `Open the bus-factor finding the sweep filed for ${skill}`
                      : `See the bus-factor finding for ${skill}`}
                    className="text-[11px]"
                  >
                    finding →
                  </Link>
                ) : (
                  <span
                    className="text-[11px] italic text-text-tertiary"
                    title={`The scheduled bus-factor sweep hasn't flagged ${skill} — this read is live from the graph, the sweep runs on a schedule, and they can disagree.`}
                  >
                    not on the sweep yet
                  </span>
                )}
              </Inline>
            );
          })}
        </Inline>
      )}
      {atRisk.length > 0 && busFactorFindingsUnavailable && (
        <MetaLine
          size="xs"
          tone="secondary"
          items={['Could not read the bus-factor sweep — showing every rare skill from the live graph instead.']}
        />
      )}
    </ContextStrip>
  );
}
