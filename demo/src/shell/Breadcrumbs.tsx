import { Link } from 'react-router';
import { useActiveNav } from '../navigation';

export function Breadcrumbs() {
  const { breadcrumbs } = useActiveNav();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="flex items-center gap-[6px] mb-6 text-[13px] text-neutral">
      {breadcrumbs.map((crumb, i) => {
        const isLast = i === breadcrumbs.length - 1;
        return (
          <span className="flex items-center gap-[6px]" key={`${crumb.path}-${i}`}>
            {i > 0 && <span className="text-text-disabled">/</span>}
            {isLast ? (
              <span className="text-text-primary font-medium">{crumb.label}</span>
            ) : (
              <Link className="text-neutral no-underline" to={crumb.path}>
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
