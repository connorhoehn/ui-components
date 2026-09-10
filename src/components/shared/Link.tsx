// src/components/shared/Link.tsx
//
// A styled hyperlink — the primitive the library never had.
//
// Every href-carrying prop in here is welded to one composite's chrome:
// `EntityCell.href` wraps that cell's label, `ThumbnailCard.href` wraps the
// card, `EmptyStateAction` renders inside an empty state, `NavRail`'s
// renderLink override is for rail rows. None of them is a free-standing link a
// caller can drop into a table cell, a PageSection actions slot, or a sentence.
//
// So consumers hand-roll `<a>`. In the aws-agentcore portal that produced SIX
// near-identical copies of a file called `ExternalLinkFrame.tsx` — one per page
// directory, each carrying the same comment explaining that no composite covers
// this — plus loose anchors elsewhere. That is the shape of a missing
// primitive.
//
// `external` is the reason this is worth a component rather than a snippet.
// Opening a link in a new tab without `rel="noopener"` hands the opened page a
// live `window.opener` reference to yours, and it can navigate your tab
// somewhere else while the user is looking at the popup — reverse tabnabbing.
// Modern browsers imply `noopener` for `target="_blank"`, but not every engine
// a consumer ships to does, and a hand-rolled anchor gets it right only when
// the author remembers. Here it is not optional: any link that opens a new tab
// gets `noopener noreferrer` merged into whatever `rel` was passed.

import { type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** Required — a link with nowhere to go is a button. */
  href: string;
  children: ReactNode;
  /**
   * Open in a new tab. Sets `target="_blank"` and forces safe `rel`.
   * Prefer this over passing `target` yourself.
   */
  external?: boolean;
  /**
   * Drop the default `text-primary … hover:underline` styling, for a link that
   * wraps something already styled (a card, an avatar, a whole row).
   */
  unstyled?: boolean;
}

const BASE = 'text-primary no-underline hover:underline';

/** Merge the safety tokens into a caller's `rel` without duplicating any. */
function safeRel(rel: string | undefined): string {
  const parts = new Set((rel ?? '').split(/\s+/).filter(Boolean));
  parts.add('noopener');
  parts.add('noreferrer');
  return [...parts].join(' ');
}

export function Link({
  href, children, external = false, unstyled = false,
  target, rel, className, ...rest
}: LinkProps) {
  // `external` implies _blank, but an explicit target="_blank" must get the
  // same protection — the hazard is the new tab, not which prop asked for it.
  const finalTarget = external ? '_blank' : target;
  const opensNewTab = finalTarget === '_blank';

  return (
    <a
      {...rest}
      href={href}
      target={finalTarget}
      rel={opensNewTab ? safeRel(rel) : rel}
      className={cn(!unstyled && BASE, className)}
    >
      {children}
    </a>
  );
}
