// AppBrand — the product mark and name at the left of the app header.
//
// Every app drew this by hand: a coloured tile, a name in some size, maybe a
// second line ("Studio", the workspace), wrapped in a link to home. Measured
// on the Storymaker Studio header (UX audit 2026-11-08, L3) the hand-rolled
// version set its own 15px name and an ad-hoc tile. This is the one brand:
// the mark in a fixed square, the name at the identity size (16px at `md`,
// the header's size; 14px at `sm`), an optional secondary label in the meta
// size (12px), and the whole thing a link home when `href` is given.

import type { ReactNode, MouseEventHandler } from 'react';
import { cn } from '../../lib/cn';
import { Text } from './Text';

export type AppBrandSize = 'sm' | 'md';

export interface AppBrandProps {
  /** The mark: an `<img>`, an svg, or a glyph. Drawn in a fixed square (28px at md, 24px at sm). */
  mark?: ReactNode;
  /** Product name. */
  name: ReactNode;
  /** A second, quieter label after the name ("Studio", a workspace). */
  secondary?: ReactNode;
  /** Link home. Without it the brand is not interactive. */
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** `md` (default) matches the 53px app header; `sm` a compact header. */
  size?: AppBrandSize;
  /** Accessible name of the home link. Default: "<name> home" when name is a string. */
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

const MARK: Record<AppBrandSize, string> = {
  md: 'h-7 w-7 [&_img]:h-7 [&_img]:w-7 [&_svg]:h-5 [&_svg]:w-5',
  sm: 'h-6 w-6 [&_img]:h-6 [&_img]:w-6 [&_svg]:h-4 [&_svg]:w-4',
};

/** The product mark and name at the left of the app header; a link home when `href` is given. */
export function AppBrand({
  mark, name, secondary, href, onClick, size = 'md', 'aria-label': ariaLabel, className, 'data-testid': testId = 'app-brand',
}: AppBrandProps) {
  const body = (
    <>
      {mark != null && (
        <span aria-hidden="true" data-ui-part="app-brand-mark"
          className={cn('grid flex-none place-items-center overflow-hidden rounded-md bg-primary/10 text-primary [&_img]:object-contain', MARK[size])}>
          {mark}
        </span>
      )}
      <Text size={size === 'md' ? 'base' : 'sm'} weight="semibold" tone="primary" className="min-w-0 truncate leading-5" data-testid={`${testId}-name`}>
        {name}
      </Text>
      {secondary != null && (
        <Text size="xs" tone="tertiary" className="min-w-0 truncate leading-4" data-testid={`${testId}-secondary`}>
          {secondary}
        </Text>
      )}
    </>
  );
  const shell = cn('inline-flex min-w-0 flex-none items-center gap-2 no-underline', className);
  if (href) {
    const label = ariaLabel ?? (typeof name === 'string' ? `${name} home` : undefined);
    return (
      <a href={href} onClick={onClick} aria-label={label} className={cn(shell, 'rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary')}
        data-app-brand={size} data-testid={testId}>
        {body}
      </a>
    );
  }
  return <span className={shell} data-app-brand={size} data-testid={testId}>{body}</span>;
}

export default AppBrand;
