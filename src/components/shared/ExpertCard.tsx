// ExpertCard — a person offered as help, with the evidence for why.
//
// The shape a "find help" surface needs. It is deliberately NOT a leaderboard
// row: no rank, no composite number, no comparison against the next card.
// Comparing people is an analytics job for whoever runs the org; this card
// answers a different question — "can this person help me with X, and how do
// I know?" — so what it shows is evidence: the matched skills, the work the
// match was found in, and where this person is spending their time.
//
// Reading order mirrors how you'd size up a colleague you don't know yet:
//   who      avatar, name, title
//   why them the skills that matched your query, strongest first
//   proof    documents/initiatives the skills were derived from
//   next     one primary action — usually "ask", handed to the host
//
// The host owns what "ask" means (open a chat, draft an intro, deep-link an
// agent); the card only promises there is exactly one obvious next step.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from './Avatar';
import Chip from './Chip';
import { Button } from '../ui/Button';

export interface ExpertSkillMatch {
  name: string;
  /**
   * 0..1 evidence strength for THIS skill on THIS person, when the domain
   * has one (e.g. a person→skill edge weight). Renders as chip emphasis,
   * never as a printed number — a number invites ranking people, which is
   * exactly the reading this card exists to avoid.
   */
  strength?: number;
}

export interface ExpertEvidenceItem {
  id: string;
  /** e.g. a document title, an ADR, a postmortem. */
  title: string;
  /** Where it came from — "adr", "slack", "postmortem". Shown as a quiet tag. */
  source?: string;
  href?: string;
}

export interface ExpertCardProps {
  name: string;
  title?: string;
  /** Second context line, e.g. department or team. */
  subtitle?: string;
  imageUrl?: string;
  /** Skills that matched the query, strongest first. */
  matchedSkills: readonly ExpertSkillMatch[];
  /** The person's other skills, shown quieter. Keep short; the card truncates. */
  otherSkills?: readonly string[];
  /** Where this person spends their time — initiative/project names. */
  contexts?: readonly string[];
  /** The work the match was derived from. */
  evidence?: readonly ExpertEvidenceItem[];
  /** Heading over the evidence list. */
  evidenceLabel?: string;
  /** Primary action. Omit to render a card with no footer. */
  onAsk?: () => void;
  askLabel?: string;
  /** Secondary slot beside the action, e.g. a link into an org graph. */
  footerExtra?: ReactNode;
  /** Click anywhere that isn't a control — e.g. open a profile. */
  onOpen?: () => void;
  className?: string;
  'data-testid'?: string;
}

const MAX_OTHER_SKILLS = 4;
const MAX_EVIDENCE = 3;

export function ExpertCard({
  name,
  title,
  subtitle,
  imageUrl,
  matchedSkills,
  otherSkills = [],
  contexts = [],
  evidence = [],
  evidenceLabel = 'Seen in',
  onAsk,
  askLabel = 'Ask for help',
  footerExtra,
  onOpen,
  className,
  'data-testid': testId,
}: ExpertCardProps) {
  const spareSkills = otherSkills.filter(
    (s) => !matchedSkills.some((m) => m.name.toLowerCase() === s.toLowerCase()),
  );
  const shownEvidence = evidence.slice(0, MAX_EVIDENCE);
  const shownOther = spareSkills.slice(0, MAX_OTHER_SKILLS);

  return (
    <div
      data-testid={testId}
      onClick={onOpen}
      className={cn(
        'flex flex-col gap-2.5 rounded-lg border border-border bg-surface p-3.5 min-w-0',
        onOpen && 'cursor-pointer hover:border-border-emphasis hover:bg-surface-hover transition-colors',
        className,
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <Avatar name={name} size={36} {...(imageUrl ? { src: imageUrl } : {})} />
        <div className="flex flex-col min-w-0">
          <span className="text-[13.5px] font-semibold text-text-primary truncate">{name}</span>
          {(title || subtitle) && (
            <span className="text-[11.5px] text-text-secondary truncate">
              {title}
              {title && subtitle ? ' · ' : ''}
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {matchedSkills.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          {matchedSkills.map((s) => (
            // Strength carries as emphasis, not digits: strong matches read
            // solid, the rest soft. Two visual levels is the whole scale.
            <Chip key={s.name} tone="accent" size="xs" solid={(s.strength ?? 0) >= 0.7}>
              {s.name}
            </Chip>
          ))}
          {shownOther.map((s) => (
            <Chip key={s} tone="neutral" size="xs">{s}</Chip>
          ))}
          {spareSkills.length > MAX_OTHER_SKILLS && (
            <span className="text-[10.5px] text-text-tertiary">+{spareSkills.length - MAX_OTHER_SKILLS}</span>
          )}
        </div>
      )}

      {contexts.length > 0 && (
        <div className="text-[11px] text-text-tertiary truncate" title={contexts.join(', ')}>
          Working on {contexts.join(', ')}
        </div>
      )}

      {shownEvidence.length > 0 && (
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none">
            {evidenceLabel}
          </span>
          {shownEvidence.map((doc) => (
            <div key={doc.id} className="flex items-center gap-1.5 min-w-0">
              {doc.source && <Chip tone="neutral" size="xs" mono>{doc.source}</Chip>}
              {doc.href ? (
                <a
                  href={doc.href}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11.5px] text-text-secondary no-underline hover:underline truncate"
                >
                  {doc.title}
                </a>
              ) : (
                <span className="text-[11.5px] text-text-secondary truncate">{doc.title}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {(onAsk || footerExtra) && (
        <div className="mt-auto pt-1 flex items-center gap-2">
          {footerExtra}
          <span className="flex-1" />
          {onAsk && (
            <Button
              size="sm"
              onClick={(e) => { e.stopPropagation(); onAsk(); }}
            >
              {askLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default ExpertCard;
