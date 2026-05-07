import { Link } from 'react-router';
import { useActiveNav } from '../navigation';

export function Breadcrumbs() {
  const { breadcrumbs } = useActiveNav();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 24,
      fontSize: 13,
      color: '#64748b',
    }}>
      {breadcrumbs.map((crumb, i) => {
        const isLast = i === breadcrumbs.length - 1;
        return (
          <span key={`${crumb.path}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span style={{ color: '#cbd5e1' }}>/</span>}
            {isLast ? (
              <span style={{ color: '#0f172a', fontWeight: 500 }}>{crumb.label}</span>
            ) : (
              <Link to={crumb.path} style={{ color: '#64748b', textDecoration: 'none' }}>
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
