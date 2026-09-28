// Highlight — marks the matched search terms inside a run of text.
//
// A search result row says WHY it matched by drawing the query's words in a
// pale primary pill ("Publish typed [component contracts]"). Hosts were
// splitting strings by hand and wrapping pieces in styled spans; this does it
// once, with a real <mark> (so assistive tech can announce the highlight) and
// theme tokens only, so dark mode follows.
//
// Matching is case-insensitive and whole-term: "auth" marks "Auth" and "AUTH"
// but not the "auth" inside "author". A multi-word term ("component
// contracts") is matched as a phrase. Longer terms win over shorter ones that
// overlap them. Since 2.400.0.

import { Fragment, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface HighlightProps {
  /** The text to render. */
  text: string;
  /** Terms or phrases to mark. Empty or blank terms are ignored. */
  terms: readonly string[];
  /** Classes for the outer span. */
  className?: string;
  /** Classes merged onto every <mark>. */
  markClassName?: string;
  'data-testid'?: string;
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Split `text` into alternating plain / matched segments. Exported so a host
 * that needs the match positions (a count, an aria description) reads the
 * same answer the component draws.
 */
export function highlightSegments(text: string, terms: readonly string[]): Array<{ text: string; match: boolean }> {
  const cleaned = Array.from(new Set(terms.map((t) => t.trim()).filter(Boolean)))
    .sort((a, b) => b.length - a.length)
    .map((t) => escapeRegExp(t).replace(/\s+/g, '\\s+'));
  if (!text || cleaned.length === 0) return text ? [{ text, match: false }] : [];
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}_])(?:${cleaned.join('|')})(?![\\p{L}\\p{N}_])`, 'giu');
  const out: Array<{ text: string; match: boolean }> = [];
  let last = 0;
  for (const m of text.matchAll(pattern)) {
    const start = m.index ?? 0;
    if (m[0].length === 0) continue;
    if (start > last) out.push({ text: text.slice(last, start), match: false });
    out.push({ text: m[0], match: true });
    last = start + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last), match: false });
  return out;
}

export function Highlight({ text, terms, className, markClassName, 'data-testid': testId }: HighlightProps): ReactNode {
  const segments = highlightSegments(text, terms);
  return (
    <span className={className} data-testid={testId}>
      {segments.map((segment, i) =>
        segment.match ? (
          <mark
            key={i}
            className={cn('rounded-sm bg-primary-bg px-0.5 text-inherit [box-decoration-break:clone]', markClassName)}
          >
            {segment.text}
          </mark>
        ) : (
          <Fragment key={i}>{segment.text}</Fragment>
        ),
      )}
    </span>
  );
}

export default Highlight;
