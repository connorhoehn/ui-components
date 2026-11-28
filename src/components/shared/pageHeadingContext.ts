// The heading level of the page title a template drew (since 2.549.0), so a
// section inside the page heads itself one level below it. PageFrame provides
// it; PageSection reads it. Internal.

import { createContext, useContext } from 'react';

export type PageHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

export const PageHeadingContext = createContext<PageHeadingLevel | null>(null);

/** The enclosing template's title level, or `null` outside one. */
export function usePageHeadingLevel(): PageHeadingLevel | null {
  return useContext(PageHeadingContext);
}

/** One level below `level`, stopping at h4. */
export function headingBelow(level: PageHeadingLevel): PageHeadingLevel {
  return level === 'h1' ? 'h2' : level === 'h2' ? 'h3' : 'h4';
}
