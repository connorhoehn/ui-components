// src/components/shared/SubjectFrame.tsx
//
// The one record frame: every inspector the Storymaker concepts draw (§1–§5)
// has this shape, and only the tab names and the facts change.
//
//   1. a title and a subtitle ("Toby — Concept 03" / "Character concept"),
//      with the header's own buttons (open, next, close) at the right;
//   2. `PaneHeader` tabs;
//   3. a hero: the subject's picture, shown whole and never cropped
//      (`SubjectHero`: an image in an `ImageCompare` frame with
//      `fit="contain"`, the same frame with words when there is nothing yet,
//      the running state while a job draws it, or a host node such as a
//      `ModelViewer`), with its trailing actions under it;
//   4. one facts `KeyValue` table, at most eight rows;
//   5. `Disclosure` sections (Description, Links (3), Tags …), Request
//      details last and collapsed.
//
// A tab other than the first usually shows something else: pass `children`
// and they replace the hero/facts/disclosures for that tab.
//
// The frame is never an EmptyState, and its picture is never cover-cropped:
// the audit rules `subject.frame` and `inspector.shape` read the markers.
//
// Markers: `data-subject-frame` (root), `data-subject-part` = `title` | `tabs`
// | `hero` | `facts` | `disclosures` on each part in that order,
// `data-subject-state` = `image` | `placeholder` | `running` | `custom` on the
// hero, `data-subject-facts` = the facts row count.

import { useEffect, useId, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Stack, Inline } from '../ui/Stack';
import { Disclosure } from '../ui/Disclosure';
import { PaneHeader } from '../layout/SidePane';
import { Text } from './Text';
import Chip from './Chip';
import { KeyValue, type KeyValueItem } from './KeyValue';
import { ImageCompare, type ImageCompareAspect } from './ImageCompare';
import type { TabItem } from './Tabs';

/** The most facts the frame draws (concepts §5 draws eight). */
export const SUBJECT_FRAME_MAX_FACTS = 8;

export type SubjectHeroContent =
  /** The picture, shown whole in an `ImageCompare` frame (`fit="contain"`). */
  | { kind: 'image'; src: string; alt?: string; label?: string; description?: string; meta?: ReactNode }
  /** Nothing to show yet: the same frame with words in it ("No picture yet"). Never an EmptyState. */
  | { kind: 'placeholder'; text: string; label?: string }
  /**
   * A job is drawing it: the run's own content (a `RunProgressPanel`, or in a
   * narrow inspector one line such as "Drawing Mina · step 2 of 3" with Cancel
   * and Open run).
   */
  | { kind: 'running'; content: ReactNode }
  /** A host node that shows the subject whole by itself, such as a `ModelViewer`. */
  | { kind: 'custom'; content: ReactNode };

