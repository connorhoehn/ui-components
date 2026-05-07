import { Link, useLocation } from 'react-router';
import { navigationTree } from '../navigation';

export function TopNav() {
  const { pathname } = useLocation();

  const sections = navigationTree.map(s => ({
    label: s.label,
    path: s.basePath,
    active: pathname.startsWith(s.basePath),
  }));

  return (
    <nav style={{
      height: 56,
      background: '#fff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      {/* Left: Logo/title */}
      <Link to="/" style={{
        fontSize: 16,
        fontWeight: 700,
        color: '#0f172a',
        textDecoration: 'none',
        marginRight: 40,
        whiteSpace: 'nowrap',
      }}>
        UI Components
      </Link>

      {/* Center: Section links */}
      <div style={{ display: 'flex', gap: 4, flex: 1 }}>
        {sections.map(s => (
          <Link
            key={s.path}
            to={s.path}
            style={{
              padding: '6px 14px',
              fontSize: 14,
              fontWeight: 500,
              color: s.active ? '#2563eb' : '#475569',
              textDecoration: 'none',
              borderBottom: s.active ? '2px solid #2563eb' : '2px solid transparent',
              borderRadius: 0,
              transition: 'color 0.15s, border-color 0.15s',
              lineHeight: '40px',
            }}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {/* Right: Search placeholder + GitHub link */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 6,
          padding: '6px 12px',
          fontSize: 13,
          color: '#94a3b8',
          cursor: 'pointer',
          gap: 8,
          minWidth: 180,
        }}>
          <span>Search...</span>
          <kbd style={{
            marginLeft: 'auto',
            fontSize: 11,
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 3,
            padding: '1px 5px',
            color: '#64748b',
          }}>Cmd+K</kbd>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#475569', textDecoration: 'none', fontSize: 18 }}
          title="GitHub"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
      </div>
    </nav>
  );
}
