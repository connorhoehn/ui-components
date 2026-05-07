import { Outlet, useLocation, Link } from 'react-router';
import { MockProviders } from '../mock/providers';

function DemoTopBar() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  const demoName = segments[segments.length - 1] || '';
  const displayName = demoName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div
      style={{
        height: 40,
        background: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        flexShrink: 0,
      }}
    >
      <Link
        to="/pages"
        style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        &larr; Back to docs
      </Link>
      <span style={{ color: '#cbd5e1', fontSize: 13, fontWeight: 500 }}>
        {displayName}
      </span>
    </div>
  );
}

export function DemoLayout() {
  return (
    <MockProviders>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <DemoTopBar />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Outlet />
        </div>
      </div>
    </MockProviders>
  );
}
