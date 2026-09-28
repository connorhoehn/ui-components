// Presence palette shared by the org graph's nodes and legend. Colours are
// token variables (they flip with the theme); the visual language mirrors
// Slack/Teams status dots.

import { toneVar } from '../../shared/tones';
import type { PresenceStatus } from './types';

export const PRESENCE_DOT: Record<PresenceStatus, { fill: string; stroke: string; label: string }> = {
  office:   { fill: toneVar('success'), stroke: 'var(--color-surface)', label: 'In office' },
  wfh:      { fill: toneVar('info'),    stroke: 'var(--color-surface)', label: 'Remote' },
  travel:   { fill: toneVar('warning'), stroke: 'var(--color-surface)', label: 'Traveling' },
  pto:      { fill: toneVar('caution'), stroke: 'var(--color-surface)', label: 'PTO' },
  vacation: { fill: toneVar('accent'),  stroke: 'var(--color-surface)', label: 'Vacation' },
  sick:     { fill: toneVar('danger'),  stroke: 'var(--color-surface)', label: 'Out sick' },
  unknown:  { fill: 'var(--color-border-emphasis)', stroke: 'var(--color-border)', label: 'No check-in' },
};

/** Any status that means NOT at keyboard. */
export const AWAY_STATUSES: PresenceStatus[] = ['pto', 'vacation', 'sick'];

/** The presence filter the graph dims against. */
export type PresenceFilter = 'office' | 'remote' | 'away';

export function passesPresenceFilter(status: PresenceStatus, filter: PresenceFilter | null | undefined): boolean {
  if (!filter) return true;
  if (filter === 'office') return status === 'office';
  if (filter === 'remote') return status === 'wfh' || status === 'travel';
  return AWAY_STATUSES.includes(status);
}

/** Relationship line styles — the edges and the legend draw from this one map. */
export const RELATIONSHIP_STYLES: Record<string, { color: string; label: string; dash?: string }> = {
  collaborates:     { color: 'var(--color-text-tertiary)', label: 'Collaborates' },
  mentors:          { color: 'var(--color-primary)',       label: 'Mentors',          dash: '6 3' },
  reports_to:       { color: 'var(--color-border-emphasis)', label: 'Reports To' },
  expert_in_common: { color: toneVar('warning'),           label: 'Shared Expertise' },
};