export interface SubjectHeroProps {
  content: SubjectHeroContent;
  /** The frame's aspect. Default `landscape` (4:3). */
  aspect?: ImageCompareAspect;
  /** The hero's trailing actions, under the picture (Approve, Open run, Vary this one). */
  actions?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

/** The hero part on its own: a subject's picture shown whole, the placeholder frame, or the running state. */
export function SubjectHero({ content, aspect = 'landscape', actions, className, 'data-testid': testId = 'subject-hero' }: SubjectHeroProps) {
  let body: ReactNode;
  if (content.kind === 'image') {
    body = (
      <ImageCompare
        images={[{ src: content.src, alt: content.alt, label: content.label ?? 'Current', description: content.description, meta: content.meta }]}
        aspect={aspect}
        fit="contain"
        data-testid={`${testId}-image`}
      />
    );
  } else if (content.kind === 'placeholder') {
    body = (
      <ImageCompare
        images={[{ placeholder: content.text, label: content.label ?? 'Current' }]}
        aspect={aspect}
        fit="contain"
        data-testid={`${testId}-image`}
      />
    );
  } else {
    body = content.content;
  }
  return (
    <Stack gap="sm" data-subject-hero="" data-subject-state={content.kind} data-testid={testId} className={cn('min-w-0', className)}>
      {body}
      {actions != null && <Inline gap="sm" align="center" wrap data-testid={`${testId}-actions`}>{actions}</Inline>}
    </Stack>
  );
}

export interface SubjectFrameDisclosure {
  id: string;
  /** "Description", "Links", "Request details". */
  title: string;
  /** Shown after the title: "Links (3)". */
  count?: number;
  /** A control in the summary row ("+ Add"). */
  action?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}

export interface SubjectFrameProps {
  /** "Toby", "Asset · Generated sheet". */
  title: ReactNode;
  /** "Character · Lead", "Episode 01". */
  subtitle?: ReactNode;
  /** Chips beside the title (state, version). */
  badges?: ReactNode;
  /** The header's own buttons, at its right edge: open in new, next, close (`IconButton`s). */
  headerActions?: ReactNode;
  /** The record's tabs (Details · Versions · Activity). Omit for a frame without tabs. */
  tabs?: { items: readonly TabItem[]; value: string; onValueChange: (id: string) => void; label?: string };
  /** The subject's picture. Omit only for a subject that has none (a text record). */
  hero?: SubjectHeroContent;
  heroAspect?: ImageCompareAspect;
  /** The hero's trailing actions. */
  heroActions?: ReactNode;
  /** The facts table: at most eight rows; more are dropped (and named in the console in development). */
  facts?: KeyValueItem[];
  /** The disclosures, in order. Put Request details last, collapsed. */
  disclosures?: SubjectFrameDisclosure[];
  /** The body of a tab other than the details: replaces the hero, facts and disclosures. */
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function SubjectFrame({
  title,
  subtitle,
  badges,
  headerActions,
  tabs,
  hero,
  heroAspect,
  heroActions,
  facts = [],
  disclosures = [],
  children,
  className,
  'data-testid': testId = 'subject-frame',
}: SubjectFrameProps) {
  const titleId = useId();
  const overflow = facts.length > SUBJECT_FRAME_MAX_FACTS ? facts.length : 0;
  useEffect(() => {
    if (overflow && typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
      console.warn(`SubjectFrame: ${overflow} facts given; the frame draws at most ${SUBJECT_FRAME_MAX_FACTS}. Move the rest into a disclosure.`);
    }
  }, [overflow]);
  const shownFacts = facts.slice(0, SUBJECT_FRAME_MAX_FACTS);
  return (
    <section
      aria-labelledby={titleId}
      data-subject-frame=""
      data-testid={testId}
      className={cn('flex min-w-0 flex-col', className)}
    >
      <div data-ui-part="" data-subject-part="title" className="flex min-w-0 items-start justify-between gap-3 px-4 pb-2 pt-3">
        <Stack gap="none" className="min-w-0">
          <Inline gap="sm" align="center" className="min-w-0">
            <h2 id={titleId} className="m-0 truncate text-base font-semibold text-text-primary">{title}</h2>
            {badges}
          </Inline>
          {subtitle != null && <Text as="span" size="xs" tone="secondary" className="truncate">{subtitle}</Text>}
        </Stack>
        {headerActions != null && <Inline gap="xs" align="center" wrap={false} className="shrink-0">{headerActions}</Inline>}
      </div>
      {tabs && (
        <div data-ui-part="" data-subject-part="tabs">
          <PaneHeader tabs={tabs.items} value={tabs.value} onValueChange={tabs.onValueChange} label={tabs.label ?? 'Record sections'} data-testid={`${testId}-tabs`} />
        </div>
      )}
      {children != null ? (
        <div data-ui-part="" data-subject-part="body" className="min-w-0 px-4 py-3">{children}</div>
      ) : (
        <Stack gap="lg" className="min-w-0 px-4 py-3">
          {hero && (
            <div data-ui-part="" data-subject-part="hero">
              <SubjectHero content={hero} aspect={heroAspect} actions={heroActions} data-testid={`${testId}-hero`} />
            </div>
          )}
          {shownFacts.length > 0 && (
            <div data-ui-part="" data-subject-part="facts" data-subject-facts={shownFacts.length}>
              <KeyValue items={shownFacts} layout="row" divided aria-label="Facts" data-testid={`${testId}-facts`} />
            </div>
          )}
          {disclosures.length > 0 && (
            <div data-ui-part="" data-subject-part="disclosures">
              <Stack gap="sm">
                {disclosures.map((d) => (
                  <Disclosure
                    key={d.id}
                    variant="plain"
                    defaultOpen={d.defaultOpen}
                    data-testid={`${testId}-disclosure-${d.id}`}
                    summary={(
                      <Inline gap="sm" align="center" justify="between" wrap={false} className="w-full min-w-0">
                        <Inline gap="xs" align="center" wrap={false} className="min-w-0">
                          <Text as="span" size="sm" weight="medium" tone="primary" className="truncate">{d.title}</Text>
                          {d.count != null && <Chip size="xs" tone="neutral">{d.count}</Chip>}
                        </Inline>
                        {d.action != null && (
                          // A control in the summary row must not also toggle the disclosure.
                          <span data-ui-part="" className="shrink-0" onClick={(e) => e.preventDefault()}>{d.action}</span>
                        )}
                      </Inline>
                    )}
                  >
                    {d.children}
                  </Disclosure>
                ))}
              </Stack>
            </div>
          )}
        </Stack>
      )}
    </section>
  );
}

export default SubjectFrame;
