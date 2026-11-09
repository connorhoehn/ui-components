import { createContext, useContext, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { useDensity } from './Density';
const SurfaceContext = createContext(false);
/** The full-width composer shelf. Owns backdrop, insets and readable width.
 * Nested composers reuse their containing shelf rather than painting twice.
 * `compact` pads 8px above and below, 4px while its composer is folded
 * (`[data-composer-fold]`: the idle row or the explicit collapse). */
export function ComposerSurface({ children, className, compact, ...rest }: HTMLAttributes<HTMLDivElement> & { compact?: boolean }) {
  const nested = useContext(SurfaceContext);
  const density = useDensity();
  if (nested) return <>{children}</>;
  return <SurfaceContext.Provider value={true}><div {...rest} data-composer-surface data-density={(compact ?? (density === 'compact')) ? 'compact' : 'comfortable'} className={cn('uic-composer-surface shrink-0 min-w-0', className)}><div className="uic-composer-surface-content">{children}</div></div></SurfaceContext.Provider>;
}
