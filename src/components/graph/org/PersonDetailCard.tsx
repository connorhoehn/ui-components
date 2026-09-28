// PersonDetailCard — click a person on the org graph → who they are: role,
// skills, strongest connections (each a MeterRow that adds them to the
// selection) and the documents that evidence them.
//
// Data in, callbacks out: the host fetches the person and their evidence and
// passes them here (the portal original fetched inside the card). Influence
// and scored-at are people analytics — drawn only with `showInfluence`.

import { useMemo } from 'react';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { IconButton } from '../../ui/IconButton';
import { CloseIcon } from '../../ui/Icons';
import { Inline, Stack } from '../../ui/Stack';
import CardHeader from '../../shared/CardHeader';
import Chip from '../../shared/Chip';
import InlineAlert from '../../shared/InlineAlert';
import LoadingState from '../../shared/LoadingState';
import { MeterRow } from '../../shared/MeterRow';
import { MetaLine } from '../../shared/MetaLine';
import { ScoreBarGauge } from '../../shared/ScoreBarGauge';
import { cn } from '../../../lib/cn';
import { CONNECTION_TYPE_LABELS, firstName } from './graphInsights';

export interface PersonConnection {
  type: string;
  strength: number;
  otherPerson: { id: string; name: string; title: string } | null;
}

/** The person read — the portal's `GET /api/graph/people/:id` shape. */
export interface PersonDetail {
  id: string;
  name: string;
  title: string;
  department: string;
  skills: string[];
  influenceScore: number;
  scoredAt: string | null;
  connections: PersonConnection[];
}

/** One evidence document — the portal's `/evidence` shape. */
export interface PersonEvidenceDocument {
  id: string;
  title: string;
  source: string;
  sourceUri: string | null;
  ingestedAt: string | null;
  mentionCount: number;
}

export interface PersonDetailCardProps {
  /** The person, once read. */
  person: PersonDetail | null | undefined;
  /** Documents that evidence them. */
  evidence?: PersonEvidenceDocument[];
  loading?: boolean;
  /** A failed read: the message to show. */
  error?: string | null;
  onClose: () => void;
  /** Click a connection → add that person to the graph selection. */
  onFocusPerson: (id: string) => void;
  /** "Ask agent" → open the chat pre-seeded with this person. */
  onAsk: (id: string) => void;
  /** Show influence and scored-at (leadership analytics roles only). */
  showInfluence?: boolean;
  /** Evidence timestamps. Default: a short "3h ago" / date. */
  formatTime?: (iso: string) => string;
  /** The ask button's label. Default "Ask agent about <first name> →". */
  askLabel?: (person: PersonDetail) => string;
  /** Default: floats top-right over the graph (`absolute right-3 top-3`). */
  className?: string;
  'data-testid'?: string;
}

function defaultFormatTime(iso: string): string {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return iso;
  const s = Math.max(0, (Date.now() - then) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 7 * 86400) return `${Math.floor(s / 86400)}d ago`;
  return new Date(then).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function PersonDetailCard({
  person,
  evidence = [],
  loading = false,
  error,
  onClose,
  onFocusPerson,
  onAsk,
  showInfluence = false,
  formatTime = defaultFormatTime,
  askLabel = (p) => `Ask agent about ${firstName(p.name)} →`,
  className,
  'data-testid': testId = 'person-detail-card',
}: PersonDetailCardProps) {
  const topConnections = useMemo(() => {
    if (!person) return [] as PersonConnection[];
    return [...person.connections]
      .filter((c) => c.otherPerson)
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 8);
  }, [person]);

  const maxStrength = Math.max(...topConnections.map((c) => c.strength), 0.001);

  return (
    <Card
      padding="md"
      data-testid={testId}
      aria-label={person ? `${person.name} details` : 'Person details'}
      role="region"
      className={cn('absolute right-3 top-3 z-[60] max-h-[calc(100%-24px)] w-[300px] overflow-y-auto shadow-lg', className)}
    >
      <Stack gap="md">
        <Inline gap="sm" justify="between" align="start" wrap={false}>
          <Stack gap="none" className="min-w-0 flex-1">
            {loading && !person && <LoadingState label="Loading…" spinnerSize="sm" />}
            {error && <InlineAlert tone="error">{error}</InlineAlert>}
            {person && (
              <CardHeader
                title={person.name}
                subtitle={person.department ? `${person.title} · ${person.department}` : person.title}
              />
            )}
          </Stack>
          <IconButton aria-label="Close details" size="sm" variant="ghost" onClick={onClose}>
            <CloseIcon size={14} />
          </IconButton>
        </Inline>

        {person && (
          <>
            <MetaLine
              size="sm"
              items={[
                showInfluence && `influence ${person.influenceScore.toFixed(2)}`,
                `${person.connections.length} connections`,
                showInfluence && person.scoredAt ? `scored ${person.scoredAt.slice(0, 10)}` : null,
              ]}
            />

            {person.skills.length > 0 && (
              <Stack gap="xs">
                <CardHeader title="Skills" />
                <Inline gap="xs" wrap>
                  {person.skills.map((s) => <Chip key={s} tone="info" size="xs">{s}</Chip>)}
                </Inline>
              </Stack>
            )}

            {topConnections.length > 0 && (
              <Stack gap="xs">
                <CardHeader title="Strongest connections" />
                <Stack gap="none">
                  {topConnections.map((c, i) => {
                    const other = c.otherPerson!;
                    return (
                      <MeterRow
                        key={`${other.id}-${c.type}-${i}`}
                        onClick={() => onFocusPerson(other.id)}
                        title={`Add ${other.name} to selection`}
                        label={other.name}
                        note={CONNECTION_TYPE_LABELS[c.type] ?? c.type}
                        meter={(
                          <ScoreBarGauge
                            value={c.strength / maxStrength}
                            tone="info"
                            size="sm"
                            showLabel={false}
                            ariaLabel={`Connection strength ${c.strength.toFixed(2)}`}
                          />
                        )}
                      />
                    );
                  })}
                </Stack>
              </Stack>
            )}

            {evidence.length > 0 && (
              <Stack gap="xs">
                <CardHeader title="Evidence" subtitle={`${evidence.length} documents`} />
                <Stack gap="xs">
                  {evidence.slice(0, 6).map((doc) => (
                    <Stack key={doc.id} gap="none" className="min-w-0">
                      <Inline gap="xs" align="center" wrap={false}>
                        <Chip size="xs" uppercase>{doc.source || 'doc'}</Chip>
                        <span title={doc.title} className="min-w-0 flex-1 truncate text-[11px] text-text-primary">
                          {doc.title}
                        </span>
                        {doc.mentionCount > 1 && (
                          <span className="shrink-0 text-[10px] tabular-nums text-text-tertiary">×{doc.mentionCount}</span>
                        )}
                      </Inline>
                      <MetaLine size="xs" items={[doc.ingestedAt ? formatTime(doc.ingestedAt) : null]} />
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            )}

            <Button variant="primary" size="sm" fullWidth onClick={() => onAsk(person.id)}>
              {askLabel(person)}
            </Button>
          </>
        )}
      </Stack>
    </Card>
  );
}
